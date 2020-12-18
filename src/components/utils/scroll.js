import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Scroll = () => {
  const [keys, setKeys] = useState()
  const {key} = useLocation()

  useEffect(() => setKeys(JSON.parse(sessionStorage.getItem('keys')) || []), [])
  useEffect(() => setKeys(state => state.includes(key) ? state : window.scrollTo(0,0) || [...state, key]), [key])
  useEffect(() => sessionStorage.setItem('keys', JSON.stringify(keys)), [keys])

  return null
}

export default Scroll
