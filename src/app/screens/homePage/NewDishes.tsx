import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "../../components/divider";
import VisibilityIcon from "@mui/icons-material/Visibility";



const newDishes = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
];

export default function NewDishes() {
    return(
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes-section">
                    <Box className="section-title">Fresh dishes</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            {newDishes.length !== 0 ? (
                                newDishes.map((ele, index) => {
                                    return(
                                        <Card key={index} variant="outlined" className={"card"}>
                                            <CardOverflow>
                                                <div className="dish-sale">Normal size</div>
                                                <AspectRatio ratio="1">
                                                    <img src={ele.imagePath} alt="dish photo here" />
                                                </AspectRatio>
                                            </CardOverflow>

                                            <CardOverflow variant="soft" className="dish-detail">
                                                <Stack className="info">
                                                    <Stack flexDirection={"row"}>
                                                        <Typography className={"title"}>
                                                            {ele.productName}
                                                        </Typography>
                                                        <Divider width="2" height="24" bg="rgb(217, 217, 217);" />
                                                        <Typography className="price">$12</Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography className="views">
                                                            20
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