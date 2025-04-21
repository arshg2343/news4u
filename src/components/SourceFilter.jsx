"use client"

import { useState } from "react"
import { useNews } from "../contexts/NewsContext"

const SourceFilter = () => {
  const { sources, selectedSources, toggleSource } = useNews()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSources = sources.filter((source) => source.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
      >
        <span>Sources</span>
        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">{selectedSources.length}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search sources..."
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredSources.length > 0 ? (
              filteredSources.map((source) => (
                <div key={source.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={source.id}
                    checked={selectedSources.includes(source.id)}
                    onChange={() => toggleSource(source.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={source.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {source.name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No sources found</p>
            )}
          </div>

          {selectedSources.length > 0 && (
            <button
              onClick={() => {
                selectedSources.forEach((source) => toggleSource(source))
              }}
              className="mt-4 w-full px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SourceFilter
