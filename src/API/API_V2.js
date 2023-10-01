import axios from "axios";

const URI = "https://vshop.nmaza.dev/";

export const API = axios.create({ baseURL: URI });

export const getProducts = async (
  { categories = [], category = null } = { categories: [], category: null }
) => {
  if(category){
    categories.push(category)
  }
  return await API.get("/api/products", { params: {
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
  return await API.post(`/api/orders/create`, data).then(response => {
    const { data } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null;
  });
}

export const getOrder = async ({orderId}) => {
  return await API.get(`/api/orders/get/${orderId}`).then(response => {
    const { data } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null
  })
}

export const getProduct = async ({productId}) => {
  return await API.get(`/api/product/${productId}`).then(response => {
    const { data = null } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return null
  })
}

export const getCategories = async () => {
  return await API.get("/api/categories").then(response => {
    const { data = [] } = response;
    return data;
  }).catch(error => {
    console.log(error);
    return [];
  })
}