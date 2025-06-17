import config from "../config/config";
import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("appwrite:: Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    await this.logout(); // Ensure any existing session is cleared
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("appwrite:: Error logging in:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite:: Error getting current user:", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("appwrite:: Error logging out:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
// This code initializes the Appwrite client and provides methods for user authentication.
// It includes methods for creating an account, logging in, getting the current user, and logging out.
