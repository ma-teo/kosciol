import { useContext } from 'react'
import None from './none'
import { Data, Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import ContactForm from '../components/contact/contact-form'

const Contact = () => {
  const [{pages}] = useContext(Data)
  const site = pages.find(({slug}) => slug === 'kontakt')

  return (
    !site ? <None /> :
    <Site.Provider value={site}>
      <Meta />
      <ContactForm />
    </Site.Provider>
  )
}

export default Contact
