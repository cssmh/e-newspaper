import axiosSecure from '../../api'
import { useQuery } from '@tanstack/react-query'

const ArticleSlider = () => {
  const getProducts = async () => {
    const res = await axiosSecure.get(`/article`)
    return res
  }
  const { data: articles } = useQuery({
    queryKey: ['article'],
    queryFn: getProducts,
  })
  console.log(articles?.data)
}

export default ArticleSlider
