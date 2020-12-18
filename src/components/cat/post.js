import { useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Observer, mediaUrl } from '../utils/context'

const Post = props => {
  const observer = useContext(Observer)
  const imgRef = useRef()

  useEffect(() => observer.observe(imgRef.current), [])

  return (
    <section>
      <div className="container wide">
        <Link className="row" to={props.slug}>
          <div className="col-33">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E" data-src={`${mediaUrl}/640/${props.image}`} alt="" ref={imgRef} />
            <noscript>
              <img loading="lazy" src={`${mediaUrl}/640/${props.image}`} alt="" />
            </noscript>
          </div>
          <div className="col-66 section-item">
            <h2 className="section-item-header">{props.name}</h2>
            <p className="justify">{props.content.replace(/(<([^>]+)>)/ig,"").slice(0, 250).concat('...')}</p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Post
