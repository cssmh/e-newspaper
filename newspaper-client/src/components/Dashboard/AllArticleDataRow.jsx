import React from 'react'
import avatar from '../../assets/placeholder.jpg'
import { HiMiniXMark } from 'react-icons/hi2'
import { MdDeleteOutline, MdOutlinePublishedWithChanges } from 'react-icons/md'
import { TbPremiumRights } from 'react-icons/tb'

const AllArticleDataRow = ({
  item,
  index,
  handlePublish,
  handleDecline,
  handleDelete,
  handlePremium,
}) => {
  return (
    <tr className="text-center">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.title}</p>
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
        <p className="text-gray-900 whitespace-no-wrap">{item?.author}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.publisher}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
        {(() => {
          const date = new Date(item?.createAt)
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
          const formattedTime = `${date
            .getHours()
            .toString()
            .padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
          return (
            <>
              <p className="text-gray-900 whitespace-no-wrap">
                {formattedDate}
              </p>
              <p className="text-gray-900 whitespace-no-wrap">
                {formattedTime}
              </p>
            </>
          )
        })()}
      </td>

      <td className="px-5 py-5 border-b flex justify-center border-gray-200 bg-white text-sm">
        <div className="flex flex-col  border-2">
          <button
            onClick={() => handlePublish(item?._id)}
            className="border-b-2 p-1"
          >
            <MdOutlinePublishedWithChanges size={20} />
          </button>
          <button
            onClick={() => handleDecline(item)}
            className="border-b-2 p-1"
          >
            <HiMiniXMark size={20} color="red" />
          </button>
          <button
            onClick={() => handleDelete(item?._id)}
            className="border-b-2 p-1"
          >
            <MdDeleteOutline size={20}></MdDeleteOutline>
          </button>
          <button
            onClick={() => handlePremium(item?._id)}
            className="border-b-2 p-1"
          >
            <TbPremiumRights size={20} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default AllArticleDataRow
