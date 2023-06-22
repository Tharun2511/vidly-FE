import _ from "lodash";

const Pagination = ({ itemCount, pageSize, currPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination m-2">
        {" "}
        {pages.map((page) => (
          <li
            className={
              page === currPage
                ? "page-item active clickable"
                : "page-active clickable"
            }
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
