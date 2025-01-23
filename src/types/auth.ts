export interface User {
    name: string;
    email: string;
    avatar: string;
    venueManager: boolean;
    accessToken: string;
  }
  
  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }