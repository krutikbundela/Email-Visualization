// export const errorHandler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return error;
// };


//  class className extends 
class errorHandler extends Error {
  //constructor banaviyoo

  constructor(message, statusCode) {
    super(message); //super "Error" class no constructor che .....j errormesg return krse

    this.statusCode = statusCode; //this.(aapna code no status code set krse)....j constructor(,"statusCode") return krse
    //right to left store krseee

    // Error class ni method che
    Error.captureStackTrace(this, this.constructor); // j navii value aavi constructor(message,statusCode) maaa te "this" ma store krri
  }
}

export default errorHandler;
