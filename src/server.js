import 'regenerator-runtime/runtime'
import express from 'express'
import axios from 'axios'
import render from './render'
import { apiUrl } from './components/utils/context'

express()
  .use(express.static(process.env.STATIC_PATH))
  .get('*', async (req, res) => {
    const {data} = await axios(apiUrl)
    const html = render({req, api: data})

    html.includes('<title>Błąd 404 - Kościoły Domowe Wrocław</title>') ? res.status(404) : res.status(200)
    res.send(html)
  })
  .listen(3000, () => console.log('Running at http://localhost:3000/'))
