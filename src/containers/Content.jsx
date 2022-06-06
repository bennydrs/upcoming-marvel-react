import ContentItem from "../components/ContentItem"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import useContent from "../hooks/useContent"
import ContentSkeleton from "../components/Skeleton/ContentSkeleton"
import Category from "./Category"
import NoData from "../components/NoData"
import Error from "../components/Error"
import { useParams } from "react-router-dom"
import ModalContent from "../components/ModalContent"

const Content = ({ search }) => {
  const { id } = useParams()
  const [filter, setFilter] = useState("All")
  const { data, isError, isLoading } = useContent(filter)

  const filtered = data?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  if (filtered?.length === 0) return <NoData />

  return (
    <>
      <Category filter={filter} setFilter={setFilter} />
      <AnimatePresence>{id && <ModalContent id={id} filter={filter} key="item" />}</AnimatePresence>
      <AnimatePresence>
        <div
          className={` ${
            isError ? "grid-cols-0" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3 px-2 sm:px-0 mb-6"
          }`}
        >
          {isLoading ? (
            <ContentSkeleton />
          ) : isError ? (
            <Error onClick={() => location.reload()} />
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
