import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormatMoney from "../../components/FormatMoney";
import MessageBox from "../../components/MessageBox";
import { uid } from "uid";
import { useAuth } from "../user/AuthContext";
import { child, onValue, ref, remove, set } from "firebase/database";
import { database } from "../../firebase";

export default function ProductItem({ data }) {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();
  const history = useNavigate();
  const dbRef = ref(database);
  let toastProperties = null;

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

  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Th??ng b??o",
          message: "Th??m th??nh c??ng",
          type: "success",
        };
        break;
      case "error":
        toastProperties = {
          id: list.length + 1,
          title: "Th??ng b??o",
          message: "B???n ph???i ????ng nh???p ????? s??? d???ng d???ch v???",
          type: "error",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };
  return (
    <div className="product__container--items">
      <div className="product__item">
        <Link
          to={`/sanpham/${data.id}`}
          state={{ data: data }}
          className="link"
        >
          <img className="product__img" src={data.image} alt="" />
          <h3>{data.name}</h3>
        </Link>
        <h2>
          <FormatMoney money={data.price} />
        </h2>
        <div className="form-button">
          <button className="btn-buy" onClick={() => addCart(data, 0)}>
            <i>Mua ngay</i>
          </button>
          <button className="btn-add" onClick={() => addCart(data, 1)}>
            <i>Th??m v??o gi??? h??ng</i>
          </button>
        </div>
      </div>
      <MessageBox data={list} setList={setList} />
    </div>
  );
}
