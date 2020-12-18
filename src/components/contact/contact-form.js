import { useState, useEffect } from 'react'
import { apiUrl, siteKey } from '../utils/context'
import Loading from '../utils/loading'
import Field from '../utils/fields'

const fields = [
  {
    name: 'user',
    field: 'text',
    label: 'Twoje imię',
    required: true,
  },
  {
    name: 'email',
    field: 'email',
    label: 'Twój adres e-mail',
    required: true,
  },
  {
    name: 'message',
    field: 'textarea',
    label: 'Twoja wiadomość',
    required: true,
  },
]

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(0)
  const [values, setValues] = useState(Object.assign(...fields.map(({name}) => ({[name]: ''}))))
  const [errors, setErrors] = useState(Object.assign(...fields.map(({name, required}) => required ? {[name]: ''} : {})))
  const [token, setToken] = useState()

  useEffect(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey)
      .then(token => setToken(token))
    })
  }, [error])

  const formValidation = e => {
    e.preventDefault()
    const reg = /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
    let valid = true

    for (const key in errors) {
      !values[key] ?
      setErrors(state => ({ ...state, [key]: 'To pole jest wymagane' })) || (valid = false) :
      key === 'email' && !reg.test(values[key]) ?
      setErrors(state => ({ ...state, [key]: 'Proszę podać prawidłowy adres e-mail' })) || (valid = false) :
      setErrors(state => ({ ...state, [key]: '' }))
    }
  
    return valid && formSubmit()
  }

  const formSubmit = async () => {
    setLoading(true)

    try {
      const resp = await fetch(`${apiUrl}/kontakt?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const {success} = await resp.json()
      if (!success) throw new Error()
      setSuccess(true)
    }
    catch {
      setError(state => state + 1)
    }

    setLoading(false)
  }

  return (
    <section>
      <div className="container wide">
        <h2 className="section-header">Napisz do nas</h2>
        {success ? <p className="main-info">Dziękujemy. Twoja wiadomość została wysłana</p> :
        <form onSubmit={formValidation}>
          {loading ? <Loading /> : undefined}
          {fields.map(({name, field, label}) => (
            <Field
              key={name}
              field={field}
              name={name}
              value={values[name]}
              handleChange={(name, value) => setValues(state => ({ ...state, [name]: value }))}
              className="contact-input"
              label={label}
              error={errors[name]}
            />
          ))}
          <button className="contact-input" type="submit">Wyślij wiadomość</button>
          {error ? <p className="error">Przepraszamy. Błąd połączenia</p> : undefined}
        </form>}
      </div>
    </section>
  )
}

export default ContactForm
