# Nicolette Tandradinata - Portfolio Website

A modern, responsive portfolio website showcasing the work and background of Nicolette Tandradinata, a Psychology and Advertising/Public Relations major at UNC Chapel Hill.

**🌐 Live Portfolio**: [View Portfolio](https://nicolette88888888-art.github.io/Nicolette-Portfolio/) (or your deployed URL)

**👨‍💻 Built with**: This portfolio was created with the assistance of [Cursor](https://cursor.sh/) AI coding assistant (Auto) - an AI-powered development tool that helps bring creative visions to life through code.

## 🚀 Features

- **Modern Design**: Beautiful gradient-based UI with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Navigation**: Fixed navigation bar with smooth scrolling between sections
- **Interactive Elements**: Hover effects and animations throughout the site
- **Social Media Integration**: Direct links to Instagram, TikTok, LinkedIn, and email
- **Portfolio Sections**:
  - Hero section with introduction
  - About Me section with detailed background
  - Projects showcase
  - Gallery section
  - Contact section with social links

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **Language**: TypeScript - Type-safe JavaScript
- **Styling**: CSS-in-JS with inline styles and styled-jsx
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicolette88888888-art/Nicolette-Portfolio.git
   cd Nicolette-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the site.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run start` - Start the production server (after building)
- `npm run lint` - Run ESLint to check code quality
- `npm run prepare` - Install Husky git hooks (runs automatically after npm install)
- `npm run commitlint` - Validate commit messages

## 📁 Project Structure

```
Nicolette-Portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page component
├── public/                   # Static assets (images, etc.)
├── .gitignore                # Git ignore rules
├── .gitmessage               # Git commit message template
├── commitlint.config.js      # Commitlint configuration
├── CONVENTIONAL_COMMITS.md   # Commit convention guide
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Customization

### Updating Content

Edit the content in `app/page.tsx` to update:
- Personal information
- About me sections
- Projects
- Social media links
- Contact information

### Styling

The site uses inline styles with React. To modify colors, fonts, or layouts:
- Update gradient colors in the style objects
- Modify spacing and sizing values
- Adjust animation timings in the `fadeInUp` keyframes

### Adding Images

1. Place images in the `public/` directory
2. Update the gallery section in `app/page.tsx` to reference your images
3. Use Next.js Image component for optimized images

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). All commit messages should follow this format:

```
<type>: <subject>

<body>

<footer>
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI configuration changes
- `build`: Build system or dependency changes
- `revert`: Reverting a previous commit

### Examples:
```bash
feat: add new project section
fix: resolve mobile navigation issue
chore: update dependencies
docs: update README with deployment instructions
```

See [CONVENTIONAL_COMMITS.md](./CONVENTIONAL_COMMITS.md) for more details.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- **Netlify**: Connect your GitHub repo and deploy
- **AWS Amplify**: Connect repository and deploy
- **Self-hosted**: Build with `npm run build` and serve with `npm run start`

## 📧 Contact

- **Email**: natandradinata@gmail.com
- **Instagram**: [@nicolette_tan_nat](https://www.instagram.com/nicolette_tan_nat/)
- **TikTok**: [@nicolette.tan](https://www.tiktok.com/@nicolette.tan)
- **LinkedIn**: [Nicolette Tandradinata](https://www.linkedin.com/in/nicolette-tandradinata-socialmedia/)

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with modern CSS and React
- Created with assistance from [Cursor](https://cursor.sh/) AI coding assistant (Auto)
- Deployed with love and attention to detail

---

© 2025 Nicolette Tandradinata. All rights reserved.

