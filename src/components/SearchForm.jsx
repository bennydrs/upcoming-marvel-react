import React from "react"
import useStore from "../store"

const SearchForm = ({ autoFocus }) => {
  const setSearch = useStore((state) => state.setSearch)
  const search = useStore((state) => state.search)
  const setPage = useStore((state) => state.setPage)

  const handleSearch = (e) => {
    setPage(1)
    setSearch(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="relative text-white focus-within:text-gray-900">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button className="p-1 focus:outline-none focus:shadow-outline" aria-label="search-label">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          value={search}
          name="q"
          className="w-full py-2 px-10 text-sm text-white bg-gray-50/30 rounded-md placeholder:text-gray-300 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="Search..."
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={handleSearch}
        />
        {search && (
          <span className="absolute inset-y-0 right-0 flex items-center pl-2">
            <button
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={() => setSearch("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"
                />
                <path
                  fill="currentColor"
                  d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default SearchForm
