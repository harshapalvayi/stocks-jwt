export class User {
  public userid?: number;
  public username: string;
  public password: string;
  public email?: string;
}


export class UserToken {
  public id?: number;
  public name?: string;
  public jwtToken?: string;
  public type?: string;
  public email?: string;
}
