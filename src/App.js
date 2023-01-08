import { useEffect, useMemo, useState } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { listNotes } from "./graphql/queries"
import { createNote, deleteNote } from "./graphql/mutations"

function App() {
  const [notes, setNotes] = useState([])
  const [formState, setFormState] = useState({ title: "", note: "" })

  const handleSubmit = async () => {
    const { data, errors } = await API.graphql(
      graphqlOperation(createNote, { input: formState })
    )
    if (errors) return
    setNotes([data.createNote, ...notes])
    setFormState({ title: "", note: "" })
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    let nextState = { ...formState }
    nextState[name] = value

    setFormState(nextState)
  }

  const validateForm = useMemo(() => {
    return formState.title === "" || formState.note === ""
  }, [formState])

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

  return (
    <div className="m-4  text-gray-700">
      <div className="text-lg">Note Taking App</div>

      <div className="mt-2">
        <div className="flex gap-2 my-2">
          <span>Title</span>
          <input
            className="border px-1"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            type="text"
            value={formState.title}
          />
        </div>

        <div className="flex gap-2 my-2">
          <span>Note</span>
          <input
            className="border px-1"
            name="note"
            placeholder="Note"
            type="text"
            onChange={handleChange}
            value={formState.note}
          />
        </div>

        <div className="my-2">
          <button
            className="bg-black px-4 py-1 rounded-md text-slate-400"
            disabled={validateForm}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <div className="text-lg">Notes!</div>
        {notes.map(({ id, title, note }, index) => (
          <div
            key={index}
            className="border flex items-center justify-between  my-2 p-8 rounded-md"
          >
            <div className="flex flex-col">
              <div className="text-xl">{title}</div>
              <div>{note}</div>
            </div>
            <div>
              <div className="cursor-pointer" onClick={() => handleDelete(id)}>
                Del
              </div>
              <div>Edit</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
