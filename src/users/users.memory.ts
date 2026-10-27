export type Role = 'admin' | 'coordinador' | 'recepcionista';

export interface TestUser {
  id: string;
  role: Role;
}

export const TEST_USERS: TestUser[] = [
  { id: 'ana.admin', role: 'admin' },
  { id: 'luis.coordinador', role: 'coordinador' },
  { id: 'maria.recepcionista', role: 'recepcionista' },
  { id: 'carlos.recepcionista', role: 'recepcionista' },
];