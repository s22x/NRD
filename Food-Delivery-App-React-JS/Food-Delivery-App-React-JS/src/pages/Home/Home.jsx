import { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
// import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import { ClipLoader } from "react-spinners"; // Import the spinner component

import {
  useGetFoodListQuery,
  useLazyGetFoodsByCategoryQuery,
  useGetCartListQuery,
} from "../../redux/api/food";
import Hotels from "../../components/Hotels/Hotels";
import { menu_list } from "../../assets/assets";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { data: foodList, isFetching: isFoodListLoading } = useGetFoodListQuery();

  const [fetchFoodByCatgory, { data: foodByCatgory, isFetching: isCategoryLoading }] =
  useLazyGetFoodsByCategoryQuery();


  const [hotel, setHotel] = useState("All");

  const { data: cartList } = useGetCartListQuery();
  console.log(foodList, "foodListtt");

  let data

  useEffect(() => {
    if (cartList?.cart_items?.length > 0) {
      localStorage.setItem("isCart", "1");
    }
    if (cartList?.cart_items?.length === 0) {
      localStorage.setItem("isCart", "0");
    }
  }, [cartList]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    if (category !== "All") {
      fetchFoodByCatgory(category).then((res) => {
        console.log(res, "foodByCatgory");
        setIsLoading(false); // End loading

      });
    }else {
      setIsLoading(false); // End loading for default
    }
  }, [category]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    if (hotel !== "All") {
      console.log(hotel, "item11");
      const category = menu_list
        .filter((item) => item.hotel === hotel)
        .map((item) => item.menu_name);
      console.log(category, "item11");

      let url = "";
      category.forEach((item, index) => {
        if (index === 0) {
          url += item;
        } else {
          url += `&category=${item}`;
        }
      });
      fetchFoodByCatgory(url).then((res) => {
        console.log(res, "foodByCatgory");
        setIsLoading(false); // End loading

      });
    }else{
      setIsLoading(false); // End loading for default
    }
  }, [hotel]);

   data =
    (foodByCatgory && category !== "All") 
      ? foodByCatgory
      : foodList;
    console.log(hotel,"hotelsssssssss")  
      if(hotel !== "All"){
        data=foodByCatgory
      }
  return (
    <div>
      <Header />
      <Hotels hotel={hotel} setHotel={setHotel} />
      <ExploreMenu
        category={category}
        setCategory={setCategory}
        hotel={hotel}
      />
         {(isLoading || isFoodListLoading || isCategoryLoading) && (
        <div className="loader-container">
          <ClipLoader color="#3498db" size={50} /> {/* Spinner in center */}
        </div>
      )}
      {!isLoading && !isFoodListLoading && !isCategoryLoading && (
        <FoodDisplay category={category} foodItems={data} />
      )}
    </div>
  );
};

export default Home;
