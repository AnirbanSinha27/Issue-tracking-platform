"use client";

import { useState } from "react";
import { apiFetch } from "@/src/lib/api";
import { Plus, FileText, AlertCircle, Cloud, Shield, Bug, Send, Loader2 } from "lucide-react";

export default function IssueForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("CLOUD_SECURITY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await apiFetch("/api/issues", {
        method: "POST",
        body: JSON.stringify({ title, description, type }),
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setType("CLOUD_SECURITY");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to create issue");
      setLoading(false);
    }
  }

  const getTypeIcon = (typeValue: string) => {
    switch (typeValue) {
      case "CLOUD_SECURITY":
        return <Cloud className="w-4 h-4" />;
      case "REDTEAM_ASSESSMENT":
        return <Shield className="w-4 h-4" />;
      case "VAPT":
        return <Bug className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (typeValue: string) => {
    switch (typeValue) {
      case "CLOUD_SECURITY":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "REDTEAM_ASSESSMENT":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      case "VAPT":
        return "bg-purple-500/20 border-purple-500/30 text-purple-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Title Input */}
      <div className="relative group/input">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <input
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
            required
          />
        </div>
      </div>

      {/* Description Input */}
      <div className="relative group/input">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <textarea
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300 resize-none"
            required
          />
        </div>
      </div>

      {/* Type Select */}
      <div className="relative group/input">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300 cursor-pointer"
          >
            <option value="CLOUD_SECURITY" className="bg-gray-900">Cloud Security</option>
            <option value="REDTEAM_ASSESSMENT" className="bg-gray-900">Red Team Assessment</option>
            <option value="VAPT" className="bg-gray-900">VAPT</option>
          </select>
        </div>
      </div>

      {/* Selected Type Badge */}
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs text-gray-500">Selected Type:</span>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getTypeColor(type)} border`}>
          {getTypeIcon(type)}
          <span className="text-xs font-medium">{type.replace(/_/g, " ")}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="relative w-full group/btn overflow-hidden rounded-xl py-3.5 font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-transform duration-300 group-hover/btn:scale-105" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl" />
        <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              Create Issue
            </>
          )}
        </span>
      </button>
    </form>
  );
}