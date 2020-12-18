import { useContext, useEffect } from 'react'
import { Data, Site } from './context'

const Meta = ({item}) => {
  const [{meta}] = useContext(Data)
  const site = useContext(Site)

  useEffect(() => {
    document.title =
      site.slug === 'home' ? meta.name :
      site.cat_name ? `${site.cat_name} - ${site.name} - ${meta.name}` :
      `${site.name} - ${meta.name}`

    document.querySelector('meta[name=description]').content =
      site.content?.replace(/(<([^>]+)>)/ig,"").slice(0, 150).concat('...') ||
      item?.content.replace(/(<([^>]+)>)/ig,"").slice(0, 150).concat('...') ||
      meta.content
  }, [])

  return null
}

export default Meta
