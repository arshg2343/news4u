"use client"
import { useNews } from "../contexts/NewsContext"

const CategoryFilter = () => {
  const { category, changeCategory } = useNews()

  const categories = [
    { id: "general", name: "General" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
    { id: "science", name: "Science" },
    { id: "sports", name: "Sports" },
  ]

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => changeCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              category === cat.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            } transition-colors`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
