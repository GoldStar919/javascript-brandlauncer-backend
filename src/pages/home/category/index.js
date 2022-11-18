import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDocs, deleteDoc, doc, setDoc  } from "firebase/firestore";
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

const CategoryPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [themeList, setThemeList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryOption, setCategoryOption] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [downloadLink, setDownloadLink] = useState()
  const context = useAppContext()
  const navigate = useNavigate();

  const handleCreate = async (title, content, downloadLink, wallpaperLink, iconLink, category) => {
    setOpenModal(false)
    setLoading(true)
    const theme = {
      title: title,
      content: content,
      artwork: downloadLink,
      wallpaper: wallpaperLink,
      iconLink: iconLink,
      // category: category,
      createdAt: new Date().getTime()
    }
    const docRef = await addDoc(collection(db, "categories", category, "themes"), theme).then(() => {
    });
  }

  const handleCreateCategory = async () => {
    if (newCategory?.length > 0) {
      const category = {
        name: newCategory
      }
      setLoading(true)
      const docRef = await setDoc(doc(db, 'categories', newCategory), {
        name: newCategory,
        theme_count: 0
      }).then(() => {
        setLoading(false)
      })
      setNewCategory("")
      getCategory()
    }
  }

  /**
   * get categoryList from firestore
   */
  const getCategory = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "categories"))
    setCategoryList(parkingData.docs.map((doc) => {
      return  {
        ...doc.data(),
        id: doc.id
      }
    }));
    console.log(categoryList)
    setLoading(false)
  }

  const handleCategoryRemove = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteDoc(doc(db, "categories", id))
        Swal.fire(
          'Excluída!',
          'A categoria foi excluída.',
          'success'
        )
        getCategory()
      }
    })
  }

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = categoryList.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    let buffer =
      categoryList.map((category) => (
        {
          value: category.name,
          label: category.name
        }
      ))
  }, [categoryList])

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Layout>
      <div className='pt-12 w-full px-8 relative'>
        <div className='mb-6'>
          <p className='text-white text-bold text-2xl'>Categoria</p>
          <div className='mt-4 flex gap-4 items-center'>
            <Input value={newCategory} setValue={setNewCategory} type={"text"} className="max-w-sm gap-0" />
            <ActionButton type="info" onClick={handleCreateCategory}>Adicionar categoria</ActionButton>
          </div>
          {/* <div className='mt-2 flex-wrap flex gap-2'>
            {categoryList.map((category, idx) => (
              <CategoryItem data={category} key={idx} remove={handleCategoryRemove} />
            ))}
          </div> */}
        </div>
        <p className='text-white text-bold text-2xl'>Lista de Categoria</p>
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
            <Table.Column width={200} className="">
              <Table.HeaderCell className="">Nome da Categoria</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>
            <Table.Column flexGrow={1} className="">
              <Table.HeaderCell className="">Contagem de temas</Table.HeaderCell>
              <Table.Cell > 
                {(rowData, rowIndex) => {
                  return <ActionButton onClick={() => navigate('/theme', {state: {category: rowData.id}})}>{rowData.theme_count}</ActionButton>;
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
                      <ActionButton className='px-4 w-max' type={"error"} onClick={() => { handleCategoryRemove(rowData.id) }}>Excluir</ActionButton>
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

    </Layout>
  )
}

export default CategoryPage