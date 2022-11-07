import * as React from "react";
import banner from "../../assets/images/banner.webp";
import { Link } from "react-router-dom";
import { MdPhoneIphone, MdLaptopChromebook } from "react-icons/md";
import {
  BsSmartwatch,
  BsFillMouseFill,
  BsFillKeyboardFill,
} from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FiHeadphones, FiSmartphone } from "react-icons/fi";
import { RiMacbookFill } from "react-icons/ri";
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
import FormatMoney from "../../components/FormatMoney";
import ReactPaginate from "react-paginate";

export default function Apple() {
  const [apple, setApple] = useState([]);

  const dbRef = ref(database);
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const history = useNavigate();
  const [list, setList] = useState([]);
  const [type, setType] = useState();
  let toastProperties = null;

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = apple
    .filter((tp) => tp.type === type)
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item, index) => (
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
          <h2>
            <FormatMoney money={item.price} />
          </h2>
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
    ));

  const pageCount = Math.ceil(
    apple.filter((tp) => tp.type === type).length / productsPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
        setCart([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            setCart((oldArray) => [...oldArray, item]);
          });
        }
      })
    ) : (
      <></>
    );
  }, []);

  const addCart = (itemCart, boolean) => {
    const uuid = uid();
    if (currentUser !== null) {
      cart.length === 0
        ? set(ref(database, `Cart` + `/${currentUser.uid}` + `/${uuid}`), {
            id: itemCart.id,
            image: itemCart.image,
            name: itemCart.name,
            quantity: 1,
            price: itemCart.price,
            uuid,
          })
            .then(() => {
              boolean === 0 ? history("/shoppingCart") : showToast("success");
            })
            .catch((error) => {
              console.log(error);
            })
        : cart.map((item) =>
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
                  boolean === 0
                    ? history("/shoppingCart")
                    : showToast("success");
                })
                .catch((error) => {
                  console.log(error);
                })
            ) : cart.length === 1 ? (
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
      <div className="container">
        <div className="container__banner">
          <Link to="/">
            <img src={banner} alt=""></img>
          </Link>
        </div>
        <h1>Danh mục</h1>
        <div className="container__box">
          <div
            className="container__box--item"
            onClick={() => setType("phone")}
          >
            <div className="item">
              <MdPhoneIphone size={75} />
            </div>
            <span>Điện thoại</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("laptop")}
          >
            <div className="item">
              <MdLaptopChromebook size={75} />
            </div>
            <span>Laptop</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("headphone")}
          >
            <div className="item">
              <FiHeadphones size={75} />
            </div>
            <span>Tai nghe</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("watch")}
          >
            <div className="item">
              <BsSmartwatch size={75} />
            </div>
            <span>Watch</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("charger")}
          >
            <div className="item">
              <GiCharging size={75} />
            </div>
            <span>Thiết bị sạc</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("phoneCase")}
          >
            <div className="item">
              <FiSmartphone size={75} />
            </div>
            <span>Ốp lưng</span>
          </div>
          <div className="container__box--item" onClick={() => setType("ipad")}>
            <div className="item">
              <RiMacbookFill size={75} />
            </div>
            <span>iPad</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("screen")}
          >
            <div className="item">
              <CgScreen size={75} />
            </div>
            <span>Màn hình</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("mouse")}
          >
            <div className="item">
              <BsFillMouseFill size={75} />
            </div>
            <span>Chuột</span>
          </div>
          <div
            className="container__box--item"
            onClick={() => setType("keyboard")}
          >
            <div className="item">
              <BsFillKeyboardFill size={75} />
            </div>
            <span>Bàn phím</span>
          </div>
          <div className="container__box--item" onClick={() => setType("tv")}>
            <div className="item">
              <AiOutlineFundProjectionScreen size={75} />
            </div>
            <span>Tivi</span>
          </div>
          <div className="container__box--item" onClick={() => setType("imac")}>
            <div className="item">
              <MdLaptopChromebook size={75} />
            </div>
            <span>IMac</span>
          </div>
        </div>
      </div>
      <div className="route">
        <h6>Home / Tất cả sản phẩm</h6>
      </div>
      <div className="title">
        <h1>Sản phẩm</h1>
      </div>
      <div className="product__container">{displayProducts}</div>
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <MessageBox data={list} setList={setList} />
    </>
  );
}
