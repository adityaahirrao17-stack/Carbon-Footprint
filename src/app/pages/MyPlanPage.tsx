import { motion } from "motion/react";
import { useState } from "react";
import { 
  Target, 
  TrendingDown, 
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  Home,
  Car,
  ShoppingBag,
  Utensils,
  Lightbulb,
  Award,
  Plus,
  Edit2,
  Trash2
} from "lucide-react";

type PlanCategory = "transport" | "energy" | "home" | "food" | "lifestyle";

interface Action {
  id: number;
  title: string;
  category: PlanCategory;
  co2Impact: number;
  difficulty: "easy" | "medium" | "hard";
  timeframe: string;
  completed: boolean;
  dueDate?: string;
}

export function MyPlanPage() {
  const [actions, setActions] = useState<Action[]>([
    {
      id: 1,
      title: "Switch to LED bulbs in all rooms",
      category: "energy",
      co2Impact: 120,
      difficulty: "easy",
      timeframe: "1 week",
      completed: true,
      dueDate: "Feb 20, 2026"
    },
    {
      id: 2,
      title: "Cycle to work 3 days per week",
      category: "transport",
      co2Impact: 240,
      difficulty: "medium",
      timeframe: "Ongoing",
      completed: false,
      dueDate: "Mar 30, 2026"
    },
    {
      id: 3,
      title: "Install solar water heater",
      category: "home",
      co2Impact: 580,
      difficulty: "hard",
      timeframe: "2 months",
      completed: false,
      dueDate: "Apr 15, 2026"
    },
    {
      id: 4,
      title: "Reduce meat consumption to 2 days/week",
      category: "food",
      co2Impact: 180,
      difficulty: "medium",
      timeframe: "1 month",
      completed: false,
      dueDate: "Mar 10, 2026"
    },
    {
      id: 5,
      title: "Use reusable bags for shopping",
      category: "lifestyle",
      co2Impact: 45,
      difficulty: "easy",
      timeframe: "Ongoing",
      completed: true,
      dueDate: "Feb 15, 2026"
    },
    {
      id: 6,
      title: "Switch to green energy provider",
      category: "energy",
      co2Impact: 650,
      difficulty: "easy",
      timeframe: "2 weeks",
      completed: false,
      dueDate: "Mar 5, 2026"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<PlanCategory | "all">("all");

  const categories = [
    { id: "all" as const, label: "All Actions", icon: Target, color: "#263238" },
    { id: "transport" as const, label: "Transport", icon: Car, color: "#FF7043" },
    { id: "energy" as const, label: "Energy", icon: Zap, color: "#FFB74D" },
    { id: "home" as const, label: "Home", icon: Home, color: "#26A69A" },
    { id: "food" as const, label: "Food", icon: Utensils, color: "#66BB6A" },
    { id: "lifestyle" as const, label: "Lifestyle", icon: ShoppingBag, color: "#1B5E20" }
  ];

  const toggleAction = (id: number) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  const deleteAction = (id: number) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const filteredActions = selectedCategory === "all" 
    ? actions 
    : actions.filter(action => action.category === selectedCategory);

  const completedActions = actions.filter(a => a.completed).length;
  const totalCO2Impact = actions.reduce((sum, a) => sum + a.co2Impact, 0);
  const achievedCO2 = actions.filter(a => a.completed).reduce((sum, a) => sum + a.co2Impact, 0);
  const progress = (completedActions / actions.length) * 100;

  const difficultyColors = {
    easy: "#43A047",
    medium: "#FFB74D",
    hard: "#FF7043"
  };

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
            My Climate Action Plan
          </h1>
          <p className="font-['Inter'] text-lg text-[#546E7A]">
            Track your personalized path to carbon reduction
          </p>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8" />
              <span className="text-sm opacity-90">Overall Progress</span>
            </div>
            <div className="text-4xl font-['Poppins'] font-bold mb-2">
              {progress.toFixed(0)}%
            </div>
            <div className="text-sm opacity-90">
              {completedActions} of {actions.length} actions completed
            </div>
            <div className="mt-4 w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-white h-full rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-[#43A047]" />
              <span className="text-sm font-['Inter'] text-[#546E7A]">CO₂ Impact</span>
            </div>
            <div className="text-4xl font-['Poppins'] font-bold text-[#263238] mb-2">
              {achievedCO2} kg
            </div>
            <div className="text-sm font-['Inter'] text-[#546E7A]">
              of {totalCO2Impact} kg target reduced
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 bg-[#E0F2F1] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievedCO2 / totalCO2Impact) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-gradient-to-r from-[#26A69A] to-[#43A047] h-full rounded-full"
                />
              </div>
              <span className="text-sm font-['Inter'] font-semibold text-[#43A047]">
                {((achievedCO2 / totalCO2Impact) * 100).toFixed(0)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-[#FF7043]" />
              <span className="text-sm font-['Inter'] text-[#546E7A]">Achievements</span>
            </div>
            <div className="text-4xl font-['Poppins'] font-bold text-[#263238] mb-2">
              {completedActions}
            </div>
            <div className="text-sm font-['Inter'] text-[#546E7A] mb-4">
              Actions completed this month
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= completedActions ? 'bg-gradient-to-br from-[#FF7043] to-[#FFB74D]' : 'bg-gray-200'
                  }`}
                >
                  {i <= completedActions && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Poppins'] font-semibold text-xl text-[#263238]">
              Action Categories
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white rounded-xl hover:shadow-lg transition-all font-['Inter'] font-medium">
              <Plus className="w-5 h-5" />
              Add Action
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const categoryActions = category.id === "all" 
                ? actions 
                : actions.filter(a => a.category === category.id);
              const categoryCompleted = categoryActions.filter(a => a.completed).length;
              
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#E0F2F1] to-white border-2 shadow-lg'
                      : 'bg-white border-2 border-[#E0F2F1] hover:border-[#26A69A]'
                  }`}
                  style={isSelected ? { borderColor: category.color } : {}}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: isSelected ? `${category.color}15` : '#E0F2F1' }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: isSelected ? category.color : '#26A69A' }}
                    />
                  </div>
                  <div className="text-sm font-['Poppins'] font-semibold text-[#263238] mb-1">
                    {category.label}
                  </div>
                  <div className="text-xs font-['Inter'] text-[#546E7A]">
                    {categoryCompleted}/{categoryActions.length}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Actions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-6">
            {selectedCategory === "all" ? "All Actions" : categories.find(c => c.id === selectedCategory)?.label + " Actions"}
          </h2>

          <div className="space-y-4">
            {filteredActions.map((action, index) => {
              const categoryData = categories.find(c => c.id === action.category);
              const Icon = categoryData?.icon || Lightbulb;
              
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className={`rounded-2xl p-6 border-2 transition-all ${
                    action.completed
                      ? 'bg-gradient-to-br from-[#E0F2F1] to-white border-[#43A047]'
                      : 'bg-white border-[#E0F2F1] hover:border-[#26A69A]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleAction(action.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      {action.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-[#43A047]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#B0BEC5] hover:text-[#26A69A]" />
                      )}
                    </button>

                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${categoryData?.color}15` }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: categoryData?.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-['Poppins'] font-semibold text-lg mb-2 ${
                        action.completed ? 'text-[#546E7A] line-through' : 'text-[#263238]'
                      }`}>
                        {action.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {/* Category */}
                        <div className="flex items-center gap-1 px-3 py-1 bg-[#E0F2F1] rounded-full">
                          <span className="text-xs font-['Inter'] font-medium text-[#26A69A] capitalize">
                            {action.category}
                          </span>
                        </div>

                        {/* Difficulty */}
                        <div 
                          className="flex items-center gap-1 px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${difficultyColors[action.difficulty]}15` }}
                        >
                          <span 
                            className="text-xs font-['Inter'] font-medium capitalize"
                            style={{ color: difficultyColors[action.difficulty] }}
                          >
                            {action.difficulty}
                          </span>
                        </div>

                        {/* Timeframe */}
                        <div className="flex items-center gap-1 text-[#546E7A]">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-['Inter']">{action.timeframe}</span>
                        </div>

                        {/* Due Date */}
                        {action.dueDate && (
                          <div className="flex items-center gap-1 text-[#546E7A]">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-['Inter']">Due: {action.dueDate}</span>
                          </div>
                        )}
                      </div>

                      {/* CO2 Impact */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#26A69A] to-[#43A047] text-white rounded-xl">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-['Poppins'] font-semibold">
                          {action.co2Impact} kg CO₂ impact
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-xl bg-[#E0F2F1] hover:bg-[#26A69A] hover:text-white transition-colors flex items-center justify-center">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteAction(action.id)}
                        className="w-10 h-10 rounded-xl bg-[#FFEBEE] hover:bg-[#FF7043] hover:text-white transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredActions.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-[#B0BEC5] mx-auto mb-4" />
              <p className="font-['Poppins'] font-semibold text-[#546E7A] mb-2">
                No actions in this category yet
              </p>
              <p className="font-['Inter'] text-sm text-[#546E7A]">
                Add your first action to start reducing your carbon footprint
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
