import { Slide } from "react-slideshow-image";


import "react-slideshow-image/dist/styles.css";

import img1 from "../assets/images/slide-img1.webp";
import img2 from "../assets/images/slide-img2.jpg";
import img3 from "../assets/images/slide-img3.webp";
import img4 from "../assets/images/slide-img4.webp";

const slideImages = [

  {
    url:img1,
    caption:"Slide1"
  },
  {
    url:img2,
    caption:"Slide2"
  },
  {
    url:img3,
    caption:"Slide3"
  },
  {
    url:img4,
    caption:"Slide4"
  }
];


export default function Slider() {
  return (
    <div className="container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="container__slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`}}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
  );
}