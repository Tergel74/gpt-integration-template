# GPT Integration Template 🤖

**Turn your AI ideas into reality in minutes, not months.**

This production-ready template saves you 2-4 weeks of development time by providing everything you need to build professional AI chat applications. Whether you're creating a recipe assistant, fitness coach, or specialized tutor, this foundation handles the complex parts so you can focus on your unique AI solution.

![Application Overview](./docs/screenshots/start.png)
_Clean starting interface with simple navigation_

## ✨ What You Get

-   🎨 **Clean Interface** - Simple, customizable design foundation with yellow accent theme
-   🤖 **AI Integration** - OpenAI GPT-4o-mini with error handling & rate limiting
-   🔐 **Enterprise Security** - Row Level Security, admin system, production hardening
-   📊 **Smart Database** - PostgreSQL with real-time sync and optimized performance
-   🚀 **Production Ready** - TypeScript, Docker support, deployment guides

![Authentication](./docs/screenshots/auth.png)
_Secure authentication system ready to customize_

## 🚀 5-Minute Setup

### Prerequisites

-   Node.js 18+
-   Supabase account (free)
-   OpenAI API key ($5 free credit)

### Installation

```bash
# Extract zip and install
cd gpt-integration-template
npm install

# Setup environment
cp .env.example .env.local
# Add your API keys to .env.local

# Setup database
# 1. Create Supabase project
# 2. Run supabase/schema.sql in SQL Editor
# 3. Promote yourself to admin with your email

# Launch
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - your AI app is ready!

![Chat Interface](./docs/screenshots/chat.png)
_Functional chat interface ready for your customizations_

## 🎨 Build Anything

Transform this foundation into:

-   **Recipe Creator** - AI chef with meal planning & nutrition
-   **Fitness Coach** - Personalized workouts & health guidance
-   **Learning Tutor** - Adaptive education for any subject
-   **Business Assistant** - Customer support, lead qualification, content creation

![Debug Tools](./docs/screenshots/debug.png)
_Built-in development and testing tools_

## 🛠️ Tech Stack

Next.js 15, Supabase (Auth + DB), OpenAI GPT-4o-mini, Tailwind CSS 4, TypeScript, Zustand

---

**Ready to build?** See [FULL_GUIDE.md](./FULL_GUIDE.md) for detailed documentation, advanced features, and deployment guides.

**Questions?** Check the debug page at `/debug` for API testing and troubleshooting tools.
