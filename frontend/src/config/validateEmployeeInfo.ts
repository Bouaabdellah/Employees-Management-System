import employee from "../interfaces/employee";
import { validateBirthDate, validateEmail, validateImage, validateNames, validatePWD } from "./validation";

const validatePersonalInfo = (userInfo : employee) => {
    const firstnameValidation : boolean = validateNames(userInfo.firstname);
    const lastnameValidation : boolean = validateNames(userInfo.lastname);
    const birthdateValidation : boolean = validateBirthDate(userInfo.birthday);
    const emailValidation : boolean = validateEmail(userInfo.email);
    const pwdValidation : boolean = validatePWD(userInfo.password);
    const imageValidation : boolean = validateImage(userInfo.image_url);
    return {firstnameValidation,lastnameValidation,birthdateValidation,
    emailValidation,pwdValidation,imageValidation};
}

export default validatePersonalInfo;