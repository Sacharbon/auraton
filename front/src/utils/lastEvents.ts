import { getEvents } from './getEvents'

export async function lastEvents() {
  const events = await getEvents();

  events.filter((event: any) => new Date(event.scheduledAt).getTime() - Date.now() < 0)
  events.sort((a: any, b: any) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  const res = events.slice(0, 2);
  console.log(res);
  return res;
}

await lastEvents();
