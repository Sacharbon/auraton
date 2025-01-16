export async function postComment(comment: string, authorId: number, eventId: number) {
  const url = 'http://localhost:3000/events/';
  const route = '/comment';
  const data = JSON.stringify({comment: comment, authorId: authorId});

  const req = await fetch(url + eventId + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });
  return await req.json();
}
