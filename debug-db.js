const { PrismaClient } = require('./src/generated/prisma')

const prisma = new PrismaClient()

async function debugDatabase() {
  try {
    console.log('=== DATABASE DEBUG ===')
    
    // Check test data
    const test = await prisma.test.findFirst({
      include: {
        questions: {
          include: {
            options: true
          },
          orderBy: { order: 'asc' }
        }
      }
    })
    
    if (!test) {
      console.log('❌ No test found in database')
      return
    }
    
    console.log(`✅ Test found: "${test.name}"`)
    console.log(`📊 Questions: ${test.questions.length}`)
    
    // Check first few questions
    for (let i = 0; i < Math.min(3, test.questions.length); i++) {
      const q = test.questions[i]
      console.log(`\n--- Question ${q.id} (order: ${q.order}) ---`)
      console.log(`Text: ${q.text.substring(0, 50)}...`)
      console.log(`Score: ${q.score}`)
      console.log(`Type: ${q.type}`)
      console.log(`Options (${q.options.length}):`)
      
      q.options.forEach(opt => {
        console.log(`  - ID: ${opt.id}, Order: ${opt.order}, Correct: ${opt.isCorrect}`)
        console.log(`    Text: ${opt.text.substring(0, 30)}...`)
      })
    }
    
    // Test scoring logic with sample data
    console.log('\n=== SCORING TEST ===')
    const sampleAnswers = [
      { questionId: test.questions[0].id, selectedOptionIds: [test.questions[0].options.find(o => o.isCorrect).id] }
    ]
    
    console.log('Sample answer:', sampleAnswers[0])
    
    const question = test.questions[0]
    const userAnswer = sampleAnswers[0]
    const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.id)
    const selectedOptions = userAnswer.selectedOptionIds
    
    console.log('Correct option IDs:', correctOptions)
    console.log('Selected option IDs:', selectedOptions)
    
    const isCorrect = correctOptions.length === selectedOptions.length &&
      correctOptions.every(id => selectedOptions.includes(id))
    
    console.log('Should be correct:', isCorrect)
    
  } catch (error) {
    console.error('❌ Debug error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugDatabase()
