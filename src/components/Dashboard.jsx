"use client"

import { useRef, useCallback } from "react"
import { useNews } from "../contexts/NewsContext"
import NewsCard from "./NewsCard"
import CategoryFilter from "./CategoryFilter"
import SourceFilter from "./SourceFilter"

const Dashboard = () => {
  const { articles, loading, error, hasMore, fetchArticles } = useNews()
  const observer = useRef()

  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchArticles()
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore, fetchArticles],
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <CategoryFilter />
        <SourceFilter />
      </div>

      {error && <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => {
          if (articles.length === index + 1) {
            return (
              <div ref={lastArticleRef} key={article.url}>
                <NewsCard article={article} />
              </div>
            )
          } else {
            return <NewsCard key={article.url} article={article} />
          }
        })}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && articles.length === 0 && !error && (
        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
          No articles found. Try changing your filters.
        </div>
      )}
    </div>
  )
}

export default Dashboard
