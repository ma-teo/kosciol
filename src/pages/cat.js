import { useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import None from './none'
import { Data, Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import Top from '../components/parts/top'
import Post from '../components/cat/post'
import Pagination from '../components/parts/pagination'

const Cat = () => {
  const [{cats, arts}] = useContext(Data)
  const {cat} = useParams()
  const [query] = useSearchParams()
  const site = cats.find(({slug}) => slug === cat)
  const items = arts.filter(({cat_slug}) => cat_slug === cat).sort((a, b) => new Date(b.date) - new Date(a.date))

  const page = +query.get('page') || 1
  const per_page = +query.get('per_page') || 8
  const pages = Math.ceil(items.length / per_page)

  return (
    !site ? <None /> :
    <Site.Provider value={site}>
      <Meta item={items[0]} />
      {page === 1 ? <Top /> : undefined}
      {items.map((item, key) => <Post key={key} {...item} />).slice((page - 1) * per_page, page * per_page)}
      {pages > 1 ? <Pagination pages={pages} /> : undefined}
    </Site.Provider>
  )
}

export default Cat
