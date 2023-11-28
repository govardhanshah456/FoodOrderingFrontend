import React from 'react'

const RoomPaginator = ({currentPage,totalPages,onPageChange}) => {
    const arr = [];
    for(let i=1;i<=totalPages;i++)
        arr.push(i);
  return (
    <nav aria-label="Page navigation">
			<ul className="pagination justify-content-center">
				{arr.map((pageNumber) => (
					<li
						key={pageNumber}
						className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
						<button onClick={() => onPageChange(pageNumber)} className="page-link">
							{pageNumber}
						</button>
					</li>
				))}
			</ul>
		</nav>
  )
}

export default RoomPaginator