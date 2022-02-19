import Countdown from "react-countdown"
import CountdownTime from "./CountdownTime"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Badge from "./Badge"
import { checkDate, convertTimeToReleaseDate } from "../utils"

const variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.025,
    },
  }),
  removed: {
    opacity: 0,
  },
}

const ContentItem = ({ movie, index, filter }) => {
  const { title, type, image, ReleaseDate, animated } = movie
  const { date, month, year } = ReleaseDate || {}

  const timeToReleaseDate = convertTimeToReleaseDate(date, month, year)
  const formatDate = checkDate(date, month, year)

  // const currentDate = new Date().toISOString().slice(0, 10)
  // const isShowing =
  //   date &&
  //   new Date(new Date(toDateFormat).toISOString().slice(0, 10)).getTime() >=
  //     new Date(currentDate).getTime()

  return (
    <Link to={`/${movie.id}`}>
      <motion.div
        key={filter}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="removed"
        custom={index}
        className="flex bg-white rounded-3xl p-3 space-x-3 max-h-fit shadow-sm hover:bg-gray-50"
        layoutId={`card-container-${movie.id}`}
      >
        <motion.div className="w-1/3" layoutId={`card-image-container-${movie.id}`}>
          <img
            src={image?.url}
            alt={title}
            loading="lazy"
            className="w-full rounded-2xl bg-gray-400"
          />
        </motion.div>
        <div className="w-2/3">
          <div className="flex flex-col h-full">
            <div className="h-1/2">
              <motion.h2
                className="text-lg md:text-xl font-semibold mb-2"
                layoutId={`card-title-${movie.id}`}
              >
                {title}
              </motion.h2>
              <div className="text-sm flex space-x-2 items-center">
                <Badge type={type} />
                {animated && <Badge type={"A"} animated />}
                <span className="text-gray-600">{formatDate}</span>
              </div>
            </div>
            <div className="h-2/3 w-full">
              {ReleaseDate?.date ? (
                <Countdown
                  date={Date.now() + timeToReleaseDate}
                  renderer={(props) => <CountdownTime data={props} type={type} />}
                />
              ) : (
                <div className="flex items-center mt-3">
                  <p className="text-gray-500">Release date to be announced</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ContentItem
