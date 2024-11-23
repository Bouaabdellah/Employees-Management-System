const checkAllTrue = (validation : {}) : boolean => {
    let validInfo = true;
    for (let info in validation){
      const key = info as keyof typeof validation;
      if (!validation[key]){
        validInfo = false;
        break;
      }
    }
    return validInfo;
} 

export default checkAllTrue;