# DeepSeek Clone

A modern AI chat application that replicates the DeepSeek interface and functionality. Built with Next.js 15, this application provides a seamless chat experience with AI-powered conversations using the DeepSeek API.

## Features

- **AI-Powered Chat**: Integration with DeepSeek API for intelligent conversations
- **User Authentication**: Secure authentication using Clerk
- **Chat Management**: Create, rename, and delete chat sessions
- **Responsive Design**: Mobile-first design with collapsible sidebar
- **Real-time Updates**: Live chat updates with smooth scrolling
- **Message History**: Persistent chat history stored in MongoDB
- **Syntax Highlighting**: Code syntax highlighting with Prism.js
- **Modern UI**: Clean, dark-themed interface similar to DeepSeek

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: Clerk
- **AI Integration**: OpenAI SDK with DeepSeek API
- **Styling**: TailwindCSS, Custom CSS
- **Code Highlighting**: Prism.js
- **Notifications**: React Hot Toast
- **Markdown**: React Markdown

## Project Structure

```
deepseek-clone/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   ├── ai/          # AI chat completion endpoint
│   │   │   ├── create/      # Create new chat
│   │   │   ├── delete/      # Delete chat
│   │   │   ├── get/         # Fetch user chats
│   │   │   └── rename/      # Rename chat
│   │   └── clerk/           # Clerk webhook
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout
│   ├── page.jsx            # Main chat interface
│   └── prism.css           # Syntax highlighting styles
├── components/
│   ├── ChatLabel.jsx       # Individual chat item
│   ├── ErrorBoundary.jsx   # Error handling
│   ├── Message.jsx         # Chat message component
│   ├── PromptBox.jsx       # Message input component
│   └── Sidebar.jsx         # Navigation sidebar
├── context/
│   └── AppContext.jsx      # Global state management
├── models/
│   ├── Chat.js            # Chat MongoDB schema
│   └── User.js            # User MongoDB schema
├── config/
│   └── db.js              # Database connection
├── assets/                # SVG icons and images
└── middleware.ts          # Clerk middleware
```

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database
- DeepSeek API key
- Clerk account for authentication

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd deepseek-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   CLERK_WEBHOOK_SECRET=your_webhook_secret

   # DeepSeek API
   DEEPSEEK_API_KEY=your_deepseek_api_key
   DEEPSEEK_API_BASE_URL=https://api.deepseek.com

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Chat Management
- `POST /api/chat/create` - Create a new chat session
- `GET /api/chat/get` - Fetch user's chat history
- `DELETE /api/chat/delete` - Delete a specific chat
- `PUT /api/chat/rename` - Rename a chat session

### AI Integration
- `POST /api/chat/ai` - Send message to DeepSeek AI and get response

### Authentication
- `POST /api/clerk` - Clerk webhook for user management

## Key Components

### AppContext
Manages global state including:
- User authentication status
- Chat sessions
- Selected chat
- Chat operations (create, fetch, select)

### Sidebar
- Collapsible navigation
- Chat history
- User profile management
- New chat creation
- Mobile-responsive design

### Message Component
- Renders user and AI messages
- Markdown support
- Code syntax highlighting
- Copy functionality

### PromptBox
- Message input interface
- Send functionality
- Loading states
- Auto-resize textarea

## Database Schema

### Chat Model
```javascript
{
  name: String,           // Chat title
  messages: [{
    role: String,         // 'user' or 'assistant'
    content: String,      // Message content
    timestamp: Number     // Message timestamp
  }],
  userId: String,         // Clerk user ID
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook secret | Yes |
| `DEEPSEEK_API_KEY` | DeepSeek API key | Yes |
| `DEEPSEEK_API_BASE_URL` | DeepSeek API base URL | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes. Please ensure you comply with DeepSeek's terms of service when using their API.

## Troubleshooting

### Common Issues

1. **Authentication errors**: Verify Clerk keys and webhook configuration
2. **Database connection**: Check MongoDB URI and network access
3. **API errors**: Ensure DeepSeek API key is valid and has sufficient credits
4. **Build errors**: Clear `.next` folder and reinstall dependencies

### Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Include error logs and environment details
