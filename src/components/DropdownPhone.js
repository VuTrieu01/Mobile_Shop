import React from "react";
import { Link } from "react-router-dom";
import imgPhone from "../assets/images/sale-phone.webp";

function DropdownPhone() {
  return (
    <div className="dropdown">
      <div className="dropdown__list">
        <div className="dropdown__list--item">
          <h3>Hãng sản xuất</h3>
          <a href="./">Apple(Iphone)</a>
          <a href="./">Oppo</a>
          <a href="./">Vivo</a>
          <a href="./">Xiaomi</a>
        </div>

        <div className="dropdown__list--item">
          <h3>Mức giá</h3>
          <a href="./">Dưới 2 triệu</a>
          <a href="./">Từ 2 - 4 tr</a>
          <a href="./">Từ 5 - 10tr</a>
          <a href="./">Trên 10tr</a>
        </div>

        <div className="dropdown__list--item">
          <h3>Đồng hồ thông minh</h3>
          <a href="./">Apple watch</a>
          <a href="./">Xiaome</a>
          <a href="./">Huawei</a>
          <a href="./">Oppo</a>
        </div>
      </div>
      <div className="dropdown__sale">
        <h3>Bán chạy nhất</h3>
        <div className="dropdown__sale--container">
          <div className="dropdown__sale--img">
            <Link to="/">
              <img src={imgPhone} alt="" />
            </Link>
          </div>
          <div className="dropdown__sale--content">
            <p>Sam sung Galaxy s350 Ultra</p>
            <span>11.690.000 đ</span>
          </div>
          <div className="dropdown__sale--img">
            <Link to="/">
              <img src={imgPhone} alt="" />
            </Link>
          </div>
          <div className="dropdown__sale--content">
            <p>Sam sung Galaxy s350 Ultra</p>
            <span>11.690.000 đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownPhone;
