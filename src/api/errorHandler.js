// Custom Error class for network errors
export class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}

// Custom Error class for resource not found errors
export class NotFoundError extends Error {
    constructor() {
        super("The resource you requested was not found.");
    }
}

// Custom Error class for server errors
export class ServerError extends Error {
    constructor() {
        super("There was a server error.");
    }
}

// Function to handle common errors based on the status code of an HTTP response
export function handledError(status) {
    if (status === 400) {
        // If the status code is 400, throw a NotFoundError
        throw new NotFoundError();
    } else if (status === 500) {
        // If the status code is 500, throw a NetworkError
        throw new NetworkError();
    }
}

// Function to throw a specific error if one is caught, or a NetworkError if not
export function throwSpecificError(err) {
    if (err instanceof ServerError || err instanceof NotFoundError) {
        // If the caught error is a ServerError or NotFoundError, re-throw it
        throw err;
    }
    // If the caught error is not a ServerError or NotFoundError, throw a NetworkError
    throw new NetworkError();
}
