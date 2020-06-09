import * as React from "react";

interface IPaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange(e: React.MouseEvent, page: number): void
}

const createPagination = (totalPages: number, currentPage: number, onPageChange: (e: React.MouseEvent, page: number) => void) => {
    let pages: React.ReactNode[] = [];

    if (totalPages === 1)
        return pages;

    let status: boolean = false;
    for (let i = 1; i <= totalPages; i++) {
        if (i < 5 || (i > currentPage - 3 && i < currentPage + 3) || i > totalPages - 3) {
            status = false;
            pages.push(i === currentPage ?
                <li className="page-item active" key={i.toString()}>
                    <span className="page-link">
                        {i}
                        <span className="sr-only">(current)</span>
                    </span>
                </li>
                :
                <li className="page-item" key={i.toString()}>
                    <a className="page-link" href="#" onClick={e => onPageChange(e, i)}>{i}</a>
                </li>
            )

        } else {
            if (!status) {
                status = true;
                pages.push(<li className="page-item" key={i.toString()}>
                        <span className="page-link disabled">
                            ...
                        </span>
                </li>)
            }
        }
    }

    return pages
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    return (
        <ul className="pagination">
            {
                currentPage !== 1 &&
                <li className="page-item">
                    <a className="page-link" href="#" onClick={e => onPageChange(e, currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
            }

            {createPagination(totalPages, currentPage, onPageChange)}

            {
                currentPage !== totalPages &&
                <li className="page-item">
                    <a className="page-link" href="#" onClick={e => onPageChange(e, currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            }
        </ul>
    )
};

export default Pagination;
