import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import None from './none'
import { Data, Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import Top from '../components/parts/top'
import Article from '../components/art/article'
import Aside from '../components/art/aside'

const Art = () => {
  const [{arts}] = useContext(Data)
  const {cat, art} = useParams()
  const site = arts.find(({slug, cat_slug}) => cat_slug === cat && slug === art)

  return (
    !site ? <None /> :
    <Site.Provider value={site}>
      <Meta />
      <Top />
      <Article />
      <Aside />
    </Site.Provider>
  )
}

export default Art
