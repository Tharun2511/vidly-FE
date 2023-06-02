const ListGroup = ({ genresList, selectedGenre, onGenreSelect }) => {
  return (
    <ul className="list-group m-2">
      {genresList.map((genre) => (
        <li
          className={
            selectedGenre._id === genre._id
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          key={genre._id}
          onClick={() => onGenreSelect(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
