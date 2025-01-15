import { getEvent } from './getEvents.tsx';

export async function hypeEvents() {
  const events = getEvents();
  events.sort((a, b) => (b.like + b.registeredUsers.length()) - (a.like + a.registeredUsers.length()))
  return events[0];
}
