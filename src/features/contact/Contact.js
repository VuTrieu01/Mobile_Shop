import React from "react";
import { BiMap } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

function Contact() {
  return (
    <>
      <div className="contact">
        <form>
          <div className="contact__form">
            <h3>Gửi liên hệ cho chúng tôi</h3>
            <h5>
              Để lại thông tin cần hỗ trợ của bạn, chúng tôi sẽ liên lạc lại
            </h5>
            <input type="text" name="name" placeholder="Tên của bạn..." />
            <input type="text" name="phone" placeholder="Số điện thoại..." />
            <input type="text" name="email" placeholder="Email..." />
            <label>Nội dung liên hệ</label>
            <textarea type="text" rows="9" cols="40" />
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="contact__detail">
          <h3>Cửa hàng điện thoại Iphone</h3>
          <div className="contact__detail--item">
            <BiMap size={20} />
            <h6>Địa chỉ:</h6>
            <span>Ho Guom Plaza, 120 Tran Phu, Ha Đong, Ha Noi</span>
          </div>
          <div className="contact__detail--item">
            <FiClock size={20} />
            <h6>Giờ mở cửa: </h6>
            <span>8:00-21:00 MON-SUN</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlineMail size={20} />
            <h6>Số điện thoại: </h6>
            <span>0912333666</span>
          </div>

          <div className="contact__detail--item">
            <AiOutlinePhone size={20} />
            <h6>Email:</h6>
            <span>info.namviettech@gmail.com</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
