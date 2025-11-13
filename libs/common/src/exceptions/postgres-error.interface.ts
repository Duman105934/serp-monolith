export interface IPostgresError {
  code?: string;
  message?: string;
  detail?: string;
  constraint?: string;
}
