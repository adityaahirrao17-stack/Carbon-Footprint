import { motion } from "motion/react";
import { 
  TrendingDown, 
  Target, 
  Zap, 
  Award,
  Leaf,
  Car,
  Home,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Shield
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

export function DashboardPage() {
  // Mock data for carbon breakdown
  const emissionData = [
    { name: "Transportation", value: 450, color: "#FF7043" },
    { name: "Home Energy", value: 320, color: "#26A69A" },
    { name: "Food", value: 180, color: "#43A047" },
    { name: "Shopping", value: 150, color: "#66BB6A" },
  ];

  const totalEmissions = emissionData.reduce((sum, item) => sum + item.value, 0);

  // Carbon Confidence Data
  const confidenceData = [
    { name: "Bill Verified", value: 40, color: "#FFB74D" },
    { name: "API Verified", value: 38, color: "#26A69A" },
    { name: "Self-Reported", value: 22, color: "#B0BEC5" }
  ];
  
  const confidencePercentage = 78; // 78% verified (Bill + API)

  // Monthly trend data
  const trendData = [
    { month: "Oct", emissions: 1250 },
    { month: "Nov", emissions: 1180 },
    { month: "Dec", emissions: 1120 },
    { month: "Jan", emissions: 1100 },
    { month: "Feb", emissions: 1000 },
  ];

  // Habit challenges
  const habits = [
    { name: "Use public transport 3x/week", streak: 12, goal: 30, icon: Car, completed: 12, total: 30 },
    { name: "Reduce meat consumption", streak: 8, goal: 30, icon: ShoppingBag, completed: 8, total: 30 },
    { name: "Turn off unused lights", streak: 20, goal: 30, icon: Zap, completed: 20, total: 30 },
  ];

  // Personalized roadmap
  const roadmapActions = [
    { 
      action: "Switch to cycling for short distances",
      difficulty: "Easy",
      co2Saved: "45 kg/month",
      status: "in-progress",
      icon: Car
    },
    { 
      action: "Install LED bulbs in all rooms",
      difficulty: "Easy",
      co2Saved: "12 kg/month",
      status: "completed",
      icon: Zap
    },
    { 
      action: "Start composting organic waste",
      difficulty: "Medium",
      co2Saved: "8 kg/month",
      status: "upcoming",
      icon: Leaf
    },
    { 
      action: "Switch to renewable energy provider",
      difficulty: "Medium",
      co2Saved: "120 kg/month",
      status: "upcoming",
      icon: Home
    },
  ];

  const carbonGrade = "B+";
  const reductionPercentage = 12;
  const weeklyGoal = 250;
  const currentWeekly = 220;

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
            Your Climate Dashboard
          </h1>
          <p className="font-['Inter'] text-[#546E7A]">
            Track your progress and make informed decisions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Carbon Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Inter'] text-sm opacity-90">Carbon Score</span>
                <Award className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-6xl font-['Poppins'] font-bold mb-2">{carbonGrade}</div>
                <div className="text-sm opacity-90">Above Average</div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span>This Month</span>
                  <span className="font-semibold">{totalEmissions} kg CO₂</span>
                </div>
              </div>
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#26A69A]" />
                <span className="font-['Poppins'] font-semibold text-[#263238]">Weekly Goal</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#546E7A]">Current</span>
                  <span className="font-semibold text-[#263238]">{currentWeekly} kg</span>
                </div>
                <div className="w-full bg-[#E0F2F1] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentWeekly / weeklyGoal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-[#1B5E20] to-[#43A047] h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#546E7A]">Goal</span>
                  <span className="font-semibold text-[#263238]">{weeklyGoal} kg</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <h3 className="font-['Poppins'] font-semibold text-[#263238] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: "Log Activity", icon: Calendar, color: "#26A69A" },
                  { label: "View AI Tips", icon: Zap, color: "#FF7043" },
                  { label: "Check Initiatives", icon: Leaf, color: "#43A047" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#E0F2F1] transition-colors text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${action.color}15` }}
                    >
                      <action.icon className="w-5 h-5" style={{ color: action.color }} />
                    </div>
                    <span className="font-['Inter'] text-[#263238]">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* Carbon Assessment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
                  Emission Breakdown
                </h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#E0F2F1] rounded-xl">
                  <TrendingDown className="w-4 h-4 text-[#43A047]" />
                  <span className="font-['Poppins'] font-semibold text-[#43A047]">
                    -{reductionPercentage}% this month
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Donut Chart */}
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={emissionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {emissionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend and Stats */}
                <div className="flex flex-col justify-center space-y-4">
                  {emissionData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-['Inter'] text-[#263238]">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-['Poppins'] font-semibold text-[#263238]">
                          {item.value} kg
                        </div>
                        <div className="text-sm text-[#546E7A]">
                          {Math.round((item.value / totalEmissions) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-[#E0F2F1]">
                    <div className="flex items-center justify-between">
                      <span className="font-['Poppins'] font-semibold text-[#263238]">Total</span>
                      <span className="font-['Poppins'] font-bold text-xl text-[#263238]">
                        {totalEmissions} kg CO₂
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Carbon Confidence Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-gradient-to-br from-white to-[#E0F2F1] rounded-3xl p-8 shadow-lg border-2 border-[#26A69A]/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#26A69A] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
                    Carbon Confidence Meter
                  </h2>
                  <p className="font-['Inter'] text-sm text-[#546E7A]">
                    Data verification increases credibility
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Confidence Donut Chart */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    <ResponsiveContainer width={240} height={240}>
                      <PieChart>
                        <Pie
                          data={confidenceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {confidenceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-['Poppins'] font-bold text-[#1B5E20]">
                          {confidencePercentage}%
                        </div>
                        <div className="text-sm font-['Inter'] text-[#546E7A]">
                          Verified
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center font-['Inter'] text-sm text-[#26A69A] font-semibold mt-4">
                    "Your carbon reduction is {confidencePercentage}% verified."
                  </p>
                </div>

                {/* Breakdown */}
                <div className="flex flex-col justify-center space-y-4">
                  {confidenceData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-['Poppins'] font-semibold text-[#263238]">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-['Poppins'] font-bold text-lg text-[#263238]">
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-[#E0F2F1] rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Info Box */}
                  <div className="bg-[#1B5E20]/5 border-2 border-[#1B5E20]/20 rounded-2xl p-4 mt-4">
                    <p className="font-['Inter'] text-sm text-[#263238]">
                      <span className="font-semibold text-[#1B5E20]">High confidence!</span> Connect more devices or upload bills to increase verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Legend */}
              <div className="mt-6 pt-6 border-t border-[#E0F2F1]">
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#43A047]"></div>
                    <span className="font-['Inter'] text-[#546E7A]">High Confidence (Green)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#26A69A]"></div>
                    <span className="font-['Inter'] text-[#546E7A]">Medium (Teal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#B0BEC5]"></div>
                    <span className="font-['Inter'] text-[#546E7A]">Low (Gray)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reduction Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                5-Month Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#26A69A" 
                    strokeWidth={3}
                    dot={{ fill: '#26A69A', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Micro Habit Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
                  30-Day Climate Missions
                </h2>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#FF7043]" />
                  <span className="font-['Poppins'] font-bold text-[#FF7043]">20 Day Streak!</span>
                </div>
              </div>

              <div className="space-y-4">
                {habits.map((habit, index) => (
                  <div
                    key={habit.name}
                    className="border border-[#E0F2F1] rounded-2xl p-4 hover:border-[#26A69A] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center flex-shrink-0">
                        <habit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                            {habit.name}
                          </h3>
                          <span className="text-sm font-['Inter'] text-[#546E7A]">
                            {habit.completed}/{habit.total} days
                          </span>
                        </div>
                        <div className="w-full bg-[#E0F2F1] rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(habit.completed / habit.total) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="bg-gradient-to-r from-[#26A69A] to-[#43A047] h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Personalized Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                Your Climate Roadmap
              </h2>

              <div className="space-y-4">
                {roadmapActions.map((item, index) => (
                  <div
                    key={item.action}
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      item.status === 'completed'
                        ? 'border-[#43A047] bg-[#43A047]/5'
                        : item.status === 'in-progress'
                        ? 'border-[#26A69A] bg-[#26A69A]/5'
                        : 'border-[#E0F2F1] hover:border-[#26A69A]'
                    }`}
                  >
                    {/* Status indicator */}
                    <div className="flex items-center justify-center flex-shrink-0">
                      {item.status === 'completed' ? (
                        <div className="w-8 h-8 rounded-full bg-[#43A047] flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      ) : item.status === 'in-progress' ? (
                        <div className="w-8 h-8 rounded-full bg-[#26A69A] flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-[#E0F2F1] bg-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                          {item.action}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-['Inter'] font-medium ${
                            item.difficulty === 'Easy'
                              ? 'bg-[#43A047]/10 text-[#43A047]'
                              : 'bg-[#FF7043]/10 text-[#FF7043]'
                          }`}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-[#546E7A]">
                          <TrendingDown className="w-4 h-4" />
                          <span>{item.co2Saved}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}