const notFoundMiddleware = (req, res) => {
  res.status(404).send("404:Route does not exist");
}

export default notFoundMiddleware;