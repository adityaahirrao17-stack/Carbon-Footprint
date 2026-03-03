import { motion } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Users, 
  TreePine,
  Zap,
  Train,
  Bike,
  Recycle,
  Leaf,
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Initiative {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: any;
  participants: number;
  location: string;
  date: string;
  status: "ongoing" | "upcoming" | "completed";
  impact: string;
  color: string;
}

export function InitiativesPage() {
  const initiatives: Initiative[] = [
    {
      id: "1",
      title: "Green Belt Expansion Project",
      category: "Tree Plantation",
      description: "Join our community-driven initiative to plant 5,000 native trees across urban areas. Every tree counts in our fight against climate change.",
      image: "https://images.unsplash.com/photo-1758599668356-c8c919e24dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcGxhbnRpbmclMjB2b2x1bnRlZXJzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjIxMTc0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: TreePine,
      participants: 487,
      location: "Central Park & Riverside",
      date: "Every Saturday",
      status: "ongoing",
      impact: "3,240 trees planted",
      color: "#43A047"
    },
    {
      id: "2",
      title: "Solar Rooftop Program",
      category: "Renewable Energy",
      description: "Government subsidized solar panel installation for residential and commercial buildings. Reduce your energy bills and carbon footprint.",
      image: "https://images.unsplash.com/photo-1769340624664-f044b9d0f800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGNpdHklMjBidWlsZGluZ3N8ZW58MXx8fHwxNzcyMjExNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Zap,
      participants: 892,
      location: "Citywide",
      date: "Applications Open",
      status: "ongoing",
      impact: "2.5 MW installed",
      color: "#FF7043"
    },
    {
      id: "3",
      title: "Metro Line Expansion",
      category: "Public Transport",
      description: "New metro lines connecting suburban areas, reducing commute times and vehicle emissions. Cleaner, faster, and more accessible public transportation.",
      image: "https://images.unsplash.com/photo-1555791869-50f6dc81c908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnRhdGlvbiUyMG1ldHJvJTIwdHJhaW58ZW58MXx8fHwxNzcyMjExNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Train,
      participants: 1250,
      location: "East & West Corridors",
      date: "Completion: Dec 2026",
      status: "ongoing",
      impact: "40% emission reduction",
      color: "#26A69A"
    },
    {
      id: "4",
      title: "Community Gardens Initiative",
      category: "Urban Farming",
      description: "Transform unused urban spaces into productive gardens. Grow your own food, reduce food miles, and build community connections.",
      image: "https://images.unsplash.com/photo-1763311500117-ea7bd9e4a8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGdhcmRlbiUyMGdyZWVuJTIwc3BhY2V8ZW58MXx8fHwxNzcyMjExNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Leaf,
      participants: 324,
      location: "12 Neighborhoods",
      date: "Workshops: Weekends",
      status: "ongoing",
      impact: "18 gardens active",
      color: "#66BB6A"
    },
    {
      id: "5",
      title: "Zero Waste Challenge",
      category: "Waste Management",
      description: "Month-long challenge to minimize waste through recycling, composting, and conscious consumption. Win prizes and make a difference.",
      image: "https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzcyMTgwMDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Recycle,
      participants: 658,
      location: "Citywide",
      date: "March 1-31, 2026",
      status: "upcoming",
      impact: "Target: 80% waste reduction",
      color: "#26A69A"
    },
    {
      id: "6",
      title: "Safe Cycling Infrastructure",
      category: "Active Mobility",
      description: "New protected bike lanes, bike-sharing stations, and repair hubs. Making cycling safe and convenient for everyone.",
      image: "https://images.unsplash.com/photo-1765621382564-a6b8438aed7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlJTIwbGFuZSUyMGN5Y2xpbmclMjBpbmZyYXN0cnVjdHVyZXxlbnwxfHx8fDE3NzIyMTE3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Bike,
      participants: 2150,
      location: "Major Roads",
      date: "Phase 2: Starting March",
      status: "ongoing",
      impact: "75 km of bike lanes",
      color: "#1B5E20"
    }
  ];

  const stats = [
    { label: "Active Initiatives", value: "12", icon: MapPin },
    { label: "Total Participants", value: "5,761", icon: Users },
    { label: "CO₂ Reduced", value: "340 tons", icon: TreePine },
  ];

  return (
    <div className="min-h-screen bg-[#F1F8F6] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-['Poppins'] font-bold text-4xl text-[#263238] mb-2">
            City Climate Initiatives
          </h1>
          <p className="font-['Inter'] text-[#546E7A]">
            Join government programs and community projects making a real difference
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-[#E0F2F1] rounded-2xl p-6 shadow-lg flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#26A69A] flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-['Poppins'] font-bold text-3xl text-[#263238]">
                  {stat.value}
                </div>
                <div className="font-['Inter'] text-sm text-[#546E7A]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter/Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {["All", "Tree Plantation", "Renewable Energy", "Public Transport", "Waste Management", "Urban Farming"].map((category) => (
            <button
              key={category}
              className={`px-6 py-2.5 rounded-full font-['Inter'] font-medium transition-all ${
                category === "All"
                  ? "bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white shadow-lg"
                  : "bg-white text-[#263238] hover:bg-[#E0F2F1] shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Initiatives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{ 
                    background: `linear-gradient(135deg, ${initiative.color}99, ${initiative.color}cc)` 
                  }}
                />
                
                {/* Icon overlay */}
                <div className="absolute top-4 left-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                  >
                    <initiative.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold backdrop-blur-sm ${
                      initiative.status === 'ongoing' 
                        ? 'bg-[#43A047]/90 text-white' 
                        : initiative.status === 'upcoming'
                        ? 'bg-[#FF7043]/90 text-white'
                        : 'bg-white/90 text-[#263238]'
                    }`}
                  >
                    {initiative.status === 'ongoing' && '● Live'}
                    {initiative.status === 'upcoming' && '○ Upcoming'}
                    {initiative.status === 'completed' && '✓ Completed'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-['Inter'] font-semibold uppercase tracking-wide mb-2"
                     style={{ color: initiative.color }}>
                  {initiative.category}
                </div>
                
                <h3 className="font-['Poppins'] font-semibold text-xl text-[#263238] mb-3 line-clamp-2">
                  {initiative.title}
                </h3>
                
                <p className="font-['Inter'] text-sm text-[#546E7A] mb-4 line-clamp-3">
                  {initiative.description}
                </p>

                {/* Meta info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#546E7A]">
                    <MapPin className="w-4 h-4" />
                    <span className="font-['Inter']">{initiative.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#546E7A]">
                    <Calendar className="w-4 h-4" />
                    <span className="font-['Inter']">{initiative.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#546E7A]">
                    <Users className="w-4 h-4" />
                    <span className="font-['Inter']">{initiative.participants} participants</span>
                  </div>
                </div>

                {/* Impact badge */}
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
                     style={{ backgroundColor: `${initiative.color}10` }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: initiative.color }} />
                  <span className="font-['Inter'] text-sm font-semibold" style={{ color: initiative.color }}>
                    {initiative.impact}
                  </span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-2xl font-['Poppins'] font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{ 
                    backgroundColor: initiative.color,
                    color: 'white'
                  }}
                >
                  Get Involved
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-4">
              Start Your Own Initiative
            </h2>
            <p className="font-['Inter'] text-lg text-white/90 mb-8">
              Have an idea for a climate project? We provide resources, funding, and community support 
              to help you make it happen. Let's build a sustainable future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1B5E20] px-8 py-4 rounded-2xl font-['Poppins'] font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                Submit Your Idea
                <ExternalLink className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-['Poppins'] font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-3">
              Stay Updated on New Initiatives
            </h3>
            <p className="font-['Inter'] text-[#546E7A] mb-6">
              Get weekly updates on climate programs, volunteer opportunities, and community events
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-[#F1F8F6] border-2 border-transparent focus:border-[#26A69A] outline-none transition-all font-['Inter'] text-[#263238]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white font-['Poppins'] font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
