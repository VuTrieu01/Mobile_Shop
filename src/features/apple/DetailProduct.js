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
  // const DecreaseQuantity = (item) => {
  //   if (item.quantity === 1) {
  //     remove(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`));
  //   } else {
  //     update(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`), {
  //       quantity: item.quantity - 1,
  //     });
  //   }
  // };
  const [product, setProduct] = useState([]);

  const dbRef = ref(database);
  useEffect(() => {
    onValue(child(dbRef, `/${currentUser.uid}`), (snapshot) => {
      setProduct([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setProduct((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);

  const addCart = () => {
    const uuid = uid();
    if (product.length === 0) {
      set(ref(database, `/${currentUser.uid}` + `/${uuid}`), {
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
      product.map((item) => {
        if (item.name === data.name) {
          update(child(dbRef, `/${currentUser.uid}` + `/${item.uuid}`), {
            quantity: item.quantity + 1,
          });
        } else {
          set(ref(database, `/${currentUser.uid}` + `/${uuid}`), {
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
        }
      });
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
