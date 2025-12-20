import ProtectedRoute from "../components/ProtectedRoute";
import IssueForm from "../components/IssueForm";
import IssueList from "../components/IssueList";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-3xl mb-6">Dashboard</h1>
        <IssueForm />
        <IssueList />
      </div>
    </ProtectedRoute>
  );
}
