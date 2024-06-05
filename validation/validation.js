// kiểm tra dữ liệu rỗng
function checkEmptyValue(value, errorField) {
  // thực hiện kiểm tra lỗi cho người dùng
  if (!value) {
    // TH mà bị lỗi
    errorField.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    // TH không bị lỗi
    errorField.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(value, errorField, min, max) {
  // "long dragon" ==> 11
  if (min <= value.length && value.length <= max) {
    // TH dữ liệu nằm trong số lượng từ quy định
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong khoảng từ ${min} đến ${max}`;
    return false;
  }
}

function checkEmailValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // anhkhoa@gmail.com

  // sử dụng chuỗi regex để kiểm tra value
  let isValid = regexEmail.test(value);
  console.log(isValid);
  if (isValid) {
    // TH email chuẩn định dạng
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}

function checkPhoneNumberValue(value, errorField) {
  // thực hiện kiểm tra xem sdt có phải của viet nam hay không
  // regex để kiểm tra phoneNumber
  let regexPhoneNumber = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  let isValid = regexPhoneNumber.test(value);
  if (isValid) {
    // TH sdt chuẩn định dạng
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng sdt";
    return false;
  }
}
