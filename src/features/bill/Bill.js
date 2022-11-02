import { child, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { useAuth } from "../user/AuthContext";
import FormatMoney from "../../components/FormatMoney";
import MessageBox from "../../components/MessageBox";
import { Link } from "react-router-dom";
import { RiPagesFill } from "react-icons/ri";

export default function Bill() {
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);
  const dbRef = ref(database);

  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Thông báo",
          message: "Hủy đơn thành công",
          type: "success",
        };
        break;
      case "error":
        toastProperties = {
          id: list.length + 1,
          title: "Thông báo",
          message: "Vui lòng nhập đầy đủ thông tin",
          type: "error",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `Bill` + `/${currentUser.uid}`), (snapshot) => {
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

  const handleSubmit = (item) => {
    remove(child(dbRef, `Bill` + `/${currentUser.uid}` + `/${item.uuid}`));
    showToast("success");
  };

  return (
    <div className="bill">
      {product.length !== 0 ? (
        <div className="bill__component">
          <h2>Thông tin sản phẩm</h2>

          {product.map((item, index) => (
            <div className="bill__component__body" key={index}>
              <img src={item.image} alt="" />
              <div className="bill__component__body--item">
                <span className="bill__component__body--item--name">
                  {item.name}
                </span>{" "}
                <br />
                <br />
                <span className="bill__component__body--item--price">
                  Giá tiền: <FormatMoney money={item.price} />
                </span>
                <br />
                <br />
                <span className="bill__component__body--item--price">
                  Số lượng: {item.quantity}
                </span>
                <br />
                <br />
                <span className="bill__component__body--item--price">
                  Thành tiền:{" "}
                </span>
                <span className="bill__component__body--item--sum">
                  <FormatMoney money={totalPrice(item.quantity, item.price)} />
                </span>
                <br />
                <br />
                <span className="bill__component__body--item--price">
                  Trạng thái:{" "}
                </span>
                <span className="bill__component__body--item--status">
                  {item.status}
                </span>
              </div>

              <div className="bill__component__body--button">
                <button onClick={() => handleSubmit(item)}>Hủy đơn</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bill__xBill">
          <RiPagesFill size={100} color="#2693ff" />
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <Link to="/">
            <button>VỀ TRANG CHỦ</button>
          </Link>
        </div>
      )}
      <MessageBox data={list} setList={setList} />
    </div>
  );
}
