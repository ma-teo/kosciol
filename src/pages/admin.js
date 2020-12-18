import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import None from './none'
import { Logged, Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import LoginForm from '../components/admin/login-form'
import CMS from '../components/admin/cms'

const site = {
  name: 'Panel administracyjny',
  slug: 'admin',
}

const Admin = () => {
  const [logged] = useContext(Logged)
  const {pathname} = useLocation()

  return (
    <Site.Provider value={site}>
      <Meta />
      {
        logged ? <CMS /> :
        pathname.match(/^\/admin\/?$/) ? <LoginForm /> :
        <None />
      }
    </Site.Provider>
  )
}

export default Admin
