export type User = {
    id: string 
    first_name: string
    last_name: string
    url_img?: string | null
    email: string 
    password: string 
    role: string
    storeId?: string | null
    //requests Request[]
    //comments Comments[]
  };

export enum ERole {
    admin = "admin" ,
    user = "user",
    master = "master",
    elder = "elder"
}
export enum EEspecialRole {
  admin = "admin" ,
  master = "master",
}
export enum ENormalRole {
    user = "user",
    elder = "elder"
}

export interface IUserParams{
  id: string
}

export interface IRequestCreateUser{
  creator?: {
    id: string,
    role: string
  }
  data: User
}
export interface ILogin{
  email: string
  password: string
}


export interface IUserRepositories {
  
      create(first_name: string, last_name: string, url_img: string, email: string, password: string, role:string, storeId?: string ): Promise<User>
  
      getById(id:string): Promise<Partial<User>>
  
      update(newUser: User): Promise<User>

      login(email: string): Promise<User>
  
  }