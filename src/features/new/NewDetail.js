import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../firebase";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import Iphone from "../../assets/images/apple.png";
import Oppo from "../../assets/images/oppo.png";
import Sony from "../../assets/images/sony.png";
import Microsoft from "../../assets/images/microsoft.png";
import Samsung from "../../assets/images/samsung.png";
import logo from "../../assets/images/logo.png";

function NewDetail() {
  const location = useLocation();
  const dataNew = location.state?.data;
  const [newDetail, setNewDetail] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `New`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNewDetail(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="newdetail">
        <div className="newdetail__content">
          <h1>{dataNew.title}</h1>
          <p>{dataNew.descdetail}</p>
        </div>
        <div className="newdetail__link">
          {newDetail.map((item) => (
            <div className="newdetail__link_item" key={item.id}>
              <img src={item.img} alt="" />
              <Link
                to={`/tintuc/${item.id}`}
                state={{ data: item }}
                className="link"
              >
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="footer__icon">
          <div className="footer__icon--image">
            <img src={Iphone} alt=""></img>
          </div>
          <div className="footer__icon--image">
            <img src={Oppo} alt=""></img>
          </div>
          <div className="footer__icon--image">
            <img src={Samsung} alt=""></img>
          </div>
          <div className="footer__icon--image">
            <img src={Sony} alt=""></img>
          </div>
          <div className="footer__icon--image">
            <img src={Microsoft} alt=""></img>
          </div>
        </div>
        <div className="footer__info">
          <div className="footer__info--contact">
            <div className="footer__info--contact--link">
              <img src={logo} alt=""></img>
              <ul>
                <li>Hà Đông, Hà Nội</li>
                <li>0942.132.121</li>
                <li>info.namviettech@gmail.com</li>
              </ul>
            </div>
            <div className="footer__info--contact--desc">
              <h3>Thông tin</h3>
              <ul>
                <Link to="/trangchu" className="link">
                  <li>Trang chủ</li>
                </Link>
                <Link to="/gioithieu" className="link">
                  <li>Giới thiệu</li>
                </Link>
                <Link to="/sanpham" className="link">
                  <li>Sản phẩm</li>
                </Link>
                <Link to="/tintuc" className="link">
                  <li>Tin tức</li>
                </Link>
                <Link to="/lienhe" className="link">
                  <li>TLiên hệ</li>
                </Link>
              </ul>
            </div>
            <div className="footer__info--contact--connect">
              <h3>Kết nối với chúng tôi</h3>
              <div className="footer__info--contact--connect--icon">
                <span>
                  <BsFacebook size={25} />
                </span>
                <span>
                  <BsInstagram size={25} />
                </span>
                <span>
                  <BsTwitter size={25} />
                </span>
                <span>
                  <AiOutlineMail size={25} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewDetail;
