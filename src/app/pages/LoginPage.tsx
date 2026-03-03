import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      // Redirect to dashboard after "login"
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B5E20] via-[#26A69A] to-[#43A047] px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Poppins'] font-bold text-4xl text-white mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 font-['Inter'] text-base"
          >
            Sign in to your Zerofy account
          </motion.p>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-['Poppins'] font-semibold text-[#263238] mb-3">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#26A69A] group-focus-within:text-[#1B5E20] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#E0F2F1] focus:border-[#26A69A] focus:outline-none bg-[#F8FFFE] hover:bg-white transition-all font-['Inter'] text-[#263238] placeholder-[#999]"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-['Poppins'] font-semibold text-[#263238] mb-3">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#26A69A] group-focus-within:text-[#1B5E20] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-[#E0F2F1] focus:border-[#26A69A] focus:outline-none bg-[#F8FFFE] hover:bg-white transition-all font-['Inter'] text-[#263238] placeholder-[#999]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#546E7A] hover:text-[#26A69A] transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-2 border-[#E0F2F1] checked:bg-[#26A69A] checked:border-[#26A69A] accent-[#26A69A] cursor-pointer transition-colors"
                />
                <span className="text-sm font-['Inter'] text-[#546E7A] group-hover:text-[#26A69A] transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-['Inter'] text-[#26A69A] hover:text-[#1B5E20] font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-7 bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white py-3.5 rounded-2xl font-['Poppins'] font-semibold text-lg shadow-lg hover:shadow-xl hover:from-[#0d3f14] hover:to-[#1a8070] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E0F2F1]"></div>
            <span className="text-[#999] text-sm font-['Inter']">OR</span>
            <div className="flex-1 h-px bg-[#E0F2F1]"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm font-['Inter'] text-[#546E7A]">
            Don't have an account?{" "}
            <a href="#" className="text-[#26A69A] font-semibold hover:text-[#1B5E20] transition-colors">
              Create one now
            </a>
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 gap-4"
        >
          <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="text-xs font-['Inter'] text-white/80 mb-1">🔐</div>
            <p className="text-xs font-['Inter'] text-white/70">Secure Login</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="text-xs font-['Inter'] text-white/80 mb-1">🛡️</div>
            <p className="text-xs font-['Inter'] text-white/70">Data Protected</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
