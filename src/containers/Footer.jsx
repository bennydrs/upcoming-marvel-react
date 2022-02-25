import useLinkDownload from "../hooks/useLinkDownload"

const Footer = () => {
  const { data, isLoading } = useLinkDownload()
  const url = data?.data.attributes.url

  return (
    <footer className="w-full bg-gray-900 text-white py-3 mt-4">
      <div className="container text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 flex items-center justify-center"
          style={{ pointerEvents: isLoading && "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1.5em"
            height="1.5em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path
              fill="currentColor"
              d="M17.532 15.106a1.003 1.003 0 1 1 .001-2.007a1.003 1.003 0 0 1 0 2.007Zm-11.044 0a1.003 1.003 0 1 1 .001-2.007a1.003 1.003 0 0 1 0 2.007Zm11.4-6.018l2.006-3.459a.413.413 0 1 0-.721-.407l-2.027 3.5a12.243 12.243 0 0 0-5.13-1.108c-1.85 0-3.595.398-5.141 1.098l-2.027-3.5a.413.413 0 1 0-.72.407l1.995 3.458C2.696 10.947.345 14.417 0 18.523h24c-.334-4.096-2.675-7.565-6.112-9.435Z"
            />
          </svg>
          <h3>Download Upcoming Movie App</h3>
        </a>
        <div className="mt-5 text-gray-300">
          Made by{" "}
          <a
            href="https://github.com/bennydrs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Benny Ds
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
