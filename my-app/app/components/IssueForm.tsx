"use client";

import { useState } from "react";
import { apiFetch } from "@/src/lib/api";

export default function IssueForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("CLOUD_SECURITY");

  async function submit() {
    await apiFetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({ title, description, type }),
    });
    window.location.reload();
  }

  return (
    <div className="mb-6">
      <h3 className="text-xl mb-2">Create Issue</h3>
      <input
        placeholder="Title"
        className="input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="input mt-2"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="input mt-2"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="CLOUD_SECURITY">Cloud Security</option>
        <option value="REDTEAM_ASSESSMENT">Red Team Assessment</option>
        <option value="VAPT">VAPT</option>
      </select>
      <button className="btn mt-3" onClick={submit}>
        Create
      </button>
    </div>
  );
}
