// file to communicate with the backend

import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/data'

const getAllData = (userId) => {
    const request = axios.get(baseUrl, { userId: userId }).then(response => response.data)
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

const addSubject = (subj, userId) => {
    const request = axios.post(`${baseUrl}/subjects`, {userId: userId, subject: subj}).then(response => response.data)
    return request
}

const addLink = (link, userId) => {
    const request = axios.post(`${baseUrl}/links`, {link: link, userId: userId}).then(response => response.data)
    return request
}

const updateLinks = (ids) => {
    const request = axios.put(`${baseUrl}/links`, ids).then(response => response.data)
    return request
}

const addHabit = (habit, userId) => {
    const request = axios.post(`${baseUrl}/habits`, {habit: habit, userId: userId}).then(response => response.data)
    return request
}

const deleteHabit = (id) => {
    const request = axios.delete(`${baseUrl}/habits/${id}`).then(response => response.data)
    return request
}

const completedHabit = (id, habit) => {
    const request = axios.put(`${baseUrl}/habits/${id}`, habit).then(response => response.data)
    return request
}

const loginUser = (userData) => {
    const request = axios.post(`${baseUrl}/users/login`, userData).then(response => response.data)
    return request
}

const signupUser = (userData) => {
    const request = axios.post(`${baseUrl}/users/signup`, userData).then(response => response.data)
    return request
}

export default { getAllData, updateSubject, deleteSubject, addSubject, addLink, updateLinks, addHabit, deleteHabit, completedHabit, loginUser, signupUser }