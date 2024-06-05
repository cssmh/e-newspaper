import React, { useState } from 'react';
import usePublisher from '../../hooks/usePublisher';
import UpdateArticleForm from '../../components/Main/UpdateArticleForm';
import toast from 'react-hot-toast';
import { updateArticle } from '../../api/Article';
import { imageUpload } from '../../api/utils';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateArticle = () => {
  const article = useLoaderData();
    const [publishers] = usePublisher()
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [selectedOptions, setSelectedOptions] = useState(article?.tagsObject)
    const navigate = useNavigate()
  
    const options = [
      { value: 'sport', label: 'Sport' },
      { value: 'technology', label: 'Technology' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'education', label: 'Education' },
    ]
  
    let selectedValues = selectedOptions.map((item) => item.value)
    console.log(publishers);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const image = form.image.files[0]
        const publisher = form.publisher.value
        const tags = selectedValues
        const tagsObject = selectedOptions
        const description = form.description.value


        const image_url = image ?  await imageUpload(image): '' 
        const image_new = image ? image_url?.data?.display_url : article?.image;
        const articleData = {
          title,
          image: image_url?.data?.display_url,
          description,
          publisher,
          tags,
          tagsObject,
        }
    
        console.log(articleData)
    
        try {
          setLoading(true)
          const data = await updateArticle(article?._id,articleData)
          setUploadButtonText('Uploaded')
          toast.success('Article Updated')
    
          navigate('/my-article');
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
              <UpdateArticleForm
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        loading={loading}
        uploadButtonText={uploadButtonText}
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        publishers={publishers}
        article={article}
      ></UpdateArticleForm>
        </div>
    );
};

export default UpdateArticle;