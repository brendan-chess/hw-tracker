import { useState } from 'react'
import './Assignment.css'
import edit from './edit.svg'
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from "firebase/firestore"

const Assignment = ({ data, getAllAssignments }) => {
  const [showEditMenu, setShowEditMenu] = useState(false)

  const onClickStep = async (index) => {
    const newSteps = [...data.steps]
    newSteps[index].completed = !newSteps[index].completed

    const stepsCompleted = newSteps.reduce((previous, current) => {
      if(current.completed) return previous += 1
      return previous
    }, 0)

    const newProgress = Math.round((stepsCompleted / newSteps.length) * 100)
    
    const assignmentRef = doc(db, 'assignments', data.id)
    await updateDoc(assignmentRef, {
      steps: newSteps,
      progress: newProgress
    })

    getAllAssignments()
  }

  const deleteAssignment = async () =>  {
    await deleteDoc(doc(db, 'assignments', data.id))

    getAllAssignments()
  }

  return (
    <div className="Assignment-container">
      <div className="Assignment-top">
        <div className="Assignment-subject" style={{ backgroundColor: data.subjectColor }}>{data.subject}</div>
        <div className="Assignment-progress-bar">
          <div className="Assignment-progress-bar-background">
            <div className="Assignment-progress-bar-filler" style={{ width: `${data.progress}%` }} />
          </div>
        </div>
        <div className="Assignment-progress">{data.progress}%</div>
        <div 
          className='Assignment-edit' 
          onMouseEnter={() => setShowEditMenu(true)}
          onMouseLeave={() => setShowEditMenu(false)}
        >
          <img className='Assignment-edit-img' src={edit} />
          {
            showEditMenu && (
              <div className='Assignment-edit-menu'>
                <div className='Assignment-edit-menu-text'>Edit</div>
                <div className='Assignment-edit-menu-divider' />
                <div className='Assignment-edit-menu-text' style={{ color: '#EB9486' }} onClick={deleteAssignment}>Delete</div>
              </div>
            )
          }
        </div>
      </div>
      <div className="Assignment-header">
        <div className="Assignment-title">{data.title}</div>
        <div className="Assignment-due-date">
          <div>{data.due.date}</div>
          <div>{data.due.time}</div>
        </div>
      </div>
      {data.steps.map((step, index)=> {
        return (
          <div className="Assignment-step" key={index} onClick={() => onClickStep(index)}>
            <div className={step.completed ? "Assignment-step-check-completed" : "Assignment-step-check-incomplete"} />
            <div className={`Assignment-step-title ${step.completed ? "Assignment-step-title-completed " : ""}`}>{step.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Assignment
