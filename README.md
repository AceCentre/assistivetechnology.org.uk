# assistivetechnology.org.uk

A static website for Specialised Assistive Technology Services in England, providing information about Augmentative and Alternative Communication (AAC) and Environmental Control (EC) services commissioned by NHS England.

## Overview

This is a single-page Vue.js application that serves as an information hub for assistive technology services across England. The site features:

- **Service Finder**: Quick access to the Ace Centre Service Finder
- **Specialised AAC Services**: Resources and information about Augmentative and Alternative Communication services
- **Local AAC**: Resources for home learning and education
- **AAC Services Directory**: Complete listing of AAC services across England
- **EC Services Directory**: Complete listing of Environmental Control services across England

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite 5** - Build tool and development server
- **Plain CSS** - Custom styling with CSS variables
- **JSON** - Content stored in structured data files

## Project Structure

```
assistivetechnology.org.uk/
├── src/
│   ├── App.vue              # Main application component
│   ├── main.js              # Application entry point
│   ├── assets/
│   │   ├── main.css         # Global styles and design system
│   │   └── IMG_8548-scaled.jpg
│   └── data/                # Content data files (JSON)
│       ├── tabs.json        # Navigation tabs configuration
│       ├── resourceSections.json  # Resource sections and cards
│       ├── aacServices.json # AAC services directory
│       ├── ecServices.json # EC services directory
│       └── serviceHighlights.json
├── index.html               # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (for Vite 5)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd assistivetechnology.org.uk
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Content Management

All content is stored in JSON files within `src/data/`, making it easy to update without touching Vue code:

### Editing Tabs

Edit `src/data/tabs.json` to add, remove, or modify navigation tabs. Each tab can include:

- `id`: Unique identifier
- `label`: Display text
- `description`: Used for overview cards (optional)

### Editing Resource Sections

Edit `src/data/resourceSections.json` to modify resource sections. Each section can have:

- `id`: Unique identifier matching a tab
- `title`: Section heading
- `description`: Optional section description
- `cards`: Array of resource cards with title, description, image, and href

### Editing Service Directories

- `src/data/aacServices.json` - List of AAC service links
- `src/data/ecServices.json` - List of EC service links

Each service entry requires:

- `label`: Service name
- `href`: Service URL

## Features

### Accessibility

- Skip to main content link
- ARIA labels and roles for screen readers
- Keyboard navigation support for tabs
- Focus management
- Semantic HTML structure

### Design

- Responsive layout with mobile-first approach
- CSS custom properties for theming
- Alternating card colors (AAC orange / EC slate)
- Sticky tab navigation
- Hero section with NHS branding

### Navigation

- Hash-based routing (no router library needed)
- Tab navigation with keyboard support (Arrow keys, Home, End)
- URL hash updates for bookmarkable sections
- Primary navigation in hero section

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory that can be deployed to any static hosting service (e.g., Netlify, Vercel, GitHub Pages, or a traditional web server).

## Browser Support

Modern browsers that support:

- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)

## License

See [LICENSE](LICENSE) file for details.

## Contributing

Content updates should be made to the JSON files in `src/data/`. Code changes should follow the existing patterns and maintain accessibility standards.
