import React, { useCallback } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdClose, IoIosAlert } from "react-icons/io";

export default function MessageBox({ data, setList }) {
  const icons = {
    success: <BsFillCheckCircleFill />,
    error: <IoIosAlert />,
  };

  const deleteToast = useCallback(
    (id) => {
      const tostList = data.filter((e) => e.id !== id);
      setList(tostList);
    },
    [data, data]
  );

  return (
    <>
      {data.map((item) => (
        <div className={`toast toast--${item.type}`} key={item.id}>
          <div className="toast__icon">{icons[item.type]}</div>

          <div className="toast__body">
            <h3 className="toast__body--title">{item.title}</h3>
            <p className="toast__body--msg">{item.message}</p>
          </div>

          <div className="toast__close">
            <IoMdClose onClick={() => deleteToast(item.id)} />
          </div>
        </div>
      ))}
    </>
  );
}
