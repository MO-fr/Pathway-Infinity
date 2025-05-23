// Question Card component - Moved from app/questionnaire/components
// Used for displaying individual questions in the questionnaire flow

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
