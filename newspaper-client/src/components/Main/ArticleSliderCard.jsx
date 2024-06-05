const ArticleSliderCard = ({ getArticle }) => {
  const {
    id,
    title,
    image,
    description,
    tags,
    author,
    author_image,
    viewCount,
  } = getArticle

  return (
    <div className=" mt-8 mb-10 max-w-2xl overflow-hidden bg-white rounded-md shadow-md dark:bg-gray-800">
      <img className="object-cover w-full h-56" src={image} alt="Article" />
      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            #{tags}
          </span>
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            tabIndex="0"
            role="link"
          >
            {title}
          </a>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
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
            </div>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
              Total views: {viewCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleSliderCard
