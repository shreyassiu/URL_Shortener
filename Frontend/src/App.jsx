import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)

  axios.defaults.baseURL = 'http://localhost:3000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!longUrl) {
      toast.error('Please enter a URL')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/shorten', { longUrl })
      setShortUrl(response.data.shortUrl)
      console.log(response.data.shortUrl)
      toast.success('URL shortened successfully!')
    } catch (error) {
      toast.error('Failed to shorten URL')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">URL Shortener</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your long URL
            </label>
            <input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="https://example.com/very-long-url"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Shortened URL:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-200"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        
        <Toaster position="bottom-center" />
      </div>
    </div>
  )
}

export default App