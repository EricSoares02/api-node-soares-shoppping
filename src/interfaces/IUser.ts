export type User = {
    id: string 
    first_name: string
    last_name: string
    url_img?: string
    email: string 
    password: string 
    //requests Request[]
    //comments Comments[]
    
  };
  
  export interface IUserRepositories {
  
      create(first_name: string, last_name: string, url_img: string, email: string, password: string): Promise<User>
  
      getById(id:string): Promise<User>
  
      update(newUser: User): Promise<User>

      login(email: string, password: string): Promise<User>
  
  }

  export interface ILoginRepositories {

    login(email: string, password: string): Promise<User>

}