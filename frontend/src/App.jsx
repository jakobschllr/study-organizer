import { useState, useEffect } from 'react'
import Overview from './components/Overview'
import EditPopup from './components/EditPopup'
import NewSubjectPopup from './components/NewSubjectPopup'
import Links from './components/Links'
import NewLinkPopup from './components/NewLinkPopup'
import './App.css'

import DataService from './service/data'

const App = () => {
  const [subjects, setSubjects] = useState(null)
  const [activeEditing, setActiveEditing] = useState(null)
  const [currentlyEditedSubject, setCurrentlyEditedSubject] = useState(null)
  const [addingNewSubj, setAddingNewSubj] = useState(false)
  const [newSubjInput, setNewSubjInput] = useState('')

  const [links, setLinks] = useState(null)
  const [activeLinkEditing, setActiveLinkEditing] = useState(null)
  const [curLinkName, setCurLinkName] = useState('')
  const [curLinkInput, setCurLinkInput] = useState('')
  const [deletingLinks, setDeletingLinks] = useState(false)

  const [curExamInput, setCurExamInput] = useState('')
  const [curTodoInput, setCurTodoInput] = useState('')

  // function to get current Subject data after first rendering and set the state
  const hook = () => {
    DataService.getAllData().then(data => {
      console.log(data)
      console.log(data.links)
      setSubjects(data.subjects)
      setLinks(data.links)
      
    })
  }

  useEffect(hook, [])

  if (!subjects) {
    return null
  }

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date()
  const dateToday = today.toLocaleDateString("de", options)

  // handles the editing of the information of the subject opened in the editing popup
  const handleSubjectEdit = (id) => {
    const currentSubjects = subjects;
    const copyOfCurrentSubjects = [...currentSubjects]
    const currentlyEditedSubj = copyOfCurrentSubjects.filter(s => s.id === id)[0]
    console.log(currentlyEditedSubj)
    setCurrentlyEditedSubject(currentlyEditedSubj)
    setActiveEditing(id)
  }

  // saves the changes made to the information of a subject made in the editing window
  const saveSubjectChanges = (updatedSubj, id) => {
    // change states
    setCurrentlyEditedSubject(null)
    setActiveEditing(null)
    let updatedSubjects = [...subjects]
    updatedSubjects = updatedSubjects.map(subject => {
      if (subject.id === id) {
        return updatedSubj
      }
      return subject
    })
    setSubjects(updatedSubjects)

    // update backend with new changes
    DataService
      .updateSubject(id, updatedSubj)
      .then(subj => console.log(subj))
  }

  // cancels the changes that were made if the user closes the editing window without saving
  const cancelSubjectEditing = () => {
    setActiveEditing(null)
    setCurrentlyEditedSubject(null)
    setAddingNewSubj(false)
    setActiveLinkEditing(null)
  }

  // handles the deletion of a date in the editing-popup
  const handleExamDeletion = (exam) => {
    const newCurrentlyEditedSubject = {
      ...currentlyEditedSubject,
      exams: currentlyEditedSubject.exams.filter(e => e !== exam)
    }
    setCurrentlyEditedSubject(newCurrentlyEditedSubject)
  }

  // handles the deletion of a todo in the editing-popup
  const handleTodoDeletion = (todo) => {
    const newCurrentlyEditedSubject = {
      ...currentlyEditedSubject,
      todos: currentlyEditedSubject.todos.filter(t => t !== todo)
    }
    setCurrentlyEditedSubject(newCurrentlyEditedSubject)
  }

  // handles the addition of a todo in the editing-popup
  const handleTodoAddition = (event) => {
    event.preventDefault()
    const newCurrentlyEditedSubject = {
      ...currentlyEditedSubject,
      todos: [...currentlyEditedSubject.todos]
    }

    newCurrentlyEditedSubject.todos.push(curTodoInput)
    setCurrentlyEditedSubject(newCurrentlyEditedSubject)
    setCurTodoInput('')
  }

    // handles the addition of a date in the editing-popup
  const handleExamAddition = (event) => {
    event.preventDefault()
    const newCurrentlyEditedSubject = {
      ...currentlyEditedSubject,
      exams: [...currentlyEditedSubject.exams]
    }
    newCurrentlyEditedSubject.exams.push(curExamInput)
    setCurrentlyEditedSubject(newCurrentlyEditedSubject)
    setCurExamInput('')
    // bug: new date is already added to overview section without popup being closed
  }

  // handles changes made to the state that saves the current date input in the editing popup
  const handleCurrentExamChange = (event) => {
    setCurExamInput(event.target.value)
    console.log(event.target.value)
  }
  // handles changes made to the state that saves the current todo input in the editing popup
  const handleCurrentTodoChange = (event) => {
    setCurTodoInput(event.target.value)
    console.log(event.target.value)
  }

  // deletes a subject 
  const deleteSubject = (id) => {
    const subjectName = subjects.filter(s => s.id === id)[0].title
    const confirmation = confirm(`Do you really want to delete the subject:\n${subjectName}?`)
    if (confirmation) {
      setCurrentlyEditedSubject(null)
      setActiveEditing(null)
      let updatedSubjects = [...subjects]
      updatedSubjects = updatedSubjects.filter(s => s.id != id)
      setSubjects(updatedSubjects)

      DataService
        .deleteSubject(id)
        .then(subj => console.log('Deleted Subject: ' + subj))

    }
  }

  // enables that the popup for creating a new subject opens on the next rendering
  const handleNewSubjectPopup = () => {
    setAddingNewSubj(true)
  }

  // saves the input of the subject that is created in the state newSubjectInput
  const handleCurSubjectInput = (event) => {
    console.log(event.target.value)
    setNewSubjInput(event.target.value)
  }

  // saves the newly created subject to state subjects
  const createNewSubject = () => {
    const updatedSubjects = [...subjects]
    const id = subjects.length
    const newSubjObj = {
      "title": newSubjInput,
      "exams": [],
      "todos": [],
      "id": id
    }
  
    updatedSubjects.push(newSubjObj)

    setAddingNewSubj(false)
    setSubjects(updatedSubjects)
    setNewSubjInput('')

    // send new subject to backend
    DataService
      .addSubject(newSubjObj)
      .then(subj => console.log('Added Subject: ' + subj))
  }

  const handleNewLink = () => {
    setActiveLinkEditing(true)
  }

  const handleLinkNameChange = (event) => {
    setCurLinkName(event.target.value)
  }

  const handleLinkChange = (event)  => {
    console.log(event.target.value)
    setCurLinkInput(event.target.value)
  }

  const saveLink = (event) => {
    event.preventDefault()
    console.log("is executed")
    let linksCopy = [...links]
    const newLink = {
      "name": curLinkName,
      "url": "https://" + curLinkInput,
      "id": links.length + 1
    }
    console.log(newLink)
    linksCopy.push(newLink)
    setLinks(linksCopy)
    setCurLinkName('')
    setCurLinkInput('')
    setActiveLinkEditing(null)

    // send new link to backend
    DataService
      .addLink(newLink)
      .then(link => console.log('Added Link: ' + link))
  }

  const handleLinkDeletion = (ids) => {
    setDeletingLinks(!deletingLinks)
    if (ids.length !== 0) {
      const currentLinks = [...links]
      const newLinks = currentLinks.filter(l => ids.includes(l.id) === false)
      setLinks(newLinks)
      DataService
        .updateLinks(ids)
        .then(links => console.log('Updated Links: ' + links))
    }
  }

  return (
    <div>
      <div className='header'>
        <h1 className='date-today'>Heute ist {dateToday}</h1>
        <h1 className='main-heading'>Study Organizer 📓</h1>
      </div>
      <Links links={links} addNewLink={handleNewLink} deletingLinks={deletingLinks} handleLinkDeletion={handleLinkDeletion}/>
      {(activeLinkEditing !== null) ? (
        <NewLinkPopup
          curLinkName={curLinkName}
          currentLink={curLinkInput}
          setCurLinkName={handleLinkNameChange}
          setCurLink={handleLinkChange}
          cancelEditing={cancelSubjectEditing}
          createNewLink={saveLink}
          />
      ) : ""}
      <br />
      <Overview subjects={subjects} handleEdit={handleSubjectEdit} handleNewSubjectPopup={handleNewSubjectPopup}/>
      {(addingNewSubj !== false) ? (
        <NewSubjectPopup
          setSubjectInput={handleCurSubjectInput}
          currentSubjectInput={newSubjInput}
          createNewSubject={createNewSubject}
          cancelEditing={cancelSubjectEditing}
          />
      ) : (
        <br />
      )}
      {(activeEditing !== null) ? (
        <EditPopup
          subject={currentlyEditedSubject}
          deleteExam={handleExamDeletion}
          addExam={handleExamAddition}
          deleteTodo={handleTodoDeletion}
          addTodo={handleTodoAddition}
          id={activeEditing}
          saveChanges={saveSubjectChanges}
          cancelEditing={cancelSubjectEditing}
          handleExamInput={handleCurrentExamChange}
          handleTodoInput={handleCurrentTodoChange}
          currentExamInput={curExamInput}
          currentTodoInput={curTodoInput}
          deleteSubject={deleteSubject}
          />
      ) : (
        <br />
      )}
    </div>
  )
}

export default App
