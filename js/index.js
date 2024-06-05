let arrSinhVien = [];

// Lấy dữ liệu sinh viên từ form
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select");
  let sinhVien = new SinhVien();
  let isValid = true; // 1
  // vòng lặp for of để xử lí lấy dữ liệu
  for (let field of arrField) {
    // console.log(field);
    let { value, id } = field;
    sinhVien[id] = value;
    // xử lí kiểm tra validation dữ liệu
    // sử dụng một câu lệnh để gọi tới thẻ cha đang chứa input
    let parent = field.parentElement;
    let errorField = parent.querySelector("span");
    let check = checkEmptyValue(value, errorField);
    // Toán nhị phân 1 & 0 ==> 0
    isValid &= check;
    // Chỉ kiểm tra input tên sv
    // Nếu như trường hợp là dữ liệu rỗng thì phải hiển thị là không bỏ trống chứ không hiển thị check min max
    if (check && id == "txtTenSV") {
      isValid &= checkMinMaxValue(value, errorField, 7, 9);
    }
    if (check && id == "txtEmail") {
      isValid &= checkEmailValue(value, errorField);
      // checkPhoneNumberValue(value, errorField);
    }
  }
  if (isValid) {
    return sinhVien;
  }
}

// tự động hiển thị dữ liệu mới, lưu trữ xuống localstorage và reset form
function renderSaveReset() {
  renderArrSinhVien();
  saveLocalStorage();
  // xử lí reset form
  document.getElementById("formQLSV").reset();
}

// Thêm sinh viên vào mảng
// tạo một sự kiện onsubmit
// xử lí sử dụng một số cách đã được hướng dẫn để lấy dữ liệu từ các input và select
document.getElementById("formQLSV").onsubmit = function (event) {
  event.preventDefault();
  let maSV = document.getElementById("txtMaSV").value;
  console.log(maSV); // ""
  let sinhVien = getValueForm();
  if (!sinhVien) {
    return;
  }
  // console.log(sinhVien);
  // thêm sinh viên vào mảng
  arrSinhVien.push(sinhVien);

  renderSaveReset();
};

// Hiển thị dữ liệu sinh viên lên giao diện
function renderArrSinhVien(arr = arrSinhVien) {
  // B1 Tạo một vòng lặp duyệt các sinh viên có trong mảng
  let content = "";
  for (let sinhVien of arr) {
    // console.log(sinhVien);
    // khởi tạo một đối tượng từ lớp đối tượng sinh viên
    let newArrSinhVien = new SinhVien();
    Object.assign(newArrSinhVien, sinhVien);
    // console.log(newArrSinhVien);
    let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newArrSinhVien;

    content += `
    <tr>
      <td>${txtMaSV}</td>
      <td>${txtTenSV}</td>
      <td>${txtEmail}</td>
      <td>${txtNgaySinh}</td>
      <td>${khSV}</td>
      <td>${newArrSinhVien.tinhDiemTrungBinh()}</td>
      <td>
        <button onclick="deleteSinhVien('${txtMaSV}')" class="btn btn-danger">Xoá</button>
        <button onclick="getInfoSinhVien('${txtMaSV}')" class="btn btn-warning">Sửa</button>
      </td>
    </tr>
    `;
  }
  // Thực hiện DOM tới tbody và hiển thị dữ liệu
  document.getElementById("tbodySinhVien").innerHTML = content;
}

getLocalStorage();

// Lưu trữ dữ liệu xuống local storage
function saveLocalStorage(key = "arrSinhVien", value = arrSinhVien) {
  // lưu trữ mảng arrSinhVien xuống local storage
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// Lấy dữ liệu từ local storage
function getLocalStorage(key = "arrSinhVien") {
  // lấy dữ liệu từ local storage lên
  let arrLocal = localStorage.getItem(key);
  // arrSinhVien = arrLocal ? JSON.parse(arrLocal) : [];
  if (arrLocal) {
    arrSinhVien = JSON.parse(arrLocal);
    renderArrSinhVien();
  }
}

// Chức năng xoá một sinh viên khỏi mảng
function deleteSinhVien(mssv) {
  console.log(mssv);
  // Tìm kiếm vị trí của sinh viên đang cần xoá trong mảng arrSinhVien thông qua mssv
  // Sau khi đã tìm được vị trí, thực hiện sử dụng các phương thức từ mảng để xoá
  // findIndex
  let index = arrSinhVien.findIndex((item, index) => {
    return item.txtMaSV == mssv;
  });
  console.log(index);
  if (index != -1) {
    arrSinhVien.splice(index, 1);
    renderArrSinhVien();
    saveLocalStorage();
  }

  // Cách số 2 để xoá 1 phần tử khỏi mảng
  // [1,3] ==> item != 2 ==> [1,3]
  // arrSinhVien = arrSinhVien.filter((item, index) => {
  //   return item.txtMaSV != mssv;
  // });
  // renderArrSinhVien();
  // saveLocalStorage();
  // console.log(arrSinhVien);
}

// Chức năng lấy thông tin sinh viên
function getInfoSinhVien(mssv) {
  // Thực hiện gắn hàm getInfoSInhVien vào nút sửa
  // sau khi đã lấy được mssv, thực hiện duyệt mảng arrSinhVien và tìm kiếm tới phần tử cần lấy thông tin
  console.log(mssv);
  // Sử dụng hàm find để lấy phần tử trong mảng
  let sinhVien = arrSinhVien.find((item, index) => {
    return item.txtMaSV == mssv;
  });
  if (sinhVien) {
    // đưa dữ liệu sinhVien lên giao diện
    let arrField = document.querySelectorAll(
      "#formQLSV input, #formQLSV select"
    );
    console.log(arrField);
    for (let field of arrField) {
      // field sẽ đại diện cho từng input và select có trong mảng arrField
      let id = field.id;
      field.value = sinhVien[id];
    }
    // Chặn người dùng chỉnh sửa input mã sv
    document.getElementById("txtMaSV").readOnly = true;
  }
}

// chức năng cập nhật thông tin sinh viên
function updateSinhVien(abc) {
  console.log(abc);
  console.log("Hello update");
  // thực hiện xử lí lấy dữ liệu từ người dùng ()
  let sinhVien = getValueForm();

  // Tìm kiếm vị trí index của phần tử đang chỉnh sửa trong mảng
  let index = arrSinhVien.findIndex((item) => item.txtMaSV == sinhVien.txtMaSV);
  if (index != -1) {
    arrSinhVien[index] = sinhVien;
    renderSaveReset();
    document.getElementById("txtMaSV").readOnly = false;
  }
  // Thực hiện cập nhật lại dữ liệu tại vị trí tìm được cho mảng
}
document.querySelector(".btn-info").onclick = updateSinhVien;

// chức năng tìm kiếm
function searchSinhVien(event) {
  // console.log(event.target.value);
  // Nồi chiên không dầu
  // noi chien khong dau
  // convert dữ liệu trước khi lọc ==> chuyển keyword và tên của các dữ liệu cần lọc về chữ thường (toLowerCase) ==> loại bỏ đi tất cả dấu tiếng việt ==> loại bỏ các khoảng trắng ở đầu và cuối chuỗi (trim)
  let newKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );
  // khi filter hoạt động, hàm sẽ lọc tìm kiếm và trả về một mảng mới lưu trữ vào arrSinhVienFilter
  let arrSinhVienFilter = arrSinhVien.filter((item, index) => {
    // thực hiện kiểm tra xem keyword người dùng nhập vào có được chứa trong tên sinh viên hay không
    let newTenSinhVien = removeVietnameseTones(
      item.txtTenSV.toLowerCase().trim()
    );
    // includes  // long ==> lo ==> true
    return newTenSinhVien.includes(newKeyWord);
  });
  console.log(arrSinhVienFilter);
  // gọi hàm hiển thị sinh viên
  renderArrSinhVien(arrSinhVienFilter);
}
// oninput
document.getElementById("txtSearch").oninput = searchSinhVien;

// Học cách tương tác với local storage
// let arrNhanVien = [
//   {
//     hoTen: "Thị Tấm",
//     tuoi: 18,
//   },
// ];
// thêm dữ liệu
// let arrJson = JSON.stringify(arrNhanVien);
// console.log(arrJson);
// localStorage.setItem("arrNhanVien", arrJson);

// lấy dữ liệu
// let arrLocal = localStorage.getItem("arrNhanVien");
// // console.log(arrLocal);
// let arrConvert = JSON.parse(arrLocal);
// console.log(arrConvert);

// // xoá dữ liệu
// localStorage.removeItem("hoTen");
