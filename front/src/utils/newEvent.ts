export async function newEvent(authorId: number, label: string, title: string, description: string, image: File | null, scheduledAt: string) {
  const data = new FormData();
  data.append("authorId", authorId.toString());
  data.append("label", label);
  data.append("title", title);
  data.append("description", description);
  if (image) {
    data.append("image", image);
  }
  data.append("scheduledAt", scheduledAt);


  const postEventUrl = "http://localhost:3000/events"; 

  console.log("data", data);
  const req = await fetch(postEventUrl, {
    method: "POST",
    body: data 
  });
  return await req.json();
}