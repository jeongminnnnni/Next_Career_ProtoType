"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Play, Pause, Volume2, CheckCircle } from "lucide-react"

type Screen = "welcome" | "work-preference" | "interview" | "conversation" | "completion" | "analysis" | "job-detail"

interface WorkOption {
  id: string
  text: string
  icon: string
}

const workOptions: WorkOption[] = [
  { id: "daily", text: "매일 짧게 꾸준히", icon: "💯" },
  { id: "part-time", text: "주 2~3회, 하루 2~4시간", icon: "🔥" },
  { id: "flexible", text: "일정 있을때만 비정기적으로", icon: "👋" },
  { id: "evening", text: "매일 6~8시간", icon: "⏰" },
  { id: "none", text: "상관 없음", icon: "🤷" },
  { id: "experience", text: "직접 입력", icon: "✏️" },
]

const questions = [
  "간략하게 자기 소개 부탁드려요.",
  "오 회계사로 일하셨군요? 왜 회계사란 직업을 선택하셨나요?",
  "회계사로 일하던 중, 가장 즐거웠던 에피소드를 하나 말해주세요.",
  "앞으로 어떤 분야에서 일하고 싶으세요?"
]

const responses = [
  "안녕하세요, 저는 김미경이라고 합니다... 20년 넘게 회계사로 일해왔고, 새로운 일에 한 번 도전을 해보고 싶네요..",
  "회계사라는 직업을 선택한 이유는 숫자나 데이터를 다루는 게 좋아서 였어요.. 그리고... 고객의 재무 상황을 개선하는 데 기여할 때 큰 보람을 느끼기도 했고요",
  "음... 제일 재미있던 순간? 솔직히 말하면 그때는 워낙 바빠서 재미 느낄 겨를도 별로 없었는데 지금 생각해보면... 아 막 떠오르는 게 하나 있네...",
  "음... 앞으로 누군가를 가르치는 일을 해보고 싶어요. 그런데서 보람을 느낄 수 있을 것 같고, 제 경험을 다른 사람들과 나누는 것도 좋을 것 같아요."
]

export default function CareerCounselingApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [selectedWork, setSelectedWork] = useState<string>("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [barHeights, setBarHeights] = useState<number[]>([])

  useEffect(() => {
    let recordingTimeout: NodeJS.Timeout
    let animationInterval: NodeJS.Timeout

    if (isRecording) {
      animationInterval = setInterval(() => {
        const newHeights = Array(20)
          .fill(0)
          .map(() => Math.random() * 20 + 10)
        setBarHeights(newHeights)
      }, 200)

      recordingTimeout = setTimeout(() => {
        clearInterval(animationInterval)
        setIsRecording(false)
        setShowResponse(true)
        setCurrentScreen("conversation")
      }, 10000) // 10 seconds
    }

    return () => {
      clearTimeout(recordingTimeout)
      clearInterval(animationInterval)
    }
  }, [isRecording])

  const getProgress = () => {
    switch (currentScreen) {
      case "welcome":
        return 0
      case "work-preference":
        return 1
      case "interview":
      case "conversation":
        return 2
      case "completion":
      case "analysis":
      case "job-detail":
        return 3
      default:
        return 0
    }
  }

  const renderProgressBar = () => {
    const progress = getProgress()
    return (
      <div className="flex items-center justify-between mb-8">
        <div className={`w-1/3 h-1 rounded-full ${progress >= 1 ? "bg-blue-500" : "bg-gray-200"}`}></div>
        <div className={`w-1/3 h-1 rounded-full ${progress >= 2 ? "bg-blue-500" : "bg-gray-200"}`}></div>
        <div className={`w-1/3 h-1 rounded-full ${progress >= 3 ? "bg-blue-500" : "bg-gray-200"}`}></div>
      </div>
    )
  }

  const handleButtonClick = (callback: () => void) => {
    // Button animation will be handled by CSS
    setTimeout(callback, 150)
  }

  const handleWorkSelection = (workId: string) => {
    setSelectedWork(workId)
  }

  const handleWorkPreferenceNext = () => {
    if (selectedWork) {
      setCurrentScreen("interview")
    }
  }

  const handleVoiceInput = () => {
    setIsRecording(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowResponse(false)
      setIsRecording(false)
      setCurrentScreen("interview")
    } else {
      setCurrentScreen("completion")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto aspect-[9/16]">
        <Card className="bg-white rounded-3xl shadow-lg overflow-hidden h-full flex flex-col">
          {/* Welcome Screen */}
          {currentScreen === "welcome" && (
            <div className="flex-1 flex flex-col justify-between p-8 text-left">
              <div className="flex-1 flex flex-col space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mt-10">안녕하세요, 미경님!</h1>
                <p className="text-gray-600 leading-relaxed text-left">
                  미경님에 대해 알려주시면,
                  <br />딱 맞는 직업과 교육을
                  <br />
                  추천해드릴게요
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center">조용하거나 차분한 환경에서 답해주세요</p>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-2xl text-lg font-bold transition-all duration-150 active:scale-95"
                  onClick={() => handleButtonClick(() => setCurrentScreen("work-preference"))}
                >
                  시작할게요
                </Button>
              </div>
            </div>
          )}

          {/* Work Preference Screen */}
          {currentScreen === "work-preference" && (
            <div className="flex-1 flex flex-col p-6">
              {renderProgressBar()}

              <h2 className="text-xl font-bold text-gray-900 mb-8 text-left">어떤 근무 형태를 원하시나요?</h2>

              <div className="space-y-3 flex-1">
                {workOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`w-full p-3 rounded-2xl text-left transition-all duration-200 active:scale-95 relative ${
                      selectedWork === option.id
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-gray-100 border-2 border-transparent hover:bg-gray-200"
                    }`}
                    onClick={() => handleWorkSelection(option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium text-gray-900">{option.text}</span>
                      </div>
                      {selectedWork === option.id && <CheckCircle className="w-6 h-6 text-blue-500" />}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                className={`w-full py-6 rounded-2xl text-lg font-bold mt-6 transition-all duration-150 active:scale-95 ${
                  selectedWork
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => selectedWork && handleButtonClick(handleWorkPreferenceNext)}
                disabled={!selectedWork}
              >
                다음 질문
              </Button>
            </div>
          )}

          {/* Interview Screen */}
          {currentScreen === "interview" && (
            <div className="flex-1 flex flex-col p-6">
              {renderProgressBar()}
              <h2 className="text-xl font-bold text-gray-900 leading-relaxed text-left">
                {questions[currentQuestion]}
              </h2>

              <div className="flex-1 flex flex-col justify-center space-y-8 mt-10">
                {!isRecording ? (
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div className="text-gray-400 text-lg">대답 작성</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4 mt-50">
                     <p className="text-gray-600 text-left text-small">AI가 사용자의 말을 듣고 있어요.</p>
                    <div className="bg-blue-500 rounded-2xl p-4 flex items-center space-x-3 w-full">
                      <div className="flex-1 flex items-center justify-center space-x-2">
                        <div className="flex space-x-1 h-[40px] items-end">
                          {barHeights.map((height, i) => (
                            <div
                              key={i}
                              className="w-1 bg-white/60 rounded-full transition-all duration-150"
                              style={{ height: `${height}px` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isRecording && (
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-2xl text-lg font-bold transition-all duration-150 active:scale-95 flex items-center justify-center space-x-2"
                  onClick={() => handleButtonClick(handleVoiceInput)}
                >
                  <Volume2 className="w-5 h-5" />
                  <span>직접 말할래요</span>
                </Button>
              )}
            </div>
          )}

          {/* Conversation Screen */}
          {currentScreen === "conversation" && (
            <div className="flex-1 flex flex-col p-6">
              {renderProgressBar()}
              <h2 className="text-xl font-bold text-gray-900 leading-relaxed text-left">
                {questions[currentQuestion]}
              </h2>

              <div className="flex-1 space-y-6 mt-10">
                {showResponse && (
                    <div className="bg-gray-100 p-4 rounded-2xl">
                        <p className="text-gray-700 leading-relaxed text-left">
                            {responses[Math.min(currentQuestion, responses.length - 1)]}
                        </p>
                    </div>
                )}

                <p className="text-sm text-gray-500 text-center py-2">
                  ⚠️ AI가 반영하지 못한 부분이 있으면 직접 입력해주세요!!
                </p>

                <Button
                  className="w-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50 py-5 rounded-2xl font-bold text-xl transition-all duration-150 active:scale-95"
                  onClick={() => handleButtonClick(handleNextQuestion)}
                >
                  {currentQuestion < questions.length - 1 ? "다음 질문" : "인터뷰 완료"}
                </Button>
              </div>
            </div>
          )}

          {/* Completion Screen */}
          {currentScreen === "completion" && (
            <div className="flex-1 flex flex-col justify-between p-8 text-left">
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  인터뷰가 끝났어요!
                  <br />
                  정말 고생 많으셨어요.
                </h1>

                <div className="flex justify-center">
                  <Image 
                    src="/toss_icon.png"
                    alt="Completion Icon"
                    width={250}
                    height={250}
                    className="rounded-full"
                  />
                </div>

                <p className="text-gray-600 text-xl text-left">
                  미경님께 가장 잘 맞는
                  <br />
                  <span className="text-blue-500 font-semibold">직업과 취업 전략, 교육</span>을<br />
                  소개시켜드릴게요
                </p>
              </div>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-2xl text-lg font-bold transition-all duration-150 active:scale-95"
                onClick={() => handleButtonClick(() => setCurrentScreen("analysis"))}
              >
                나의 새로운 커리어 보기
              </Button>
            </div>
          )}

          {/* Analysis Screen */}
          {currentScreen === "analysis" && (
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-left">김미경님은...</h2>

              <div className="space-y-4 mb-8">
                <div className="bg-red-50 p-4 rounded-2xl flex items-center space-x-3">
                  <span className="text-2xl">💯</span>
                  <span className="font-medium text-gray-900">논리적으로 설명해요</span>
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center space-x-3">
                  <span className="text-2xl">🔥</span>
                  <span className="font-medium text-gray-900">교육자적 성향이 있어요</span>
                </div>

                <div className="bg-yellow-50 p-4 rounded-2xl flex items-center space-x-3">
                  <span className="text-2xl">👋</span>
                  <span className="font-medium text-gray-900">가시적인 성취가 중요해요</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed mb-4 text-left">
                  미경님이 가진 이런 역량을
                  <br />
                  최대한 활용할 수 있고,
                  <br />
                  원하는 근무 조건을 맞출 수 있는
                  <br />
                  <span className="text-blue-500 font-semibold">유망 직업</span>을 몇 개 소개해 드릴게요.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full bg-blue-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center space-x-3"
                  onClick={() => handleButtonClick(() => setCurrentScreen("job-detail"))}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span className="font-medium text-blue-600">청소년 금융 교육 강사</span>
                </button>

                <button className="w-full bg-purple-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <span className="font-medium text-purple-600">AI 도슨트 프로그램 기획자</span>
                </button>

                <button className="w-full bg-green-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <span className="font-medium text-green-600">소상공인 재무 컨설턴트</span>
                </button>
              </div>
            </div>
          )}

          {/* Job Detail Screen */}
          {currentScreen === "job-detail" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center p-6 border-b relative">
                <Button variant="ghost" size="sm" className="absolute left-4 p-2" onClick={() => setCurrentScreen("analysis")}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-semibold text-center w-full">뒤로 가기</h1>
              </div>

              <div className="flex-1 p-6">
                <div className="bg-gray-100 rounded-2xl p-4 mb-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4 text-left">청소년 금융 교육 강사</h2>

                  <p className="text-gray-600 leading-relaxed text-left">
                    딱딱한 이론이 아닌, 20년 전문가가
                    <br />
                    들려주는 살아있는 경제 이야기는
                    <br />
                    청소년들에게 최고의 수업이 되겠죠!
                    <br />
                    <br />
                    미경님이 <span className="font-semibold">새롭게 배워야</span> 하는 건..
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 text-left">아동 교육/학습 설계</h3>

                  <button className="w-full bg-blue-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💻</span>
                      <span className="font-medium text-gray-900">넥스트커리어가 추천하는 인강</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </button>

                  <button className="w-full bg-red-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏠</span>
                      <span className="font-medium text-gray-900">집에서 바로 딸 수 있는 자격증</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </button>

                  <button className="w-full bg-green-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📚</span>
                      <span className="font-medium text-gray-900">정부 지원으로 돈 받는 학원</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 text-left">디지털 컨텐츠 제작</h3>

                  <button className="w-full bg-blue-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏢</span>
                      <span className="font-medium text-gray-900">넥스트커리어가 추천하는 학원</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </button>

                  <button className="w-full bg-purple-50 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📖</span>
                      <span className="font-medium text-gray-900">혼자 공부할 만한 책 추천</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
