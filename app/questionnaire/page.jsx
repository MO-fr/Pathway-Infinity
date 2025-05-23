import QuestionCard from "@/components/QuestionCard";

// Questionnaire page
export default function QuestionnairePage() {
  // Sample question for demonstration purposes
  const sampleQuestion = {
    text: "What type of work environment do you prefer?",
    options: [
      { label: "Working outdoors", value: "outdoors" },
      { label: "Office environment", value: "office" },
      { label: "Remote/work from home", value: "remote" },
      { label: "Mixed environment", value: "mixed" }
    ]
  };

  const handleAnswer = (answer) => {
    console.log("Selected answer:", answer);
    // Here you would handle the answer, store it, and move to the next question
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Career Pathway Questionnaire</h1>
      <p className="mb-6">Answer the questions below to help us find your ideal career path.</p>
      
      <QuestionCard 
        question={sampleQuestion} 
        onAnswer={handleAnswer} 
      />
    </div>
  );
}
