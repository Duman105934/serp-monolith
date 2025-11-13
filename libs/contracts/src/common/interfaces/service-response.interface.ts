export interface IServiceTResponse<T> {
  status: number;
  message: string;
  data: T | null;
  errors?: Record<string, unknown> | null;
}
