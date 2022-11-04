import { ORDER_STATUSES } from "../../constants/const";

export function getTagColorForOrderStatus(statusName) {
  switch (statusName) {
    case ORDER_STATUSES.CANCELED: return "red";
    case ORDER_STATUSES.CLOSED: return "blue";
    case ORDER_STATUSES.CREATED: return "gold";
    case ORDER_STATUSES.IN_PROCESS: return "cyan";
  }
}