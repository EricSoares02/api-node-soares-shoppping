import { User } from "./user";


export interface IUserRepository {
    
    create(data: User): Promise<Partial<User>>;
    
    update(data: User): Promise<Partial<User>>;

    get(id: string): Promise<Partial<User> | null>;
  
    getByEmail(email: string): Promise<Partial<User> | null>;

    delete(id: string): Promise<void>
  
  }