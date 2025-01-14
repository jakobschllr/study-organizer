import app from './app.js'
import Subject from './models/subjects.js'
import Link from './models/links.js'
import Habit from './models/habits.js'
import User from './users/user.js'


app.get('/api/data', (request, response) => {
  const userId = request.body.userId
  Subject.find({ userId: userId }).then(subjects => {
    Link.find({ userId: userId }).then(links => {
      Habit.find({ userId: userId }).then(habits => {
        response.json({subjects: subjects, links: links, habits: habits})
      })
    })
  })
})

// add subject
app.post('/api/data/subjects', (request, response) => {
  const newSubject = request.body.subject
  const userId = request.body.userId

  const subject = new Subject({
    title: newSubject.title,
    credits: newSubject.credits,
    todos: newSubject.todos,
    exams: newSubject.exams,
    userId: userId
  })

  subject.save()
    .then(savedSubject => {
      response.json(savedSubject)
    })
})

// delete subject
app.delete('/api/data/subjects/:id', (request, response) => {
    Subject.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
})

// change subject
app.put('/api/data/subjects/:id', (request, response) => {
  const title = request.body.title
  const todos = request.body.todos
  const exams = request.body.exams

  Subject.findByIdAndUpdate(request.params.id, {title, todos, exams}, { new: true, runValidators: true, context: 'query'})
    .then(updatedSubject => {
      response.json(updatedSubject)
    })
})

// add link
app.post('/api/data/links', (request, response) => {
  const newLink = request.body.link
  const userId = request.body.userId

  const link = new Link({
    name: newLink.name,
    url: newLink.url,
    userId: userId
  })

  link.save()
    .then(savedLink => {
      response.json(savedLink)
    })
})

// delete link
app.put('/api/data/links', (request, response) => {
  const changedIds = request.body

  let success = true;

  for (let i = 0; i < changedIds.length; i++) {
    Link.findByIdAndDelete(changedIds[i])
      .then(result => {
        console.log("Deleted link with id: " + changedIds[i])
      })
      .catch(error => {
        console.log(error)
        success = false
      })
  }
  
  if (success) {
    response.status(204).end() // success
  } else {
    response.status(500).end() // internal server error
  }

})

// add habit
app.post('/api/data/habits', (request, response) => {
  const newHabit = request.body.habit
  const userId = request.body.userId
  const habit = new Habit({
    name: newHabit.name,
    nextDate: newHabit.nextDate,
    userId: userId
  })
  habit.save()
    .then(savedHabit => {
      response.json(savedHabit)
    })
})

// delete habit
app.delete('/api/data/habits/:id', (request, response) => {
  Habit.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

// check habit as done
app.put('/api/data/habits/:id', (request, response) => {
  console.log("Is executed")
  const { name, nextDate } = request.body
  Habit.findByIdAndUpdate(request.params.id, {name, nextDate}, {new: true, runValidators: true, context: 'query'})
    .then(updatedHabit => {
      response.json(updatedHabit)
    })
})

// login user
app.post('/api/data/users/login', (request, response) => {
  const userObj = request.body
  let foundUser = false
  User.find({}).then(users => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === userObj.username && users[i].password === userObj.password) {
        foundUser = true
        response.json(users[i])
      }
    }
    if (!foundUser) {
      response.json({status: null})
    }
  })
})

app.post('/api/data/users/signup', (request, response) => {
  const userObj = request.body
  const user = new User({
    username: userObj.username,
    major: userObj.major,
    password: userObj.password,
    score: userObj.score,
    email: userObj.email,
    createdAt: userObj.createdAt
  })

  user.save()
    .then(savedUser => {
      response.json(savedUser)
    })
    .catch(error => {
      response.json({status: null})
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})