import * as React from "react";
import { child, ref, get } from "firebase/database";
import Trend1 from "../../assets/images/trend1.png";
import Trend2 from "../../assets/images/trend2.png";
import Trend3 from "../../assets/images/trend3.png";
import { BiRocket } from "react-icons/bi";
import { BiCycling } from "react-icons/bi";
import { AiOutlineGift, AiOutlineMail } from "react-icons/ai";
import { BsCartPlus, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import Iphone from "../../assets/images/apple.png";
import Oppo from "../../assets/images/oppo.png";
import Sony from "../../assets/images/sony.png";
import Microsoft from "../../assets/images/microsoft.png";
import Samsung from "../../assets/images/samsung.png";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [apple, setApple] = useState([]);
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `ProductHome`))
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
      <div className="home">
        <div className="home__info">
          <div className="home__info--item">
            <div className="home-icon">
              <span>
                <BiRocket size={50} />
              </span>
            </div>
            <div className="home-prop">
              <h6>Giao hàng miễn phí</h6>
              <p>Áp dụng cho đơn hàng trên 500.000đ tại Hà Nội và TP. HCM</p>
            </div>
          </div>
          <div className="home__info--item">
            <div className="home-icon">
              <span>
                <AiOutlineGift size={50} />
              </span>
            </div>
            <div className="home-prop">
              <h6>Tri ân khách hàng</h6>
              <p>Ưu đãi cực lớn, giảm thêm 10% cho khách hàng thân thiết</p>
            </div>
          </div>
          <div className="home__info--item">
            <div className="home-icon">
              <span>
                <BiCycling size={50} />
              </span>
            </div>
            <div className="home-prop">
              <h6>Đổi trả trong 30 ngày</h6>
              <p>Dịch vụ đổi trả, hoàn tiền nhanh chóng với tất cả sản phẩm</p>
            </div>
          </div>
        </div>

        <h1>ĐIỆN THOẠI</h1>
        <div className="home__product">
          {apple.map((item, index) => (
            <div className="home__product--item" key={index}>
              <div className="home__product--img">
                <img src={item.image} alt=""></img>
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
                <button className="btn-add">
                  <span>
                    <BsCartPlus size={20} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <h1>XU HƯỚNG MỚI</h1>
        <div className="home__trend">
          <div className="home__trend--item">
            <div className="trend__img">
              <img src={Trend1} alt=""></img>
            </div>
            <div className="trend__desc">
              <h6>Apple và một số máy khác được cập nhật IOS</h6>
              <p>
                Apple 3 đã bắt đầu được cập nhật IOS thông qua giao thức OTA, và
                hiện người dùng tại Trung Quốc đã có thể tải về cài đặt.
              </p>
            </div>
          </div>

          <div className="home__trend--item">
            <div className="trend__img">
              <img src={Trend3} alt=""></img>
            </div>
            <div className="trend__desc">
              <h6>Apple 8 sẽ có bản cập nhật IOS 9 Pie vào ngày 11/12</h6>
              <p>
                Dọn dẹp bộ nhớ trống, bản cập nhật có dung lượng thông thường
                lớn hơn 1GB. Sạc đầy pin để quá trình cập nhật diễn ra nhanh
                chóng, nhớ sạc pin trên 60%.
              </p>
            </div>
          </div>

          <div className="home__trend--item">
            <div className="trend__img">
              <img src={Trend2} alt=""></img>
            </div>
            <div className="trend__desc">
              <h6>Smartphone tai thỏ Apple C1 tiếp tục được giảm giá tốt</h6>
              <p>
                Mẫu smartphone giá rẻ với thiết kế hiện đại, trẻ trung cùng
                camera kép Apple C1 mới đây tiếp tục được giảm giá, cơ hội tốt
                để nhiều bạn trẻ dễ dàng sở hữu máy hơn.
              </p>
            </div>
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
