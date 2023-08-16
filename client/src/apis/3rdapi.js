import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_PROVINCE,
});

export const apiGetProvinces = async () => {
  const data = await instance({
    url: "p/",
    method: "get",
  });
  return data;
};

export const apiGetDistricts = async (code) => {
  const data = await instance({
    url: "p/" + code + "?depth=2",
    method: "get",
  });
  return data;
};

export const apiGetWards = async (code) => {
  const data = await instance({
    url: "d/" + code + "?depth=2",
    method: "get",
  });
  return data;
};
