import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { 
  Brain, 
  Send, 
  Car, 
  Bike, 
  Train, 
  Bus,
  TrendingDown,
  Clock,
  Cloud,
  CheckCircle,
  Sparkles,
  AlertCircle
} from "lucide-react";

interface TravelOption {
  mode: string;
  icon: any;
  time: string;
  co2: number;
  cost: string;
  color: string;
}

export function AIAdvisorPage() {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

  const callGeminiAPI = async (userMessage: string) => {
    if (!apiKey) {
      setError("API key not configured. Please check .env.local");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Zerofy",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are Zerofy, an AI Climate Decision Assistant specialized in SDG 13: Climate Action. Your role is to provide personalized, actionable recommendations exclusively on climate-related topics including:

1. Carbon footprint calculation and reduction
2. Climate awareness and climate change education
3. Sustainable lifestyle choices and practices
4. Renewable energy and energy efficiency
5. Sustainable transportation options
6. Climate-friendly food and consumption choices
7. Environmental conservation practices
8. Climate action initiatives and solutions
9. Personal carbon offset strategies
10. Climate policy and community action

IMPORTANT RESTRICTIONS:
- Only answer questions related to climate change, carbon footprint, sustainability, and SDG 13 topics
- If a user asks about topics unrelated to climate and sustainability, politely decline and redirect them to climate-related questions
- Provide evidence-based, scientifically accurate information
- Give practical, actionable recommendations that individuals can implement
- Be encouraging and supportive in promoting climate action
- If unsure about a climate-related query, acknowledge limitations and suggest verified resources

Example of appropriate response: "I'd be happy to help you understand your carbon footprint and sustainable alternatives!"
Example of declining inappropriate query: "I'm specifically designed to help with climate and sustainability questions. Do you have any questions about reducing your carbon footprint or climate action?"`,
              },
              {
                role: "user",
                content: userMessage,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "Unable to generate response";
      
      setMessages([
        ...messages,
        { role: "user", content: userMessage },
        { role: "assistant", content: aiResponse },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("OpenRouter API Error:", err);
      console.error("API Key present:", !!apiKey);
      console.error("Error details:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await callGeminiAPI(input);
      setInput("");
      setShowResults(true);
    }
  };

  // Mock travel options data
  const travelOptions: TravelOption[] = [
    {
      mode: "Bicycle",
      icon: Bike,
      time: "25 min",
      co2: 0,
      cost: "Free",
      color: "#43A047"
    },
    {
      mode: "Public Bus",
      icon: Bus,
      time: "18 min",
      co2: 45,
      cost: "$1.50",
      color: "#26A69A"
    },
    {
      mode: "Metro",
      icon: Train,
      time: "15 min",
      co2: 38,
      cost: "$2.00",
      color: "#26A69A"
    },
    {
      mode: "Personal Car",
      icon: Car,
      time: "12 min",
      co2: 280,
      cost: "$3.50",
      color: "#FF7043"
    }
  ];

  const recommendedOption = travelOptions[1]; // Public Bus

  return (
    <div className="min-h-screen bg-[#F1F8F6] pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#1B5E20] to-[#26A69A] mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-['Poppins'] font-bold text-4xl text-[#263238] mb-2">
            AI Climate Decision Assistant
          </h1>
          <p className="font-['Inter'] text-[#546E7A] max-w-2xl mx-auto">
            Get intelligent, personalized recommendations for every decision you make
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6"
        >
          {/* Example prompts */}
          {!showResults && (
            <div className="p-8 border-b border-[#E0F2F1]">
              <h3 className="font-['Poppins'] font-semibold text-[#263238] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#26A69A]" />
                Try asking:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "I need to travel 10 km tomorrow at 4 PM",
                  "Should I order food delivery or cook?",
                  "What's the most eco-friendly way to commute?",
                  "How can I reduce my home energy usage?"
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt);
                      setShowResults(true);
                    }}
                    className="text-left p-4 rounded-2xl border-2 border-[#E0F2F1] hover:border-[#26A69A] hover:bg-[#E0F2F1]/30 transition-all"
                  >
                    <span className="font-['Inter'] text-sm text-[#263238]">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your climate decisions..."
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-2xl bg-[#F1F8F6] border-2 border-transparent focus:border-[#26A69A] focus:bg-white outline-none transition-all font-['Inter'] text-[#263238] disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white flex items-center gap-2 font-['Poppins'] font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">{loading ? "Thinking..." : "Ask"}</span>
              </motion.button>
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 text-sm font-['Inter']">{error}</span>
              </div>
            )}
          </form>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Chat Messages */}
            {messages.length > 0 && (
              <div className="space-y-4 mb-6">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-2xl px-4 py-3 rounded-2xl font-['Inter'] ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white"
                          : "bg-gradient-to-br from-[#26A69A]/10 to-[#43A047]/10 text-[#263238] border-2 border-[#26A69A]/20"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* AI Response */}
            {messages.length > 0 && (
              <div className="bg-gradient-to-br from-[#26A69A]/10 to-[#43A047]/10 rounded-3xl p-6 border-2 border-[#26A69A]/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#26A69A] flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Poppins'] font-semibold text-[#263238] mb-2">
                      Climate Recommendation
                    </h3>
                    <p className="font-['Inter'] text-[#263238] leading-relaxed whitespace-pre-wrap">
                      {messages[messages.length - 1]?.content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Context */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
              <Cloud className="w-5 h-5 text-[#26A69A]" />
              <span className="font-['Inter'] text-sm text-[#546E7A]">
                Weather tomorrow at 4 PM: <span className="font-semibold text-[#263238]">Clear, 22°C</span>
              </span>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-[#E0F2F1]">
                <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238]">
                  Travel Mode Comparison
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F1F8F6]">
                      <th className="px-6 py-4 text-left font-['Poppins'] font-semibold text-[#263238]">
                        Mode
                      </th>
                      <th className="px-6 py-4 text-left font-['Poppins'] font-semibold text-[#263238]">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left font-['Poppins'] font-semibold text-[#263238]">
                        CO₂ Emissions
                      </th>
                      <th className="px-6 py-4 text-left font-['Poppins'] font-semibold text-[#263238]">
                        Cost
                      </th>
                      <th className="px-6 py-4 text-left font-['Poppins'] font-semibold text-[#263238]">
                        Recommendation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {travelOptions.map((option, index) => {
                      const isRecommended = option.mode === recommendedOption.mode;
                      return (
                        <motion.tr
                          key={option.mode}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`border-b border-[#E0F2F1] transition-all ${
                            isRecommended 
                              ? 'bg-gradient-to-r from-[#43A047]/10 to-[#26A69A]/10' 
                              : 'hover:bg-[#F1F8F6]/50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${option.color}15` }}
                              >
                                <option.icon 
                                  className="w-5 h-5" 
                                  style={{ color: option.color }}
                                />
                              </div>
                              <span className="font-['Inter'] font-medium text-[#263238]">
                                {option.mode}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#546E7A]" />
                              <span className="font-['Inter'] text-[#263238]">
                                {option.time}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <TrendingDown 
                                className="w-4 h-4" 
                                style={{ color: option.color }}
                              />
                              <span 
                                className="font-['Poppins'] font-semibold"
                                style={{ color: option.color }}
                              >
                                {option.co2} g
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-['Inter'] text-[#263238]">
                              {option.cost}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {isRecommended && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#43A047] rounded-full w-fit">
                                <CheckCircle className="w-4 h-4 text-white" />
                                <span className="font-['Inter'] font-medium text-sm text-white">
                                  Best Choice
                                </span>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <recommendedOption.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-bold text-2xl mb-2">
                    Recommended: {recommendedOption.mode}
                  </h3>
                  <p className="text-white/90 font-['Inter']">
                    Perfect balance of time efficiency and environmental impact
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-white/70 text-sm mb-1">You'll Save</div>
                  <div className="font-['Poppins'] font-bold text-2xl">235 g</div>
                  <div className="text-white/70 text-sm">CO₂ vs driving</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-white/70 text-sm mb-1">Travel Time</div>
                  <div className="font-['Poppins'] font-bold text-2xl">{recommendedOption.time}</div>
                  <div className="text-white/70 text-sm">Reliable schedule</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-white/70 text-sm mb-1">Cost</div>
                  <div className="font-['Poppins'] font-bold text-2xl">{recommendedOption.cost}</div>
                  <div className="text-white/70 text-sm">Per trip</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/90 font-['Inter'] text-sm">
                  💡 <strong>Pro tip:</strong> Taking the bus instead of driving this route saves the equivalent 
                  of charging your smartphone 47 times!
                </p>
              </div>
            </motion.div>

            {/* Additional Insights */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-['Poppins'] font-semibold text-[#263238] mb-3">
                  Impact Over Time
                </h4>
                <p className="font-['Inter'] text-sm text-[#546E7A] mb-4">
                  If you make this choice daily for a month:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#546E7A]">CO₂ Saved</span>
                    <span className="font-['Poppins'] font-semibold text-[#43A047]">7.05 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#546E7A]">Trees Equivalent</span>
                    <span className="font-['Poppins'] font-semibold text-[#43A047]">0.3 trees</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#546E7A]">Money Saved</span>
                    <span className="font-['Poppins'] font-semibold text-[#43A047]">$60</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FF7043]/10 to-[#FF7043]/5 rounded-2xl p-6 border-2 border-[#FF7043]/20">
                <h4 className="font-['Poppins'] font-semibold text-[#263238] mb-3">
                  Alternative Suggestion
                </h4>
                <p className="font-['Inter'] text-sm text-[#263238] mb-4">
                  Weather is great! Consider cycling for maximum impact:
                </p>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <Bike className="w-8 h-8 text-[#43A047]" />
                  <div>
                    <div className="font-['Poppins'] font-semibold text-[#263238]">
                      Zero Emissions
                    </div>
                    <div className="text-sm text-[#546E7A]">
                      + Health benefits!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
