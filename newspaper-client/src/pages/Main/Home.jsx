import React from 'react'
import { Helmet } from 'react-helmet'
import ArticleSlider from '../../components/Main/ArticleSlider'
import Latest from '../../components/Main/Latest'
import AllPublishers from './AllPublishers'
import Plans from './Plans'
import Statistics from './Statistics'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>E-Newspaper | Home</title>
      </Helmet>
      <Latest />
      <ArticleSlider />
      <AllPublishers />
      <Statistics />
      <Plans />
    </div>
  )
}

export default Home
