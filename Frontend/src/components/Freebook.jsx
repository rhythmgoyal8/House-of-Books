import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Freebook() {
  const [book, setBook] = useState([]);

  const book1 = [
    {
      _id: "68c2b6c34341b3b3d86f29ab",
      id: 1,
      name: "George Orwell",
      title: "1984",
      price: 8.99,
      category: "Dystopian",
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    },
    {
      _id: "68c2b6c34341b3b3d86f29ac",
      id: 2,
      name: "Harper Lee",
      title: "To Kill a Mockingbird",
      price: 9.49,
      category: "Classic",
      image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    },
    {
      _id: "68c2b6c34341b3b3d86f29ad",
      id: 3,
      name: "J.K. Rowling",
      title: "Harry Potter and the Sorcerer's Stone",
      price: 10.99,
      category: "Fantasy",
      image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    },
  ];


  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/book`);

        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Discover our diverse selection of books available for free in our online bookstore. From J.K. Rowling's enchanting
            "Harry Potter and the Sorcerer's Stone" to George Orwell's thought-provoking "1984"
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {book1.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Freebook;
