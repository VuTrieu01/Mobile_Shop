import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { database } from "../../firebase";
import { child, onValue, ref, remove, update } from "firebase/database";
import { useAuth } from "../user/AuthContext";

export default function ShoppingCart() {
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `/${currentUser.uid}`), (snapshot) => {
        setProduct([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            setProduct((oldArray) => [...oldArray, item]);
          });
        }
      })
    ) : (
      <></>
    );
  }, []);

  function totalPrice(quantity, price) {
    return quantity * price;
  }

  const handleDeleteCart = (item) => {
    remove(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`));
  };

  const DecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      <></>;
    } else {
      update(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`), {
        quantity: item.quantity - 1,
      });
    }
  };

  const IncreaseQuantity = (item) => {
    update(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`), {
      quantity: item.quantity + 1,
    });
  };

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
                    <span
                      className="cart__fields--tb--btn__primary"
                      onClick={() => DecreaseQuantity(item)}
                    >
                      –
                    </span>
                    {item.quantity}
                    <span
                      className="cart__fields--tb--btn__primary"
                      onClick={() => IncreaseQuantity(item)}
                    >
                      +
                    </span>
                  </td>
                  <td>
                    <h4>{totalPrice(item.quantity, item.price)} đ</h4>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteCart(item)}>
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
