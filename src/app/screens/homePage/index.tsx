import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDishesRetriever = createSelector(
  retrievePopularDishes, (popularDishes) => ({ popularDishes })
);

export default function HomePage()
{
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  // Selecor: Store => Store
  
  useEffect(() =>
  {
    /** // Backend server data request => Data
    const result = [
      {
        "_id": "677fc48fbaa44537ca1e9580",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "shashlik",
        "productPrice": 12,
        "productLeftCount": 12,
        "productSize": "NORMAL",
        "productVolume": "1",
        "productDesc": "test",
        "productImages": [
          "uploads/products/76d88bc0-514b-4fa2-97f5-fbc0325c76ee.jpeg"
        ],
        "productViews": 0,
        "createdAt": "2025-01-09T12:43:59.406Z",
        "updatedAt": "2025-01-09T12:44:04.720Z",
        "__v": 0
      },
      {
        "_id": "677fb04f71ada56a97c5a808",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Kebab",
        "productPrice": 8,
        "productLeftCount": 90,
        "productSize": "NORMAL",
        "productVolume": "1",
        "productDesc": "Central Asian style Kebabs!",
        "productImages": [
          "uploads/products/4318ead2-a62a-4c3b-a678-ef3be6dcc0ab.jpeg",
          "uploads/products/f9921cf2-a7c2-4629-9f43-f616e3b01808.jpg",
          "uploads/products/96d4ecfd-53b1-468d-b5d1-bf9c5464f297.jpg",
          "uploads/products/a3979f33-afa3-4e62-8776-8f31085c417a.jpg"
        ],
        "productViews": 0,
        "createdAt": "2025-01-09T11:17:35.422Z",
        "updatedAt": "2025-01-09T11:17:35.422Z",
        "__v": 0
      }
    ];

    // Slice: Data => Store
    // @ts-ignore
    setPopularDishes(result); **/
  }, []);

  // console.log("popularDishes:", popularDishes);

    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes/>
      <NewDishes/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>;
  }