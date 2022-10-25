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
import { child, get, onValue, ref, remove, set } from "firebase/database";
import { useEffect } from "react";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import MessageBox from "../../components/MessageBox";

export default function Apple() {
  const [apple, setApple] = useState([]);

  const dbRef = ref(database);
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);
  const history = useNavigate();
  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = () => {
    toastProperties = {
      id: list.length + 1,
      title: "Thông báo",
      message: "Thêm thành công",
      type: "success",
    };
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
      onValue(child(dbRef, `/${currentUser.uid}` + `/cart`), (snapshot) => {
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

  const addCart = (itemCart, boolean) => {
    const uuid = uid();
    product.length === 0
      ? set(ref(database, `/${currentUser.uid}` + `/cart` + `/${uuid}`), {
          id: itemCart.id,
          image: itemCart.image,
          name: itemCart.name,
          quantity: 1,
          price: itemCart.price,
          uuid,
        })
          .then(() => {
            boolean === 0 ? history("/shoppingCart") : showToast();
          })
          .catch((error) => {
            console.log(error);
          })
      : product.map((item) =>
          item.id !== itemCart.id ? (
            set(ref(database, `/${currentUser.uid}` + `/cart` + `/${uuid}`), {
              id: itemCart.id,
              image: itemCart.image,
              name: itemCart.name,
              quantity: 1,
              price: itemCart.price,
              uuid,
            })
              .then(() => {
                boolean === 0 ? history("/shoppingCart") : showToast();
              })
              .catch((error) => {
                console.log(error);
              })
          ) : product.length === 1 ? (
            <></>
          ) : (
            remove(
              child(dbRef, `/${currentUser.uid}` + `/cart` + `/${item.uuid}`)
            )
          )
        );
  };

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
                <button className="btn-buy" onClick={() => addCart(item, 0)}>
                  <i>Mua ngay</i>
                </button>
                <button className="btn-add" onClick={() => addCart(item, 1)}>
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
      <MessageBox data={list} setList={setList} />
    </>
  );
}
