# Lyceum - Your Interactive Coding and Learning Platform

Lyceum is a modern educational platform built with Next.js, designed to provide an immersive and structured learning experience for aspiring developers. Named after Aristotle's ancient school, Lyceum combines traditional learning principles with modern technology to create an engaging educational journey.

## 🚀 Features

### Dashboard
- Your personal Lyceum learning hub
- Overview of your learning progress
- Quick access to all learning resources
- Personalized learning recommendations
- Activity tracking and history

### Learning Platform
- Curated educational videos from top programming channels
- Integration with freeCodeCamp and Telusko content
- Video search functionality
- Organized learning materials by topic
- Interactive video lessons with detailed descriptions

### Roadmaps
- AI-powered learning path generation
- Custom roadmap creation based on your goals
- Progress tracking for each roadmap
- Detailed step-by-step guidance
- Share and explore community roadmaps

### Quest System
- Time-based coding challenges
- Categorized quests (Upcoming, Active, Past)
- Real-time quest status tracking
- Detailed quest descriptions and requirements
- Quest completion tracking

### AI Assistant
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
git clone [repository-url]
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with necessary credentials:
- Clerk authentication keys
- MongoDB connection string
- YouTube API key
- Other API keys

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🔑 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGODB_URI`
- `NEXT_PUBLIC_YOUTUBE_API_KEY`
- Other service-specific keys

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📜 License

This project is licensed under the MIT License.
