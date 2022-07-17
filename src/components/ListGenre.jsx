const ListGenre = ({ genres }) => {
  return genres
    ?.map((genre, i) => (
      <span className="text-gray-600" key={i}>
        {genre.genre.name}
      </span>
    ))
    .reduce((prev, curr) => [prev, ", ", curr])
}

export default ListGenre
