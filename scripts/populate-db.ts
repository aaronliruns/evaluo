import { PrismaClient } from '../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface QuestionOption {
  text: string
  correct: boolean
}

interface Question {
  id: number
  text: string
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
  score: number
  options: QuestionOption[]
}

interface TestData {
  test_name: string
  test_description: string
  questions: Question[]
}

function parseQuestionsFile(filePath: string): TestData {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  const data: TestData = {
    test_name: '',
    test_description: '',
    questions: []
  }
  
  let currentQuestion: Partial<Question> | null = null
  let currentOptions: QuestionOption[] = []
  let inQuestions = false
  let inOptions = false
  let indent = 0
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Skip comments and empty lines
    if (trimmed.startsWith('#') || trimmed === '') continue
    
    // Parse test metadata
    if (trimmed.startsWith('test_name:')) {
      data.test_name = trimmed.split('test_name:')[1].trim().replace(/"/g, '')
      continue
    }
    
    if (trimmed.startsWith('test_description:')) {
      data.test_description = trimmed.split('test_description:')[1].trim().replace(/"/g, '')
      continue
    }
    
    // Start of questions section
    if (trimmed === 'questions:') {
      inQuestions = true
      continue
    }
    
    if (!inQuestions) continue
    
    // Detect indentation level
    const currentIndent = line.length - line.trimLeft().length
    
    // New question
    if (trimmed.startsWith('- id:')) {
      // Save previous question if exists
      if (currentQuestion && currentQuestion.id) {
        data.questions.push({
          ...currentQuestion,
          options: currentOptions
        } as Question)
      }
      
      currentQuestion = {
        id: parseInt(trimmed.split('id:')[1].trim()),
        options: []
      }
      currentOptions = []
      inOptions = false
      indent = currentIndent
      continue
    }
    
    if (currentQuestion && currentIndent === indent + 2) {
      // Question properties
      if (trimmed.startsWith('text:')) {
        currentQuestion.text = trimmed.split('text:')[1].trim().replace(/"/g, '')
      } else if (trimmed.startsWith('type:')) {
        currentQuestion.type = trimmed.split('type:')[1].trim().replace(/"/g, '') as 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
      } else if (trimmed.startsWith('score:')) {
        currentQuestion.score = parseInt(trimmed.split('score:')[1].trim())
      } else if (trimmed === 'options:') {
        inOptions = true
      }
    }
    
    if (inOptions && currentIndent >= indent + 4) {
      // Option entry
      if (trimmed.startsWith('- text:')) {
        const optionText = trimmed.split('text:')[1].trim().replace(/"/g, '')
        currentOptions.push({ text: optionText, correct: false })
      } else if (trimmed.startsWith('correct:')) {
        const isCorrect = trimmed.split('correct:')[1].trim() === 'true'
        if (currentOptions.length > 0) {
          currentOptions[currentOptions.length - 1].correct = isCorrect
        }
      }
    }
  }
  
  // Save last question
  if (currentQuestion && currentQuestion.id) {
    data.questions.push({
      ...currentQuestion,
      options: currentOptions
    } as Question)
  }
  
  return data
}

async function populateDatabase() {
  try {
    console.log('🗑️  Clearing existing data...')
    
    // Clear existing data
    await prisma.option.deleteMany()
    await prisma.question.deleteMany()
    await prisma.test.deleteMany()
    
    console.log('📖 Parsing questions file...')
    
    // Parse the questions file
    const questionsPath = path.join(__dirname, '../data/questions.txt')
    const testData = parseQuestionsFile(questionsPath)
    
    console.log('💾 Creating test and questions...')
    
    // Create test
    const test = await prisma.test.create({
      data: {
        name: testData.test_name,
        description: testData.test_description
      }
    })
    
    // Create questions and options
    for (const questionData of testData.questions) {
      const question = await prisma.question.create({
        data: {
          testId: test.id,
          text: questionData.text,
          type: questionData.type,
          order: questionData.id,
          score: questionData.score
        }
      })
      
      // Create options
      for (let i = 0; i < questionData.options.length; i++) {
        await prisma.option.create({
          data: {
            questionId: question.id,
            text: questionData.options[i].text,
            isCorrect: questionData.options[i].correct,
            order: i + 1
          }
        })
      }
    }
    
    console.log('✅ Database populated successfully!')
    console.log(`Created test: "${testData.test_name}"`)
    console.log(`Questions: ${testData.questions.length}`)
    
  } catch (error) {
    console.error('❌ Error populating database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
populateDatabase()
