import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { child, onValue, ref, remove, set } from "firebase/database";
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

  const addCart = () => {
    const uuid = uid();
    product.length === 0
      ? set(ref(database, `/${currentUser.uid}` + `/cart` + `/${uuid}`), {
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
      : product.map((item) =>
          item.id !== data.id ? (
            set(ref(database, `/${currentUser.uid}` + `/cart` + `/${uuid}`), {
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
    </>
  );
}

export default DetailProduct;
