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

export const validateNames = (name : string) : boolean => {
    const regName = /^[A-Za-z]+$/;
    return name.length <= 20 && regName.test(name);
}

export const validateBirthDate = (date : string) : boolean => {
    const givenDate : Date = new Date(date);
    const now : Date = new Date();
    let diffYears : number = now.getFullYear() - givenDate.getFullYear();
    if ((givenDate.getMonth() > now.getMonth()) ||
    (givenDate.getMonth() === now.getMonth() && givenDate.getDay() > now.getDate()))
    diffYears--;
    return diffYears >= 18;
}