import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Stack } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage()
{
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() =>
  {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data)).
      catch((err) => console.log(err));
    
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data)).
      catch((err) => console.log(err));
    
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data)).
      catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) =>
  {
    setValue(newValue);
  };
  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  area-label="basic tabs example"
                  className={"table-list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
          
        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img src={authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"} alt="user avatar here"
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img src={authMember?.memberType === MemberType.RESTAURANT
                    ? "/icons/restaurant.svg"
                    :"/icons/user-badge.svg"} alt="user badge here"
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>{authMember?.memberNick}</span>
              <span className={"order-user-prof"}>{authMember?.memberType}</span>
            </Box>
            <Box className={"liner"} />
            <Stack className="order-user-address">
              <LocationOnIcon />
              <Box className="spec-address-text">{authMember?.memberAddress
                ? authMember.memberAddress
                : "Do not exist"}
              </Box>
            </Stack>
          </Box>
            
          <Stack className="card-info order-info-box">
            <Box className="card-input">Card Number: 5243 4090 2002 7495</Box>
            <Stack className="card-half">
              <Box className="card-half-input">07 / 24</Box>
              <Box className="card-half-input">CVV: 010</Box>
            </Stack>
            <Box className="card-input">Justin Robertson</Box>
            <Stack className="cards-box">
              <img src="/icons/western-card.svg"></img>
              <img src="/icons/master-card.svg"></img>
              <img src="/icons/paypal-card.svg"></img>
              <img src="/icons/visa-card.svg"></img>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

