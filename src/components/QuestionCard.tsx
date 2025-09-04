import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { QuestionData, UserAnswer } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: QuestionData
  userAnswer: UserAnswer | undefined
  onAnswerChange: (answer: UserAnswer) => void
}

export function QuestionCard({ question, userAnswer, onAnswerChange }: QuestionCardProps) {
  const handleOptionChange = (optionId: number, checked: boolean) => {
    let newSelectedIds: number[] = []
    
    if (question.type === 'SINGLE_CHOICE') {
      newSelectedIds = checked ? [optionId] : []
    } else {
      const currentIds = userAnswer?.selectedOptionIds || []
      if (checked) {
        newSelectedIds = [...currentIds, optionId]
      } else {
        newSelectedIds = currentIds.filter(id => id !== optionId)
      }
    }
    
    onAnswerChange({
      questionId: question.id,
      selectedOptionIds: newSelectedIds
    })
  }

  const isOptionSelected = (optionId: number) => {
    return userAnswer?.selectedOptionIds.includes(optionId) || false
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Question {question.order}
          <span className="ml-2 text-sm text-muted-foreground">
            ({question.score} point{question.score !== 1 ? 's' : ''})
          </span>
        </CardTitle>
        <p className="text-base text-foreground mt-2">{question.text}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {question.type === 'MULTIPLE_CHOICE' ? 'Select all that apply' : 'Select one option'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options
            .sort((a, b) => a.order - b.order)
            .map((option) => (
              <div key={option.id} className="flex items-start space-x-3">
                <Checkbox
                  id={`option-${option.id}`}
                  checked={isOptionSelected(option.id)}
                  onCheckedChange={(checked) => 
                    handleOptionChange(option.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor={`option-${option.id}`}
                  className={cn(
                    "text-sm font-medium leading-relaxed cursor-pointer flex-1",
                    isOptionSelected(option.id) && "text-primary"
                  )}
                >
                  {option.text}
                </label>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
