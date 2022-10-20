import * as React from "react";
import banner from "../../assets/images/banner.webp";
import { Link } from "react-router-dom";
import { MdPhoneIphone, MdLaptopChromebook } from "react-icons/md";
import {
  BsSmartwatch,
  BsFillMouseFill,
  BsFillKeyboardFill,
} from "react-icons/bs";
import { FiHeadphones, FiSmartphone } from "react-icons/fi";
import { RiMacLine, RiMacbookFill } from "react-icons/ri";
import { GiCharging } from "react-icons/gi";
import { CgScreen } from "react-icons/cg";
import { database } from "../../firebase";
import { useState } from "react";
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";

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
            <span>iMac</span>
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
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <CgScreen size={75} />
            </div>
            <span>Mini Mac</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillMouseFill size={75} />
            </div>
            <span>Màn hình</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillKeyboardFill size={75} />
            </div>
            <span>Chuột</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <MdPhoneIphone size={75} />
            </div>
            <span>Bàn phím</span>
          </div>
        </div>
      </div>
      <div className="route">
        <h6>Home / Tất cả sản phẩm</h6>
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
    </>
  );
}
