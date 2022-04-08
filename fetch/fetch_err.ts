import type { InitFetchErrorModel } from "../typings/types.ts";

export class FetchError extends Error {
  status: number;
  url: string;

  constructor(init: InitFetchErrorModel) {
    super(init.message);
    this.status = init.status;
    this.url = init.url;
  }

  toString() {
    return `Status: ${this.status}, Message: ${this.message}`;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      url: this.url,
    };
  }
}

interface FetchErrUtilRespModel {
  error: boolean;
  stack?: string;
  details: {
    fetchError: boolean;
    status: number;
    message: string;
    url: string;
  };
  detailsString?: string;
}
/** utility function to format error response to an object */
export const fetchErrUtil = (
  error: Error,
  log = true,
): FetchErrUtilRespModel => {
  if (log) {
    console.error(error);
  }
  const base = { error: true };

  // return formatted error for fetch error class
  if (error instanceof FetchError) {
    return {
      ...base,
      details: { fetchError: true, ...error.toJSON() },
      detailsString: error.toString(),
      stack: error.stack,
    };
  }

  // return default error
  return {
    ...base,
    details: { fetchError: false, status: 0, message: error.message, url: "" },
    stack: error.stack,
  };
};
