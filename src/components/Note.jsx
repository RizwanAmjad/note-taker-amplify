import React, { useEffect, useState } from "react"
import { Storage } from "aws-amplify"

function Note({ id, title, note, image, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState({ title, note })
  const [imageUrl, setImageUrl] = useState()

  const handleChange = ({ target }) => {
    const { name, value } = target
    let nextState = { ...formState }
    nextState[name] = value

    setFormState(nextState)
  }

  useEffect(() => {
    Storage.get(image).then((img) => setImageUrl(img))
  }, [])

  return (
    <div className="border flex items-center justify-between my-2 p-8 rounded-md">
      {isEditing ? (
        <>
          <div className="flex flex-col gap-2">
            <input
              className="border px-1 rounded text-xl"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={formState.title}
            />
            <input
              className="border px-1 rounded"
              name="note"
              placeholder="Note"
              type="text"
              onChange={handleChange}
              value={formState.note}
            />
          </div>
          <div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setIsEditing(!isEditing)
                onUpdate(formState, id)
              }}
            >
              Save!
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-8">
            <div className="h-full w-28 rounded overflow-hidden">
              <img src={imageUrl} />
            </div>
            <div className="flex flex-col">
              <div className="text-xl">{title}</div>
              <div>{note}</div>
            </div>
          </div>
          <div>
            <div className="cursor-pointer" onClick={() => onDelete(id)}>
              Del
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Note
