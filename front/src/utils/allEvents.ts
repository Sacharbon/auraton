import { getEvents } from './getEvents'

export async function allEvents() {
  const events = await getEvents();

  events.sort((a: any, b: any) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  return events;
}
