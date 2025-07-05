
export interface ResponsePayload<T> {
  success: boolean;
  document: T;
  error: Error;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface Error {
  status: number;
  message: string;
  suggestions: any[];
}
