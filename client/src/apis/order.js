import axios from "../configs/axios";

export const apiAddOrder = async (body) => {
  const data = await axios({
    url: "order/",
    method: "post",
    data: body,
  });
  return data;
};

export const apiGetDetailOrder = async () => {
  const data = await axios({
    url: "order/",
    method: "get",
  });
  return data;
};
