import { useState, useEffect, useContext } from 'react'
import { Logged, apiUrl, siteKey } from '../utils/context'
import Loading from '../utils/loading'
import Field from '../utils/fields'

const fields = [
  {
    name: 'username',
    field: 'text',
    label: 'Nazwa użytkownika',
    required: true,
  },
  {
    name: 'password',
    field: 'password',
    label: 'Hasło',
    required: true,
  },
]

const LoginForm = () => {
  const [, setLogged] = useContext(Logged)
  const [loading, setLoading] = useState(false)
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
    let valid = true

    for (const key in errors) {
      !values[key] ?
      setErrors(state => ({ ...state, [key]: 'To pole jest wymagane' })) || (valid = false) :
      setErrors(state => ({ ...state, [key]: '' }))
    }
  
    return valid && formSubmit()
  }

  const formSubmit = async () => {
    setLoading(true)

    try {
      const resp = await fetch(`${apiUrl}?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const {success} = await resp.json()
      if (!success) throw new Error()
      setLogged(true)
      sessionStorage.setItem('token', token)
    }
    catch {
      setLoading(false)
      setError(state => state + 1)
    }
  }

  return (
    <section>
      <div className="container wide">
        <h2 className="section-header">Panel administracyjny</h2>
        <form onSubmit={formValidation}>
          {loading ? <Loading /> : undefined}
          {fields.map(({name, field, label}) => (
            <Field
              key={name}
              field={field}
              name={name}
              value={values[name]}
              handleChange={(name, value) => setValues(state => ({ ...state, [name]: value }))}
              className="admin-input"
              label={label}
              error={errors[name]}
            />
          ))}
          <button className="admin-input" type="submit">Zaloguj się</button>
          {error ? <p className="error">Nieprawidłowy login lub hasło</p> : undefined}
        </form>
      </div>
    </section>
  )
}

export default LoginForm
