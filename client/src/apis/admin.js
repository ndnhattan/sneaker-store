import axios from "../configs/axios";

export const apiGetAllUsers = async (params) => {
  const data = await axios({
    url: "manage-user/all",
    method: "get",
    params,
  });
  return data;
};

export const apiDeleteUser = async (id) => {
  const data = await axios({
    url: "manage-user/" + id,
    method: "delete",
  });
  return data;
};

export const apiUpdateUserAdmin = async (id, body) => {
  const data = await axios({
    url: "manage-user/" + id,
    method: "put",
    data: body,
  });
  return data;
};

export const apiDeleteProduct = async (id) => {
  const data = await axios({
    url: "manage-product/" + id,
    method: "delete",
  });
  return data;
};

export const apiUpdateProduct = async (id, body) => {
  const data = await axios({
    url: "manage-product/" + id,
    method: "put",
    data: body,
  });
  return data;
};

export const apiUploadImages = async (body) => {
  const data = await axios({
    url: "manage-product/upload-images",
    method: "post",
    data: body,
  });
  return data;
};

export const apiCreateProduct = async (body) => {
  const data = await axios({
    url: "manage-product/",
    method: "post",
    data: body,
  });
  return data;
};

export const apiGetAllOrders = async (params) => {
  const data = await axios({
    url: "manage-order/all",
    method: "get",
    params,
  });
  return data;
};

export const apiDeleteOrder = async (id) => {
  const data = await axios({
    url: "manage-order/" + id,
    method: "delete",
  });
  return data;
};

export const apiUpdateOrder = async (id, body) => {
  const data = await axios({
    url: "manage-order/" + id,
    method: "put",
    data: body,
  });
  return data;
};
