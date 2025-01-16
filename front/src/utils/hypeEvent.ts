import { getEvents } from './getEvents';

export async function hypeEvent() {
  try {
    const events = await getEvents();

    if (!Array.isArray(events)) {
      throw new Error("Invalid data: expected an array of events");
    }

    events.sort((a, b) => (b.like || 0) + (b.registeredUsers.length || 0) - (a.like || 0) - (a.registeredUsers.length || 0));
    return events[0];
  } catch (error) {
    console.error("Error fetching or sorting events:", error);
    return [];
  }
}
