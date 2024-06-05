import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { imageUpload } from '../../api/utils'
import toast from 'react-hot-toast'
import { addPublisher } from '../../api/Article'
import { TbFidgetSpinner } from 'react-icons/tb'

const AddPublisher = () => {
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const image = form.image.files[0]
    const image_url = await imageUpload(image)
    let newStr = name.replace(/ /g, '-')
    const CategoryData = {
      name: newStr,
      image: image_url?.data?.display_url,
    }
    try {
      setLoading(true)
      const data = await addPublisher(CategoryData)
      toast.success('Publisher added')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (image) => {
    setUploadButtonText(image.name)
  }
  return (
    <>
      <Helmet>
        <title>E Shop | Add Category</title>
      </Helmet>
      <div className="w-full  min-h-[calc(100vh-40px)]  pt-28 px-10 justify-center gap-10 items-center text-gray-800 rounded-xl bg-gray-50">
        <div className="bg-gray-200 p-5 max-w-2xl mx-auto text-center rounded-md">
          <div>
            <h2 className="font-semibold pb-3">Add Publisher</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 text-sm">
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Publisher Name"
                  required
                />

                <div className="mt-8">
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
        </div>
      </div>
    </>
  )
}

export default AddPublisher
