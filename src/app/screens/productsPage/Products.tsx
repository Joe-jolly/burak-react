import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
}));

interface ProductsProps
{
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps )
{
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
    });
    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();

    useEffect(() =>
    {
        const product = new ProductService();
        product
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, [productSearch]);

    useEffect(() =>
    {
        if (searchText === "")
        {
            productSearch.search = "";
            setProductSearch({ ...productSearch });
        }
    }, [searchText]);


    /** HANDLERS **/
    const searchCollectionHandler = (collection: ProductCollection) =>
    {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };

    const searchOrderHandler = (order: string) =>
    {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    const searchProductHandler = () =>
    {
        productSearch.page = 1;
        productSearch.search = searchText;
        setProductSearch({ ...productSearch });
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) =>
    {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };
    
    const choseDishHandler = (id: string) =>
    {
        history.push(`/products/${id}`);
    }
            
    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack className={"top-text"}>
                            <p>Burak Restaurant</p>
                        </Stack>

                        <div className="search-and-filters">
                            <Stack className={"single-search-big-box"}>
                                <input type={"search"}
                                    className={"single-search-input"}
                                    name={"singleResearch"}
                                    placeholder={"Type here"}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) =>
                                    {
                                        if (e.key === "Enter") searchProductHandler(); 
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    className="searchButton"
                                    endIcon={<SearchIcon />}
                                    onClick={searchProductHandler}
                                > Search
                                </Button>
                            </Stack>

                            <Stack className={"dishes-filter-section"}>
                                <Stack className={"dishes-filter-box"}>
                                    <Button
                                        variant="contained"
                                        className="order"
                                        color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                                        onClick={() => searchOrderHandler("createdAt")}
                                    > New
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="order"
                                        color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                                        onClick={() => searchOrderHandler("productPrice")}
                                    > Price
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="order"
                                        color={productSearch.order === "productViews" ? "primary" : "secondary"}
                                        onClick={() => searchOrderHandler("productViews")}
                                    > Views
                                    </Button>
                                </Stack>
                                
                            </Stack>
                        </div>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <Stack className={"category-box"}>
                                <Button variant="contained" color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"} className="order"
                                    onClick={() => searchCollectionHandler(ProductCollection.DISH)}>Dish</Button>
                                
                                <Button variant="contained" color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"} className="order"
                                    onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>Salad</Button>
                                
                                <Button variant="contained" color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"} className="order"
                                    onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>Drink</Button>
                                
                                <Button variant="contained" color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"} className="order"
                                    onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>Desert</Button>
                                
                                <Button variant="contained" color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"} className="order"
                                    onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>Other</Button>
                            </Stack>

                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product) =>
                                {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume = product.productCollection === ProductCollection.DRINK
                                        ? product.productVolume + "litre"
                                        : product.productSize + "size";

                                    return (
                                        <Stack
                                            key={product._id}
                                            className={"product-card"}
                                            onClick={() => choseDishHandler(product._id)}
                                        >
                                            <Stack className={"product-img"}
                                                sx={{ backgroundImage: `url(${imagePath})` }}
                                            >
                                                <div className={"product-sale"}>{sizeVolume}</div>
                                                <Button className={"shop-btn"}
                                                    onClick={(e) =>
                                                    {
                                                        onAdd({
                                                            _id: product._id,
                                                            quantity: 1,
                                                            name: product.productName,
                                                            price: product.productPrice,
                                                            image: product.productImages[0],
                                                        });
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <img src={"/icons/shopping-cart.svg"} style={{ display: "flex" }} alt="shop botton here"
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge badgeContent={product.productViews} color="secondary">
                                                        <RemoveRedEyeIcon sx={{ color: product.productViews === 0 ? "gray" : "white" }}
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
                                                    {product.productPrice}
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
                            count={products.length !== 0 ? productSearch.page + 1 :productSearch.page}
                            page={productSearch.page}
                            renderItem={(item) => (
                                <PaginationItem
                                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
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

