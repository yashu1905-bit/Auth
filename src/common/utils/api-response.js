class ApiResponse {
  static ok(res, message, data = null) {
    return res.status(200).json({ success: true, message, data });
  }

  static created(res, message, data = null) {
    return res.status(201).json({ success: true, message, data });
  }

  static badRequest(res, message, data = null) {
    return res.status(400).json({ success: false, message, data });
  }

  static internalError(res, message = "Internal Server Error", data = null) {
    return res.status(500).json({ success: false, message, data });
  }
}




export default ApiResponse