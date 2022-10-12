import * as React from "react";
import { Link } from "react-router-dom";

import Img1 from "../../assets/images/ipad.webp";
import { BiRocket } from "react-icons/bi";
import { BiCycling } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";

export default function Home() {
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
      </div>
    </>
  );
}
