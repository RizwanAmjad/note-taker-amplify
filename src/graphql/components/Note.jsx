import React from "react"

function Note({ id, title, note, onDelete }) {
  return (
    <div className="border flex items-center justify-between my-2 p-8 rounded-md">
      <div className="flex flex-col">
        <div className="text-xl">{title}</div>
        <div>{note}</div>
      </div>
      <div>
        <div className="cursor-pointer" onClick={() => onDelete(id)}>
          Del
        </div>
        <div>Edit</div>
      </div>
    </div>
  )
}

export default Note
