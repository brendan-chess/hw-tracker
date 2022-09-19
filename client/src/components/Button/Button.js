import './Button.css'

const Button = ({ text, onClick, color }) => {
  return (
    <div className={`Button-container Button-${color}`} onClick={onClick}>{text}</div>
  )
}

export default Button
