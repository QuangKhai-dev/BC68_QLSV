class SinhVien {
  constructor() {
    this.txtMaSV = "";
    this.txtTenSV = "";
    this.txtEmail = "";
    this.txtPass = "";
    this.txtNgaySinh = "";
    this.khSV = "";
    this.txtDiemToan = "";
    this.txtDiemLy = "";
    this.txtDiemHoa = "";
  }

  //
  tinhDiemTrungBinh = function () {
    return (
      (this.txtDiemToan * 1 + this.txtDiemLy * 1 + this.txtDiemHoa * 1) / 3
    );
  };
}
