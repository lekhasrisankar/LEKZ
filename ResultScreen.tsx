import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Camera, Download, Trophy, Upload } from "lucide-react";
import confetti from "canvas-confetti";
import { FrameOverlay } from "./FrameOverlay";
import { Avatar } from "./Avatar";

export function ResultScreen({
  score,
  total,
  onComplete,
}: {
  score: number;
  total: number;
  onComplete: (photoUrl: string, frameName: string) => void;
}) {
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const percentage = (score / total) * 100;
  let frameName = "Good Effort";
  let frameText = "text-slate-700";

  if (percentage === 100) {
    frameName = "Blast Topper";
    frameText = "text-amber-600";
  } else if (percentage >= 80) {
    frameName = "Cooler Player";
    frameText = "text-blue-600";
  } else if (percentage >= 50) {
    frameName = "Rising Star";
    frameText = "text-emerald-600";
  }

  useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#fbbf24", "#60a5fa"],
      });
    }
  }, [percentage]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser or context.");
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError(err instanceof Error ? err.message : "Permission denied");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    if (photo) {
      onComplete(photo, frameName);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-8 text-center bg-indigo-50 border-b border-indigo-100">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${frameText}`} />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h1>
          <p className="text-lg text-slate-600">
            You scored {score}/{total} ({percentage}%)
          </p>
        </div>

        <div className="p-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Capture your achievement</h2>

          {!photo ? (
            <div className="w-full max-w-md aspect-[3/4] bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
              {stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    onClick={takePhoto}
                    className="absolute bottom-6 bg-white text-indigo-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Camera className="w-8 h-8" />
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 mb-6">Take a selfie to join the leaderboard</p>
                  <div className="flex flex-col space-y-3">
                    {cameraError && (
                      <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-lg border border-rose-200 mb-2">
                        <p className="font-semibold">Error accessing camera:</p>
                        <p>{cameraError}</p>
                        <p className="mt-1 text-xs">Please check your browser permissions or upload a photo instead.</p>
                      </div>
                    )}
                    <button
                      onClick={startCamera}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Open Camera
                    </button>
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-slate-300"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or</span>
                      <div className="flex-grow border-t border-slate-300"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer text-center text-sm">
                        Upload Photo
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                      </label>
                      <button
                        onClick={() => setPhoto("avatar")}
                        className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors text-center text-sm"
                      >
                        Use Avatar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden group bg-indigo-50 flex items-center justify-center">
              {photo === "avatar" ? (
                <Avatar state="celebrating" className="w-64 h-64" />
              ) : (
                <img src={photo} alt="Achievement" className="w-full h-full object-cover" />
              )}
              
              <FrameOverlay frameName={frameName} score={score} total={total} />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 z-10">
                <button
                  onClick={() => setPhoto(null)}
                  className="bg-white text-slate-800 p-3 rounded-full hover:scale-110 transition-transform"
                  title="Retake"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {photo && (
            <button
              onClick={handleFinish}
              className="mt-8 w-full max-w-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 text-lg shadow-lg shadow-indigo-200"
            >
              Post to Leaderboard
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
