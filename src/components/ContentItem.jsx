import Countdown from "react-countdown"
import CountdownTime from "./CountdownTime"
import { motion } from "framer-motion"

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

  let toDateFormat = date && `${date} ${month.substring(0, 3)} ${year}`
  let timeToReleaseDate = new Date(toDateFormat).getTime() - new Date().getTime()

  const formatDate = date ? toDateFormat : year ? year : "TBA"

  // const currentDate = new Date().toISOString().slice(0, 10)
  // const isShowing =
  //   date &&
  //   new Date(new Date(toDateFormat).toISOString().slice(0, 10)).getTime() >=
  //     new Date(currentDate).getTime()

  return (
    <motion.div
      key={filter}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="removed"
      custom={index}
      className="flex bg-white rounded-3xl p-3 space-x-3 max-h-fit shadow-sm"
    >
      <img src={image?.url} alt={title} loading="lazy" className="w-1/3 rounded-2xl bg-gray-400" />
      <div className="w-2/3">
        <div className="flex flex-col h-full">
          <div className="h-1/2">
            <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
            <div className="text-sm flex space-x-2 items-center">
              <span
                className={`px-1.5 pb-[1px] rounded-md text-white ${
                  type === "Series"
                    ? "bg-blue-500 border border-blue-600"
                    : "bg-orange-400 border border-orange-500"
                }`}
              >
                {type}
              </span>
              {animated && (
                <span
                  className={`bg-red-400 border border-red-500 px-1.5 pb-[1px] rounded-md text-white`}
                >
                  A
                </span>
              )}
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
  )
}

export default ContentItem
