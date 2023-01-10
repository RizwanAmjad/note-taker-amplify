import React, { useMemo } from "react"

function NoteInput({ formState, onStateChange, onChangeImage, onSubmit }) {
  const validateForm = useMemo(() => {
    return (
      formState.image === null ||
      formState.title === "" ||
      formState.note === ""
    )
  }, [formState])

  return (
    <>
      <div className="text-lg">Note Taking App</div>

      <div className="mt-2">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="image_input"
          >
            Upload file
          </label>
          <input
            className="block text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="image_input"
            onChange={onChangeImage}
            type="file"
          />
        </div>
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
