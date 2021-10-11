import { API_URL } from '../utils/constants'
import { Episode } from '../utils/interfaces'

type Props = {
  episodes: Episode[]
}

export default function Home({ episodes }: Props) {
  console.log(episodes)
  return (
    <h1>Index</h1>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${API_URL}/episodes`)
  const data: Episode[] = await response.json()

  return {
    props: { episodes: data },
    revalidate: 60 * 60 * 8
  }
}
