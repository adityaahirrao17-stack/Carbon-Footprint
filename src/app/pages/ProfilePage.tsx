import { motion } from "motion/react";
import { useState } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Target,
  TrendingDown,
  Leaf,
  Edit2,
  Camera,
  Bell,
  Shield,
  Globe,
  Smartphone,
  CheckCircle2,
  Flame,
  Trophy,
  Star,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    location: "San Francisco, CA",
    joinDate: "January 2026",
    bio: "Environmental enthusiast committed to making a difference through everyday actions.",
    carbonScore: "B+",
    totalCO2Saved: 847,
    currentStreak: 23,
    longestStreak: 45,
    completedChallenges: 12,
    treesPlanted: 42
  };

  // Score history
  const scoreHistory = [
    { month: "Oct", score: 65 },
    { month: "Nov", score: 70 },
    { month: "Dec", score: 75 },
    { month: "Jan", score: 80 },
    { month: "Feb", score: 85 },
  ];

  // Achievements
  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Completed your first carbon assessment",
      icon: Leaf,
      unlocked: true,
      date: "Jan 15, 2026",
      color: "#43A047"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: Flame,
      unlocked: true,
      date: "Jan 22, 2026",
      color: "#FF7043"
    },
    {
      id: 3,
      title: "Carbon Reducer",
      description: "Reduced emissions by 20%",
      icon: TrendingDown,
      unlocked: true,
      date: "Feb 5, 2026",
      color: "#26A69A"
    },
    {
      id: 4,
      title: "Tree Planter",
      description: "Offset equivalent to 50 trees",
      icon: Leaf,
      unlocked: false,
      date: null,
      color: "#66BB6A"
    },
    {
      id: 5,
      title: "Community Leader",
      description: "Inspire 10 friends to join",
      icon: Trophy,
      unlocked: false,
      date: null,
      color: "#1B5E20"
    },
    {
      id: 6,
      title: "Climate Champion",
      description: "Achieve Grade A for 3 months",
      icon: Star,
      unlocked: false,
      date: null,
      color: "#FFD700"
    }
  ];

  // Activity log
  const recentActivity = [
    {
      id: 1,
      action: "Completed 30-day cycling challenge",
      co2Saved: 45,
      date: "2 days ago",
      icon: CheckCircle2,
      color: "#43A047"
    },
    {
      id: 2,
      action: "Used public transport",
      co2Saved: 12,
      date: "3 days ago",
      icon: Zap,
      color: "#26A69A"
    },
    {
      id: 3,
      action: "Joined Green Belt Expansion",
      co2Saved: 0,
      date: "5 days ago",
      icon: Leaf,
      color: "#66BB6A"
    },
    {
      id: 4,
      action: "Switched to LED bulbs",
      co2Saved: 8,
      date: "1 week ago",
      icon: Zap,
      color: "#FF7043"
    }
  ];

  // Personal goals
  const goals = [
    {
      id: 1,
      title: "Monthly CO₂ Target",
      current: 220,
      target: 250,
      unit: "kg",
      icon: Target
    },
    {
      id: 2,
      title: "Active Days This Month",
      current: 18,
      target: 25,
      unit: "days",
      icon: Calendar
    },
    {
      id: 3,
      title: "Trees Offset",
      current: 42,
      target: 50,
      unit: "trees",
      icon: Leaf
    }
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
            My Profile
          </h1>
          <p className="font-['Inter'] text-[#546E7A]">
            Manage your account and track your climate journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              {/* Profile Picture */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#FF7043] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="font-['Poppins'] font-bold text-2xl text-[#263238] mb-1">
                  {userData.name}
                </h2>
                <p className="font-['Inter'] text-sm text-[#546E7A] mb-4">
                  {userData.bio}
                </p>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E0F2F1] text-[#1B5E20] hover:bg-[#26A69A] hover:text-white transition-colors font-['Inter'] font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 pt-6 border-t border-[#E0F2F1]">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#26A69A]" />
                  <span className="font-['Inter'] text-[#263238]">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#26A69A]" />
                  <span className="font-['Inter'] text-[#263238]">{userData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[#26A69A]" />
                  <span className="font-['Inter'] text-[#263238]">Joined {userData.joinDate}</span>
                </div>
              </div>
            </motion.div>

            {/* Carbon Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Inter'] text-sm opacity-90">Current Score</span>
                <Award className="w-5 h-5" />
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl font-['Poppins'] font-bold mb-2">
                  {userData.carbonScore}
                </div>
                <div className="text-sm opacity-90">Climate Grade</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-['Poppins'] font-bold">
                    {userData.totalCO2Saved}
                  </div>
                  <div className="text-xs opacity-80">kg CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-['Poppins'] font-bold">
                    {userData.treesPlanted}
                  </div>
                  <div className="text-xs opacity-80">Trees Offset</div>
                </div>
              </div>
            </motion.div>

            {/* Streak Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7043] to-[#FF8A65] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                    Active Streak
                  </h3>
                  <p className="text-sm font-['Inter'] text-[#546E7A]">
                    Keep it going!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#E0F2F1] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-['Poppins'] font-bold text-[#26A69A]">
                    {userData.currentStreak}
                  </div>
                  <div className="text-sm font-['Inter'] text-[#546E7A]">
                    Current Streak
                  </div>
                </div>
                <div className="bg-[#E0F2F1] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-['Poppins'] font-bold text-[#1B5E20]">
                    {userData.longestStreak}
                  </div>
                  <div className="text-sm font-['Inter'] text-[#546E7A]">
                    Best Streak
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="lg:col-span-8 space-y-6">
            {/* Personal Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                Personal Goals
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {goals.map((goal, index) => (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                        <goal.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['Poppins'] font-semibold text-sm text-[#263238]">
                          {goal.title}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#546E7A]">Progress</span>
                        <span className="font-['Poppins'] font-semibold text-[#263238]">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-[#E0F2F1] rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="bg-gradient-to-r from-[#26A69A] to-[#43A047] h-full rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Score Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                Score Progress
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0F2F1" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#546E7A"
                    style={{ fontFamily: 'Inter' }}
                  />
                  <YAxis 
                    stroke="#546E7A"
                    style={{ fontFamily: 'Inter' }}
                    domain={[0, 100]}
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
                    dataKey="score" 
                    stroke="#26A69A" 
                    strokeWidth={3}
                    dot={{ fill: '#26A69A', r: 6 }}
                    activeDot={{ r: 8 }}
                    name="Climate Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
                  Achievements
                </h2>
                <span className="font-['Inter'] text-sm text-[#546E7A]">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={`rounded-2xl p-4 border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-transparent bg-gradient-to-br from-[#E0F2F1] to-white shadow-sm'
                        : 'border-[#E0F2F1] bg-white opacity-50 grayscale'
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ 
                        backgroundColor: achievement.unlocked ? `${achievement.color}15` : '#E0F2F1'
                      }}
                    >
                      <achievement.icon 
                        className="w-6 h-6" 
                        style={{ color: achievement.unlocked ? achievement.color : '#546E7A' }}
                      />
                    </div>
                    <h3 className="font-['Poppins'] font-semibold text-[#263238] mb-1">
                      {achievement.title}
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#546E7A] mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <div className="text-xs font-['Inter'] text-[#26A69A]">
                        Unlocked {achievement.date}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#E0F2F1] transition-colors"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}15` }}
                    >
                      <activity.icon 
                        className="w-6 h-6" 
                        style={{ color: activity.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                        {activity.action}
                      </h3>
                      <p className="text-sm font-['Inter'] text-[#546E7A]">
                        {activity.date}
                      </p>
                    </div>
                    {activity.co2Saved > 0 && (
                      <div className="text-right">
                        <div className="font-['Poppins'] font-bold text-[#43A047]">
                          -{activity.co2Saved} kg
                        </div>
                        <div className="text-xs font-['Inter'] text-[#546E7A]">
                          CO₂
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Settings Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
                Account Settings
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Bell,
                    title: "Notifications",
                    description: "Manage your notification preferences",
                    color: "#FF7043"
                  },
                  {
                    icon: Shield,
                    title: "Privacy & Security",
                    description: "Control your data and security settings",
                    color: "#26A69A"
                  },
                  {
                    icon: Globe,
                    title: "Language & Region",
                    description: "Change your language and location settings",
                    color: "#43A047"
                  },
                  {
                    icon: Smartphone,
                    title: "Connected Devices",
                    description: "Manage devices connected to your account",
                    color: "#1B5E20"
                  }
                ].map((setting, index) => (
                  <button
                    key={setting.title}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#E0F2F1] transition-colors text-left"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${setting.color}15` }}
                    >
                      <setting.icon 
                        className="w-6 h-6" 
                        style={{ color: setting.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                        {setting.title}
                      </h3>
                      <p className="text-sm font-['Inter'] text-[#546E7A]">
                        {setting.description}
                      </p>
                    </div>
                    <Edit2 className="w-5 h-5 text-[#546E7A]" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
