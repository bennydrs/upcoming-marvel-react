import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Logo from "../img/logo.png"
import SearchForm from "./SearchForm"

const Header = ({ search, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setSearch("")
    setIsOpen(false)
  }

  return (
    <header className="bg-primary ">
      <div className="container px-2 flex justify-between items-center h-14 relative">
        <img src={Logo} className="w-56 md:w-60" alt="logo" />

        <div className="hidden md:block">
          <SearchForm search={search} setSearch={setSearch} />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-1.5 focus:outline-none focus:shadow-outline bg-gray-50/40 rounded-lg text-white"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="absolute w-full top-0 bg-primary block md:hidden"
          >
            <div className="container  flex justify-between items-center h-14 px-2 space-x-2">
              <SearchForm autoFocus={isOpen} search={search} setSearch={setSearch} />
              <button className="text-white bg-gray-50/40 p-1.5 rounded-md" onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
