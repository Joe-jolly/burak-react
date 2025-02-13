import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "../../components/divider";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";


/** REDUX SLICE & SELECTOR **/
const newDishesRetriever = createSelector(
    retrieveNewDishes, (newDishes) => ({ newDishes })
);

export default function NewDishes()
{
    const { newDishes } = useSelector(newDishesRetriever);
        
    console.log("newDishes:", newDishes);
    return(
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes-section">
                    <Box className="section-title">Fresh dishes</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            {newDishes.length !== 0 ? (
                                newDishes.map((product: Product) =>
                                {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume = product.productCollection === ProductCollection.DRINK
                                        ? product.productVolume + "l"
                                        : product.productSize + " size";
                                    
                                    return(
                                        <Card key={product._id} variant="outlined" className={"card"}>
                                            <CardOverflow>
                                                <div className="dish-sale">{sizeVolume}</div>
                                                <AspectRatio ratio="1">
                                                    <img src={imagePath} alt="dish photo here" />
                                                </AspectRatio>
                                            </CardOverflow>

                                            <CardOverflow variant="soft" className="dish-detail">
                                                <Stack className="info">
                                                    <Stack flexDirection={"row"}>
                                                        <Typography className={"title"}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Divider width="2" height="24" bg="rgb(217, 217, 217);" />
                                                        <Typography className="price">${product.productPrice}</Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography className="views">
                                                            {product.productViews}
                                                            <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px"}}></VisibilityIcon>
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className="no-data">New Products are not available!</Box>
                            )};
                                
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
};