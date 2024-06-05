import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../../api'

const AllPublishers = () => {
  const { data: publishers = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers')
      return res?.data
    },
  })

  return (
    <div className="mb-10">
      <h1 className="text-2xl text-center mb-4">All Publishers</h1>
      <div className="flex max-w-[1200px] mx-auto space-x-3">
        {publishers?.map((pub) => (
          <div key={pub._id}>
            <img
              src={pub?.photoURL}
              className="rounded-full w-[60px] mx-auto"
              alt=""
            />
            <p>{pub.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPublishers
