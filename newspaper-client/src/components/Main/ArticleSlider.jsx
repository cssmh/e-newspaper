import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

import axiosSecure from '../../api'
import { useQuery } from '@tanstack/react-query'
import ArticleSliderCard from './ArticleSliderCard'

const ArticleSlider = () => {
  const {
    data: articles,
    isLoading,
  } = useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article`)
      return res?.data
    },
  })
  
  if (isLoading) {
    return <p>loading....</p>
  }

  return (
    <div>
      <Swiper
        // data-aos="fade-up"
        // data-aos-delay="600"
        speed={1000}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {articles?.map((article) => (
          <SwiperSlide key={article._id} style={{ minWidth: '300px' }}>
            <ArticleSliderCard getArticle={article} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ArticleSlider
