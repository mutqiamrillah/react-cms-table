import axios from "axios"
import {
    GET_TABLE,
} from "../constants"

const BASE_URL = "https://randomuser.me/api"

export const getList = (valSearch) => {
    let nameSearch = (valSearch.keyword !== "" ? "&keyword=" + valSearch.keyword : "")
    let genderFilter = (valSearch.gender !== "" ? "&gender=" + valSearch.gender : "")
    let sortBy = (valSearch.sortBy !== "" ? "&sortBy=" + valSearch.sortBy : "")
    let sortOrder = (valSearch.sortOrder !== "" ? "&sortOrder=" + valSearch.sortOrder : "")
    let page = (valSearch.page !== "" ? "&page=" + valSearch.page : "")
    
  return async (dispatch) => {
    const result = await axios.get(`${BASE_URL}/?results=5&nat=fr` + nameSearch + genderFilter + sortBy + sortOrder + page)
    dispatch({ type: GET_TABLE, payload: result.data.results })
  }
}