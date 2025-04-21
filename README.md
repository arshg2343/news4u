# News4U

> A modern news aggregation web application built with React and Vite

News4U is a responsive news browsing application that aggregates articles from various sources using the NewsAPI.org service. This project demonstrates proficiency in React development, featuring category filtering, infinite scroll, and personalized article saving functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Project Context](#project-context)

## Overview

News4U provides users with a seamless news browsing experience, allowing them to filter articles by category and source, save articles for later reading, and enjoy a customizable reading experience with dark/light mode support. The application is built with modern React practices including hooks, Context API for state management, and Tailwind CSS for responsive design.

The project demonstrates integration with external APIs, implementation of complex UI components, and proper state management techniques, all while maintaining a focus on performance and user experience.

## Features

- 📰 **Article Browsing**: View the latest news from various sources
- 🔍 **Category Filtering**: Filter articles by category (General, Business, Technology, etc.)
- 🏢 **Source Selection**: Filter by specific news sources with multi-select capability
- ♾️ **Infinite Scroll**: Load more articles as you scroll for seamless browsing
- 💾 **Save Articles**: Save your favorite articles for later reading
- 🌓 **Theme Toggle**: Switch between dark and light modes with system preference detection
- 📱 **Responsive Design**: Optimal viewing experience across all device sizes
- ⚡ **Fast Performance**: Built with Vite for optimal loading and rendering speed


## Technologies Used

- ⚛️ **React.js**: Front-end library for building user interfaces
- ⚡ **Vite**: Next-generation frontend tooling for faster development
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling
- 🧠 **Context API**: For efficient state management
- 📅 **date-fns**: Modern JavaScript date utility library
- 🔌 **NewsAPI.org**: External API for retrieving news data
- 💾 **localStorage**: For persisting user preferences and saved articles

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/news4u.git

# Navigate to the project directory
cd news4u

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Configuration

### API Key Setup

1. Register for an API key at [Gnews.io](https://gnews.io)
2. Create a `.env` file in the root directory
3. Add your API key as follows:

```
VITE_NEWS_API_KEY=your_api_key_here
```

Example `.env` file:

```
VITE_NEWS_API_KEY=a1b2c3d4e5f6g7h8i9j0
```

## Usage

### News Browsing

The main dashboard displays news articles in a responsive grid. Use the category tabs at the top to filter by news category:

### Source Filtering

Click on the "Sources" dropdown to select specific news sources:

### Saving Articles

Click the bookmark icon on any article card to save it for later reading. Access your saved articles by clicking the "Saved" button in the navigation bar.

### Theme Toggle

Toggle between dark and light modes using the theme switch in the navigation bar. The application will also respect your system preferences by default.

## Project Structure

```
news4u/
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── SourceFilter.jsx
│   │   └── SavedArticlesModal.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── NewsContext.jsx
│   ├── hooks/
│   │   ├── useNewsData.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── api.js
│   │   └── formatters.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Contributing

This project was created as a college assignment and is not actively maintained. However, if you'd like to suggest improvements or report issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Context

This application was developed as a project submission for the Advanced React Development course at [Your College Name]. The project demonstrates practical implementation of React concepts and best practices learned throughout the course.

---

Created by [Your Name] © 2025
