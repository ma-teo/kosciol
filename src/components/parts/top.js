import { useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Data, Site, Observer, mediaUrl } from '../utils/context'

const Top = () => {
  const [{meta}] = useContext(Data)
  const observer = useContext(Observer)
  const site = useContext(Site)
  const {cat, art} = useParams()
  const imgRef = useRef()

  useEffect(() => observer.observe(imgRef.current), [])

  return (
    <section className={`top${site.slug === 'home' ? ' home' : ''}`}>
      <picture ref={imgRef}>
        <source media="(max-width: 640px)" data-srcset={`${mediaUrl}/640/${site.image}`} />
        <source media="(max-width: 1280px)" data-srcset={`${mediaUrl}/1280/${site.image}`} />
        <img className="top-img" data-src={`${mediaUrl}/1920/${site.image}`} alt="" />
      </picture>
      <noscript>
        <picture>
          <source media="(max-width: 640px)" srcSet={`${mediaUrl}/640/${site.image}`} />
          <source media="(max-width: 1280px)" srcSet={`${mediaUrl}/1280/${site.image}`} />
          <img className="top-img" loading="lazy" src={`${mediaUrl}/1920/${site.image}`} alt="" />
        </picture>
      </noscript>
      <section className="top-section">
        <div className={`container${site.slug === 'home' ? '' : ' wide'}`}>
          {
            art ? <h1 className="article-header">{site.name}</h1> :
            cat ? <h1 className="section-header">{site.name}</h1> :
            <p className="main-info">{meta.content}</p>
          }
        </div>
      </section>
    </section>
  )
}

export default Top
