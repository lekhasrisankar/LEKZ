import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar } from "./Avatar";
import { CheckCircle, Circle, Eraser, PenTool, Upload, XCircle, Loader2 } from "lucide-react";
import { generateQuestions, Question } from "../services/geminiService";

export function QuizScreen({
  topic,
  onComplete,
}: {
  topic: string;
  onComplete: (score: number, total: number) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [avatarState, setAvatarState] = useState<"thinking" | "jumping" | "celebrating">("thinking");
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect"; message: string } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const generatedQuestions = await generateQuestions(topic);
        setQuestions(generatedQuestions);
      } catch (err) {
        console.error("Failed to generate questions:", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-indigo-600 mb-8" />
        </motion.div>
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Generating your quiz...</h2>
        <p className="text-slate-600 text-center max-w-md">
          Our AI is reading the Anna University syllabus and crafting 10 unique questions just for you.
        </p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h2>
          <p className="text-slate-600 mb-6">{error || "No questions could be generated."}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      let calculatedScore = 0;
      questions.forEach((q) => {
        if (q.type === "mcq" && answers[q.id] === q.correctAnswer) {
          calculatedScore++;
        } else if (q.type === "drawing" && answers[q.id]) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
      setIsFinished(true);
      setAvatarState("celebrating");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAvatarState("thinking");
    }
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion.type === "mcq") {
      const isCorrect = answer === currentQuestion.correctAnswer;
      if (isCorrect) {
        setFeedback({ type: "correct", message: "Great job! That's correct." });
        setAvatarState("celebrating");
      } else {
        setFeedback({
          type: "incorrect",
          message: `Oops! The correct answer is: ${currentQuestion.correctAnswer}`,
        });
        setAvatarState("thinking");
      }

      setTimeout(() => {
        setFeedback(null);
        if (currentQuestionIndex === questions.length - 1) {
          let calculatedScore = 0;
          questions.forEach((q) => {
            if (q.type === "mcq" && newAnswers[q.id] === q.correctAnswer) {
              calculatedScore++;
            } else if (q.type === "drawing" && newAnswers[q.id]) {
              calculatedScore++;
            }
          });
          setScore(calculatedScore);
          setIsFinished(true);
          setAvatarState("celebrating");
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setAvatarState("thinking");
        }
      }, 2500);
    } else {
      setAvatarState("jumping");
      setTimeout(() => setAvatarState("thinking"), 1000);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <Avatar state="celebrating" className="mx-auto w-32 h-32 mb-6" />
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-slate-600 mb-8">
            You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length}
          </p>
          <button
            onClick={() => onComplete(score, questions.length)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 text-lg shadow-lg shadow-indigo-200"
          >
            Go to Photo Session
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600 mb-1 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">{topic}</h1>
          </div>
          <Avatar state={avatarState} className="w-20 h-20" />
        </header>

        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          {currentQuestion.type === "mcq" ? (
            <div className="space-y-4 flex-1">
              {currentQuestion.options?.map((option) => {
                const isSelected = answers[currentQuestion.id] === option;
                let buttonStyle = "border-slate-200 hover:border-indigo-300 text-slate-700 hover:bg-slate-50";
                let icon = <Circle className="w-6 h-6 text-slate-400" />;

                if (isSelected) {
                  if (feedback?.type === "correct") {
                    buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-100";
                    icon = <CheckCircle className="w-6 h-6 text-emerald-600" />;
                  } else if (feedback?.type === "incorrect") {
                    buttonStyle = "border-rose-500 bg-rose-50 text-rose-900 shadow-md shadow-rose-100";
                    icon = <XCircle className="w-6 h-6 text-rose-600" />;
                  } else {
                    buttonStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md shadow-indigo-100";
                    icon = <CheckCircle className="w-6 h-6 text-indigo-600" />;
                  }
                } else if (feedback?.type === "incorrect" && option === currentQuestion.correctAnswer) {
                  // Briefly display the correct answer
                  buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                  icon = <CheckCircle className="w-6 h-6 text-emerald-600" />;
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all text-left ${buttonStyle}`}
                  >
                    <div className="mr-4">{icon}</div>
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                );
              })}
              
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mt-4 flex items-center ${
                    feedback.type === "correct" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {feedback.type === "correct" ? (
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  )}
                  <p className="font-medium">{feedback.message}</p>
                </motion.div>
              )}
            </div>
          ) : (
            <DrawingWorkspace
              onSave={(dataUrl) => handleAnswer(dataUrl)}
              hasAnswer={!!answers[currentQuestion.id]}
            />
          )}

          <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                answers[currentQuestion.id]
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DrawingWorkspace({ onSave, hasAnswer }: { onSave: (data: string) => void; hasAnswer: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<"draw" | "upload">("draw");
  const [showSavedToast, setShowSavedToast] = useState(false);
  
  // New states for tools
  const [color, setColor] = useState("#1e1b4b");
  const [thickness, setThickness] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set white background only on initial mount
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
      onSave(canvas.toDataURL());
      triggerToast();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Apply current tools
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.strokeStyle = isEraser ? "white" : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onSave(""); // Clear answer
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          onSave(dataUrl);
          triggerToast();
          
          // Also draw it on canvas so user can see it if they switch back to draw mode
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Scale image to fit canvas
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
              }
            }
          };
          img.src = dataUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode("draw")}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === "draw" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <PenTool className="w-4 h-4 mr-2" />
          Digital Workspace
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === "upload" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </button>
      </div>

      {mode === "draw" && (
        <div className="flex items-center space-x-4 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200 overflow-x-auto">
          <div className="flex items-center space-x-2 shrink-0">
            <label className="text-sm font-medium text-slate-600">Color:</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => { setColor(e.target.value); setIsEraser(false); }}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>
          
          <div className="w-px h-6 bg-slate-300 mx-2 shrink-0"></div>
          
          <div className="flex items-center space-x-2 flex-1 min-w-[150px] max-w-[200px]">
            <label className="text-sm font-medium text-slate-600">Thickness:</label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={thickness} 
              onChange={(e) => setThickness(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="w-px h-6 bg-slate-300 mx-2 shrink-0"></div>

          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors shrink-0 ${
              isEraser ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Eraser className="w-4 h-4 mr-1.5" />
            Eraser
          </button>
          
          <button
            onClick={clearCanvas}
            className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors ml-auto shrink-0"
          >
            Clear All
          </button>
        </div>
      )}

      {mode === "draw" ? (
        <div className="relative flex-1 border-2 border-slate-200 rounded-2xl overflow-hidden bg-white min-h-[300px]">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className={`w-full h-full touch-none ${isEraser ? 'cursor-cell' : 'cursor-crosshair'}`}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
          <AnimatePresence>
            {showSavedToast && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-4 right-4 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-md z-10"
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Answer Saved!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 p-8 relative min-h-[300px]">
          <Upload className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-600 mb-6 text-center max-w-sm">
            Draw the solution in your notebook, take a photo, and upload it here.
          </p>
          <label className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
            Choose Image
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
          </label>
          <AnimatePresence>
            {showSavedToast && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-6 text-emerald-600 font-bold flex items-center bg-emerald-50 px-4 py-2 rounded-full shadow-sm"
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Image uploaded successfully!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
