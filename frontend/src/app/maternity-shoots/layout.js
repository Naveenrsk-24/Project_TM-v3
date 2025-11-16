// app/weddings/layout.js
import { getServiceBySlug } from "@/lib/services-data";
import { generateMetadata as generateSEO } from "@/lib/seo-utils";
import { PAGE_TYPES } from "@/lib/cluster-resolver";

export async function generateMetadata() {
  const service = getServiceBySlug("maternity-shoots");
  const resolution = { type: PAGE_TYPES.PILLAR, service };
  return generateSEO(resolution);
}

export default function WeddingsLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
