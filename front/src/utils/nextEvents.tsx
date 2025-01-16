import { getEvents } from './getEvents.tsx'

export async function nextEvents() {
  const events = await getEvents();

  events.sort((a: any, b: any) => new Date(b.scheduledAt) - new Date(a.scheduledAt));
  return events.slice(0, 3);
}
