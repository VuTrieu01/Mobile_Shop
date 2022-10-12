import React from "react";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import dongho from "../../assets/images/dongho.webp";

export default function ShoppingCart() {
  const quantity = useRef();
  function totalPrice(price, total) {
    return price * total;
  }

  return (
    <div className="cart">
      <div className="cart__fields">
        <h2>THÔNG TIN GIỎ HÀNG</h2>
        <div className="cart__fields--tb">
          <table>
            <thead>
              <tr>
                <th>THÔNG TIN SẢN PHẨM</th>
                <th>SỐ LƯỢNG</th>
                <th>THÀNH TIỀN</th>
                <th>CÔNG CỤ</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="cart__fields--tb--item">
                  <img src={dongho} alt="" />
                  <span>Đồng hồ</span>
                </td>

                <td>
                  {/* <span>a</span> */}
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="10"
                    defaultValue={1}
                  />
                  {/* <span>-</span> */}
                </td>
                <td>
                  <h4>đ</h4>
                </td>
                <td>
                  <button>
                    <AiFillDelete />
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart__fields--item">
          <h3>Tổng tiền: </h3>
          <h4>
            <AiFillDelete /> Xóa tất cả sản phẩm trong Giỏ hàng
          </h4>
        </div>
        <div className="cart__fields--button">
          <button>
            <TiTick />
            THANH TOÁN NGAY
          </button>
        </div>
      </div>
    </div>
  );
}
