import React, { useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../user/AuthContext";
import { database } from "../../firebase";
import { child, onValue, ref, remove, set, update } from "firebase/database";
import FormatMoney from "../../components/FormatMoney";
import MessageBox from "../../components/MessageBox";
import { uid } from "uid";
import { Helmet } from "react-helmet";

export default function Payment() {
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);
  const [info, setInfo] = useState([]);
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const infoClientRef = useRef();
  const history = useNavigate();

  const dbRef = ref(database);

  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Thông báo",
          message: "Thêm thành công",
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
      onValue(child(dbRef, `Cart` + `/${currentUser.uid}`), (snapshot) => {
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

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `Info`), (snapshot) => {
        setInfo([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            setInfo((oldArray) => [...oldArray, item]);
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
    if (
      nameRef.current.value !== "" &&
      phoneRef.current.value !== "" &&
      addressRef.current.value !== "" &&
      infoClientRef.current.value !== ""
    ) {
      update(child(dbRef, `Info` + `/${item.uuid}`), {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
      });

      product.map((itemP) => {
        const uuid = uid();
        set(ref(database, `Bill` + `/${currentUser.uid}` + `/${uuid}`), {
          id: itemP.id,
          image: itemP.image,
          name: itemP.name,
          quantity: itemP.quantity,
          price: itemP.price,
          email: currentUser.email,
          status: "Đang giao",
          uuid,
        })
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          });
      });

      remove(child(dbRef, `Cart` + `/${currentUser.uid}`));
      history("/bill");
    } else {
      showToast("error");
    }
  };

  return (
    <div className="payment">
      <Helmet>
        <title>MOBIJ - Thanh toán</title>
      </Helmet>
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
            {product.map((item, index) => (
              <div
                className="payment__component__body__product--item"
                key={index}
              >
                <img src={item.image} alt="" />
                <div
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  <span className="payment__component__body__product--item--name">
                    {item.name}
                  </span>{" "}
                  <br />
                  <br />
                  <span className="payment__component__body__product--item--price">
                    <FormatMoney money={item.price} /> x {item.quantity} ={" "}
                  </span>
                  <span className="payment__component__body__product--item--sum">
                    <FormatMoney
                      money={totalPrice(item.quantity, item.price)}
                    />
                  </span>
                </div>
              </div>
            ))}

            <div className="payment__component__body__product--money">
              <span className="payment__component__body__product--money--price">
                Tổng tiền thanh toán:{" "}
              </span>
              <span className="payment__component__body__product--money--sum">
                <FormatMoney
                  money={product.reduce(
                    (a, v) => (a = a + v.price * v.quantity),
                    0
                  )}
                />
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
          {info
            .filter((a) => a.email === currentUser.email)
            .map((item, index) => (
              <div className="payment__component__body__client">
                <h3>THÔNG TIN KHÁCH HÀNG</h3>
                <div
                  className="payment__component__body__client--input"
                  key={index}
                >
                  <input
                    type="text"
                    placeholder="Tên người nhận"
                    ref={nameRef}
                    defaultValue={item.name}
                  />
                  <br />
                  <br />
                  <input
                    type="number"
                    placeholder="Số điện thoại"
                    ref={phoneRef}
                    defaultValue={item.phone}
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ nhận hàng"
                    ref={addressRef}
                    defaultValue={item.address}
                  />
                  <br />
                  <br />
                  <textarea
                    type="text"
                    rows="9"
                    cols="40"
                    placeholder="Thông tin khách hàng"
                    ref={infoClientRef}
                  />
                </div>

                <div className="payment__component__body__client--pay">
                  <p>Vui lòng chọn hình thức thanh toán</p>
                  <input type="radio" name="payment" defaultChecked={true} />
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
                  <button onClick={() => handleSubmit(item)}>
                    HOÀN TẤT ĐẶT HÀNG
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <MessageBox data={list} setList={setList} />
    </div>
  );
}
