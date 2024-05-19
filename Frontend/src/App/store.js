import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "./Slice/DashboardSlice";

const Store =configureStore({
    reducer:{
        dashboardState: DashboardSlice,
    }
});

export default Store;