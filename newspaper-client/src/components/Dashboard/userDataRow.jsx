import React from 'react'
import avatar from '../../assets/placeholder.jpg'

const UserDataRow = ({ item, index, handleUpdate }) => {
  return (
    <tr className="text-center">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex justify-center items-center ">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={item?.image ? item?.image : avatar} />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button>
          {item?.role === 'admin' ? (
            <p>Admin</p>
          ) : (
            <p
              className="btn btn-outline"
              onClick={() => handleUpdate(item?._id)}
            >
              Make Admin
            </p>
          )}
        </button>
      </td>
    </tr>
  )
}

export default UserDataRow
