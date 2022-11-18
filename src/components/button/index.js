import { faFolderTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const PrimaryButton = (props) => {

  const { className, onClick, children, type } = props
  return (
    <button className={`${className} rounded-md lg:rounded-[16px] flex justify-center gap-2 cursor-pointer items-center bg-gradient-to-r 
    to-app-from-app-yellow bg-[length:200%_100%] hover:bg-[center_right_1rem] hover:scale-[1.02] 
    active:scale-[0.98] transition-all duration-700 ease-out text-[18px]
    text-center font-bold drop-shadow-[0_5px_6px_rgba(0,0,0,0.5)] shadow-xl
    ${type === "success" ? "from-app-green-dark via-app-green to-app-green-dark " : type === "error" ? "from-app-red-dark via-app-red to-app-red-dark " : "from-app-blue-dark via-app-blue to-app-blue-dark "} text-white lg:text-[24px] leading-[22px] lg:leading-[28px]  py-4 `} onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton

export const SideButton = (props) => {
  const { className, target, children, icon } = props
  const location = useLocation()
  return (
    <Link to={target}>
      <div className={`flex hover:scale-[1.02] text-xl duration-500 items-center rounded-l-full rounded-r-lg border-white w-full text-white font-bold px-2 border-r-0 py-2 gap-4 ${location.pathname === target ? "bg-gray-900" : "bg-gray-700"}  shadow-xl`}>
        <div className='rounded-full bg-gray-600 w-12 h-12 flex items-center justify-center'>
          <FontAwesomeIcon icon={icon} />
        </div>
        <p>
          {children}
        </p>
      </div>
    </Link>
  )
}

export const ActionButton = (props) => {

  const { className, onClick, children, type } = props
  return (
    <button className={`${className} px-2 rounded-lg flex justify-center gap-2 cursor-pointer items-center bg-gradient-to-r 
    to-app-from-app-yellow bg-[length:200%_100%] hover:bg-[center_right_1rem] hover:scale-[1.02] 
    active:scale-[0.98] transition-all duration-700 ease-out
    px-6 py-4 text-white text-center font-bold ${type === "success" ? "from-app-green-dark via-app-green to-app-green-dark " : type === "error" ? "from-app-red-dark via-app-red to-app-red-dark " 
    :type === "info" ? "from-app-gray-dark via-app-gray to-app-gray-dark " : "from-app-blue-dark via-app-blue to-app-blue-dark "} text-white leading-[22px] lg:leading-[28px]  py-1`} onClick={onClick}>
      {children}
    </button>
  )
}