import React, { Suspense, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Countdown from "react-countdown"
import { Link } from "react-router-dom"
import useStore from "../store"
import { timeToReleaseDate } from "../utils"
import CountdownTime from "./CountdownTime"
import Badge from "./Badge"
import Loading from "./Loading"
import ListGenre from "./ListGenre"
import ReleaseAt from "./ReleaseAt"

const ListVideo = React.lazy(() => import("./ListVideo"))

const ModalContent = ({ id }) => {
  const contents = useStore((state) => state.contents)
  const isLoading = useStore((state) => state.loadingContent)
  const getContent = useStore((state) => state.getContent)
  const contentDetail = useStore((state) => state.content)
  const content = useMemo(() => contents.data.find((c) => c.id == id) ?? contentDetail, [contents])
  // const imageCld = useMemo(() => cloudinary.image(content?.image?.public_id), [content])

  const [load, setLoad] = useState(false)

  useEffect(() => {
    getContent(id, { videos: true })
    // const body = document.querySelector("body")
    // if (id) {
    //   body.classList.add("overflow-hidden")
    // }
    // return () => {
    //   body.classList.remove("overflow-hidden")
    // }
  }, [id])

  window.addEventListener("load", () => setLoad(true))

  return (
    <motion.div
      className="fixed z-10 inset-0 overflow-scroll sm:overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: "auto" }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-4 lg:p-0">
        <Link to="/">
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        </Link>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {isLoading && load ? (
          <div className="inline-block h-full align-bottom bg-white z-10 rounded-2xl shadow-xl transform sm:align-middle p-1">
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          </div>
        ) : (
          <motion.div
            className="inline-block align-bottom bg-white z-10 rounded-2xl text-left overflow-hidden shadow-xl transform min-w-full sm:min-w-fit sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full h-full sm:relative"
            layoutId={`card-container-${id}`}
          >
            <div className="sm:flex">
              {!Object.keys(content).length && !isLoading ? (
                <div className="flex justify-center p-6 w-full">
                  <p className="text-lg">Hmm...this page doesn't exist</p>
                </div>
              ) : (
                <>
                  <motion.div className="sm:w-1/2 h-full" layoutId={`card-image-container-${id}`}>
                    <img
                      src={content?.image?.url}
                      alt={content?.title}
                      width="400"
                      height="600"
                      loading="lazy"
                      className="block overflow-hidden rounded-2xl bg-gray-400 w-[600px] max-w-full h-auto"
                    />

                    {/* <AdvancedImage
                        cldImg={imageCld}
                        className="block overflow-hidden rounded-2xl bg-gray-400 w-[600px] max-w-full h-auto"
                        plugins={[placeholder({ mode: "blur" })]}
                        loading="lazy"
                      /> */}
                  </motion.div>

                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:w-1/2 overflow-auto sm:absolute sm:right-0 sm:top-0 sm:bottom-16">
                    <div className="w-full">
                      <div className="mt-3 sm:mt-0 sm:text-left">
                        <motion.div layoutId={`card-title-${id}`}>
                          <h2
                            className="text-2xl pb-4 leading-6 font-bold text-gray-900"
                            id="modal-title"
                          >
                            {content?.title}
                          </h2>
                          <div className="text-sm flex space-x-2 items-center">
                            <Badge type={content?.type} />
                            {content?.animated && <Badge type={"Animated"} animated />}
                            <ReleaseAt release_at={content.release_at} year_at={content.year_at} />
                          </div>
                        </motion.div>

                        {isLoading ? (
                          <div className="animate-pulse flex space-x-4 py-2 mt-3">
                            <div className="rounded-xl bg-gray-300 h-4 min-w-[100px]"></div>
                          </div>
                        ) : (
                          contentDetail?.contents_genres?.length > 0 && (
                            <div className="mt-3">
                              <ListGenre genres={contentDetail?.contents_genres} />
                            </div>
                          )
                        )}

                        <p className="text-gray-900 mt-3">{content?.description}</p>

                        <motion.div className="h-2/3 w-full px-6" layoutId={`card-countdown-${id}`}>
                          {content?.release_at ? (
                            <Countdown
                              date={Date.now() + timeToReleaseDate(content?.release_at)}
                              renderer={(props) => (
                                <CountdownTime data={props} type={content?.type} />
                              )}
                            />
                          ) : (
                            <div className="flex items-center justify-center mt-3">
                              <p className="text-gray-500">Release date to be announced</p>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                    <h2 className="mt-6 mb-3 font-semibold">Trailer</h2>

                    <Suspense fallback={<div className="text-2xl">Loading …</div>}>
                      <motion.div
                        className="w-full"
                        initial={!isLoading && { opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
                      >
                        {isLoading ? (
                          <div className="animate-pulse flex space-x-4 py-2 mt-3">
                            <div className="rounded-xl bg-gray-300 h-[200px] w-full"></div>
                          </div>
                        ) : contentDetail?.videos?.length < 1 ? (
                          <h2 className="mt-2 mb-3 text-gray-600">Trailer not yet available</h2>
                        ) : (
                          <ListVideo id={id} videos={contentDetail?.videos} />
                        )}
                      </motion.div>
                    </Suspense>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:absolute sm:right-0 sm:bottom-0 sm:w-1/2">
                    <Link to="/">
                      <button type="button" className="btn">
                        Close
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ModalContent
