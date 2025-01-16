import { getEvents } from './getEvents.tsx'

export async function lastEvents() {
  const events = await getEvents();

  events.filter((event) => new Date(event.scheduledAt) - Date.now() < 0)
  events.sort((a: any, b: any) => new Date(b.scheduledAt) - new Date(a.scheduledAt));
  const res = events.slice(0, 2);
  console.log(res);
  return res;
}

await lastEvents();
