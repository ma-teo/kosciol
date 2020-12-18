import { Link, useSearchParams } from 'react-router-dom'

const Pagination = ({pages}) => {
  const [query] = useSearchParams()
  const page = +query.get('page') || 1

  return (
    <section>
      <div className="container wide">
        <ul className="pagination">
          <li key="0">
            {page === 1 ? <span className="page active">&laquo;</span>
            : <Link className="page" to={`?${query.set('page', page - 1) || query.toString()}`}>&laquo;</Link>}
          </li>
          {[...Array(pages).keys()].map(i => (
            <li key={i + 1}>
              {i + 1 === page ? <span className="page active">{i + 1}</span>
              : <Link className="page" to={`?${query.set('page', i + 1) || query.toString()}`}>{i + 1}</Link>}
            </li>
          ))}
          <li key={pages + 1}>
            {page === pages ? <span className="page active">&raquo;</span>
            : <Link className="page" to={`?${query.set('page', page + 1) || query.toString()}`}>&raquo;</Link>}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Pagination
