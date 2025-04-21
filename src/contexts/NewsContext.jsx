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
				}));

				if (reset) {
					setArticles(formattedArticles);
				} else {
					setArticles((prev) => [...prev, ...formattedArticles]);
				}
				setHasMore(formattedArticles.length > 0);
				setPage(currentPage + 1);
			} else {
				setError(data.message || "Failed to fetch news");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Reset on preference change
	useEffect(() => {
		setPage(1);
		fetchArticles(true);
	}, [category, selectedSources]);

	// Other functions remain the same
	const changeCategory = (newCategory) => setCategory(newCategory);

	const toggleSource = (sourceId) => {
		setSelectedSources((prev) =>
			prev.includes(sourceId)
				? prev.filter((id) => id !== sourceId)
				: [...prev, sourceId]
		);
	};

	const saveArticle = (article) => {
		const saved = JSON.parse(localStorage.getItem("savedArticles") || []);
		if (!saved.some((a) => a.url === article.url)) {
			localStorage.setItem(
				"savedArticles",
				JSON.stringify([...saved, article])
			);
		}
	};

	const getSavedArticles = () =>
		JSON.parse(localStorage.getItem("savedArticles") || []);

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
