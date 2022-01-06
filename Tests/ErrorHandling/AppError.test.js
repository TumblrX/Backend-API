const AppError = require('../../controllers/utils/appError');

describe('AppError', () => {
    it('should be an operational error', () => {
        const err=new AppError('error message', 400);
        expect(err.isOperational).toBe(true);
    });
    it('should provide status code', () => {
        const err=new AppError('error message', 400);
        expect(err.statusCode).toBe(400);
    });
    it('should provide a message', () => {
        const err=new AppError('error message', 400);
        expect(err.message).toMatch(/error message/);
    });

    it('should be in fail status for 4xx errors', () => {
        const err=new AppError('error message', 400);
        expect(err.status).toMatch(/fail/);
    });

    it('should be in fail status for 5xx errors', () => {
        const err=new AppError('error message', 500);
        expect(err.status).toMatch(/error/);
    });

    it('should be default to server error', () => {
        const err=new AppError('error message');
        expect(err.statusCode).toBe(500);
    });
});
