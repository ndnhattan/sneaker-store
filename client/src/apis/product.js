import axios from "../configs/axios";

export const apiGetProducts = async (params) => {
  const data = await axios({
    url: "product/",
    method: "get",
    params,
  });
  return data;
};

export const apiGetProduct = async (params) => {
  const data = await axios({
    url: "product/" + params,
    method: "get",
  });
  return data;
};
