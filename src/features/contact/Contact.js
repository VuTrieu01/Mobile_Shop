import React from "react";
import { BiMap } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import {
  BsSmartwatch,
  BsFillMouseFill,
  BsFillKeyboardFill,
  BsFacebook,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Iphone from "../../assets/images/apple.png";
import Oppo from "../../assets/images/oppo.png";
import Sony from "../../assets/images/sony.png";
import Microsoft from "../../assets/images/microsoft.png";
import Samsung from "../../assets/images/samsung.png";
import logo from "../../assets/images/logo.png";

function Contact() {
  return (
    <>
      <div className="contact">
        <form>
          <div className="contact__form">
            <h3>Gửi liên hệ cho chúng tôi</h3>
            <h5>
              Để lại thông tin cần hỗ trợ của bạn, chúng tôi sẽ liên lạc lại
            </h5>
            <input type="text" name="name" placeHolder="Tên của bạn..." />
            <input type="text" name="phone" placeHolder="Số điện thoại..." />
            <input type="text" name="email" placeHolder="Email..." />
            <label>Nội dung liên hệ</label>
            <textarea type="text" rows="9" cols="40" />
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="contact__detail">
          <h3>Cửa hàng điện thoại Iphone</h3>
          <div className="contact__detail--item">
            <BiMap size={20} />
            <h6>Địa chỉ:</h6>
            <span>Ho Guom Plaza, 120 Tran Phu, Ha Đong, Ha Noi</span>
          </div>
          <div className="contact__detail--item">
            <FiClock size={20} />
            <h6>Giờ mở cửa: </h6>
            <span>8:00-21:00 MON-SUN</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlineMail size={20} />
            <h6>Số điện thoại: </h6>
            <span>0912333666</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlinePhone size={20} />
            <h6>Email:</h6>
            <span>info.namviettech@gmail.com</span>
          </div>
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

export default Contact;
