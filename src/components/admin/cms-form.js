import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import None from '../../pages/none'
import { Data, apiUrl } from '../utils/context'
import Loading from '../utils/loading'
import Field from '../utils/fields'

const CMSForm = () => {
  const [data, setData] = useContext(Data)
  const [remove, setRemove] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const type = data.types.find(({slug}) => slug === params.type)
  const fields = type?.fields
  const item = data[params.type]?.find(({slug}) => slug === params.slug)
  const [values, setValues] = useState(item ? item : fields && Object.assign(...fields.map(({name}) => ({[name]: ''}))))
  const [errors, setErrors] = useState(fields && Object.assign(...fields.map(({name, required}) => required ? {[name]: ''} : {})))

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

    const formData = new FormData()
    for (const key in values) formData.append(key, values[key])

    try {
      const resp = await fetch(`${apiUrl}/${item ? `${params.type}/${params.slug}` : params.type}?token=${sessionStorage.getItem('token')}`, {
        method: item ? 'PUT' : 'POST',
        body: formData,
      })
      const {success, data} = await resp.json()
      if (!success) throw new Error()
      setData(data)
      navigate('..')
    }
    catch {
      setLoading(false)
      setError(true)
    }
  }

  const deleteForm = async () => {
    setLoading(true)

    try {
      const resp = await fetch(`${apiUrl}/${params.type}/${params.slug}?token=${sessionStorage.getItem('token')}`, {
        method: 'DELETE',
      })
      const {success, data} = await resp.json()
      if (!success) throw new Error()
      setData(data)
      navigate('..')
    }
    catch {
      setLoading(false)
      setError(true)
    }
  }

  return (
    !fields ? <None /> :
    <>
      <h3>{item ? 'Edycja elementu' : 'Dodawanie nowego elementu'}</h3>
      <form onSubmit={formValidation} encType="multipart/form-data">
        {loading ? <Loading /> : undefined}
        {fields.map(({name, field, label, options}) => (
          <Field
            key={name}
            field={field}
            name={name}
            value={values[name]}
            handleChange={(name, value) => setValues(state => ({ ...state, [name]: value }))}
            className="cms-input"
            label={label}
            options={options && options.map(option => data[option]).flat()}
            error={errors[name]}
          />
        ))}
        <button type="submit">Zapisz</button>
        {item ?
        <>
          <h3>Usuwanie elementu</h3>
          <button type="button" className="remove-option" onClick={() => setRemove(state => !state)}>Usuń element</button>
          {remove ? <button type="button" onClick={deleteForm}>Potwierdź usunięcie</button> : undefined}
        </>
        : undefined}
        {error ? <p className="error">Przepraszamy. Błąd połączenia</p> : undefined}
      </form>
    </>
  )
}

export default CMSForm
