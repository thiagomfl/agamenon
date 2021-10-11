import Image from 'next/image'

import styles from './styles.module.scss'

export function Header() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className={styles.headerContainer}>
      <Image src="/agamenon-logo.svg" alt="Agamenon Logo" width={64} height={64} />
      <p>Onde a conversa rola solta e a censura não existe</p>
      <span>{currentDate}</span>
    </header>
  )
}
