import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import useArticle from '../../hooks/useArticle'
import useAuth from '../../hooks/useAuth'
import Loader from '../../components/Shared/Loader'
import MyArticleDataRow from '../../components/Main/MyArticleDataRow'
import Swal from 'sweetalert2'
import { deleteArticle } from '../../api/Article'
import toast from 'react-hot-toast'
import DeclineMessageModal from '../../components/Main/DeclineMessageModal'
import axiosSecure from '../../api'
import { useQuery } from '@tanstack/react-query'

const MyArticle = () => {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(false)
  const limit = 10
  
  const getArticle = async () => {
    const res = await axiosSecure.get(
      `/articles?page=${page}&limit=${limit}&email=${user.email}`,
    )
    return res
  }

  const {
    data: articles,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['article', page, limit],
    queryFn: getArticle,
  })



  const handleShow = async (item) => {
    setIsOpen(true)
    setItem(item)
  }

  function closeModal() {
    setIsOpen(false)
    setItem({})
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteArticle(id).then((data) => {
          if (data.deletedCount > 0) {
            refetch()
            toast.success('Article Deleted')
          }
        })
      }
    })
  }

  const Pginetionclass =
  'join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200'
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>E-Newspaper | Users</title>
      </Helmet>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="px-32 pt-10 pb-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      isPremium
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articles?.data?.result.map((item, index) => (
                    <MyArticleDataRow
                      key={item._id}
                      item={item}
                      index={index}
                      handleShow={handleShow}
                      handleDelete={handleDelete}
                      
                    ></MyArticleDataRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
          <div className="paginetion flex mb-20">
            <div className="join border-green-300 border mx-auto ">
              <button
                onClick={() => setPage((old) => old - 1)}
                disabled={1 === page}
                className={`${Pginetionclass} disabled:bg-green-100`}
              >
                «
              </button>
              {[...Array(Math.ceil(articles?.data?.total / limit)).keys()].map(
                (ele) => {
                  return (
                    <button
                      onClick={() => setPage(ele + 1)}
                      key={ele + 1}
                      className={`${Pginetionclass} ${
                        ele + 1 === parseInt(page) ? 'bg-yellow-300' : ''
                      } `}
                    >
                      {ele + 1}
                    </button>
                  )
                },
              )}
  
              <button
                onClick={() => setPage((old) => old + 1)}
                disabled={page === Math.ceil(articles?.data?.total / limit)}
                className={`${Pginetionclass} disabled:bg-green-100`}
              >
                »
              </button>
            </div>
          </div>
        )}
  
      {
     

        <DeclineMessageModal
          closeModal={closeModal}
            isOpen={isOpen}
            item={item}
        >
        </DeclineMessageModal>

        
      }
    </div>
    
  )
}

export default MyArticle
