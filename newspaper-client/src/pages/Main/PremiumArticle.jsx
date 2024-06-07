import React, { useState } from 'react'
import axiosSecure from '../../api'
import { useQuery } from '@tanstack/react-query'
import useUser from '../../hooks/useUser'
import Loader from '../../components/Shared/Loader'
import PremiumArticleCard from './PremiumArticleCard'

const PremiumArticle = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const [userData] = useUser()

  const getArticle = async () => {
    const res = await axiosSecure.get(
      `/articles?page=${page}&limit=${limit}&status=approved&isPremium=yes`,
    )
    return res
  }

  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['article', page, limit],
    queryFn: getArticle,
  })

  console.log(articles?.data?.result)

  return userData?.premiumTaken && isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
      {articles?.data?.result?.map((art) => (
        <PremiumArticleCard key={art._id} article={art}></PremiumArticleCard>
      ))}
    </div>
  )
}

export default PremiumArticle
