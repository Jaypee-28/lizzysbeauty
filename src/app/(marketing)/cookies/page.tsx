export const metadata = {
  title: "Cookie Policy | Lizzy's Beauty Studio",
};

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Cookie Policy
        </h1>
        <p className="text-gray-500 font-medium mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            This Cookie Policy explains how Lizzy's Beauty Studio uses cookies and similar tracking technologies to recognize you when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. What are Cookies?</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work securely, as well as to provide reporting information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            We use strictly necessary cookies to ensure our booking system works and to authenticate your session if you log in. We also use performance cookies to understand how visitors interact with our site so we can improve the user experience.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Managing Cookies</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            You have the right to decide whether to accept or reject non-essential cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas may be restricted.
          </p>
        </div>
      </div>
    </div>
  );
}
