import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFD057] flex flex-col items-center justify-center p-6 text-[#5C3D2E]">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-[#E5E5E5]">
        {/* Header Image */}
        <div className="bg-[#FF9600] p-8 flex justify-center items-center">
          <div className="w-32 h-32 relative animate-bounce">
            <Image
              src="/images/wsq-1.png"
              alt="乌萨奇"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-black mb-2">
              欢迎来到
              <br />
              乌萨奇大冒险！
            </h1>
            <p className="text-gray-500 font-bold">准备好开始挑战了吗？</p>
          </div>

          {/* 提醒事项 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📝 提醒事项
            </h2>
            <ul className="bg-gray-50 p-4 rounded-2xl space-y-2 text-sm font-medium text-gray-600">
              <li className="flex items-start gap-2">
                <span>🔊</span>
                <span>请开启声音，游戏中包含精彩音效和语音。</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🧠</span>
                <span>仔细审题，每一关都有不同的考验。</span>
              </li>
              <li className="flex items-start gap-2">
                <span>❤️</span>
                <span>注意生命值，答错会扣除爱心哦！</span>
              </li>
            </ul>
          </div>

          {/* 通关奖励 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              🎁 通关奖励
            </h2>
            <div className="bg-[#FFF5D1] p-4 rounded-2xl border-2 border-[#FFD057] flex items-center gap-4">
              <div className="text-4xl">🏆</div>
              <div className="text-sm font-bold text-[#8A6D0B]">
                <p>完成所有关卡后，</p>
                <p>
                  将解锁神秘的
                  <span className="text-[#FF4B4B]">最终大奖视频</span>！
                </p>
              </div>
            </div>
          </div>

          {/* 开始游戏按钮 */}
          <Link href="/game" className="block">
            <button className="w-full bg-[#58CC02] hover:bg-[#46A302] text-white text-xl font-black py-4 rounded-2xl border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest shadow-lg">
              开始游戏
            </button>
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-center font-bold text-[#8A6D0B] text-sm opacity-60">
        © 2024 乌萨奇大冒险
      </footer>
    </main>
  );
}
