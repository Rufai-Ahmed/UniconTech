"use client";
import Slider from "react-slick";
import React, { Component, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
  time: string;
  heading: string;
  heading2: string;
  date: string;
  imgSrc: string;
  name: string;
  description: string;
}

const postData: DataType[] = [
  {
    time: "3 min",
    heading: "Unicon Launches",
    heading2: "New Web Design Service",
    name: "Published on Unicon Blog",
    date: "June 15, 2023",
    imgSrc: "/images/articles/article.png",
    description:
      "Discover Unicon's latest web design service, offering cutting-edge solutions for businesses looking to establish a strong online presence.",
  },
  {
    time: "4 min",
    heading: "Mobile App Development:",
    heading2: "We Build Mobile Apps",
    name: "Published on Unicon Blog",
    date: "July 22, 2023",
    imgSrc: "/images/articles/article2.png",
    description:
      "Discover how Unicon's expert mobile app development team creates innovative and user-friendly applications for businesses across various industries.",
  },
  {
    time: "5 min",
    heading: "Website Development:",
    heading2: "We Build Websites",
    name: "Published on Unicon Blog",
    date: "August 10, 2023",
    imgSrc: "/images/articles/article3.png",
    description:
      "Explore Unicon's website development services, showcasing our ability to create responsive, modern, and high-performing websites tailored to our clients' needs.",
  },
  {
    time: "5 min",
    heading: "Tech Training:",
    heading2: "Empowering Future Developers",
    name: "Published on Unicon Blog",
    date: "August 10, 2023",
    imgSrc: "/images/articles/article3.png",
    description:
      "Learn about Unicon's comprehensive tech training programs and how they're shaping the next generation of IT professionals.",
  },
  // Add more data as needed...
];

// CAROUSEL COMPONENT
export default class MultipleItems extends Component {
  state = {
    showModal: false,
    currentDescription: "",
  };

  handleModal = (description: string) => {
    this.setState({ showModal: true, currentDescription: description });
  };

  closeModal = () => {
    this.setState({ showModal: false, currentDescription: "" });
  };

  render() {
    const { showModal, currentDescription } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      arrows: false,
      autoplay: false,
      speed: 500,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
      ],
    };

    return (
      <div className="bg-lightgrey py-20" id="blog-section">
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-blue text-lg font-normal tracking-widest">
              ARTICLES
            </h3>
            <h3 className="text-4xl sm:text-6xl font-bold">Our latest post.</h3>
          </div>

          <Slider {...settings}>
            {postData.map((items, i) => (
              <div key={i}>
                <div className="bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-3xl relative">
                  <Image
                    src={items.imgSrc}
                    alt="article"
                    width={389}
                    height={262}
                    className="inline-block m-auto"
                  />

                  <button
                    onClick={() => this.handleModal(items.description)}
                    className="absolute bg-blue text-white hover:bg-black hover:shadow-xl py-3 px-6 rounded-full article-img"
                  >
                    {items.time} read
                  </button>

                  <h4 className="text-2xl font-bold pt-6 text-black">
                    {items.heading}
                  </h4>
                  <h4 className="text-2xl font-bold pt-1 text-black">
                    {items.heading2}
                  </h4>

                  <div>
                    <h3 className="text-base font-normal pt-6 pb-2 opacity-75">
                      {items.name}
                    </h3>
                    <h3 className="text-base font-normal pb-1 opacity-75">
                      {items.date}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h3 className="text-xl font-semibold mb-4">Article Preview</h3>
                <p className="mb-4">{currentDescription}</p>
                <button
                  onClick={this.closeModal}
                  className="bg-blue text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
