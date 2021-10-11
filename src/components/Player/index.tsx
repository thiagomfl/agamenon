import Image from 'next/image'

import styles from './styles.module.scss'
import { constants } from '../../utils/constants'

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <Image src="/playing.svg" alt="Tocando agr" width={32} height={32} />
        <strong>{constants.TEXT.PLAYER_PLAYS}</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>{constants.TEXT.PLAYER_SELECT}</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <Image src="/shuffle.svg" alt="Embaralhar" height={24} width={24} />
          </button>
          <button type="button">
            <Image src="/play-previous.svg" alt="Tocar anterior" height={24} width={24} />
          </button>
          <button type="button" className={styles.playButton}>
            <Image src="/play.svg" alt="Tocar" height={24} width={24} />
          </button>
          <button type="button">
            <Image src="/play-next.svg" alt="Tocar próxima" height={24} width={24} />
          </button>
          <button type="button">
            <Image src="/repeat.svg" alt="Repetir" height={24} width={24} />
          </button>
        </div>
      </footer>
    </div>
  )
}
