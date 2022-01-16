const ContentSkeleton = () => {
  return (
    <>
      {Array(9)
        .fill()
        .map((_, index) => (
          <div className="animate-pulse flex space-x-4 py-1" key={index}>
            <div className="rounded-2xl bg-gray-300 h-56 w-40"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-14 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-between h-20 items-center">
                  <div className="flex flex-col space-y-2 items-center">
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                    <div className="h-3 w-10 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex flex-col space-y-2 items-center">
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                    <div className="h-3 w-10 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex flex-col space-y-2 items-center">
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                    <div className="h-3 w-10 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex flex-col space-y-2 items-center">
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                    <div className="h-3 w-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default ContentSkeleton
