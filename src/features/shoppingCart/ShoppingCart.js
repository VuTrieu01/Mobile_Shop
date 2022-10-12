import React from "react";

export default function ShoppingCart() {
  return (
    <div className="cart">
      <div className="cart__fields">
        <h2>THÔNG TIN GIỎ HÀNG</h2>
        <div className="cart__fields--tb">
          <table>
            <tr>
              <th colSpan={2}>Thông tin sản phẩm</th>
              <th>Số lượng</th>
              <th>Tiền</th>
              <th>Công cụ</th>
            </tr>
            <tr>
              <td>hình</td>
              <td>tên</td>
              <td>
                <input type="number" name="quantity" min="1" max="10" />
              </td>
              <td>
                <p>50000đ</p>
              </td>
              <td>
                <button>Xóa</button>
              </td>
            </tr>
            <tr>
              <td>hình</td>
              <td>tên</td>
              <td>
                <input type="number" name="quantity" min="1" max="10" />
              </td>
              <td>
                <p>50000đ</p>
              </td>
              <td>
                <button>Xóa</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="cart__fields--item">
          <div>Tổng tiền: 50000đ</div>
          <div>Xóa tất cả sản phẩm trong Giỏ hàng</div>
          <button>TIẾN HÀNH ĐẶT HÀNG NGAY</button>
        </div>
      </div>
    </div>
  );
}
