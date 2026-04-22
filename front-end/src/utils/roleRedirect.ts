// utils/roleRedirect.ts  ← bisa dipisah ke file sendiri
export type UserRole = 'MANAGER' | 'ADMIN' | 'STOCKER' | 'EMPLOYEE';

export function getRoleDefaultPath(role?: UserRole): string {
  switch (role) {
    case 'MANAGER':  return '/manager';
    case 'ADMIN':    return '/employee';
    case 'STOCKER':  return '/stock';
    case 'EMPLOYEE': return '/pos';
    default:         return '/pos'; // fallback aman
  }
}