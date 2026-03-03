import { motion } from "motion/react";
import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Droplets,
  Wind,
  TreePine,
  ArrowRight
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Cell } from "recharts";

export function ImpactPage() {
  const [userCount, setUserCount] = useState(1000);
  const [cyclingDays, setCyclingDays] = useState(3);

  // Calculate impact
  const co2SavedPerPerson = cyclingDays * 4 * 2.8; // 2.8 kg per 10km
  const totalCO2Saved = (userCount * co2SavedPerPerson * 4) / 1000; // Monthly, in tons
  const treesEquivalent = Math.round(totalCO2Saved * 50);
  const carsOffRoad = Math.round(totalCO2Saved / 0.4);

  // Monthly projection data
  const projectionData = [
    { month: "Month 1", co2: totalCO2Saved * 0.3, users: userCount * 0.3 },
    { month: "Month 2", co2: totalCO2Saved * 0.5, users: userCount * 0.5 },
    { month: "Month 3", co2: totalCO2Saved * 0.7, users: userCount * 0.7 },
    { month: "Month 4", co2: totalCO2Saved * 0.85, users: userCount * 0.85 },
    { month: "Month 5", co2: totalCO2Saved, users: userCount },
    { month: "Month 6", co2: totalCO2Saved * 1.2, users: userCount * 1.2 },
  ];

  // Community impact comparison
  const comparisonData = [
    { action: "Cycling", impact: totalCO2Saved, color: "#43A047" },
    { action: "Public Transport", impact: totalCO2Saved * 0.7, color: "#26A69A" },
    { action: "Carpooling", impact: totalCO2Saved * 0.5, color: "#66BB6A" },
    { action: "Electric Vehicle", impact: totalCO2Saved * 0.3, color: "#81C784" },
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
            Community Impact Simulator
          </h1>
          <p className="font-['Inter'] text-[#546E7A]">
            See the collective power of climate action when we work together
          </p>
        </motion.div>

        {/* Interactive Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-white to-[#E0F2F1] rounded-3xl p-8 shadow-xl mb-8"
        >
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#26A69A]" />
            Simulation Parameters
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-['Poppins'] font-semibold text-[#263238]">
                  Number of Users
                </label>
                <span className="font-['Poppins'] font-bold text-2xl text-[#26A69A]">
                  {userCount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={userCount}
                onChange={(e) => setUserCount(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-[#E0F2F1]"
                style={{
                  background: `linear-gradient(to right, #26A69A 0%, #26A69A ${(userCount / 10000) * 100}%, #E0F2F1 ${(userCount / 10000) * 100}%, #E0F2F1 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-[#546E7A] mt-2">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Cycling Days Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-['Poppins'] font-semibold text-[#263238]">
                  Cycling Days per Week
                </label>
                <span className="font-['Poppins'] font-bold text-2xl text-[#43A047]">
                  {cyclingDays}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={cyclingDays}
                onChange={(e) => setCyclingDays(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #43A047 0%, #43A047 ${(cyclingDays / 7) * 100}%, #E0F2F1 ${(cyclingDays / 7) * 100}%, #E0F2F1 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-[#546E7A] mt-2">
                <span>1 day</span>
                <span>7 days</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/60 rounded-2xl">
            <p className="font-['Inter'] text-sm text-[#263238]">
              💡 Simulation based on: {userCount.toLocaleString()} users cycling {cyclingDays} days per week for 10km trips
            </p>
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Leaf,
              label: "Total CO₂ Saved",
              value: `${totalCO2Saved.toFixed(1)}`,
              unit: "tons/month",
              color: "#43A047",
              gradient: "from-[#43A047] to-[#66BB6A]"
            },
            {
              icon: TreePine,
              label: "Trees Planted Equivalent",
              value: treesEquivalent.toLocaleString(),
              unit: "trees",
              color: "#26A69A",
              gradient: "from-[#26A69A] to-[#43A047]"
            },
            {
              icon: Wind,
              label: "Cars Off the Road",
              value: carsOffRoad.toLocaleString(),
              unit: "cars/month",
              color: "#1B5E20",
              gradient: "from-[#1B5E20] to-[#26A69A]"
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-4`}>
                <metric.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-sm font-['Inter'] text-[#546E7A] mb-2">
                {metric.label}
              </div>
              <div className="flex items-baseline gap-2">
                <motion.div
                  key={metric.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-['Poppins'] font-bold text-4xl"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </motion.div>
                <span className="text-sm font-['Inter'] text-[#546E7A]">
                  {metric.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projection Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
            6-Month Impact Projection
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#26A69A" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#26A69A" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2F1" />
              <XAxis 
                dataKey="month" 
                stroke="#546E7A"
                style={{ fontFamily: 'Inter' }}
              />
              <YAxis 
                stroke="#546E7A"
                style={{ fontFamily: 'Inter' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E0F2F1',
                  borderRadius: '12px',
                  fontFamily: 'Inter'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="co2" 
                stroke="#26A69A" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCO2)"
                name="CO₂ Saved (tons)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Action Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
            Climate Action Comparison
          </h2>
          <p className="font-['Inter'] text-[#546E7A] mb-6">
            Comparing different transportation alternatives for the same community size
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2F1" />
              <XAxis 
                dataKey="action" 
                stroke="#546E7A"
                style={{ fontFamily: 'Inter' }}
              />
              <YAxis 
                stroke="#546E7A"
                style={{ fontFamily: 'Inter' }}
                label={{ value: 'CO₂ Saved (tons)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E0F2F1',
                  borderRadius: '12px',
                  fontFamily: 'Inter'
                }}
              />
              <Bar 
                dataKey="impact" 
                radius={[12, 12, 0, 0]}
                fill="#26A69A"
              >
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Real-World Impact Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-8 text-white shadow-2xl"
        >
          <h2 className="font-['Poppins'] font-bold text-3xl mb-4">
            What Does This Mean in Real Terms?
          </h2>
          <p className="font-['Inter'] text-white/90 mb-8">
            Your community's collective action of saving <strong>{totalCO2Saved.toFixed(1)} tons of CO₂</strong> monthly is equivalent to:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TreePine,
                title: "Forest Conservation",
                description: `Planting and maintaining ${treesEquivalent} trees for a year`,
                metric: `${treesEquivalent} trees`
              },
              {
                icon: Droplets,
                title: "Water Saved",
                description: `${Math.round(totalCO2Saved * 2000).toLocaleString()} liters of water conserved`,
                metric: `${Math.round(totalCO2Saved * 2).toLocaleString()}K liters`
              },
              {
                icon: Wind,
                title: "Clean Air",
                description: `Removing ${carsOffRoad} cars from the road for a month`,
                metric: `${carsOffRoad} cars`
              },
              {
                icon: Leaf,
                title: "Carbon Offset",
                description: `Offsetting ${Math.round(totalCO2Saved / 0.9)} hours of factory emissions`,
                metric: `${Math.round(totalCO2Saved / 0.9)} hours`
              },
            ].map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Poppins'] font-semibold text-lg mb-2">
                      {example.title}
                    </h3>
                    <p className="text-white/80 text-sm font-['Inter'] mb-2">
                      {example.description}
                    </p>
                    <div className="font-['Poppins'] font-bold text-xl">
                      {example.metric}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm mb-1">Total Community Members</div>
              <div className="font-['Poppins'] font-bold text-3xl">{userCount.toLocaleString()}</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1B5E20] px-6 py-3 rounded-2xl font-['Poppins'] font-semibold flex items-center gap-2 shadow-xl"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Heat Reduction Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-[#FF7043] text-4xl font-['Poppins'] font-bold mb-2">
              -0.{Math.round(totalCO2Saved / 10)}°C
            </div>
            <div className="font-['Poppins'] font-semibold text-[#263238] mb-1">
              Local Heat Reduction
            </div>
            <div className="text-sm text-[#546E7A] font-['Inter']">
              Estimated decrease in urban heat island effect
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-[#26A69A] text-4xl font-['Poppins'] font-bold mb-2">
              {Math.round(totalCO2Saved * 3.5)}
            </div>
            <div className="font-['Poppins'] font-semibold text-[#263238] mb-1">
              Households Powered
            </div>
            <div className="text-sm text-[#546E7A] font-['Inter']">
              Energy equivalent for one day
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-[#43A047] text-4xl font-['Poppins'] font-bold mb-2">
              ${Math.round(totalCO2Saved * 45).toLocaleString()}
            </div>
            <div className="font-['Poppins'] font-semibold text-[#263238] mb-1">
              Economic Value
            </div>
            <div className="text-sm text-[#546E7A] font-['Inter']">
              Carbon credit equivalent
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}