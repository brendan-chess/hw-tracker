import './AssignmentsList.css'
import { useEffect, useState } from 'react'
import Assignment from '../Assignment/Assignment'
import { db } from '../../firebase'
import { collection, getDocs, orderBy, query } from "firebase/firestore"

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState(null)
  const subjectColors = {}
  const colors = ['#74D2EF', '#77BB8E', '#F3DE8A', '#EB9486', '#B99DBE']
  
  const getAllAssignments = async () => {
    const assignmentsQuery = query(collection(db, 'assignments'), orderBy('subject'))
    const querySnapshot = await getDocs(assignmentsQuery)
    const assignmentDocs = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()

      const subject = doc.data().subject
      let subjectColor = ''

      if(!(subject in subjectColors)) {
        subjectColors[subject] = colors[Object.keys(subjectColors).length]
      }

      subjectColor = subjectColors[subject]

      assignmentDocs.push({...data, id: doc.id, subjectColor})
    })
    setAssignments(assignmentDocs)
  }

  useEffect(() => {
    getAllAssignments()
  }, [])

  return (
    <div>
      {
      assignments ?
      assignments.map(assignment => {
        return (
          <div className='AssignmentsList-container' key={assignment.id}>
            <Assignment data={assignment} getAllAssignments={getAllAssignments} />
            <div className='AssignmentsList-divider' />
          </div> 
        )
      })
      :
      <div>Loading</div>
      }
    </div>
  )
}

export default AssignmentsList
