import { useEffect, useState } from "react"
import { API, graphqlOperation, Storage } from "aws-amplify"
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react"
import { listNotes } from "./graphql/queries"
import { createNote, deleteNote, updateNote } from "./graphql/mutations"

import Note from "./components/Note"
import NoteInput from "./components/NoteInput"

import "@aws-amplify/ui-react/styles.css"

function App({ signOut, user }) {
  const [notes, setNotes] = useState([])
  const [formState, setFormState] = useState({
    title: "",
    note: "",
    image: null,
  })

  const handleSubmit = async () => {
    const { title, note, image } = formState
    const { key } = await Storage.put(image.name, image)

    const { data, errors } = await API.graphql(
      graphqlOperation(createNote, {
        input: { title, note, image: key },
      })
    )
    if (errors) return
    setNotes([data.createNote, ...notes])
    setFormState({ title: "", note: "", image: null })
  }

  const handleChangeImage = ({ target }) => {
    setFormState({ ...formState, image: target.files[0] })
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    let nextState = { ...formState }
    nextState[name] = value

    setFormState(nextState)
  }

  useEffect(() => {
    API.graphql(graphqlOperation(listNotes)).then(({ data }) => {
      setNotes(data.listNotes.items)
    })
  }, [])

  const handleDelete = async (id) => {
    const { data } = await API.graphql(
      graphqlOperation(deleteNote, { input: { id } })
    )

    let nextNotes = [...notes]
    nextNotes = nextNotes.filter((note) => note.id !== data.deleteNote.id)
    setNotes(nextNotes)
  }

  const handleUpdate = async (updatedData, id) => {
    const { data } = await API.graphql(
      graphqlOperation(updateNote, { input: { ...updatedData, id } })
    )
    const nextNotes = notes.map((note) =>
      note.id === data.updateNote.id ? data.updateNote : note
    )
    setNotes(nextNotes)
  }

  return (
    <div className="m-4  text-gray-700">
      <div className="flex items-center justify-between">
        <Heading>{user.username}</Heading>
        <Button onClick={signOut}>SignOut</Button>
      </div>

      <NoteInput
        formState={formState}
        onStateChange={handleChange}
        onChangeImage={handleChangeImage}
        onSubmit={handleSubmit}
      />

      <div>
        <div className="text-lg">Notes!</div>
        {notes.map(({ id, title, note }) => (
          <Note
            key={id}
            id={id}
            title={title}
            note={note}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  )
}

export default withAuthenticator(App)
