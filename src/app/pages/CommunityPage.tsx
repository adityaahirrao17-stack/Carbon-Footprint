import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  Heart, 
  MessageCircle, 
  CheckCircle2, 
  TrendingUp,
  Filter,
  Plus,
  User,
  MapPin,
  Calendar,
  Leaf,
  Zap,
  Car,
  Sun,
  Home,
  Users,
  Award,
  ExternalLink
} from "lucide-react";

type Category = "all" | "transport" | "solar" | "energy" | "policy" | "community" | "innovation";
type SortBy = "impact" | "recent" | "verified";

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortBy>("impact");

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All" },
    { id: "transport", label: "Transport" },
    { id: "solar", label: "Solar" },
    { id: "energy", label: "Energy" },
    { id: "policy", label: "Policy" },
    { id: "community", label: "Community" },
    { id: "innovation", label: "Innovation" }
  ];

  // Climate News Articles
  const newsArticles = [
    {
      id: 1,
      title: "India's Solar Power Capacity Reaches 70 GW Milestone",
      description: "The country accelerates renewable energy adoption with massive solar installations across states.",
      category: "solar",
      image: "https://images.unsplash.com/photo-1509644851169-2eb53bb489f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    },
    {
      id: 2,
      title: "Electric Buses Transform Public Transport in Major Cities",
      description: "Zero-emission fleet reduces urban pollution and sets new standards for sustainable mobility.",
      category: "transport",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    },
    {
      id: 3,
      title: "New Climate Policy Incentivizes Green Building Standards",
      description: "Government introduces tax benefits for energy-efficient construction and retrofitting.",
      category: "policy",
      image: "https://images.unsplash.com/photo-1486315697669-7cf3a1d63d8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    },
    {
      id: 4,
      title: "Community-Led Tree Plantation Drives Restore Urban Forests",
      description: "Citizen groups plant over 100,000 trees, creating green corridors in metropolitan areas.",
      category: "community",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    },
    {
      id: 5,
      title: "Smart Grid Technology Reduces Energy Waste by 30%",
      description: "AI-powered systems optimize electricity distribution and consumption patterns.",
      category: "innovation",
      image: "https://images.unsplash.com/photo-1560263615-cd4628902249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    },
    {
      id: 6,
      title: "Rooftop Solar Adoption Surges with New Financing Options",
      description: "Affordable loans and subsidies make solar energy accessible to middle-class households.",
      category: "energy",
      image: "https://images.unsplash.com/photo-1497440001374-52e0c7b3ad12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      link: "#"
    }
  ];

  // Featured Impact Stories
  const featuredStories = [
    {
      id: 1,
      user: "Priya Sharma",
      location: "Bangalore, India",
      title: "Switched My Family to 100% Solar Energy",
      summary: "After installing a 5kW rooftop solar system, our electricity bills dropped to zero and we've offset over 3 tons of CO₂ in just 8 months.",
      co2Reduced: 3200,
      image: "https://images.unsplash.com/photo-1509644851169-2eb53bb489f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      verified: true,
      date: "15 Feb 2026"
    },
    {
      id: 2,
      user: "Arjun Mehta",
      location: "Mumbai, India",
      title: "Sold My Car, Now I Cycle to Work Every Day",
      summary: "12 months of cycling 15 km daily has saved me ₹80,000, improved my health, and reduced my carbon footprint significantly.",
      co2Reduced: 1850,
      image: "https://images.unsplash.com/photo-1550993292-d05d5539a8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      verified: true,
      date: "10 Feb 2026"
    }
  ];

  // User Stories
  const userStories = [
    {
      id: 1,
      user: "Kavya Reddy",
      location: "Hyderabad",
      date: "3 days ago",
      title: "Replaced All Bulbs with LEDs",
      description: "Switched 45 traditional bulbs to LED across my home and office. Monthly electricity consumption reduced by 40%.",
      category: "energy",
      beforeEmission: 180,
      afterEmission: 108,
      co2Reduced: 72,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 234,
      comments: 45,
      verified: true
    },
    {
      id: 2,
      user: "Rahul Verma",
      location: "Delhi",
      date: "5 days ago",
      title: "Joined Local Carpool Community",
      description: "Started carpooling with 3 colleagues. We rotate cars weekly, saving money and reducing our daily commute emissions.",
      category: "transport",
      beforeEmission: 320,
      afterEmission: 80,
      co2Reduced: 240,
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 189,
      comments: 32,
      verified: false
    },
    {
      id: 3,
      user: "Sneha Patel",
      location: "Pune",
      date: "1 week ago",
      title: "Organized Neighborhood Composting Initiative",
      description: "25 families now compost kitchen waste together. We've diverted 500 kg of organic waste from landfills.",
      category: "community",
      beforeEmission: 150,
      afterEmission: 15,
      co2Reduced: 135,
      image: "https://images.unsplash.com/photo-1585314743200-5f0e0d14ebda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 456,
      comments: 78,
      verified: true
    },
    {
      id: 4,
      user: "Vikram Singh",
      location: "Jaipur",
      date: "1 week ago",
      title: "Installed Smart Thermostat for AC Optimization",
      description: "AI-controlled temperature management reduced AC runtime by 35% without compromising comfort.",
      category: "energy",
      beforeEmission: 200,
      afterEmission: 130,
      co2Reduced: 70,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 167,
      comments: 23,
      verified: true
    },
    {
      id: 5,
      user: "Meera Iyer",
      location: "Chennai",
      date: "2 weeks ago",
      title: "Switched to Plant-Based Meals 4 Days a Week",
      description: "Reduced meat consumption significantly. Family health improved and our food-related carbon footprint dropped.",
      category: "lifestyle",
      beforeEmission: 280,
      afterEmission: 160,
      co2Reduced: 120,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 312,
      comments: 67,
      verified: false
    },
    {
      id: 6,
      user: "Aditya Kumar",
      location: "Kolkata",
      date: "2 weeks ago",
      title: "Started Rainwater Harvesting System",
      description: "Collecting rainwater reduced our municipal water dependency by 60% and cut energy used for water pumping.",
      category: "energy",
      beforeEmission: 95,
      afterEmission: 38,
      co2Reduced: 57,
      image: "https://images.unsplash.com/photo-1559505262-cd4628902249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1000",
      likes: 278,
      comments: 41,
      verified: true
    }
  ];

  const categoryIcons: Record<string, any> = {
    transport: Car,
    solar: Sun,
    energy: Zap,
    policy: Award,
    community: Users,
    innovation: TrendingUp,
    lifestyle: Home
  };

  const filteredNews = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  let sortedStories = [...userStories];
  if (sortBy === "impact") {
    sortedStories.sort((a, b) => b.co2Reduced - a.co2Reduced);
  } else if (sortBy === "recent") {
    sortedStories.sort((a, b) => a.id - b.id);
  } else if (sortBy === "verified") {
    sortedStories.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
  }

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
            Climate Action Community
          </h1>
          <p className="font-['Inter'] text-lg text-[#546E7A]">
            Real stories. Real impact.
          </p>
        </motion.div>

        {/* Featured Impact Stories */}
        <div className="mb-12">
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
            Featured Impact Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#E0F2F1] via-white to-[#E8F5E9] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-['Poppins'] font-semibold text-[#263238]">{story.user}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#546E7A]">
                        <MapPin className="w-3 h-3" />
                        {story.location}
                      </div>
                    </div>
                    {story.verified && (
                      <CheckCircle2 className="w-5 h-5 text-[#43A047] ml-auto" />
                    )}
                  </div>
                  <h3 className="font-['Poppins'] font-bold text-xl text-[#263238] mb-2">
                    {story.title}
                  </h3>
                  <p className="font-['Inter'] text-[#546E7A] mb-4">
                    {story.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white px-4 py-2 rounded-xl">
                      <p className="text-2xl font-['Poppins'] font-bold">{story.co2Reduced} kg</p>
                      <p className="text-xs opacity-90">CO₂ Reduced</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-[#26A69A] hover:text-white transition-colors font-['Inter'] font-medium">
                      View Full Story
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Climate News & Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
            Climate News & Articles
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-['Inter'] font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white shadow-lg"
                    : "bg-white text-[#263238] hover:bg-[#E0F2F1]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, index) => {
              const CategoryIcon = categoryIcons[article.category] || Leaf;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-3 py-1 rounded-full bg-[#E0F2F1] flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-[#26A69A]" />
                        <span className="text-sm font-['Inter'] font-medium text-[#26A69A] capitalize">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-['Poppins'] font-semibold text-lg text-[#263238] mb-2">
                      {article.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#546E7A] mb-4">
                      {article.description}
                    </p>
                    <button className="text-[#26A69A] font-['Inter'] font-medium hover:text-[#1B5E20] transition-colors flex items-center gap-1">
                      Read more
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* User Climate Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
              How I Reduced My Carbon Footprint
            </h2>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white rounded-xl hover:shadow-lg transition-all font-['Inter'] font-medium">
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>

          {/* Sorting Options */}
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-[#546E7A]" />
            <span className="font-['Inter'] text-sm text-[#546E7A]">Sort by:</span>
            <div className="flex gap-2">
              {[
                { id: "impact", label: "Most Impact" },
                { id: "recent", label: "Most Recent" },
                { id: "verified", label: "Most Verified" }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id as SortBy)}
                  className={`px-4 py-2 rounded-xl font-['Inter'] text-sm transition-all ${
                    sortBy === option.id
                      ? "bg-[#26A69A] text-white"
                      : "bg-white text-[#263238] hover:bg-[#E0F2F1]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sortedStories.map((story, index) => {
              const CategoryIcon = categoryIcons[story.category] || Home;
              const reduction = ((story.beforeEmission - story.afterEmission) / story.beforeEmission * 100).toFixed(0);
              
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* User Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-['Poppins'] font-semibold text-[#263238]">{story.user}</h3>
                        <div className="flex items-center gap-3 text-sm text-[#546E7A]">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {story.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {story.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    {story.verified && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-[#43A047] text-white rounded-full text-xs font-['Inter'] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E0F2F1] rounded-full mb-3">
                    <CategoryIcon className="w-4 h-4 text-[#26A69A]" />
                    <span className="text-sm font-['Inter'] font-medium text-[#26A69A] capitalize">
                      {story.category}
                    </span>
                  </div>

                  {/* Story Content */}
                  <h4 className="font-['Poppins'] font-bold text-lg text-[#263238] mb-2">
                    {story.title}
                  </h4>
                  <p className="font-['Inter'] text-[#546E7A] mb-4">
                    {story.description}
                  </p>

                  {/* Image */}
                  <div className="h-48 rounded-xl overflow-hidden mb-4">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Before vs After */}
                  <div className="bg-gradient-to-br from-[#E0F2F1] to-white rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs font-['Inter'] text-[#546E7A] mb-1">Before</p>
                        <p className="text-lg font-['Poppins'] font-bold text-[#FF7043]">{story.beforeEmission} kg</p>
                      </div>
                      <div>
                        <p className="text-xs font-['Inter'] text-[#546E7A] mb-1">After</p>
                        <p className="text-lg font-['Poppins'] font-bold text-[#26A69A]">{story.afterEmission} kg</p>
                      </div>
                      <div>
                        <p className="text-xs font-['Inter'] text-[#546E7A] mb-1">Reduced</p>
                        <p className="text-lg font-['Poppins'] font-bold text-[#43A047]">-{reduction}%</p>
                      </div>
                    </div>
                  </div>

                  {/* CO₂ Reduced Badge */}
                  <div className="bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white rounded-xl p-3 mb-4 text-center">
                    <p className="text-2xl font-['Poppins'] font-bold">{story.co2Reduced} kg CO₂</p>
                    <p className="text-xs opacity-90">Total Reduction</p>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center gap-6 pt-4 border-t border-[#E0F2F1]">
                    <button className="flex items-center gap-2 text-[#546E7A] hover:text-[#FF7043] transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="font-['Inter'] text-sm">{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#546E7A] hover:text-[#26A69A] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-['Inter'] text-sm">{story.comments}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
