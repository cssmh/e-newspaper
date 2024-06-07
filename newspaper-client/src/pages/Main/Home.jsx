import React from 'react'
import { Helmet } from 'react-helmet'
import ArticleSlider from '../../components/Main/ArticleSlider'
import Latest from '../../components/Main/Latest'
import AllPublishers from './AllPublishers'
import Plans from './Plans'
import Statistics from './Statistics'
import { Contact } from '../../components/Main/Contact'
import Newsletter from '../../components/Main/Newsletter'

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
      <Contact></Contact>
      <Newsletter></Newsletter>
      <Plans />
    </div>
  )
}

export default Home
