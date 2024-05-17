/* eslint-disable */
import { getServerSession } from "next-auth";

import { API_URL } from "@/lib/const";
import { authOptions } from "@/lib/authOptions";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONTENT_TOO_LARGE = 413,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessage {
  OK = "OK",
  CREATED = "Created",
  NO_CONTENT = "No Content",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  NOT_FOUND = "Not Found",
  CONTENT_TOO_LARGE = "File too large",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
}

/**
 * ApiService is a singleton class that provides methods to interact with the API.
 */
export class ApiService {
  static _instance: ApiService;

  _baseURL: string;
  _token?: string;
  _defaultHeaders: any;

  private constructor() {
    this._baseURL = API_URL + "/client-app";

    this._defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  // Define ApiService as a singleton
  static getInstance(): ApiService {
    if (!ApiService._instance) {
      ApiService._instance = new ApiService();
    }

    return ApiService._instance;
  }

  get baseURL(): string {
    return this._baseURL;
  }

  async get<T>(
    path: any,
    nextConfig?: NextFetchRequestConfig,
    authenticated: boolean = true
  ): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.GET,
      headers: await this.getHeaders(authenticated),
      next: nextConfig,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    path: string,
    data: any,
    nextConfig?: NextFetchRequestConfig,
    authenticated: boolean = true
  ): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.POST,
      headers: await this.getHeaders(authenticated),
      body: JSON.stringify(data),
      next: nextConfig,
    });
    return this.handleResponse<T>(response);
  }

  async postFormData<T>(
    path: string,
    formData: FormData,
    authenticated: boolean = true
  ): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.POST,
      headers: await this.getHeaders(authenticated, false),
      body: formData,
    });

    return this.handleResponse<T>(response);
  }

  // eslint-disable-next-line
  async patch<T>(
    path: string,
    data: any,
    nextConfig?: NextFetchRequestConfig,
    authenticated: boolean = true
  ): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.PATCH,
      headers: await this.getHeaders(authenticated),
      body: JSON.stringify(data),
      next: nextConfig,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    path: string,
    data: any,
    nextConfig?: NextFetchRequestConfig,
    authenticated: boolean = true
  ): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.PUT,
      headers: await this.getHeaders(authenticated),
      body: JSON.stringify(data),
      next: nextConfig,
    });

    return this.handleResponse(response);
  }

  async delete(
    path: string,
    nextConfig?: NextFetchRequestConfig,
    authenticated: boolean = true
  ): Promise<void> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: HTTPMethod.DELETE,
      headers: await this.getHeaders(authenticated),
      next: nextConfig,
    });

    return this.handleResponse(response);
  }

  private async getHeaders(
    authenticated: boolean = true,
    defaultHeaders: boolean = true
  ): Promise<any> {
    if (!authenticated) return this._defaultHeaders;

    if (!this._token) {
      const session = await getServerSession(authOptions);

      console.log(session?.user);
      //   if (session?.token) this.token = session.token;
    }

    return {
      ...(defaultHeaders && this._defaultHeaders),
      ...(authenticated &&
        this._token && { Authorization: `JWT ${this._token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T | any> {
    switch (response.status) {
      case HTTPStatus.OK:
      case HTTPStatus.CREATED:
      case HTTPStatus.NO_CONTENT:
        return await this.handleResponseType<T>(response);
      default:
        throw new Error(await response.text());
    }
  }

  private async handleResponseType<T>(response: Response): Promise<T | any> {
    const headers = response.headers.get("Content-Type");

    if (headers?.match(/application\/json/)) {
      return await response.json();
    } else if (headers?.match(/application\/pdf/)) {
      return await response.blob();
    }
  }

  set token(value: string) {
    this._token = value;
  }
}

const api = ApiService.getInstance();

export default api;
/* eslint-enable */
