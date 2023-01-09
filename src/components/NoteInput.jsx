import React, { useMemo } from "react"

function NoteInput({ formState, onStateChange, onSubmit }) {
  const validateForm = useMemo(() => {
    return formState.title === "" || formState.note === ""
  }, [formState])

  return (
    <>
      <div className="text-lg">Note Taking App</div>

      <div className="mt-2">
        <div className="flex gap-2 my-2">
          <span>Title</span>
          <input
            className="border px-1"
            name="title"
            placeholder="Title"
            onChange={onStateChange}
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
            onChange={onStateChange}
            value={formState.note}
          />
        </div>

        <div className="my-2">
          <button
            className="bg-black px-4 py-1 rounded-md text-white"
            disabled={validateForm}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default NoteInput
