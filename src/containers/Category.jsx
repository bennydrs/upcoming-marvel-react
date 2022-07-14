import CategorySkeleton from "../components/Skeleton/CategorySkeleton"
import { useEffect } from "react"
import useStore from "../store"
import { motion } from "framer-motion"

const Category = () => {
  const getCategories = useStore((state) => state.getCategories)
  const categories = useStore((state) => state.categories)
  const setFilter = useStore((state) => state.setFilter)
  const filter = useStore((state) => state.filter)
  const loading = useStore((state) => state.loading)
  const isError = useStore((state) => state.isError)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="flex md:justify-center w-full py-4 overflow-x-scroll no-scrollbar space-x-3 px-2 sm:px-0">
      {loading ? (
        <CategorySkeleton />
      ) : isError ? (
        <div className="flex items-center">
          <span className="text-red-600 text-center">Something went wrong!</span>
          <div
            className="text-black p-1 hover:cursor-pointer hover:bg-slate-300 rounded-full ml-1"
            onClick={() => location.reload()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z"
              />
            </svg>
          </div>
        </div>
      ) : (
        categories?.map((category, i) => (
          <motion.button
            className={`py-2 min-w-[82px] text-sm rounded-xl ${
              category.id === filter
                ? "bg-primary text-white font-semibold"
                : "bg-white hover:bg-gray-50"
            }`}
            key={i}
            onClick={() => setFilter(category.id)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
          >
            {category.name}
          </motion.button>
        ))
      )}
    </div>
  )
}

export default Category
