export type Token = {
  accessToken: string;
  refreshToken: string;
  username: string;
  accessTokenExpires: number;
};

export type User = {
  accessToken: string;
  email: string;
  image: string;
  name: string;
  refreshToken: string;
  userName: string;
};

export type Account = {
  access_token: string;
  refresh_token: string;
  providerAccountId: string;
  expires_at: number;
};

export type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};
