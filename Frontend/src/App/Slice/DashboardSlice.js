import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("account"));
const initialState = {
    accountData: localData ? localData : [],
    isLoggedIn: localData ? localData.isLoggedIn : false,
    bgColor: false,
};

const DashboardSlice = createSlice({
    initialState,
    name: "dashboard",
    reducers: {
        setAccount: (state, action) => {
            state.accountData = action.payload;
            state.isLoggedIn = true;
            const temp = {...state.accountData, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("account", JSON.stringify(temp));
        },
        setBgColor: (state, action) => {
            state.bgColor = !state.bgColor;
        }
    }
});

export const {setAccount, setBgColor} = DashboardSlice.actions;

export const getAccountData = (state) => state.dashboardState.accountData;
export const loginState = (state) => state.dashboardState.isLoggedIn;
export const getBgColor = (state) => state.dashboardState.bgColor;

export default DashboardSlice.reducer;