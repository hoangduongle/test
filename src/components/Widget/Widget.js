import React from "react";
import "./Widget.style.scss";
const Widget = ({ data, title, icon }) => {
  const formatNumber = (number) => {
    let numFormatted = number?.toLocaleString("de-DE");
    return numFormatted;
  };
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title.toUpperCase()}</span>
        <span className="counter">{formatNumber(data)}</span>
        <span className="link">See all user</span>
      </div>
      <div className="right">
        <i className={`${icon} icon`}></i>
      </div>
    </div>
  );
};

export default Widget;
