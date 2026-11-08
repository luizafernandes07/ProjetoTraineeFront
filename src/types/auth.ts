export type PerfilUsuario = 'ADMIN' | 'VOLUNTARIO' | 'CLIENTE';

export interface LoginCredentials {
  email: string;
  senha?: string;
  password?: string;
  pass?: string;
}

export interface User {
  id: string | number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface AuthResponse {
  token: string;
  user?: User;
  usuario?: User;
  mensagem?: string;
}
