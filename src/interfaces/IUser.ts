export type User = {
    id: string 
    first_name: string
    last_name: string
    url_img: string | null
    email: string 
    password: string 
    role: string
    storeId?: string 
    //requests Request[]
    //comments Comments[]
  };

export enum ERole {
    admin = "admin" ,
    user = "user",
    master = "mastrer"
}

export interface IUserParams{
  id: string
}

export interface IProductQuery extends IUserParams{
  first_name: string
  last_name: string
  email: string
}

  
  export interface IUserRepositories {
  
      create(first_name: string, last_name: string, url_img: string, email: string, password: string, role:string, storeId?: string ): Promise<User>
  
      getById(id:string): Promise<User>
  
      update(newUser: User): Promise<User>

      login(email: string): Promise<User>
  
  }

  export interface ILoginRepositories {

    login(email: string, password: string): Promise<User>

}