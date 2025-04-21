"use client"
import { useNews } from "../contexts/NewsContext"
import { useTheme } from "../contexts/ThemeContext"
import { formatDistanceToNow } from "date-fns"

const NewsCard = ({ article }) => {
  const { saveArticle } = useNews()
  const { darkMode } = useTheme()

  const handleSave = () => {
    saveArticle(article)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {article.urlToImage ? (
        <img
          src={article.urlToImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://via.placeholder.com/640x360?text=No+Image+Available"
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No image available</span>
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{article.source.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.publishedAt
              ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
              : "Unknown date"}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description || "No description available"}
        </p>

        <div className="flex justify-between items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read more
          </a>

          <button
            onClick={handleSave}
            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
