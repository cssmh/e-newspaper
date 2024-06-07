import React from 'react'
import statBg from '../../assets/statbg.jpg'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../../api'

const Statistics = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const { data: allUser = [] } = useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
      const res = await axiosSecure.get('/count-user')
      return res?.data
    },
  })
  const { normalUser, premiumUser, totalUser } = allUser;

  return (
    <div
      ref={ref}
      className="hero min-h-[30vh] mb-10"
      style={{
        backgroundImage: `url(${statBg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52">
          <div>
            <p
              data-aos="flip-left"
              data-aos-duration="1000"
              className="text-red-500"
            >
              All Users
            </p>
            <p className="text-gray-600">
              {inView && <CountUp end={totalUser || 0} duration={3} />}
            </p>
          </div>
          <div>
            <p
              data-aos="flip-up"
              data-aos-duration="1000"
              className="text-green-500"
            >
              Normal Users
            </p>
            <p className="text-gray-600">
              {inView && <CountUp end={normalUser || 0} duration={3} />}
            </p>
          </div>
          <div>
            <p
              data-aos="flip-right"
              data-aos-duration="1000"
              className="text-blue-500"
            >
              Premium Users
            </p>
            <p className="text-gray-600">
              {inView && (
                <CountUp end={premiumUser || 0} duration={3} />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
