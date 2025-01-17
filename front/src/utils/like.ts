import { getEvent } from './getEvents';

export async function like(eventId: number, userId: number) {
  const url = 'http://localhost:3000/events/';
  
  try {
    const event = await getEvent(eventId);

    const req = await fetch(url + eventId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: event.likes + 1, userId: userId })
    });

    return await req.json();
  } catch (error) {
    console.error("Error liking the event:", error);
    throw error;
  }
}
