import { createContext, ReactNode, useContext, useState } from 'react'

import { Episode } from '../utils/interfaces'

type PlayerContextData = {
  hasNext: boolean
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  hasPrevious: boolean
  playPrev: () => void
  playNext: () => void
  episodeList: Episode[]
  toggleLoop: () => void
  togglePlay: () => void
  toggleShuffle: () => void
  currentEpisodeIndex: number
  clearPlayerState: () => void
  play: (episode: Episode) => void
  setPlayingState: (state: boolean) => void
  playList: (episodeList: Episode[], index: number) => void
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode: Episode) {
    setIsPlaying(true)
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
  }

  function playList(episodeList: Episode[], index: number) {
    setIsPlaying(true)
    setEpisodeList(episodeList)
    setCurrentEpisodeIndex(index)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    }

    if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1)
  }

  const hasPrevious = currentEpisodeIndex > 0
  function playPrev() {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider value={{
      play,
      hasNext,
      playList,
      playNext,
      playPrev,
      isLooping,
      isPlaying,
      toggleLoop,
      togglePlay,
      isShuffling,
      episodeList,
      hasPrevious,
      toggleShuffle,
      setPlayingState,
      clearPlayerState,
      currentEpisodeIndex,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
