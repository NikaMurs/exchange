"use strict";

let userForm = new UserForm;

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (func) => {
        if (func.success === true){
            location.reload()
        } else {
            userForm.setLoginErrorMessage(func.error)
        }
    })
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (func) => {
        if (func.success === true){
            location.reload()
        } else {
            userForm.setRegisterErrorMessage(func.error)
        }
    })
}