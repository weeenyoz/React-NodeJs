const errorHandler = function(err: any, req: any, res: any, next: any) {
  res.status(500).send("Something Failed");
};

export default errorHandler;
