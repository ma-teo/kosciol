import { Site } from '../components/utils/context'
import Meta from '../components/utils/meta'
import Error from '../components/none/error'

const site = {
  name: 'Błąd 404',
  slug: '404',
}

const None = () => (
  <Site.Provider value={site}>
    <Meta />
    <Error />
  </Site.Provider>
)

export default None
