import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import dongho from "../../assets/images/dongho.webp";

export default function ShoppingCart() {
  const [money, setMoney] = useState(50000);
  let handleQuantity = (evt) => {
    setMoney(50000 * evt.target.value);
  };

  return (
    <div className="cart">
      <div className="cart__fields">
        <h2>THÔNG TIN GIỎ HÀNG</h2>
        <div className="cart__fields--tb">
          <table>
            <tr>
              <th colSpan={2}>THÔNG TIN SẢN PHẨM</th>
              <th>SỐ LƯỢNG</th>
              <th>THÀNH TIỀN</th>
              <th>CÔNG CỤ</th>
            </tr>
            <tr>
              <td>
                <img
                  src={dongho}
                  alt=""
                  className="cart__fields--tb--image"
                ></img>
              </td>
              <td className="cart__fields--tb--text">Đồng hồ</td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  defaultValue={1}
                  onChange={handleQuantity}
                />
              </td>
              <td>
                <h4>{money}đ</h4>
              </td>
              <td>
                <button>
                  <AiFillDelete />
                  Xóa
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={dongho}
                  alt=""
                  className="cart__fields--tb--image"
                ></img>
              </td>
              <td className="cart__fields--tb--text">Đồng hồ</td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  defaultValue={1}
                  onChange={handleQuantity}
                />
              </td>
              <td>
                <h4>{money}đ</h4>
              </td>
              <td>
                <button>
                  <AiFillDelete />
                  Xóa
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div className="cart__fields--item">
          <h3>Tổng tiền: {money}</h3>
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
