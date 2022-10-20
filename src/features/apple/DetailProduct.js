import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { child, onValue, ref, set, update } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import { database } from "../../firebase";

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
            <p>{data.cam1}</p>
            <p>{data.cam2}</p>
            <p>{data.ram}</p>
            <p>{data.type1}</p>
            <p>{data.type2}</p>
            <p>{data.type3}</p>
            <p>{data.type4}</p>
            <p>{data.pin}</p>
            <button type="button" className="btn-add" onClick={addCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default DetailProduct;
