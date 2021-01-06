import { useContext } from 'react'
import { Data, mediaUrl, siteKey } from './components/utils/context'
import Head from './components/utils/head'
import App from './app'
import assets from '../build/assets'

const Document = () => {
  const [data] = useContext(Data)

  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111188" />
        <meta name="author" content="Mateusz Tarasiuk" />

        <Head />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" sizes="16x16" href={`${mediaUrl}/icon-16x16.png`} />
        <link rel="icon" sizes="32x32" href={`${mediaUrl}/icon-32x32.png`} />
        <link rel="icon" sizes="192x192" href={`${mediaUrl}/icon-192x192.png`} />
        <link rel="icon" sizes="512x512" href={`${mediaUrl}/icon-512x512.png`} />
        <link rel="mask-icon" href={`${mediaUrl}/pinned-tab-icon.svg`} color="#111188" />
        <link rel="manifest" href="/manifest.json" />

        <script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} defer={true} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&display=swap&subset=latin-ext" />
        {assets.main.js?.toString().split(',').map(js => <script key={js} src={js} defer={true} />)}
        {assets.main.css?.toString().split(',').map(css => <link rel="stylesheet" key={css} href={css} />)}
      </head>
      <body>
        <div id="root"><App /></div>
        <script id="data" type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
      </body>
    </html>
  )
}

export default Document
