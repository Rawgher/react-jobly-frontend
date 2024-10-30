import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Get all company information
  static async getCompanies(params) {
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  // Get all jobs information
  static async getJobs(params) {
    let res = await this.request(`jobs`, params);
    return res.jobs;
  }

  // Sign Up User
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  // Login User
  static async login(data) {
    let res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  // Get User information
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Update a User
  static async updateUser(data) {
    const username = data.username;

    const validData = {...data};
    delete validData.username;

    let res = await this.request(`users/${username}`, validData, "PATCH");
    return res.user;
  }

  // Apply to job
  static async applyToJob(jobId, username) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
    return res.applied;
  }

}
export default JoblyApi;