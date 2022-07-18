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
import InfiniteScroll from "react-infinite-scroll-component"
import Loading from "../components/Loading"

const Content = () => {
  const { id } = useParams()
  const filter = useStore((state) => state.filter)
  const isLoading = useStore((state) => state.loadingContents)
  const getContents = useStore((state) => state.getContents)
  const getMoreContents = useStore((state) => state.getMoreContents)
  const { data: contents, count } = useStore((state) => state.contents)
  const page = useStore((state) => state.page)
  const setPage = useStore((state) => state.setPage)
  const search = useStore((state) => state.search)
  const isError = useStore((state) => state.isError)

  useEffect(() => {
    setPage(1)
    getContents()
  }, [filter, search])

  const fetchContents = () => {
    setPage(page + 1)
    getMoreContents({ page })
  }

  return (
    <>
      <Category />
      {contents.length === 0 && search && !isLoading ? (
        <NoData />
      ) : isError ? (
        <Error onClick={() => location.reload()} />
      ) : (
        <>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 px-2 sm:px-0 mb-6 overflow-hidden">
              <ContentSkeleton />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={contents.length}
              next={fetchContents}
              hasMore={contents.length < count}
              loader={<Loading />}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 px-2 sm:px-0 mb-6 overflow-hidden">
                <ListContent contents={contents} />
              </div>
            </InfiniteScroll>
          )}
          <AnimatePresence>{id && <ModalContent id={id} key="item" />}</AnimatePresence>
        </>
      )}
    </>
  )
}

export default Content
