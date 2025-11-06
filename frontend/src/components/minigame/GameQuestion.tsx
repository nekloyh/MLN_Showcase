import { ArrowRight, CheckCircle, Send } from "lucide-react";
import { Scenario } from "../../data/situations";
import { getStatDisplayName, PlayerStats } from "../../hooks/useGame";
import { Button } from "../ui/button";

interface GameQuestionProps {
  currentScenario: Scenario | undefined;
  selectedChoiceIndex: number | null;
  showResult: boolean;
  stats: PlayerStats;
  handleChoiceSelect: (index: number) => void;
  handleSubmitChoice: () => void;
  handleNextScenario: () => void;
}

const GameQuestion = ({
  currentScenario,
  selectedChoiceIndex,
  showResult,
  stats,
  handleChoiceSelect,
  handleSubmitChoice,
  handleNextScenario,
}: GameQuestionProps) => {

  // Check if currentScenario is defined
  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-400 text-lg">Đang tải tình huống...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          Tình huống:
        </h3>
        <p className="text-gray-200 text-lg">{currentScenario.description}</p>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentScenario.choices.map((choice, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedChoiceIndex === index
                ? "border-yellow-500 bg-yellow-900/30 shadow-lg"
                : "border-gray-700 hover:border-yellow-600 hover:bg-gray-700/50"
            } ${showResult && selectedChoiceIndex !== index ? "opacity-50" : ""}`}
            onClick={() => !showResult && handleChoiceSelect(index)}
          >
            <p className="font-semibold text-gray-100">{choice.text}</p>
            {showResult && selectedChoiceIndex === index && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-yellow-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Kết quả:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(Object.keys(choice.impact) as Array<keyof PlayerStats>).map(
                    (key) => {
                      const impactValue = choice.impact[key];
                      if (impactValue === 0) return null;
                      const isPositive = impactValue > 0;
                      const impactText = isPositive
                        ? `+${impactValue}`
                        : `${impactValue}`;
                      const impactColor = isPositive
                        ? "text-green-400"
                        : "text-red-400";
                      const newStatValue = stats[key] + impactValue;

                      return (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-400">
                            {getStatDisplayName(key)}:
                          </span>
                          <span className={`font-bold ${impactColor}`}>
                            {impactText} ({newStatValue})
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  <span className="font-bold text-yellow-300">Giải thích:</span>{" "}
                  {(choice as any).explanation ?? ""}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center pt-4">
        {!showResult ? (
          <Button
            onClick={handleSubmitChoice}
            disabled={selectedChoiceIndex === null}
            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 flex items-center disabled:opacity-50"
          >
            <Send className="w-5 h-5 mr-2" />
            Đưa ra Quyết định
          </Button>
        ) : (
          <Button
            onClick={handleNextScenario}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center"
          >
            Tiếp tục <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameQuestion;