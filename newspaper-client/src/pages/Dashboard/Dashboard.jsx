import React from 'react'
import axiosSecure from '../../api'
import { Chart } from 'react-google-charts'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const {
    data: chartData,
    isLoading,
  } = useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      const res = await axiosSecure.get('/chart')
      return res?.data
    },
  })

  if (isLoading) return <div>Loading...</div>

  const data = [
    ['Publisher', 'Article Count'],
    ...chartData.map((item) => [item.publisher, item.count]),
  ]

  const options = {
    title: 'Article Counts by Publisher',
  }

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'100%'}
        height={'400px'}
      />
    </div>
  )
}

export default Dashboard
