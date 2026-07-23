import React from 'react'

const Sidebar = ({
  theme,
  toggleTheme,

  totalTask,
  pendingTask,
  completedTask,

  title,
  setTitle,

  description,
  setDescription,

  isediting,
  handleAddEdit,
  cancleEditHandler,
}) => {
  return (
   <>
     
        <div className={`bg-white shadow shadow-purple-950 rounded-2xl p-10 gap-6 flex flex-col w-125`}>
          <div className='flex items-center justify-center gap-5'>

            <div className={`bg-white shadow shadow-[#2F0936]  rounded-[10px] p-6 `}>
              <h1 className='text-[18px] text flex items-center '>Total Task: <span className='text-3xl text-indigo-900 pl-1'>{totalTask} </span></h1>

            </div>
            <div className='flex flex-col gap-5'>
              <div className={`bg-white shadow shadow-[#2F0936]  rounded-[10px] p-5 `}>
                <h1 className='text-[18px] text flex items-center '>Pending Task: <span className='text-3xl text-emerald-900 pl-1'> {pendingTask}</span></h1>
              </div>
              <div  className={`bg-white shadow shadow-[#2F0936]  rounded-[10px] p-5 `}>
                <h1 className='text-[18px] text flex items-center '>Completed Task: <span className='text-3xl text-rose-900 pl-1'>{completedTask}</span></h1>
              </div>
            </div>



          </div>
          <div className='flex flex-col gap-6'>
            <input type="text" placeholder='enter title' className=' rounded-[10px] px-4 py-2 border-2 border-[#2F0936] '
              value={title} onChange={(e) => {
                setTitle(e.target.value)
              }}
            />

            <textarea placeholder='enter description' className='rounded-[10px] px-4 py-2 border-2 border-[#2F0936]  h-32'
              value={description} onChange={(e) => {
                setDescription(e.target.value)
              }}
            />

            <button className='bg-[#2F0936] text-white rounded-2xl p-2 self-center' onClick={handleAddEdit}>{isediting ? "EDIT TODO" : "ADD TODO"}</button>
            {isediting ? <button className='bg-[#2F0936] text-white rounded-2xl p-2 self-center' onClick={cancleEditHandler} >CANCLE EDIT TODO</button> : ""}
          </div>
        </div>

   </>
  )
}

export default Sidebar