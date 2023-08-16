const parseQueryProducts = (string) => {
  const arr = string.split(" ");

  let rs = `"$or": [{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"title":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"brand":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"model":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"color":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"code":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }

  return rs + "]}]";
};

const parseQueryUsers = (string) => {
  const arr = string.split(" ");

  let rs = `"$or": [{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"email":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"firstName":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"lastName":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }

  return rs + "]}]";
};

const parseQueryOrders = (string) => {
  const arr = string.split(" ");

  let rs = `"$or": [{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"status":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"deliverType":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }
  rs += `]},{"$and":[`;
  for (let i = 0; i < arr.length; i++) {
    rs += `{"paymentType":{"$regex":"${arr[i]}","$options":"i"}}`;
    if (i !== arr.length - 1) rs += ",";
  }

  return rs + "]}]";
};

module.exports = {
  parseQueryProducts,
  parseQueryUsers,
  parseQueryOrders,
};
