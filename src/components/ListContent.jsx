import Countdown from "react-countdown"
import CountdownTime from "./CountdownTime"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Badge from "./Badge"
import { timeToReleaseDate } from "../utils"
import ReleaseAt from "./ReleaseAt"
import { useEffect, useRef } from "react"

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

const Card = ({ movie, index }) => {
  const { id, title, type, image, animated, release_at, year_at } = movie

  // const imageCld = cloudinary.image(image?.public_id)
  // imageCld.resize(thumbnail().width(150).height(220)).roundCorners(byRadius(16))

  let hasRenderedProjectsRef = useRef(false)
  useEffect(() => {
    if (id) {
      hasRenderedProjectsRef.current = true
    } else {
      hasRenderedProjectsRef.current = false
    }
  }, [])

  return (
    <Link to={`/${id}`}>
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate="visible"
        exit="removed"
        custom={index}
        className="flex bg-white rounded-3xl p-3 space-x-3 shadow-sm xl:min-h-[100px] xl:max-h-[250px] max-h-full hover:bg-gray-50 overflow-hidden"
        layoutId={`card-container-${id}`}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div className="w-1/3" layoutId={`card-image-container-${id}`}>
          <img
            src={image.url}
            alt=""
            loading="lazy"
            width="150"
            height="220"
            className="rounded-2xl bg-gray-400 w-[150] h-auto"
          />
        </motion.div>

        <div className="w-2/3">
          <div className="flex flex-col h-full">
            <motion.div className="h-1/2" layoutId={`card-title-${id}`}>
              <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
              <div className="text-sm flex space-x-2 items-center">
                <Badge type={type} />
                {animated && <Badge type={"A"} animated />}
                <ReleaseAt release_at={release_at} year_at={year_at} />
              </div>
            </motion.div>
            <motion.div className="h-2/3 w-full" layoutId={`card-countdown-${id}`}>
              {release_at ? (
                <Countdown
                  date={Date.now() + timeToReleaseDate(release_at)}
                  renderer={(props) => <CountdownTime data={props} type={type} />}
                />
              ) : (
                <div className="flex items-center mt-3">
                  <p className="text-gray-500">Release date to be announced</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

const ListContent = ({ contents }) => {
  return contents.map((movie, i) => <Card movie={movie} key={i} index={i} />)
}

export default ListContent
