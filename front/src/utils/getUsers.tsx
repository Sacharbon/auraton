export async function getUsers() {
  const req = await fetch("http://localhost:3000/users");
  if (!req.ok) {
    throw new Error(`HTTP error! status: ${req.status}`);
  }
  return await req.json();
}
