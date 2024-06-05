import { useQuery } from '@tanstack/react-query'
import { getAllPublishers } from '../api/Article'

const usePublisher = () => {
  const {
    refetch,
    data: publisher = [],
    isLoading,
  } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      return await getAllPublishers()
    },
  })

  return [publisher, refetch, isLoading]
}

export default usePublisher
