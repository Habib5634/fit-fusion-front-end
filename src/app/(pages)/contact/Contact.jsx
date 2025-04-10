import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="px-6 md:px-16 py-12 bg-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Contact Us</h2>
      <p className="text-center text-gray-600 mt-2">
        Get in touch with us for personalized support, inquiries, or to connect with a nutritionist.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Side - Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-yellow">Reach Out to Us</h3>
          <p className="text-gray mt-2">
            If you have questions, feedback, or need assistance, feel free to reach out! We’re here to help you on your fitness journey.
          </p>

          <p className="mt-4">
            <strong>Email:</strong> support@fitfusion.com
          </p>
          <p>
            <strong>Phone:</strong> +92 345-77890
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 text-yellow-500">
      {/* Facebook */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-yellow-700"
      >
        <FaFacebookF />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-yellow-700"
      >
        <FaInstagram />
      </a>

      {/* Twitter */}
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-yellow-700"
      >
        <FaTwitter />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-yellow-700"
      >
        <FaLinkedinIn />
      </a>
    </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-yellow">Send Us a Message</h3>
          <form className="mt-4">
            <label className="block text-black">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              placeholder="Enter your name"
            />

            <label className="block text-black mt-4">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              placeholder="Enter your email"
            />

            <label className="block text-black mt-4">Message</label>
            <textarea
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              placeholder="Write your message..."
            ></textarea>

            <button className="w-full mt-4 bg-yellow text-white py-2 rounded-lg hover:bg-yellow-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
