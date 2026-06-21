import React, { useState } from "react";
import {
  FileSpreadsheet,
  Code,
  Github,
  ExternalLink,
  TrendingUp,
  Users,
  MapPin,
  Award
} from "lucide-react";
import screenshot from "../../screenshots/screenshot.png";
 
export default function DSJobsDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWarning, setShowWarning] = useState(false);

  const powerbiLink =
    "https://app.powerbi.com/reportEmbed?reportId=56cb688a-f849-4303-b0ac-d5a741f6a8c4&autoAuth=true&ctid=56c1d497-700b-49cf-8f8d-3dd6b20d522f&navContentPaneEnabled=false&filterPaneEnabled=false";

  const stats = [
    { icon: <TrendingUp className="w-5 h-5" />, label: "Total Jobs", value: "9K+" },
    { icon: <Users className="w-5 h-5" />, label: "Companies", value: "3K+" },
    { icon: <Award className="w-5 h-5" />, label: "Unique Skills", value: "229" },
    { icon: <MapPin className="w-5 h-5" />, label: "Top City", value: "Bengaluru" }
  ];

  const resources = [
    {
      title: "Excel Analysis",
      description: "Pivot tables and validation workbook",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      link: "https://1drv.ms/x/c/95ee147621726083/IQDVORJGQUrkQbswLLtx5PdaAT3gP2v_19vswh5cu6Qd10w?e=rd1cp5",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Jupyter Notebook",
      description: "Python data cleaning and EDA",
      icon: <Code className="w-6 h-6" />,
      link: "https://drive.google.com/file/d/1JkdulkPzQWrlChE3e4wyGG-jLZXQJ7Gp/view?usp=sharing",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "GitHub Repository",
      description: "Source code, datasets, and Power BI file",
      icon: <Github className="w-6 h-6" />,
      link: "https://github.com/AlokTheDataGuy/Data-Science-Jobs-Analytics",
      color: "from-gray-700 to-gray-800"
    }
  ];

  const keyInsights = [
    "Python is the most in-demand skill across roles",
    "Python, SQL, ML, and AWS form the core stack",
    "Bengaluru, Hyderabad, and Pune dominate hiring",
    "Mid-level experience (3–7 years) is most common",
    "Master’s degree preferred for senior roles"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Data Science Jobs Market Analysis
            </h1>
            <p className="text-purple-300 text-sm">India • 2025</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-200"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "resources"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-200"
              }`}
            >
              Resources
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-600/30 p-3 rounded-lg text-purple-300">
                {s.icon}
              </div>
              <div>
                <p className="text-purple-300 text-sm">{s.label}</p>
                <p className="text-white text-xl font-bold">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Screenshot */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-teal-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                Power BI Analytics Dashboard
              </h2>
              <p className="text-slate-300 text-sm mb-4">
                Snapshot view of job market trends, skills demand, and location
                insights
              </p>

              <div className="bg-white/10 rounded-lg border border-gray-600 p-2">
                <img
                  src={screenshot}
                  alt="Dashboard Screenshot"
                  className="w-full rounded-lg"
                />
              </div>

              <button
                onClick={() => setShowWarning(true)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                View Interactive Dashboard
              </button>
            </div>

            {/* Insights */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-4">
                Key Insights
              </h3>
              {keyInsights.map((k, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <span className="bg-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
                    {i + 1}
                  </span>
                  <p className="text-purple-100">{k}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((r, i) => (
              <a
                key={i}
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:scale-105 transition"
              >
                <div
                  className={`bg-gradient-to-br ${r.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}
                >
                  {r.icon}
                </div>
                <h3 className="text-white font-bold">{r.title}</h3>
                <p className="text-purple-300 text-sm">{r.description}</p>
                <div className="flex items-center text-purple-400 text-sm mt-3">
                  Open Resource <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-purple-500/40 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-2">
              Power BI Sign-In Required
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Viewing the interactive dashboard requires a Microsoft Power BI
              account.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-white/10 rounded-lg text-slate-200"
              >
                Cancel
              </button>
              <a
                href={powerbiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 rounded-lg text-white"
              >
                Continue
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
