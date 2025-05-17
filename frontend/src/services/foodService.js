import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getFoods = (params) => axios.get(`${API_URL}/foods`, { params });
export const getFoodById = (id) => axios.get(`${API_URL}/foods/${id}`);
export const createFood = (food) => axios.post(`${API_URL}/foods`, food);
export const updateFood = (id, food) => axios.put(`${API_URL}/foods/${id}`, food);
export const deleteFood = (id) => axios.delete(`${API_URL}/foods/${id}`);
