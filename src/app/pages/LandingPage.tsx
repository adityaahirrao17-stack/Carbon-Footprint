import { Link } from "react-router";
import { motion } from "motion/react";
import { 
  Leaf, 
  TrendingUp, 
  Car, 
  Home, 
  Target, 
  Brain, 
  Map, 
  ArrowRight,
  Thermometer,
  Wind,
  Zap,
  Droplet,
  Trees,
  Lightbulb,
  Recycle,
  Leaf as LeafIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function LandingPage() {
  const [carbonCount, setCarbonCount] = useState(1234567);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonCount(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-900 to-slate-800">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 text-white/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Leaf className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-20 text-white/20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Wind className="w-20 h-20" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-['Poppins'] font-semibold">
                SDG 13: Climate Action
              </span>
            </div>

            <h1 className="font-['Poppins'] font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Turn Everyday Decisions into Climate Action.
            </h1>

            <p className="font-['Inter'] text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Measure, improve, and reduce your carbon footprint with AI guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#1B5E20] px-8 py-4 rounded-2xl font-['Poppins'] font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 justify-center min-w-[280px]"
                >
                  Start My Climate Assessment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-['Poppins'] font-semibold text-lg hover:bg-white/20 transition-all min-w-[240px]"
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            {/* Carbon Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 inline-block"
            >
              <div className="text-white/70 text-sm font-['Inter'] mb-2">
                CO₂ Reduced by Zerofy Community
              </div>
              <motion.div
                key={carbonCount}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="font-['Poppins'] font-bold text-4xl text-white"
              >
                {carbonCount.toLocaleString()} kg
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Poppins'] font-bold text-4xl sm:text-5xl text-[#263238] mb-4">
              Climate change is not distant.<br />It's personal.
            </h2>
            <p className="font-['Inter'] text-lg text-[#546E7A] max-w-2xl mx-auto">
              Every choice you make affects the planet. Understanding your impact is the first step to making a difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Thermometer,
                title: "Rising Heat",
                description: "Global temperatures are increasing, affecting weather patterns and ecosystems worldwide.",
                color: "#FF7043",
                image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                icon: Car,
                title: "Transport Emissions",
                description: "Transportation accounts for nearly 30% of total CO₂ emissions, with personal vehicles being major contributors.",
                color: "#26A69A",
                image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                icon: Home,
                title: "Lifestyle Impact",
                description: "Daily choices in energy, food, and consumption create a cumulative carbon footprint.",
                color: "#43A047",
                image: "https://images.unsplash.com/photo-1574629810360-7efac8c3cd3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-80"
                    style={{ background: `linear-gradient(135deg, ${item.color}99, ${item.color}dd)` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Poppins'] font-semibold text-xl text-[#263238] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-['Inter'] text-[#546E7A]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E0F2F1] to-[#F1F8F6]">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div>
              <div className="inline-block mb-4">
                <span className="font-['Poppins'] font-semibold text-[#26A69A] text-sm tracking-wider">SERVICE</span>
              </div>
              <h2 className="font-['Poppins'] font-bold text-4xl sm:text-5xl text-[#263238]">
                Your Climate Action<br />Platform
              </h2>
            </div>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-['Poppins'] font-semibold transition-all whitespace-nowrap flex items-center gap-2"
              >
                View All Tools
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                {
                  icon: Target,
                  title: "Carbon Assessment",
                  description: "Get a comprehensive baseline of your current carbon footprint across transportation, energy, and lifestyle.",
                  featured: false
                },
                {
                  icon: Brain,
                  title: "AI Climate Advisor",
                  description: "Receive intelligent, personalized recommendations for every decision you make throughout the day.",
                  featured: true
                },
                {
                  icon: Map,
                  title: "Personal Reduction Roadmap",
                  description: "Follow a customized plan with actionable steps to achieve your climate goals at your own pace.",
                  featured: false
                },
                {
                  icon: Zap,
                  title: "Energy Efficiency",
                  description: "Optimize your home and workplace energy usage with smart recommendations and tracking.",
                  featured: false
                },
                {
                  icon: Droplet,
                  title: "Water Conservation",
                  description: "Monitor and reduce your water footprint through sustainable daily habits.",
                  featured: false
                },
                {
                  icon: Trees,
                  title: "Green Initiatives",
                  description: "Participate in tree planting and reforestation projects to offset carbon emissions.",
                  featured: false
                },
                {
                  icon: Recycle,
                  title: "Waste Reduction",
                  description: "Learn circular economy practices and reduce waste through recycling and composting.",
                  featured: false
                },
                {
                  icon: Lightbulb,
                  title: "Sustainable Choices",
                  description: "Discover eco-friendly alternatives for everyday products and services.",
                  featured: false
                },
              ].map((item, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`rounded-3xl p-8 transition-all duration-300 h-full ${
                      item.featured 
                        ? 'bg-gradient-to-br from-[#43A047] to-[#26A69A] text-white' 
                        : 'bg-white text-[#263238] hover:bg-[#43A047] hover:text-white'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all ${
                      item.featured 
                        ? 'bg-white/20' 
                        : 'bg-[#43A047]/10'
                    }`}>
                      <item.icon className={`w-8 h-8 ${item.featured ? 'text-white' : 'text-[#43A047]'}`} />
                    </div>
                    <h3 className={`font-['Poppins'] font-semibold text-2xl mb-3`}>
                      {item.title}
                    </h3>
                    <p className={`font-['Inter'] mb-6 ${item.featured ? 'text-white/90' : 'text-[#546E7A]'}`}>
                      {item.description}
                    </p>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className={`font-['Poppins'] font-semibold inline-flex items-center gap-2 ${
                        item.featured 
                          ? 'text-white' 
                          : 'text-orange-500'
                      }`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-[#26A69A] text-[#26A69A] hover:bg-[#26A69A] hover:text-white" />
            <CarouselNext className="hidden md:flex -right-12 border-[#26A69A] text-[#26A69A] hover:bg-[#26A69A] hover:text-white" />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#263238] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] p-2 rounded-2xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-['Poppins'] font-bold text-xl">Zerofy</div>
                <div className="font-['Inter'] text-sm text-white/70">
                  AI-Powered Personal Climate Action Platform
                </div>
              </div>
            </div>
            <div className="font-['Inter'] text-sm text-white/70">
              © 2026 Zerofy. Supporting SDG 13: Climate Action
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
