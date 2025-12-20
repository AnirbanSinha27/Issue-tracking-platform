"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/src/lib/api";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    apiFetch("/api/issues").then((data) => setIssues(data.issues));
  }, []);

  return (
    <div>
      <h3 className="text-xl mb-2">Your Issues</h3>
      {issues.map((issue: any) => (
        <div key={issue.id} className="border p-4 mb-2 rounded">
          <h4 className="font-semibold">{issue.title}</h4>
          <p className="text-sm text-gray-600">{issue.description}</p>
          <span className="text-xs">{issue.type}</span>
        </div>
      ))}
    </div>
  );
}
