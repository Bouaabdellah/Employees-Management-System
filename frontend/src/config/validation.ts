export const validateEmail = (email : string) : boolean => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEmail.test(email);
}
export const validatePWD = (pwd : string) : boolean => {
    const validation = [/[a-z]/g,/[A-Z]/g,/[0-9]/g,/[$@$!%*#.?&-_]/g];
    let stepsValidation = 0;
    validation.forEach((ele : RegExp) : void => {
      if (ele.test(pwd))
        stepsValidation++;
    });
    return validation.length === stepsValidation && pwd.length >= 8 && pwd.length <=16;
}