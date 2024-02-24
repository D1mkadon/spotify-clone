export interface sessionProps {
    access_token: string;
    expires: string;
    expires_at: number;
    id: string;
    refresh_token: string;
    user: {
      email: string;
      name: string;
    };
  }