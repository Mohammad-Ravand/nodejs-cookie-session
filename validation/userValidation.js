
/**
 * register user validation
 * @param {*} user 
 * @returns 
 */
exports.registerUserValidation =  function(user){
    try {
        //validate full name
        if(user.fullName.split("").length<2){
            throw new Error("user fullName must be at least 2 words long");
        }

        //validate user email
        if(!user.email.includes('@gmail.com')){
            throw new Error("user email must be contain @gmail.com");
        }

        //validate user password
        if(user.password.length<8){
            throw new Error("user password must be at least 8 characters long");
        }

        //validate user password with repeat_password
        if(user.password != user.repeatPassword){
            throw new Error("user password and repeatPasswords do not match");
        }

        // returns result
        return {
            status: true,
            message: ''
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}


/**
 * login user validation
 * @param {*} user 
 * @returns 
 */
exports.loginUserValidation =  function(user){
    try {

        //validate user email
        if(!user.email.includes('@gmail.com')){
            throw new Error("user email must be contain @gmail.com");
        }

        //validate user password
        if(user.password.length<8){
            throw new Error("user password must be at least 8 characters long");
        }


        // returns result
        return {
            status: true,
            message: ''
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}