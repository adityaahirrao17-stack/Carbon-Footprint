import { Link, useLocation } from "react-router";
import { Leaf, LayoutDashboard, Target, Brain, Shield, Users, MapPin, User } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/my-plan", label: "My Plan", icon: Target },
    { path: "/ai-advisor", label: "AI Advisor", icon: Brain },
    { path: "/verification", label: "Verification", icon: Shield },
    { path: "/community", label: "Community", icon: Users },
    { path: "/initiatives", label: "City Initiatives", icon: MapPin },
  ];

  const mobileNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/my-plan", label: "Plan", icon: Target },
    { path: "/community", label: "Community", icon: Users },
    { path: "/verification", label: "Verify", icon: Shield },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-white border-b border-[#1B5E20]/10 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] p-2 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-['Poppins'] font-bold text-xl text-[#1B5E20]">
              Zerofy
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white shadow-lg"
                      : "text-[#263238] hover:bg-[#E0F2F1]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-['Inter'] font-medium text-sm">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Profile */}
          <Link to="/profile">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#E0F2F1] transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex border-t border-[#1B5E20]/10 bg-white">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive
                  ? "text-[#1B5E20] bg-[#E0F2F1]"
                  : "text-[#546E7A]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-['Inter']">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}