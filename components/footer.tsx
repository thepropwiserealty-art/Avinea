"use client"
import { useState } from "react"
import { MapPin, Phone, ChevronDown, ChevronUp, Clock } from "lucide-react"
import Image from "next/image"

// Define proper TypeScript interfaces
interface FaqItem {
  id: string
  question: string
  answer: string
}

interface OpenFaqsState {
  [key: string]: boolean
}

export default function Footer() {
  const entranceClasses = "transition-opacity duration-700 opacity-100"
  
  // FAQ State Management with proper typing
  const [openFaqs, setOpenFaqs] = useState<OpenFaqsState>({
    config: false,
    amenities: false,
    possession: false,
    unique: false,
    rera: false
  })

  const toggleFaq = (faqId: string) => {
    setOpenFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }))
  }

  const faqs: FaqItem[] = [
    {
      id: "config",
      question: "What is the configuration and carpet area of the apartments?",
      answer: "Avinea by Vyom Buildzone offers a variety of configurations ranging from 2 BHK, 3 BHK, 4 BHK, 4.5 BHK (Couplet) and 5.5 BHK (Couplet). The carpet areas range from 946 sq. ft. to 2,470 sq. ft., catering to diverse needs for different family sizes."
    },
    {
      id: "amenities",
      question: "What are the key amenities offered at Avinea by Vyom Buildzone?",
      answer: "Avinea by Vyom Buildzone features over 55+ luxurious amenities, including wellness and fitness zones (gym, yoga hall, swimming pools), children's play areas, adventure parks, music room, multiple dining options like grill & dine café and BBQ court, sports facilities including badminton courts, cricket pitch, multi-purpose courts, and eco-friendly features like rainwater harvesting, sewage treatment, and renewable energy systems."
    },
    {
      id: "possession",
      question: "What is the possession date for the Avinea by Vyom Buildzone project?",
      answer: "The target possession for Avinea by Vyom Buildzone is in 3 years (Dec 2028 onwards)."
    },
    {
      id: "unique",
      question: "What makes Avinea by Vyom Buildzone unique in terms of construction and design?",
      answer: "Avinea by Vyom Buildzone employs Mi-van construction technology, which ensures sustainable, eco-friendly homes. The apartments are designed with 3-side open flats for better ventilation and natural light. The project also boasts 115-meter tall towers with full glass elevations."
    },
    {
      id: "rera",
      question: "Is Avinea by Vyom Buildzone RERA registered?",
      answer: "Yes, Avinea by Vyom Buildzone is RERA registered under RERA No. P52100079047 and PR1261012501542. It adheres to all regulatory requirements and offers legal assurance to the buyers."
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
          <div className={`space-y-6 ${entranceClasses}`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="Avinea by Vyom Buildzone Logo"
                  width={200}
                  height={56}
                  className="h-16 w-auto rounded-lg object-contain"
                  priority={false}
                />
              </div>
            </div>
            <div className="space-y-4 text-primary-foreground/90">
              <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/80" />
                <span className="text-sm leading-relaxed">Avinea by Vyom Buildzone</span>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/80" />
                <span className="text-sm leading-relaxed">+91 9657119798</span>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 flex justify-center lg:justify-end items-center ${entranceClasses}`}>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
              <Image 
                src="/QR.webp" 
                alt="QR Code - Scan for more details" 
                width={128} 
                height={128} 
                className="h-32 w-32 object-contain rounded-xl"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* PROFESSIONAL FAQ SECTION */}
        <div className={`mb-20 ${entranceClasses}`}>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 rounded-full backdrop-blur-sm mb-8 shadow-lg">
              <Clock className="w-5 h-5 mr-3 text-white/90" />
              <span className="font-semibold text-lg">Frequently Asked Questions</span>
            </div>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Find answers to the most common questions about Avinea by Vyom Buildzone project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="group bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <button
                  type="button"
                  className="w-full text-left flex items-center justify-between p-0 bg-transparent border-none cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-xl"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={openFaqs[faq.id]}
                  aria-controls={`${faq.id}-content`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <span className="text-sm font-bold text-white/90">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-foreground/95 leading-tight pr-8 flex-1">
                      {faq.question}
                    </h4>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-200 flex-shrink-0">
                    {openFaqs[faq.id] ? 
                      <ChevronUp className="w-4 h-4 text-white/80" /> : 
                      <ChevronDown className="w-4 h-4 text-white/80" />
                    }
                  </div>
                </button>
                
                <div 
                  id={`${faq.id}-content`}
                  className={`mt-6 pl-14 overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaqs[faq.id] 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!openFaqs[faq.id]}
                >
                  <div className="space-y-2 text-primary-foreground/85 text-sm leading-relaxed pt-4 border-t border-white/10">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTERED MAP */}
        <div className={`text-center mb-20 ${entranceClasses}`}>
          <div className="max-w-md mx-auto mb-10">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl">
              <MapPin className="w-6 h-6 mr-3 text-white/90" />
              <span className="font-semibold text-xl">Project Location</span>
            </div>
          </div>
          <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
            <iframe
              src="https://www.google.com/maps?q=avinea+vyom+sigma+hadapsar&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px] md:h-[500px]"
              title="Avinea by Vyom Buildzone Location"
            />
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className={`border-t border-white/20 pt-12 ${entranceClasses}`}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm leading-relaxed text-primary-foreground/75 mb-6">
              <strong>This project is RERA registered.</strong> | Authorized Channel Partner | The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a RERA authorized real estate agent. Avinea by Vyom Buildzone
              Channel Partner RERA Number: <strong>A52100000378</strong> | 
              Project RERA Number: <strong>P52100079047</strong> <strong>PR1261012501542</strong>
            </p>
            <p className="text-xs text-primary-foreground/60 leading-relaxed mb-8 max-w-3xl mx-auto">The pricing information presented on this website is subject to alteration without advance notification, and the assurance of property availability cannot be guaranteed. The images showcased on this website are for representational purposes only and may not accurately reflect the actual properties. We may share your data with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary. Additionally, we may send updates and information to the mobile number or email address registered with us. All rights reserved. The content, design, and information on this website are protected by copyright and other intellectual property rights. Any unauthorized use or reproduction of the content may violate applicable laws. For accurate and up-to-date information regarding services, pricing, availability, and any other details, it is recommended to contact us directly through the provided contact information on this website.
 Thank you for visiting our website.
            </p>
            <p className="text-sm font-medium text-primary-foreground/80">
              © 2026 Avinea Hadapsar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
