interface ErrorObject {
    code: number;
    description: string;
}

interface ErrorResponse {
    success: false;
    message: string;
    error: ErrorObject;
}

export function customErrorMessage(error: Error): ErrorResponse {
    return {
        success: false,
        message: error.message || 'something went wrong',
        error: {
            code: 404,
            description: error.message || 'something went wrong',
        },
    };
}

