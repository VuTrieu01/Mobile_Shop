import { child, onValue, ref, update } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../../components/MessageBox";
import { database } from "../../firebase";
import { useAuth } from "./AuthContext";

export default function InfoClient() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const { currentUser } = useAuth();
  const dbRef = ref(database);
  const [info, setInfo] = useState([]);
  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Thông báo",
          message: "Cập nhật thành công",
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

  const handleSubmit = (item) => {
    update(child(dbRef, `Info` + `/${item.uuid}`), {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    });
    showToast("success");
  };

  return (
    <div className="info">
      {info
        .filter((a) => a.email === currentUser.email)
        .map((item, index) => (
          <div className="info__component">
            <h2>Thông tin khách hàng</h2>

            <div className="info__component--item" key={index}>
              <div className="form-input">
                <label>Họ và tên</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  ref={nameRef}
                  defaultValue={item.name}
                />
              </div>

              <div className="form-input">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  ref={phoneRef}
                  defaultValue={item.phone}
                />
              </div>

              <div className="form-input">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ nhận hàng"
                  ref={addressRef}
                  defaultValue={item.address}
                />
              </div>
            </div>

            <div className="info__component--button">
              <button onClick={() => handleSubmit(item)}>Cập nhật</button>
            </div>
          </div>
        ))}

      <MessageBox data={list} setList={setList} />
    </div>
  );
}
