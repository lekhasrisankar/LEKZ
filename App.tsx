import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { ProfileScreen, ProfileData } from "./components/ProfileScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { SubjectScreen } from "./components/SubjectScreen";
import { TopicScreen } from "./components/TopicScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { LeaderboardScreen, LeaderboardEntry } from "./components/LeaderboardScreen";
import { CustomizePanel } from "./components/CustomizePanel";
import { AudioPlayer } from "./components/AudioPlayer";

type AppState =
  | "LOGIN"
  | "PROFILE"
  | "DASHBOARD"
  | "SUBJECTS"
  | "TOPIC"
  | "QUIZ"
  | "RESULT"
  | "LEADERBOARD";

export default function App() {
  const [appState, setAppState] = useState<AppState>("LOGIN");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | null>(null);

  const handleLogin = (userEmail: string) => {
    setEmail(userEmail);
    setAppState("PROFILE");
  };

  const handleProfileComplete = (data: ProfileData) => {
    setProfile(data);
    setAppState("DASHBOARD");
  };

  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
    setAppState("SUBJECTS");
  };

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    setAppState("TOPIC");
  };

  const handleStartQuiz = (topic: string) => {
    setSelectedTopic(`${selectedSubject} - ${topic}`);
    setAppState("QUIZ");
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    setAppState("RESULT");
  };

  const handleResultComplete = (photoUrl: string, frameName: string) => {
    setCurrentUserEntry({
      id: "current-user",
      name: email.split("@")[0], // Simple name extraction
      score: quizScore,
      total: quizTotal,
      photoUrl,
      frameName,
      isCurrentUser: true,
    });
    setAppState("LEADERBOARD");
  };

  const handleRestart = () => {
    setAppState("DASHBOARD");
  };

  return (
    <div className="font-sans text-slate-900 antialiased min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-1] opacity-60"
      >
        <source
          src="https://media.istockphoto.com/id/959753926/video/question-mark-animated-looping-spin-background-blue.mp4?s=mp4-640x640-is&k=20&c=tiJe4zJ0PaqLPsRba203_uxm3J_LQYDjVLu5UFGareQ="
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 min-h-screen">
        {appState === "LOGIN" && <LoginScreen onLogin={handleLogin} />}
        {appState === "PROFILE" && <ProfileScreen onComplete={handleProfileComplete} />}
        {appState === "DASHBOARD" && <DashboardScreen onSelectSubject={handleSelectDepartment} />}
        {appState === "SUBJECTS" && (
          <SubjectScreen 
            department={selectedDepartment} 
            onBack={() => setAppState("DASHBOARD")} 
            onSelectSubject={handleSelectSubject} 
          />
        )}
        {appState === "TOPIC" && (
          <TopicScreen
            subject={selectedSubject}
            onBack={() => setAppState("SUBJECTS")}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {appState === "QUIZ" && (
          <QuizScreen topic={selectedTopic} onComplete={handleQuizComplete} />
        )}
        {appState === "RESULT" && (
          <ResultScreen
            score={quizScore}
            total={quizTotal}
            onComplete={handleResultComplete}
          />
        )}
        {appState === "LEADERBOARD" && currentUserEntry && (
          <LeaderboardScreen
            currentUserEntry={currentUserEntry}
            onRestart={handleRestart}
          />
        )}
      </div>
      <CustomizePanel />
      <AudioPlayer />
    </div>
  );
}
