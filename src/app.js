import { Routes, Route, useLocation } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Scroll from './components/utils/scroll'
import Nav from './components/parts/nav'
import Footer from './components/parts/footer'

import Home from './pages/home'
import Admin from './pages/admin'
import Contact from './pages/contact'
import Cat from './pages/cat'
import Art from './pages/art'
import None from './pages/none'

import CMSList from './components/admin/cms-list'
import CMSForm from './components/admin/cms-form'

const App = () => {
  const {pathname} = useLocation()

  return (
    <>
      <Scroll />
      <Nav />
      <Transition key={pathname} timeout={0}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Admin />}>
            <Route path=":type" element={<CMSList />} />
            <Route path=":type/:slug" element={<CMSForm />} />
          </Route>
          <Route path="kontakt" element={<Contact />} />
          <Route path=":cat" element={<Cat />} />
          <Route path=":cat/:art" element={<Art />} />
          <Route path="*" element={<None />} />
        </Routes>
      </Transition>
      <Footer />
    </>
  )
}

export default App
