import create from "zustand"
import supabase from "./utils/supabase"

const useStore = create((set, get) => ({
  contents: [],
  content: {},
  search: "",
  filter: null,
  categories: [],
  loading: false,
  error: "",
  isError: false,
  success: false,
  linkDownload: [],
  setFilter: (filter) =>
    set((state) => ({
      ...state,
      filter,
    })),
  setSearch: (search) =>
    set((state) => ({
      ...state,
      search,
    })),
  getContents: async (ref) => {
    let today = new Date()
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ref && set({ loading: true })
    try {
      let query = supabase
        .from("contents")
        .select(`*, image(*), categories:categories_contents!inner(*, category:categories(name))`)
        .or(`release_at.gte.${date},release_at.is.null`)
        .eq("is_published", true)
        .order("release_at", { ascending: true })
        .order("year_at", { ascending: true })
        .order("title", { ascending: true })

      if (get().filter) query = query.eq("categories.category_id", get().filter)
      if (get().search)
        query = query.or(`title.ilike.%${get().search}%,type.ilike.%${get().search}%`)

      const { data, error } = await query

      if (error) throw error
      if (data) {
        set(() => ({ contents: [] }))
        set((state) => ({ ...state, contents: data }))
        set({ success: true })
      }
    } catch {
      set({ error: error })
      set({ isError: true })
    } finally {
      set({ loading: false })
    }
  },
  getCategories: async () => {
    set({ loading: true })
    try {
      const { data: categories, error } = await supabase
        .from("categories")
        .select(`*`)
        .eq("is_published", true)
        .order("name", { ascending: true })

      if (error) throw error
      set({ categories: [{ id: null, name: "All" }, ...categories] })
    } catch (err) {
      set({ error: err.message })
      set({ isError: true })
    } finally {
      set({ loading: false })
    }
  },
  getContent: async (id, { videos } = {}) => {
    const { data, error } = await supabase
      .from("contents")
      .select(
        `*, image(*), categories:categories_contents!inner(*, category:categories(name)), contents_genres(genre:genres(*))`
      )
      .eq("id", id)
      .single()

    if (error) throw error
    if (videos) {
      const { data: dataVideos } = await supabase.from("videos").select("*").eq("content_id", id)
      set((state) => ({ ...state, content: { ...state.content, videos: dataVideos } }))
    }

    set((state) => ({ ...state, content: { ...state.content, ...data } }))
    // set((state) => ({ ...state, content: content }))
  },
  getLinkDownload: async () => {
    try {
      const { data, error } = await supabase
        .from("linkdownloads")
        .select(`*`)
        .eq("is_published", true)

      if (error) throw error
      set({ linkDownload: data })
    } catch (error) {
      set({ error: error.message })
      set({ isError: true })
    }
  },
}))

export default useStore
