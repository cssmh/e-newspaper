import React from 'react'
import { FaArrowTrendUp, FaRegMessage } from 'react-icons/fa6'
import { MdDeleteOutline, MdSystemUpdateAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MyArticleDataRow = ({ item, index, handleDelete, handleShow  }) => {
  return (
    <tr className="text-center">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item?.title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
       <div className='flex justify-center items-center gap-3'>
       <p className="text-gray-900 whitespace-no-wrap">{item?.status}</p>
        {item?.status === 'declined' ? <button onClick={()=>handleShow(item)}><FaRegMessage size={20} /></button> : <></>}
       </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {String(item?.isPremium)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/article/${item?._id}`} className="btn btn-outline">
          View Details <FaArrowTrendUp></FaArrowTrendUp>
        </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      
      <Link to={`/update-article/${item?._id}`} className="btn btn-outline">
           <MdSystemUpdateAlt size={20}/>
       </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button onClick={() => handleDelete(item?._id)}>
          <MdDeleteOutline size={20}></MdDeleteOutline>
        </button>
      </td>
    </tr>
  )
}

export default MyArticleDataRow
