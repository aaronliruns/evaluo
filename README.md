# Eveluo - Assessment System

A modern web-based skill assessment platform built with Next.js, TypeScript, and Prisma.

## Features

- **Multi-format Questions**: Support for single-choice and multiple-choice questions
- **Real-time Scoring**: Automatic calculation of scores based on correct answers
- **Timer Functionality**: Track time spent on assessments
- **UTF-8 Support**: Full support for international characters including Chinese
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Database Management**: Easy question management through plain text files
- **Docker Support**: Containerized deployment ready

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS with Shadcn/ui components
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd evaluo
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:generate
npm run db:push
```

4. Populate the database with sample questions:
```bash
npm run db:populate
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Question Management

### Adding Questions

Questions are managed through the `data/questions.txt` file. The format supports:

- Test metadata (name, description)
- Single-choice questions
- Multiple-choice questions
- UTF-8 characters (including Chinese)
- Custom scoring per question

Example format:
```yaml
test_name: "Your Test Name"
test_description: "Test description"

questions:
  - id: 1
    text: "What is JavaScript?"
    type: "SINGLE_CHOICE"
    score: 2
    options:
      - text: "A programming language"
        correct: true
      - text: "A markup language"
        correct: false
```

### Updating Questions

1. Edit the `data/questions.txt` file
2. Run the populate script to update the database:
```bash
npm run db:populate
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:populate` - Populate database from questions.txt

## Docker Deployment

### Build and Run with Docker

1. Build the Docker image:
```bash
docker build -t evaluo .
```

2. Run the container:
```bash
docker run -p 3000:3000 evaluo
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Database Schema

The system uses three main models:

- **Test**: Contains test metadata (name, description)
- **Question**: Individual questions with type, text, and scoring
- **Option**: Answer options with correctness indicators

## Features Overview

### Assessment Interface
- Clean, intuitive question navigation
- Progress tracking with visual indicators
- Real-time timer display
- Question numbering with completion status

### Scoring System
- Automatic score calculation
- Percentage-based results
- Detailed question breakdown
- Time tracking and display

### Results Display
- Overall score and percentage
- Individual question results
- Time spent on assessment
- Option to retake the test

## Browser Support

The application supports all modern browsers and is fully responsive for mobile devices.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
