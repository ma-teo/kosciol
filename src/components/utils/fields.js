import { Editor } from '@tinymce/tinymce-react'

const Field = props => (
  <>
    {
      props.field === 'text' ? <Input {...props}  /> :
      props.field === 'email' ? <Input {...props} /> :
      props.field === 'password' ? <Input {...props} /> :
      props.field === 'date' ? <Input {...props} /> :
      props.field === 'file' ? <InputFile {...props} /> :
      props.field === 'select' ? <Select {...props} /> :
      props.field === 'textarea' ? <Textarea {...props} /> :
      props.field === 'editor' ? <TextEditor {...props} /> :
      undefined
    }
    {props.error ? <p className="error">{props.error}</p> : undefined}
  </>
)

const Input = props => (
  <input
    className={props.className}
    type={props.field}
    name={props.name}
    value={props.value}
    onChange={({target}) => props.handleChange(target.name, target.value)}
    placeholder={props.label}
    aria-label={props.label}
  />
)

const InputFile = props => (
  <label>
    {props.label}:
    <input
      className={props.className}
      type={props.field}
      name={props.name}
      accept="image/*"
      onChange={({target}) => props.handleChange(target.name, target.files[0])}
    />
  </label>
)

const Select = props => (
  <select
    className={props.className}
    name={props.name}
    value={props.value}
    onChange={({target}) => props.handleChange(target.name, target.value)}
    aria-label={props.label}
  >
    <option key="" value="" hidden={true} />
    {props.options.map(({name}) => <option key={name} value={name}>{name}</option>)}
  </select>
)

const Textarea = props => (
  <textarea
    className={props.className}
    name={props.name}
    value={props.value}
    onChange={({target}) => props.handleChange(target.name, target.value)}
    placeholder={props.label}
    aria-label={props.label}
  />
)

const TextEditor = props => (
  <Editor
    initialValue={props.value}
    init={{
      min_height: 400,
      plugins: 'lists link image code fullscreen',
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image code fullscreen',
      menubar: false,
      statusbar: false,
      entity_encoding : 'raw',
      placeholder: props.label,
    }}
    onEditorChange={content => props.handleChange(props.name, content)}
    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.6.1/tinymce.min.js"
  />
)

export default Field
