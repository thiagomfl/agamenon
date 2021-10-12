import Link from 'next/link'
import Image from 'next/image'
import { ptBR } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'

import { api } from '../../services/api'
import { Episode, EpisodeResponse } from '../../utils/interfaces'
import { convertDurationToTimeString } from '../../utils/functions'

import styles from './styles.module.scss'

type EpisodeProps = {
  episode: Episode
}

export default function EpisodePage({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/" passHref>
          <button type="button">
            <Image width={16} height={16} src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image width={700} height={160} src={episode.thumbnail} alt="Thumbnail" objectFit="cover" />
        <button type="button">
          <Image width={24} height={24} src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug
  const { data } = await api.get<EpisodeResponse>(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    url: data.file.url,
    members: data.members,
    thumbnail: data.thumbnail,
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR })
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24
  }
}
