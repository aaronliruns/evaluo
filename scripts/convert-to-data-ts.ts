import * as fs from 'fs'
import * as path from 'path'

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

function generateTypeScriptCode(testData: TestData): string {
  let optionId = 1
  let code = `// In-memory data store for Vercel deployment
import { TestData } from '@/types'

export const testData: TestData = {
  id: 1,
  name: "${testData.test_name}",
  description: "${testData.test_description}",
  questions: [\n`

  testData.questions.forEach((question, qIndex) => {
    code += `    {
      id: ${question.id},
      text: "${question.text.replace(/"/g, '\\"')}",
      type: "${question.type}",
      order: ${question.id},
      score: ${question.score},
      options: [\n`
    
    question.options.forEach((option, oIndex) => {
      code += `        { id: ${optionId++}, text: "${option.text.replace(/"/g, '\\"')}", isCorrect: ${option.correct}, order: ${oIndex + 1} }${oIndex < question.options.length - 1 ? ',' : ''}\n`
    })
    
    code += `      ]\n`
    code += `    }${qIndex < testData.questions.length - 1 ? ',' : ''}\n`
  })

  code += `  ]
}\n`

  return code
}

// Main execution
const questionsPath = path.join(__dirname, '../data/questions.txt')
const outputPath = path.join(__dirname, '../src/lib/data.ts')

console.log('📖 Parsing questions file...')
const testData = parseQuestionsFile(questionsPath)

console.log('✍️  Generating TypeScript code...')
const tsCode = generateTypeScriptCode(testData)

console.log('💾 Writing to data.ts...')
fs.writeFileSync(outputPath, tsCode, 'utf-8')

console.log('✅ Successfully updated src/lib/data.ts')
console.log(`   Test: "${testData.test_name}"`)
console.log(`   Questions: ${testData.questions.length}`)
