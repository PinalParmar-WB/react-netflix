export const loginValidation = (email, password) => {
    const emailVerified = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    const passwordVerified = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(!emailVerified){
        return "Email Address is invalid.";
    }
    if(!passwordVerified){
        return "Password is invalid";
    }
    return null;
}
export const signUpValidation = (name ,email, password) => {
    const emailVerified = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    const passwordVerified = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(name === null || name.trim() === ""){
        return "Name must be not null."
    }
    if(!emailVerified){
        return "Email Address is invalid.";
    }
    if(!passwordVerified){
        return "Password is invalid";
    }
    return null;
}