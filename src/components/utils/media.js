import { useState } from 'react'

const useMedia = query => {
  const media = window.matchMedia(query)
  const [state, setState] = useState(media.matches)
  media.addEventListener('change', () => setState(media.matches))

  return state
}

export default useMedia
