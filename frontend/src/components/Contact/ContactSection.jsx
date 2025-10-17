"use client"

import { useState } from "react"
import { Phone, MapPin, Mail } from "lucide-react"

export default function ContactSection({
  phone = "888-999-1234",
  address = "North Chennai",
  email = "office@rsk.com",
  businessHours = {
    weekdays: "8:00 am - 5:00 pm",
    saturday: "9:00 am - 6:00 pm",
    sunday: "8:00 am - 5:00 pm",
  },
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d-88.29023968455596!3d42.037684979218785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f2a48c0000001%3A0x8dd2ad4b1e7a8c3a!2s1425%20N%20McLean%20Blvd%2C%20Elgin%2C%20IL%2060123!5e0!3m2!1sen!2sus!4v1635959492845!5m2!1sen!2sus",
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      {/* <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">CONTACT US</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          If you have any questions, please feel free to get in touch with us via phone, text, email, the form below, or
          even on social media!
        </p>
      </div> */}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="bg-[#E9F5EF]     p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-black mb-6">GET IN TOUCH</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  PHONE NUMBER
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number*"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email*"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message..."
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#28CC77] hover:bg-red-700 text-white font-semibold py-3 text-base rounded-md shadow-md transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-[#E9F5EF] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-black mb-6">CONTACT INFORMATION</h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">PHONE</p>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">ADDRESS</p>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">EMAIL</p>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-[#E9F5EF] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-black mb-6">BUSINESS HOURS</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">MONDAY - FRIDAY</span>
                <span className="text-gray-600">{businessHours.weekdays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">SATURDAY</span>
                <span className="text-gray-600">{businessHours.saturday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">SUNDAY</span>
                <span className="text-gray-600">{businessHours.sunday}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Business Location Map"
        />
      </div>
    </section>
  )
}
