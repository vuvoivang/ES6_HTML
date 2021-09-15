//import { getListProductApi, deleteProductApi, getProductApi, addProductApi, changeProductApi } from "./utils/callapi.js";
import * as utils from "./utils/callapi.js";
/* Nếu có quá nhiều hàm thì dùng * as utils với utils là đại diện
khi cần dùng hàm vd như getListProductApi callApi.getListProductApi();
*/
import Product from "./models/product.js";
const render = () => {
    const content = `
        <div class="card text-white bg-dark">
            <div class="card-body">
            <h4 class="card-title">Danh sách sản phẩm</h4>
            <div class="container">
                <div class="row">
                <div class="col-md-3">
                    <input
                    id="maSP"
                    class="form-control"
                    placeholder="Mã SP"
                    disabled
                    />
                </div>
                <div class="col-md-3">
                    <input id="tenSP" class="form-control" placeholder="Tên SP" />
                </div>
                <div class="col-md-3">
                    <input id="gia" class="form-control" placeholder="Giá" />
                </div>
                <div class="col-md-3">
                    <input
                    id="hinhAnh"
                    class="form-control"
                    placeholder="Link hình"
                    />
                </div>
                </div>
                <br />
                <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
                <button id="btnCapNhat" class="btn btn-success">Cập nhật</button>
            </div>
            </div>
        </div>
        <div class="container">
            <table class="table">
            <thead>
                <tr>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th></th>
                </tr>
            </thead>
            <tbody id="tblDanhSachSanPham"></tbody>
            </table>
        </div>
    `;
    getEleId("root").innerHTML = content;
}
const getEleId = (id) => document.getElementById(id);
render();
const renderTable = (arr) => {
    if (arr != null && arr.length > 0) {
        let content = "";
        //Duyet mang bang map, tra ra mang moi sau khi duyet mang cu
        arr.map((item) => {
            content += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.tenSP}</td>
                    <td>${item.gia}</td>
                    <td> <img src="${item.hinhAnh}" width="50" /></td>
                    <td>
                       <button class="btn btn-info" onclick="changeProduct(${item.id})">Sửa</button>
                       <button class="btn btn-danger" onclick="deleteProduct(${item.id})">Xóa</button>  
                    </td>
                </tr>
            `;
        })
        return content;
    }
    return `<tr>Chưa có dữ liệu</tr>`;
}
const getListProduct = () => {
    utils.callApi("SanPham", "GET", null)
        .then((result) => {
            const tbody = renderTable(result.data);
            getEleId("tblDanhSachSanPham").innerHTML = tbody;
        })
        .catch((err) => {
            console.log(err);
        })
}
getListProduct();

// Bi mo 
// Dang dung ES6, import nen khi co 1 ham onclick doi tuong thi window ko hieu,can phai khai bao ben ngoai
window.deleteProduct = deleteProduct;

function deleteProduct(id) {
    utils.callApi(`SanPham/${id}`, "DELETE", null)
        .then((result) => {
            getListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
}

getEleId("btnThem").addEventListener("click", () => {
    let tenSP = getEleId("tenSP").value;
    let gia = getEleId("gia").value;
    let hinhAnh = getEleId("hinhAnh").value;
    let proDuct = new Product("", tenSP, gia, hinhAnh);
    utils.callApi('SanPham', "POST", proDuct)
        .then((result) => {
            getListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
})

window.changeProduct = changeProduct;
function changeProduct(id) {
    utils.callApi(`SanPham/${id}`, "GET", null)
        .then((result) => {
            let proDuct = new Product(result.data.id, result.data.tenSP, result.data.gia, result.data.hinhAnh);
            getEleId("maSP").value = proDuct.id;
            getEleId("tenSP").value = proDuct.tenSP;
            getEleId("gia").value = proDuct.gia;
            getEleId("hinhAnh").value = proDuct.hinhAnh;
            getEleId("btnThem").disabled = true;
            getEleId("btnCapNhat").addEventListener("click", () => {
                let id = getEleId("maSP").value;
                let tenSP = getEleId("tenSP").value;
                let gia = getEleId("gia").value;
                let hinhAnh = getEleId("hinhAnh").value;
                let proDuct = new Product(id, tenSP, gia, hinhAnh);
                utils.callApi(`SanPham/${proDuct.id}`, "PUT", proDuct);
                getListProduct();
                getEleId("btnThem").disabled = false;
                getEleId("maSP").value = "";
                getEleId("tenSP").value = "";
                getEleId("gia").value = "";
                getEleId("hinhAnh").value = "";
            })
        })
        .catch((err) => {
            console.log(err);
        })

}
