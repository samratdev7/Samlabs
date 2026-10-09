# SAMLAB

**A Laboratory of Digital Ideas.**

SAMLAB is a digital laboratory for interactive experiences, useful tools, and larger web worlds. The interface is intentionally dark, editorial, and discovery-led: visitors browse a catalog of ideas, open experiment files, and move between projects as if exploring a living archive.

## What is in the lab?

The catalog currently contains 15 registered experiments across three categories:

### Interactive

- **Time Machine** - An interactive history of technology and the internet from 1990 to 2050.
- **Digital Universe** - A navigable cosmos of project planets.
- **Portfolio Quest** - A lightweight game-like tour of the lab.
- **Infinite Room** - A room of interactive objects that open different ideas.
- **Web Through Time** - A cinematic, era-by-era history of the web.

### Tools

- **Headline Lab** - Generate focused headline variations from a story.
- **Caption Studio** - Create captions for news, professional, social, descriptive, and alt-text contexts.
- **Text Transformer** - Reshape writing through summaries, rewrites, translations, and other transformations.
- **Converter Lab** - Convert length, weight, temperature, time, and data values.
- **Color Lab** - Build palettes and expose CSS, HEX, RGB, and HSL values.

### Digital Worlds

- **Atlas** - Explore countries and cities through an interactive world map.
- **Data Pulse** - Understand global stories through charts, maps, rankings, and timelines.
- **Nexa** - A fictional global AI company experience.
- **Pixel Market** - A complete fictional commerce experience.
- **World 360** - Discover places, culture, people, data, and unexpected stories.

Each project has a status: `LIVE`, `EXPERIMENTAL`, `IN DEVELOPMENT`, or `COMING SOON`. The registry is designed so an experiment can become live without changing the catalog, home page, or navigation code.

## Current features

- Responsive shell for desktop and mobile layouts.
- Intro loading sequence with session-based dismissal.
- Shared navigation, footer, custom desktop cursor, and accessible mobile menu.
- Home page with featured experiments and discovery-oriented presentation.
- Lab catalog with category filtering and text search.
- Reusable experiment brief pages driven by the project registry.
- Dedicated project implementations for Time Machine, Headline Lab, and Atlas.
- Discovery tracking for opened experiment files using browser local storage.
- Hash-based routing with meaningful URLs for visible cards and calls to action.
- Focus management, skip link, semantic landmarks, and reduced-motion support.
- Text-based status labels that do not rely on color alone.

## Routes

SAMLAB uses hash routing so it can be hosted as a static site without a server-side router.

| Route | Purpose |
| --- | --- |
| `#/` | Laboratory entrance and home page |
| `#/lab` | Full experiment catalog |
| `#/lab?category=interactive` | Interactive experiments |
| `#/lab?category=tools` | Tools |
| `#/lab?category=worlds` | Digital Worlds |
| `#/lab/:slug` | Experiment brief for a registered project |
| `#/about` | About the lab |

Example project URLs include `#/lab/time-machine`, `#/lab/headline-lab`, and `#/lab/atlas`.

## Technology

- React 19
- TypeScript 7
- Vite 8
- React DOM
- CSS modules and shared global styles
- Browser `sessionStorage` for the intro state
- Browser `localStorage` for discovery tracking

There is currently no backend, database, authentication layer, or external API requirement. The application can run as a static client-side site.

## Getting started

### Requirements

- Node.js with npm
- A modern browser with JavaScript enabled

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite prints the local URL in the terminal, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

The build command runs TypeScript validation before creating the Vite production bundle.

### Preview the production build

```bash
npm run preview
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally |

## Project structure

```text
src/
├── assets/             Static assets and visual resources
├── components/         Shared interface components
├── data/
│   ├── projects.ts     Typed experiment registry
│   └── site.ts         Categories, statuses, and navigation metadata
├── pages/              Route-level views
├── projects/           Independently built experiment modules
│   ├── atlas/
│   ├── headline-lab/
│   └── time-machine/
├── styles/             Global styles and animation rules
├── types/              Shared TypeScript models
└── utils/
	├── routes.ts       Hash-route parsing
	└── storage.ts      Local discovery persistence
```

## Adding an experiment

1. Add an `Experiment` entry to `src/data/projects.ts`.
2. Choose one of the existing categories and statuses.
3. Add the project name, slug, description, focus points, and accent color.
4. Mark the project as `featured` only when it should appear in the featured home-page set.
5. Add a dedicated implementation under `src/projects/<slug>/` when the experiment is ready.
6. Connect the slug in the page or route logic if it needs custom rendering rather than the reusable brief page.
7. Run `npm run build` to verify TypeScript and the production bundle.

The catalog is intentionally data-driven. Keep presentation and routing generic whenever an experiment can use the shared brief page; reserve custom components for experiences with their own interaction model.

## Accessibility and interaction notes

The shell includes a skip link, keyboard-focus styles, semantic page landmarks, accessible navigation controls, and a mobile menu. Motion is reduced when the user enables `prefers-reduced-motion`. Project status is also represented as text, so status information is not communicated by color alone.

The intro state is stored in `sessionStorage`, so it can appear again in a new browser session. Opened project IDs are stored in `localStorage` and displayed as the discovery count in navigation. Both storage operations fail gracefully when browser storage is unavailable.

## Roadmap

- Complete the remaining planned interactive experiences.
- Promote projects from `COMING SOON` or `IN DEVELOPMENT` as implementations land.
- Continue expanding the independent modules under `src/projects/`.
- Add focused automated checks as project interactions become more complex.
