export async function register(userId: number) {
  const url = 'http://localhost:3000/events/';
  const route = '/register';
  const data = JSON.stringify({userId: userId});

  const req = await fetch(url + userId + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });
  return await req.json();
}
