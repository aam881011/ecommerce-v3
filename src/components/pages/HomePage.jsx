import React from "react";
import MainSlider from "./../MainSlider/MainSlider";
import CategorieSlider from "./../CategorieSlider/CategorieSlider";
import Products from "../Products/Products";

export default function HomePage() {
  return (
    <>
      <MainSlider />
      <CategorieSlider />
      <Products />
    </>
  );
}
