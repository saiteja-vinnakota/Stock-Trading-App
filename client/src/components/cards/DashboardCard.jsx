function DashboardCard({ title, value, color = "emerald" }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2
        className={`text-3xl font-bold mt-3 ${
          color === "emerald"
            ? "text-emerald-600"
            : color === "blue"
              ? "text-blue-600"
              : color === "red"
                ? "text-red-600"
                : "text-slate-700"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;
