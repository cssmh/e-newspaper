import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import axiosSecure from '../../api'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../components/Shared/Loader'
import UserDataRow from '../../components/Dashboard/userDataRow'
import { MdOutlineUpdate } from 'react-icons/md'
import { updateUser } from '../../api/Auth'

const Users = () => {
  const [page, setpage] = useState(1)
  const limit = 10

  const getUsers = async () => {
    const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`)
    return res
  }

  const {
    data: users,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [page],
    queryFn: getUsers,
  })

  const handleUpdate = async (id) => {
    console.log(id)
    const result = await updateUser(id, { role: 'admin' })
    if (result?.modifiedCount > 0) {
      refetch()
    }
  }

  const Pginetionclass =
    'join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200'

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>E Shop | Users</title>
      </Helmet>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="px-32 pt-8 pb-8">
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
                      Profile Picture
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.result.map((item, index) => (
                    <UserDataRow
                      key={item._id}
                      item={item}
                      index={index}
                      handleUpdate={handleUpdate}
                    ></UserDataRow>
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
              onClick={() => setpage((old) => old - 1)}
              disabled={1 === page}
              className={`${Pginetionclass} disabled:bg-green-100`}
            >
              «
            </button>
            {[...Array(Math.ceil(users?.data?.total / limit)).keys()].map(
              (ele) => {
                return (
                  <button
                    onClick={() => setpage(ele + 1)}
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
              onClick={() => setpage((old) => old + 1)}
              disabled={page === Math.ceil(users?.data?.total / limit)}
              className={`${Pginetionclass} disabled:bg-green-100`}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
