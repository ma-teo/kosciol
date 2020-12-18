import { useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Observer, mediaUrl } from '../utils/context'

const HomeCat = props => {
  const observer = useContext(Observer)
  const imgRef = useRef()

  useEffect(() => observer.observe(imgRef.current), [])

  return (
    <section>
      <div className="container">
        <Link to={props.slug}>
          <h2 className="section-header">{props.name}</h2>
          <picture ref={imgRef}>
            <source media="(min-width: 850px)" data-srcset={`${mediaUrl}/1280/${props.image}`} />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E" data-src={`${mediaUrl}/640/${props.image}`} alt="" />
          </picture>
          <noscript>
            <picture>
              <source media="(min-width: 850px)" srcSet={`${mediaUrl}/1280/${props.image}`} />
              <img loading="lazy" src={`${mediaUrl}/640/${props.image}`} alt="" />
            </picture>
          </noscript>
        </Link>
        <div className="row">
          {props.arts.map((item, key) => (
            <Link key={key} to={`${item.cat_slug}/${item.slug}`}>
              <h3 className="section-item-header">{item.name}</h3>
              <p>{item.content.replace(/(<([^>]+)>)/ig,"").slice(0, 100).concat('...')}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeCat
