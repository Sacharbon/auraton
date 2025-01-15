import { getUsers } from "./getUsers.tsx";

export default async function ranking() {
  const users = await getUsers();
  users.sort((a: any, b: any) => b.aura - a.aura);
  return users;
}

await ranking();
