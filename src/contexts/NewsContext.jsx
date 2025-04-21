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

	const apikey = import.meta.env.VITE_NEWS_API_KEY;
	console.log(apikey);

	// Load user preferences from localStorage
	useEffect(() => {
		const savedCategory = localStorage.getItem("newsCategory");
		const savedSources = localStorage.getItem("newsSources");

		if (savedCategory) setCategory(savedCategory);
		if (savedSources) setSelectedSources(JSON.parse(savedSources));
	}, []);

	// Save preferences to localStorage when they change
	useEffect(() => {
		localStorage.setItem("newsCategory", category);
		localStorage.setItem("newsSources", JSON.stringify(selectedSources));
	}, [category, selectedSources]);

	// Fetch available sources
	useEffect(() => {
		const fetchSources = async () => {
			try {
				const response = await fetch(
					`https://newsapi.org/v2/sources?apiKey=${apikey}`
				);
				const data = await response.json();

				if (data.status === "ok") {
					setSources(data.sources);
				} else {
					setError("Failed to fetch sources");
				}
			} catch (err) {
				setError("Error fetching sources: " + err.message);
			}
		};

		fetchSources();
	}, []);

	// Fetch articles based on current preferences
	const fetchArticles = async (reset = false) => {
		if (loading) return;

		setLoading(true);
		setError(null);

		try {
			const currentPage = reset ? 1 : page;
			let url = `https://newsapi.org/v2/top-headlines?page=${currentPage}&pageSize=10&category=${category}&apiKey=${apikey}`;

			if (selectedSources.length > 0) {
				url = `https://newsapi.org/v2/top-headlines?page=${currentPage}&pageSize=10&sources=${selectedSources.join(
					","
				)}&apiKey=${apikey}`;
			}

			const response = await fetch(url);
			const data = await response.json();

			if (data.status === "ok") {
				if (reset) {
					setArticles(data.articles);
				} else {
					setArticles((prevArticles) => [
						...prevArticles,
						...data.articles,
					]);
				}

				setHasMore(data.articles.length > 0);
				setPage(currentPage + 1);
			} else {
				setError("Failed to fetch news");
			}
		} catch (err) {
			setError("Error fetching news: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	// Reset and fetch when preferences change
	useEffect(() => {
		setPage(1);
		fetchArticles(true);
	}, [category, selectedSources]);

	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};

	const toggleSource = (sourceId) => {
		setSelectedSources((prev) => {
			if (prev.includes(sourceId)) {
				return prev.filter((id) => id !== sourceId);
			} else {
				return [...prev, sourceId];
			}
		});
	};

	const saveArticle = (article) => {
		const savedArticles = JSON.parse(
			localStorage.getItem("savedArticles") || "[]"
		);
		const isAlreadySaved = savedArticles.some(
			(saved) => saved.url === article.url
		);

		if (!isAlreadySaved) {
			localStorage.setItem(
				"savedArticles",
				JSON.stringify([...savedArticles, article])
			);
		}
	};

	const getSavedArticles = () => {
		return JSON.parse(localStorage.getItem("savedArticles") || "[]");
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
