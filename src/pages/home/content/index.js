import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDocs, deleteDoc, doc, updateDoc, increment } from "firebase/firestore";
import { Table } from 'rsuite';
import { Pagination } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { CircleLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import Layout from '../../../layout/layout'
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { db } from '../../../firebase/config';
import { storage } from '../../../firebase/config';
import "./channel.css"
import PrimaryButton, { ActionButton } from '../../../components/button';
import CreateUserModal from '../../../components/modal/user';
import { async } from '@firebase/util';
import CategoryItem from '../../../components/item/categoryItem';
import CreateChannelModal from '../../../components/modal/channel';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import Select from 'react-select'

const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [channelList, setchannelList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [themeList, setThemeList] = useState([])
  const [contentList, setContentList] = useState([])
  const [categoryOption, setCategoryOption] = useState(location.state && location.state.category ? location.state.category : '')
  const [themeOption, setThemeOption] = useState(location.state && location.state.theme ? location.state.theme : {value: '', id: ''})
  const [channelOption, setChannelOption] = useState(location.state && location.state.channel ? location.state.channel : {value: '', id: ''})
  
  const handleCreate = async (title, content, downloadLink, theme) => {
    const newContent = {
      title: title,
      content: content,
      artwork: downloadLink,
      createdAt: new Date().getTime()
    }
    const docRef = await addDoc(collection(db, "categories", categoryOption, "Themes", themeOption.id, "Channels", channelOption.id, "Contents"), newContent).then(() => {
      updateDoc(doc(db, "categories", categoryOption, "Themes", themeOption.id, "Channels", channelOption.id), {content_count: increment(1)})
    });
    setLoading(true)
    getContent()
  }

  const getContent = async () => {
    setLoading(true)    
    if(channelOption.id.length > 0) {
      const parkingData = await getDocs(collection(db, "categories", categoryOption, "Themes", themeOption.id, "Channels", channelOption.id,"Contents"));
      setContentList(parkingData.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      )));
    } 
    setLoading(false)
  }
  /**
   * get channelList from firestore
   */

  const getChannel = async () => {
    setLoading(true)    
    if(themeOption.id.length > 0) {
      const parkingData = await getDocs(collection(db, "categories", categoryOption, "Themes", themeOption.id, "Channels"));
      setchannelList(parkingData.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      )));
    } 
    setLoading(false)
  }

  /**
   * get themeList from firestore
   */
  const getTheme = async () => {
    setLoading(true)    
    if(categoryOption.length > 0) {
      const parkingData = await getDocs(collection(db, "categories", categoryOption, "Themes"));
      setThemeList(parkingData.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      )));
    } 
    setLoading(false)
  }

  const getCategory = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "categories"))
    setCategoryList(parkingData.docs.map((doc) => {
      return  {
        ...doc.data(),
        id: doc.id
      }
    }));
    setLoading(false)
  }

  const handleRemove = async (id) => {
    setLoading(true)
    const result = await deleteDoc(doc(db, "categories", categoryOption, "Themes", themeOption.id, "Channels", channelOption.id, "Contents", id)).then(() => {
      updateDoc(doc(db, "categories", categoryOption, "Themes", themeOption.id, "Channels", channelOption.id), {content_count: increment(-1)})
    })
    getChannel()
  }

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = contentList.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const ImageCell = ({ rowData, dataKey, ...rest }) => (
    <Table.Cell {...rest} style={{ padding: 2 }} >
      <img src={rowData[dataKey]} className="w-20" />
    </Table.Cell>
  );

  useEffect(() => {
    getContent()
  }, [channelOption])

  useEffect(() => {
    if(channelOption.id == '') {
      setChannelOption(channelList.length > 0 ? {id: channelList.at(0).id, value: channelList.at(0).title} : {id: '', value: ''})
    } else if(location.state && location.state.category && location.state.theme && location.state.category == categoryOption && location.state.theme == themeOption) {
      setChannelOption(location.state.channel)
    } else if(channelList.length > 0){
      setChannelOption({id:channelList.at(0).id, value: channelList.at(0).title})
    } else {
      setChannelOption({id: '', value: ''})
    }
  }, [channelList])  

  useEffect(() => {
    getChannel()
  }, [themeOption])

  useEffect(() => {
    if(themeOption.id == '') {
      setThemeOption(themeList.length > 0 ? {id: themeList.at(0).id, value: themeList.at(0).title} : {id: '', value: ''})
    } else if(location.state && location.state.category && location.state.category == categoryOption) {
      setThemeOption(location.state.theme)
    } else if(themeList.length > 0){
      setThemeOption({id:themeList.at(0).id, value: themeList.at(0).title})
    }
  }, [themeList])
  
  useEffect(() => {
    getTheme()
  }, [categoryOption])

  useEffect(() => {
    if(categoryOption == '') {
      setCategoryOption(categoryList.length > 0 ? categoryList.at(0).id : '')
    }
    // getTheme()
  }, [categoryList])

  useEffect(() => {
    getCategory()
    getTheme()
    getChannel()
    getContent()    
  }, [])

  return (
    <Layout>
      <div className='pt-12 w-full px-8 relative'>
        <div className='mb-6 rowC'>
          <div className='text-white text-bold text-2xl w-200 mr-8'>Categoria</div>
          <div className='text-white text-bold text-2xl w-200 mr-8'>Tema</div>
          <div className='text-white text-bold text-2xl w-200'>Canal</div>
        </div>
        <div className='mb-6 rowC'>
          <div className='w-200 mr-8'>
            <Select 
              value = {{label: categoryOption}}
              options={
                categoryList.map((category) => (
                  {
                    value: category.id,
                    label: category.name
                  })
                )
              } onChange={(e) => setCategoryOption(e.value)} 
            />
          </div>
          <div className='w-200 mr-8'>
            <Select 
              value = {{label: themeOption.value, value: themeOption.id}}
              options={
                themeList.map((theme) => (
                  {
                    value: theme.id,
                    label: theme.title
                  })
                )
              } onChange={(e) => setThemeOption({id: e.value, value: e.label})} 
            />
          </div>
          <div className='w-200'>
            <Select 
              value = {{label: channelOption.value, value: channelOption.id}}
              options={
                channelList.map((channel) => (
                  {
                    value: channel.id,
                    label: channel.title
                  })
                )
              } onChange={(e) => setChannelOption({id: e.value, value: e.label})} 
            />
          </div>
        </div>
        <p className='text-white text-bold text-2xl'>Lista de canais</p>
        <div className='flex items-center justify-end mt-2'>
          <ActionButton type="success" className="px-8 text-lg" onClick={() => { setOpenModal(true) }}>Criar canal</ActionButton>
        </div>
        {/* <div>
        <Input value={email} setValue={setEmail} type="email" label="email" />
        <Input value={password} setValue={setPassword} type="password" label="password" />
        <button onClick={handleCreate}>create</button>
      </div> */}
        <div className='w-full'>
          <Table
            className='text-white '
            height={limit === 5 ? 480 : 600}
            data={data}
            rowHeight={80}
            onRowClick={data => {
            }}
            limit={limit}
          >
            <Table.Column width={100} className="">
              <Table.HeaderCell className="">Obra de arte</Table.HeaderCell>
              <ImageCell dataKey="artwork" />
            </Table.Column>
            <Table.Column width={180} align="center" >
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.Cell dataKey="title" />
            </Table.Column>
            <Table.Column flexGrow={1} align="center">
              <Table.HeaderCell>Contente</Table.HeaderCell>
              <Table.Cell dataKey="content" />
            </Table.Column>
            <Table.Column width={180} align="center">
              <Table.HeaderCell>Açao</Table.HeaderCell>
              <Table.Cell>
                {rowData => {
                  return (
                    <div className='flex gap-2'>
                      {/* <ActionButton className='px-4 w-max' onClick={() => { handleEdit(rowData) }}>Edit</ActionButton> */}
                      <ActionButton className='px-4 w-max' type={"error"} onClick={() => { handleRemove(rowData.id) }}>Excluir</ActionButton>
                    </div>
                  );
                }}
              </Table.Cell>
            </Table.Column>
          </Table>
          <div style={{ padding: 20 }} className="text-white">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={channelList.length}
              limitOptions={[5, 10, 20]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
        {loading && <div className='absolute left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full z-50'>
          <img src="/assets/image/rocketgif-small.gif" alt="logo" className='w-32 animate-bounce mx-auto mt-2' />
        </div>}
      </div>
      <CreateChannelModal open={openModal} setOpen={setOpenModal} create={handleCreate} themeList={themeList} />

    </Layout>
  )
}

export default ContentPage