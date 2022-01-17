import ContentItem from "../components/ContentItem"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import useContent from "../hooks/useContent"
import ContentSkeleton from "../components/Skeleton/ContentSkeleton"
import Category from "./Category"
import NoData from "../components/NoData"
import Error from "../components/Error"

const Content = ({ search }) => {
  const [filter, setFilter] = useState("All")
  const { data, error, isLoading, refetch } = useContent(filter)

  const filtered = data?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  if (error) return <Error onClick={refetch} />
  if (filtered?.length === 0) return <NoData />

  return (
    <>
      <Category filter={filter} setFilter={setFilter} />
      <AnimatePresence>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 px-2 sm:px-0 mb-6">
          {isLoading ? (
            <ContentSkeleton />
          ) : (
            filtered?.map((movie, i) => (
              <ContentItem movie={movie} filter={filter} key={i} index={i} />
            ))
          )}
        </div>
      </AnimatePresence>
    </>
  )
}

export default Content
