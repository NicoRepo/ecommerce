import axios from "axios";

const URI = "http://127.0.0.1:8000";

export const API = axios.create({ baseURL: URI });

export const getProducts = async (
  { categories = [], category = null } = { categories: [], category: null }
) => {
  if(category){
    categories.push(category)
  }
  return await API.get("/products", { params: {
    categories: categories.join(",") || null
  } })
    .then((response) => {
      const { data = [] } = response;
      return data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const createOrder = async (data) => {
  return await API.post(`/orders/create`, data).then(response => {
    const { data } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null;
  });
}

export const getOrder = async ({orderId}) => {
  return await API.get(`/orders/get/${orderId}`).then(response => {
    const { data } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null
  })
}

export const getProduct = async ({productId}) => {
  return await API.get(`/product/${productId}`).then(response => {
    const { data = null } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null
  })
}

export const getCategories = async () => {
  return await API.get("/categories").then(response => {
    const { data = [] } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return [];
  })
}