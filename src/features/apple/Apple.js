import * as React from "react";
import banner from "../../assets/images/banner.webp";
import { Link } from "react-router-dom";
import { MdPhoneIphone, MdLaptopChromebook } from "react-icons/md";
import {
  BsSmartwatch,
  BsFillMouseFill,
  BsFillKeyboardFill,
  BsFacebook,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FiHeadphones, FiSmartphone } from "react-icons/fi";
import { RiMacLine, RiMacbookFill } from "react-icons/ri";
import { GiCharging } from "react-icons/gi";
import { CgScreen } from "react-icons/cg";
import { database } from "../../firebase";
import { useState } from "react";
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import Iphone from "../../assets/images/apple.png";
import Oppo from "../../assets/images/oppo.png";
import Sony from "../../assets/images/sony.png";
import Microsoft from "../../assets/images/microsoft.png";
import Samsung from "../../assets/images/samsung.png";
import logo from "../../assets/images/logo.png";

export default function Apple() {
  const [apple, setApple] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `Products`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setApple(snapshot.val());
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
      <div className="container">
        <div className="container__banner">
          <Link to="/">
            <img src={banner} alt=""></img>
          </Link>
        </div>
        <h1>Sản phẩm Apple</h1>
        <div className="container__box">
          <div className="container__box--item">
            <div className="item">
              <MdPhoneIphone size={75} />
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <MdLaptopChromebook size={75} />
            </div>
            <span>Laptop</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <FiHeadphones size={75} />
            </div>
            <span>Tai nghe</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsSmartwatch size={75} />
            </div>
            <span>Watch</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <RiMacLine size={75} />
            </div>
            <span>MacBook</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <RiMacLine size={75} />
            </div>
            <span>IMac</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <GiCharging size={75} />
            </div>
            <span>Thiết bị sạc</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <FiSmartphone size={75} />
            </div>
            <span>Ốp lưng</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <RiMacbookFill size={75} />
            </div>
            <span>iPad</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <CgScreen size={75} />
            </div>
            <span>Màn hình</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillMouseFill size={75} />
            </div>
            <span>Chuột</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillKeyboardFill size={75} />
            </div>
            <span>Bàn phím</span>
          </div>
          <div className="container__box--item"></div>
        </div>
      </div>
      <div className="route">
        <h6>Home / Tất cả sản phẩm</h6>
      </div>
      <div className="title">
        <h1>Danh mục sản phẩm</h1>
      </div>
      <div className="product__container">
        {apple.map((item, index) => (
          <div className="product__container--items" key={index}>
            <div className="product__item" key={item.id}>
              <Link
                to={`/sanpham/${item.id}`}
                state={{ data: item }}
                className="link"
              >
                <img className="product__img" src={item.image} alt="" />
                <h3>{item.name}</h3>
              </Link>
              <h2>{item.price} đ</h2>
              <div className="form-button">
                <button className="btn-buy">
                  <i>Mua ngay</i>
                </button>
                <button className="btn-add">
                  <i>Thêm vào giỏ hàng</i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-form">
        <div className="btn-more">
          <Link to={`/sanpham2`} className="link">
            <button type="">Next</button>
          </Link>
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
                <Link
                  to="/trangchu"
                  className="footer__info--contact--desc--link"
                >
                  <li>Trang chủ</li>
                </Link>
                <Link to="/gioithieu">
                  <li>Giới thiệu</li>
                </Link>
                <Link to="/sanpham">
                  <li>Sản phẩm</li>
                </Link>
                <Link to="/tintuc">
                  <li>Tin tức</li>
                </Link>
                <Link to="/lienhe">
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
