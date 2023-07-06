const generateOTP = (): string => {
    const digits: string = '0123456789';
    let OTP: string = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  export default generateOTP