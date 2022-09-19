import './App.css'
import { useState } from 'react'
import sortIcon from './sort_icon.svg'
import AssignmentsList from './components/AssignmentsList/AssignmentsList'
import Button from './components/Button/Button'
import NewAssignment from './components/NewAssignment/NewAssignment'

function App() {
  // Show either the assignments list or the new assignment form
  const [showAssignmentsList, setShowAssignmentsList] = useState(true)
  const date = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="App">
      <div className='App-header'>
        <div className='App-date'>{days[date.getDay()]} {date.getMonth() + 1}/{date.getDate()}</div>
        <div className='App-divider'/>
      </div>
      <div className='App-buttons'>
        {
          showAssignmentsList ? 
          <div className='App-sort'>
            <img src={sortIcon} />
            <div className='App-sort-text'>BY SUBJECT</div>
          </div> 
          : 
          <div className='App-title'>New Assignment</div>
        }
        {
          showAssignmentsList ? 
          <Button text='NEW ASSIGNMENT' color='green' onClick={() => setShowAssignmentsList(false)} /> :
          <Button text='BACK' color='red' onClick={() => setShowAssignmentsList(true)} />
        }
      </div>
      {
        showAssignmentsList ?
        <AssignmentsList /> :
        <NewAssignment />
      }
    </div>
  )
}

export default App
