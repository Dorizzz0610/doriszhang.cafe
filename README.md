# Liyu Zhang's Personal Website

A beautiful, responsive personal website built with Next.js, React, and TailwindCSS.

## Features

- Responsive design that works on all devices
- Dynamic background with animated star particles
- Smooth transitions and animations
- Dark mode support
- Gallery page for showcasing photos
- Morandii color theme that changes based on the day of the week

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure

- `/src/app` - Application pages
- `/src/components` - Reusable React components
- `/public/images` - Image assets

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages. Follow these steps:

1. Push your code to the main branch of your GitHub repository
2. GitHub Actions will automatically build the project and deploy to the gh-pages branch
3. Enable GitHub Pages in your repository settings and select the gh-pages branch as the source

### Manual Deployment

You can also deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Make sure GitHub Pages is enabled in your repository settings and configured to deploy from the gh-pages branch.

## Flight Tracking Feature

The website includes a real-time flight tracking widget that displays global flight statistics. This feature uses the AviationStack API to fetch live flight data.

### Setting up Flight Tracking API

1. Sign up for a free API key at [AviationStack](https://aviationstack.com/signup/free)
2. Create a `.env.local` file in the root directory (if it doesn't exist)
3. Add your API key to the file:
   ```
   AVIATIONSTACK_API_KEY=your_api_key_here
   ```
4. Restart the development server if it's running

The free tier of AviationStack has a limit of 500 requests per month, which should be sufficient for development and personal use.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

<!-- 这是一个触发新构建的注释 - 确保GitHub Pages正确部署 -->
