export const isEmailValid=(email:string)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  export const isMobileNumberValid=(mobileNumber:string)=> {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobileNumber)
    
  }
  