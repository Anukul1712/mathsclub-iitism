import { listContactItems, listFaqs } from "@/lib/content-store";
import ContactContent from "./ContactContent";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [items, faqs] = await Promise.all([listContactItems(), listFaqs()]);
  return <ContactContent items={items} faqs={faqs} />;
}
