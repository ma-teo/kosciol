import { mediaUrl } from '../utils/context'

const Error = () => (
  <section>
    <div className="container wide">
      <img src={`${mediaUrl}/error.svg`} width="320" height="320" alt="" />
      <p className="main-info">Podana strona nie istnieje</p>
    </div>
  </section>
)

export default Error
