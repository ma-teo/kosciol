import 'regenerator-runtime/runtime'
import fs from 'fs'
import axios from 'axios'
import render from './render'
import { apiUrl } from './components/utils/context'

const exportStatic = async req => {
  const {data} = await axios(`${apiUrl}/meta`)
  const html = render({req, api: data})

  fs.writeFileSync(process.env.STATIC_PATH + req.url, html)
}

exportStatic({ url: '/200.html' })
