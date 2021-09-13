import React from "react";
import "./paginate.css";
import ReactPaginate from "react-paginate";
import downArrow from "../../assets/down.png";
import downArrow1 from "../../assets/down1.png";
function Paginate(props) {
  return (
    <div>
      <ReactPaginate
        previousLabel={<img src={downArrow} alt="down-arrow" />}
        nextLabel={<img src={downArrow1} alt="down-arrow" />}
        pageCount={props.pageCount}
        onPageChange={props.pageChange}
        containerClassName={"paginationBttns"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default Paginate;
