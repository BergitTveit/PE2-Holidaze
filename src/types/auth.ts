export interface IUser {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
  bio?: string; // Optional fields
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
}
