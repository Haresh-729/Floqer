import { BaseURL } from "../../appsettings.js";
// const BaseURL = "https://floqer-btn93dcag-haresh-kurades-projects.vercel.app/api/";
// const BaseURL = "https://floqer-btn93dcag-haresh-kurades-projects.vercel.app/api";
export const salaryDataEndpoints = {
    GET_ALL_DATA: BaseURL + "salaryData/",
    GET_ALL_COUNT: BaseURL + "salaryData/count",
    GET_MAIN_TABLE_DATA: BaseURL + "salaryData/mainTabledata",
    GET_YEAR_DATA: BaseURL + "salaryData/yearStats/",
    GET_CHAT_RESPONSE: BaseURL + "salaryData/generate-response",
}