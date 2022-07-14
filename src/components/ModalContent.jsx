import { motion } from "framer-motion"
import React, { useEffect } from "react"
import Countdown from "react-countdown"
import ReactPlayer from "react-player"
import { Link, useNavigate } from "react-router-dom"
import useStore from "../store"
import { convertToDateFormat, parseDate } from "../utils"
import Badge from "./Badge"
import CountdownTime from "./CountdownTime"

const ModalContent = ({ id }) => {
  const contents = useStore((state) => state.contents)
  const isLoading = useStore((state) => state.loading)
  const getContent = useStore((state) => state.getContent)
  const content = useStore((state) => state.content)
  let navigate = useNavigate()

  const timeToReleaseDate =
    new Date(parseDate(content?.release_at)).getTime() - new Date().getTime()

  useEffect(() => {
    if (contents && !content) navigate("/")
  }, [contents, content])

  console.log({ content })

  useEffect(() => {
    getContent(id, { videos: true })
    const body = document.querySelector("body")
    if (id) {
      body.classList.add("overflow-hidden")
    }
    return () => {
      body.classList.remove("overflow-hidden")
    }
  }, [id])

  return (
    <motion.div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: "auto" }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Link to="/">
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/30 transition-opacity"
            aria-hidden="true"
          ></div>
        </Link>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              <motion.div layoutId={`card-image-container-${id}`}>
                <img
                  src={content?.image?.url}
                  loading="lazy"
                  className="w-full rounded-2xl bg-gray-400"
                />
              </motion.div>
              <motion.div
                className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                layoutId={`card-container-${id}`}
              >
                <div className="w-full">
                  <div className="mt-3 sm:mt-0 sm:text-left">
                    <motion.h2
                      layoutId={`card-title-${id}`}
                      className="text-2xl pb-4 leading-6 font-bold text-gray-900"
                      id="modal-title"
                    >
                      {content?.title}
                    </motion.h2>
                    <div className="text-sm flex space-x-2 items-center">
                      <Badge type={content?.type} />
                      {content?.animated && <Badge type={"Animated"} animated />}
                      <span className="text-gray-600">
                        {content.release_at
                          ? convertToDateFormat(content.release_at)
                          : content.year_at
                          ? content.year_at
                          : "TBA"}
                      </span>
                    </div>
                    {content?.contents_genres?.length > 0 && (
                      <div className="mt-3">
                        {content?.contents_genres
                          ?.map((genre, i) => (
                            <span className="text-gray-600" key={i}>
                              {genre.genre.name}
                            </span>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])}
                      </div>
                    )}
                    <div className="mt-3">
                      <p className="text-gray-900">{content?.description}</p>
                    </div>
                    <div className="h-2/3 w-full px-6">
                      {content?.release_at ? (
                        <Countdown
                          date={Date.now() + timeToReleaseDate}
                          renderer={(props) => <CountdownTime data={props} type={content?.type} />}
                        />
                      ) : (
                        <div className="flex items-center justify-center mt-3">
                          <p className="text-gray-500">Release date to be announced</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <h2 className="mt-6 mb-3 font-semibold">Trailer</h2>
                {content?.videos?.length < 1 && (
                  <h2 className="mt-2 mb-3 text-gray-600">Trailer not yet available</h2>
                )}
                {content?.videos?.map((video) => (
                  <div className="mb-6 relative pt-[56.25%]" key={video.id}>
                    <ReactPlayer
                      className="absolute top-0 left-0"
                      url={`https://www.youtube.com/watch?v=${video.idVideo}`}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  </div>
                ))}
              </motion.div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link to="/">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ModalContent
