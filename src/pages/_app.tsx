import type { AppProps } from 'next/app'

import { Player } from '../components/Player'
import { Header } from '../components/Header'
import { PlayerContextProvider } from '../contexts/PlayerContext'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
