export interface TestData {
  id: number
  name: string
  description: string | null
  questions: QuestionData[]
}

export interface QuestionData {
  id: number
  text: string
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
  order: number
  score: number
  options: OptionData[]
}

export interface OptionData {
  id: number
  text: string
  isCorrect: boolean
  order: number
}

export interface UserAnswer {
  questionId: number
  selectedOptionIds: number[]
}

export interface TestResult {
  score: number
  totalScore: number
  percentage: number
  timeSpent: number
  answers: UserAnswer[]
}
