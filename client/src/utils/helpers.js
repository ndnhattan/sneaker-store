export const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const addSize = (sizes, size) => {
  size = size + "";
  let rs = sizes ? sizes.split(",") : [];
  if (!rs.includes(size)) rs.push(size);
  else {
    const index = rs.indexOf(size);
    if (index !== 0) rs.splice(index, 1);
    else if (sizes.length !== 1) rs = rs.slice(1);
    else return undefined;
  }

  return rs.join(",");
};

export const validateForm = (data) => {
  const key = Object.keys(data);
  for (let i = 0; i < key.length; i++) {
    if (data[key[i]] === "" || !data[key[i]])
      return `Vui lòng điền đầy đủ thông tin`;
  }

  const { email, password, password2 } = data;
  if (
    email &&
    email.length > 0 &&
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return `Email không hợp lệ`;
  if (password && password.length < 6) return `Mật khẩu tối thiểu 6 kí tự`;
  if (password && password2 && password !== password2)
    return "Mật khẩu không trùng khớp";

  return "Success";
};

export const validateChangePassword = (data) => {
  const { oldPassword, newPassword, newPassword2 } = data;
  if (!oldPassword && !newPassword) return "Success";
  else if (oldPassword && !newPassword) return `Vui lòng điền đầy đủ thông tin`;
  else if (newPassword.length < 6) return `Mật khẩu tối thiểu 6 kí tự`;
  else if (newPassword && newPassword !== newPassword2)
    return "Mật khẩu không trùng khớp";

  return "Success";
};

export const stringToHTML = (str) => {
  const dom = document.createElement("div");
  dom.innerHTML = str;
  return dom;
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
