"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/src/lib/api";
import { Bug, Clock, CheckCircle2, AlertCircle, Cloud, Shield, FileText, Calendar, Tag, Inbox, Trash2, Edit2, X, Save, Loader2 } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  type: "CLOUD_SECURITY" | "REDTEAM_ASSESSMENT" | "VAPT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  priority?: number;
  createdAt: string;
  updatedAt: string;
}

export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; description: string; type: "CLOUD_SECURITY" | "REDTEAM_ASSESSMENT" | "VAPT"; status: "OPEN" | "IN_PROGRESS" | "RESOLVED" }>({ 
    title: "", 
    description: "", 
    type: "CLOUD_SECURITY", 
    status: "OPEN" 
  });
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchIssues = () => {
    apiFetch("/api/issues")
      .then((data: { issues: Issue[] }) => {
        setIssues(data.issues || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleDelete = async (issueId: string) => {
    if (!confirm("Are you sure you want to delete this issue? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(issueId);
    try {
      await apiFetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });
      fetchIssues();
    } catch (err: any) {
      alert(err.message || "Failed to delete issue");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (issue: Issue) => {
    setEditingIssue(issue);
    setEditForm({
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIssue) return;

    setEditLoading(true);
    try {
      await apiFetch(`/api/issues/${editingIssue.id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
      });
      setEditingIssue(null);
      fetchIssues();
    } catch (err: any) {
      alert(err.message || "Failed to update issue");
    } finally {
      setEditLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
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

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "CLOUD_SECURITY":
        return {
          color: "bg-blue-500/20 border-blue-500/30 text-blue-400",
          icon: <Cloud className="w-4 h-4" />,
          label: "Cloud Security",
        };
      case "REDTEAM_ASSESSMENT":
        return {
          color: "bg-red-500/20 border-red-500/30 text-red-400",
          icon: <Shield className="w-4 h-4" />,
          label: "Red Team",
        };
      case "VAPT":
        return {
          color: "bg-purple-500/20 border-purple-500/30 text-purple-400",
          icon: <Bug className="w-4 h-4" />,
          label: "VAPT",
        };
      default:
        return {
          color: "bg-gray-500/20 border-gray-500/30 text-gray-400",
          icon: <FileText className="w-4 h-4" />,
          label: type,
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "OPEN":
        return {
          color: "bg-amber-500/20 border-amber-500/30 text-amber-400",
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          label: "Open",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
          icon: <Clock className="w-3.5 h-3.5" />,
          label: "In Progress",
        };
      case "RESOLVED":
        return {
          color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: "Resolved",
        };
      default:
        return {
          color: "bg-gray-500/20 border-gray-500/30 text-gray-400",
          icon: <Tag className="w-3.5 h-3.5" />,
          label: status,
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading issues...</p>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
          <div className="relative bg-gray-800/50 rounded-full p-4 border border-gray-700/50">
            <Inbox className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No issues yet</h3>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          Create your first security issue to get started with tracking and management.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {issues.map((issue) => {
          const typeConfig = getTypeConfig(issue.type);
          const statusConfig = getStatusConfig(issue.status);
          const isDeleting = deleteLoading === issue.id;

          return (
            <div
              key={issue.id}
              className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/30 hover:bg-gray-900/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/0 to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-lg mb-1 group-hover:text-cyan-100 transition-colors duration-300">
                      {issue.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(issue)}
                      className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 transition-all duration-300"
                      title="Edit issue"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      disabled={isDeleting}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete issue"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Badges and Metadata */}
                <div className="flex items-center flex-wrap gap-3 mt-4">
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span className="text-xs font-medium">{statusConfig.label}</span>
                  </div>

                  {/* Type Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${typeConfig.color}`}>
                    {typeConfig.icon}
                    <span className="text-xs font-medium">{typeConfig.label}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs ml-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(issue.createdAt)}</span>
                  </div>

                  {/* Priority Badge */}
                  {issue.priority && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-400">
                      <span className="text-xs font-medium">P{issue.priority}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl">
            {/* Backdrop blur effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-75" />
            
            <div className="relative bg-[#0d1117] border border-gray-800/50 rounded-2xl shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg p-2">
                    <Edit2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Edit Issue</h2>
                </div>
                <button
                  onClick={() => setEditingIssue(null)}
                  className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                {/* Title Input */}
                <div className="relative group/input">
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Description Input */}
                <div className="relative group/input">
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={4}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Type and Status Selects */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Type Select */}
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value as typeof editForm.type })}
                        className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300 cursor-pointer"
                      >
                        <option value="CLOUD_SECURITY" className="bg-gray-900">Cloud Security</option>
                        <option value="REDTEAM_ASSESSMENT" className="bg-gray-900">Red Team Assessment</option>
                        <option value="VAPT" className="bg-gray-900">VAPT</option>
                      </select>
                    </div>
                  </div>

                  {/* Status Select */}
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as typeof editForm.status })}
                        className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300 cursor-pointer"
                      >
                        <option value="OPEN" className="bg-gray-900">Open</option>
                        <option value="IN_PROGRESS" className="bg-gray-900">In Progress</option>
                        <option value="RESOLVED" className="bg-gray-900">Resolved</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800/50">
                  <button
                    type="button"
                    onClick={() => setEditingIssue(null)}
                    className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="relative px-4 py-2 overflow-hidden rounded-xl font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-transform duration-300" />
                    <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
                      {editLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}