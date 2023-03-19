import { BaseService } from "./BaseService";

class NotificationService extends BaseService {
  getNotification = (id) => {
    return this.get(`notifications/byaccount/${id}`);
  };
}

export const notificationService = new NotificationService();
