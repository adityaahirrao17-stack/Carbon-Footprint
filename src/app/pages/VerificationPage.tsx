import { motion } from "motion/react";
import { useState } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Shield, 
  Zap,
  Smartphone,
  Car,
  Activity,
  Link2,
  Lock,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Check,
  X
} from "lucide-react";

type VerificationLevel = "self-reported" | "bill-verified" | "api-verified" | "fully-integrated";

interface BillData {
  name: string;
  address: string;
  accountNumber: string;
  monthlyConsumption: number; // in kWh
  previousConsumption: number;
  carbonFootprint: number; // in kg CO2
  unit: string;
  billDate: string;
  monthlyData: Array<{ month: string; usage: number }>;
}

export function VerificationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [billData, setBillData] = useState<BillData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

  // Smart device connections
  const [connections, setConnections] = useState({
    evCharging: false,
    smartMeter: false,
    fitnessApp: false,
    rideSharing: false
  });

  const verificationLevel: VerificationLevel = 
    connections.evCharging && connections.smartMeter && connections.fitnessApp ? "fully-integrated" :
    connections.smartMeter || connections.evCharging ? "api-verified" :
    isVerified ? "bill-verified" : "self-reported";

  const verificationLevels = [
    { level: "self-reported", label: "Level 1: Self-Reported", color: "#B0BEC5", active: true },
    { level: "bill-verified", label: "Level 2: Bill Verified", color: "#FFB74D", active: verificationLevel !== "self-reported" },
    { level: "api-verified", label: "Level 3: API Verified", color: "#26A69A", active: verificationLevel === "api-verified" || verificationLevel === "fully-integrated" },
    { level: "fully-integrated", label: "Level 4: Fully Integrated", color: "#1B5E20", active: verificationLevel === "fully-integrated" }
  ];

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  // Analyze bill using OpenRouter Vision API
  const analyzeBillWithAI = async (base64Image: string, mimeType: string) => {
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
            "X-Title": "Zerofy - Bill Analyzer",
          },
          body: JSON.stringify({
            model: "openai/gpt-4-vision",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Analyze this electricity bill image and extract the following information in JSON format:
{
  "name": "customer name",
  "address": "customer address",
  "accountNumber": "account number",
  "monthlyConsumption": number (current month usage in kWh),
  "previousConsumption": number (previous month usage in kWh),
  "unit": "kWh or unit shown",
  "billDate": "date on bill",
  "monthlyData": [{"month": "Jan", "usage": 150}, ...] (last 12 months if available)
}

Also calculate carbon footprint:
- Use 0.85 kg CO2 per kWh as the conversion factor (standard grid average)
- carbonFootprint = monthlyConsumption * 0.85

If any field is not visible or unclear, use reasonable estimates based on the visible data.
Return ONLY valid JSON, no other text.`,
                  },
                  {
                    type: "image",
                    image: base64Image,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to analyze bill");
      }

      const data = await response.json();
      const analysisText = data.choices?.[0]?.message?.content;

      // Parse JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not extract data from bill");
      }

      const extractedData = JSON.parse(jsonMatch[0]);
      const billDataWithCarbon: BillData = {
        ...extractedData,
        carbonFootprint: extractedData.monthlyConsumption * 0.85,
      };

      setBillData(billDataWithCarbon);
      setIsVerified(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze bill";
      setError(errorMessage);
      console.error("Bill Analysis Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      // Determine MIME type
      const mimeType = file.type || "image/jpeg";

      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(mimeType)) {
        setError("Please upload a JPG or PNG image of your bill");
        return;
      }

      // Convert and analyze
      try {
        const base64 = await fileToBase64(file);
        await analyzeBillWithAI(base64, mimeType);
      } catch (err) {
        setError("Failed to process file");
        console.error(err);
      }
    }
  };

  const toggleConnection = (device: keyof typeof connections) => {
    setConnections(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const smartDevices = [
    {
      id: "evCharging",
      name: "EV Charging Apps",
      icon: Car,
      description: "Connect your electric vehicle charging history",
      lastSync: "2 hours ago",
      dataPoints: "145 charging sessions"
    },
    {
      id: "smartMeter",
      name: "Smart Electricity Meter",
      icon: Zap,
      description: "Real-time energy consumption tracking",
      lastSync: "5 minutes ago",
      dataPoints: "2,340 kWh this month"
    },
    {
      id: "fitnessApp",
      name: "Fitness Apps",
      icon: Activity,
      description: "Track cycling and walking distance",
      lastSync: "1 day ago",
      dataPoints: "42 km cycled this week"
    },
    {
      id: "rideSharing",
      name: "Ride-sharing History",
      icon: Smartphone,
      description: "Import trip data from ride-sharing apps",
      lastSync: "Never",
      dataPoints: "Not connected"
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
            Verify Your Carbon Reduction
          </h1>
          <p className="font-['Inter'] text-lg text-[#546E7A]">
            Connect real data to increase the credibility of your climate impact.
          </p>
        </motion.div>

        {/* Verification Level Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-['Poppins'] font-semibold text-2xl text-[#263238] mb-1">
                Your Verification Status
              </h2>
              <p className="font-['Inter'] text-sm text-[#546E7A]">
                Higher verification levels increase credibility
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ backgroundColor: `${verificationLevels.find(v => v.level === verificationLevel)?.color}15` }}>
              <Shield className="w-5 h-5" style={{ color: verificationLevels.find(v => v.level === verificationLevel)?.color }} />
              <span className="font-['Poppins'] font-semibold" style={{ color: verificationLevels.find(v => v.level === verificationLevel)?.color }}>
                {verificationLevels.find(v => v.level === verificationLevel)?.label}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {verificationLevels.map((level, index) => (
              <div key={level.level} className="relative">
                <div className={`rounded-2xl p-4 transition-all ${level.active ? 'bg-gradient-to-br from-[#E0F2F1] to-white border-2' : 'bg-gray-50 border-2 border-gray-200'}`} style={level.active ? { borderColor: level.color } : {}}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: level.active ? `${level.color}15` : '#E0E0E0' }}>
                      {level.active ? (
                        <Check className="w-5 h-5" style={{ color: level.color }} />
                      ) : (
                        <span className="text-sm font-semibold text-gray-400">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-['Poppins'] font-semibold text-[#263238] mb-1">
                    Level {index + 1}
                  </div>
                  <div className="text-xs font-['Inter'] text-[#546E7A]">
                    {level.label.split(': ')[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* A. Bill Upload Verification */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-white rounded-3xl p-8 shadow-lg transition-all ${isVerified ? 'border-4 border-[#43A047]' : ''}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#26A69A] to-[#43A047] flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-['Poppins'] font-semibold text-xl text-[#263238]">
                  Bill Upload Verification
                </h2>
                <p className="text-sm font-['Inter'] text-[#546E7A]">
                  Upload your bills for verification
                </p>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <label className="block">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <div className="border-2 border-dashed border-[#26A69A] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#E0F2F1] transition-colors">
                <FileText className="w-12 h-12 text-[#26A69A] mx-auto mb-4" />
                <p className="font-['Poppins'] font-semibold text-[#263238] mb-2">
                  Drop your bill here or click to upload
                </p>
                <p className="text-sm font-['Inter'] text-[#546E7A]">
                  Electricity bill, fuel receipt, or LPG bill
                </p>
              </div>
            </label>

            {/* File Preview & Extracted Data */}
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                {/* File Info */}
                <div className="bg-[#E0F2F1] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#26A69A]" />
                    <div>
                      <p className="font-['Poppins'] font-semibold text-[#263238]">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm font-['Inter'] text-[#546E7A]">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  {loading && (
                    <div className="animate-spin">
                      <Clock className="w-6 h-6 text-[#26A69A]" />
                    </div>
                  )}
                  {isVerified && !loading && (
                    <CheckCircle2 className="w-6 h-6 text-[#43A047]" />
                  )}
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="bg-[#E0F2F1] rounded-2xl p-6 text-center">
                    <p className="font-['Poppins'] font-semibold text-[#263238]">
                      Analyzing your bill...
                    </p>
                    <p className="text-sm font-['Inter'] text-[#546E7A] mt-2">
                      Extracting personal details and consumption data
                    </p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <p className="text-red-700 font-['Inter'] text-sm">{error}</p>
                  </div>
                )}

                {/* Extracted Data */}
                {isVerified && billData && (
                  <div className="bg-gradient-to-br from-[#E0F2F1] to-white rounded-2xl p-6 border-2 border-[#43A047]">
                    <h3 className="font-['Poppins'] font-semibold text-[#263238] mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#43A047]" />
                      Extracted Data
                    </h3>
                    
                    {/* Customer Details */}
                    <div className="mb-6 pb-6 border-b border-[#26A69A]/30">
                      <p className="text-sm font-['Inter'] text-[#546E7A] mb-2">Customer Name</p>
                      <p className="text-2xl font-['Poppins'] font-bold text-[#263238]">
                        {billData.name || "Not found"}
                      </p>
                      <p className="text-sm font-['Inter'] text-[#546E7A] mt-3">Address</p>
                      <p className="font-['Inter'] text-[#263238]">
                        {billData.address || "Not found"}
                      </p>
                    </div>

                    {/* Consumption & Carbon Data */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm font-['Inter'] text-[#546E7A] mb-1">Monthly Consumption</p>
                        <p className="text-2xl font-['Poppins'] font-bold text-[#263238]">
                          {billData.monthlyConsumption} <span className="text-lg">{billData.unit}</span>
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm font-['Inter'] text-[#546E7A] mb-1">Carbon Footprint</p>
                        <p className="text-2xl font-['Poppins'] font-bold text-[#FF7043]">
                          {billData.carbonFootprint.toFixed(1)} kg CO₂
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm font-['Inter'] text-[#546E7A] mb-1">Previous Month</p>
                        <p className="text-lg font-['Poppins'] font-bold text-[#263238]">
                          {billData.previousConsumption} {billData.unit}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm font-['Inter'] text-[#546E7A] mb-1">Difference</p>
                        <p className={`text-lg font-['Poppins'] font-bold ${
                          billData.monthlyConsumption < billData.previousConsumption 
                            ? 'text-[#43A047]' 
                            : 'text-[#FF7043]'
                        }`}>
                          {(billData.monthlyConsumption - billData.previousConsumption).toFixed(0)} {billData.unit}
                          {billData.monthlyConsumption < billData.previousConsumption && (
                            <TrendingDown className="w-4 h-4 inline ml-2" />
                          )}
                          {billData.monthlyConsumption > billData.previousConsumption && (
                            <TrendingUp className="w-4 h-4 inline ml-2" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* B. Smart Device / API Integration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#26A69A] flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-['Poppins'] font-semibold text-xl text-[#263238]">
                  Connect Smart Devices for Stronger Proof
                </h2>
                <p className="text-sm font-['Inter'] text-[#546E7A]">
                  API integration for automatic verification
                </p>
              </div>
            </div>

            {/* Integration Cards */}
            <div className="space-y-4 mb-6">
              {smartDevices.map((device, index) => {
                const Icon = device.icon;
                const isConnected = connections[device.id as keyof typeof connections];
                
                return (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className={`rounded-2xl p-4 border-2 transition-all ${isConnected ? 'border-[#43A047] bg-gradient-to-br from-[#E0F2F1] to-white' : 'border-[#E0F2F1] bg-white'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-[#43A047]' : 'bg-[#E0F2F1]'}`}>
                        <Icon className={`w-6 h-6 ${isConnected ? 'text-white' : 'text-[#26A69A]'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-['Poppins'] font-semibold text-[#263238]">
                            {device.name}
                          </h3>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold ${isConnected ? 'bg-[#43A047] text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {isConnected ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {isConnected ? 'Connected' : 'Not Connected'}
                          </div>
                        </div>
                        <p className="text-sm font-['Inter'] text-[#546E7A] mb-3">
                          {device.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-['Inter'] text-[#546E7A]">
                            {isConnected && (
                              <>
                                <p>Last synced: {device.lastSync}</p>
                                <p className="font-semibold text-[#26A69A]">{device.dataPoints}</p>
                              </>
                            )}
                          </div>
                          <button
                            onClick={() => toggleConnection(device.id as keyof typeof connections)}
                            className={`px-4 py-2 rounded-xl font-['Inter'] font-medium transition-colors ${isConnected ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gradient-to-r from-[#1B5E20] to-[#26A69A] text-white hover:shadow-lg'}`}
                          >
                            {isConnected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Data Summary */}
            {(connections.evCharging || connections.smartMeter || connections.fitnessApp || connections.rideSharing) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#1B5E20] to-[#26A69A] rounded-2xl p-6 text-white"
              >
                <h3 className="font-['Poppins'] font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Connected Data Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {connections.smartMeter && (
                    <div>
                      <p className="text-sm opacity-90">Electricity This Month</p>
                      <p className="text-2xl font-['Poppins'] font-bold">2,340 kWh</p>
                    </div>
                  )}
                  {connections.evCharging && (
                    <div>
                      <p className="text-sm opacity-90">EV Charging Sessions</p>
                      <p className="text-2xl font-['Poppins'] font-bold">145</p>
                    </div>
                  )}
                  {connections.fitnessApp && (
                    <div>
                      <p className="text-sm opacity-90">Distance Cycled</p>
                      <p className="text-2xl font-['Poppins'] font-bold">42 km</p>
                    </div>
                  )}
                  {connections.rideSharing && (
                    <div>
                      <p className="text-sm opacity-90">Shared Rides</p>
                      <p className="text-2xl font-['Poppins'] font-bold">23</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm opacity-90">Total CO₂ Reduction Calculated</p>
                  <p className="text-3xl font-['Poppins'] font-bold">287 kg</p>
                </div>
              </motion.div>
            )}

            {/* Privacy Note */}
            <div className="flex items-start gap-3 mt-6 p-4 bg-[#E0F2F1] rounded-xl">
              <Lock className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <p className="text-sm font-['Inter'] text-[#263238]">
                <span className="font-semibold">Privacy Protected:</span> Data is encrypted and used only for emission calculation. We never share your personal information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
