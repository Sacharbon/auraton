import { getEvents } from './getEvents.tsx'

export async function nextEvents() {
  const events = await getEvents();

  //for developement only
  let dt = Date.now();
  events.forEach(element => {
    element.scheduledAt = dt += 40; 
  });

  events.sort((a: any, b: any) => b.scheduledAt - a.scheduledAt);
  return events.slice(0, 3);
}
