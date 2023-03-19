import { BaseService } from "./BaseService";
class OrderService extends BaseService {
  getOrder = () => {
    return this.get("orders");
  };
  getOrderByRestaurantId = (id) => {
    return this.get(`orders/restaurant/${id}`);
  };
  getOrderById = (id) => {
    return this.get(`orders/${id}`);
  };
  updateOrder = (model) => {
    return this.put(`orders/status`, model);
  };
}

export const orderService = new OrderService();
