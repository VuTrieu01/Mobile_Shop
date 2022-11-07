export default function FormatMoney({ money }) {
  return money.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}
