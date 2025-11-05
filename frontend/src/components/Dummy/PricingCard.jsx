// components/PricingCard.js
export default function PricingCard({ service }) {
  if (!service) return null;

  return (
    <section className="bg-gray-100 py-16" id="pricing">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {service.title} Pricing
        </h2>
        <p className="text-gray-600 mb-8">
          Packages start from <strong>{service.basePrice}</strong>
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-8 inline-block text-left">
          <ul className="space-y-3">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✔</span> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
