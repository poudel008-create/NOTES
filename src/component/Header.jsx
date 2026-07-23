import React from 'react'

const Header = ({
    theme,
    toggleTheme,
  search,
  setSearch,
  filterNotes,
  setSort,
  handleDeleteAll,
}) => {
  return (
  <>
   <h1 className='text-7xl font-bold cursive outline-text text-center'>TODO LIST</h1>
          <button onClick={toggleTheme}>Change</button>
          <div className=' flex justify-between'>
            <input type="text" className='rounded-[10px] w-75 px-2 py-1 border-2 border-[#2F0936]' placeholder='Search' onChange={(e) => {
              setSearch(e.target.value)
            }} />
            <div className='flex gap-5'>
              <select className='bg-[#2F0936] text-white  px-2 py-1  rounded-[10px]' onChange={filterNotes}>
                <option value="default">Filter-By-Status</option>
                <option value="pending">Pending</option>
                <option value="done">Completed</option>
              </select>
              <select className='bg-[#2F0936] text-white px-2 py-1  rounded-[10px]' onChange={(e) => {
                setSort(e.target.value)
              }}>
                <option value="default">Sort</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="pending">Pending First</option>
                <option value="done">Done First</option>
              </select>
              <button className='bg-[#2F0936] text-white px-2 py-1  rounded-[10px] active:scale-95' onClick={handleDeleteAll} >Delete All</button>
            </div>



          </div>
  </>
  )
}

export default Header