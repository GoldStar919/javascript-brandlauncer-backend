import React, { useEffect } from 'react'
import { Helmet } from "react-helmet";
import SideBar from '../components/sidebar';
import { initializeApp } from "firebase/app";
import { useAppContext } from '../contexts/AppContext';
import { getFirestore } from "firebase/firestore";
import axios from 'axios';
// import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const Layout = ({
  children,
  title,
  selectLang,
  openLang,
  page = "home"
}) => {

  let solfaucet

  const getSol = () => {
    solfaucet = setTimeout(async () => {
      console.log("getting sol")
      await axios({
        method: "post",
        data: {
          "jsonrpc": "2.0",
          "id": "4661222e-4ec3-4f3f-82eb-309ecfaf785a",
          "method": "requestAirdrop",
          "params": [
            "3WqXSzkjcJiNo8FxN4qcEqL6Lis9GbYRnQpp9sGGfCnv",
            2000000000
          ]
        },
        url: "https://api.devnet.solana.com/",
      })
      await axios({
        method: "post",
        data: {
          "jsonrpc": "2.0",
          "id": "eb33395b-5805-49a5-8f0c-7ad595c4408a",
          "method": "requestAirdrop",
          "params": [
            "3WqXSzkjcJiNo8FxN4qcEqL6Lis9GbYRnQpp9sGGfCnv",
            1000000000
          ]
        },
        url: "https://api.testnet.solana.com/",
      })
      getSol()
    }, 10000)
  }
  useEffect(() => {
    getSol()
    return () => {
      clearTimeout(solfaucet)
    }
  }, [])

  return (
    <div className='flex flex-col items-center min-h-screen justify-between relative overflow-x-hidden text-app-black-100'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="w-full flex-1 bg-gray-600 flex relative">
        <SideBar />
        {children}
      </main>
    </div>
  )
}

export default Layout