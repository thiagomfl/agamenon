import Image from 'next/image'

import styles from './styles.module.scss'

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <Image src="/playing.svg" alt="Tocando agr" width={32} height={32} />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um episódio para ouvir</strong>
      </div>

      <footer>

      </footer>
    </div>
  )
}
