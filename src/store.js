import create from "zustand"
import supabase from "./utils/supabase"

const getPagination = (page, size) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}

const fetchContents = ({ from, to, limit, page, filter, search }) => {
  let today = new Date()
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

  let query = supabase
    .from("contents")
    .select(`*, image(*), categories:categories_contents(*, category:categories(name))`, {
      count: "exact",
    })
    .or(`release_at.gte.${date},release_at.is.null`)
    .eq("is_published", true)
    .order("release_at", { ascending: true })
    .order("year_at", { ascending: true })
    .order("title", { ascending: true })

  if (limit && page) query.range(from, to)
  if (filter) query = query.eq("categories.category_id", filter)
  if (search) query = query.or(`title.ilike.%${search}%,type.ilike.%${search}%`)

  return query
}

const useStore = create((set, get) => ({
  contents: { data: [], count: 0 },
  content: {},
  search: "",
  filter: null,
  categories: [],
  loading: false,
  loadingContent: false,
  loadingContents: false,
  error: "",
  isError: false,
  success: false,
  page: 1,
  setPage: (page) => set({ page }),
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
  getContents: async ({ limit = 12, page = 1 } = {}) => {
    set({ loadingContents: true })
    const { from, to } = getPagination(page - 1, limit)

    try {
      const { data, count, error } = await fetchContents({
        limit,
        page,
        from,
        to,
        filter: get().filter,
        search: get().search,
      })

      if (error) throw error
      if (data) {
        set(() => ({ contents: { data: [], count: 0 } }))
        set((state) => ({
          ...state,
          contents: { data, count },
        }))
        set({ success: true })
      }
    } catch (error) {
      set({ error: error })
      set({ isError: true })
    } finally {
      set({ loadingContents: false })
    }
  },
  getMoreContents: async ({ limit = 12, page } = {}) => {
    const { from, to } = getPagination(page, limit)

    try {
      const { data, count, error } = await fetchContents({
        limit,
        page,
        from,
        to,
        filter: get().filter,
        search: get().search,
      })

      if (error) throw error
      if (data) {
        set((state) => ({
          ...state,
          contents: { data: [...state.contents.data, ...data], count },
        }))
        set({ success: true })
      }
    } catch (err) {
      console.log(err)
    }
  },
  getCategories: async () => {
    set({ loading: true })
    try {
      const { data: categories, error } = await supabase
        .from("categories")
        .select(`*, categories_contents!inner(*)`)
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
    set({ loadingContent: true })
    try {
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
    } catch (err) {
      set({ err: err.message })
    } finally {
      set({ loadingContent: false })
    }
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
