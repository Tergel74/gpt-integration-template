# AI Chat Template 🤖💬

A production-ready foundation for GPT-powered chat apps (and beyond).

Building an AI chat application from scratch is harder than it looks. Authentication, database design, state management, prompt handling, debugging tools—it all adds up. That's why I built this template: to give you a solid foundation so you can launch faster, scale easier, and focus on what makes your AI app unique.

Whether you're building a learning tutor, recipe assistant, fitness coach, or business chatbot, this template gives you a professional, production-ready starting point.

## ✨ Why This Template is Different

This isn't just a "chat UI." It's a complete AI integration template with:

🎨 **Beautiful, responsive design** (Tailwind + polished UX)

🤖 **GPT-4o-mini integration that just works** (error handling, multiple personalities)

🔐 **Secure authentication & row-level data protection** with Supabase

📊 **Automatic chat history** with scalable Postgres

🛠 **Zustand state management** for clean, reliable logic

🐛 **Built-in debug page** (test prompts, inspect API calls, manage admins)

🚀 **Docker & Vercel deployment guides** for real-world use

## 🧑‍💻 Who This is For

**Developers** who want to skip boilerplate and jump into building features

**Indie hackers** launching SaaS or side projects powered by GPT

**Students/learners** who want to understand AI app architecture

**Agencies/freelancers** building AI assistants for clients

If you've ever thought "I just want to build my AI idea without fighting setup hell" — this template is for you.

## 🚀 Get Started in Minutes

**What you'll need:**
- Node.js 18+
- Supabase account (free tier works great)
- OpenAI API key ($5 free credits on signup)

```bash
# Extract and install
cd ai-chat-template
npm install

# Set up environment
cp .env.example .env.local
# add OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set up database (copy supabase/schema.sql into Supabase SQL editor)
# Promote yourself to admin:
SELECT public.promote_user_to_admin_by_email('your-email@example.com');

# Run dev server
npm run dev
```

Open `http://localhost:3000` and you're live.

## 🐛 Debug Page – A Developer's Secret Weapon

Instead of console.logs everywhere, test and debug directly inside your app:

🔬 **Send raw prompts to GPT**

👥 **Manage admin users**

🗃 **Inspect / clear chat history**

🔍 **Debug API calls in real time**

Protected by environment checks, auth, and admin rights, so it's safe even if you forget to remove it before deployment.

## 🎛️ AI Modes Built-In

Three modes included (and easy to extend):

```typescript
const systemPrompts = {
  friend: "You are Jake, a reliable friend who loves to make people smile.",
  mentor: "You are a supportive life mentor with easy examples.",
  developer: "You are a senior developer, concise and technical.",
};
```

**Add your own personalities in minutes:**

👩‍🍳 **Chef** – AI recipe creator

🏋️ **Fitness coach** – custom workouts & nutrition

📚 **Tutor** – personalized learning assistant

💼 **Business bot** – customer support & lead capture

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/        # OpenAI API route
│   ├── chat/            # Main chat UI
│   ├── debug/           # Debug tools (admin only)
│   └── login/           # Auth pages
├── components/          # UI components (ChatBubble, ChatInput, Navbar)
├── lib/                 # Supabase + OpenAI clients
├── store/               # Zustand state management
├── styles/              # Tailwind CSS
└── types/               # TypeScript types
```

## 🚀 Deployment

**Vercel (recommended):**
Connect repo → add env vars → deploy in 1 click

**Docker (for companies):**
```bash
docker build -t ai-chat-template .
docker run -p 3000:3000 --env-file .env.local ai-chat-template
```

Docs included for AWS, Railway, DigitalOcean, etc.

## 💡 Demo Use Case – Recipe AI 🍳

Want to see how this template transforms into a real app?

✅ Upload ingredients → GPT generates possible recipes

✅ Filter by high-protein, sweet tooth, healthy

✅ Save favorite meals (all backed by Supabase)

👉 This shows how to build from foundation → product.

## 🎯 Why I Built This

As an indie developer, I kept running into the same problems every time I wanted to build something with GPT. Setting up auth, saving history, managing state—it was boring, repetitive, and error-prone.

So I built the exact template I wished I had when I started. Now, you can use it too.

## 🔗 Get The Complete Guide

**Use this as your foundation to build production AI apps today.**

👉 **[Get the complete developer guide](./FULL_GUIDE.md)** – Deep architecture details, advanced patterns, and deployment strategies.

---

**✨ Launch your AI app in hours, not weeks.**

This chat-first template is your shortcut to building real GPT-powered products—whether that's a tutor, assistant, coach, or something entirely new.