import React from "react";
import New1 from "../../assets/images/trend1.png";
import New2 from "../../assets/images/trend2.png";
import New3 from "../../assets/images/trend3.png";

function News() {
  return (
    <>
      <div className="new">
        <h1>Tiêu đề sản phẩm</h1>
        <div className="new__container">
          <div className="new__container--item">
            <div className="new-img">
              <img src={New1} alt=""></img>
            </div>
            <div className="new-title">
              <h2>NOKIA 8 SẼ CÓ BẢN CẬP NHẬT ANDROID 9 PIE VÀO NGÀY 11/12</h2>
            </div>
            <div className="new-desc">
              <p>
                Tin vui cho các bạn đang sử dụng Nokia 8, máy sẽ chính thức có
                bản cập nhật Android 9 Pie vào ngày 11/12, đây là thông báo mới
                cập từ trang Nokia Mobile. Trước đó thì bản cập n...
              </p>
            </div>
          </div>

          <div className="new__container--item">
            <div className="new-img">
              <img src={New3} alt=""></img>
            </div>
            <div className="new-title">
              <h2>SMARTPHONE TAI THỎ REALME C1 TIẾP TỤC ĐƯỢC GIẢM GIÁ TỐT</h2>
            </div>
            <div className="new-desc">
              <p>
                Mẫu smartphone giá rẻ với thiết kế hiện đại, trẻ trung cùng
                camera kép Realme C1 mới đây tiếp tục được giảm giá, cơ hội tốt
                để nhiều bạn trẻ dễ dàng sở hữu máy hơn. Theo đ...
              </p>
            </div>
          </div>

          <div className="new__container--item">
            <div className="new-img">
              <img src={New2} alt=""></img>
            </div>
            <div className="new-title">
              <h2>
                HUAWEI NOVA 3 VÀ MỘT SỐ MÁY NOVA KHÁC ĐƯỢC CẬP NHẬT ANDROID PIE
              </h2>
            </div>
            <div className="new-desc">
              <p>
                Huawei Nova 3 đã bắt đầu được cập nhật Android Pie thông qua
                giao thức OTA, và hiện người dùng tại Trung Quốc đã có thể tải
                về cài đặt. Việc nâng cấp không chỉ mang đến cho ng...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
