import { AnimatePresence, motion } from "framer-motion"
import React, { Suspense, useState } from "react"
import Logo from "../img/logo.png"
import useStore from "../store"

const LazySearch = React.lazy(() => import("./SearchForm"))

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const setSearch = useStore((state) => state.setSearch)

  const handleClose = () => {
    setSearch("")
    setIsOpen(false)
  }

  return (
    <header className="bg-primary fixed w-full z-10 h-14 flex items-center drop-shadow">
      <div className="container px-2 flex justify-between items-center relative">
        <img src={Logo} className="w-52 md:w-60" width={224} height={42} alt="logo" />

        <div className="hidden md:block">
          <Suspense fallback="loading...">
            <LazySearch />
          </Suspense>
        </div>
        {/* search icon on mobile */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-1.5 focus:outline-none focus:shadow-outline bg-gray-50/40 rounded-lg text-white"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && <SearchFormMobile isOpen={isOpen} handleClose={handleClose} />}
      </AnimatePresence>
    </header>
  )
}

export default Header

const SearchFormMobile = ({ isOpen, handleClose }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0, transition: { duration: 0.2, ease: "easeOut" } }}
      exit={{ x: "100%" }}
      className="absolute w-full top-0 bg-primary block md:hidden"
    >
      <div className="container  flex justify-between items-center h-14 px-2 space-x-2">
        <Suspense fallback="loading...">
          <LazySearch autoFocus={isOpen} />
        </Suspense>
        <motion.button
          className="text-white bg-gray-50/40 p-1.5 rounded-md"
          onClick={handleClose}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
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
        </motion.button>
      </div>
    </motion.div>
  )
}
