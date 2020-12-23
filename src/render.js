import { useState, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import { Data, Logged, Observer } from './components/utils/context'
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

export default render
