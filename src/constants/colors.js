import { ORDER_STATUSES } from "./const";

export const SELECTION_ORDER_COLOR = "#2b40f8";
export const INSPECTION_ORDER_COLOR = "#7d2bf8";

export const ORDER_CREATED_COLOR = "gold";
export const ORDER_CANCELED_COLOR = "red";
export const ORDER_CLOSED_COLOR = "blue";
export const ORDER_IN_PROCESS_COLOR = "cyan";

export function getTagColor(statusName) {
    switch (statusName) {
        case ORDER_STATUSES.CANCELED: return ORDER_CANCELED_COLOR;
        case ORDER_STATUSES.CLOSED: return ORDER_CLOSED_COLOR;
        case ORDER_STATUSES.CREATED: return ORDER_CREATED_COLOR;
        case ORDER_STATUSES.IN_PROCESS: return ORDER_IN_PROCESS_COLOR;
    }
}