import React from "react"

const SearchForm = ({ autoFocus, setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="relative text-white focus-within:text-gray-900">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button className="p-1 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          className="w-full py-2 text-sm text-white bg-gray-50/30 rounded-md pl-10 placeholder:text-gray-300 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="Search..."
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchForm
