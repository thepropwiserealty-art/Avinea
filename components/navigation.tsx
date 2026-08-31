"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#home" },
  { name: "Pricing", href: "#floor-plan" },
  { name: "Floor Plan", href: "#floor-plan" },
  { name: "Amenities", href: "#amenities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Location", href: "#location" },
] as const

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      // Retained 'smooth' behavior for user experience, this uses browser native scrolling
      element.scrollIntoView({ behavior: "smooth" }) 
      setIsMobileMenuOpen(false)
    }
  }

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919657119798?text=Give%20me%20details%20of%20Avinea%20by%20Vyom%20Buildzone",
      "_blank"
    )
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            
            <div 
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="bg-white/95 px-2.5 py-1 rounded-lg shadow-sm flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Avinea by Vyom Buildzone"
                  width={150}
                  height={55}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105 active:scale-95"
                >
                  {item.name}
                </button>
              ))}

              <Button
                className="bg-primary hover:bg-primary/90 transition-transform active:scale-95"
                onClick={openWhatsApp}
              >
                Enquire Now
              </Button>
            </div>

            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="transition-transform active:scale-95 h-10 w-10"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold leading-none">Menu</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          <div
            className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-2 hover:bg-muted rounded-md"
                  >
                    {item.name}
                  </button>
                ))}

                <Button
                  className="bg-primary hover:bg-primary/90 w-full mt-4"
                  onClick={openWhatsApp}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}