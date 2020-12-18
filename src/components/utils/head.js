import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { Data } from "./context"

const Head = () => {
  const [{meta, pages, cats, arts}] = useContext(Data)
  const {pathname} = useLocation()

  const site =
    pathname === '/' ?
      pages.find(({slug}) => slug === 'home') :
    pathname.match(/^\/admin\/?$/) ?
      {name: 'Panel administracyjny', slug: 'admin'} :
    pathname.match(/^\/kontakt\/?$/) ?
      pages.find(({slug}) => slug === 'kontakt') :
    pathname.match(/^\/[a-z0-9-]+\/?$/) && cats.find(({slug}) => slug === pathname.split('/')[1]) ?
      cats.find(({slug}) => slug === pathname.split('/')[1]) :
    pathname.match(/^\/[a-z0-9-]+\/[a-z0-9-]+\/?$/) && arts.find(({slug}) => slug === pathname.split('/')[2]) ?
      arts.find(({slug}) => slug === pathname.split('/')[2]) :
    {name: 'Błąd 404', slug: '404'}

  const items =
    pathname.match(/^\/[a-z0-9-]+\/?$/) && cats.find(({slug}) => slug === pathname.split('/')[1]) ?
      arts.filter(({cat_slug}) => cat_slug === pathname.split('/')[1]).sort((a, b) => new Date(b.date) - new Date(a.date)) :
    []

  const title =
    site.slug === 'home' ? meta.name :
    site.cat_name ? `${site.cat_name} - ${site.name} - ${meta.name}` :
    `${site.name} - ${meta.name}`

  const content =
    site.content?.replace(/(<([^>]+)>)/ig,"").slice(0, 150).concat('...') ||
    items[0]?.content.replace(/(<([^>]+)>)/ig,"").slice(0, 150).concat('...') ||
    meta.content

  return (
    <>
      <meta name="description" content={content} />
      <title>{title}</title>
    </>
  )
}

export default Head
