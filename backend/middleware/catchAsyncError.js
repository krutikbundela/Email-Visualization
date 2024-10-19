export default (theFunc) => (req, res, next) => {
  // Promise javascript nu function che
  //theFunc ne try block ni jem krri didhu
  //ne error aave to catch........
  //async ne try..catch maa lakhwaa nu hoi but emaa nai lakhvu pdee etlee aaa 2 lines thi thai jaai

  Promise.resolve(theFunc(req, res, next)).catch(next);
};
