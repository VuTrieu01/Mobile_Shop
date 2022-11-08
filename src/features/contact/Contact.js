import React, { useRef, useState } from "react";
import { BiMap } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { database } from "../../firebase";
import MessageBox from "../../components/MessageBox";
import { Helmet } from "react-helmet";

function Contact() {
  const { currentUser } = useAuth();
  const uuid = uid();
  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();
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

  const handleSubmit = () => {
    if (
      nameRef.current.value === "" ||
      phoneNumberRef.current.value === "" ||
      emailRef.current.value === "" ||
      contentRef.current.value === ""
    ) {
      showToast("error");
    } else {
      showToast("success");
      set(ref(database, `Contact` + `/${currentUser.uid}` + `/${uuid}`), {
        name: nameRef.current.value,
        phone: phoneNumberRef.current.value,
        email: emailRef.current.value,
        content: contentRef.current.value,
        uuid,
      })
        .then(() => {
          nameRef.current.value = "";
          phoneNumberRef.current.value = "";
          emailRef.current.value = "";
          contentRef.current.value = "";
          console.log("Successful submission");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>MOBIJ - Liên hệ</title>
      </Helmet>
      <div className="contact">
        <form>
          <div className="contact__form">
            <h3>Gửi liên hệ cho chúng tôi</h3>
            <h5>
              Để lại thông tin cần hỗ trợ của bạn, chúng tôi sẽ liên lạc lại
            </h5>
            <input type="text" placeholder="Tên của bạn..." ref={nameRef} />
            <input
              type="text"
              placeholder="Số điện thoại..."
              ref={phoneNumberRef}
            />
            <input
              type="text"
              name="email"
              placeholder="Email..."
              ref={emailRef}
            />
            <label>Nội dung liên hệ</label>
            <textarea type="text" rows="9" cols="40" ref={contentRef} />
            {currentUser ? (
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled="false"
                style={{ backgroundColor: "rgb(87, 81, 81)" }}
              >
                Submit
              </button>
            )}
          </div>
        </form>

        <div className="contact__detail">
          <h3>Cửa hàng điện thoại Iphone</h3>
          <div className="contact__detail--item">
            <BiMap size={20} />
            <h6>Địa chỉ:</h6>
            <span>445 Lê Văn Việt - phường Tăng Nhơn Phú A - TP Thủ Đức</span>
          </div>
          <div className="contact__detail--item">
            <FiClock size={20} />
            <h6>Giờ mở cửa: </h6>
            <span>1:00-21:00 MON-SUN</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlineMail size={20} />
            <h6>Số điện thoại: </h6>
            <span>0912333666</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlinePhone size={20} />
            <h6>Email:</h6>
            <span>Group@gmail.com</span>
          </div>
        </div>
      </div>
      <MessageBox data={list} setList={setList} />
    </>
  );
}

export default Contact;
