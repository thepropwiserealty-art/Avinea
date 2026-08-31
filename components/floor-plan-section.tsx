"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Grid3X3, Play, Download, Calendar, MapPin, Maximize2 } from "lucide-react"
import context from "@/lib/context"
import FloorPlanImage from "./FloorPlanImage"

type floorPlan = {
  id: number
  name: string
  size: string
  beds: number
  price: string
  image: string
  baths?: number
  features: Array<string>
  carParks?: number
  isSoldOut?: boolean
  pricingTag?: string
}

const floorPlans: Array<floorPlan> = [
  {
    id: 1,
    name: "2 BHK",
    size: "946 / 960 sq. ft.",
    beds: 2,
    price: "₹1.29 Cr / ₹1.36 Cr",
    image: "/plan01.jpg",
    carParks: 1,
    isSoldOut: true,
    features: ["In Hadapsar, Pune", "Masterful engineering", "Architectural brilliance"],
  },
  {
    id: 2,
    name: "3 BHK",
    size: "1213 / 1375 sq. ft.",
    beds: 3,
    price: "₹1.77 Cr / ₹2.02 Cr",
    image: "/plan02.jpg",
    carParks: 2,
    features: ["Luxurious 3 BHK", "At Hadapsar, Pune", "Privacy and community"],
  },
  {
    id: 3,
    name: "4 BHK",
    size: "1780 sq. ft.",
    beds: 4,
    price: "₹2.57 Cr",
    image: "/plan03.jpg",
    carParks: 2,
    pricingTag: "Limited inventory",
    features: ["Luxurious 4 BHK", "At Hadapsar, Pune", "Natural beauty"],
  },
  {
    id: 4,
    name: "4.5 BHK (Couplet)",
    size: "1940 sq. ft.",
    beds: 4.5,
    price: "₹2.72 Cr",
    image: "/plan01.jpg",
    carParks: 2,
    isSoldOut: true,
    features: ["Premium Couplet", "Spacious luxury", "At Hadapsar"],
  },
  {
    id: 5,
    name: "5.5 BHK (Couplet)",
    size: "2470 sq. ft.",
    beds: 5.5,
    price: "₹3.66 Cr",
    image: "/plan02.jpg",
    carParks: 2,
    features: ["Ultimate Couplet", "Unparalleled luxury", "Pune East"],
  }
]

export default function FloorPlanSection() {
  const [selectedPlan, setSelectedPlan] = useState(floorPlans[0])
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel")
  const [api, setApi] = useState<CarouselApi>()
  const { isAuthenticated } = useContext(context)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!api || viewMode !== "carousel") return
    const interval = setInterval(() => { api.scrollNext() }, 5000)
    return () => clearInterval(interval)
  }, [api, viewMode])

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/9657119798?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section id="floor-plan" className="py-12 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* --- PRICING TABLE SECTION --- */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              🏢 Pricing & Configurations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              All-inclusive pricing with car parking. Valid for a limited time.
            </p>
          </div>
          
          <Card className="max-w-5xl mx-auto shadow-xl border-primary/10 overflow-hidden">
            <CardContent className="p-0">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="w-full text-left">
                  <thead className="bg-primary/5 border-b border-primary/10">
                    <tr>
                      <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Type</th>
                      <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Carpet Area</th>
                      <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Parking</th>
                      <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {floorPlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-primary/[0.02] transition-colors">
                        <td className="p-6 font-bold text-lg">
                          <div className="flex items-center gap-2">
                            <span>{plan.name}</span>
                            {plan.pricingTag && (
                              <Badge className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/15 text-amber-800 border-amber-300 hover:bg-amber-500/20">
                                {plan.pricingTag}
                              </Badge>
                            )}
                            {plan.isSoldOut && (
                              <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider">
                                Sold Out
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-6 font-mono text-muted-foreground">{plan.size}</td>
                        <td className="p-6">
                           <Badge variant="secondary">{plan.carParks} Space{plan.carParks! > 1 ? "s" : ""}</Badge>
                        </td>
                        <td className="p-6 text-right">
                          <span className="text-2xl font-black text-primary">{plan.price}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-primary/10">
                {floorPlans.map((plan) => (
                  <div key={plan.id} className="p-5 flex justify-between items-center bg-card">
                    <div className="space-y-1">
                      <div className="font-bold text-primary text-lg flex items-center gap-2">
                        <span>{plan.name}</span>
                        {plan.pricingTag && (
                          <Badge className="text-[9px] h-4 px-1 uppercase font-bold bg-amber-500/15 text-amber-800 border-amber-300">
                            {plan.pricingTag}
                          </Badge>
                        )}
                        {plan.isSoldOut && (
                          <Badge variant="destructive" className="text-[9px] h-4 px-1 uppercase font-bold">
                            Sold Out
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{plan.size}</div>
                      <div className="text-[10px] uppercase font-semibold text-muted-foreground/70">{plan.carParks} Car Park{plan.carParks! > 1 ? "s" : ""}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-primary text-xl">{plan.price}</div>
                      {plan.isSoldOut ? (
                        <Badge variant="destructive" className="text-[10px] h-5 px-1.5 font-bold">Sold Out</Badge>
                      ) : (
                        <Badge className="text-[10px] h-5 px-1.5" variant="outline">All-In</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- FLOOR PLAN PREVIEW SECTION --- */}
        <div id="floor-plan-preview" className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold text-primary">Floor Plan Explorer</h3>
            <p className="text-muted-foreground mt-2">Toggle between grid and carousel to explore layouts.</p>
          </div>
          
          <div className="flex p-1 bg-muted rounded-lg w-full md:w-auto">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex-1 md:px-6"
            >
              <Grid3X3 className="w-4 h-4 mr-2" /> Grid
            </Button>
            <Button
              variant={viewMode === "carousel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className="flex-1 md:px-6"
            >
              <Play className="w-4 h-4 mr-2" /> Carousel
            </Button>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" ? (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Image Preview - First on Mobile */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Card className="overflow-hidden border-none shadow-2xl sticky top-24">
                <div className="relative aspect-[4/3] md:aspect-video bg-muted group">
                  <FloorPlanImage selectedPlan={selectedPlan} />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-black hover:bg-white flex gap-1 items-center">
                      <Maximize2 className="w-3 h-3" /> Tap to enlarge
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 bg-card">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-2xl font-bold">{selectedPlan.name} Luxury Suite</h4>
                          {selectedPlan.isSoldOut && (
                            <Badge variant="destructive" className="font-bold">Sold Out</Badge>
                          )}
                        </div>
                        <div className="flex gap-4 mt-2 text-muted-foreground text-sm">
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary" /> Hadapsar</span>
                          <span className="font-mono">{selectedPlan.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none shadow-lg" onClick={() => openWhatsApp(`I am interested in ${selectedPlan.name}`)}>
                          <Download className="w-4 h-4 mr-2" /> Brochure
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none" onClick={() => openWhatsApp(`Schedule site visit for ${selectedPlan.name}`)}>
                           Visit
                        </Button>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>

            {/* List Selection - Below image on Mobile */}
            <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
              {floorPlans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan)
                    if (window.innerWidth < 1024) {
                      window.scrollTo({ top: (document.getElementById("floor-plan-preview")?.offsetTop || 0) - 100, behavior: "smooth" });
                    }
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                    selectedPlan.id === plan.id 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]" 
                    : "bg-card hover:border-primary/50 border-border"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{plan.name}</span>
                      {plan.isSoldOut && (
                        <Badge variant="destructive" className="text-[9px] h-4 px-1 uppercase font-bold">
                          Sold Out
                        </Badge>
                      )}
                    </div>
                    <span className={selectedPlan.id === plan.id ? "text-primary-foreground/80" : "text-primary font-bold"}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${selectedPlan.id === plan.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.size} • {plan.carParks} Car Parks
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* CAROUSEL VIEW */
          <div className="relative group">
            <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {floorPlans.map((plan) => (
                  <CarouselItem key={plan.id} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-[4/5] bg-muted">
                        <FloorPlanImage selectedPlan={plan} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">Configuration</p>
                          <div className="flex items-center gap-2">
                            <h4 className="text-2xl font-bold">{plan.name}</h4>
                            {plan.isSoldOut && (
                              <Badge variant="destructive" className="text-[10px] font-bold">Sold Out</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                             <Badge className="bg-primary border-none text-[10px]">{plan.size}</Badge>
                             <span className="text-xs font-semibold">{plan.carParks} Parking</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="text-2xl font-black text-primary mb-6">{plan.price}</div>
                        <Button className="w-full" variant={plan.isSoldOut ? "destructive" : "secondary"} onClick={() => openWhatsApp(`Details for ${plan.name}`)}>
                          {plan.isSoldOut ? "Enquire (Sold Out)" : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Desktop-only Navigation */}
              <div className="hidden md:block">
                <CarouselPrevious className="left-[-50px] bg-primary text-white hover:bg-primary/90" />
                <CarouselNext className="right-[-50px] bg-primary text-white hover:bg-primary/90" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  )
}
