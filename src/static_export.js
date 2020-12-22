import 'regenerator-runtime/runtime'
import fs from 'fs'
import axios from 'axios'
import { apiUrl } from './components/utils/context'
import { renderApp } from './server'

export const render = async reqs => {
  for (const req of reqs) {
    const {data} = await axios(`${apiUrl}/meta`)
    const html = renderApp({req, api: data})
    fs.writeFileSync(`${process.env.STATIC_PATH}${req}.html`, html)
  }
}

export const reqs = [
  '/200'
]

export default render(reqs)
