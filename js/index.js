// Function
$.saveLS = (key = "employeeList", listEmployee = totalEmployees) => {
  localStorage.setItem(key, JSON.stringify(listEmployee));
};

$.getLS = (key = "employeeList") => {
  let data = localStorage.getItem(key);
  return JSON.parse(data) ? JSON.parse(data) : [];
};

$.renderEmployee = (arr=totalEmployees) => {
  let content = "";
  arr.forEach((element) => {
    let { tknv, name, email, datepicker, chucvu } = element;
    let copiedEmployee = new Staff();
    Object.assign(copiedEmployee, element);

    let position = $(`#${chucvu}`).text()
    let salary = copiedEmployee.calSalary();
    let classification = copiedEmployee.classify();
    content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${position}</td>
            <td>${salary}</td>
            <td>${classification}</td>
            <td style="vertical-align:middle;">
                <div class="d-flex">
                    <button class="btn btn-primary modify" data-toggle="modal"
                    data-target="#myModal" onclick="$.getValueInfo('${tknv}');">Modify</button>
                    <button class="btn btn-danger delete" onclick="$.deleteStaff('${tknv}');">Delete</button>
                </div>
        </tr>
        `;
    
  });
  $("#tableDanhSach").html(content);
};

$.getInfo = () => {
  let arrFields = $("#formStaffManagement input, #formStaffManagement select");
  let employee = new Staff();
  let isValid = true;
  for (const element of arrFields) {
    let { id, value } = element;
    let span_id = $(`#${id}`).parent()[0].nextElementSibling.id;
    if (id == "tknv") {
      isValid &= $.checkAccount(span_id, value);
    }
    if (id == "name") {
      isValid &= $.checkName(span_id, value);
    }
    if (id == "email") {
      isValid &= $.checkEmail(span_id, value);
    }
    if (id == "password") {
      isValid &= $.checkPassword(span_id, value);
    }
    if (id == "luongCB") {
      isValid &= $.checkSalary(span_id, value);
    }
    if (id == "chucvu") {
      $("#chucvu")
        .on("change", function () {
          let str = $("select option:selected").text();
          isValid &= $.checkPosition(span_id,$.removeVietnameseTones(str).trim().toLowerCase())
        })
        .trigger("change");
    }
    if (id == "gioLam") {
      isValid &= $.checkWorkingHours(span_id, value);
    }
    if (id == "datepicker") {
      isValid &= $.checkDateTimeFormat(span_id, value);
    }
    
    employee[id] = value;
    employee.classify()
  }
  if (!isValid) {
    return;
  }
  
  $.saveLS();
  return employee;
};

$.getValueInfo = (tk) => {
  $(".form-group > span").css({ display: "none" });
  $("#btnThemNV").prop('disabled', true);
  let arrFields = $("#formStaffManagement input, #formStaffManagement select");
  let staff = totalEmployees.find((element) => {
    return element.tknv == tk;
  })
  for (const element of arrFields) {
    let {id} = element
    element.value = staff[id]
    if(id=="tknv"){
      element.readOnly = true
    }
  }
  return staff
}

$.deleteStaff = (tk) => {
  let index = totalEmployees.findIndex((value, idx) => {
    return value.tknv == tk
  })
  if (index != -1){
    totalEmployees.splice(index,1)
    $.saveLS();
    $.renderEmployee();
  }
}

// Main
let totalEmployees = $.getLS();
$.renderEmployee();

// Add Employee
$("#btnThem").click(function (e) {
  e.preventDefault();
  $("#formStaffManagement").trigger("reset");
  $(".form-group > span").css({ display: "none" });
  $("#btnThemNV").prop('disabled', false);
  $("#tknv").prop('readOnly',false)
});

$("#btnThemNV").click(function (e) {
  e.preventDefault();
  let employee = $.getInfo();
  if (employee) {
    totalEmployees.push(employee);
    $.saveLS();
    $.renderEmployee();
    $("#formStaffManagement").trigger("reset");
    $("#myModal").modal("hide");
  }
});

$("#btnCapNhat").click(function (e) { 
  e.preventDefault();
  let current_employee = $.getInfo();
  let index = totalEmployees.findIndex((value, idx) => {
    return value.tknv == current_employee.tknv
  })
  
  if(index != -1){
    totalEmployees[index] = current_employee;
  }
  $.saveLS();
  $.renderEmployee();
  $("#formStaffManagement").trigger("reset");
  $("#myModal").modal("hide");
});

$("#searchName").on("input", function (e) {
  e.preventDefault();
  let newKey = $.removeVietnameseTones(e.target.value).trim().toLowerCase();
  let arrFilter = totalEmployees.filter((item,index) => {
    let newStaff = $.removeVietnameseTones(item.xeploai).trim().toLowerCase();
    return newStaff.includes(newKey)
  })
  $.renderEmployee(arrFilter)
});

