import { BaseService } from "./BaseService";

class LoginService extends BaseService {
  login = (model) => {
    return this.post(`staffs/login`, model);
  };
}

export const loginService = new LoginService();
