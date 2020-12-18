import { useContext } from 'react'
import None from './none'
import { Data, Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import Top from '../components/parts/top'
import HomeCat from '../components/home/home-cat'
import ContactForm from '../components/contact/contact-form'

const Home = () => {
  const [{pages, cats, arts}] = useContext(Data)
  const site = pages.find(({slug}) => slug === 'home')

  return (
    !site ? <None /> :
    <Site.Provider value={site}>
      <Meta />
      <Top />
      {cats.map((cat, key) => (
        <HomeCat
          key={key}
          {...cat}
          arts={arts
            .filter(({cat_slug}) => cat_slug === cat.slug)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0,2)
          }
        />
      ))}
      <ContactForm />
    </Site.Provider>
  )
}

export default Home
