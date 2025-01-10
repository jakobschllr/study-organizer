// file to communicate with the backend

import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/data'

const getAllData = () => {
    const request = axios.get(baseUrl).then(response => response.data)
    return request
}

const updateSubject = (id, newSubj) => {
    const request = axios.put(`${baseUrl}/subjects/${id}`, newSubj).then(response => response.data)
    return request
}

const deleteSubject = (id) => {
    const request = axios.delete(`${baseUrl}/subjects/${id}`).then(response => response.data)
    return request
}

const addSubject = (subj) => {
    const request = axios.post(`${baseUrl}/subjects`, subj).then(response => response.data)
    return request
}

const addLink = (link) => {
    const request = axios.post(`${baseUrl}/links`, link).then(response => response.data)
    return request
}

const updateLinks = (ids) => {
    const request = axios.put(`${baseUrl}/links`, ids).then(response => response.data)
    return request
}

export default { getAllData, updateSubject, deleteSubject, addSubject, addLink, updateLinks }