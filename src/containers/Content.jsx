import ListContent from "../components/ListContent"
import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ContentSkeleton from "../components/Skeleton/ContentSkeleton"
import Category from "./Category"
import NoData from "../components/NoData"
import Error from "../components/Error"
import { useParams } from "react-router-dom"
import ModalContent from "../components/ModalContent"
import useStore from "../store"

const Content = () => {
  const { id } = useParams()
  const filter = useStore((state) => state.filter)
  const isLoading = useStore((state) => state.loading)
  const getContent = useStore((state) => state.getContents)
  const contents = useStore((state) => state.contents)
  const search = useStore((state) => state.search)
  const isError = useStore((state) => state.isError)

  useEffect(() => {
    getContent()
  }, [filter, search])

  return (
    <>
      <Category />
      {contents.length === 0 && search && !isLoading ? (
        <NoData />
      ) : isError ? (
        <Error onClick={() => location.reload()} />
      ) : (
        <>
          <div layout="true" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 px-2 sm:px-0 mb-6">
            {isLoading ? <ContentSkeleton /> : <ListContent contents={contents} />}
          </div>
          <AnimatePresence>{id && <ModalContent id={id} key="item" />}</AnimatePresence>
        </>
      )}
    </>
  )
}

export default Content
