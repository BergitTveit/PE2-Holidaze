export interface User {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  venueManager: boolean;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  venueManager: boolean;
}
