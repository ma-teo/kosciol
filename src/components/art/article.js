import { useContext } from 'react'
import { Site } from '../utils/context'

const Article = () => {
  const {content} = useContext(Site)

  return (
    <section>
      <div className="container wide">
        <article className="justify" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </section>
  )
}

export default Article
