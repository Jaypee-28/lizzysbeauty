export const metadata = {
  title: "Privacy Policy | Lizzy's Beauty Studio",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500 font-medium mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            At Lizzy's Beauty Studio, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our website or services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We collect information that you provide directly to us when booking an appointment, filling out a contact form, or subscribing to our newsletter. This may include your name, email address, phone number, and payment information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We use the information we collect to process your bookings, send appointment confirmations and reminders, respond to your inquiries, and send marketing communications if you have opted in.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We do not sell or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website or conducting our business, such as payment processors (e.g., Stripe).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Security</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            If you have any questions or concerns about our Privacy Policy, please contact us at hello@lizzysbeauty.com.
          </p>
        </div>
      </div>
    </div>
  );
}
