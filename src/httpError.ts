import { Response } from 'node-fetch';

export class HTTPError extends Error {
  status: number;
  response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(response.statusText).stack;
    }
    this.status = response.status;
    this.response = response;
  }
}
