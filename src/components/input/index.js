import React from 'react'


const Input = (props) => {
  const { className, value, setValue, type, label } = props
  return (
    <div className='flex flex-col'>
      {label && <label className='text-white text-xl italic font-bold mb-2'>{label}</label>}
      <input className={`${className} outline-none rounded-md py-2 px-2`} value={value} onChange={(e) => setValue(e.target.value)} type={type}></input>
    </div>
  )
}

export default Input