export type Role = "manager" | "admin" | "employee" | "stocker";
 
export interface NavItem {
  label: string;
  path: string;
}
 
export const NAV_CONFIG: Record<Role, NavItem[]> = {
  manager: [
    { label: "Dashboard", path: "/manager" },
    { label: "Financial Reports", path: "/manager/FinancialReports" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Settings", path: "/admin/settings" },
    { label: "Audit Log", path: "/admin/audit" },
  ],
  employee: [
    { label: "Dashboard", path: "/employee" },
    { label: "Transaction", path: "/employee/transaction" },
    { label: "History", path: "/employee/history" },
  ],
  stocker: [
    { label: "Dashboard", path: "/stocker" },
    { label: "Stock In", path: "/stocker/stock-in" },
    { label: "Purchase Order", path: "/stocker/purchase-order" },
    { label: "Stock Log", path: "/stocker/stock-log" },
  ],
};
 
export const ROLE_META: Record<Role, { label: string; color: string; chipColor: string }> = {
  manager: { label: "Manager", color: "#00e676", chipColor: "#00e67620" },
  admin: { label: "Admin", color: "#7c4dff", chipColor: "#7c4dff20" },
  employee: { label: "Cashier", color: "#ff9800", chipColor: "#ff980020" },
  stocker: { label: "stocker", color: "#29b6f6", chipColor: "#29b6f620" },
};