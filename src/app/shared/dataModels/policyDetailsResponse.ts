// request object to pass login details
export class PolicyDetailsResponse {
    policyId: string;
    policyName: string;
    policyDetails: string;
        // default values of few properties corrosponds to the pre-selected radio buttons on default page load
    constructor() {
        this.policyId = null;
        this.policyName = null;
        this.policyDetails = null;
    }
}

