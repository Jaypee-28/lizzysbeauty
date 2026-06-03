import { MapPin, Phone, Mail } from "lucide-react";
import { BookingCta } from "@/components/home/booking-cta";

export const metadata = {
  title: "Contact Us | Lizzy's Beauty Studio",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Get In <span className="text-[#FF4D8D]">Touch</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Have a question about a service, or need help booking? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Contact Information</h2>
              <ul className="space-y-8">
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF4D8D] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Our Studio</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      18620 Reliant Dr<br />
                      Gaithersburg, MD 20879
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF4D8D] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                    <p className="text-gray-500 font-medium">+1 301-250-0602</p>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF4D8D] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                    <p className="text-gray-500 font-medium">hello@lizzysbeauty.com</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Studio Hours</h2>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Monday - Friday</span>
                  <span className="text-gray-900 font-bold">9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Saturday</span>
                  <span className="text-gray-900 font-bold">10:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>Sunday</span>
                  <span className="text-[#FF4D8D] font-bold">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-pink-500/5 border border-gray-100 h-max">
            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full rounded-xl border-gray-200 py-3 px-4 focus:ring-[#FF4D8D] focus:border-[#FF4D8D] bg-gray-50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full rounded-xl border-gray-200 py-3 px-4 focus:ring-[#FF4D8D] focus:border-[#FF4D8D] bg-gray-50 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full rounded-xl border-gray-200 py-3 px-4 focus:ring-[#FF4D8D] focus:border-[#FF4D8D] bg-gray-50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full rounded-xl border-gray-200 py-3 px-4 focus:ring-[#FF4D8D] focus:border-[#FF4D8D] bg-gray-50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full rounded-xl border-gray-200 py-3 px-4 focus:ring-[#FF4D8D] focus:border-[#FF4D8D] bg-gray-50 transition-colors resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-[#FF4D8D] transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Full-width Map */}
        <div className="mt-16 w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
          <iframe 
            src="https://maps.google.com/maps?q=18620+Reliant+Dr,+Gaithersburg,+MD+20879&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      <BookingCta />
    </div>
  );
}
