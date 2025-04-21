import { NewsProvider } from "./contexts/NewsContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"

function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <div className="min-h-screen transition-colors duration-300">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Dashboard />
          </main>
        </div>
      </NewsProvider>
    </ThemeProvider>
  )
}

export default App
