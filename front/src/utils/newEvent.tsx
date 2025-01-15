export async function newEvent(authorId: number, label: string, title: string, description: string, image: File) {
  const data = new FormData();
  data.append("authorId", authorId);
  data.append("label", label);
  data.append("title", title);
  data.append("description", description);
  data.append("image", image);


  const postEventUrl = "http://localhost:3000/events"; 

  const req = await fetch(postEventUrl, {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: data 
  });
  return await req.json();
}
