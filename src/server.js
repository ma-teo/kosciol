import express from 'express'
import axios from 'axios'
import { useState, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import { Data, Logged, Observer, apiUrl } from './components/utils/context'
import Document from './document'

const Root = ({api, req}) => {
  const [data, setData] = useState(api)
  const [logged, setLogged] = useState(false)

  return (
    <StrictMode>
      <StaticRouter location={req.url}>
        <Data.Provider value={[data, setData]}>
          <Logged.Provider value={[logged, setLogged]}>
            <Observer.Provider value={undefined}>
              <Document />
            </Observer.Provider>
          </Logged.Provider>
        </Data.Provider>
      </StaticRouter>
    </StrictMode>
  )
}

const render = props => `<!doctype html>${renderToString(<Root {...props} />)}`

express()
  .use(express.static(process.env.STATIC_PATH))
  .get('*', async (req, res) => {
    const {data} = await axios(apiUrl)
    const html = render({req, api: data})

    html.includes('<title>Błąd 404 - Kościoły Domowe Wrocław</title>') ? res.status(404) : res.status(200)
    res.send(html)
  })
  .listen(3000, () => console.log('Running at http://localhost:3000/'))
