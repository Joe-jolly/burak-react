import React from "react"
import { Box, Button, Stack } from "@mui/material"
import TabPanel from "@mui/lab/TabPanel"

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";


/** REDUX SLICE & SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders, (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrders()
{
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    /** HANDLERS */

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) =>
                {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: OrderItem) =>
                                {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => item.productId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;

                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <Stack className={"order-dish-class"}>
                                                <img src={imagePath} className={"order-dish-img"}
                                                />
                                                <p className={"title-dish"}>{product.productName}</p>
                                            </Stack>                                            
                                            <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>${item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    ${item.itemQuantity * item.itemPrice}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
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

                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className="pay-button">
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {!pausedOrders || (pausedOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    );
}