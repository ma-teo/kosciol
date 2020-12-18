import { useContext } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Data, Logged, apiUrl } from '../utils/context'

const CMS = () => {
  const [{types}] = useContext(Data)
  const [, setLogged] = useContext(Logged)
  const {pathname} = useLocation()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const resp = await fetch(apiUrl, {
        method: 'POST',
      })
      await resp.json()
    }
    catch {}

    setLogged(false)
    sessionStorage.removeItem('token')
    navigate('.')
  }

  return (
    <section>
      <div className="container wide">
        <div className="row">
          <div className="col-33">
            <h2 className="section-header"><Link to=".">CMS</Link></h2>
            <ul className="aside-list cms-list">
              {types.map(({name, slug}) => (
                <li key={slug}>
                  <Link
                    className={`aside-list-item${pathname.endsWith(slug) ? ' active' : ''}`}
                    to={slug}
                    tabIndex={pathname.endsWith(slug) ? -1 : undefined}
                    aria-disabled={pathname.endsWith(slug) ? true : undefined}
                    children={name}
                  />
                </li>
              ))}
            </ul>
            <button className="admin-input" onClick={logout}>Wyloguj się</button>
          </div>
          <div className="col-66">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CMS
