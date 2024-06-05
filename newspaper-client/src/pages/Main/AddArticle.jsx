import React, { useState } from 'react'
import ArticleForm from '../../components/Shared/ArticleForm'
import usePublisher from '../../hooks/usePublisher'
import { imageUpload } from '../../api/utils'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { addArticle } from '../../api/Article'

const AddArticle = () => {
  const { user } = useAuth()
  const [publishers, isLoading] = usePublisher()
  const [loading, setLoading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const [selectedOptions, setSelectedOptions] = useState([])

  const options = [
    { value: 'sport', label: 'Sport' },
    { value: 'technology', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
  ]

  let selectedValues = selectedOptions.map((item) => item.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const image = form.image.files[0]
    const image_url = await imageUpload(image)
    const publisher = form.publisher.value
    const tags = selectedValues
    const tagsObject = selectedOptions
    const description = form.description.value
    const articleData = {
      title,
      image: image_url?.data?.display_url,
      description,
      publisher,
      tags,
      tagsObject,
      email: user?.email,
      author: user?.displayName,
      author_image: user?.photoURL,
      viewCount: 0,
      isPremium: false,
      status: 'pending',
    }

    console.log(articleData)

    try {
      setLoading(true)
      const data = await addArticle(articleData)
      setUploadButtonText('Uploaded')
      toast.success('Article added')

      //  navigate('/dashboard/manage-product');
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
    <div>
      <ArticleForm
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        loading={loading}
        uploadButtonText={uploadButtonText}
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        publishers={publishers}
      ></ArticleForm>
    </div>
  )
}

export default AddArticle
