import React from 'react'
import { useLoaderData } from 'react-router-dom'

const ArticleDetails = () => {
  const {
    _id,
    title,
    image,
    description,
    publisher,
    tags,
    tagsObject,
    email,
    author,
    author_image,
    viewCount,
    isPremium,
    status,
    createAt,
    declineMessage,
  } = useLoaderData()

  return (
    <div>
      <div className="text-center mx-1 max-w-md border-2 py-2 my-5 lg:mx-auto">
        <h1 className="font-semibold text-xl lg:text-[22px] text-blue-800 mb-1">
          Publisher Information
        </h1>
        <p className="text-cyan-600">Name: {publisher}</p>
        <p>Title: </p>
        <p className="pb-1 text-blue-600"></p>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center justify-center my-6 lg:my-8 gap-4 lg:gap-7">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-7">
          <img
            src="/"
            className="mx-auto lg:mx-0 lg:ml-auto w-4/5 lg:w-[400px]"
            alt=""
          />
          <div className="space-y-1 lg:space-y-[6px] mx-6 lg:mx-0 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-semibold">desc</h1>
            <p>Another field</p>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-7">
        <div className="flex gap-1">
          <button className="bg-redFood px-3 py-2 text-white rounded-md mb-2">
            Description
          </button>
        </div>
        <p>Description dynamic</p>
      </div>
    </div>
  )
}

export default ArticleDetails
