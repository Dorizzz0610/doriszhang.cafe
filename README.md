# Doris Personal Website

A modern, responsive personal website built with Next.js, React, and TailwindCSS.

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
