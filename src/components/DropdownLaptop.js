import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/laptop.webp";

function DropdownLaptop() {
  return (
    <div className="dropdown">
      <div className="dropdown__list">
        <div className="dropdown__list--item">
          <h3>Hãng sản xuất</h3>
          <a href="./">Apple</a>
          <a href="./">Asus</a>
          <a href="./">Mac</a>
          <a href="./">Dell</a>
        </div>

        <div className="dropdown__list--item">
          <h3>Phần mềm</h3>
          <a href="./">Window</a>
          <a href="./">Diệt viruss</a>
          <a href="./">MicrosoftOffice</a>
        </div>

        <div className="dropdown__list--item">
          <h3>Máy in</h3>
          <a href="./">HP</a>
          <a href="./">Cannon</a>
          <a href="./">Brother</a>
        </div>
      </div>
      <div className="dropdown__list">
        <h3>Mức giá</h3>
        <a href="./">Dưới 2 triệu</a>
        <a href="./">Dưới 2 triệu</a>
        <a href="./">Dưới 2 triệu</a>
        <a href="./">Dưới 2 triệu</a>
      </div>
      <div className="dropdown__sale">
        <div className="dropdown__sale--img">
          <Link to="/">
            <img src={img} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DropdownLaptop;
