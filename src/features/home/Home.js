import * as React from "react";
import { child, ref, get } from "firebase/database";
import Trend1 from "../../assets/images/trend1.png";
import Trend2 from "../../assets/images/trend2.png";
import Trend3 from "../../assets/images/trend3.png";
import { BiRocket } from "react-icons/bi";
import { BiCycling } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { database } from "../../firebase";
import { useEffect, useState } from "react";

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
    </>
  );
}
