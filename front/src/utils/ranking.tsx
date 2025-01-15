import { getUsers } from './getUsers.tsx'

export async function ranking() {
  const users = await getUsers();
  users.sort((a, b) => b.aura - a.aura);
  return users;
}
