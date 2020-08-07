// request object to pass login details
export class LoginResponse {
    userId: string;
    userStatus: string;
    responseStatus: string;
    role: string;

    // default values of few properties corrosponds to the pre-selected radio buttons on default page load
    constructor() {
        this.userId = null;
        this.userStatus = null;
        this.responseStatus = null;
        this.role = null;
    }
}

