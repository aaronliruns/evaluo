import { NextRequest, NextResponse } from 'next/server'
import { testData } from '@/lib/data'
import { UserAnswer } from '@/types'

export async function POST(request: NextRequest) {
  try {
    console.log('Submit API called')
    const body = await request.json()
    console.log('Request body:', body)
    
    const { answers, timeSpent }: { answers: UserAnswer[], timeSpent: number } = body

    console.log('Using in-memory test data...')
    const test = testData
    
    console.log('Test data loaded:', test ? 'Success' : 'No test found')

    if (!test) {
      return NextResponse.json({ error: 'No test found' }, { status: 404 })
    }

    // Calculate score
    let totalScore = 0
    let earnedScore = 0

    console.log('Starting score calculation...')
    console.log('Number of questions:', test.questions.length)
    console.log('User answers received:', answers.length)

    for (const question of test.questions) {
      totalScore += question.score
      console.log(`\nQuestion ${question.id} (order: ${question.order}):`)
      console.log('Question score:', question.score)
      
      const userAnswer = answers.find(a => a.questionId === question.id)
      console.log('User answer found:', !!userAnswer)
      
      if (!userAnswer) {
        console.log('No user answer for this question, skipping')
        continue
      }

      const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.id)
      const selectedOptions = userAnswer.selectedOptionIds

      console.log('Correct option IDs:', correctOptions)
      console.log('Selected option IDs:', selectedOptions)

      // Check if answer is correct
      const isCorrect = correctOptions.length === selectedOptions.length &&
        correctOptions.every(id => selectedOptions.includes(id))

      console.log('Answer is correct:', isCorrect)

      if (isCorrect) {
        earnedScore += question.score
        console.log('Added score:', question.score, 'Total earned:', earnedScore)
      }
    }

    console.log('\nFinal calculation:')
    console.log('Total possible score:', totalScore)
    console.log('Total earned score:', earnedScore)

    const percentage = totalScore > 0 ? (earnedScore / totalScore) * 100 : 0

    const result = {
      score: earnedScore,
      totalScore,
      percentage,
      timeSpent,
      answers
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error submitting test:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
