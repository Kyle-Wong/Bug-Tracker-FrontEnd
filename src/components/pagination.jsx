import React from "react";
const Pagination = props => {
  let { pageCount, pageIndex, onClick } = { ...props };
  pageCount = parseInt(pageCount);
  pageIndex = parseInt(pageIndex);
  if (!pageCount || pageCount <= 0) return null;
  let pageNumbers = new Array(pageCount);
  let startIndex = pageIndex - 2;
  if (startIndex - 2 < 0) {
    startIndex = 0;
  } else if (startIndex + 2 >= pageCount) {
    startIndex = pageCount - 5;
  }
  for (let i = 0; i < 5; i++) {
    if (startIndex + i < pageCount) pageNumbers[i] = startIndex + i;
  }
  return (
    <div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li
            style={{ cursor: "pointer" }}
            className={pageIndex === 0 ? "page-item disabled" : "page-item"}
            onClick={() => {
              if (pageIndex <= 0) return;

              onClick(pageIndex - 1);
            }}
          >
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          {pageNumbers.map(e => {
            return (
              <li
                style={{ cursor: "pointer" }}
                className={
                  e === parseInt(pageIndex) ? "page-item active" : "page-item"
                }
                key={e}
              >
                <a
                  className="page-link"
                  onClick={() => {
                    if (pageIndex === e) return;
                    onClick(e);
                  }}
                >
                  {e + 1}
                </a>
              </li>
            );
          })}

          <li
            style={{ cursor: "pointer" }}
            className={
              pageIndex >= parseInt(pageCount) - 1
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => {
                if (pageIndex >= pageCount) return;
                onClick(pageIndex + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
