import useCategory from "../hooks/useCategory"
import CategorySkeleton from "../components/Skeleton/CategorySkeleton"

const Category = ({ filter, setFilter }) => {
  const { data: categories, isLoading } = useCategory()

  return (
    <div className="flex md:justify-center w-full py-4 overflow-x-scroll no-scrollbar space-x-3 px-2 sm:px-0">
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        categories?.map((category, i) => (
          <button
            className={`py-2 min-w-[82px] text-sm rounded-xl ${
              category.name == filter
                ? "bg-primary text-white font-semibold"
                : "bg-white hover:bg-gray-50"
            }`}
            key={i}
            onClick={() => setFilter(category.name)}
          >
            {category.name}
          </button>
        ))
      )}
    </div>
  )
}

export default Category
