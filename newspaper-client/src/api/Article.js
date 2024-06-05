import axiosSecure from '.'

export const addPublisher = async (publisherData) => {
  const { data } = await axiosSecure.post('/publishers', publisherData)
  return data
}

export const getAllPublishers = async () => {
  const { data } = await axiosSecure('/publishers')
  return data
}

export const addArticle = async (articleData) => {
  const { data } = await axiosSecure.post('/articles', articleData)
  return data
}

export const updateArticle = async (id, articleData) => {
  const { data } = await axiosSecure.put(`/article/${id}`, articleData)
  return data
}

export const getArticles = async (page, limit, email) => {
  const { data } = await axiosSecure(
    `/articles?page=${page}&limit=${limit}&email=${email}`,
  )
  return data
}

export const getArticle = async (id) => {
  const { data } = await axiosSecure(`/article/${id}`)
  return data
}
export const getUpdateArticle = async (id) => {
  const { data } = await axiosSecure(`/updatearticle/${id}`)
  return data
}

export const deleteArticle = async (id) => {
  const { data } = await axiosSecure.delete(`/article/${id}`)
  return data
}
