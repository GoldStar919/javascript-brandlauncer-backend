import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDocs, deleteDoc, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { useNavigate } from 'react-router';
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
import CreateThemeModal from '../../../components/modal/theme';
import {useLocation} from 'react-router-dom';
import Select from 'react-select'

const ThemePage = ({props}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [themeList, setThemeList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryOption, setCategoryOption] = useState(location.state && location.state.category ? location.state.category : '')
  
  const [downloadLink, setDownloadLink] = useState()

  const handleCreate = async (title, content, downloadLink, wallpaperLink, iconLink, category) => {
    setOpenModal(false)
    setLoading(true)
    
    const theme = {
      title: title,
      content: content,
      artwork: downloadLink,
      wallpaper: wallpaperLink,
      iconLink: iconLink,
      channel_count: 0,
      createdAt: new Date().getTime()
    }
    const docRef = await addDoc(collection(db, "categories", categoryOption, "Themes"), theme).then(() => {
      updateDoc(doc(db, "categories", categoryOption), {theme_count: increment(1)})
    });
    getTheme()
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

  /**
   * get categoryList from firestore
   */
  const getCategory = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "categories"))
    const categoryData = parkingData.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    ));
    setCategoryList(categoryData);
    setLoading(false)
  }

  const handleEdit = () => {

  }

  const handleRemove = async (id) => {
    setLoading(true)
    const result = await deleteDoc(doc(db, "categories", categoryOption, "Themes", id)).then(() => {
      updateDoc(doc(db, "categories", categoryOption), {theme_count: increment(-1)})
    })
    getTheme()
  }

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = themeList.filter((v, i) => {
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
  }, [])

  let categoryOptions = categoryList.map((category) => (
    {
      value: category.id,
      label: category.name
    })
  )
  // categoryOptions.splice(0, 0, {value: 0, label: 'All'})

  return (
    <Layout>
      <div className='pt-12 w-full px-8 relative'>
        <div className='mb-6' style={{width: '250px'}}>
          <p className='text-white text-bold text-2xl mb-2'>Categoria</p>
          <Select 
            value = {{label: categoryOption}}
            options={categoryOptions} onChange={(e) => setCategoryOption(e.value)} 
          />
        </div>
        <p className='text-white text-bold text-2xl'>Lista de Tema</p>
        <div className='flex items-center justify-end mt-2'>
          <ActionButton type="success" className="px-8 text-lg" onClick={() => { setOpenModal(true) }}>Criar Tema</ActionButton>
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
            <Table.Column width={100} className="">
              <Table.HeaderCell className="">Papel de parede</Table.HeaderCell>
              <ImageCell dataKey="wallpaper" />
            </Table.Column>
            <Table.Column width={100} className="">
              <Table.HeaderCell className="">Icone de bolha</Table.HeaderCell>
              <ImageCell dataKey="iconLink" />
            </Table.Column>
            <Table.Column width={100} align="center" >
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.Cell dataKey="title" />
            </Table.Column>
            <Table.Column width={250}>
              <Table.HeaderCell>Contente</Table.HeaderCell>
              <Table.Cell dataKey="content" />
            </Table.Column>            
            <Table.Column flexGrow={1} align="center" >
              <Table.HeaderCell>Contagem de canais</Table.HeaderCell>
              <Table.Cell > 
                {(rowData, rowIndex) => {
                  return <ActionButton onClick={() => navigate('/channel', {state: {category: categoryOption, theme: {id: rowData.id, value: rowData.title}}})}>{rowData.channel_count}</ActionButton>;
                }}
              </Table.Cell>
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
              total={themeList.length}
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
      <CreateThemeModal open={openModal} setOpen={setOpenModal} create={handleCreate} categoryList={categoryList} />

    </Layout>
  )
}

export default ThemePage