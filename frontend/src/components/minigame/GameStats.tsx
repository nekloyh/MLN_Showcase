import { Globe, HeartHandshake, Shield, TrendingUp } from "lucide-react";
import { PlayerStats, getStatDisplayName } from "../../hooks/useGame";

const getIcon = (iconName: "CT" | "KT" | "CB" | "NG") => {
  switch (iconName) {
    case "CT":
      return <Shield className="w-8 h-8 text-blue-600" />;
    case "KT":
      return <TrendingUp className="w-8 h-8 text-green-600" />;
    case "CB":
      return <HeartHandshake className="w-8 h-8 text-red-600" />;
    case "NG":
      return <Globe className="w-8 h-8 text-yellow-600" />;
    default:
      return <Shield className="w-8 h-8 text-gray-500" />;
  }
};

const getStatColor = (value: number) => {
  if (value >= 80) return "text-green-500";
  if (value >= 60) return "text-green-400";
  if (value >= 40) return "text-yellow-500";
  if (value >= 20) return "text-orange-500";
  return "text-red-500";
};

interface GameStatsProps {
  stats: PlayerStats;
}

const GameStats = ({ stats }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {(Object.keys(stats) as Array<keyof PlayerStats>).map((key) => (
        <div
          key={key}
          className="bg-gray-800/50 p-4 rounded-lg shadow-lg flex items-center"
        >
          {getIcon(key)}
          <div className="ml-4">
            <div className="text-sm font-bold text-gray-400">
              {getStatDisplayName(key)}
            </div>
            <div className={`text-2xl font-bold ${getStatColor(stats[key])}`}>
              {stats[key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameStats;
