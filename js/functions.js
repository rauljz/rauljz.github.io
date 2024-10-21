/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

let f = document.getElementById("formulario");
f.addEventListener("submit", checkData);
function checkData(evt) {
    let ok = true;
    let name = document.getElementById("name").value;
    if (name === "") {
        alert("El nombre es obligatorio");
        evt.preventDefault();
        ok = false;
    }
    return ok;
}
