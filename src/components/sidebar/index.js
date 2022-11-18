import { faArrowUpRightFromSquare, faFolderPlus, faFolderTree, faGears, faJedi, faRepublican, faRodAsclepius, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'
import PrimaryButton, { ActionButton, SideButton } from '../button'

const SideBar = () => {
  const context = useAppContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    context.setAuth(false)
    navigate("/")
  }
  return (
    <div className='bg-gray-800 rounded-r-lg h-screen w-300 flex flex-col px-4 pt-6 drop-shadow-[0_5px_6px_rgba(0,0,0,0.5)] mr-6 flex-shrink-0'>
      <img src="assets/image/logo_brand.png" alt='brand' className='w-2/3 mx-auto' />
      <div className='w-full flex flex-col mt-10 flex-1 gap-4'>
        <SideButton target="/category" icon={faFolderTree}>Categoria</SideButton>
        <SideButton target="/theme" icon={faJedi}>Tema</SideButton>
        <SideButton target="/channel" icon={faRepublican}>Canal</SideButton>
        <SideButton target="/content" icon={faArrowUpRightFromSquare}>Contente</SideButton>
        <SideButton target="/users" icon={faUser}>Comercial</SideButton>
        <SideButton target="/setting" icon={faGears}>Contexto</SideButton>
      </div>
      <div className='flex flex-col pb-6'>
        <ActionButton className="w-full text-xl" onClick={handleLogout}>
          Sair
        </ActionButton>
      </div>
    </div>
  )
}

export default SideBar