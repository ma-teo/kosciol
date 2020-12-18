import 'regenerator-runtime/runtime'
import { useState, useEffect, StrictMode } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Data, Logged, Observer, apiUrl } from './components/utils/context'
import Loading from './components/utils/loading'
import lazyloader from './components/utils/lazyloader'

import App from './app'
import './app.scss'

const Root = () => {
  const [data, setData] = useState(window.data ? JSON.parse(window.data.innerHTML) : JSON.parse(localStorage.getItem('data')))
  const [logged, setLogged] = useState(!!sessionStorage.getItem('token'))
  const observer = new IntersectionObserver(lazyloader)

  useEffect(() => {
    window.data || fetch(apiUrl).then(resp => resp.json()).then(data => setData(data))
  }, [])

  useEffect(() => localStorage.setItem('data', JSON.stringify(data)), [data])

  return (
    <StrictMode>
      <BrowserRouter>
        <Data.Provider value={[data, setData]}>
          <Logged.Provider value={[logged, setLogged]}>
            <Observer.Provider value={observer}>
              {data ? <App /> : <Loading />}
            </Observer.Provider>
          </Logged.Provider>
        </Data.Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

hydrate(<Root />, document.getElementById('root'))

if(module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
