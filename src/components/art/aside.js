import { useContext } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Data, Site } from '../utils/context'
import Pagination from '../parts/pagination'

const Aside = () => {
  const [{arts}] = useContext(Data)
  const {cat_name} = useContext(Site)
  const {cat, art} = useParams()
  const [query] = useSearchParams()
  const items = arts.filter(({cat_slug}) => cat_slug === cat).sort((a, b) => new Date(b.date) - new Date(a.date))

  const page = +query.get('page') || 1
  const per_page = +query.get('per_page') || 8
  const pages = Math.ceil(items.length / per_page)

  return (
    <section>
      <div className="container wide">
        <h2 className="section-header">
          <Link to=".." children={cat_name} />
        </h2>
        <ul className="aside-list">
          {items.map(({name, slug}) => (
            <li key={slug}>
              <Link
                className={`aside-list-item${slug === art ? ' active' : ''}`}
                to={`../${slug}`}
                tabIndex={slug === art ? -1 : null}
                aria-disabled={slug === art ? true : null}
                children={name}
              />
            </li>
          )).slice((page - 1) * per_page, page * per_page)}
        </ul>
        {pages > 1 ? <Pagination pages={pages} /> : undefined}
      </div>
    </section>
  )
}

export default Aside
