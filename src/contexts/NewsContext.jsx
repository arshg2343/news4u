"use client";

import { createContext, useState, useContext, useEffect } from "react";

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [category, setCategory] = useState("general");
	const [sources, setSources] = useState([]);
	const [selectedSources, setSelectedSources] = useState([]);

	// Get API key from environment variables
	const apikey = import.meta.env.VITE_NEWS_API_KEY || "your_api_key_here";

	// Load user preferences
	useEffect(() => {
		const savedCategory = localStorage.getItem("newsCategory");
		const savedSources = localStorage.getItem("newsSources");
		if (savedCategory) setCategory(savedCategory);
		if (savedSources) setSelectedSources(JSON.parse(savedSources));
	}, []);

	// Save preferences
	useEffect(() => {
		localStorage.setItem("newsCategory", category);
		localStorage.setItem("newsSources", JSON.stringify(selectedSources));
	}, [category, selectedSources]);

	// Fetch articles
	const fetchArticles = async (reset = false) => {
		if (loading) return;

		setLoading(true);
		setError(null);

		try {
			// Use current page or reset to 1
			const currentPage = reset ? 1 : page;
			let url = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apikey}&page=${currentPage}`;

			if (selectedSources.length > 0) {
				url += `&sources=${selectedSources.join(",")}`;
			}

			const response = await fetch(url);
			const data = await response.json();

			if (data.articles) {
				const formattedArticles = data.articles.map((article) => ({
					title: article.title,
					description: article.description,
					url: article.url,
					urlToImage: article.image || "/placeholder.svg",
					publishedAt: article.publishedAt,
					source: { name: article.source?.name || "Unknown" },
					// Add a unique ID to help with React rendering
					id: article.url + "-" + article.publishedAt,
				}));

				// Check if we received fewer articles than expected (usually 10)
				const isLastPage = formattedArticles.length < 10;

				if (reset) {
					setArticles(formattedArticles);
					setPage(2); // Reset to page 2 for next fetch
				} else {
					setArticles((prev) => [...prev, ...formattedArticles]);
					setPage(currentPage + 1); // Increment page for next fetch
				}

				// Only have more if we got a full page of results
				setHasMore(!isLastPage && formattedArticles.length > 0);
			} else {
				setError(data.message || "Failed to fetch news");
				setHasMore(false);
			}
		} catch (err) {
			setError(err.message);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	};

	// Reset on preference change
	useEffect(() => {
		// When category or sources change, reset and fetch from page 1
		fetchArticles(true);
	}, [category, selectedSources]);

	const changeCategory = (newCategory) => setCategory(newCategory);

	const toggleSource = (sourceId) => {
		setSelectedSources((prev) =>
			prev.includes(sourceId)
				? prev.filter((id) => id !== sourceId)
				: [...prev, sourceId]
		);
	};

	const saveArticle = (article) => {
		try {
			const saved = JSON.parse(
				localStorage.getItem("savedArticles") || "[]"
			);
			if (!saved.some((a) => a.url === article.url)) {
				localStorage.setItem(
					"savedArticles",
					JSON.stringify([...saved, article])
				);
			}
		} catch (error) {
			console.error("Error saving article:", error);
		}
	};

	const getSavedArticles = () => {
		try {
			const saved = localStorage.getItem("savedArticles");
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error("Error parsing saved articles:", error);
			return [];
		}
	};

	return (
		<NewsContext.Provider
			value={{
				articles,
				loading,
				error,
				hasMore,
				category,
				sources,
				selectedSources,
				fetchArticles,
				changeCategory,
				toggleSource,
				saveArticle,
				getSavedArticles,
			}}
		>
			{children}
		</NewsContext.Provider>
	);
};
