import React from "react";
import app from "../../assets/images/apple.png";
import { BsPencil } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Payment() {
  return (
    <div className="payment">
      <div className="payment__component">
        <div className="payment__component__header">
          <h2>TIẾN HÀNH ĐẶT HÀNG</h2>
          <p>
            Tiến hành hoàn tất việc đặt hàng ngay để sớm nhận được các sản phẩm
            bạn cần
          </p>
        </div>

        <div className="payment__component__body">
          <div className="payment__component__body__product">
            <h3>SẢN PHẨM TRONG ĐƠN HÀNG</h3>
            <div className="payment__component__body__product--item">
              <img src={app} alt="" />
              <div>
                <span className="payment__component__body__product--item--name">
                  TEST
                </span>{" "}
                <br />
                <br />
                <span className="payment__component__body__product--item--price">
                  75đ x 1 ={" "}
                </span>
                <span className="payment__component__body__product--item--sum">
                  75đ
                </span>
              </div>
            </div>

            <div className="payment__component__body__product--money">
              <span className="payment__component__body__product--money--price">
                Tổng tiền thanh toán:{" "}
              </span>
              <span className="payment__component__body__product--money--sum">
                27đ
              </span>
            </div>

            <div className="payment__component__body__product--update">
              <Link to="/shoppingCart" className="link">
                <h4>
                  <BsPencil />
                  Cập nhật giỏ hàng
                </h4>
              </Link>
            </div>
          </div>

          <div className="payment__component__body__client">
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
            <div className="payment__component__body__client--input">
              <input type="text" placeholder="Tên người nhận" />
              <br />
              <br />
              <input type="text" placeholder="Số điện thoại" />
              <br />
              <br />
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ nhận hàng"
              />
              <br />
              <br />
              <textarea
                type="text"
                rows="9"
                cols="40"
                placeholder="Thông tin khách hàng"
              />
            </div>
            <div className="payment__component__body__client--pay">
              <p>Vui lòng chọn hình thức thanh toán</p>
              <input type="radio" name="payment" checked={true} />
              <label>
                <FaMoneyBill /> Trả tiền mặt khi nhận hàng
              </label>
              <br />
              <input type="radio" name="payment" disabled={true} />
              <label>
                <AiOutlineAppstore /> Thanh toán bằng ứng dụng mobile
              </label>{" "}
              <br />
            </div>

            <div className="payment__component__body__client--button">
              <button>HOÀN TẤT ĐẶT HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
