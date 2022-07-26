import YouTube from "react-youtube"

const ListVideo = ({ videos, id }) => {
  return videos?.length
    ? videos?.map((video, i) => (
        <div className="rounded-xl overflow-hidden h-[200px] mb-3" key={i}>
          <YouTube
            videoId={video?.idVideo}
            className="mb-5 "
            opts={{ width: "100%", height: "200" }}
          />
        </div>
      ))
    : ""
}

export default ListVideo
