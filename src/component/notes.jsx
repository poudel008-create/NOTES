import React, { useState } from 'react'
import '../App.css'
import { Pencil, X } from 'lucide-react'

const Notes = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [notes, setNotes] = useState([])
  const [isediting, setIsediting] = useState(false)
  const [eindex, setEindex] = useState(null)
  const [totalTask, setTotaltask] = useState(0)
  const [pendingTask, setPendingtask] = useState(0)
  const [completedTask, setCompletedtask] = useState(0)
  const [filterStatus, setFilterstatus] = useState("default")
  const [sort, setSort] = useState("default")
  const [search, setSearch] = useState("")
  const [deleteIndex, setDeleteIndex] = useState(null)
    const [deleteAll, setDeleteall] = useState(false)



  function handleAddEdit() {
    if (isediting == true) {

      const prevNotes = [...notes]

      prevNotes[eindex] = {
        title: title,
        description: description,
        status: prevNotes[eindex].status
      }
      setNotes(prevNotes)
      setIsediting(false)

    }
    else {
      if (title.length > 0 && description.length > 0) {
        const prevNotes = [...notes]
        const newNotes = { title: title, description: description, status: "pending" }
        prevNotes.push(newNotes)
        setNotes(prevNotes)
        setTotaltask(totalTask + 1)
        setPendingtask(pendingTask + 1)
      }

    }
    setTitle("")
    setDescription("")
  }

  function handleEdit(idx) {
    setIsediting(true)
    setTitle(notes[idx].title)
    setDescription(notes[idx].description)
    setEindex(idx)
  }

  function cancleEditHandler() {
    setIsediting(false)
    setTitle("")
    setDescription("")
  }

  function handleDelete(idx) {
    setDeleteIndex(idx)
  }

  function handleConfirmdelete() {


    const updataedList = notes.filter((items, index) => index != deleteIndex)
    setNotes(updataedList)

    if (notes[deleteIndex].status == "done") {
      setTotaltask(totalTask - 1)
      setCompletedtask(completedTask - 1)
    }
    if (notes[deleteIndex].status == "pending") {
      setTotaltask(totalTask - 1)
      setPendingtask(pendingTask - 1)
    }
    setDeleteIndex(null)
  }

  function handleCancleconfirm() {
    setDeleteIndex(null)
  }

  function handleDeleteAll() {
    if(notes.length>0){
   setDeleteall(true)
    }
  }

  function handleConfirmdeleteAll() {
      setNotes([])
      setDeleteall(false)
       setTotaltask(0)
        setPendingtask(0)
      setCompletedtask(0)
  }

  function handleCancleconfirmAll() {
   setDeleteall(false)
  }




  function checkBoxHandler(value, idx) {
    const prevList = [...notes]
    prevList[idx] = {
      ...prevList[idx],
      status: value ? "done" : "pending"
    }
    setNotes(prevList)

    if (value) {
      setCompletedtask(completedTask + 1)
      setPendingtask(pendingTask - 1)
    }
    else {
      setPendingtask(pendingTask + 1)
      setCompletedtask(completedTask - 1)
    }
  }

  function filterNotes(e) {
    setFilterstatus(e.target.value)
  }



  const filteredNotes = notes.filter((items) => {
    if (!items.title.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    if (filterStatus === "default") {
      return true
    }

    if (filterStatus === "pending") {
      return items.status == "pending"
    }
    if (filterStatus === "done") {
      return items.status == "done"
    }

    return true
  })


  const sortedList = [...filteredNotes]

  if (sort === "az") {
    sortedList.sort((a, b) =>
      a.title.localeCompare(b.title))
  }
  if (sort === "za") {
    sortedList.sort((a, b) =>
      b.title.localeCompare(a.title))
  }

  if (sort == "done") {
    sortedList.sort((a, b) =>
      a.status.localeCompare(b.status)
    )
  }
  if (sort == "pending") {
    sortedList.sort((a, b) =>
      b.status.localeCompare(a.status)
    )
  }




  return (
    <>
      <div className='bg-mauve-500 h-screen flex justify-between gap-10 p-10'>


        <div className='bg-stone-50 rounded-2xl p-10 gap-6 flex flex-col w-125'>
          <div className='flex items-center justify-center gap-5'>

            <div className='bg-stone-50 shadow shadow-mauve-500 rounded-[10px] p-6 '>
              <h1 className='text-xl text flex items-center '>Total Task: <span className='text-3xl text-indigo-900 pl-1'>{totalTask} </span></h1>

            </div>
            <div className='flex flex-col gap-5'>
              <div className='bg-stone-50 shadow shadow-mauve-500 rounded-[10px] p-5 '>
                <h1 className='text-xl text flex items-center '>Pending Task: <span className='text-3xl text-emerald-900 pl-1'> {pendingTask}</span></h1>
              </div>
              <div className='bg-stone-50 shadow shadow-mauve-500 rounded-[10px] p-5 '>
                <h1 className='text-xl text flex items-center '>Completed Task: <span className='text-3xl text-rose-900 pl-1'>{completedTask}</span></h1>
              </div>
            </div>



          </div>
          <div className='flex flex-col gap-6'>
            <input type="text" placeholder='enter title' className=' rounded-[10px] px-4 py-2 borderr'
              value={title} onChange={(e) => {
                setTitle(e.target.value)
              }}
            />

            <textarea placeholder='enter description' className='rounded-[10px] px-4 py-2 borderr h-32'
              value={description} onChange={(e) => {
                setDescription(e.target.value)
              }}
            />

            <button className='add rounded-2xl p-2 self-center' onClick={handleAddEdit}>{isediting ? "EDIT TODO" : "ADD TODO"}</button>
            {isediting ? <button className='add rounded-2xl p-2 self-center' onClick={cancleEditHandler} >CANCLE EDIT TODO</button> : ""}
          </div>
        </div>








        <div className='bg-stone-50 rounded-2xl p-5 gap-6 flex flex-col flex-1 '>
          <h1 className='text-7xl font-bold cursive outline-text text-center'>TODO LIST</h1>
          <div className=' flex justify-between'>
            <input type="text" className='rounded-[10px] w-75 px-2 py-1 borderr' placeholder='Search' onChange={(e) => {
              setSearch(e.target.value)
            }} />
            <div className='flex gap-5'>
              <select className='add  px-2 py-1  rounded-[10px]' onChange={filterNotes}>
                <option value="default">Filter-By-Status</option>
                <option value="pending">Pending</option>
                <option value="done">Completed</option>
              </select>
              <select className='add px-2 py-1  rounded-[10px]' onChange={(e) => {
                setSort(e.target.value)
              }}>
                <option value="default">Sort</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="pending">Pending First</option>
                <option value="done">Done First</option>
              </select>
              <button className='add px-2 py-1  rounded-[10px] active:scale-95' onClick={handleDeleteAll} >Delete All</button>
            </div>



          </div>
          <div className='flex gap-6 flex-wrap overflow-auto scrollbar-none'>
            {sortedList.map(function (items, idx) {
              return (
                <div key={idx}>
                  <div className='rounded-[10px] px-4 py-2 borderr flex flex-col justify-between w-36 h-48 overflow-auto scrollbar-none'>

                    <div className='flex flex-col gap-3'>
                      <div className='flex justify-start'>
                        <input type="checkbox" checked={items.status == "done"} className='accent-mauve-500 w-3 h-3 ' onChange={(e) => {
                          checkBoxHandler(e.target.checked, idx)
                        }} />
                      </div>
                      <div className='flex flex-col flex-wrap '>
                        <h1 className='text-2xl text font-bold  break-all'>
                          {items.title}
                        </h1>
                        <p className='text-gray-600 break-all '>
                          {items.description}
                        </p>
                      </div>
                    </div>

                    <div className='flex justify-between'>
                      <button className='bg-emerald-900 p-2 rounded-[10px] h-8 w-8 flex justify-center items-center' onClick={() => {
                        handleEdit(idx)
                      }}><Pencil size={16} color="#fafaf9" strokeWidth={2.25} /></button>
                      <button className='bg-rose-900 p-2 rounded-[10px] h-8 w-8 flex justify-center items-center' onClick={() => {
                        handleDelete(idx)
                      }}><X size={16} color="#ffffff" strokeWidth={2.25} /></button>
                    </div>
                  </div>

                </div>
              )
            })}

           {deleteIndex !== null && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 shadow-xl flex flex-col gap-5">

      <h1 className="text-xl font-bold text-center">
        Delete this note?
      </h1>

      <p className="text-gray-600 text-center">
        Are you sure you want to delete this note?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancleconfirm}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmdelete}
          className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}
{deleteAll==true && (
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
)}





          </div>
        </div>
      </div>
    </>
  )
}

export default Notes 