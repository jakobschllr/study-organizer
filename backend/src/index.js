import app from './app.js'
import Subject from './models/subjects.js'
import Link from './models/links.js'

let data = {
    subjects: [
      {
        "title": "Grundlagen des Programmierens",
        "todos": ["Artemis Aufgaben erledigen", "Karteikarten anlegen"],
        "exams": ["Klausur am 07. Januar"],
        "id": "0"
      },
      {
        "title": "Technische Grundlagen der Informatik",
        "todos": ["Praktikum und Übung bis Freitag erledigen"],
        "exams": ["Klausur am 09. Januar"],
        "id": "1"
      },
      {
        "title": "Diskrete Strukturen",
        "todos": ["Lehrtext lesen, Jupyter Notebook bearbeiten, Kontrollfragen beantworten"],
        "exams": ["Klausur am 09. Januar"],
        "id": "2"
      },
  ],
  links: [
    {
      "name": "Stundenplan",
      "url": "https://stundenplan.ostfalia.de/i/Semester/Semester-grafisch/I-B.Sc.%201.%20Sem%20Informatik.html",
      "id": "0"
    },
    {
      "name": "Moodle",
      "url": "https://moodle.ostfalia.de/my/",
      "id": "1"
    },
    {
      "name": "Jupyter Notebook",
      "url": "https://jupyter-cloud.gwdg.de/jhub/hub/user/0902197/lab?",
      "id": "3"
    },
    {
      "name": "Artemis",
      "url" : "https://artemis.ise-i.ostfalia.de/",
      "id": "4"
    },
    {
      "name": "Outlook",
      "url": "https://owa.sonia.de/owa/#path=/mail",
      "id": "5"
    }
  ]
  }

app.get('/api/data', (request, response) => {
  Subject.find({}).then(subjects => {
    Link.find({}).then(links => {
      console.log({subjects: subjects, links: links})
      response.json({subjects: subjects, links: links})
    })
  })
})

// add subject
app.post('/api/data/subjects', (request, response) => {
  const newSubject = request.body

  const subject = new Subject({
    title: newSubject.title,
    todos: newSubject.todos,
    exams: newSubject.exams
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
  const updatedData = request.body
  const { title, todos, exams} = request.body

  Subject.findByIdAndUpdate(request.params.id, {title, todos, exams}, { new: true, runValidators: true, context: 'query'})
    .then(updatedSubject => {
      response.json(updatedSubject)
    })
})

// add link
app.post('/api/data/links', (request, response) => {
  const newLink = request.body

  const link = new Link({
    name: newLink.name,
    url: newLink.url
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
    response.status(204).end()
  } else {
    response.status(500).end() // internal server error
  }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})