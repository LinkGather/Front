export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData extends SigninData {
  name: string;
  passwordCheck: string;
}

export interface submitPostData {
  url: string;
  title: string;
  description: string;
}
