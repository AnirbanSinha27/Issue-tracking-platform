import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto mt-20">
        <h2 className="text-2xl">Profile</h2>
        <p className="text-gray-500">
          Profile update UI can go here.
        </p>
      </div>
    </ProtectedRoute>
  );
}
