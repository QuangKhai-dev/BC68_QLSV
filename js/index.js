let arrSinhVien = [];

// Thêm sinh viên vào mảng
// tạo một sự kiện onsubmit
// xử lí sử dụng một số cách đã được hướng dẫn để lấy dữ liệu từ các input và select
document.getElementById("formQLSV").onsubmit = function (event) {
  event.preventDefault();
  let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select");
  // console.log(arrField);

  let sinhVien = new SinhVien();
  console.log(sinhVien);

  // vòng lặp for of để xử lí lấy dữ liệu
  for (let field of arrField) {
    // console.log(field);
    let { value, id } = field;
    sinhVien[id] = value;
  }
  // console.log(sinhVien);
  // thêm sinh viên vào mảng
  arrSinhVien.push(sinhVien);

  // chạy hàm renderArrSinhVien để hiển thị dữ liệu
  renderArrSinhVien();
  // gọi tới phương thức lưu trữ local
  saveLocalStorage();

  // xoá toàn bộ dữ liệu đang có trên form
  // event.target.reset();
  document.getElementById("formQLSV").reset();
};

// Hiển thị dữ liệu sinh viên lên giao diện
function renderArrSinhVien() {
  // B1 Tạo một vòng lặp duyệt các sinh viên có trong mảng
  let content = "";
  for (let sinhVien of arrSinhVien) {
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
