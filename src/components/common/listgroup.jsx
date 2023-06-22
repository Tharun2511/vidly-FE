const ListGroup = ({ ItemsList, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group m-2">
      {ItemsList.map((item) => (
        <li
          className={
            selectedItem._id === item._id
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          key={item._id}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
