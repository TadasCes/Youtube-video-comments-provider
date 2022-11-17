export function returnSuccess(result, res) {
  return res.json({
    status: 200,
    message: result,
  });
}

export function returnError(error, res) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  return res.json({
    status: status,
    message: message,
  });
}
