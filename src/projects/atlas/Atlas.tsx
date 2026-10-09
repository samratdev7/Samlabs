import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from 'react'
import './atlas.css'

type LocationKind = 'country' | 'city'

type AtlasLocation = {
  id: string
  name: string
  country: string
  kind: LocationKind
  flag: string
  x: number
  y: number
  searchTerms: readonly string[]
  capital: string
  population: string
  languages: string
  currency: string
  geography: string
  culture: string
  cities: string
  landmarks: string
  history: string
  fact: string
}

const locations: readonly AtlasLocation[] = [
  {
    id: 'india',
    name: 'India',
    country: 'Republic of India',
    kind: 'country',
    flag: '🇮🇳',
    x: 68,
    y: 53,
    searchTerms: ['india', 'new delhi', 'bharat', 'mumbai', 'delhi'],
    capital: 'New Delhi',
    population: '1.46 billion',
    languages: 'Hindi, English + 20+ scheduled languages',
    currency: 'Indian rupee (INR)',
    geography: 'A vast South Asian country spanning the Himalayas, the Indo-Gangetic Plain, the Thar Desert, and a long Indian Ocean coastline.',
    culture: 'Many regional identities meet through cinema, classical and folk arts, festivals, layered cuisine, and living craft traditions.',
    cities: 'Mumbai · Bengaluru · Kolkata · Chennai · Jaipur',
    landmarks: 'Taj Mahal · Jaipur’s Amber Fort · Kerala backwaters · Hampi',
    history: 'One of the world’s oldest continuous civilizational regions, with influential ancient kingdoms and a modern republic founded in 1947.',
    fact: 'India has a national network of more than 40 UNESCO World Heritage sites.',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    kind: 'city',
    flag: '🇯🇵',
    x: 80,
    y: 42,
    searchTerms: ['tokyo', 'japan', 'edo', 'shibuya', 'shinjuku'],
    capital: 'Tokyo',
    population: '37.2 million metro',
    languages: 'Japanese',
    currency: 'Japanese yen (JPY)',
    geography: 'Tokyo sits on the Kanto Plain beside Tokyo Bay, with mountains to the west and a dense island geography extending beyond the city.',
    culture: 'A fast-moving mix of precision craft, contemporary design, food culture, animation, fashion, and deeply observed seasonal rituals.',
    cities: 'Shibuya · Shinjuku · Asakusa · Ginza · Odaiba',
    landmarks: 'Senso-ji · Tokyo Skytree · Meiji Shrine · Shibuya Crossing',
    history: 'Known as Edo until 1868, the city grew from a shogunal seat into one of the world’s great urban centres.',
    fact: 'Tokyo’s rail system moves millions of riders each day with famously exact timing.',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    kind: 'city',
    flag: '🇫🇷',
    x: 49,
    y: 37,
    searchTerms: ['paris', 'france', 'ile-de-france', 'eiffel tower'],
    capital: 'Paris',
    population: '11.3 million metro',
    languages: 'French',
    currency: 'Euro (EUR)',
    geography: 'The city follows a wide bend in the Seine, with compact historic neighbourhoods arranged around its river and grand boulevards.',
    culture: 'Museums, fashion, café culture, cinema, literary life, and a living tradition of public space make Paris a global reference point.',
    cities: 'Montmartre · Le Marais · Saint-Germain · Belleville',
    landmarks: 'Eiffel Tower · Louvre · Notre-Dame · Sacré-Cœur',
    history: 'From the Roman town of Lutetia to a centre of Enlightenment thought, Paris has repeatedly shaped European art and politics.',
    fact: 'The city’s street-name plaques use a colour system that helps distinguish its 20 arrondissements.',
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    kind: 'city',
    flag: '🇺🇸',
    x: 27,
    y: 43,
    searchTerms: ['new york', 'nyc', 'united states', 'manhattan', 'usa'],
    capital: 'Washington, D.C.',
    population: '20.1 million metro',
    languages: 'English, Spanish, Chinese and hundreds more',
    currency: 'US dollar (USD)',
    geography: 'A harbour city spread across islands and mainland districts where the Hudson River meets the Atlantic Ocean.',
    culture: 'A dense global crossroads for music, publishing, theatre, food, finance, art, and public life in every language.',
    cities: 'Manhattan · Brooklyn · Queens · Bronx · Staten Island',
    landmarks: 'Statue of Liberty · Central Park · Brooklyn Bridge · MoMA',
    history: 'Lenape homeland, Dutch New Amsterdam, and then a major Atlantic port: its history is inseparable from migration.',
    fact: 'New York’s subway runs 24 hours a day, linking hundreds of stations.',
  },
  {
    id: 'brazil',
    name: 'Brazil',
    country: 'Federative Republic of Brazil',
    kind: 'country',
    flag: '🇧🇷',
    x: 36,
    y: 66,
    searchTerms: ['brazil', 'brasil', 'rio de janeiro', 'sao paulo', 'amazon'],
    capital: 'Brasília',
    population: '212 million',
    languages: 'Portuguese',
    currency: 'Brazilian real (BRL)',
    geography: 'The largest country in South America, home to much of the Amazon basin, the Brazilian Highlands, and an immense Atlantic coast.',
    culture: 'Music, dance, football, Afro-Brazilian traditions, Indigenous knowledge, and regional food cultures create a rich, plural identity.',
    cities: 'São Paulo · Rio de Janeiro · Salvador · Manaus · Recife',
    landmarks: 'Christ the Redeemer · Iguaçu Falls · Amazon rainforest · Pelourinho',
    history: 'Indigenous societies, Portuguese colonisation, independence in 1822, and a vast modern democracy all shape Brazil’s story.',
    fact: 'Brazil is the only Portuguese-speaking country in the Americas.',
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    kind: 'city',
    flag: '🇪🇬',
    x: 55,
    y: 50,
    searchTerms: ['cairo', 'egypt', 'giza', 'nile', 'pyramids'],
    capital: 'Cairo',
    population: '22.6 million metro',
    languages: 'Arabic',
    currency: 'Egyptian pound (EGP)',
    geography: 'Cairo stretches along the Nile at the edge of the Sahara, with the Giza plateau visible across the river valley.',
    culture: 'A powerful centre for Arabic music, cinema, literature, street food, scholarship, and the social rhythm of the Nile.',
    cities: 'Giza · Zamalek · Islamic Cairo · New Cairo',
    landmarks: 'Pyramids of Giza · Egyptian Museum · Khan el-Khalili · Citadel',
    history: 'Founded in the 10th century near far older settlements, Cairo became a decisive crossroads of African, Mediterranean, and Islamic worlds.',
    fact: 'The wider Cairo area sits beside one of the world’s most recognisable ancient landscapes.',
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    kind: 'city',
    flag: '🇰🇪',
    x: 57,
    y: 60,
    searchTerms: ['nairobi', 'kenya', 'east africa', 'maasai mara'],
    capital: 'Nairobi',
    population: '5.3 million metro',
    languages: 'Swahili, English, and many local languages',
    currency: 'Kenyan shilling (KES)',
    geography: 'A highland city near the equator, with a national park on its southern edge and the Rift Valley within reach.',
    culture: 'A leading East African centre for entrepreneurship, music, contemporary art, food, conservation, and civic energy.',
    cities: 'Westlands · Karen · Kibera · Kilimani · Nairobi National Park',
    landmarks: 'Nairobi National Park · Karura Forest · National Museum · Bomas',
    history: 'Developed as a railway depot in the late 19th century, Nairobi became Kenya’s capital at independence in 1963.',
    fact: 'It is one of the only capital cities with a national park inside its urban boundary.',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    kind: 'city',
    flag: '🇦🇺',
    x: 85,
    y: 76,
    searchTerms: ['sydney', 'australia', 'new south wales', 'opera house'],
    capital: 'Canberra',
    population: '5.5 million metro',
    languages: 'English, Arabic, Mandarin, Vietnamese and more',
    currency: 'Australian dollar (AUD)',
    geography: 'Built around a deeply indented natural harbour on Australia’s south-east coast, ringed by beaches and sandstone headlands.',
    culture: 'Harbour life, surf culture, Indigenous knowledge, food from a vast migrant population, and a world-class arts scene coexist here.',
    cities: 'The Rocks · Newtown · Bondi · Parramatta · Manly',
    landmarks: 'Sydney Opera House · Harbour Bridge · Bondi Beach · Taronga Zoo',
    history: 'On the lands of the Gadigal people, Sydney became a British colony in 1788 and grew into Australia’s largest city.',
    fact: 'The Sydney Opera House roof is made from more than a million glazed tiles.',
  },
  {
    id: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    kind: 'city',
    flag: '🇮🇸',
    x: 43,
    y: 28,
    searchTerms: ['reykjavik', 'reykjavík', 'iceland', 'nordic', 'aurora'],
    capital: 'Reykjavík',
    population: '245,000 metro',
    languages: 'Icelandic, English widely spoken',
    currency: 'Icelandic króna (ISK)',
    geography: 'A compact North Atlantic capital set among volcanic landscapes, geothermal springs, black-sand coasts, and wide northern skies.',
    culture: 'Literature, music, design, geothermal bathing, and a deep relationship with dramatic natural systems define the city’s outlook.',
    cities: 'Miðborg · Laugardalur · Vesturbær · Hafnarfjörður',
    landmarks: 'Hallgrímskirkja · Harpa · Blue Lagoon · Golden Circle',
    history: 'Settled in the late 9th century, Reykjavík became the seat of Icelandic government and a hub of North Atlantic culture.',
    fact: 'Much of Iceland’s electricity and home heating comes from renewable geothermal and hydropower sources.',
  },
]

const viewOptions = [
  { id: 'explore', label: 'Explore' },
  { id: 'countries', label: 'Countries' },
  { id: 'cities', label: 'Cities' },
  { id: 'landmarks', label: 'Landmarks' },
  { id: 'culture', label: 'Culture' },
  { id: 'data', label: 'Data' },
] as const

type ViewOption = (typeof viewOptions)[number]['id']

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length
}

export function Atlas() {
  const [selectedId, setSelectedId] = useState('india')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchMessage, setSearchMessage] = useState('India is selected. Search a country or city to begin exploring.')
  const [activeView, setActiveView] = useState<ViewOption>('explore')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const mapViewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; x: number; y: number; panX: number; panY: number } | null>(null)

  const selected = locations.find((location) => location.id === selectedId) ?? locations[0]

  const visibleLocations = useMemo(() => {
    if (activeView === 'countries') return locations.filter((location) => location.kind === 'country')
    if (activeView === 'cities') return locations.filter((location) => location.kind === 'city')
    return locations
  }, [activeView])

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return locations
    return locations.filter((location) =>
      [location.name, location.country, ...location.searchTerms]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    )
  }, [query])

  const viewContext = {
    explore: 'All destinations',
    countries: 'Country profiles',
    cities: 'City profiles',
    landmarks: 'Landmark collection',
    culture: 'Culture collection',
    data: 'Data collection',
  }[activeView]

  const selectLocation = (location: AtlasLocation, message?: string) => {
    setSelectedId(location.id)
    setQuery('')
    setSearchOpen(false)
    setSearchMessage(message ?? `${location.name}, ${location.country} selected. Map centered on this location.`)

    const viewport = mapViewportRef.current?.getBoundingClientRect()
    const targetZoom = Math.max(zoom, 1.13)
    setZoom(targetZoom)
    if (viewport) {
      setPan({
        x: (0.5 - location.x / 100) * viewport.width * targetZoom,
        y: (0.5 - location.y / 100) * viewport.height * targetZoom,
      })
    }
  }

  const runSearch = () => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) {
      setSearchOpen(true)
      setSearchMessage('Type a country, capital, city, or landmark. Try India, Tokyo, Cairo, or Reykjavík.')
      return
    }

    const exactMatch = locations.find((location) =>
      [location.name, location.country, ...location.searchTerms]
        .some((term) => term.toLocaleLowerCase() === normalizedQuery),
    )
    const bestMatch = exactMatch ?? matches[0]
    if (bestMatch) {
      selectLocation(bestMatch, `Search found ${bestMatch.name}, ${bestMatch.country}.`)
      return
    }
    setSearchOpen(true)
    setSearchMessage(`No bundled destination matches “${query.trim()}”. Try India, Tokyo, Paris, Cairo, Nairobi, Sydney, or Brazil.`)
  }

  const resetMap = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setSearchMessage('Map reset to the global view.')
  }

  const selectRandomLocation = () => {
    const currentIndex = locations.findIndex((location) => location.id === selected.id)
    const offset = 1 + Math.floor(Math.random() * (locations.length - 1))
    const next = locations[(currentIndex + offset) % locations.length]
    selectLocation(next, `A new coordinate has been selected: ${next.name}, ${next.country}.`)
  }

  const onMapWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setZoom((current) => clamp(current + (event.deltaY < 0 ? 0.12 : -0.12), 1, 2.2))
  }

  const onMapPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
  }

  const onMapPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    setPan({
      x: clamp(drag.panX + event.clientX - drag.x, -420, 420),
      y: clamp(drag.panY + event.clientY - drag.y, -250, 250),
    })
  }

  const onMapPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null
      event.currentTarget.releasePointerCapture?.(event.pointerId)
    }
  }

  const onMapKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      setZoom((current) => clamp(current + 0.16, 1, 2.2))
      setSearchMessage('Map zoomed in.')
    }
    if (event.key === '-') {
      event.preventDefault()
      setZoom((current) => clamp(current - 0.16, 1, 2.2))
      setSearchMessage('Map zoomed out.')
    }
    if (event.key.toLocaleLowerCase() === 'r' || event.key === '0') {
      event.preventDefault()
      resetMap()
    }
  }

  const applyView = (view: ViewOption) => {
    setActiveView(view)
    const matchingSelection =
      (view === 'countries' && selected.kind !== 'country') || (view === 'cities' && selected.kind !== 'city')
        ? (view === 'countries' ? locations.find((location) => location.kind === 'country') : locations.find((location) => location.kind === 'city'))
        : undefined
    if (matchingSelection) selectLocation(matchingSelection, `${view === 'countries' ? 'Country' : 'City'} collection opened. ${matchingSelection.name} selected.`)
    else setSearchMessage(`${viewContextLabel(view)} opened. Select a pin or search to update the profile.`)
  }

  return (
    <section className="atlas" aria-labelledby="atlas-title">
      <div className="atlas-shell">
        <header className="atlas-header">
          <div>
            <p className="atlas-kicker"><span aria-hidden="true" /> SAMLAB / DIGITAL WORLD 11</p>
            <h1 id="atlas-title">ATLAS<span>.</span></h1>
            <p className="atlas-intro">Explore the world through coordinates, context, and the details that make a place feel alive.</p>
          </div>
          <div className="atlas-header-meta" aria-label="Atlas status">
            <span className="atlas-live"><i aria-hidden="true" /> LIVE EXPLORER</span>
            <span>09 BUNDLED COORDINATES</span>
          </div>
        </header>

        <nav className="atlas-view-nav" aria-label="Atlas collections">
          {viewOptions.map((view) => (
            <button
              key={view.id}
              type="button"
              className={activeView === view.id ? 'is-active' : ''}
              aria-pressed={activeView === view.id}
              onClick={() => applyView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </nav>

        <div className="atlas-search-row">
          <div className="atlas-search">
            <label className="sr-only" htmlFor="atlas-search">Search a country, capital, city, or landmark</label>
            <span aria-hidden="true" className="atlas-search-icon">⌕</span>
            <input
              id="atlas-search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') runSearch()
                if (event.key === 'Escape') setSearchOpen(false)
              }}
              placeholder="Search India, Tokyo, Cairo…"
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={searchOpen}
              aria-controls="atlas-search-results"
            />
            <button type="button" onClick={runSearch}>SEARCH <span aria-hidden="true">↗</span></button>
            {searchOpen && (
              <div id="atlas-search-results" className="atlas-search-results" role="listbox" aria-label="Matching locations">
                {matches.length > 0 ? matches.slice(0, 6).map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    role="option"
                    aria-selected={location.id === selected.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectLocation(location, `Search suggestion selected: ${location.name}, ${location.country}.`)}
                  >
                    <span>{location.flag}</span>
                    <span><b>{location.name}</b><small>{location.kind === 'country' ? location.country : location.country}</small></span>
                    <em>{location.kind}</em>
                  </button>
                )) : <p>No matching location in this Atlas build.</p>}
              </div>
            )}
          </div>
          <div className="atlas-search-hint"><span>Try:</span> <button type="button" onClick={() => selectLocation(locations[0])}>India</button> <button type="button" onClick={() => selectLocation(locations[1])}>Tokyo</button></div>
        </div>

        <p className="sr-only" aria-live="polite">{searchMessage}</p>

        <div className="atlas-workbench">
          <div className="atlas-map-panel">
            <div className="atlas-map-topline">
              <span className="atlas-coordinate-label"><i aria-hidden="true" /> {viewContext.toUpperCase()}</span>
              <span>DRAG TO PAN · SCROLL TO ZOOM</span>
            </div>
            <div
              ref={mapViewportRef}
              className="atlas-map-viewport"
              role="region"
              aria-label="Interactive visual world map. Select a destination pin. Use plus, minus, reset, or keyboard plus, minus, and R controls to change the map view."
              tabIndex={0}
              onWheel={onMapWheel}
              onPointerDown={onMapPointerDown}
              onPointerMove={onMapPointerMove}
              onPointerUp={onMapPointerUp}
              onPointerCancel={onMapPointerUp}
              onKeyDown={onMapKeyDown}
            >
              <div
                className="atlas-map-canvas"
                style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
              >
                <svg className="atlas-world-shape" viewBox="0 0 1000 520" preserveAspectRatio="none" focusable="false" aria-hidden="true">
                  <defs>
                    <linearGradient id="atlas-land" x1="0" x2="1" y1="0" y2="1">
                      <stop stopColor="rgba(112, 235, 255, .26)" />
                      <stop offset="1" stopColor="rgba(45, 85, 126, .28)" />
                    </linearGradient>
                    <radialGradient id="atlas-ocean" cx="48%" cy="42%" r="75%">
                      <stop stopColor="rgba(71, 141, 184, .26)" />
                      <stop offset="1" stopColor="rgba(8, 17, 28, .05)" />
                    </radialGradient>
                    <filter id="atlas-glow"><feGaussianBlur stdDeviation="2.5" /></filter>
                  </defs>
                  <rect width="1000" height="520" fill="url(#atlas-ocean)" />
                  <g className="atlas-longitude" opacity=".75">
                    <ellipse cx="500" cy="260" rx="420" ry="167" /><ellipse cx="500" cy="260" rx="320" ry="167" /><ellipse cx="500" cy="260" rx="220" ry="167" />
                    <path d="M80 260h840M103 193h794M145 133h710M145 387h710M103 327h794" />
                  </g>
                  <g className="atlas-continent" fill="url(#atlas-land)">
                    <path d="M116 119 161 89 223 91 267 117 284 151 260 173 246 206 220 213 205 244 168 237 158 214 130 203 117 175 91 157Z" />
                    <path d="M253 249 277 260 294 299 318 331 322 375 304 419 276 432 258 398 250 356 231 328 237 280Z" />
                    <path d="M443 125 474 100 511 111 525 139 509 159 489 151 470 168 453 157Z" />
                    <path d="M490 175 535 169 570 190 580 227 565 257 556 291 529 311 503 286 495 249 475 222Z" />
                    <path d="M526 129 574 102 648 108 697 129 765 133 823 166 845 198 827 231 788 225 752 247 711 230 684 248 658 220 628 234 608 214 580 224 562 196 577 166Z" />
                    <path d="M793 312 828 301 861 324 874 357 848 389 812 382 789 352Z" />
                    <path d="M415 80 438 60 459 69 458 97 438 111Z" />
                    <path d="M166 440 305 457 392 447 493 463 560 451 648 468 733 448 830 463 852 486 135 486Z" opacity=".54" />
                  </g>
                  <g className="atlas-continent-detail">
                    <path d="M159 126 199 116 246 143M154 194 202 205 231 179M271 275 290 320 277 390M470 128 495 139M508 195 549 206 533 272M580 154 627 168 679 151 723 175M686 193 716 216 773 190M808 331 844 352" />
                  </g>
                  <g className="atlas-map-stars" filter="url(#atlas-glow)">
                    <circle cx="120" cy="83" r="1.7" /><circle cx="389" cy="72" r="1.4" /><circle cx="875" cy="111" r="1.5" /><circle cx="905" cy="319" r="1.8" /><circle cx="86" cy="363" r="1.3" /><circle cx="380" cy="416" r="1.5" /><circle cx="669" cy="404" r="1.4" />
                  </g>
                </svg>
                {visibleLocations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    className={`atlas-pin ${location.id === selected.id ? 'is-selected' : ''}`}
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                    aria-label={`Select ${location.name}, ${location.country}`}
                    aria-pressed={location.id === selected.id}
                    onClick={() => selectLocation(location)}
                  >
                    <span className="atlas-pin-core" />
                    <span className="atlas-pin-label">{location.name}</span>
                  </button>
                ))}
              </div>

              <div className="atlas-map-controls" aria-label="Map controls">
                <button type="button" aria-label="Zoom in" onClick={() => setZoom((current) => clamp(current + 0.2, 1, 2.2))}>+</button>
                <button type="button" aria-label="Zoom out" onClick={() => setZoom((current) => clamp(current - 0.2, 1, 2.2))}>−</button>
                <button type="button" className="atlas-reset" onClick={resetMap}>RESET</button>
              </div>
              <label className="atlas-zoom-range">
                <span>ZOOM</span>
                <input
                  type="range"
                  min="1"
                  max="2.2"
                  step="0.05"
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  aria-label="Map zoom"
                />
                <output>{Math.round(zoom * 100)}%</output>
              </label>
              <span className="atlas-north" aria-hidden="true">N <i>↑</i></span>
            </div>
            <div className="atlas-map-footer">
              <span><i className="atlas-dot country" aria-hidden="true" /> COUNTRY</span>
              <span><i className="atlas-dot city" aria-hidden="true" /> CITY</span>
              <button type="button" onClick={selectRandomLocation}>RANDOM DESTINATION <span aria-hidden="true">↗</span></button>
            </div>
          </div>

          <aside className="atlas-inspector" aria-live="polite">
            <div className="atlas-inspector-topline">
              <span>{selected.kind === 'country' ? 'COUNTRY PROFILE' : 'CITY PROFILE'}</span>
              <span>COORD. {Math.round(selected.y * 0.9)}° / {Math.round(selected.x * 1.8)}°</span>
            </div>
            <div className="atlas-place-heading">
              <span className="atlas-flag" aria-hidden="true">{selected.flag}</span>
              <div>
                <p>{selected.country}</p>
                <h2>{selected.name}</h2>
              </div>
            </div>
            <p className="atlas-profile-focus">{activeView === 'landmarks' ? `Landmark lens: ${selected.landmarks}` : activeView === 'culture' ? `Culture lens: ${selected.culture}` : activeView === 'data' ? `Data lens: ${selected.population} · ${selected.currency}` : `${selected.kind === 'country' ? 'Country' : 'City'} coordinate selected`}</p>

            <dl className="atlas-core-data">
              <div><dt>CAPITAL</dt><dd>{selected.capital}</dd></div>
              <div><dt>POPULATION</dt><dd>{selected.population}</dd></div>
              <div><dt>LANGUAGES</dt><dd>{selected.languages}</dd></div>
              <div><dt>CURRENCY</dt><dd>{selected.currency}</dd></div>
            </dl>

            <div className="atlas-detail-list">
              <section>
                <p>01 / GEOGRAPHY</p>
                <h3>Made by its landscape.</h3>
                <span>{selected.geography}</span>
              </section>
              <section>
                <p>02 / CULTURE</p>
                <h3>How the place moves.</h3>
                <span>{selected.culture}</span>
              </section>
              <section className="atlas-inline-detail">
                <p>03 / CITIES &amp; AREAS</p>
                <span>{selected.cities}</span>
              </section>
              <section className="atlas-inline-detail">
                <p>04 / LANDMARKS</p>
                <span>{selected.landmarks}</span>
              </section>
              <section>
                <p>05 / HISTORY</p>
                <span>{selected.history}</span>
              </section>
              <section className="atlas-fact">
                <p>FIELD NOTE</p>
                <strong>{selected.fact}</strong>
              </section>
            </div>
          </aside>
        </div>

        <section className="atlas-discovery-strip" aria-label="Atlas global discovery statistics">
          <div><span>CURATED LOCATIONS</span><strong>{String(locations.length).padStart(2, '0')}</strong></div>
          <div><span>COUNTRY PROFILES</span><strong>{String(locations.filter((location) => location.kind === 'country').length).padStart(2, '0')}</strong></div>
          <div><span>CITY PROFILES</span><strong>{String(locations.filter((location) => location.kind === 'city').length).padStart(2, '0')}</strong></div>
          <div><span>WORDS OF CONTEXT</span><strong>{String(locations.reduce((total, location) => total + countWords(location.geography) + countWords(location.culture) + countWords(location.history), 0)).padStart(3, '0')}</strong></div>
        </section>
      </div>
    </section>
  )
}

function viewContextLabel(view: ViewOption) {
  return {
    explore: 'Explore collection',
    countries: 'Country collection',
    cities: 'City collection',
    landmarks: 'Landmark collection',
    culture: 'Culture collection',
    data: 'Data collection',
  }[view]
}

export default Atlas
