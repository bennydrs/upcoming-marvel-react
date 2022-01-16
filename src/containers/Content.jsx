import ContentItem from "../components/ContentItem"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import useContent from "../hooks/useContent"
import ContentSkeleton from "../components/Skeleton/ContentSkeleton"
import Category from "./Category"
import NoData from "../components/NoData"

const Content = ({ search }) => {
  const [filter, setFilter] = useState("All")
  const { data, isLoading } = useContent(filter)

  const filtered = data?.filter((item) => item.title.toLowerCase().includes(search))

  if (filtered?.length === 0) return <NoData />

  return (
    <>
      <Category filter={filter} setFilter={setFilter} />

      <AnimatePresence>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0 mb-6">
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
