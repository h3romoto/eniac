const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg:'There was an error. Try again later'});
}

export default errorHandlerMiddleware;