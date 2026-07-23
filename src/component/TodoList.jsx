import React from 'react'
 import { Pencil, X } from 'lucide-react'

const TodoList = ({
   item,
  idx,
  theme,
  handleEdit,
  handleDelete,
  checkBoxHandler,
}) => {
  return (
  <>
  <div className='rounded-[10px] px-4 py-2 border border-[#2F0936] flex justify-between  '>
  
                      <div className='flex gap-3'>
                       
                          <input type="checkbox" checked={item.status == "done"} className='accent-[#2F0936]  ' onChange={(e) => {
                            checkBoxHandler(e.target.checked, idx)
                          }} />
                        
                        <div className='flex flex-col flex-wrap '>
                          <h1 className='text-xl text font-bold  break-all text-[#2F0936]'>
                            {item.title}
                          </h1>
                          <p className='text-gray-600 break-all text-[16px]'>
                            {item.description}
                          </p>
                        </div>
                      </div>
  
                      <div className='flex gap-3'>
                        <button className='bg-emerald-900 p-2 rounded-[10px] h-8 w-8 flex justify-center items-center' onClick={() => {
                          handleEdit(idx)
                        }}><Pencil size={16} color="#fafaf9" strokeWidth={2.25} /></button>
                        <button className='bg-rose-900 p-2 rounded-[10px] h-8 w-8 flex justify-center items-center' onClick={() => {
                          handleDelete(idx)
                        }}><X size={16} color="#ffffff" strokeWidth={2.25} /></button>
                      </div>
                    </div>
  
  </>
  )
}

export default TodoList