import * as React from "react";
import { child, get, onValue, ref, remove, set } from "firebase/database";
import Trend1 from "../../assets/images/trend1.png";
import Trend2 from "../../assets/images/trend2.png";
import Trend3 from "../../assets/images/trend3.png";
import { BiRocket } from "react-icons/bi";
import { BiCycling } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import MessageBox from "../../components/MessageBox";
import FormatMoney from "../../components/FormatMoney";
import { Helmet } from "react-helmet";

export default function Home() {
  const [apple, setApple] = useState([]);
  const dbRef = ref(database);
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);
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
          message: "Bạn phải đăng nhập để sử dụng dịch vụ",
          type: "error",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

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

  const addCart = (itemCart) => {
    const uuid = uid();
    if (currentUser !== null) {
      product.length === 0
        ? set(ref(database, `Cart` + `/${currentUser.uid}` + `/${uuid}`), {
            id: itemCart.id,
            image: itemCart.image,
            name: itemCart.name,
            quantity: 1,
            price: itemCart.price,
            uuid,
          })
            .then(() => {
              showToast("success");
            })
            .catch((error) => {
              console.log(error);
            })
        : product.map((item) =>
            item.id !== itemCart.id ? (
              set(ref(database, `Cart` + `/${currentUser.uid}` + `/${uuid}`), {
                id: itemCart.id,
                image: itemCart.image,
                name: itemCart.name,
                quantity: 1,
                price: itemCart.price,
                uuid,
              })
                .then(() => {
                  showToast("success");
                })
                .catch((error) => {
                  console.log(error);
                })
            ) : product.length === 1 ? (
              <></>
            ) : (
              remove(
                child(dbRef, `Cart` + `/${currentUser.uid}` + `/${item.uuid}`)
              )
            )
          );
    } else {
      showToast("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>MOBIJ - Trang chủ</title>
      </Helmet>
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

        <h1>SẢN PHẨM NỔI BẬT</h1>
        <div className="home__product">
          {apple.slice(0, 10).map((item, index) => (
            <div className="home__product--item" key={index}>
              <div className="home__product--img">
                <img src={item.image} alt=""></img>
                <h2>{item.name}</h2>
                <h3>
                  <FormatMoney money={item.price} />
                </h3>
                <button className="btn-add" onClick={() => addCart(item)}>
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
      <MessageBox data={list} setList={setList} />
    </>
  );
}
