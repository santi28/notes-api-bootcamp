const { response } = require('express')
const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

// Create 3 notes with (id: number, content: string, date: ISOString, important: boolean)
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-10-20T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-10-20T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET is a method for requesting data',
    date: '2019-10-20T19:20:35.091Z',
    important: true
  }
]

app.get('/api/notes', (req, res) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(note => note.id === Number(id))

  if (note) res.json(note)
  else res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== Number(id))
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  const ids = notes.map(note => note.id)
  const id = Math.max(...ids) + 1

  const note = {
    id,
    content: body.content,
    important: typeof body.important !== 'undefined' ? body.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(note)
  res.json(note)
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`Server running on port ${PORT}`))
