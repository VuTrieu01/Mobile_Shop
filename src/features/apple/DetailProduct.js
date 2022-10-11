import React from "react";
import { useLocation } from "react-router-dom";

function DetailProduct() {
  const location = useLocation();
  const data = location.state?.data;
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
