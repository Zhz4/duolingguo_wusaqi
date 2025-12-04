"use client";

import { useState, useRef } from "react";
import { questions } from "../question";
// 注意：虽然导入了 Image 组件，但在下面的代码中为了演示方便使用了 <div> 占位。
// 如果你有真实的图片资源，请取消注释相关代码并使用 <Image /> 组件。
import Image from "next/image";

// --- 类型定义 ---
type GameState = "MAP" | "QUIZ" | "VICTORY";

// --- 子组件 ---

/**
 * 1. 地图界面组件 (MapScreen)
 *
 * 功能：显示关卡地图，处理关卡选择。
 * 素材替换提示：
 * - 背景颜色/图片：修改最外层 div 的 className 或 style。
 * - 路径 SVG：修改 <svg> 中的 <path> d 属性，或替换为背景图片。
 * - 关卡图标：修改 🐰 表情为 Image 组件。
 * - 顶部心形/萝卜图标：修改 ❤️/🥕 为 Image 组件。
 */
function MapScreen({
  onStartLevel,
  unlockedLevel,
}: {
  onStartLevel: (levelId: number) => void;
  unlockedLevel: number;
}) {
  // --- 常量配置 ---
  const QUESTIONS_PER_LEVEL = 1; // 每个关卡的题目数量

  // 根据题目总数计算生成的关卡数据
  const levels = Array.from(
    { length: Math.ceil(questions.length / QUESTIONS_PER_LEVEL) },
    (_, i) => ({
      id: i + 1,
      title: `关卡 ${i + 1}`,
      top: `${80 - i * 20}%`,
    })
  );

  return (
    <div className="flex flex-col h-screen bg-[#FFD057] text-[#5C3D2E] font-bold relative overflow-hidden">
      {/* 顶部状态栏 */}
      <div className="flex justify-between items-center p-4 bg-[#FFD057] z-10">
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full">
          {/* [素材替换] 萝卜图标 */}
          🥕 <span className="text-lg">0</span>
        </div>
        <div className="flex items-center gap-1">
          {/* [素材替换] 生命值心形图标 */}
          <span className="text-red-500 text-2xl">❤️❤️❤️</span>
        </div>
      </div>

      {/* 当前关卡标题横幅 */}
      <div className="px-6 py-2 bg-[#FF9EAA] mx-4 rounded-xl mb-4 text-white text-center shadow-md border-b-4 border-[#E68A96]">
        当前解锁: 第 {unlockedLevel} 关 / 共 10 关
      </div>

      {/* 地图路径区域 */}
      <div className="flex-1 relative w-full max-w-md mx-auto">
        {/* [素材替换] S型路径背景 - 可以替换为一张完整的地图背景图 */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M50,100 C50,80 20,70 20,50 C20,30 80,30 80,10"
            stroke="white"
            strokeWidth="10"
            fill="none"
            strokeDasharray="10,10"
          />
        </svg>

        {/* 渲染关卡节点 */}
        {levels.map((level, index) => {
          const isLeft = index % 2 === 0;
          const isUnlocked = level.id <= unlockedLevel;
          const isCurrent = level.id === unlockedLevel;

          return (
            <div
              key={level.id}
              className={`absolute transform -translate-x-1/2 transition-transform ${
                isUnlocked
                  ? "cursor-pointer hover:scale-105 active:scale-95"
                  : ""
              }`}
              style={{
                top: level.top,
                left: isLeft ? "30%" : "70%",
              }}
              onClick={() => {
                if (isUnlocked) {
                  onStartLevel(level.id);
                }
              }}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center border-b-4 shadow-lg relative transition-colors
                ${
                  isUnlocked
                    ? "bg-[#6CE548] border-[#58C236]" // 已解锁（绿色）
                    : "bg-gray-300 border-gray-400 cursor-not-allowed opacity-80" // 未解锁（灰色）
                }`}
              >
                {/* 关卡内容 */}
                {isUnlocked ? (
                  // [素材替换] 关卡图标 (如乌萨奇头像)
                  <span className="text-4xl animate-pulse">
                    <Image
                      src="/images/wsq-1.png"
                      alt="乌萨奇"
                      width={100}
                      height={100}
                    />
                  </span>
                ) : (
                  // [素材替换] 锁定状态图标
                  <div className="text-2xl opacity-50">🔒</div>
                )}

                {/* 当前关卡指示器 (皇冠/铅笔等) */}
                {isCurrent && (
                  <div className="absolute -top-2 -right-2 text-xl animate-bounce">
                    ✏️
                  </div>
                )}
              </div>

              {/* 关卡名称标签 */}
              <div
                className={`mt-2 px-3 py-1 rounded-lg text-xs text-center font-bold shadow-sm border-b-2 whitespace-nowrap
                ${
                  isUnlocked
                    ? "bg-white border-gray-200 text-[#5C3D2E]"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                }
              `}
              >
                {level.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部导航栏 */}
      <div className="bg-white border-t-2 border-[#F0F0F0] p-4 flex justify-around text-2xl">
        {/* [素材替换] 底部导航图标 */}
        <button className="opacity-100">🐰</button>
        <button className="opacity-50">🏆</button>
        <button className="opacity-50">🏪</button>
        <button className="opacity-50">👤</button>
      </div>
    </div>
  );
}

/**
 * 2. 答题界面组件 (QuizScreen)
 *
 * 功能：展示题目、播放音视频、处理选项点击、显示反馈。
 * 素材替换提示：
 * - 角色动画：修改 🐰 处为动态 GIF 或 Lottie 动画。
 * - 音频/视频播放器样式：自定义 audio/video 标签样式。
 * - 选项图片：使用 question.ts 中的 image 字段加载真实图片。
 */
function QuizScreen({
  levelQuestions,
  onComplete,
  onBack,
}: {
  levelQuestions: typeof questions;
  onComplete: () => void;
  onBack: () => void;
}) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const answerVideoRef = useRef<HTMLVideoElement | null>(null);

  const currentQuestion = levelQuestions[currentQIndex];

  // 防止无题目时崩溃
  if (!currentQuestion) {
    return <div className="p-8 text-center">该关卡暂无题目！</div>;
  }

  const progress = (currentQIndex / levelQuestions.length) * 100;

  const handleCheck = () => {
    if (selectedOption === null) return;

    const correctLabel = currentQuestion.answer.correct;
    const selectedLabel = currentQuestion.options[selectedOption].label;
    const correct = correctLabel === selectedLabel;

    setIsCorrect(correct);
    setShowFeedback(true);

    // 如果答对了，播放答案中的音频/视频/图片
    if (correct) {
      // 播放音频
      if (currentQuestion.answer.audio && audioRef.current) {
        audioRef.current.src = currentQuestion.answer.audio;
        audioRef.current.play().catch((e) => console.log("音频播放失败:", e));
      }
      // 播放视频
      if (currentQuestion.answer.video && answerVideoRef.current) {
        answerVideoRef.current.src = currentQuestion.answer.video;
        answerVideoRef.current
          .play()
          .catch((e) => console.log("视频播放失败:", e));
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < levelQuestions.length - 1) {
      // 切换下一题时重置状态
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
      // 停止并重置视频/音频
      if (answerVideoRef.current) {
        answerVideoRef.current.pause();
        answerVideoRef.current.currentTime = 0;
        answerVideoRef.current.src = "";
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
      }
    } else {
      onComplete();
    }
  };

  const playAudio = () => {
    if (currentQuestion.question.audio && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-[#4B4B4B] max-w-md mx-auto">
      {/* 顶部进度条区域 */}
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-gray-400 text-xl hover:bg-gray-100 p-2 rounded-full"
        >
          ✕
        </button>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#58CC02] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* [素材替换] 生命值图标 */}
        <span className="text-red-500">❤️ 3</span>
      </div>

      {/* 题目内容区域 */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <h2 className="text-2xl font-bold mb-6 mt-2 text-left">
          请选择正确的答案
        </h2>

        {/* 角色 & 对话气泡 */}
        <div className="flex items-start gap-4 mb-6">
          {/* [素材替换] 提问的角色形象 (如乌萨奇) */}
          <div className="text-6xl animate-bounce-slow self-center">
            <Image
              src="/images/wsq-1.png"
              alt="乌萨奇"
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <div className="border-2 border-gray-200 p-4 rounded-xl rounded-tl-none relative bg-white shadow-sm">
              <p className="text-lg font-medium">
                {currentQuestion.question.text}
              </p>

              {/* 音频播放按钮 */}
              {currentQuestion.question.audio && (
                <div className="mt-2">
                  <button
                    onClick={playAudio}
                    className="flex items-center gap-2 bg-[#1CB0F6] text-white px-4 py-2 rounded-xl font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    🔊 播放声音
                  </button>
                  <audio
                    ref={audioRef}
                    src={currentQuestion.question.audio}
                    className="hidden"
                  />
                </div>
              )}

              {/* 视频占位符 */}
              {currentQuestion.question.video && (
                <div className="mt-2 rounded-xl overflow-hidden bg-black/10 aspect-video flex items-center justify-center">
                  {/* [素材替换] 这里可以放 <video> 标签 */}
                  <span className="text-gray-500">🎬 视频占位符</span>
                  {/* <video src={currentQuestion.question.video} controls className="w-full h-full" /> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 选项列表 */}
        <div
          className={`grid gap-4 ${
            currentQuestion.options.some((o) => o.image)
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            // 只有在显示反馈时才展示对错颜色
            let borderColor = "border-gray-200";
            let bgColor = "bg-white";

            if (showFeedback) {
              if (opt.label === currentQuestion.answer.correct) {
                borderColor = "border-[#58CC02]";
                bgColor = "bg-[#D7FFB8]";
              } else if (isSelected && !isCorrect) {
                borderColor = "border-[#FF4B4B]";
                bgColor = "bg-[#FFDFE0]";
              }
            } else if (isSelected) {
              borderColor = "border-[#1CB0F6]";
              bgColor = "bg-[#DDF4FF]";
            }

            return (
              <button
                key={idx}
                onClick={() => !showFeedback && setSelectedOption(idx)}
                className={`
                  p-4 rounded-xl border-2 border-b-4 text-left transition-all h-full flex flex-col justify-center
                  ${borderColor} ${bgColor}
                  ${!showFeedback && "hover:bg-gray-50"}
                  active:border-b-2 active:translate-y-[2px]
                `}
                disabled={showFeedback}
              >
                {/* 选项图片展示 */}
                {opt.image && (
                  <div className="mb-3 w-full aspect-square relative bg-white rounded-lg border border-gray-100 overflow-hidden">
                    {/* [素材替换] 使用 Next.js Image 组件显示真实图片 */}
                    <div className="flex items-center justify-center h-full text-4xl bg-gray-50">
                      🖼️
                    </div>
                    {/* <Image src={opt.image} alt={opt.text} fill className="object-contain" /> */}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`
                     w-8 h-8 rounded border-2 flex items-center justify-center font-bold text-sm shrink-0
                     ${
                       isSelected
                         ? "bg-blue-400 text-white border-blue-400"
                         : "bg-white text-gray-400"
                     }
                   `}
                  >
                    {opt.label}
                  </div>
                  <span className="font-medium">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 底部反馈与按钮区域 */}
      <div
        className={`
        fixed bottom-0 w-full max-w-md p-4 border-t-2 z-20
        ${
          showFeedback
            ? isCorrect
              ? "bg-[#D7FFB8] border-[#58CC02] text-[#58CC02]"
              : "bg-[#FFDFE0] border-[#FF4B4B] text-[#FF4B4B]"
            : "bg-white border-gray-200"
        }
      `}
      >
        {showFeedback && (
          <div className="mb-4">
            <div className="flex items-center gap-2 font-bold text-xl mb-1">
              {isCorrect ? (
                <>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#58CC02]">
                    ✓
                  </div>
                  非常好！
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#FF4B4B]">
                    ✕
                  </div>
                  正确答案: {currentQuestion.answer.correct}
                </>
              )}
            </div>

            {/* 答对后显示奖励内容：视频/音频/图片 */}
            {isCorrect && (
              <div className="mt-3 space-y-2">
                {/* 答对后播放视频 */}
                {currentQuestion.answer.video && (
                  <div className="rounded-xl overflow-hidden bg-black/10 aspect-video">
                    <video
                      ref={answerVideoRef}
                      src={currentQuestion.answer.video}
                      controls
                      className="w-full h-full"
                      autoPlay
                    />
                  </div>
                )}

                {/* 答对后显示图片 */}
                {currentQuestion.answer.image && (
                  <div className="rounded-xl overflow-hidden bg-white border-2 border-[#58CC02]">
                    <Image
                      src={currentQuestion.answer.image}
                      alt="正确答案奖励图片"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {/* 答对后播放音频（如果只有音频没有视频） */}
                {currentQuestion.answer.audio &&
                  !currentQuestion.answer.video && (
                    <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-lg">
                      <span className="text-sm">🎵 正在播放奖励音频</span>
                      <audio ref={audioRef} className="hidden" />
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={showFeedback ? handleNext : handleCheck}
          disabled={!showFeedback && selectedOption === null}
          className={`
             w-full py-3 rounded-xl font-bold text-lg border-b-4 uppercase tracking-widest transition-colors
             ${
               showFeedback
                 ? isCorrect
                   ? "bg-[#58CC02] text-white border-[#46A302] hover:bg-[#46A302]"
                   : "bg-[#FF4B4B] text-white border-[#EA2B2B] hover:bg-[#EA2B2B]"
                 : selectedOption !== null
                 ? "bg-[#58CC02] text-white border-[#46A302] hover:bg-[#46A302]"
                 : "bg-gray-200 text-gray-400 border-gray-300"
             }
           `}
        >
          {showFeedback ? "继续" : "检查"}
        </button>
      </div>
    </div>
  );
}

/**
 * 3. 胜利结算界面组件 (VictoryScreen)
 *
 * 功能：显示关卡完成信息、奖励结算。
 * 素材替换提示：
 * - 胜利动画：替换 🎉 🐰 🎉 为 GIF 或 Lottie 动画。
 * - 奖励图标：替换 🥕 为真实的胡萝卜素材。
 */
function VictoryScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFD057] text-[#5C3D2E] p-8 text-center">
      {/* [素材替换] 胜利动画 */}
      <div className="text-6xl mb-8 animate-bounce">🎉 🐰 🎉</div>

      <h1 className="text-3xl font-bold text-[#FF9600] mb-4">关卡完成！</h1>

      <div className="bg-white/20 p-6 rounded-2xl border-2 border-[#FFFFFF40] backdrop-blur-sm mb-8">
        <div className="text-xl font-bold mb-2">+50 XP</div>
        <div className="flex items-center justify-center gap-2 text-yellow-700">
          {/* [素材替换] 奖励图标 */}
          <span>🥕</span> <span>+10 根胡萝卜</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={onContinue}
          className="w-full bg-[#FF4B4B] text-white py-3 rounded-xl font-bold text-lg border-b-4 border-[#D33333] hover:bg-[#D33333] transition-colors"
        >
          继续
        </button>
        <button
          onClick={onContinue}
          className="w-full bg-white text-[#5C3D2E] py-3 rounded-xl font-bold text-lg border-b-4 border-gray-200 hover:bg-gray-50 transition-colors"
        >
          回顾
        </button>
      </div>
    </div>
  );
}

// --- 主页面组件 ---

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>("MAP");
  // 默认只解锁第 1 关
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1);
  const [currentPlayingLevel, setCurrentPlayingLevel] = useState(1);
  const QUESTIONS_PER_LEVEL = 1; // 需与 MapScreen 中保持一致，建议提取为公共常量

  const startLevel = (levelId: number) => {
    setCurrentPlayingLevel(levelId);
    setGameState("QUIZ");
  };

  const handleLevelComplete = () => {
    setGameState("VICTORY");

    // 核心逻辑：如果当前完成的关卡就是目前解锁的最高关卡，则解锁下一关
    if (currentPlayingLevel === maxUnlockedLevel) {
      const totalLevels = Math.ceil(questions.length / QUESTIONS_PER_LEVEL);
      if (maxUnlockedLevel < totalLevels) {
        setMaxUnlockedLevel((prev) => prev + 1);
      }
    }
  };

  const handleBackToMap = () => {
    setGameState("MAP");
  };

  // 获取当前关卡的题目数据
  const startIdx = (currentPlayingLevel - 1) * QUESTIONS_PER_LEVEL;
  const currentLevelQuestions = questions.slice(
    startIdx,
    startIdx + QUESTIONS_PER_LEVEL
  );

  return (
    <main className="min-h-screen bg-zinc-50 sm:max-w-md sm:mx-auto sm:border-x border-zinc-200 shadow-xl">
      {gameState === "MAP" && (
        <MapScreen onStartLevel={startLevel} unlockedLevel={maxUnlockedLevel} />
      )}
      {gameState === "QUIZ" && (
        <QuizScreen
          levelQuestions={currentLevelQuestions}
          onComplete={handleLevelComplete}
          onBack={handleBackToMap}
        />
      )}
      {gameState === "VICTORY" && (
        <VictoryScreen onContinue={handleBackToMap} />
      )}
    </main>
  );
}
