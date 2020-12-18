import { useEffect, useContext, useRef } from 'react'
import { Data, Observer, mediaUrl } from '../utils/context'

const ContactLink = ({className, link, mail, children}) => (
  <li>
    <a
      className={`contact-link ${className}`}
      href={link}
      target={mail ? undefined : '_blank'}
      rel={mail ? undefined : 'noopener noreferrer'}
      children={children}
    />
  </li>
)

const Footer = () => {
  const [{meta}] = useContext(Data)
  const observer = useContext(Observer)
  const imgRef = useRef()
  const fbRef = useRef()

  useEffect(() => observer.observe(imgRef.current), [])
  useEffect(() => observer.observe(fbRef.current), [])

  return (
    <>
      <section>
        <div className="container wide">
          <div className="row">
            <div className="col-66">
              <h2 className="section-header">Kontakt</h2>
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 225'%3E%3C/svg%3E" data-src={`${mediaUrl}/kontakt.jpg`} alt="" ref={imgRef} />
              <noscript>
                <img loading="lazy" src={`${mediaUrl}/kontakt.jpg`} alt="" />
              </noscript>
              <div className="row">
                <div className="col-auto">
                  <h3 className="section-item-header">Kontakt z nami</h3>
                  <ul className="contact-list">
                    <ContactLink className="email-icon" link="mailto:kontakt@kosciolwroclaw.pl" mail={true}>
                      Email
                    </ContactLink>
                    <ContactLink className="facebook-icon" link="https://www.facebook.com/KosciolyDomoweWroclaw">
                      Facebook
                    </ContactLink>
                    <ContactLink className="messenger-icon" link="https://m.me/KosciolyDomoweWroclaw">
                      Messenger
                    </ContactLink>
                    <ContactLink className="youtube-icon" link="https://www.youtube.com/channel/UCN8o0hWM0uYTP37zPJ0GMUA">
                      YouTube
                    </ContactLink>
                  </ul>
                </div>
                <div className="col-auto">
                  <h3 className="section-item-header">Nasi przyjaciele</h3>
                  <ul className="contact-list">
                    <ContactLink className="link-icon" link="https://kosciolydomowe.com">
                      Fundacja DNA Polska
                    </ContactLink>
                    <ContactLink className="facebook-icon" link="https://www.facebook.com/Kościół-domowy-Warszawa-306188746451649">
                      Kościół Domowy Warszawa
                    </ContactLink>
                    <ContactLink className="facebook-icon" link="https://www.facebook.com/koscioldomowyrzeszow">
                      Kościół Domowy Rzeszów
                    </ContactLink>
                    <ContactLink className="facebook-icon" link="https://www.facebook.com/kosciolorganiczny">
                      Kościół Domowy Kraków
                    </ContactLink>
                    <ContactLink className="facebook-icon" link="https://www.facebook.com/KosciolDomowyPoznan">
                      Kościół Domowy Poznań
                    </ContactLink>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <iframe
                className="facebook"
                width="320"
                height="500"
                title="Facebook"
                data-src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKosciolyDomoweWroclaw&tabs=timeline%2C%20events&width=320&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                ref={fbRef}
              />
              <noscript>
                <iframe
                  className="facebook"
                  width="320"
                  height="500"
                  title="Facebook"
                  loading="lazy"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKosciolyDomoweWroclaw&tabs=timeline%2C%20events&width=320&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
                />
              </noscript>
            </div>
          </div>
        </div>
      </section>
      <footer className="body-footer" dangerouslySetInnerHTML={{__html: `${new Date().getFullYear()} &copy; ${meta.name}`}} />
    </>
  )
}

export default Footer
