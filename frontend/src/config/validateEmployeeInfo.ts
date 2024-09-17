import employee from "../interfaces/employee";
import { validateBirthDate, validateEmail, validateNames, validatePWD } from "./validation";

const validatePersonalInfo = (userInfo : employee) => {
    const firstnameValidation : boolean = validateNames(userInfo.firstname);
    const lastnameValidation : boolean = validateNames(userInfo.lastname);
    const birthdateValidation : boolean = validateBirthDate(userInfo.birthday);
    const emailValidation : boolean = validateEmail(userInfo.email);
    const pwdValidation : boolean = validatePWD(userInfo.password);
    return {firstnameValidation,lastnameValidation,birthdateValidation,emailValidation,pwdValidation};
}

export default validatePersonalInfo;