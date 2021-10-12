import Image from 'next/image'

import styles from './styles.module.scss'
import { constants } from '../../utils/constants'

export function Header() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className={styles.headerContainer}>
      <Image src="/agamenon-logo.svg" alt="Agamenon Logo" width={48} height={48} />
      <p>{constants.TEXT.PODCAST_DESC}</p>
      <span>{currentDate}</span>
    </header>
  )
}
