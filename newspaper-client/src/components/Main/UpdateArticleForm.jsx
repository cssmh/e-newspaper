import React from 'react';
import { TbFidgetSpinner } from 'react-icons/tb'
import Creatable from 'react-select/creatable'

const UpdateArticleForm = ({ handleSubmit,
    handleImageChange,
    loading,
    uploadButtonText,
    options,
    selectedOptions,
    setSelectedOptions,
    publishers,article}) => {
    return (
  
         <div className="max-w-5xl my-40 mx-auto p-10 text-gray-800 rounded-xl bg-gray-50">
         <h2 className='text-center text-3xl mb-4'> Update Article : {article.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className=" grid  grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Title
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="title"
                  id="title"
                  type="text"
                  defaultValue={article?.title}
                  required
                />
              </div>
  
              <div className="space-y-1 text-sm">
                <label htmlFor="publisher" className="block text-gray-600">
                  Publisher
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                  name="publisher"
                  defaultValue={article?.publisher}
                >
                  {publishers.map((item) => (
                    <option value={item.name} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="space-y-1 text-sm">
                <label htmlFor="tags" className="block text-gray-600">
                  Tags
                </label>
                <Creatable
                  required
                  className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                  name="tags"
                  defaultValue={selectedOptions}
                  onChange={setSelectedOptions}
                  options={options}
                  isMulti
                ></Creatable>
              </div>
            </div>
  
            {/* 2 nd */}
            <div className="space-y-6">
              <div className=" p-4 bg-white w-full  m-auto rounded-lg">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                        {uploadButtonText}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>
  
                <textarea
                  id="description"
                  className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                  name="description"
                  defaultValue={article?.description}
                  required
                ></textarea>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
          >
            {loading ? (
              <TbFidgetSpinner className="m-auto animate-spin" size={24} />
            ) : (
              'Save & Continue'
            )}
          </button>
        </form>
      </div>
  
    );
};

export default UpdateArticleForm;