import axios from "../configs/axios";

export const apiRegister = async (body) => {
  const data = await axios({
    url: "user/register",
    method: "post",
    data: body,
  });
  return data;
};

export const apiLogin = async (body) => {
  const data = await axios({
    url: "user/login",
    method: "post",
    data: body,
  });
  return data;
};

export const apiForgotPassword = async (params) => {
  const data = await axios({
    url: "user/forgot-password/" + params,
    method: "get",
  });
  return data;
};

export const apiVerifyForgotPassword = async (body) => {
  const data = await axios({
    url: "user/verify-forgot-password",
    method: "put",
    data: body,
  });
  return data;
};

export const apiLogout = async () => {
  const data = await axios({
    url: "user/logout",
    method: "get",
  });
  return data;
};

export const apiGetCurrent = async () => {
  const data = await axios({
    url: "user/",
    method: "get",
  });
  return data;
};

export const apiUpdateUser = async (body) => {
  const data = await axios({
    url: "user/",
    method: "put",
    data: body,
  });
  return data;
};

export const apiUpdateAddress = async (body) => {
  const data = await axios({
    url: "user/address",
    method: "put",
    data: body,
  });
  return data;
};

export const apiAddToCart = async (body) => {
  const data = await axios({
    url: "user/add-to-cart",
    method: "post",
    data: body,
  });
  return data;
};

export const apiGetDetailCart = async () => {
  const data = await axios({
    url: "user/detail-cart",
    method: "get",
  });
  return data;
};
