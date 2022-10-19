import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../firebase";

function NewDetail() {
  const location = useLocation();
  const dataNew = location.state?.data;
  const [newDetail, setNewDetail] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `New`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNewDetail(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="newdetail">
        <div className="newdetail__content">
          <h1>{dataNew.title}</h1>
          <p>{dataNew.descdetail}</p>
        </div>
        <div className="newdetail__link">
          {newDetail.map((item) => (
            <div className="newdetail__link_item" key={item.id}>
              <img src={item.img} alt="" />
              <Link
                to={`/tintuc/${item.id}`}
                state={{ data: item }}
                className="link"
              >
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewDetail;
