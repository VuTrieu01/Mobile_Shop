import React from "react";
// import { useParams } from "react-router-dom";
// import { child, get, ref } from "firebase/database";
// import { database } from "../../firebase";
// import { useState } from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function DetailProduct() {
  const location = useLocation();
  const data = location.state?.data;
  // const { productId } = useParams();
  // const thisProduct = apple.find((prod) => prod.id === productId);
  // const [apple, setApple] = useState([]);

  // const dbRef = ref(database);

  // useEffect(() => {
  //   get(child(dbRef, `Products`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setApple(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
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
            <p> {data.cam2}</p>
            <p> {data.ram}</p>
            <p>{data.type1}</p>
            <p>{data.type2}</p>
            <p>{data.type3}</p>
            <p>{data.type4}</p>
            <p>{data.pin}</p>
            <button className="btn-add">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default DetailProduct;
