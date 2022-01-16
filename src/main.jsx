import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
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
