const fs = require('fs')

function debugParseQuestionsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  console.log('=== PARSING DEBUG ===')
  
  let currentQuestion = null
  let currentOptions = []
  let inQuestions = false
  let inOptions = false
  let indent = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Skip comments and empty lines
    if (trimmed.startsWith('#') || trimmed === '') continue
    
    // Start of questions section
    if (trimmed === 'questions:') {
      inQuestions = true
      console.log(`Line ${i+1}: Found questions section`)
      continue
    }
    
    if (!inQuestions) continue
    
    // Detect indentation level
    const currentIndent = line.length - line.trimLeft().length
    
    // New question
    if (trimmed.startsWith('- id:')) {
      if (currentQuestion) {
        console.log(`Question ${currentQuestion.id} options:`, currentOptions)
      }
      
      currentQuestion = {
        id: parseInt(trimmed.split('id:')[1].trim()),
        options: []
      }
      currentOptions = []
      inOptions = false
      indent = currentIndent
      console.log(`\nLine ${i+1}: New question ${currentQuestion.id}, indent: ${indent}`)
      continue
    }
    
    if (currentQuestion && currentIndent === indent + 2) {
      if (trimmed === 'options:') {
        inOptions = true
        console.log(`Line ${i+1}: Found options section for question ${currentQuestion.id}`)
      }
    }
    
    if (inOptions && currentIndent >= indent + 4) {
      console.log(`Line ${i+1}: Processing option line (indent: ${currentIndent}): "${trimmed}"`)
      
      if (trimmed.startsWith('- text:')) {
        const optionText = trimmed.split('text:')[1].trim().replace(/"/g, '')
        currentOptions.push({ text: optionText, correct: false })
        console.log(`  Added option: "${optionText}"`)
      } else if (trimmed.startsWith('correct:')) {
        const isCorrect = trimmed.split('correct:')[1].trim() === 'true'
        if (currentOptions.length > 0) {
          currentOptions[currentOptions.length - 1].correct = isCorrect
          console.log(`  Set correct: ${isCorrect} for last option`)
        }
      }
    }
  }
  
  // Final question
  if (currentQuestion) {
    console.log(`Final question ${currentQuestion.id} options:`, currentOptions)
  }
}

debugParseQuestionsFile('./data/questions.txt')
