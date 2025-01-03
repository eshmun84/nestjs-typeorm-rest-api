export interface IApiResponse<T> {
  status: string;
  code: number;
  method: string;
  path: string;
  data: T;
}
