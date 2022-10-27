import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { BsFillCartXFill } from "react-icons/bs";
import { database } from "../../firebase";
import { child, onValue, ref, remove, update } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `/${currentUser.uid}` + `/cart`), (snapshot) => {
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
    remove(child(dbRef, `/${currentUser.uid}` + `/cart` + `/${item.uuid}`));
  };

  const DecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      <></>;
    } else {
      update(child(dbRef, `/${currentUser.uid}` + `/cart` + `/${item.uuid}`), {
        quantity: item.quantity - 1,
      });
    }
  };

  const IncreaseQuantity = (item) => {
    update(child(dbRef, `/${currentUser.uid}` + `/cart` + `/${item.uuid}`), {
      quantity: item.quantity + 1,
    });
  };

  const handleDeleteAllCart = () => {
    remove(child(dbRef, `/${currentUser.uid}` + `/cart`));
  };

  return (
    <div className="cart">
      {product.length !== 0 ? (
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
                  <tr key={item.id}>
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
            <h3>
              Tổng tiền:{" "}
              {product.reduce((a, v) => (a = a + v.price * v.quantity), 0)} đ
            </h3>
            <h4 onClick={() => handleDeleteAllCart()}>
              <AiFillDelete /> Xóa tất cả sản phẩm trong Giỏ hàng
            </h4>
          </div>
          <div className="cart__fields--button">
            <Link to={"/shoppingCart/payment"}>
              <button>
                <TiTick />
                THANH TOÁN NGAY
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart__xCart">
          <BsFillCartXFill size={100} color="#2693ff" />
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <Link to="/">
            <button>VỀ TRANG CHỦ</button>
          </Link>
        </div>
      )}
    </div>
  );
}
