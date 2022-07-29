const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white mt-4">
      <div className="container text-center py-6 px-4 sm:px-0">
        <p className="text-xs sm:text-sm text-gray-400">
          All logos, photos and all contents in this web are Creative Commons Licensed (CC-BY-SA).
          <br /> License details for all of these assets can be found on{" "}
          <a
            href="https://wikia.com/licensing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            Fandom's licensing page
          </a>
        </p>
      </div>
      <div className=" text-gray-300 text-center bg-gray-900 py-4">Made by Benny Ds</div>
    </footer>
  )
}

export default Footer
