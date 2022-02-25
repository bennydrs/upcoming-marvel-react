import { useQuery } from "react-query"
import axiosAPI from "../config/axiosAPI"

const getLinkDownload = async () => {
  const { data } = await axiosAPI.get("/linkdownload")
  return data
}

const useLinkDownload = () => useQuery("linkDownload", getLinkDownload)

export default useLinkDownload
