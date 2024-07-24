import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getRecipesBySearch = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
  return response.data.meals;
};

export const getRecipesByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return response.data.meals;
};

export const getRecipesByArea = async (area) => {
  const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
  return response.data.meals;
};

export const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/list.php?c=list`);
  return response.data.meals;
};

export const getAllAreas = async () => {
  const response = await axios.get(`${BASE_URL}/list.php?a=list`);
  return response.data.meals;
};

export const getListAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories.php`);
  return response.data.categories;
};
