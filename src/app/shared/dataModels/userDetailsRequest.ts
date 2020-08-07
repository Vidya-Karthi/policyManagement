// request object to pass login details
export class UserDetailsRequest {
    private userId: string;
    public getUserId(): string {
        return this.userId;
    }
    public setUserId(value: string) {
        this.userId = value;
    }
   

    // default values of few properties corrosponds to the pre-selected radio buttons on default page load
    constructor() {
        this.userId = null;
    }
}

