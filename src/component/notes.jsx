import React, { useContext, useState } from 'react'
import '../App.css'
import { Pencil, X } from 'lucide-react'
import { ThemeContext } from '../context/Themecontext'
import Sidebar from './Sidebar'
import Header from './Header'
import TodoList from './TodoList'
import Delete from './Delete'
import DeleteAll from './Deleteall'

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

  const { theme, toggleTheme } = useContext(ThemeContext)


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


    const updataedList = notes.filter((item, index) => index != deleteIndex)
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
    if (notes.length > 0) {
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



  const filteredNotes = notes.filter((item) => {
    if (!item.title.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    if (filterStatus === "default") {
      return true
    }

    if (filterStatus === "pending") {
      return item.status == "pending"
    }
    if (filterStatus === "done") {
      return item.status == "done"
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
      <div className={`${theme === "light" ? "bg-[#2F0936]" : "bg-black"} h-screen flex justify-between gap-10 p-10`}>

        <Sidebar

          theme={theme}

          toggleTheme={toggleTheme}

          title={title}

          setTitle={setTitle}

          description={description}

          setDescription={setDescription}

          totalTask={totalTask}

          pendingTask={pendingTask}

          completedTask={completedTask}

          isediting={isediting}

          handleAddEdit={handleAddEdit}

          cancleEditHandler={cancleEditHandler}

        />








        <div className={`bg-white shadow shadow-purple-950 rounded-2xl p-5 gap-6 flex flex-col flex-1 `}>
          <Header

            theme={theme}

            toggleTheme={toggleTheme}

            search={search}

            setSearch={setSearch}

            filterNotes={filterNotes}

            setSort={setSort}

            handleDeleteAll={handleDeleteAll}

          />

          <div className='flex flex-col gap-5 overflow-auto scrollbar-none'>
            {sortedList.map(function (item, idx) {
              return (

                <TodoList

                  key={idx}

                  item={item}

                  idx={idx}

                  theme={theme}

                  handleEdit={handleEdit}

                  handleDelete={handleDelete}

                  checkBoxHandler={checkBoxHandler}

                />
              )
            })}



          </div>
        </div>

        <Delete

          theme={theme}

          deleteIndex={deleteIndex}

          handleCancleconfirm={handleCancleconfirm}

          handleConfirmdelete={handleConfirmdelete}

        />

        <DeleteAll

          theme={theme}

          deleteAll={deleteAll}

          handleCancleconfirmAll={handleCancleconfirmAll}

          handleConfirmdeleteAll={handleConfirmdeleteAll}

        />

      </div>
    </>
  )
}

export default Notes 