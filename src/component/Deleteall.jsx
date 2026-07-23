import React from 'react'

const DeleteAll = ({
    deleteAll,
  handleCancleconfirmAll,
  handleConfirmdeleteAll,
  theme,
}) => {
   if (!deleteAll) return null;
  return (
    <>
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 shadow-xl flex flex-col gap-5">

      <h1 className="text-xl font-bold text-center">
        Delete all note?
      </h1>

      <p className="text-gray-600 text-center">
        Are you sure you want to delete all note?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancleconfirmAll}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmdeleteAll}
          className="px-4 py-2 rounded-lg bg-red-800 text-white hover:bg-red-900"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
    </>
  )
}

export default DeleteAll