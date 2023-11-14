export const API_VERSION_1 = 'v1';
export const baseURL = `/api/${API_VERSION_1}`;
export const SERVER_URL = `${process.env.REACT_APP_API_URL}${baseURL}`;

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const UPDATE = 'update';
export const DELETE = 'delete';
export const PATCH = 'patch';
