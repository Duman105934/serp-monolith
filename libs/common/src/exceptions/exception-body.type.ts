export type ExceptionBody = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  [key: string]: unknown;
};
