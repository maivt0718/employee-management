$.checkAccount = (span, value) => {
    let regex = /\d/g;
    if (value.match(regex) && value.match(regex).length >= 4 && value.match(regex).length <= 6) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("This account is required at least 4 and most 6 digits");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkName = (span, value) => {
    let regex = /\d/g;
    if (! value.match(regex) && value.length > 0) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("This name is not blank and is alphabetic");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkEmail = (span, value) => {
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value.match(regex) && value.length > 0) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("This email is not correct in format");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkPassword = (span, value) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (value.match(regex) && value.length > 0) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("This password is needed at least 1 digit, 1 uppercase letter, 1 special letter and its length is at least 6 to 10 characters");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkSalary = (span, value) => {
    if (value.length > 0 && value >= 1000000 && value <= 20000000) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("The salary must be between 1000000 and 20000000");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkPosition = (span, value) => {
    if (["truong phong", "nhan vien", "sep"].includes(value)) { 
        $(`#${span}`).html("");
        return true
    } 
    
    $(`#${span}`).html("The salary must be in [\"truong phong\", \"nhan vien\", \"giam doc\"]");
    $(`#${span}`).css({"display": "block"})
    return false;
}
$.checkWorkingHours = (span, value) => {
    if (value.length > 0 && value >= 80 && value <= 200) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("The working hours must be between 80 and 200");
    $(`#${span}`).css({"display": "block"})
    return false;
}

$.checkDateTimeFormat = (span,value) => {
    let regex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    if (value.match(regex) && value.length > 0) { 
        $(`#${span}`).html("");
        return true
    } 
    $(`#${span}`).html("This datetie is not blank and is formated under DD/MM/YYYY");
    $(`#${span}`).css({"display": "block"})
    return false;
}
