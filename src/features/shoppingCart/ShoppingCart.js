import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { database } from "../../firebase";
import { child, get, ref } from "firebase/database";
import { useAuth } from "../user/AuthContext";

export default function ShoppingCart() {
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `/${currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(product.map((item) => item.name));
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
              {product.map((item) => (
                <tr>
                  <td className="cart__fields--tb--item">
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                  </td>

                  <td>
                    {/* <span>a</span> */}
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      max="10"
                      defaultValue={item.quantity}
                    />
                    {/* <span>-</span> */}
                  </td>
                  <td>
                    <h4>
                      {item.quantity} * {item.price} đ
                    </h4>
                  </td>
                  <td>
                    <button>
                      <AiFillDelete />
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
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
