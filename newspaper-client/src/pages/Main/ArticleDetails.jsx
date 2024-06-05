import { useLoaderData } from 'react-router-dom'
import banner from '../../assets/banner.png'
const ArticleDetails = () => {
  const {
    _id,
    title,
    image,
    description,
    tags,
    author,
    author_image,
    viewCount,
  } = useLoaderData()

  return (
    <div>
      <div
        className="hero min-h-[30vh] md:min-h-[40vh] bg-cover"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="max-w-2xl mr-auto ml-6 md:ml-24 text-white">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-semibold">Details</h1>
          </div>
        </div>
      </div>
      <div className="text-center mx-1 max-w-md border-2 py-2 my-5 lg:mx-auto">
        <h1 className="font-semibold text-xl lg:text-[22px] text-blue-800 mb-1">
          Publisher Information
        </h1>
        <img src={author_image} className="w-12 rounded-full mx-auto" alt="" />
        <p className="text-cyan-600">Name: {author} </p>
        <p>Title: {title}</p>
        <p className="pb-1 text-blue-600"></p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <img src={image} className="w-[550px]" alt="" />
        <div>
          <p className="flex">
            {tags?.map((tag, idx) => (
              <p className="text-blue-400" key={idx}>
                #{tag}
              </p>
            ))}
          </p>
          <p>Views: {viewCount}</p>
        </div>
      </div>
      <p className="mt-5 max-w-7xl mx-auto">Description: {description}</p>
    </div>
  )
}

export default ArticleDetails
