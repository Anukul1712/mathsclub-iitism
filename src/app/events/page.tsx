import { listEvents } from "@/lib/content-store";
import EventsBrowser from "./EventsBrowser";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  return <EventsBrowser initialEvents={await listEvents()} />;
}
