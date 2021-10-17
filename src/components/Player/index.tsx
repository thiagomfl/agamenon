import Image from 'next/image'
import Slider from 'rc-slider'
import { useEffect, useRef, useState } from 'react'

import { constants } from '../../utils/constants'
import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/functions'

import styles from './styles.module.scss'
import 'rc-slider/assets/index.css'

export function Player() {
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playerCtx = usePlayer()
  const episode = playerCtx.episodeList[playerCtx.currentEpisodeIndex]

  useEffect(() => {
    if(!audioRef.current) return
    playerCtx.isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [playerCtx.isPlaying])


  function setUpProgressListener() {
    if (audioRef.current) audioRef.current.currentTime = 0
    audioRef.current?.addEventListener('timeupdate', () =>
      setProgress(Math.floor(audioRef.current?.currentTime!))
    )
  }

  function handleSeek(amount: number) {
    if (audioRef.current) audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    return playerCtx.hasNext ? playerCtx.playNext() : playerCtx.clearPlayerState()
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <Image src="/playing.svg" alt="Tocando agr" width={32} height={32} />
        <strong>{constants.TEXT.PLAYER_PLAYS}</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            objectFit="cover"
            alt={episode.title}
            src={episode.thumbnail}
          />
          <strong>{episode.title}</strong>
          <span>{episode.shortDescription}</span>
        </div>
      ): (
        <div className={styles.emptyPlayer}>
          <strong>{constants.TEXT.PLAYER_SELECT}</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                value={progress}
                onChange={handleSeek}
                max={episode.duration}
                railStyle={{ backgroundColor: '#252013' }}
                trackStyle={{ backgroundColor: '#04D361' }}
                handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            autoPlay
            ref={audioRef}
            src={episode.url}
            loop={playerCtx.isLooping}
            onEnded={handleEpisodeEnded}
            onLoadedMetadata={setUpProgressListener}
            onPlay={() => playerCtx.setPlayingState(true)}
            onPause={() => playerCtx.setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={playerCtx.toggleShuffle}
            className={playerCtx.isShuffling ? styles.isActive : ''}
            disabled={!episode || playerCtx.episodeList.length === 1}
          >
            <Image src="/shuffle.svg" alt="Embaralhar" height={24} width={24} />
          </button>
          <button
            type="button"
            onClick={playerCtx.playPrev}
            disabled={!episode || playerCtx.hasPrevious}
          >
            <Image src="/play-previous.svg" alt="Tocar anterior" height={24} width={24} />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={playerCtx.togglePlay}
            className={styles.playButton}
          >
            <Image
              width={24}
              height={24}
              alt={playerCtx.isPlaying ? 'Pausar' : 'Tocar'}
              src={playerCtx.isPlaying ? "/pause.svg" : '/play.svg'}
            />
          </button>
          <button
            type="button"
            onClick={playerCtx.playNext}
            disabled={!episode || playerCtx.hasNext}
          >
            <Image src="/play-next.svg" alt="Tocar próxima" height={24} width={24} />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={playerCtx.toggleLoop}
            className={playerCtx.isLooping ? styles.isActive : ''}
          >
            <Image src="/repeat.svg" alt="Repetir" height={24} width={24} />
          </button>
        </div>
      </footer>
    </div>
  )
}
