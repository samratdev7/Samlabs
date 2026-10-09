import type { Experiment, ExperimentCategory } from '../types/project'

/** Keeps the Lab filters in the same deliberate order as the SAMLAB blueprint. */
export const categoryOrder: readonly ExperimentCategory[] = [
  'interactive',
  'tools',
  'worlds',
]

/** The complete SAMLAB experiment registry. */
export const projects: Experiment[] = [
  {
    id: 1,
    slug: 'time-machine',
    name: 'TIME MACHINE',
    category: 'interactive',
    status: 'live',
    tagline: 'Choose an era. Watch the web transform.',
    description:
      'Explore the evolution of technology through an interactive timeline.',
    detail:
      'An interactive journey through the history of technology and the internet. Select a year from 1990 to 2050 and explore the technology, culture, computers, phones, websites, and visual language of that era.',
    focus: [
      '1990–2050 interactive timeline',
      'Era-specific interface transformations',
      'Technology, culture, and future predictions',
    ],
    accent: '#C6FF6B',
    featured: true,
  },
  {
    id: 2,
    slug: 'digital-universe',
    name: 'DIGITAL UNIVERSE',
    category: 'interactive',
    status: 'development',
    tagline: 'Navigate the SAMLAB cosmos.',
    description: 'Explore SAMLAB as a universe of project planets.',
    detail:
      'A 2D/3D universe that turns the SAMLAB portfolio into a field of explorable planets. Drag to move, scroll to zoom, and select worlds to reveal and open experiments.',
    focus: [
      'Drag-to-pan and scroll-to-zoom navigation',
      'Hoverable project planets',
      'Touch-friendly mobile exploration mode',
    ],
    accent: '#A88BFF',
  },
  {
    id: 3,
    slug: 'portfolio-quest',
    name: 'PORTFOLIO QUEST',
    category: 'interactive',
    status: 'soon',
    tagline: 'Discover the lab one achievement at a time.',
    description:
      'Find SAMLAB projects inside a lightweight portfolio mini-game.',
    detail:
      'A lightweight portfolio mini-game where an avatar explores the Lab, Tools, Digital Worlds, Project Archive, and a final discovery while tracking projects and achievements.',
    focus: [
      'Simple avatar-led exploration',
      'Discovery counter and achievement system',
      'Five connected SAMLAB areas',
    ],
    accent: '#FFB86B',
  },
  {
    id: 4,
    slug: 'infinite-room',
    name: 'INFINITE ROOM',
    category: 'interactive',
    status: 'soon',
    tagline: 'Every object opens another idea.',
    description: 'Step into a futuristic room full of digital doors.',
    detail:
      'A minimal futuristic room whose laptop, newspaper, camera, books, monitor, globe, and door become entry points to websites, journalism, visual work, knowledge, tools, global projects, and About.',
    focus: [
      'Interactive room objects',
      'Mouse-responsive ambient movement',
      'Hover, click, and scroll reactions',
    ],
    accent: '#66E5FF',
  },
  {
    id: 5,
    slug: 'web-through-time',
    name: 'WEB THROUGH TIME',
    category: 'interactive',
    status: 'soon',
    tagline: 'A cinematic history of the web.',
    description: 'Scroll through the web’s evolution, one era at a time.',
    detail:
      'A scrolling story of the web from its 1990 birth through Web 2.0, the mobile and design revolutions, AI transformation, and an imagined 2030—each chapter with its own design language.',
    focus: [
      'Cinematic era-by-era scroll story',
      'Changing visual systems by decade',
      'Subtle parallax and text reveals',
    ],
    accent: '#FF7AAC',
  },
  {
    id: 6,
    slug: 'headline-lab',
    name: 'HEADLINE LAB',
    category: 'tools',
    status: 'live',
    tagline: 'One story. Seven sharper angles.',
    description: 'Turn a story into focused headline variations.',
    detail:
      'Paste a story and generate newspaper, breaking-news, short, SEO, social-media, dramatic, and neutral headline variations in a focused two-column workspace.',
    focus: [
      'Seven headline styles',
      'Copy, regenerate, and shorten actions',
      'Side-by-side source and output layout',
    ],
    accent: '#FFE56B',
    featured: true,
  },
  {
    id: 7,
    slug: 'caption-studio',
    name: 'CAPTION STUDIO',
    category: 'tools',
    status: 'soon',
    tagline: 'Give every image the right words.',
    description: 'Create image captions for every context and style.',
    detail:
      'An image-caption workspace that guides users from upload to style selection to useful generated captions for newspaper, professional, social, short, descriptive, and alt-text contexts.',
    focus: [
      'Image preview workspace',
      'Six caption styles',
      'One-click copying for every result',
    ],
    accent: '#FF9470',
  },
  {
    id: 8,
    slug: 'text-transformer',
    name: 'TEXT TRANSFORMER',
    category: 'tools',
    status: 'development',
    tagline: 'Shape text for the moment it needs.',
    description: 'Transform writing into the format you need.',
    detail:
      'A modern writing utility that can summarize, rewrite, formalize, condense, turn copy into bullet points, write in news or social style, and translate text.',
    focus: [
      'Eight text transformations',
      'Live word and character counts',
      'Copy, clear, and export controls',
    ],
    accent: '#63E6BE',
  },
  {
    id: 9,
    slug: 'converter-lab',
    name: 'CONVERTER LAB',
    category: 'tools',
    status: 'soon',
    tagline: 'Convert the essentials, instantly.',
    description: 'Convert length, weight, temperature, time, and data.',
    detail:
      'A fast, focused all-in-one converter for length, weight, temperature, time, and data—from kilometres to miles, kilograms to pounds, Celsius to Kelvin, and bytes to terabytes.',
    focus: [
      'Length, weight, temperature, time, and data',
      'Instant bidirectional conversion',
      'Large, distraction-free numeric interface',
    ],
    accent: '#7CA6FF',
  },
  {
    id: 10,
    slug: 'color-lab',
    name: 'COLOR LAB',
    category: 'tools',
    status: 'soon',
    tagline: 'Turn one color into a complete system.',
    description: 'Build complete, usable palettes from a base color.',
    detail:
      'A design utility that derives complementary, analogous, triadic, shade, tint, and gradient palettes from a base color—then previews the system in a mock website and exposes CSS, HEX, RGB, and HSL values.',
    focus: [
      'Six palette relationships and treatments',
      'Mock website palette preview',
      'Copyable CSS, HEX, RGB, and HSL values',
    ],
    accent: '#E794FF',
  },
  {
    id: 11,
    slug: 'atlas',
    name: 'ATLAS',
    category: 'worlds',
    status: 'live',
    tagline: 'Explore the World.',
    description: 'Search countries and cities on an interactive world map.',
    detail:
      'An interactive global exploration platform centred on a beautiful world map. Search countries or cities, then uncover geography, culture, major cities, landmarks, history, and essential country data.',
    focus: [
      'Interactive globe and world-map exploration',
      'Country and city search',
      'Culture, data, landmarks, and historical context',
    ],
    accent: '#61DFFF',
    featured: true,
  },
  {
    id: 12,
    slug: 'data-pulse',
    name: 'DATA PULSE',
    category: 'worlds',
    status: 'development',
    tagline: 'The World, Explained Through Data.',
    description: 'Understand global stories through interactive data.',
    detail:
      'A global data-journalism platform for exploring world, population, economy, climate, education, health, and technology stories through charts, maps, rankings, comparisons, and timelines.',
    focus: [
      'Interactive charts, maps, rankings, and timelines',
      'World, population, economy, climate, education, health, and technology views',
      'Year-to-year comparisons from 2020 to 2030',
    ],
    accent: '#6FFFC2',
  },
  {
    id: 13,
    slug: 'nexa',
    name: 'NEXA',
    category: 'worlds',
    status: 'soon',
    tagline: 'Intelligence for the Next Generation.',
    description: 'Meet a fictional global AI company built for what is next.',
    detail:
      'A polished fictional global AI-company website with a “Build What’s Next.” hero, product storytelling for Nexa Core, Vision, Flow, and Analytics, plus demos, pricing, testimonials, and FAQ.',
    focus: [
      'Nexa Core, Vision, Flow, and Analytics',
      'Animated product demonstrations',
      'Pricing, testimonials, and FAQ',
    ],
    accent: '#A990FF',
  },
  {
    id: 14,
    slug: 'pixel-market',
    name: 'PIXEL MARKET',
    category: 'worlds',
    status: 'soon',
    tagline: 'Everything. Beautifully Designed.',
    description: 'Shop a complete fictional global commerce experience.',
    detail:
      'A full fictional e-commerce experience with search, filtering, sorting, product galleries, cart and wishlist flows, checkout, accounts, orders, and tracking across electronics, fashion, home, accessories, and gadgets.',
    focus: [
      'Search, filters, sorting, and product galleries',
      'Cart, wishlist, checkout, account, and orders',
      'Electronics, fashion, home, accessories, and gadgets',
    ],
    accent: '#FF8F70',
  },
  {
    id: 15,
    slug: 'world-360',
    name: 'WORLD 360',
    category: 'worlds',
    status: 'soon',
    tagline: 'See the World Differently.',
    description: 'Discover places, culture, people, data, and unexpected stories.',
    detail:
      'A global discovery platform combining places, people, culture, data, and stories. Explore an interactive map, trending places, hidden gems, statistics, and destination pages—or let Random Destination surprise you.',
    focus: [
      'Interactive world map and discovery feed',
      'Destination guides for culture, food, history, architecture, and more',
      'Random Destination exploration',
    ],
    accent: '#F8D76B',
  },
]
