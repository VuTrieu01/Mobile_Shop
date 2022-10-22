import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { child, onValue, ref, set, update } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import Iphone from "../../assets/images/apple.png";
import Oppo from "../../assets/images/oppo.png";
import Sony from "../../assets/images/sony.png";
import Microsoft from "../../assets/images/microsoft.png";
import Samsung from "../../assets/images/samsung.png";
import logo from "../../assets/images/logo.png";

function DetailProduct() {
  const location = useLocation();
  const data = location.state?.data;

  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);

  const dbRef = ref(database);
  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `/${currentUser.uid}`), (snapshot) => {
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

  // function equar(a, b) {
  //   console.log(a, b);
  //   for (let i = 0; i < a.length; i++) {
  //     if (a[i] !== b) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }
  // var s = equar(
  //   product.map((item) => item.id),
  //   data.id
  // );
  // console.log(s);
  function equar(a, b) {
    console.log(a, b);
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b) {
        return false;
      }
    }
    return true;
  }
  var s = equar(2, 2);

  console.log(s); //  false

  const addCart = () => {
    const uuid = uid();
    if (product.length === 0) {
      set(ref(database, `/${currentUser.uid}` + `/${uuid}`), {
        id: data.id,
        image: data.image,
        name: data.name,
        quantity: 1,
        price: data.price,
        uuid,
      })
        .then(() => {
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      product.map((item) =>
        item.id !== data.id
          ? set(ref(database, `/${currentUser.uid}` + `/${uuid}`), {
              id: data.id,
              image: data.image,
              name: data.name,
              quantity: 1,
              price: data.price,
              uuid,
            })
              .then(() => {
                console.log("Data saved successfully!");
              })
              .catch((error) => {
                console.log(error);
              })
          : update(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`), {
              quantity: item.quantity + 1,
            })
      );
    }
  };

  return (
    <>
      <div className="route_detail">
        <h6>Home / Tất cả sản phẩm / Điện thoại</h6>
      </div>
      <form>
        <div className="containerd">
          <div className="containerd__img">
            <img src={data.image} alt=""></img>
          </div>
          <div className="containerd__detail">
            <h2>{data.name}</h2>
            <h3>Giá bán: {data.price}đ</h3>
            <p>{data.desc2}</p>
            <p>{data.desc1}</p>
            <p>{data.desc4}</p>
            <p>{data.desc6}</p>
            <p>{data.desc7}</p>
            <p>{data.desc8}</p>
            <p>{data.desc9}</p>
            <p>{data.desc10}</p>
            <p>{data.desc5}</p>
            <button type="button" className="btn-add" onClick={addCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </form>
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

export default DetailProduct;
