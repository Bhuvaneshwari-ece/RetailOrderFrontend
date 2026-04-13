export interface User { 
    id: number; 
    username: string; 
    role: 'Admin' | 'Customer'; 
    token?: string; // JWT token (after login) 
}