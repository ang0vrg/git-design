interface KpiCardProps {
  title: string;
  value: string | number;
  sub?: string;
}

export default function KpiCard({ title, value, sub }: KpiCardProps) {
  return (
    <div
      className="rounded-2xl p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 
      bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] 
      text-white border border-white/10"
    >
      <div className="text-sm text-gray-300">{title}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}
