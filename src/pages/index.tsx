import Link from 'next/link'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns'

import { api } from '../services/api'
import { constants } from '../utils/constants'
import { Episode, EpisodeResponse } from '../utils/interfaces'
import { convertDurationToTimeString } from '../utils/functions'

import styles from '../styles/home.module.scss'

type HomeProps = {
  allEpisodes: Episode[]
  latestEpisodes: Episode[]
}

export default function HomePage({ allEpisodes, latestEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>{constants.TEXT.LAST_RELEASES}</h2>
        <ul>
          {latestEpisodes.map(episode => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                objectFit="cover"
                alt={episode.title}
                src={episode.thumbnail}
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.shortDescription}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <Image src="/play-green.svg" alt="Tocar episódio" width={32} height={32}/>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>{constants.TEXT.ALL_EPISODES}</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    objectFit="cover"
                    alt={episode.title}
                    src={episode.thumbnail}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.shortDescription}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button type="button">
                    <Image src="/play-green.svg" alt="Toca episódio" width={32} height={32} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const params = { _limit: 12, _sort: 'published_at', _order: 'desc' }
  const { data } = await api.get<EpisodeResponse[]>('/episodes', { params })

  const episodes = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    url: episode.file.url,
    thumbnail: episode.thumbnail,
    duration: Number(episode.file.duration),
    shortDescription: episode.shortDescription,
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR })
  }))

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: { allEpisodes, latestEpisodes },
    revalidate: 60 * 60 * 8
  }
}
