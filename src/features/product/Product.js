import * as React from "react";
import banner from "../../assets/images/banner.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdPhoneIphone, MdLaptopChromebook } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { FiHeadphones, FiSmartphone } from "react-icons/fi";
import { RiMacbookFill } from "react-icons/ri";
import { GiCharging } from "react-icons/gi";
import { database } from "../../firebase";
import { useState, useEffect } from "react";
import { child, get, ref } from "firebase/database";
import ReactPaginate from "react-paginate";
import ProductItem from "./ProductItem";

export default function Products() {
  const location = useLocation();
  const dataType = location.state ? location.state.dataType : null;
  const dataLinkProduct = location.state
    ? location.state.dataLinkProduct
    : null;
  const [product, setProduct] = useState([]);
  const dbRef = ref(database);
  const [type, setType] = useState(dataType);
  const [linkProduct, setLinkProduct] = useState(dataLinkProduct);
  const [pageNumber, setPageNumber] = useState(0);
  const history = useNavigate();
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;
  const selected = { selected: 0 };

  const MENU_LIST = [
    {
      icon: <MdPhoneIphone size={75} />,
      name: "Điện thoại",
      type: "phone",
    },
    {
      icon: <MdLaptopChromebook size={75} />,
      name: "Laptop",
      type: "laptop",
    },
    {
      icon: <FiHeadphones size={75} />,
      name: "Tai nghe",
      type: "headphone",
    },
    {
      icon: <BsSmartwatch size={75} />,
      name: "Watch",
      type: "watch",
    },
    {
      icon: <GiCharging size={75} />,
      name: "Thiết bị sạc",
      type: "charger",
    },
    {
      icon: <FiSmartphone size={75} />,
      name: "Ốp lưng",
      type: "phoneCase",
    },
    {
      icon: <RiMacbookFill size={75} />,
      name: "iPad",
      type: "ipad",
    },
    // {
    //   icon: <CgScreen size={75} />,
    //   name: "Màn hình",
    //   type: "screen",
    // },
    // {
    //   icon: <BsFillMouseFill size={75} />,
    //   name: "Chuột",
    //   type: "mouse",
    // },
    // {
    //   icon: <BsFillKeyboardFill size={75} />,
    //   name: "Bàn phím",
    //   type: "keyboard",
    // },
  ];

  useEffect(() => {
    get(child(dbRef, `Products`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const displayProducts = type
    ? product
        .filter((tp) => tp.type === type)
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((item) => <ProductItem data={item} />)
    : product
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((item) => <ProductItem data={item} />);

  const pageCount = Math.ceil(
    type
      ? product.filter((tp) => tp.type === type).length / productsPerPage
      : product.length / productsPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleSubmitType = (type, name) => {
    setType(type);
    changePage(selected);
    setLinkProduct(name);
  };
  const handleChangeAllProducts = () => {
    setType();
    changePage(selected);
    setLinkProduct();
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
          {MENU_LIST.map((item, index) => (
            <div
              key={index}
              className="container__box--item"
              onClick={() => handleSubmitType(item.type, item.name)}
            >
              <div className="item">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="route">
        <span className="route__link" onClick={() => history("/")}>
          Home
        </span>
        <span> / </span>
        {linkProduct ? (
          <>
            <span className="route__link" onClick={handleChangeAllProducts}>
              Tất cả sản phẩm
            </span>
            <span> / </span>
            <span>{linkProduct}</span>
          </>
        ) : (
          <span>Tất cả sản phẩm</span>
        )}
      </div>
      <div className="product__container">{displayProducts}</div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        forcePage={pageNumber}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtn"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}
