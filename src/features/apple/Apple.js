import * as React from "react";
import img from "../../assets/images/sale-phone.webp";
import product from "../../assets/images/product1.webp";
import { Link } from "react-router-dom";
export default function Apple() {
  return (
    <>
      <div className="container">
        <h1>Sản phẩm Apple</h1>
        <div className="container__box">
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
          <div className="container__box--item">
            <div className="item">
              <Link to="/">
                <img className="img" src={img} alt="" />
              </Link>
            </div>
            <span>iPhone</span>
          </div>
        </div>
      </div>

      <div className="product__container">
        <div className="product__container--items">
          <div className="product__item">
            <Link to="/">
              <img className="product__img" src={product} alt="" />
            </Link>
            <span>iPhone14Promax</span>
            <div className="type">
              <button>128gb</button>
              <button>128gb</button>
              <button>128gb</button>
              <button>128gb</button>
            </div>
            <span>30.900.900</span>
            <div className="desc__item">
              <span>Apple 16 Bionic</span>
              <span>6.1 inch</span>
              <span>128 gb</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
