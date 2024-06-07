import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import usePublisher from '../../hooks/usePublisher'
import Creatable from 'react-select/creatable'
import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../../api'
import Loader from '../../components/Shared/Loader'
import AllArticlePageCard from './AllArticlePageCard'

const AllArticlePage = () => {
  const [page, setPage] = useState(1)
  const limit = 10
  const [publishers] = usePublisher()
  let tags

  const [selectedOptions, setSelectedOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [publisher, setPublisher] = useState('')

  const options = [
    { value: 'messi', label: 'Chocolate' },
    { value: 'chao', label: 'Strawberry' },
    { value: 'bao', label: 'Vanilla' },
  ]

  let selectedValues = selectedOptions.map((item) => item.value)
  tags = selectedValues.join(',')

  //   search

  const getArticle = async () => {
    const res = await axiosSecure.get(
      `/articles?page=${page}&limit=${limit}&status=approved&tags=${tags}&searchTerm=${searchTerm}&publisher=${publisher}`,
    )
    return res
  }

  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['product', page, limit, tags, searchTerm, publisher],
    queryFn: getArticle,
  })

  const Pginetionclass =
    'join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200'
  return (
    <div className="px-4">
      <Helmet>
        <title>E-Newspaper | Find Your news</title>
      </Helmet>

      {/* banner */}
      <div
        className="banner h-52 bg-blend-overlay rounded-lg"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <h2
          className=" text-2xl text-center ml-2 sm:ml-0 lg:text-5xl font-bold text-yellow-600 pt-10"
          data-aos="fade-down"
          data-aos-delay="400"
        >
          Find Your Desired News
        </h2>
        <div
          className="flex  justify-center pt-8 items-center"
          data-aos="fade-down"
          data-aos-delay="400"
        >
          <input
            id="search"
            type="text"
            placeholder="Search Here"
            className="md:w-[30%] w-40 h-[50px] p-3 rounded-full border-2 border-[#DEDEDE]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* category filter */}

      <div
        className="bg-green-200 p-2 rounded-lg"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <div className="bg-white p-8 rounded-lg flex flex-col lg:flex-row justify-between items-center">
          <div>
            <h2 className="font-semibold text-2xl">Filter By:</h2>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 rounded-sm items-center">
              <label className="text-lg font-semibold">Publisher:</label>
              <select
                className=" select max-w-xs focus:outline-none text-base font-medium border-green-700  select-bordered w-full "
                onChange={(e) => setPublisher(e.target.value)}
              >
                <option value="All">All Publishers</option>
                {publishers.map((item) => (
                  <option key={item?._id} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Creatable
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="tags"
                defaultValue={selectedOptions}
                onChange={setSelectedOptions}
                options={options}
                isMulti
              ></Creatable>
            </div>
          </div>
        </div>
      </div>

      {/* product card show here */}
      {/* map using  articles?.data?.result   */}
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          {articles?.data?.result?.map((art) => (
            <AllArticlePageCard
              key={art._id}
              article={art}
            ></AllArticlePageCard>
          ))}
        </div>
      )}
      {isSuccess && (
        <div className="paginetion flex mb-20">
          <div className="join border-green-300 border mx-auto ">
            <button
              onClick={() => setPage((old) => old - 1)}
              disabled={1 === page}
              className={`${Pginetionclass} disabled:bg-green-100`}
            >
              «
            </button>
            {[...Array(Math.ceil(articles?.data?.total / limit)).keys()].map(
              (ele) => {
                return (
                  <button
                    onClick={() => setPage(ele + 1)}
                    key={ele + 1}
                    className={`${Pginetionclass} ${
                      ele + 1 === parseInt(page) ? 'bg-yellow-300' : ''
                    } `}
                  >
                    {ele + 1}
                  </button>
                )
              },
            )}

            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={page === Math.ceil(articles?.data?.total / limit)}
              className={`${Pginetionclass} disabled:bg-green-100`}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllArticlePage
