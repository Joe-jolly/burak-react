import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CardCover, CssVarsProvider, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

const activeUsers = [
    { membernick: "Martin", memberImage: "/img/martin.webp" },
    { membernick: "Justin", memberImage: "/img/justin.webp" },
    { membernick: "Rose", memberImage: "/img/rose.webp" },
    { membernick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
    return(
    <div className="active-users-frame">
        <Container>
            <Stack className="active-users-section">
                <Box className="section-title">Active users</Box>
                <Stack className="cards-frame">
                    <CssVarsProvider>
                        {activeUsers.length !== 0 ? (
                            activeUsers.map((ele, index) => {
                                return(
                                    <Card key={index} className={"card"}>
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={ele.memberImage} alt="user photo here" />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardCover className="card-cover" />
                                        <Stack>
                                            <Typography className={"title"}>
                                                {ele.membernick}
                                            </Typography>
                                        </Stack>
                                    </Card>
                                )
                            })
                        ) : (
                            <Box className="no-data">No active users!</Box>
                        )}
                    </CssVarsProvider>
                </Stack>
            </Stack>
        </Container>
    </div>);
}