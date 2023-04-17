export class User {
    // Properties should match with backend
    UserId: number;
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Company: string;
    Address: string;
    Email: string;
    Phone: string;
    IsAdmin: boolean;
    ImageURL: string;
    Token: string;

    constructor() {
        this.UserId = 0;
        this.UserName = "";
        this.Password = "";
        this.FirstName = "";
        this.LastName = "";
        this.Company = "";
        this.Address = "";
        this.Email = "";
        this.Phone = "";
        this.IsAdmin = false;
        this.ImageURL = "";
        this.Token = "";
    }
}