import './TextInput.css'

const TextInput = ({ label, placeholder, value, setValue, disabled, style }) => {
  return (
    <div className='TextInput-container' style={style}>
      <div className='TextInput-label'>{label}</div>
      <input 
        className='TextInput-input' 
        type='text' 
        placeholder={placeholder} 
        onChange={event => setValue(event.target.value)}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput
