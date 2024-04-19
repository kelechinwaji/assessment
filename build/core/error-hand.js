"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = void 0;
class info {
    static errResponse(res, status, message, error) {
        return res.status(status).json({
            status: false,
            message,
            error,
        });
    }
    static genericError(message, error) {
        return {
            status: false,
            message,
            error,
        };
    }
    static okResponse(res, status, message, data) {
        return res.status(status).json({
            status: true,
            message,
            data,
        });
    }
}
exports.info = info;
