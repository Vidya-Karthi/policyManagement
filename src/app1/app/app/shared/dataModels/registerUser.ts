// request object to pass login details
export class RegisterUser {
    
    private userId: string;
    public getUserId(): string {
        return this.userId;
    }
    public setUserId(value: string) {
        this.userId = value;
    }
    private password: string;
    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
    private firstName: string;
    public getFirstName(): string {
        return this.firstName;
    }
    public setFirstName(value: string) {
        this.firstName = value;
    }
    private lastName: string;
    public getLastName(): string {
        return this.lastName;
    }
    public setLastName(value: string) {
        this.lastName = value;
    }
    private dob: string;
    public getDob(): string {
        return this.dob;
    }
    public setDob(value: string) {
        this.dob = value;
    }
    private address: string;
    public getAddress(): string {
        return this.address;
    }
    public setAddress(value: string) {
        this.address = value;
    }
    private contactNo: string;
    public getContactNo(): string {
        return this.contactNo;
    }
    public setContactNo(value: string) {
        this.contactNo = value;
    }
    private emailaddress: string;
    public getEmailaddress(): string {
        return this.emailaddress;
    }
    public setEmailaddress(value: string) {
        this.emailaddress = value;
    }

    private role: string;
    public getRole(): string {
        return this.role;
    }
    public setRole(value: string) {
        this.role = value;
    }
    
    
    // default values of few properties corrosponds to the pre-selected radio buttons on default page load
    constructor() {
        this.userId = null;
        this.password = null;
        this.firstName= null;
        this.lastName = null;
        this.dob = null;
        this.address = null;
        this.contactNo = null;
        this.emailaddress = null;
    }
}

