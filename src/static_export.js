import 'regenerator-runtime/runtime'
import axios from 'axios'
import { apiUrl } from './components/utils/context'
import { renderApp } from './server'

export const render = async (req, res) => {
  const {data} = await axios(`${apiUrl}/meta`)
  const html = renderApp({req, api: data})
  res.json({html})
}

export const routes = () => {
  return ['static']
}
