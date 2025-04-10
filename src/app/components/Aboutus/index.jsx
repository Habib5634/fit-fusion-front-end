'use client'
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
export default function AboutUs() {
    const faqs = [
        {
          question: "What is personalized nutrition?",
          answer:
            "Personalized nutrition tailors dietary recommendations to meet individual health needs and lifestyle goals.",
        },
        {
          question: "How do I connect with a nutritionist?",
          answer:
            "You can connect with a nutritionist by creating an account and scheduling a consultation through our platform.",
        },
        {
          question: "Are meal plans customizable?",
          answer:
            "Yes, our meal plans are fully customizable to fit your preferences, allergies, and dietary needs.",
        },
        {
          question: "Can I track my progress on the platform?",
          answer:
            "Absolutely! Our platform includes tools for tracking your diet, exercise, and overall health progress.",
        },
        {
          question: "What types of fitness and nutrition plans do you offer?",
          answer:
            "We offer customized plans for weight loss, muscle gain, balanced nutrition, and wellness, tailored to fit your lifestyle and health goals.",
        },
      ];
    const services = [
        {
          title: "Personalized Diet Plans",
          description:
            "Receive a custom diet plan tailored to your goals, preferences, and dietary needs, designed by expert nutritionists.",
        },
        {
          title: "One-on-One Consultations",
          description:
            "Schedule personalized sessions with our nutritionists to stay on track and get professional guidance.",
        },
        {
          title: "Progress Tracking",
          description:
            "Track your fitness journey with our integrated tools, helping monitor your improvements over time.",
        },
        {
          title: "Dietary Assessments",
          description:
            "Comprehensive assessments to evaluate current eating habits and recommend improvements.",
        },
        {
          title: "Mobile App Access",
          description:
            "Access all features and stay connected on the go with our dedicated mobile app, available on iOS and Android.",
        },
        {
          title: "Membership Programs",
          description:
            "Tiered subscription options that offer different levels of access to services, resources, and expert consultations.",
        },
      ];
      const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
      
  return (
    <div className="px-6 md:px-20 py-10 max-w-6xl mx-auto">
      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">About Us</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-yellow">Mission</h3>
            <p className="text-gray-700 mt-2">
              To provide unwavering support for individuals seeking healthier lives through
              the expertise and guidance of dedicated nutritionists.
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-yellow">Vision</h3>
            <p className="text-gray-700 mt-2">
              Empowering individuals to lead healthier, happier lives through personalized
              nutrition and wellness support.
            </p>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/assets/about.png"
            width={500}
            height={300}
            alt="Doctors teamwork"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-yellow">What We Offer...?</h2>
        <p className="text-gray-700 mt-2">
          We offer tailored meal plans, personalized consultations, and ongoing support to
          empower healthier lifestyles.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
        {services.map((service, index) => (
            <div
              key={index}
              className="bg-dark text-white p-5 rounded-lg shadow-lg border border-yellow"
            >
              <h3 className="text-lg font-semibold text-yellow">
                {service.title}
              </h3>
              <p className="text-sm mt-2 text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 items-center" >
        <div>

        <h2 className="text-2xl font-bold text-yellow">Our Approach to Health and Nutrition</h2>
        <p className="text-gray-700 mt-4">
          Our approach is rooted in holistic wellness, emphasizing personalized nutrition plans,
          balanced eating, and sustainable lifestyle habits. Our certified nutritionists provide
          guidance tailored to individual goals.
        </p>
        </div>
          
            <Image  src="/assets/about2.png" width={200} height={150} alt="Health image" className="rounded-lg w-full h-full" />
         
        </div>
      </div>

      <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-yellow mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
        {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-yellow rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-white hover:bg-yellow-50 transition-all"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-dark">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaMinus className="text-yellow" />
                ) : (
                  <FaPlus className="text-yellow" />
                )}
              </button>

              {/* Animate the answer with Framer Motion */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 text-gray-700 bg-gray-50">{faq.answer}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
