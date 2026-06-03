export const metadata = {
  title: "Terms of Service | Lizzy's Beauty Studio",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-500 font-medium mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            Welcome to Lizzy's Beauty Studio. By accessing or using our website and services, you agree to be bound by the following Terms of Service. Please read them carefully before booking an appointment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Booking & Deposits</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            All appointments require a non-refundable deposit to secure your booking. The deposit amount varies by service and will be applied toward your final total.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Cancellations & Rescheduling</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We require at least 24 hours' notice to cancel or reschedule an appointment. Failure to provide sufficient notice or arriving more than 15 minutes late may result in the forfeiture of your deposit and the cancellation of your appointment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Right to Refuse Service</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We reserve the right to refuse service to anyone demonstrating inappropriate behavior or whose nail health concerns require medical attention rather than cosmetic treatment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Liability</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            Lizzy's Beauty Studio is not liable for any allergic reactions or adverse effects caused by products used during treatments, provided you did not disclose such allergies prior to the service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            For any questions regarding these Terms, please contact us at hello@lizzysbeauty.com.
          </p>
        </div>
      </div>
    </div>
  );
}
