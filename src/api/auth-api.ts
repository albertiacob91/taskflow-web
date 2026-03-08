import { http } from './http';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export async function loginRequest(payload: LoginPayload) {
  const { data } = await http.post<LoginResponse>('/auth/login', payload);
  return data;
}