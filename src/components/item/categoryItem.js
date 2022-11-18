import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CategoryItem = (props) =>{
  const {className, data, remove} = props
  return(
    <div className={`${className} rounded-md border-app-gray-dark border bg-slate-50 px-4 py-2 w-max flex`}>
      <p className='w-full'>{data.name}</p>
      <button className='ml-2' onClick={()=>{remove(data.id)}}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}

export default CategoryItem