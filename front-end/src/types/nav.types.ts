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
    // { label: "Label nama yang ada di nav", path: "tujuan path" },
  ],
  employee: [
    // { label: "Label nama yang ada di nav", path: "tujuan path" },

  ],
  stocker: [
    // { label: "Label nama yang ada di nav", path: "tujuan path" },
  ],
};
 
export const ROLE_META: Record<Role, { label: string; color: string; chipColor: string }> = {
  manager: { label: "Manager", color: "#00e676", chipColor: "#00e67620" }, // warna chip / tulisan role di nav kanan
  admin: { label: "Admin", color: "#7c4dff", chipColor: "#7c4dff20" },
  employee: { label: "Cashier", color: "#ff9800", chipColor: "#ff980020" },
  stocker: { label: "stocker", color: "#29b6f6", chipColor: "#29b6f620" },
};