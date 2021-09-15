import { URL_API } from "./../config/constant.js";
const callApi = (uri, method, data) => {
    // uri goi cho resource
    return axios({
        url: `${URL_API}/${uri}`,
        method,
        data,
    })
}

const getListProductApi = () => {
    return axios({
        url: "https://6001828108587400174dad48.mockapi.io/api/SanPham",
        method: "GET",
    });
};
const deleteProductApi = (id) => {
    return axios({
        url: `https://6001828108587400174dad48.mockapi.io/api/SanPham/${id}`,
        method: "DELETE",
    })
}
const addProductApi = (product) => {
    return axios({
        url: `https://6001828108587400174dad48.mockapi.io/api/SanPham`,
        method: "POST",
        data: product,
    })
}
const getProductApi = (id) => {
    return axios({
        url: `https://6001828108587400174dad48.mockapi.io/api/SanPham/${id}`,
        method: "GET",
    })
}
const changeProductApi = (product) => {
    return axios({
        url: `https://6001828108587400174dad48.mockapi.io/api/SanPham/${product.id}`,
        method: "PUT",
        data: product,
    })
}

export { getListProductApi, deleteProductApi, getProductApi, addProductApi, changeProductApi, callApi };