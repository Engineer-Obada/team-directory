# Team Directory

A responsive Team Directory application built with **Next.js, React, TypeScript, Tailwind CSS, and TanStack Query** as part of a Frontend Developer Technical Assessment.

**Live Demo:** https://engineer-obada.github.io/team-directory/

## Features

- Display team members with their names, emails, and companies.
- Search users by name or email with a 300ms debounce.
- Select and deselect multiple users.
- Live selected-user counter and Clear Selection button.
- Persist selected users across page refreshes using localStorage.
- Sort users alphabetically (A–Z / Z–A).
- Responsive layout: 1 column on mobile, 2 on tablet, and 3 on desktop.
- Keyboard-accessible selection controls with visible focus indicators.
- Loading skeletons, error handling with Retry, and empty states.

## Tech Stack

- **Next.js 16** — React framework and static site generation.
- **React 19 + TypeScript** — Component-based UI development with type safety.
- **Tailwind CSS 4** — Responsive styling.
- **TanStack Query** — Data fetching, caching, and request-state management.
- **React Hooks** — State management and reusable logic.

## Getting Started

### Prerequisites

- Node.js 20.9+ (Node.js 22 recommended)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Engineer-Obada/team-directory.git
cd team-directory
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

### Production Build

```bash
npm run build
```

## Data Source

Users are fetched from the public JSONPlaceholder API:

https://jsonplaceholder.typicode.com/users

Search and sorting are performed client-side.

## Technical Decisions

### TanStack Query

Used for API requests, caching, loading/error handling, retries, and request cancellation.

### Client-Side Filtering

Since the dataset is small, users are fetched once and filtered locally. This avoids unnecessary network requests during searches.

### Custom Hooks

- `useDebounce`: Delays search filtering by 300ms.
- `useUserSelection`: Manages selected users and localStorage persistence.

### Component Architecture

The interface is divided into smaller, reusable components for improved readability, maintainability, and separation of concerns.

### Accessibility

Semantic HTML elements, native checkboxes, associated labels, and visible focus indicators support keyboard navigation. Selection is communicated through both visual styling and text.

### Deployment

The application uses Next.js Static Export and GitHub Actions for automatic deployment to GitHub Pages.

## What I Would Improve With More Time

- Add unit and integration tests using Vitest and React Testing Library.

## Code Review

Part 2 of the technical assessment is documented in [CODE_REVIEW.md](./CODE_REVIEW.md).