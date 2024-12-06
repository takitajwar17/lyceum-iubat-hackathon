# Lyceum - Your Interactive Coding and Learning Platform

> 🏆 Created by Team XtraDrill for IUBAT Hackathon

Lyceum is a modern educational platform built with Next.js, designed to provide an immersive and structured learning experience for aspiring developers. Named after Aristotle's ancient school, Lyceum combines traditional learning principles with modern technology to create an engaging educational journey.
![image](https://github.com/user-attachments/assets/4fcc5461-b395-492a-a826-9f8a96130d4e)

## 🚀 Features

### Learning Platform
- Curated educational videos from top programming channels
- Integration with freeCodeCamp and Telusko content
- Video search functionality
- Organized learning materials by topic
- Interactive video lessons with detailed descriptions
![image](https://github.com/user-attachments/assets/f6b93293-bc01-42be-b539-41d884887614)

### Roadmaps
- AI-powered learning path generation
- Custom roadmap creation based on your goals
- Progress tracking for each roadmap
- Detailed step-by-step guidance
- Share and explore community roadmaps
![image](https://github.com/user-attachments/assets/70152519-4bb0-475a-bf7b-1aedf5980330)

![image](https://github.com/user-attachments/assets/d8ba1523-7694-4aae-8bcb-f4339e8477b3)
![image](https://github.com/user-attachments/assets/03a09c4c-35ad-4e83-a48a-b4853e264303)


### Quest System
- Time-based coding challenges
- Categorized quests (Upcoming, Active, Past)
- Real-time quest status tracking
- Detailed quest descriptions and requirements
- Quest completion tracking
![image](https://github.com/user-attachments/assets/6506f188-fba9-4793-b367-e8713fdbef99)
![WhatsApp Image 2024-12-06 at 17 23 06_2af1fdc2](https://github.com/user-attachments/assets/2e91ff0f-1fa6-476e-9b9c-a8da88f8fae2)
![image](https://github.com/user-attachments/assets/7207e281-bd75-4585-8663-a98f4e9f9a70)
![image](https://github.com/user-attachments/assets/4b01d1c2-9745-4384-b4d8-c343e3d985fa)



### AI Assistant (Future Scope)
- Intelligent learning support
- Code explanation and debugging help
- Personalized learning recommendations
- Interactive problem-solving guidance
- Quick answers to programming questions

### Authentication
- Secure user authentication powered by Clerk
- User profile management
- Role-based access control
- Secure session handling
- Social login integration
![image](https://github.com/user-attachments/assets/f820978b-8b7b-473a-b317-a7869b868d5f)

## 📁 Project Structure

```
├── app/
│   ├── admin/         # Admin panel components
│   ├── api/          # API routes
│   ├── components/   # Reusable UI components
│   ├── dashboard/    # User dashboard
│   ├── learn/        # Learning platform
│   ├── quests/       # Quest system
│   ├── roadmaps/     # Learning roadmaps
│   └── layout.jsx    # Root layout component
├── lib/             # Utility functions and actions
├── public/          # Static assets
└── components/      # Shared components
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Chakra UI
  - Framer Motion
- **Database**: MongoDB with Mongoose
- **Code Editor**: Monaco Editor
- **Markdown**: React Markdown with GFM
- **Analytics**: Vercel Analytics & Speed Insights

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/takitajwar17/lyceum-iubat-hackathon.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_webhook_secret

# MongoDB
MONGODB_URI=your_mongodb_uri

# AI Services
GROQ_API_KEY=your_groq_api_key
PLAGIARISM_CHECK_API_KEY=your_plagiarism_check_api_key

# URLs
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

You can find an example in the `.env.example` file. Make sure to replace all placeholder values with your actual API keys and credentials.

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📜 License

This project is licensed under the MIT License.

---
Created with 💻 by Team XtraDrill for IUBAT Hackathon
