import { useContext } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import None from '../../pages/none'
import { Data } from '../utils/context'
import Pagination from '../parts/pagination'

const CMSList = () => {
  const [data] = useContext(Data)
  const {type} = useParams()
  const [query] = useSearchParams()
  const items = data[type]

  const page = +query.get('page') || 1
  const per_page = +query.get('per_page') || 8
  const pages = items && Math.ceil(items.length / per_page)

  return (
    !items ? <None /> :
    <>
      <h3 className="section-header">{data.types.find(({slug}) => slug === type).name}</h3>
      <ul className="aside-list cms-list">
        <li>
          <Link
            className="aside-list-item"
            to="new"
            children="Dodaj nowy element"
          />
        </li>
      </ul>
      <ul className="aside-list cms-list">
        {items.map(({name, slug}) => (
          <li key={slug}>
            <Link
              className="aside-list-item"
              to={slug}
              children={name}
            />
          </li>
        )).slice((page - 1) * per_page, page * per_page)}
      </ul>
      {pages > 1 ? <Pagination pages={pages} /> : undefined}
    </>
  )
}

export default CMSList
