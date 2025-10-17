"use client"
import { useState } from "react"
import { Mail, Phone, ArrowRight } from "lucide-react"

export function ChemicalContactForm({
  title = "WE'RE HERE TO HELP YOU",
  subtitle = "Discuss Your Chemical Solution Needs",
  description = "Are you looking for top-quality chemical solutions tailored to your needs? Reach out to us",
  email = "Webdevrsk@gmail.com",
  phone = "+91 988-789-2345",
  industries = [
    "Manufacturing",
    "Pharmaceuticals",
    "Agriculture",
    "Automotive",
    "Textiles",
    "Food & Beverage",
    "Oil & Gas",
    "Water Treatment",
  ],
  buttonText = "Get a Solution",
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log("Form submitted:", formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{title}</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{subtitle}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">E-mail</p>
                  <p className="text-gray-900 font-medium">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone number</p>
                  <p className="text-gray-900 font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full min-h-[120px] px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
              </div>

            
            <button
            class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group border-1 border-black"
            type="button"
            >
            <div
                class="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
                >
                <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#000000"
                ></path>
                <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#000000"
                ></path>
                </svg>
            </div>
            <p class="translate-x-2">Submit</p>
            </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
