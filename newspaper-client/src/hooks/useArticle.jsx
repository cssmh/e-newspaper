import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getArticles } from '../api/Article'

const useArticle = (page, limit, email = '') => {
  const {
    refetch,
    data: articles = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['article', page, limit, email],
    queryFn: async () => {
      return await getArticles(page, limit, email)
    },
  })

  return [articles, refetch, isLoading, isSuccess]
}

export default useArticle
