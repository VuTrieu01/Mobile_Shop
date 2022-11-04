import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { child, onValue, ref, remove, set } from "firebase/database";
import { useAuth } from "../user/AuthContext";
import { uid } from "uid";
import { database } from "../../firebase";
import MessageBox from "../../components/MessageBox";
import FormatMoney from "../../components/FormatMoney";

function DetailProduct() {
  const showType = (type) => {
    switch (type) {
      case "phone":
        return "Điện thoại";
      case "laptop":
        return "Laptop";
      case "headphone":
        return "Tai nghe";
      case "watch":
        return "Watch";
      case "charger":
        return "Thiết bị sạc";
      case "phoneCase":
        return "Ốp lưng";
      case "ipad":
        return "iPad";
      default:
        return "Null";
    }
  };
  const location = useLocation();
  const data = location.state?.data;
  const history = useNavigate();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState([]);
  const [linkProduct, setLinkProduct] = useState(showType(data.type));
  const [list, setList] = useState([]);
  let toastProperties = null;

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

  const dbRef = ref(database);
  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `Cart` + `/${currentUser.uid}`), (snapshot) => {
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
    if (currentUser !== null) {
      product.length === 0
        ? set(ref(database, `Cart` + `/${currentUser.uid}` + `/${uuid}`), {
            id: data.id,
            image: data.image,
            name: data.name,
            quantity: 1,
            price: data.price,
            uuid,
          })
            .then(() => {
              showToast("success");
            })
            .catch((error) => {
              console.log(error);
            })
        : product.map((item) =>
            item.id !== data.id ? (
              set(ref(database, `Cart` + `/${currentUser.uid}` + `/${uuid}`), {
                id: data.id,
                image: data.image,
                name: data.name,
                quantity: 1,
                price: data.price,
                uuid,
              })
                .then(() => {
                  showToast("success");
                })
                .catch((error) => {
                  console.log(error);
                })
            ) : product.length === 1 ? (
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
      <div className="route">
        <span className="route__link" onClick={() => history("/")}>
          Home
        </span>
        <span> / </span>

        <span className="route__link" onClick={() => history("/sanpham")}>
          Tất cả sản phẩm
        </span>
        <span> / </span>
        <span
          className="route__link"
          onClick={() => history("/sanpham", { state: { data: linkProduct } })}
        >
          {linkProduct}
        </span>
      </div>
      <form>
        <div className="containerd">
          <div className="containerd__img">
            <img src={data.image} alt=""></img>
          </div>
          <div className="containerd__detail">
            <h2>{data.name}</h2>
            <h3>
              Giá bán: <FormatMoney money={data.price} />
            </h3>
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
      <MessageBox data={list} setList={setList} />
    </>
  );
}

export default DetailProduct;
