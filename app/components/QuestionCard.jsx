// Question Card component - Moved from app/questionnaire/components
// Used for displaying individual questions in the questionnaire flow

export default function QuestionCard({ question, onAnswer }) {
  return (<div className="bg-slate-50 shadow-md rounded-lg p-4 mb-3 border border-mint-100">
    <h3 className="text-lg font-semibold mb-3">{question.text}</h3>

    <div className="space-y-2">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option.value)}
          className="w-full text-left py-2.5 px-3 border border-mint-200 rounded-md hover:bg-mint-50 hover:border-mint-300 transition-colors text-sm"
        >
          {option.text}
        </button>
      ))}
    </div>
  </div>
  );
}
