export async function newEvent(authorId: number, label: string, title: string, description: string, image: File, scheduledAt: Date) {
  const data = new FormData();
  data.append("authorId", authorId);
  data.append("label", label);
  data.append("title", title);
  data.append("description", description);
  data.append("image", image);
  data.append("scheduledAt", scheduledAt);


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

const currentDate = new Date();

const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});

for (let step = 0; step < 10; step++) {
  // Ajouter 1 seconde (1000 millisecondes) à chaque itération
  currentDate.setSeconds(currentDate.getSeconds() + 1);
  
  // Formatter la date pour votre requête
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  
  await newEvent(1, "SPORT", "Match", "venez tous les gars", file, formattedDate);
}
