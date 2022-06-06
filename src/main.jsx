import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: async (error, query) => {
      // How to get status code fo error
      console.log("q", error)
      // if (error.request.status === 401) {
      //   console.log("Refreshing Token");
      //   await api.get("/api/refresh-token");
      //   queryClient.refetchQueries(query.queryKey);
      // }
    },
  }),
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
