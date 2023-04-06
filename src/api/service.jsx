import axios from "axios"
import { showError, showSuccess } from "../utils/statusHandler"

const URL = 'http://localhost:8000/api'

export async function getPeriods(keyword) {
    try {
        const res = await axios.get(URL + '/period', { headers: { Authorization: keyword } })
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }
}

export async function getTypes(keyword) {
    try {
        const res = await axios.get(URL + '/type', { headers: { Authorization: keyword } })
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }
}

export async function openPeriod(keyword) {
    try {
        const res = await axios.post(URL + '/period', {}, { headers: { Authorization: keyword } })
        showSuccess('New period opened.')
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }
}

export async function closePeriod(keyword, id) {
    try {
        const res = await axios.put(URL + `/period/${id}`, {}, { headers: { Authorization: keyword } })
        showSuccess('Period closed.')
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }
}

export async function createMovement(keyword, data) {
    try {
        const res = await axios.post(URL + '/movement', data, { headers: { Authorization: keyword } })
        showSuccess('New movement created.')
        return res.data
    } catch (err) {
        showError(err.response.data.message)
    }
}