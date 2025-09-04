'use client'

import { useState, useEffect } from 'react'
import { QuestionCard } from '@/components/QuestionCard'
import { TestResults } from '@/components/TestResults'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TestData, UserAnswer, TestResult } from '@/types'
import { Clock, FileText } from 'lucide-react'

export default function Home() {
  const [testData, setTestData] = useState<TestData | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer effect
  useEffect(() => {
    if (!isSubmitted && testData && startTime && mounted) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startTime, isSubmitted, testData, mounted])

  // Load test data
  useEffect(() => {
    if (mounted) {
      loadTestData()
    }
  }, [mounted])

  const loadTestData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/test')
      if (response.ok) {
        const data = await response.json()
        setTestData(data)
        setStartTime(Date.now())
      } else {
        console.error('Failed to load test data')
      }
    } catch (error) {
      console.error('Error loading test data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (answer: UserAnswer) => {
    setUserAnswers(prev => {
      const existing = prev.find(a => a.questionId === answer.questionId)
      if (existing) {
        return prev.map(a => a.questionId === answer.questionId ? answer : a)
      }
      return [...prev, answer]
    })
  }

  const handleSubmit = async () => {
    if (!testData) return

    try {
      console.log('Submitting test with answers:', userAnswers)
      console.log('Time elapsed:', timeElapsed)
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: userAnswers,
          timeSpent: timeElapsed
        })
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log('Submit result:', result)
        setTestResult(result)
        setIsSubmitted(true)
      } else {
        const errorText = await response.text()
        console.error('Submit failed with status:', response.status, 'Error:', errorText)
        alert(`Failed to submit test: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('Error submitting test:', error)
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleRestart = () => {
    setUserAnswers([])
    setCurrentQuestionIndex(0)
    setIsSubmitted(false)
    setTestResult(null)
    setStartTime(Date.now())
    setTimeElapsed(0)
    loadTestData()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (!testData) return 0
    return (userAnswers.length / testData.questions.length) * 100
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading test...</p>
        </div>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Test Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              No test data found. Please make sure the database is populated with questions.
            </p>
            <Button onClick={loadTestData} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted && testResult) {
    return (
      <div className="min-h-screen bg-background p-4 py-8">
        <TestResults 
          result={testResult} 
          testData={testData} 
          onRestart={handleRestart} 
        />
      </div>
    )
  }

  const currentQuestion = testData.questions[currentQuestionIndex]
  const userAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6" />
                <div>
                  <CardTitle className="text-xl">{testData.name}</CardTitle>
                  {testData.description && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {testData.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{mounted ? formatTime(timeElapsed) : '0:00'}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{userAnswers.length} of {testData.questions.length} answered</span>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {testData.questions.map((_, index) => {
            const isAnswered = userAnswers.some(a => 
              a.questionId === testData.questions[index].id
            )
            return (
              <Button
                key={index}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={isAnswered ? "bg-green-100 border-green-300" : ""}
              >
                {index + 1}
              </Button>
            )
          })}
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <div className="mb-6">
            <QuestionCard
              question={currentQuestion}
              userAnswer={userAnswer}
              onAnswerChange={handleAnswerChange}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="space-x-2">
            {currentQuestionIndex < testData.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={userAnswers.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Test
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
