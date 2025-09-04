import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { TestResult, TestData } from '@/types'
import { CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react'

interface TestResultsProps {
  result: TestResult
  testData: TestData
  onRestart: () => void
}

export function TestResults({ result, testData, onRestart }: TestResultsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 60) {
      return <CheckCircle className="h-8 w-8 text-green-600" />
    }
    return <XCircle className="h-8 w-8 text-red-600" />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getScoreIcon(result.percentage)}
          </div>
          <CardTitle className="text-2xl">Test Completed!</CardTitle>
          <p className="text-muted-foreground">{testData.name}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.percentage.toFixed(1)}%
            </div>
            <p className="text-muted-foreground mt-2">
              {result.score} out of {result.totalScore} points
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{result.percentage.toFixed(1)}%</span>
            </div>
            <Progress value={result.percentage} className="h-2" />
          </div>

          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Time spent: {formatTime(result.timeSpent)}</span>
          </div>

          <div className="pt-4">
            <Button onClick={onRestart} className="w-full" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Take Test Again
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testData.questions
              .sort((a, b) => a.order - b.order)
              .map((question) => {
                const userAnswer = result.answers.find(a => a.questionId === question.id)
                const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.id)
                const selectedOptions = userAnswer?.selectedOptionIds || []
                
                const isCorrect = correctOptions.length === selectedOptions.length &&
                  correctOptions.every(id => selectedOptions.includes(id))

                return (
                  <div key={question.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="mt-1">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Question {question.order}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isCorrect ? `+${question.score} points` : '0 points'}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
