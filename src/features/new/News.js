import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../firebase";

function News() {
  const [New, setNew] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `New`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNew(snapshot.val());
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
      <div className="new">
        <h1>Tiêu đề danh mục</h1>
        <div className="new__container">
          {New.map((item) => (
            <div className="new__container--item" key={item.id}>
              <Link
                to={`/tintuc/${item.id}`}
                state={{ data: item }}
                className="link"
              >
                <div className="new-img">
                  <img src={item.img} alt=""></img>
                </div>
                <div className="new-title">
                  <h2>{item.title}</h2>
                </div>
              </Link>
              <div className="new-desc">
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default News;
