import { useState, useEffect } from 'react'
import Overview from './components/Overview'
import EditPopup from './components/EditPopup'
import NewSubjectPopup from './components/NewSubjectPopup'
import Links from './components/Links'
import NewLinkPopup from './components/NewLinkPopup'
import Sidebar from './components/Sidebar'
import Ranking from './components/Ranking'
import Habits from './components/Habits'
import NewHabitPopup from './components/NewHabitPopup'
import './App.css'
import showSidebarIcon from './assets/sidebar-icon.svg'
import DeleteHabitsPopup from './components/DeleteHabitsPopup'
import DataService from './service/data'
import Login from './components/Login'

const App = () => {
  const [subjects, setSubjects] = useState([])
  const [activeEditing, setActiveEditing] = useState(null)
  const [currentlyEditedSubject, setCurrentlyEditedSubject] = useState(null)
  const [addingNewSubj, setAddingNewSubj] = useState(false)
  const [newSubjInput, setNewSubjInput] = useState('')
  const [newCreditInput, setNewCreditInput] = useState('')

  const [links, setLinks] = useState([])
  const [activeLinkEditing, setActiveLinkEditing] = useState(null)
  const [curLinkName, setCurLinkName] = useState('')
  const [curLinkInput, setCurLinkInput] = useState('')
  const [deletingLinks, setDeletingLinks] = useState(false)

  const [curExamInput, setCurExamInput] = useState('')
  const [curTodoInput, setCurTodoInput] = useState('')

  const [habits, setHabits] = useState([])
  const [activeHabitEditing, setActiveHabitEditing] = useState(false)
  const [curHabitInput, setCurHabitInput] = useState('')
  const [activeHabitDeleting, setActiveHabitDeleting] = useState(false)

  const [sidebarVisible, setSidebarVisible] = useState(false)

  const [userId, setUserId] = useState(null)
  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [major, setMajor] = useState('')
  const [loginStatus, setLoginStatus] = useState('no-login-yet')
  const [signupStatus, setSignupStatus] = useState('no-signup-yet')

  const [score, setScore] = useState(0)

  // function to get current Subject data after first rendering and set the state
  const hook = () => {
    const storedUserId = localStorage.getItem('user')
    if (storedUserId !== null) {
      const id = JSON.parse(storedUserId)
      setUserId(id)
      DataService.getAllData(id)
        .then(data => {
          setSubjects(data.subjects)
          setLinks(data.links)
          setHabits(data.habits)
      })
    } else {
      setUserId(null)
    }
  }

  useEffect(hook, [])

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date()
  const dateToday = today.toLocaleDateString("de", options)

  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()

  const formattedDate = `${day}-${month}-${year}`

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
  const cancelEditing = () => {
    setActiveEditing(null)
    setCurrentlyEditedSubject(null)
    setAddingNewSubj(false)
    setActiveLinkEditing(null)
    setActiveHabitEditing(false)
    setActiveHabitDeleting(false)
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

  const handleCurrentCreditInput = (event) => {
    console.log(event.target.value)
    setNewCreditInput(event.target.value)
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
      "credits": newCreditInput,
      "exams": [],
      "todos": [],
      "id": id,
      "userId": userId
    }
  
    updatedSubjects.push(newSubjObj)

    setAddingNewSubj(false)
    setSubjects(updatedSubjects)
    setNewSubjInput('')
    setNewCreditInput('')

    // send new subject to backend
    DataService
      .addSubject(newSubjObj, userId)
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
      "url": curLinkInput.includes('https://') ? curLinkInput : 'https://' + curLinkInput,
      "id": links.length + 1,
      "userId": userId
    }
    console.log(newLink)
    linksCopy.push(newLink)
    setLinks(linksCopy)
    setCurLinkName('')
    setCurLinkInput('')
    setActiveLinkEditing(null)

    // send new link to backend
    DataService
      .addLink(newLink, userId)
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

  const toggleSidebar = () => {
    const mainContainer = document.querySelector('.main-container')
    if (sidebarVisible) {
      setSidebarVisible(false)
      mainContainer.style.marginLeft = '0px'
    } else {
      setSidebarVisible(true)
      mainContainer.style.marginLeft = '210px'
    }
  }

  const handleNewhabit = () => {
    setActiveHabitEditing(true)
  }

  const handleHabitNameChange = (event) => {
    setCurHabitInput(event.target.value)
  }

  const createNewHabit = (event) => {
    event.preventDefault()
    let habitsCopy = [...habits]
    let newHabit = {
      "name": curHabitInput,
      "nextDate": formattedDate,
      "userId": userId
    }

    setCurHabitInput('')
    setActiveHabitEditing(false)

    // send new habit to backend
    DataService
      .addHabit(newHabit, userId)
      .then(habit => {
        newHabit = habit
        habitsCopy.push(newHabit)
        setHabits(habitsCopy)
      })

  }

  const toggleDeleteHabitPopup = () => {
    setActiveHabitDeleting(!activeHabitDeleting)
  }

  const deleteHabit = (id) => {
    const confirmation = confirm('Do you really want to delete this Habit?')
    if (confirmation) {
      let habitsCopy = [...habits]
      habitsCopy = habitsCopy.filter(h => h.id !== id)
      setHabits(habitsCopy)
      setActiveHabitDeleting(false)

      DataService
        .deleteHabit(id)
        .then(h => console.log('Deleted habit ' + h))
    }
  }

  const completedHabit = (id) => {
    const newScore = score + 5
    setScore(newScore)
    let habitsCopy = [...habits]
    for (let i = 0; i < habitsCopy.length; i++) {
      if (habitsCopy[i].id === id) {
        habitsCopy[i].nextDate = (today.getDate() + 1) + month + '-' + year
        setHabits(habitsCopy)
        setActiveHabitDeleting(false)
        DataService
          .completedHabit(id, habitsCopy[i].nextDate, userId)
          .then(h => console.log('Updated Habit ' + h))
      }
    }
  }

  const toggleLogin = () => {
    setLogin(!login)
    setUsername('')
    setPassword('')
    setMajor('')
  }

  const handleCurrentEmailInput = (event) => {
      setEmail(event.target.value)
  }

  const handleCurrentUsernameInput = (event) => {
      setUsername(event.target.value)
  }

  const handleCurrentPasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleCurrentMajorInput = (event) => {
    setMajor(event.target.value)
  }

  const loginUser = (event) => {
    event.preventDefault()
    const userData = {
      username: username,
      password: password
    }

    DataService
      .loginUser(userData)
      .then(response => {
        if (response.status === null) {
            console.log(response.status)
            setLoginStatus('login-failed')
            setUsername('')
            setPassword('')
        } else {
          setUserId(response.id)
          saveUserIdToStorage(response.id)
          hook()
        }
      })
  }

  const signupUser = (event) => {
    event.preventDefault()

    const userData = {
      username: username,
      password: password,
      major: major,
      score: 0,
      email: email,
      createdAt: formattedDate
    }

    DataService
      .signupUser(userData)
      .then(response => {
        if (response.status === null) {
          console.log(response.status)
          setSignupStatus('signup-failed')
        } else {
          setUserId(response.id)
          saveUserIdToStorage(response.id)
          hook()
        }
      })
  }

  const saveUserIdToStorage = (id) => {
    localStorage.setItem('user', JSON.stringify(id))
  }

  const logOut = () => {
    setUserId(null)
    localStorage.removeItem('user')
    setSidebarVisible(false)
  }
  
  if (userId !== null) {
    return (
      <div className='container-wrapper'>
        {(sidebarVisible === true) ? (
          <div className='container-left'>
            <img onClick={() => toggleSidebar()} className="show-sidebar-icon" src={showSidebarIcon} alt="" />
            <Sidebar
              logOut={logOut}
            />
          </div>
        ) : (
          <div>
            <img onClick={() => toggleSidebar()} className="show-sidebar-icon" src={showSidebarIcon} alt="" />
          </div>
        )} 
        <div className='main-container'>
        
        <div className='hero-wrapper'>
          <div className='header'>
            <h1 className='date-today'>Heute ist {dateToday}</h1>
            <h1 className='main-heading'>Module</h1>
          </div>
        </div>
        <Links links={links} addNewLink={handleNewLink} deletingLinks={deletingLinks} handleLinkDeletion={handleLinkDeletion}/>
        {(activeLinkEditing !== null) ? (
          <NewLinkPopup
            curLinkName={curLinkName}
            currentLink={curLinkInput}
            setCurLinkName={handleLinkNameChange}
            setCurLink={handleLinkChange}
            cancelEditing={cancelEditing}
            createNewLink={saveLink}
            />
        ) : ""}
        <br />
        {(activeHabitEditing !== false) ? (
          <NewHabitPopup
            cancelEditing={cancelEditing}
            handleHabitNameChange={handleHabitNameChange}
            curHabitInput={curHabitInput}
            createNewHabit={createNewHabit} 
          />
        ) : ""}
        <br />
        {(activeHabitDeleting === true) ? (
          <DeleteHabitsPopup 
            cancelEditing={cancelEditing}
            allHabits={habits}
            deleteHabit={deleteHabit}
          />
        ) : ""}
        <Overview subjects={subjects} handleEdit={handleSubjectEdit} handleNewSubjectPopup={handleNewSubjectPopup}/>
        {(addingNewSubj !== false) ? (
          <NewSubjectPopup
            setSubjectInput={handleCurSubjectInput}
            currentSubjectInput={newSubjInput}
            currentCreditInput={newCreditInput}
            setCreditInput={handleCurrentCreditInput}
            createNewSubject={createNewSubject}
            cancelEditing={cancelEditing}
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
            cancelEditing={cancelEditing}
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
      <div className='container-right'>
        <Ranking /> 
        <Habits
          handleNewHabit={handleNewhabit}
          habits={habits}
          dateToday={formattedDate}
          editHabits={toggleDeleteHabitPopup}
          completedHabit={completedHabit}
        /> 
      </div>
      </div>
    )
  } else {
    // login or register user
    return (
      <div>
        <Login 
          toggleLogin={toggleLogin}
          login={login}
          handleCurrentEmailInput={handleCurrentEmailInput}
          currentEmail={email}
          handleCurrentUsernameInput={handleCurrentUsernameInput}
          currentUsername={username}
          handleCurrentPasswordInput={handleCurrentPasswordInput}
          currentPassword={password}
          handleCurrentMajorInput={handleCurrentMajorInput}
          currentMajor={major}
          loginUser={loginUser}
          signupUser={signupUser}
          loginStatus={loginStatus}
          signupStatus={signupStatus}
        />
      </div>
    )
  }
  
}

export default App
