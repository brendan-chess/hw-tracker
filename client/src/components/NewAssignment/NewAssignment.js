import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"
import { db } from '../../firebase'
import Button from '../Button/Button'
import TextInput from '../TextInput/TextInput'
import './NewAssignment.css'

const NewAssignment = () => {
  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('11:59pm')
  const [stepInputs, setStepInputs] = useState([<TextInput value='Complete assignment' disabled />])

  const addStep = () => {
    setStepInputs([<TextInput />, ...stepInputs])
  }

  const onSubmit = async () => {
    const newAssignment = {
      progress: 0,
      steps: [
        {
          completed: false,
          title: "Complete assignment"
        }
      ],
      subject,
      title,
      due: {
        date: dueDate,
        time: dueTime
      }
    }

    await addDoc(collection(db, "assignments"), newAssignment)

    setSubject('')
    setTitle('')
    setDueDate('')
    setDueTime('11:59pm')
  }
  
  return (
    <div className='NewAssignment-container'>
      <div className='NewAssignment-row'>
        <TextInput label='SUBJECT' value={subject} setValue={setSubject} style={{ marginRight: 20 }} />
        <TextInput label='TITLE' value={title} setValue={setTitle} style={{ flex: 3 }} />
      </div>
      <div className='NewAssignment-row' style={{ width: 240, marginTop: 20, marginBottom: 20 }}>
        <TextInput label='DUE DATE' placeholder='Date' value={dueDate} setValue={setDueDate} style={{ marginRight: 20 }} />
        <TextInput placeholder='Time' value={dueTime} setValue={setDueTime} />
      </div>
      <div className='TextInput-label' style={{ width: 'min-content' }}>STEPS</div>
      <div className='NewAssignment-steps'>
        {stepInputs}
        <div className='NewAssignment-row'>
          <Button text='ADD STEP' color='green-outline' onClick={addStep} />
          <Button text='CREATE' color='green' onClick={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default NewAssignment
