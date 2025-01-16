export async function register(userId: number, eventId: number) {
  const url = 'http://localhost:3000/events/';
  const route = '/register';
  const data = JSON.stringify({userId: userId});

  const req = await fetch(url + eventId + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });
  return await req.json();
}
