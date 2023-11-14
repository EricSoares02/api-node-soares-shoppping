export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  url_img?: string;
  email: string;
  password: string;
  //requests: Request[]
  //comments: Comments[]
}
export interface Authorized{

  token:string
}