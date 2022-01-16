const CategorySkeleton = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((_, index) => (
          <div className="animate-pulse flex space-x-4 py-2" key={index}>
            <div className="rounded-xl bg-gray-300 h-9 min-w-[82px]"></div>
          </div>
        ))}
    </>
  )
}

export default CategorySkeleton
