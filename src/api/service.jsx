import axios from "axios"
import { showError } from "../utils/statusHandler"

const URL = 'http://localhost:8000/api'

export async function getPeriods(keyword) {
    try {
        const res = await axios.get(URL + '/period', { params: { keyword } })
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }

}