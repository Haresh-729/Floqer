import {toast} from "react-hot-toast";
import { apiConnector } from "../Connector";
import { salaryDataEndpoints } from "../Apis";

const { GET_ALL_COUNT, GET_ALL_DATA, GET_MAIN_TABLE_DATA, GET_YEAR_DATA, GET_CHAT_RESPONSE } = salaryDataEndpoints;


// export async function getFilters(){
//     const toastId = toast.loading("Getting filters..");
//         try{
//             const response = await apiConnector("GET", GET_FILTER_API);
//             // console.log("Response after get api :" + response);
//             if(response.data.success){
//                 const filterData = response.data.filters;
//                 // console.log(receipes);
//                 toast.dismiss(toastId);
//                 return filterData;
//             }else{
//                 throw new Error(response.data.message);
//             }
//         }catch(error){
//             console.log("CHECK UPLOAD API Error:", error);
//             toast.dismiss(toastId);
//             toast.error(error.response?.data?.message || "An error occurred while CHECKING uploading data.");
//         }
// }
export async function fetchMainTableData(){
    const toastId = toast.loading("Getting maintable data..");
        try{
            const response = await apiConnector("GET", GET_MAIN_TABLE_DATA);
            // console.log("Response after get api :" + response);
            if(response.data.success){
                const tblData = response.data.mainTableData;
                // console.log(receipes);
                toast.dismiss(toastId);
                return tblData;
            }else{
                throw new Error(response.data.message);
            }
        }catch(error){
            console.log("FETCH MAIN_TABLE_DATA API Error:", error);
            toast.dismiss(toastId);
            toast.error(error.response?.data?.message || "An error occurred while CHECKING uploading data.");
        }
}
export async function fetchYearData(year){
    const toastId = toast.loading("Getting maintable data..");
        try{
            const endPoint = GET_YEAR_DATA + year;
            const response = await apiConnector("GET", endPoint);
            // console.log("Response after get api :" + response);
            if(response.data.success){
                const tblData = response.data.yeardata;
                // console.log(receipes);
                toast.dismiss(toastId);
                return tblData;
            }else{
                throw new Error(response.data.message);
            }
        }catch(error){
            console.log("FETCH MAIN_TABLE_DATA API Error:", error);
            toast.dismiss(toastId);
            toast.error(error.response?.data?.message || "An error occurred while CHECKING uploading data.");
        }
}
export async function GetChatResponse(message){
    const toastId = toast.loading("Getting best response..");
        try{
            const response = await apiConnector("POST", GET_CHAT_RESPONSE, {message});
            // console.log("Response after get api :" + response);
            if(response.data.success){
                const tblData = response.data.yeardata;
                // console.log(receipes);
                toast.dismiss(toastId);
                return tblData;
            }else{
                console.log(response.data.logs);
                return response.data.logs;
            }
        }catch(error){
            console.log("FETCH RESPONSE API Error:", error);
            toast.dismiss(toastId);
            toast.error(error.response?.data?.message || "An error occurred while CHECKING uploading data.");
            console.log(error.response?.data?.logs);
            return error.response?.data?.logs;
        }
}