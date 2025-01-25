import TabPanel from "@mui/lab/TabPanel"
import { Box, Button, Stack } from "@mui/material"
import React from "react"
import moment from "moment"

export default function PausedOrders()
{ 
    return (
        <TabPanel value={"1"}>
            <Stack>
                {[1, 2].map((ele, index) =>
                {
                    return (
                        <Box key={index} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {[1, 2].map((ele2, index2) =>
                                {
                                    return (
                                        <Box key={index2} className={"orders-name-price"}>
                                            <Stack className={"order-dish-class"}>
                                                <img src={"/img/lavash.webp"} alt="order image here"
                                                    className={"order-dish-img"}
                                                />
                                                <p className={"title-dish"}>Lavash</p>
                                            </Stack>                                            
                                            <Box className={"price-box"}>
                                                <p>9$</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>2</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>18$</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>22$</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>2$</p>
                                    <img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Total</p>
                                    <p>24$</p>
                                </Box>
                                {/* <p className={"data-compl"}>
                                    {moment().format("yy.mm.dd HH:mm")}
                                </p> */}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={"cancel-button"}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {false && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}