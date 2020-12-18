import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useMedia from 'use-media'
import { Data } from '../utils/context'

const Nav = () => {
  const [{meta, menu}] = useContext(Data)
  const [collapse, setCollapse] = useState(true)
  const {pathname} = useLocation()
  const media = useMedia('(min-width: 850px)')

  useEffect(() => setCollapse(!media), [pathname, media])

  return (
    <nav className="nav">
      <div className="navbar">
        <Link className="navbar-header" to="/">
          <span className="navbar-title">{meta.name}</span>
        </Link>
        <button className="navbar-toggler" onClick={() => setCollapse(state => !state)} aria-label="Przełącznik menu" aria-expanded={!collapse}>
          <div className={`toggler-icon${collapse ? '' : ' expanded'}`} />
        </button>
      </div>
      <ul className={`nav-menu${collapse ? ' collapse' : ''}`}>
        {menu.map(({name, slug}) => (
          <li key={slug}>
            <Link
              className="nav-link"
              to={slug}
              tabIndex={collapse ? -1 : undefined}
              aria-disabled={collapse ? true : undefined}
              children={name}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
