import React from "react";
import { useLocation } from "react-router-dom";
import { ref, set } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import { database } from "../../firebase";

function DetailProduct() {
  const location = useLocation();
  const data = location.state?.data;

  const { currentUser } = useAuth();

  const addCart = () => {
    const uuid = uid();
    set(ref(database, `/${currentUser.uid}` + `/${uuid}`), {
      image: data.image,
      name: data.name,
      quantity: 1,
      price: data.price,
    })
      .then(() => {
        console.log("Data saved successfully!");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
