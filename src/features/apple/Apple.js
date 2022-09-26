import * as React from "react";
import product2 from "../../assets/images/product1.webp";
import banner from "../../assets/images/banner.webp";
import { Link } from "react-router-dom";
import { MdPhoneIphone, MdLaptopChromebook } from "react-icons/md";
import {
  BsSmartwatch,
  BsFillMouseFill,
  BsFillKeyboardFill,
} from "react-icons/bs";
import { FiHeadphones, FiSmartphone } from "react-icons/fi";
import { RiMacLine, RiMacbookFill } from "react-icons/ri";
import { GiCharging } from "react-icons/gi";
import { CgScreen } from "react-icons/cg";
import { database, ref } from "../../firebase";
import { useState, useEffect } from "react";
import { onValue } from "firebase/database";

export default function Apple() {
  const [apple, setApple] = useState([]);

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((apple) => {
          setApple((oldArray) => [...oldArray, apple]);
        });
      }
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="container__banner">
          <Link to="/">
            <img src={banner} alt=""></img>
          </Link>
        </div>
        <h1>Sản phẩm Apple</h1>
        <div className="container__box">
          <div className="container__box--item">
            <div className="item">
              <MdPhoneIphone size={75} />
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <MdLaptopChromebook size={75} />
            </div>
            <span>Laptop</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <FiHeadphones size={75} />
            </div>
            <span>Tai nghe</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsSmartwatch size={75} />
            </div>
            <span>Watch</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <RiMacLine size={75} />
            </div>
            <span>iMac</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <GiCharging size={75} />
            </div>
            <span>Thiết bị sạc</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <FiSmartphone size={75} />
            </div>
            <span>Ốp lưng</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <RiMacbookFill size={75} />
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <CgScreen size={75} />
            </div>
            <span>Mini Mac</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillMouseFill size={75} />
            </div>
            <span>Màn hình</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <BsFillKeyboardFill size={75} />
            </div>
            <span>Chuột</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <MdPhoneIphone size={75} />
            </div>
            <span>Bàn phím</span>
          </div>
        </div>
      </div>

      <div className="product__container">
        {apple.map((item, index) => (
          <div className="product__container--items" key={index}>
            {item.map((iApple) => (
              <div className="product__item" key={iApple.id}>
                <Link to="/">
                  <img className="product__img" src={iApple.image} alt="" />
                </Link>
                <h3>{iApple.name}</h3>
                <div className="type">
                  <button className="button__type active">128GB</button>
                  <button className="button__type">256GB</button>
                  <button className="button__type">512GB</button>
                  <button className="button__type">1TB</button>
                </div>
                <h2>{iApple.price} đ</h2>
                <div className="desc__item">
                  <span>Apple 16 Bionic |</span>
                  <span>6.1 inch |</span>
                  <span>128 gb</span>
                </div>
                <div className="form-button">
                  <button className="btn-buy">
                    <i>Mua ngay</i>
                  </button>
                  <button className="btn-compare">
                    <i>So sánh</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>

        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>

        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>
        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>

        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>
        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>
        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div>
        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product2} alt="" />
            </Link>
            <h3>iPhone 14 Promax</h3>
            <div className="type">
              <button className="button__type active">128GB</button>
              <button className="button__type">256GB</button>
              <button className="button__type">512GB</button>
              <button className="button__type">1TB</button>
            </div>
            <h2>30.900.900 đ</h2>
            <div className="desc__item">
              <span>Apple 16 Bionic |</span>
              <span>6.1 inch |</span>
              <span>128 gb</span>
            </div>
            <div className="form-button">
              <button className="btn-buy">
                <i>Mua ngay</i>
              </button>
              <button className="btn-compare">
                <i>So sánh</i>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
