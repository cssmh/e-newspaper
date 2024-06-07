import { Link } from 'react-router-dom'

const AllArticlePageCard = ({ article }) => {
  const {
    _id,
    title,
    image,
    description,
    tags,
    author,
    author_image,
    viewCount,
    isPremium
  } = article
  
  return (
    <div className={`${isPremium ? "dark:bg-emerald-700" : "dark:bg-gray-800"} max-w-2xl overflow-hidden bg-white rounded-md shadow-md`}>
      <img className="object-cover w-full h-56" src={image} alt="Article" />
      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 flex gap-2">
            {tags?.map((tag, idx) => (
              <p key={idx}>#{tag}</p>
            ))}
          </span>
          <p
            className="block mt-2 text-xl font-semibold text-white transition-colors duration-300 transform"
            tabIndex="0"
          >
            {title}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center">
                <img
                  className="object-cover h-10 rounded-full"
                  src={author_image}
                  alt="Avatar"
                />
                <a
                  href="#"
                  className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                  tabIndex="0"
                  role="link"
                >
                  {author}
                </a>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  Total views: {viewCount}
                </span>
              </div>
            </div>
            <Link to={`/article/${_id}`}>
              <button className="btn">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllArticlePageCard
