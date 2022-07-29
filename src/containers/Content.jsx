import ListContent from "../components/ListContent"
import React, { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ContentSkeleton from "../components/Skeleton/ContentSkeleton"
import NoData from "../components/NoData"
import Error from "../components/Error"
import { useNavigate, useParams } from "react-router-dom"
import ModalContent from "../components/ModalContent"
import useStore from "../store"
import InfiniteScroll from "react-infinite-scroll-component"
import Loading from "../components/Loading"
import { useMediaQuery } from "react-responsive"
import { Dialog } from "@headlessui/react"
import Badge from "../components/Badge"
import ReleaseAt from "../components/ReleaseAt"
import ListGenre from "../components/ListGenre"
import Countdown from "react-countdown"
import { timeToReleaseDate } from "../utils"
import CountdownTime from "../components/CountdownTime"
import { useContent } from "../hooks/useContent"

const LazyListVideo = React.lazy(() => import("../components/ListVideo"))
const LazyCategory = React.lazy(() => import("./Category"))

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

  const navigate = useNavigate()

  const isMobile = useMediaQuery({ maxWidth: 640 })

  return (
    <>
      <React.Suspense fallback={""}>
        <LazyCategory />
      </React.Suspense>
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
          <AnimatePresence exitBeforeEnter>
            {id &&
              (isMobile ? (
                <ContentModalMobile id={id} onClose={() => navigate("/")} />
              ) : (
                <ModalContent id={id} onClose={() => navigate("/")} />
              ))}
          </AnimatePresence>
        </>
      )}
    </>
  )
}

export default Content

function ContentModalMobile({ onClose, id }) {
  const { data: content = {}, isLoading } = useContent(id, { videos: true })

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="px-3 bg-white fixed w-full h-14 drop-shadow">
          <div className="relative mt-4 text-center">
            <div className="absolute inset-y-0 left-0">
              <button className="focus:outline-none p-1" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
              </button>
            </div>
            <span className="font-medium">Details</span>
          </div>
        </div>

        <div className="mt-14 overflow-y-auto">
          {isLoading ? (
            <div className="animate-pulse px-5 pt-4">
              <div className="rounded-xl bg-gray-300 h-[450px] w-full" />
              <div className="flex-1 space-y-6 py-5">
                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 w-2/3 bg-gray-300 rounded col-span-2"></div>
                  <div className="h-2 w-1/2 bg-gray-300 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-8 bg-gray-300 rounded" />
                  <div className="h-8 bg-gray-300 rounded" />
                  <div className="h-8 bg-gray-300 rounded" />
                  <div className="h-8 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 pb-10 pt-4 ">
              <img
                src={content?.image?.url}
                alt={content?.title}
                width="400"
                height="600"
                className="rounded-xl mb-4 block overflow-hidden"
              />
              <h2 className="text-2xl pb-4 leading-8 font-bold text-gray-900" id="modal-title">
                {content?.title}
              </h2>
              <div className="text-sm flex space-x-2 items-center">
                <Badge type={content?.type} />
                {content?.animated && <Badge type={"Animated"} animated />}
                <ReleaseAt release_at={content.release_at} year_at={content.year_at} />
              </div>
              {content?.contents_genres?.length > 0 && (
                <div className="mt-3">
                  <ListGenre genres={content?.contents_genres} />
                </div>
              )}

              <p className="text-gray-900 mt-3">{content?.description}</p>

              <div className="w-full px-6">
                {content?.release_at ? (
                  <Countdown
                    date={Date.now() + timeToReleaseDate(content?.release_at)}
                    renderer={(props) => <CountdownTime data={props} type={content?.type} />}
                  />
                ) : (
                  <div className="flex items-center justify-center mt-3">
                    <p className="text-gray-500">Release date to be announced</p>
                  </div>
                )}
              </div>

              <h2 className="mt-6 mb-3 font-semibold">Trailer</h2>

              <React.Suspense fallback={<div>Loading...</div>}>
                <motion.div
                  className="w-full"
                  initial={!isLoading && { opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
                >
                  {isLoading ? (
                    <div className="animate-pulse flex space-x-4 py-2 mt-3">
                      <div className="rounded-xl bg-gray-300 h-[200px] w-full"></div>
                    </div>
                  ) : content?.videos?.length < 1 ? (
                    <h2 className="mt-2 mb-3 text-gray-600">Trailer not yet available</h2>
                  ) : (
                    <LazyListVideo id={id} videos={content?.videos} />
                  )}
                </motion.div>
              </React.Suspense>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

function Modal({ onClose, children }) {
  return (
    <Dialog className="fixed inset-0 z-10" onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full sm:block sm:p-0 ">
        <Dialog.Overlay
          as={motion.div}
          variants={{
            open: {
              opacity: 1,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            },
            closed: {
              opacity: 0,
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
            },
          }}
          initial="closed"
          animate="open"
          exit="closed"
          onAnimationStart={(variant) => {
            if (variant === "open") {
              set(document.documentElement, {
                background: "black",
                height: "100vh",
              })
              set(document.body, { position: "fixed", inset: "0" })
              set(document.querySelector("header"), { position: "absolute" })
              set(document.querySelector("#root"), {
                borderRadius: "8px",
                overflow: "hidden",
                transform: "scale(0.93) translateY(calc(env(safe-area-inset-top) + 18px))",
                transformOrigin: "top",
                transitionProperty: "transform",
                transitionDuration: `0.5s`,
                transitionTimingFunction: `cubic-bezier(0.32, 0.72, 0, 1)`,
              })
            } else {
              reset(document.querySelector("#root"), "transform")
            }
          }}
          onAnimationComplete={(variant) => {
            if (variant === "closed") {
              reset(document.documentElement)
              reset(document.body)
              reset(document.querySelector("header"))
              reset(document.querySelector("#root"))
            }
          }}
          className="fixed inset-0 bg-black/40"
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            x: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full bg-white shadow-xl top-safe-top"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  )
}

let cache = new Map()

function set(el, styles) {
  let originalStyles = {}

  Object.entries(styles).forEach(([key, value]) => {
    originalStyles[key] = el.style[key]
    el.style[key] = value
  })

  cache.set(el, originalStyles)
}

function reset(el, prop) {
  let originalStyles = cache.get(el)

  if (prop) {
    el.style[prop] = originalStyles[prop]
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      el.style[key] = value
    })
  }
}
