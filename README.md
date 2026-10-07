# SevaSetu

SevaSetu is a full-stack Next.js citizen-service agent demo for the Government service workflow challenge. It simulates a multilingual AI-assisted government service experience where a user can:

- request a service such as Income Certificate or Domicile Certificate
- collect and validate required documents
- fill application details
- approve consent before submission
- track application status through a mock government portal
- recover from failures and escalate to a human helper

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS
- App Router API routes
- JSON file-based mock persistence for a working backend

## Local run

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Demo flow

1. Choose a language (English, Hindi, Bengali, Punjabi, Bhojpuri)
2. Ask for a service request like “Mujhe income certificate banana hai.”
3. Review required documents and upload details
4. Fill applicant information
5. Confirm consent before final submission
6. View the mock government portal status lifecycle
7. Use the officer dashboard to approve or reject the application
