import React, { Fragment, useEffect, useState } from "react";
import "./table.scss";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { formatToVND } from "../../ultil/numberUltil";
const TableOrderDetail = (props) => {
  const dispatch = useDispatch();
  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData?.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };
  return (
    <div style={{ border: "1px solid #c4c4c4" }}>
      <div className="table-wrapper" style={{ minHeight: "250px" }}>
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <>
              {currentItems &&
                currentItems.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>#{item.order_item_id}</td>
                      <td>{item.name}</td>
                      <td>{formatToVND(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatToVND(item.subTotal)}</td>
                    </tr>
                  </tbody>
                ))}
            </>
          ) : null}
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default TableOrderDetail;
