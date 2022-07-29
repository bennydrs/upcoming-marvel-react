import { useQuery } from "react-query"
import useStore from "../store"
import supabase from "../utils/supabase"

const getContent = async (id, videos) => {
  const { data, error } = await supabase
    .from("contents")
    .select(
      `*, image(*), categories:categories_contents!inner(*, category:categories(name)), contents_genres(genre:genres(*))`
    )
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }
  if (videos) {
    const { data: dataVideos } = await supabase.from("videos").select("*").eq("content_id", id)
    return { ...data, videos: dataVideos }
  }

  return data
}
export const useContent = (id, { videos } = {}) => {
  const contents = useStore((state) => state.contents)

  return useQuery(["content", id, videos], () => getContent(id, videos), {
    initialData: () => {
      return contents?.data?.find((d) => d.id == id)
    },
    initialStale: true,
  })
}
