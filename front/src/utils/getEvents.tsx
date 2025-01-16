export async function getEvents() {
  const url = "http://localhost:3000";
  const address = "/events";
  const req = await fetch(url + address);
  if (!req.ok) {
    throw new Error(`HTTP error! status: ${req.status}`);
  }
  return await req.json();
}

export async function getEvent(eventId: number) {
  const url = "http://localhost:3000";
  const address = "/events/";
  const req = await fetch(url + address + eventId);
  if (!req.ok) {
    throw new Error(`HTTP error! status: ${req.status}`);
  }
  return await req.json();
}
