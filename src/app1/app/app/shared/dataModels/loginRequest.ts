// request object to pass login details
export class LoginRequest {
    userId: string;
    password: string;

    // default values of few properties corrosponds to the pre-selected radio buttons on default page load
    constructor() {
        this.userId = null;
        this.password = null;
    }
}

