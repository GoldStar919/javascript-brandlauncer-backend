import React, { useEffect, useRef, useState } from 'react'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/config';
import { ActionButton } from '../button'
import Input from '../input'
import { ProgressBar } from 'react-bootstrap';
import "./blog.css"
import Swal from 'sweetalert2';
import Select from 'react-select'
const CreateChannelModal = (props) => {

  const { open, setOpen, dlgTitle, create, themeList } = props
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(1)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(0)
  const [artwork, setArtwork] = useState()
  const [preview, setPreview] = useState()
  const [downloadLink, setDownloadLink] = useState()
  const [theme, setTheme] = useState()
  const inputArtworkRef = useRef();
  const clear = () => {
    setTitle("")
    setContent("")
    setArtwork(null)
    setError(0)
    setDownloadLink(null)
    setUploadProgress(0)
    setTheme(null)

    
    inputArtworkRef.current.value = null
  }

  const handleCreate = async () => {
    if (title.length === 0) {
      setError(1)
    }
    else if (content.length < 4) {
      setError(2)
    }
    else if (artwork == null) {
      setError(3)
    }
    // else if(theme === null){
    //   setError(4)
    // }
    else {
      console.log("create", artwork)
      await create(title, content, downloadLink, theme)
      clear()
      setOpen(false)
    }
  }

  const uploadArtwork = async () => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + artwork[0].name);
    const uploadTask = uploadBytesResumable(storageRef, artwork[0], metadata);
    // Listen for state changes, errors, and completion of the upload.
    setLoading(true)
    await uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false)
          console.log('File available at', downloadURL);
          setDownloadLink(downloadURL)
        });
      }
    )
  }


  useEffect(() => {
    if (artwork && artwork.length > 0) {
      const objectUrl = URL.createObjectURL(new Blob(artwork))
      setPreview(objectUrl)
      uploadArtwork()
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreview(null);
      setDownloadLink(null)
    }
  }, [artwork])


  return (
    <div>
      <div id=""
        className={`fixed ${!open && "hidden"} z-50 inset-0 overflow-y-auto h-full w-full px-4 modal bg-black bg-opacity-40`}>
        <div className="relative top-1/2 -translate-y-1/2 transform mx-auto rounded-md bg-slate-600 max-w-xl shadow-xl px-8">
          <div className="flex justify-between items-center text-xl rounded-t-md py-2 h-13">
            <h3 className="text-ph-h2 text-center w-full text-app-blue font-bold text-2xl py-4">{dlgTitle}</h3>
            <button onClick={() => setOpen(false)} className="text-white rounded-full font-bold w-10 h-10 flex items-center justify-center"><p>x</p></button>
          </div>
          <div className='flex gap-8 flex-col'>
            <div className='space-y-2'>
              <div className='bg-gray-500 bg-opacity-50  items-center flex justify-center cursor-pointer w-48 h-48 mx-auto' onClick={() => {
                inputArtworkRef.current.click()
              }}>
                {preview ? <img src={`${preview ? preview : ""}`} alt="art" className='w-10/12 sm:max-w-80 mx-auto' />
                  : <div className='mx-auto items-center justify-center flex flex-col text-white  h-72' >
                    <FontAwesomeIcon icon={faCloudUploadAlt} size={"3x"} color="#35B2FF" />
                    <p>Nenhum arquivo selecionado</p>
                  </div>}
              </div>
              <p className='text-center text-gray-500'>( Obra de arte )</p>
            </div>
            {loading && <div>
              <ProgressBar animated now={uploadProgress} />
              <p className='text-center text-white'>Enviando...</p>
            </div>}
            <div className='w-full flex flex-col justify-around gap-4'>
              <Input value={title} setValue={setTitle} type="title" label="Título" />
              {error === 1 && <p className='text-app-red'>Por favor, insira o título</p>}
              <label className='text-white text-xl italic font-bold '>Contente</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" label="Contente" className='h-20 px-2 py-2 outline-none rounded-md' />
              {error === 2 && <p className='text-app-red'>Por favor, insira o conteúdo do blog</p>}
              <input type="file" accept="image/*" onChange={(e) => setArtwork(e.target.files)} ref={inputArtworkRef} className="hidden" />
              {/* <label className='text-white text-xl italic font-bold '>Tema</label>
              <Select options={themeList.map((theme) => (
                {
                  value: theme.id,
                  label: theme.title
                }
              ))} onChange={(e) => setTheme(e.value)} />
              {error === 4 && <p className='text-app-red'>Por favor selecione a Tema</p>} */}
            </div>
            <div>
            </div>
          </div>

          <div className="px-7.5">
            <div className="space-y-3 mt-6 hidden">
              <p className="text-pc-h4"></p>

            </div>
            <div className="space-y-2 mt-4">
              <div className='grid grid-cols-1 gap-4'>

              </div>
            </div>
          </div>

          <div className="px-4 flex justify-end items-center space-x-4 py-6">
            <ActionButton type={downloadLink ? "success" : "info"} className="text-lg" onClick={() => {
              if (downloadLink) handleCreate()
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please upload image before save',
                })
              }
            }}>Salvar</ActionButton>
            <ActionButton type="error" className="text-lg" onClick={() => setOpen(false)}>Fechar</ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateChannelModal