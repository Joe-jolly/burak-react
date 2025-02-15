import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
  
});
const ProductsRetriever = createSelector(
    retrieveProducts, (products) => ({ products })
);


const products = [
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
]


export default function Products() {
    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <div className={"section-title"}>Burak Restaurant</div>
                        <div className={"search"}></div>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                variant="contained"
                                color="primary"
                                className="order"
                            > New
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="order"
                            > Price
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="order"
                            > Views
                            </Button>
                        </Stack>
                        
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <Stack className={"category-box"}>
                                <Button variant="contained" color="primary" className="order">Dish</Button>
                                <Button variant="contained" color="secondary" className="order">Salad</Button>
                                <Button variant="contained" color="secondary" className="order">Drink</Button>
                                <Button variant="contained" color="secondary" className="order">Desert</Button>
                                <Button variant="contained" color="secondary" className="order">Other</Button>
                            </Stack>

                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product, index) => {
                                    return (
                                        <Stack key={index} className={"product-card"}>
                                            <Stack className={"product-img"}
                                                sx={{ backgroundImage: `url(${product.imagePath})` }}
                                            >
                                                <div className={"product-sale"}>Normal size</div>
                                                <Button className={"shop-btn"}>
                                                    <img src={"/icons/shopping-cart.svg"} style={{ display: "flex" }} alt="shop botton here"
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge badgeContent={20} color={"secondary"}>
                                                        <RemoveRedEyeIcon sx={{ color: 20 ? "gray" : "white" }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {12}
                                                </div>
                                            </Box>
                                        </Stack>
                                    )
                                })
                            ) : (
                                <Box className="no-data">New Products are not available!</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={3}
                            page={1}
                            renderItem={(item) => (
                                <PaginationItem
                                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                    color={"secondary"}
                                />
                              )}
                        />
                    </Stack>

                </Stack>
            </Container>
            <div className="brands-logo">
                <div className={"section-title"}>
                    Our Family Brands
                    <div className={"product-img"}>
                        <img src="img/doner.webp" className="brand-img" alt="" />
                        <img src="img/seafood.webp" className="brand-img" alt="" />
                        <img src="img/sweets.webp" className="brand-img" alt="" />
                        <img src="img/gurme.webp" className="brand-img" alt="" />
                    </div>
                </div>
            </div>

            <div className={"address"}>
                <Container className={"address-area"}>
                    <Box className={"title"}>Our address</Box>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.3682271052508!2d128.61260140904835!3d34.89720766631729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356ecd8284c55ef9%3A0x69229f0b9f7d383e!2sSamsung%20Hotel%20Geoje!5e0!3m2!1suz!2skr!4v1737444070902!5m2!1suz!2skr" 
                        width="1320"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade">                        
                    </iframe>

                </Container>
            </div>
        </div>
    )
}

