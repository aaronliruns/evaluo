# Eveluo
### A web application for assessing candidates' skills

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS + Shadcn UI
- Prisma
- Sqlite

## Functional Features
- The system shall allows users to select single or multiple items as answers to the questions.
- The system will come with score based on expected answers stored in database.
- Design a plain text file with a script to edit the questions and answers and a script to refresh / populate the database with the questions and answers.
- For each question there should be a score assigned in the plain text file (eventually in the database also)
- When user submit their choices, the system will calculate the score based on the expected answers and display the result and the percentage of the score and the time spent on the test.
- The database should be designed to store questions and expected answers which are mapped to the plain text file (so that the script mentioned above is able to refresh the database with the questions and answers)
- Create a few samples of questions and expected answers in the plain text file to cover the cases of single answer, multiple answers.
- The name of the test can be set in the plain text file.

## Non-Functional Features
- UTF-8 shall be supported (will need to store the questions and answers in Chinese in the plain text and database)
- The frontend should be responsive and mobile-friendly
- The system doesn't need login or authentication at all. Refreshing the page will reload all questions and answers from the database and reset all choices.
- The frontend shall be designed to be simple, neat.
- Create a docker file to containerize the application and include the database. (do not need docker-compose)





