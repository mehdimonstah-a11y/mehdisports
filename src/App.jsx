import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, Menu, X, ChevronRight, ChevronLeft, ChevronDown,
  Star, Truck, Shield, RotateCcw, Plus, Minus, Check, ArrowRight, ArrowUpRight,
  Mail, MapPin, Phone, User, Filter,
  Trash2, ZoomIn, Tag, Award, Flame, Sparkles, Globe, CreditCard, Lock,
  MessageCircle,
} from 'lucide-react';

/* ============================================================================
   MEHDISPORTS — Premium Football Jersey Ecommerce
   Single-file React app with full SPA routing, cart, wishlist, checkout.
   Aesthetic: Editorial dark sportswear. Floodlight lime accent on deep black.
   ============================================================================ */

// ---------- DATA ------------------------------------------------------------
// Clubs include all 24 Champions League 25/26 league phase teams + major national teams
const CLUBS = [
  // ---- Champions League 25/26 — League Phase ----
  // La Liga
  { id: 'rma', name: 'Real Madrid', league: 'La Liga', country: 'Spain', color: '#FEBE10', inUCL: true },
  { id: 'bar', name: 'Barcelona', league: 'La Liga', country: 'Spain', color: '#A50044', inUCL: true },
  { id: 'atl', name: 'Atlético Madrid', league: 'La Liga', country: 'Spain', color: '#CB3524', inUCL: true },
  { id: 'ath', name: 'Athletic Bilbao', league: 'La Liga', country: 'Spain', color: '#EE2523', inUCL: true },
  { id: 'vil', name: 'Villarreal', league: 'La Liga', country: 'Spain', color: '#FFE667', inUCL: true },
  // Premier League
  { id: 'liv', name: 'Liverpool', league: 'Premier League', country: 'England', color: '#C8102E', inUCL: true },
  { id: 'ars', name: 'Arsenal', league: 'Premier League', country: 'England', color: '#EF0107', inUCL: true },
  { id: 'mci', name: 'Manchester City', league: 'Premier League', country: 'England', color: '#6CABDD', inUCL: true },
  { id: 'che', name: 'Chelsea', league: 'Premier League', country: 'England', color: '#034694', inUCL: true },
  { id: 'tot', name: 'Tottenham', league: 'Premier League', country: 'England', color: '#132257', inUCL: true },
  { id: 'new', name: 'Newcastle', league: 'Premier League', country: 'England', color: '#241F20', inUCL: true },
  // Serie A
  { id: 'nap', name: 'Napoli', league: 'Serie A', country: 'Italy', color: '#12A0D7', inUCL: true },
  { id: 'int', name: 'Inter Milan', league: 'Serie A', country: 'Italy', color: '#0068A8', inUCL: true },
  { id: 'juv', name: 'Juventus', league: 'Serie A', country: 'Italy', color: '#FFFFFF', inUCL: true },
  { id: 'ata', name: 'Atalanta', league: 'Serie A', country: 'Italy', color: '#1B5BA5', inUCL: true },
  // Bundesliga
  { id: 'bay', name: 'Bayern Munich', league: 'Bundesliga', country: 'Germany', color: '#DC052D', inUCL: true },
  { id: 'bvb', name: 'Borussia Dortmund', league: 'Bundesliga', country: 'Germany', color: '#FDE100', inUCL: true },
  { id: 'lev', name: 'Bayer Leverkusen', league: 'Bundesliga', country: 'Germany', color: '#E32219', inUCL: true },
  { id: 'fra-club', name: 'Eintracht Frankfurt', league: 'Bundesliga', country: 'Germany', color: '#E1000F', inUCL: true },
  // Ligue 1
  { id: 'psg', name: 'Paris Saint-Germain', league: 'Ligue 1', country: 'France', color: '#004170', inUCL: true },
  { id: 'mar', name: 'Olympique Marseille', league: 'Ligue 1', country: 'France', color: '#2FAEE0', inUCL: true },
  { id: 'mon', name: 'AS Monaco', league: 'Ligue 1', country: 'France', color: '#CE1126', inUCL: true },
  // Other
  { id: 'ben', name: 'Benfica', league: 'Primeira Liga', country: 'Portugal', color: '#A50C28', inUCL: true },
  { id: 'spo', name: 'Sporting CP', league: 'Primeira Liga', country: 'Portugal', color: '#016241', inUCL: true },
  { id: 'aja', name: 'Ajax', league: 'Eredivisie', country: 'Netherlands', color: '#D2122E', inUCL: true },
  { id: 'psv', name: 'PSV Eindhoven', league: 'Eredivisie', country: 'Netherlands', color: '#ED1C24', inUCL: true },

  // Popular clubs (not in UCL 25/26 league phase but high demand)
  { id: 'mil', name: 'AC Milan', league: 'Serie A', country: 'Italy', color: '#FB090B', inUCL: false },
  { id: 'mun', name: 'Manchester United', league: 'Premier League', country: 'England', color: '#DA291C', inUCL: false },
  { id: 'rom', name: 'AS Roma', league: 'Serie A', country: 'Italy', color: '#8E1B25', inUCL: false },
  { id: 'mia', name: 'Inter Miami', league: 'MLS', country: 'USA', color: '#F7B5CD', inUCL: false },
  { id: 'alh', name: 'Al-Nassr', league: 'Saudi Pro League', country: 'Saudi Arabia', color: '#FFCC00', inUCL: false },
  { id: 'alh2', name: 'Al-Hilal', league: 'Saudi Pro League', country: 'Saudi Arabia', color: '#0033A0', inUCL: false },

  // ---- International / National Teams ----
  { id: 'ars-nat', name: 'Argentina', league: 'International', country: 'Argentina', color: '#75AADB', inUCL: false },
  { id: 'bra', name: 'Brazil', league: 'International', country: 'Brazil', color: '#FFDF00', inUCL: false },
  { id: 'fra', name: 'France', league: 'International', country: 'France', color: '#002654', inUCL: false },
  { id: 'por', name: 'Portugal', league: 'International', country: 'Portugal', color: '#7A1F2B', inUCL: false },
  { id: 'eng', name: 'England', league: 'International', country: 'England', color: '#FFFFFF', inUCL: false },
  { id: 'ger', name: 'Germany', league: 'International', country: 'Germany', color: '#000000', inUCL: false },
  { id: 'spa', name: 'Spain', league: 'International', country: 'Spain', color: '#C60B1E', inUCL: false },
  { id: 'ita', name: 'Italy', league: 'International', country: 'Italy', color: '#1B5BA5', inUCL: false },
  { id: 'ned', name: 'Netherlands', league: 'International', country: 'Netherlands', color: '#FF7900', inUCL: false },
  { id: 'cro', name: 'Croatia', league: 'International', country: 'Croatia', color: '#FF0000', inUCL: false },
  { id: 'bel', name: 'Belgium', league: 'International', country: 'Belgium', color: '#E30613', inUCL: false },
  { id: 'mex', name: 'Mexico', league: 'International', country: 'Mexico', color: '#006847', inUCL: false },
  { id: 'usa', name: 'USA', league: 'International', country: 'USA', color: '#002868', inUCL: false },
  { id: 'mor', name: 'Morocco', league: 'International', country: 'Morocco', color: '#C1272D', inUCL: false },
  { id: 'sen', name: 'Senegal', league: 'International', country: 'Senegal', color: '#00853F', inUCL: false },
  { id: 'jpn', name: 'Japan', league: 'International', country: 'Japan', color: '#0E2B59', inUCL: false },
  { id: 'kor', name: 'South Korea', league: 'International', country: 'South Korea', color: '#CD2E3A', inUCL: false },
  { id: 'col', name: 'Colombia', league: 'International', country: 'Colombia', color: '#FCD116', inUCL: false },
  { id: 'uru', name: 'Uruguay', league: 'International', country: 'Uruguay', color: '#0038A8', inUCL: false },
  { id: 'nga', name: 'Nigeria', league: 'International', country: 'Nigeria', color: '#008751', inUCL: false },
  { id: 'civ', name: 'Ivory Coast', league: 'International', country: 'Ivory Coast', color: '#FF8200', inUCL: false },
  { id: 'gha', name: 'Ghana', league: 'International', country: 'Ghana', color: '#FCD116', inUCL: false },
  { id: 'egy', name: 'Egypt', league: 'International', country: 'Egypt', color: '#CE1126', inUCL: false },
  { id: 'alg', name: 'Algeria', league: 'International', country: 'Algeria', color: '#006633', inUCL: false },
  { id: 'tun', name: 'Tunisia', league: 'International', country: 'Tunisia', color: '#E70013', inUCL: false },
  { id: 'sau', name: 'Saudi Arabia', league: 'International', country: 'Saudi Arabia', color: '#006C35', inUCL: false },
  { id: 'qat', name: 'Qatar', league: 'International', country: 'Qatar', color: '#8A1538', inUCL: false },
  { id: 'irn', name: 'Iran', league: 'International', country: 'Iran', color: '#239F40', inUCL: false },
  { id: 'aus', name: 'Australia', league: 'International', country: 'Australia', color: '#FFCD00', inUCL: false },
  { id: 'can', name: 'Canada', league: 'International', country: 'Canada', color: '#D80027', inUCL: false },
];

const LEAGUES = [
  { id: 'premier-league', name: 'Premier League', region: 'England', count: 20 },
  { id: 'la-liga', name: 'La Liga', region: 'Spain', count: 18 },
  { id: 'serie-a', name: 'Serie A', region: 'Italy', count: 17 },
  { id: 'bundesliga', name: 'Bundesliga', region: 'Germany', count: 15 },
  { id: 'ligue-1', name: 'Ligue 1', region: 'France', count: 12 },
  { id: 'champions-league', name: 'UCL', region: 'Europe', count: 24 },
  { id: 'mls', name: 'MLS', region: 'USA', count: 14 },
  { id: 'saudi-pro', name: 'Saudi Pro', region: 'Saudi Arabia', count: 9 },
  { id: 'international', name: 'International', region: 'World', count: 32 },
];

const TYPES = ['Player Version', 'Fan Version', 'Retro', 'Training Kit', 'Tracksuit', 'Kids', 'Shorts'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SEASONS = ['25/26', '24/25', '23/24', 'Retro 90s', 'Retro 00s'];

// Curated featured players for player jerseys (linked to current 25/26 clubs)
// Featured players — each maps to PRECISE career history with seasons per club
// When user clicks a player, the shop filters to ONLY jerseys from their actual clubs
// during the exact seasons they were there. No anachronisms (e.g., no Mbappé 2003 Real Madrid).
//
// Format: career = [{ team, fromYear, toYear }]
// Years are start of season (e.g., 2017 = 17/18 season)
const PLAYERS = [
  {
    id: 'mbappe', name: 'Mbappé', number: 10, club: 'Real Madrid',
    career: [
      { team: 'Monaco', fromYear: 2015, toYear: 2017 },         // 15/16, 16/17
      { team: 'Paris Saint-Germain', fromYear: 2017, toYear: 2024 }, // 17/18 → 23/24
      { team: 'Real Madrid', fromYear: 2024, toYear: 2099 },    // 24/25 onwards
      { team: 'France', fromYear: 2017, toYear: 2099 },         // National team — any year
    ],
  },
  {
    id: 'messi', name: 'Messi', number: 10, club: 'Inter Miami',
    career: [
      { team: 'Barcelona', fromYear: 2004, toYear: 2021 },      // 04/05 → 20/21
      { team: 'Paris Saint-Germain', fromYear: 2021, toYear: 2023 }, // 21/22, 22/23
      { team: 'Inter Miami', fromYear: 2023, toYear: 2099 },    // 23/24 onwards
      { team: 'Argentina', fromYear: 2005, toYear: 2099 },
    ],
  },
  {
    id: 'ronaldo', name: 'Ronaldo', number: 7, club: 'Al-Nassr',
    career: [
      { team: 'Manchester United', fromYear: 2003, toYear: 2009 },   // 03/04 → 08/09
      { team: 'Real Madrid', fromYear: 2009, toYear: 2018 },          // 09/10 → 17/18
      { team: 'Juventus', fromYear: 2018, toYear: 2021 },             // 18/19 → 20/21
      { team: 'Manchester United', fromYear: 2021, toYear: 2022 },   // return 21/22
      { team: 'Al-Nassr', fromYear: 2022, toYear: 2099 },             // 22/23 onwards
      { team: 'Portugal', fromYear: 2003, toYear: 2099 },
    ],
  },
  {
    id: 'haaland', name: 'Haaland', number: 9, club: 'Manchester City',
    career: [
      { team: 'Borussia Dortmund', fromYear: 2019, toYear: 2022 },   // 19/20 → 21/22
      { team: 'Manchester City', fromYear: 2022, toYear: 2099 },     // 22/23 onwards
      { team: 'Norway', fromYear: 2019, toYear: 2099 },
    ],
  },
  {
    id: 'lamine', name: 'Lamine Yamal', number: 19, club: 'Barcelona',
    career: [
      { team: 'Barcelona', fromYear: 2023, toYear: 2099 },           // 23/24 debut onwards
      { team: 'Spain', fromYear: 2023, toYear: 2099 },
    ],
  },
  {
    id: 'vini', name: 'Vinicius Jr', number: 7, club: 'Real Madrid',
    career: [
      { team: 'Real Madrid', fromYear: 2018, toYear: 2099 },         // 18/19 onwards
      { team: 'Brazil', fromYear: 2019, toYear: 2099 },
    ],
  },
  {
    id: 'neymar', name: 'Neymar', number: 10, club: 'Santos',
    career: [
      { team: 'Santos', fromYear: 2009, toYear: 2013 },              // 09/10 → 12/13
      { team: 'Barcelona', fromYear: 2013, toYear: 2017 },           // 13/14 → 16/17
      { team: 'Paris Saint-Germain', fromYear: 2017, toYear: 2023 },// 17/18 → 22/23
      { team: 'Al-Hilal', fromYear: 2023, toYear: 2025 },            // 23/24, 24/25
      { team: 'Santos', fromYear: 2025, toYear: 2099 },              // return 25/26
      { team: 'Brazil', fromYear: 2010, toYear: 2099 },
    ],
  },
];

// Derive list of teams from career (used by shop to show banner text)
PLAYERS.forEach(p => {
  p.careerTeams = Array.from(new Set(p.career.map(c => c.team)));
});

// Color palettes per club for SVG jersey rendering
const JERSEY_DESIGNS = {
  // UCL Clubs
  rma: { primary: '#FFFFFF', secondary: '#FEBE10', stripes: [], pattern: 'clean' },
  bar: { primary: '#A50044', secondary: '#004D98', stripes: ['#A50044', '#004D98'], pattern: 'stripes' },
  atl: { primary: '#CB3524', secondary: '#FFFFFF', stripes: ['#CB3524', '#fff'], pattern: 'stripes' },
  ath: { primary: '#EE2523', secondary: '#FFFFFF', stripes: ['#EE2523', '#fff'], pattern: 'stripes' },
  vil: { primary: '#FFE667', secondary: '#005CB9', stripes: [], pattern: 'clean' },
  liv: { primary: '#C8102E', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  ars: { primary: '#EF0107', secondary: '#FFFFFF', stripes: [], pattern: 'sleeves' },
  mci: { primary: '#6CABDD', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  che: { primary: '#034694', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  tot: { primary: '#FFFFFF', secondary: '#132257', stripes: [], pattern: 'clean' },
  new: { primary: '#241F20', secondary: '#FFFFFF', stripes: ['#241F20', '#fff'], pattern: 'stripes' },
  nap: { primary: '#12A0D7', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  int: { primary: '#0068A8', secondary: '#000000', stripes: ['#0068A8', '#000'], pattern: 'stripes' },
  juv: { primary: '#000000', secondary: '#FFFFFF', stripes: ['#000', '#fff'], pattern: 'stripes' },
  ata: { primary: '#1B5BA5', secondary: '#000000', stripes: ['#1B5BA5', '#000'], pattern: 'stripes' },
  bay: { primary: '#DC052D', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  bvb: { primary: '#FDE100', secondary: '#000000', stripes: [], pattern: 'clean' },
  lev: { primary: '#E32219', secondary: '#000000', stripes: [], pattern: 'clean' },
  'fra-club': { primary: '#000000', secondary: '#E1000F', stripes: [], pattern: 'clean' },
  psg: { primary: '#004170', secondary: '#DA291C', stripes: [], pattern: 'center-stripe' },
  mar: { primary: '#FFFFFF', secondary: '#2FAEE0', stripes: [], pattern: 'clean' },
  mon: { primary: '#FFFFFF', secondary: '#CE1126', stripes: [], pattern: 'diagonal' },
  ben: { primary: '#A50C28', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  spo: { primary: '#016241', secondary: '#FFFFFF', stripes: ['#016241', '#fff'], pattern: 'stripes' },
  aja: { primary: '#FFFFFF', secondary: '#D2122E', stripes: [], pattern: 'center-stripe' },
  psv: { primary: '#ED1C24', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  mil: { primary: '#FB090B', secondary: '#000000', stripes: ['#FB090B', '#000'], pattern: 'stripes' },
  mun: { primary: '#DA291C', secondary: '#FFE500', stripes: [], pattern: 'clean' },
  rom: { primary: '#8E1B25', secondary: '#F0BC42', stripes: [], pattern: 'clean' },
  mia: { primary: '#F7B5CD', secondary: '#231F20', stripes: [], pattern: 'clean' },
  alh: { primary: '#FFCC00', secondary: '#0033A0', stripes: [], pattern: 'clean' },
  alh2: { primary: '#0033A0', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },

  // National Teams
  'ars-nat': { primary: '#75AADB', secondary: '#FFFFFF', stripes: ['#75AADB', '#fff'], pattern: 'stripes' },
  bra: { primary: '#FFDF00', secondary: '#009C3B', stripes: [], pattern: 'clean' },
  fra: { primary: '#002654', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  por: { primary: '#7A1F2B', secondary: '#006600', stripes: [], pattern: 'clean' },
  eng: { primary: '#FFFFFF', secondary: '#1A1F71', stripes: [], pattern: 'clean' },
  ger: { primary: '#FFFFFF', secondary: '#000000', stripes: [], pattern: 'clean' },
  spa: { primary: '#C60B1E', secondary: '#FFCC00', stripes: [], pattern: 'clean' },
  ita: { primary: '#1B5BA5', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  ned: { primary: '#FF7900', secondary: '#000000', stripes: [], pattern: 'clean' },
  cro: { primary: '#FFFFFF', secondary: '#FF0000', stripes: ['#fff', '#FF0000'], pattern: 'stripes' },
  bel: { primary: '#E30613', secondary: '#000000', stripes: [], pattern: 'clean' },
  mex: { primary: '#006847', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  usa: { primary: '#FFFFFF', secondary: '#002868', stripes: [], pattern: 'clean' },
  mor: { primary: '#C1272D', secondary: '#006233', stripes: [], pattern: 'clean' },
  sen: { primary: '#FFFFFF', secondary: '#00853F', stripes: [], pattern: 'clean' },
  jpn: { primary: '#0E2B59', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  kor: { primary: '#CD2E3A', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  col: { primary: '#FCD116', secondary: '#003893', stripes: [], pattern: 'clean' },
  uru: { primary: '#5CBCEE', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  nga: { primary: '#008751', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  civ: { primary: '#FF8200', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  gha: { primary: '#FFFFFF', secondary: '#FCD116', stripes: [], pattern: 'clean' },
  egy: { primary: '#CE1126', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  alg: { primary: '#FFFFFF', secondary: '#006633', stripes: [], pattern: 'clean' },
  tun: { primary: '#E70013', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  sau: { primary: '#FFFFFF', secondary: '#006C35', stripes: [], pattern: 'clean' },
  qat: { primary: '#8A1538', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
  irn: { primary: '#FFFFFF', secondary: '#239F40', stripes: [], pattern: 'clean' },
  aus: { primary: '#FFCD00', secondary: '#00843D', stripes: [], pattern: 'clean' },
  can: { primary: '#D80027', secondary: '#FFFFFF', stripes: [], pattern: 'clean' },
};

// ============================================================================
// REAL YUPOO IMAGES — Extracted from Yupoo.store album pages
// Each entry maps an album/product key to its real image URLs from the Yupoo CDN
// Use the included scrape_yupoo.py script to add more
// ============================================================================
const YUPOO_IMAGES = {
  // Album 1160601 — Germany Championship Years (Player Version) — confirmed
  'ger-special-championship': {
    title: 'Player Version 2026 Germany Dark Grey with Championship Years Stripe Graphic Jersey',
    images: [
      'https://img7-cdn.yupoo.store/p/2026/05/19/c/c/cca6e8da1a936f4150700788.webp',
      'https://img6-cdn.yupoo.store/2026/05/19/8/a/8a379c9c1d45fa4a.jpg',
      'https://img2-cdn.yupoo.store/2026/05/19/7/2/72d4e0be7d4f4749.jpg',
      'https://img9-cdn.yupoo.store/2026/05/19/9/6/962c1dd66757f636.jpg',
      'https://img2-cdn.yupoo.store/2026/05/19/8/b/8b2d7a6f4de806e5.jpg',
      'https://img3-cdn.yupoo.store/2026/05/19/7/2/72ae369e6d0ede7e.jpg',
      'https://img5-cdn.yupoo.store/2026/05/19/f/e/fe557e3a6ab67a68.jpg',
      'https://img2-cdn.yupoo.store/2026/05/19/7/d/7df7ac6d0d1ab351.jpg',
    ],
  },
  // Album 1160648 — Barcelona Mashup Away (Player Version) — confirmed
  'bar-special-mashup': {
    title: '26/27 FC Barcelona Special Edition "Mashup" Away Jersey - Cream/Blue Stripe',
    images: [
      'https://img8-cdn.yupoo.store/p/2026/05/20/4/5/45b4482e9d80d6ba9a7e6b9a.webp',
      'https://img4-cdn.yupoo.store/p/2026/05/20/a/5/a53c2b54d563230bee0e74e2.jpg',
    ],
  },
};

// Map product IDs to Yupoo image keys (manual matching of confirmed albums)
const PRODUCT_IMAGE_MAP = {
  // These are populated automatically below in buildProducts based on name matching
};

// Helper to look up image URLs for a product
const getProductImages = (product) => {
  // Try exact mapping first
  if (PRODUCT_IMAGE_MAP[product.id]) {
    const key = PRODUCT_IMAGE_MAP[product.id];
    if (YUPOO_IMAGES[key]) return YUPOO_IMAGES[key].images;
  }
  // Try name-based matching for confirmed albums
  const nameLower = product.name.toLowerCase();
  if (nameLower.includes('germany') && nameLower.includes('championship')) {
    return YUPOO_IMAGES['ger-special-championship'].images;
  }
  if (nameLower.includes('barcelona') && nameLower.includes('mashup')) {
    return YUPOO_IMAGES['bar-special-mashup'].images;
  }
  return null; // Falls back to SVG
};
// Pricing strategy (based on sourcing costs):
//   Fan version: $59 (cost ~$12 + ~$8 ship = $20, margin 66%)
//   Player version: $79 (cost ~$14 + $8 = $22, margin 72%)
//   Retro: $69 (cost ~$15 + $8 = $23, margin 67%)
//   Kids: $49 (cost ~$12 + $8 = $20, margin 59%)
//   Long sleeve adds $10 retail (cost +$2)
//   Special edition adds $10 retail
// ============================================================================
const PRICING = {
  fan: 59,
  player: 79,
  retro: 69,
  kids: 49,
  longSleeveAdd: 10,
  specialAdd: 10,
};

// Helper to create a product with sane defaults
let _pid = 0;
const make = (overrides) => {
  _pid += 1;
  const base = {
    id: `p${_pid}`,
    season: '25/26',
    rating: 4.6 + Math.random() * 0.35,
    reviews: Math.floor(Math.random() * 350) + 40,
    stock: Math.floor(Math.random() * 40) + 8,
    isNew: false,
    isBest: false,
    isLimited: false,
    salePrice: null,
    colorVariant: 0,
    tags: [],
  };
  const merged = { ...base, ...overrides };
  // Derive league/country/clubName from club id
  const c = CLUBS.find(cl => cl.id === merged.club);
  if (c) {
    merged.clubName = c.name;
    merged.league = c.league;
    merged.country = c.country;
  }
  // Attach real Yupoo images if available
  merged.images = getProductImages(merged);
  return merged;
};

// Build the catalog
const buildProducts = () => {
  const items = [];

  // -------- CHAMPIONS LEAGUE CLUBS — Full kit lineup --------
  // For each UCL club: Home/Away/Third in both Fan + Player versions
  // For top-tier clubs: also Kids Home + Special Edition
  const uclClubs = CLUBS.filter(c => c.inUCL);
  const topTier = ['rma', 'bar', 'liv', 'ars', 'mci', 'bay', 'psg', 'int', 'juv', 'mil'];

  uclClubs.forEach(club => {
    const kits = ['Home', 'Away', 'Third'];
    kits.forEach((kit, kIdx) => {
      // Fan Version
      items.push(make({
        club: club.id,
        name: `${club.name} ${kit} Jersey 25/26 — Fan Version`,
        kit, type: 'Fan Version', version: 'Fan Version',
        price: PRICING.fan,
        isNew: kIdx === 0,
        isBest: topTier.includes(club.id) && kIdx === 0,
        tags: ['Fan Version', kit, '25/26', club.name],
        colorVariant: kIdx,
      }));
      // Player Version
      items.push(make({
        club: club.id,
        name: `${club.name} ${kit} Jersey 25/26 — Player Version`,
        kit, type: 'Player Version', version: 'Player Version',
        price: PRICING.player,
        isNew: kIdx === 0,
        isBest: topTier.includes(club.id) && kIdx <= 1,
        tags: ['Player Version', kit, '25/26', club.name],
        colorVariant: kIdx,
      }));
    });

    // Long-sleeve variant for top-tier home kits
    if (topTier.includes(club.id)) {
      items.push(make({
        club: club.id,
        name: `${club.name} Home Long Sleeve 25/26 — Player Version`,
        kit: 'Home', type: 'Player Version', version: 'Player Version',
        price: PRICING.player + PRICING.longSleeveAdd,
        tags: ['Player Version', 'Long Sleeve', 'Home', '25/26', club.name],
      }));
    }

    // Kids kit for top tier
    if (topTier.includes(club.id)) {
      items.push(make({
        club: club.id,
        name: `${club.name} Kids Home Kit 25/26`,
        kit: 'Home', type: 'Kids', version: 'Kids',
        price: PRICING.kids,
        tags: ['Kids', 'Home', '25/26', club.name],
      }));
    }
  });

  // -------- POPULAR NON-UCL CLUBS — Most-demanded jerseys --------
  const popularNonUCL = ['mun', 'mil', 'mia', 'alh', 'alh2', 'rom'];
  popularNonUCL.forEach(clubId => {
    const club = CLUBS.find(c => c.id === clubId);
    if (!club) return;
    ['Home', 'Away', 'Third'].forEach((kit, kIdx) => {
      items.push(make({
        club: clubId,
        name: `${club.name} ${kit} Jersey 25/26 — Fan Version`,
        kit, type: 'Fan Version', version: 'Fan Version',
        price: PRICING.fan,
        isNew: kIdx === 0,
        isBest: kIdx === 0,
        tags: ['Fan Version', kit, '25/26', club.name],
      }));
      items.push(make({
        club: clubId,
        name: `${club.name} ${kit} Jersey 25/26 — Player Version`,
        kit, type: 'Player Version', version: 'Player Version',
        price: PRICING.player,
        isNew: kIdx === 0,
        isBest: kIdx <= 1,
        tags: ['Player Version', kit, '25/26', club.name],
      }));
    });
    // Kids home
    items.push(make({
      club: clubId,
      name: `${club.name} Kids Home Kit 25/26`,
      kit: 'Home', type: 'Kids', version: 'Kids',
      price: PRICING.kids,
      tags: ['Kids', 'Home', '25/26', club.name],
    }));
  });

  // Messi (Inter Miami) and Ronaldo (Al-Nassr) signature pieces
  items.push(make({
    club: 'mia',
    name: 'Inter Miami Messi #10 Home Jersey 25/26 — Player Version',
    kit: 'Home', type: 'Player Version', version: 'Player Version',
    price: PRICING.player + PRICING.specialAdd,
    isBest: true, isNew: true, isLimited: true,
    tags: ['Player Version', 'Messi', 'Home', '25/26', 'Inter Miami'],
  }));
  items.push(make({
    club: 'alh',
    name: 'Al-Nassr Ronaldo #7 Home Jersey 25/26 — Player Version',
    kit: 'Home', type: 'Player Version', version: 'Player Version',
    price: PRICING.player + PRICING.specialAdd,
    isBest: true, isNew: true, isLimited: true,
    tags: ['Player Version', 'Ronaldo', 'Home', '25/26', 'Al-Nassr'],
  }));

  // -------- SPECIAL EDITION JERSEYS (real listings from Yupoo) --------
  const specialEditions = [
    { club: 'rma', name: 'Real Madrid x Y-3 Special Edition Black Jersey', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'bar', name: 'Barcelona "Mashup" Cream Special Edition Away Jersey 25/26', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'bar', name: 'Barcelona Royal Blue & Garnet Vertical Stripes Special Edition', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'bar', name: 'Barcelona Teal & Aqua Blue Third Special Jersey 26/27', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'ars', name: 'Arsenal Navy Blue Special Edition 26/27', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'ars', name: 'Arsenal Yellow Away Long Sleeve 26/27 Special', version: 'Player Version', price: PRICING.player + PRICING.specialAdd + PRICING.longSleeveAdd, limited: true },
    { club: 'liv', name: 'Liverpool White Away Special Edition 26/27', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'che', name: 'Chelsea Away Long Sleeve 26/27', version: 'Player Version', price: PRICING.player + PRICING.longSleeveAdd, limited: false },
    { club: 'mci', name: 'Manchester City Sky Blue Long Sleeve 26/27', version: 'Player Version', price: PRICING.player + PRICING.longSleeveAdd, limited: false },
    { club: 'bay', name: 'Bayern Munich Oktoberfest Special Edition', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'psg', name: 'PSG x Jordan Special Edition Black', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'mil', name: 'AC Milan Pre-Match Anthem Jersey 25/26', version: 'Fan Version', price: PRICING.fan + 8, limited: false },
    { club: 'int', name: 'Inter Milan Black Away Special Edition 25/26', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'mun', name: 'Manchester United White Pinstripe Away Jersey 26/27', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'mun', name: 'Manchester United 1990-92 Vintage Remake Away Jersey', version: 'Fan Version', price: PRICING.fan + 8, limited: true },
    { club: 'mun', name: 'Manchester United Third Concept Cream Blue Jersey', version: 'Player Version', price: PRICING.player + PRICING.specialAdd, limited: true },
    { club: 'mun', name: 'Manchester United x Adidas Limited Edition Navy Track Jacket', version: 'Player Version', price: PRICING.player + PRICING.specialAdd + 15, limited: true },
    { club: 'mun', name: 'Manchester United Red Polo Collar Long Sleeve 26/27', version: 'Player Version', price: PRICING.player + PRICING.longSleeveAdd, limited: false },
  ];
  specialEditions.forEach((s, i) => {
    items.push(make({
      club: s.club, name: s.name,
      kit: 'Special', type: s.version, version: s.version,
      price: s.price,
      isNew: i < 6,
      isLimited: s.limited,
      isBest: s.limited && i < 3,
      tags: [s.version, 'Special Edition', '25/26', s.limited ? 'Limited' : null].filter(Boolean),
    }));
  });

  // -------- INTERNATIONAL TEAMS — World Cup 26 + Current Kits --------
  const intlClubs = CLUBS.filter(c => c.league === 'International');
  const topNations = ['ars-nat', 'bra', 'fra', 'por', 'eng', 'ger', 'spa', 'mex', 'usa', 'mor'];

  intlClubs.forEach(nat => {
    const kits = topNations.includes(nat.id) ? ['Home', 'Away', 'Third'] : ['Home', 'Away'];
    kits.forEach((kit, kIdx) => {
      // Fan
      items.push(make({
        club: nat.id,
        name: `${nat.name} ${kit} Jersey 2026 World Cup — Fan Version`,
        kit, type: 'Fan Version', version: 'Fan Version',
        season: 'WC 2026',
        price: PRICING.fan,
        isNew: kIdx === 0,
        isBest: topNations.includes(nat.id) && kIdx === 0,
        tags: ['Fan Version', kit, 'WC 2026', nat.name, 'International'],
      }));
      // Player
      items.push(make({
        club: nat.id,
        name: `${nat.name} ${kit} Jersey 2026 World Cup — Player Version`,
        kit, type: 'Player Version', version: 'Player Version',
        season: 'WC 2026',
        price: PRICING.player,
        isNew: kIdx === 0,
        isBest: topNations.includes(nat.id) && kIdx <= 1,
        tags: ['Player Version', kit, 'WC 2026', nat.name, 'International'],
      }));
    });

    // Kids for top nations
    if (topNations.includes(nat.id)) {
      items.push(make({
        club: nat.id,
        name: `${nat.name} Kids Home Kit 2026 World Cup`,
        kit: 'Home', type: 'Kids', version: 'Kids',
        season: 'WC 2026',
        price: PRICING.kids,
        tags: ['Kids', 'Home', 'WC 2026', nat.name],
      }));
    }
  });

  // National team special editions (from Yupoo current inventory)
  const nationSpecials = [
    { club: 'ars-nat', name: 'Argentina 3-Star Champions Special Edition', limited: true },
    { club: 'bra', name: 'Brazil Yellow & Green Floral Special Edition', limited: true },
    { club: 'fra', name: 'France Pre-Match Training Jersey 2026', limited: false },
    { club: 'por', name: 'Portugal Cristiano Tribute Special Edition', limited: true },
    { club: 'eng', name: 'England St. George Special Edition Cross Detail', limited: true },
    { club: 'ger', name: 'Germany Dark Grey with Championship Years Stripe', limited: true },
    { club: 'spa', name: 'Spain x Dellafuente Special Edition Jersey', limited: true },
    { club: 'cro', name: 'Croatia Black Checkered Pattern Special Edition', limited: true },
    { club: 'mex', name: 'Mexico Green Geometric Pattern Special Edition', limited: true },
    { club: 'mex', name: 'Mexico Red with Triangle Pattern Special Edition', limited: true },
    { club: 'mor', name: 'Morocco Atlas Lions Special Edition', limited: true },
    { club: 'gha', name: 'Ghana Freedom and Justice Special Edition', limited: true },
    { club: 'jpn', name: 'Japan Origami Pattern Special Edition', limited: true },
    { club: 'civ', name: 'Ivory Coast Africa Cup Champions Special', limited: true },
  ];
  nationSpecials.forEach((ns, i) => {
    items.push(make({
      club: ns.club, name: ns.name,
      kit: 'Special', type: 'Player Version', version: 'Player Version',
      season: 'WC 2026',
      price: PRICING.player + PRICING.specialAdd,
      isNew: i < 8,
      isLimited: ns.limited,
      isBest: i < 5,
      tags: ['Player Version', 'Special Edition', 'WC 2026', ns.limited ? 'Limited' : null, 'International'].filter(Boolean),
    }));
  });

  // -------- RETRO VAULT — Iconic kits across history --------
  const retros = [
    { club: 'ars-nat', name: "Argentina 1986 Maradona Home Retro", year: '1986', icon: true },
    { club: 'bra', name: 'Brazil 2002 World Cup Retro — Ronaldo Era', year: '2002', icon: true },
    { club: 'fra', name: 'France 1998 World Cup Champions Retro', year: '1998', icon: true },
    { club: 'ned', name: 'Netherlands 1988 Euro Champions Retro', year: '1988', icon: true },
    { club: 'ger', name: 'Germany 1990 World Cup Retro', year: '1990', icon: false },
    { club: 'eng', name: "England 1966 World Cup Retro", year: '1966', icon: true },
    { club: 'ita', name: 'Italy 2006 World Cup Champions Retro', year: '2006', icon: true },
    { club: 'spa', name: 'Spain 2010 World Cup Champions Retro', year: '2010', icon: true },
    { club: 'por', name: 'Portugal Euro 2004 Retro', year: '2004', icon: false },
    { club: 'cro', name: 'Croatia 1998 World Cup 3rd Place Retro', year: '1998', icon: true },
    { club: 'nga', name: 'Nigeria 1996 Olympic Champions Retro', year: '1996', icon: true },
    { club: 'sen', name: 'Senegal 2002 World Cup Retro', year: '2002', icon: false },
    // Club retros
    { club: 'bar', name: "Barcelona 2009 Treble Retro — Messi Era", year: '2009', icon: true },
    { club: 'bar', name: 'Barcelona 1992 European Cup Retro', year: '1992', icon: true },
    { club: 'rma', name: 'Real Madrid 2002 Galácticos Centenary Retro', year: '2002', icon: true },
    { club: 'rma', name: 'Real Madrid 1998 Champions League Retro', year: '1998', icon: false },
    { club: 'liv', name: 'Liverpool 2005 Istanbul Champions Retro', year: '2005', icon: true },
    { club: 'liv', name: 'Liverpool 1989 Hillsborough Tribute Retro', year: '1989', icon: false },
    { club: 'ars', name: 'Arsenal 2003-04 Invincibles Retro', year: '2003-04', icon: true },
    { club: 'mil', name: 'AC Milan 2003 Champions League Retro', year: '2003', icon: true },
    { club: 'mil', name: 'AC Milan 1990 European Cup Retro', year: '1990', icon: false },
    { club: 'int', name: 'Inter Milan 2010 Treble Retro — Mourinho Era', year: '2010', icon: true },
    { club: 'bvb', name: 'Borussia Dortmund 1997 Champions League Retro', year: '1997', icon: false },
    { club: 'bay', name: 'Bayern Munich 2001 Champions League Retro', year: '2001', icon: false },
    { club: 'aja', name: 'Ajax 1995 Champions League Retro', year: '1995', icon: true },
    { club: 'mci', name: 'Manchester City 1968 Title Retro', year: '1968', icon: false },
    { club: 'che', name: 'Chelsea 2012 Champions League Retro', year: '2012', icon: true },
    { club: 'juv', name: 'Juventus 1996 Champions League Retro', year: '1996', icon: false },
    { club: 'psg', name: 'Paris Saint-Germain 1996 Cup Winners Cup Retro', year: '1996', icon: false },
    { club: 'nap', name: 'Napoli 1987 Maradona Scudetto Retro', year: '1987', icon: true },
    { club: 'ben', name: 'Benfica 1961 European Cup Retro', year: '1961', icon: false },
    { club: 'mun', name: 'Manchester United 1999 Treble Retro', year: '1999', icon: true },
    { club: 'mun', name: 'Manchester United 1968 European Cup Retro', year: '1968', icon: false },
    { club: 'mun', name: 'Manchester United 1990-92 Vintage Away Retro', year: '1990-92', icon: false },
    { club: 'rom', name: 'AS Roma 2001 Scudetto Retro — Totti Era', year: '2001', icon: true },
  ];
  retros.forEach((r, i) => {
    items.push(make({
      club: r.club, name: r.name,
      kit: 'Retro', type: 'Retro', version: 'Retro',
      season: r.year,
      price: PRICING.retro + (r.icon ? 10 : 0),
      isLimited: true,
      isBest: r.icon,
      isNew: false,
      tags: ['Retro', r.year, r.club === 'ars-nat' || ['bra','fra','ned','ger','eng','ita','spa','por','cro','nga','sen'].includes(r.club) ? 'International' : 'Club'],
    }));
  });

  // Add some on-sale items (clearance from previous seasons)
  const saleTargets = items.filter(p => p.season === '25/26' && p.version !== 'Special Edition').slice(0, 12);
  saleTargets.forEach(p => {
    p.salePrice = Math.round(p.price * 0.75);
    p.tags.push('Sale');
  });

  return items;
};

// PRODUCTS is the starting fallback catalog (~440 procedural items)
// At runtime, StoreProvider fetches /products.json and REPLACES the contents of this array
// with the real catalog of 5,029 products mapped to Yupoo CDN images.
let PRODUCTS = buildProducts();

// R2 URL prefix — all image filenames in the catalog are stored as short keys (no prefix)
// to keep the JSON small. We prepend this to get the full CDN URL.
const R2_URL_PREFIX = 'https://pub-48307add76af4753858d4750dc1ecf55.r2.dev/';

// Flag bits packed in the catalog (saves JSON size)
const FLAG_BITS = {
  isRetro: 1, isKids: 2, isLongSleeve: 4, isPlayerVersion: 8,
  isSpecial: 16, isGoalkeeper: 32, isWomens: 64, isTraining: 128,
  isShorts: 256, isTracksuit: 512, isNew: 1024, isBest: 2048, isLimited: 4096,
};

// Decompress a row from the catalog JSON into a full product object
const decompressProduct = (c) => {
  const fl = c.fl || 0;
  // Normalize season: replace any remaining underscores with slashes
  const season = (c.s || '').replace(/_/g, '/');
  // Normalize name: replace season underscores with slashes
  const name = (c.n || '').replace(/(\d{2,4})_(\d{2,4})/g, '$1/$2');
  return {
    id: c.i,
    name: name,
    image: R2_URL_PREFIX + encodeURIComponent(c.img).replace(/%2F/g, '/'),
    club: c.t,
    clubName: c.t,
    league: c.l,
    country: c.c,
    color: c.cl,
    season: season,
    kit: c.v,
    variant: c.v,
    version: c.ty,
    type: c.ty,
    // Available variants for this product (Fan Version / Player Version / Kids)
    variants: c.var || ['Fan Version'],
    price: c.p,
    salePrice: c.sp || null,
    stock: c.st,
    rating: c.r,
    reviews: c.rv,
    isRetro: !!(fl & FLAG_BITS.isRetro),
    isKids: !!(fl & FLAG_BITS.isKids),
    isLongSleeve: !!(fl & FLAG_BITS.isLongSleeve),
    isPlayerVersion: !!(fl & FLAG_BITS.isPlayerVersion),
    isSpecial: !!(fl & FLAG_BITS.isSpecial),
    isGoalkeeper: !!(fl & FLAG_BITS.isGoalkeeper),
    isWomens: !!(fl & FLAG_BITS.isWomens),
    isTraining: !!(fl & FLAG_BITS.isTraining),
    isShorts: !!(fl & FLAG_BITS.isShorts),
    isTracksuit: !!(fl & FLAG_BITS.isTracksuit),
    isNew: !!(fl & FLAG_BITS.isNew),
    isBest: !!(fl & FLAG_BITS.isBest),
    isLimited: !!(fl & FLAG_BITS.isLimited),
    tags: [c.v, c.ty, season, c.t].filter(Boolean),
  };
};

// ---------- CART CONTEXT ----------------------------------------------------
const StoreContext = createContext(null);
const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  // Route state with URL sync (proper browser back/forward support)
  // Routes serialize to URLs like:
  //   /            (home)
  //   /shop        (shop, no filter)
  //   /shop?league=Premier+League&clubName=Liverpool   (filtered shop)
  //   /product/p123 (product detail)
  //   /clubs       (clubs page)
  //   /wishlist, /account, /checkout, /about, /contact, /faq, etc.
  const parseUrl = () => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === '/' || path === '') return { page: 'home' };
    if (path.startsWith('/product/')) return { page: 'product', productId: path.replace('/product/', '') };
    if (path.startsWith('/shop')) {
      const filter = {};
      for (const [k, v] of params.entries()) {
        if (k === 'careerTeams') filter[k] = v.split(',');
        else filter[k] = v;
      }
      return { page: 'shop', filter };
    }
    if (path === '/clubs') return { page: 'clubs' };
    if (path === '/wishlist') return { page: 'wishlist' };
    if (path === '/account') return { page: 'account' };
    if (path === '/checkout') return { page: 'checkout' };
    if (path === '/about') return { page: 'about' };
    if (path === '/contact') return { page: 'contact' };
    if (path === '/faq') return { page: 'faq' };
    if (path === '/order-tracking') return { page: 'order-tracking' };
    if (path === '/shipping') return { page: 'shipping' };
    if (path === '/returns') return { page: 'returns' };
    if (path === '/terms') return { page: 'terms' };
    if (path === '/privacy') return { page: 'privacy' };
    return { page: 'home' };
  };

  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return { page: 'home' };
    return parseUrl();
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState({ code: 'USD', symbol: '$', rate: 1 });
  const [toast, setToast] = useState(null);
  // Tracks whether the real catalog has been loaded — used to force re-render
  const [catalogLoaded, setCatalogLoaded] = useState(false);

  // On startup, fetch /products.json and REPLACE the PRODUCTS array with real items
  useEffect(() => {
    fetch('/products.json')
      .then(r => r.ok ? r.json() : Promise.reject('Failed to load catalog'))
      .then(compressed => {
        if (!Array.isArray(compressed) || compressed.length === 0) {
          console.warn('Real catalog empty or invalid, keeping fallback');
          return;
        }
        const real = compressed.map(decompressProduct);
        // Mutate the PRODUCTS array in place so all existing references update
        PRODUCTS.length = 0;
        real.forEach(p => PRODUCTS.push(p));
        setCatalogLoaded(true);
        console.log(`[MehdiSports] Loaded ${real.length} products from real catalog`);
      })
      .catch(err => {
        console.warn('[MehdiSports] Using fallback catalog:', err);
      });
  }, []);

  const addToCart = (product, opts) => {
    const key = `${product.id}-${opts.size}-${opts.playerName || ''}-${opts.playerNumber || ''}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + (opts.qty || 1) } : i);
      return [...prev, { key, product, ...opts, qty: opts.qty || 1 }];
    });
    setToast({ msg: `Added to bag — ${product.name}`, kind: 'success' });
    setTimeout(() => setToast(null), 2400);
  };

  const updateQty = (key, qty) => {
    if (qty <= 0) return setCart(prev => prev.filter(i => i.key !== key));
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key));

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Track recently viewed products (most recent first, max 8)
  const trackView = (productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Build a URL from a route object (mirror of parseUrl)
  const routeToUrl = (page, params) => {
    if (page === 'home') return '/';
    if (page === 'product') return `/product/${params.productId || ''}`;
    if (page === 'shop') {
      const filter = params.filter || {};
      const q = new URLSearchParams();
      for (const [k, v] of Object.entries(filter)) {
        if (v == null || v === '' || v === false) continue;
        if (Array.isArray(v)) q.set(k, v.join(','));
        else q.set(k, String(v));
      }
      const qs = q.toString();
      return qs ? `/shop?${qs}` : '/shop';
    }
    return `/${page}`;
  };

  const navigate = (page, params = {}) => {
    const url = routeToUrl(page, params);
    // Push only if URL changes (avoids duplicate history entries)
    if (typeof window !== 'undefined' && (window.location.pathname + window.location.search) !== url) {
      window.history.pushState({ page, ...params }, '', url);
    }
    setRoute({ page, ...params });
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Browser back/forward button — sync route state with URL changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setRoute(parseUrl());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + (i.product.salePrice || i.product.price) * i.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, updateQty, removeFromCart, cartCount, subtotal,
      wishlist, toggleWishlist,
      recentlyViewed, trackView,
      route, navigate,
      cartOpen, setCartOpen,
      menuOpen, setMenuOpen,
      searchOpen, setSearchOpen,
      currency, setCurrency,
      toast,
      catalogLoaded,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// ---------- JERSEY SVG ------------------------------------------------------
const JerseySVG = ({ club, playerName, playerNumber, view = 'front', className = '', imageUrl = null }) => {
  // If a real image URL is provided, render that instead of the SVG mockup
  // This is the path for products mapped to real Yupoo CDN images
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        decoding="async"
        width="400"
        height="480"
        className={`${className} object-contain`}
        style={{ width: '100%', height: '100%' }}
        onError={(e) => {
          // If real image fails to load, hide it gracefully
          e.target.style.opacity = '0.1';
        }}
      />
    );
  }

  // Fallback: original SVG mockup for products without a real image
  const design = JERSEY_DESIGNS[club] || JERSEY_DESIGNS.rma;
  const { primary, secondary, pattern } = design;
  const isLight = ['#FFFFFF', '#FDE100', '#FFDF00', '#FFCC00', '#F7B5CD'].includes(primary);
  const textColor = isLight ? '#000' : '#fff';

  return (
    <svg viewBox="0 0 400 480" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`shade-${club}-${view}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
        <pattern id={`stripe-${club}`} patternUnits="userSpaceOnUse" width="40" height="480">
          {design.stripes.map((c, i) => (
            <rect key={i} x={i * 20} y="0" width="20" height="480" fill={c} />
          ))}
        </pattern>
      </defs>

      {/* Jersey body */}
      <path
        d="M 80 80 L 140 50 L 160 70 Q 200 90 240 70 L 260 50 L 320 80 L 360 130 L 320 160 L 310 150 L 310 420 Q 200 440 90 420 L 90 150 L 80 160 L 40 130 Z"
        fill={pattern === 'stripes' ? `url(#stripe-${club})` : primary}
        stroke={isLight ? '#1a1a1a' : 'rgba(0,0,0,0.3)'}
        strokeWidth="1.5"
      />

      {/* Center stripe (PSG style) */}
      {pattern === 'center-stripe' && (
        <rect x="185" y="80" width="30" height="340" fill={secondary} />
      )}

      {/* Sleeve color (Arsenal style) */}
      {pattern === 'sleeves' && (
        <>
          <path d="M 80 80 L 140 50 L 160 70 L 130 100 L 90 150 L 80 160 L 40 130 Z" fill={secondary} />
          <path d="M 320 80 L 260 50 L 240 70 L 270 100 L 310 150 L 320 160 L 360 130 Z" fill={secondary} />
        </>
      )}

      {/* Collar */}
      <path d="M 160 70 Q 200 95 240 70 Q 230 85 200 85 Q 170 85 160 70 Z" fill={secondary} opacity="0.9" />

      {/* Shading overlay */}
      <path
        d="M 80 80 L 140 50 L 160 70 Q 200 90 240 70 L 260 50 L 320 80 L 360 130 L 320 160 L 310 150 L 310 420 Q 200 440 90 420 L 90 150 L 80 160 L 40 130 Z"
        fill={`url(#shade-${club}-${view})`}
      />

      {/* Back of jersey shows name + number */}
      {view === 'back' && (
        <>
          {playerName && (
            <text x="200" y="200" textAnchor="middle" fill={textColor}
              style={{ font: 'bold 22px Inter, sans-serif', letterSpacing: '3px' }}>
              {playerName.toUpperCase()}
            </text>
          )}
          {playerNumber && (
            <text x="200" y="320" textAnchor="middle" fill={textColor}
              style={{ font: 'bold 110px Inter, sans-serif' }}>
              {playerNumber}
            </text>
          )}
        </>
      )}

      {/* Front: brand mark + crest placeholder */}
      {view === 'front' && (
        <>
          {/* Crest */}
          <rect x="125" y="115" width="36" height="44" rx="3" fill={secondary} opacity="0.85" />
          <text x="143" y="143" textAnchor="middle" fill={textColor}
            style={{ font: 'bold 11px Inter, sans-serif' }}>FC</text>

          {/* MS swoosh */}
          <text x="270" y="135" textAnchor="middle" fill={textColor}
            style={{ font: 'italic bold 14px Inter, sans-serif' }}>MS</text>

          {/* Sponsor */}
          <text x="200" y="260" textAnchor="middle" fill={textColor} opacity="0.85"
            style={{ font: 'bold 18px Inter, sans-serif', letterSpacing: '2px' }}>
            MEHDISPORTS
          </text>
        </>
      )}
    </svg>
  );
};

// ---------- HEADER ----------------------------------------------------------
// Countdown timer hook — counts down to midnight tonight (resets daily for ever-present urgency)
const useCountdown = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.max(0, midnight - now);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      setTime(Math.max(0, midnight - now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
};

const TopBar = () => {
  const { hours, minutes, seconds } = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-lime-400 text-black text-[11px] font-bold tracking-wider uppercase py-2.5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left: deals marquee on desktop, hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 flex-1 min-w-0 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex gap-10">
                <span>Free shipping over $99</span><span>•</span>
                <span>25/26 season — out now</span><span>•</span>
                <span>30-day returns</span><span>•</span>
                <span>Custom name & number</span><span>•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center / Right: Countdown — visible everywhere */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 mx-auto md:mx-0">
          <span className="text-[10px] md:text-[11px]">🔥 Buy 2 Get 1 Free — ends in</span>
          <div className="flex items-center gap-1 font-mono font-black">
            <span className="bg-black text-lime-400 px-1.5 py-0.5 rounded text-[11px] tabular-nums">{pad(hours)}</span>
            <span>:</span>
            <span className="bg-black text-lime-400 px-1.5 py-0.5 rounded text-[11px] tabular-nums">{pad(minutes)}</span>
            <span>:</span>
            <span className="bg-black text-lime-400 px-1.5 py-0.5 rounded text-[11px] tabular-nums">{pad(seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { navigate, cartCount, setCartOpen, menuOpen, setMenuOpen, setSearchOpen, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'World Cup 2026', page: 'shop', params: { filter: { wc2026: true } }, highlight: true },
    { label: 'New Arrivals', page: 'shop', params: { filter: { isNew: true } } },
    { label: 'Clubs', page: 'clubs', params: {} },
    { label: 'National Teams', page: 'shop', params: { filter: { league: 'International' } } },
    { label: 'Kids', page: 'shop', params: { filter: { kidsOnly: true } } },
    { label: 'Retro', page: 'shop', params: { filter: { type: 'Retro' } } },
    { label: 'Sale', page: 'shop', params: { filter: { onSale: true } } },
  ];

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5' : 'bg-black'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-white" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>

          <button onClick={() => navigate('home')} className="flex items-baseline gap-1 group">
            <span className="font-black text-xl md:text-2xl tracking-tight text-white">MEHDI</span>
            <span className="font-black text-xl md:text-2xl tracking-tight text-lime-400">SPORTS</span>
            <span className="hidden md:inline text-[9px] uppercase tracking-[0.3em] text-white/40 ml-1 self-end mb-1"></span>
          </button>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-medium uppercase tracking-wide">
            {navLinks.map(l => (
              <button key={l.label}
                onClick={() => navigate(l.page, l.params)}
                className={`${l.highlight ? 'bg-lime-400 text-black px-3 py-1.5 rounded-sm hover:bg-white' : 'text-white/80 hover:text-lime-400'} transition-colors relative group`}>
                {l.label}
                {!l.highlight && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-lime-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-white hover:text-lime-400 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('account')} className="hidden md:block p-2 text-white hover:text-lime-400 transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('wishlist')} className="relative p-2 text-white hover:text-lime-400 transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-lime-400 rounded-full" />
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative p-2 text-white hover:text-lime-400 transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-lime-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// ---------- MOBILE MENU -----------------------------------------------------
const MobileMenu = () => {
  const { menuOpen, setMenuOpen, navigate } = useStore();
  const sections = [
    { label: 'World Cup 2026', page: 'shop', params: { filter: { wc2026: true } }, highlight: true },
    { label: 'New Arrivals', page: 'shop', params: { filter: { isNew: true } } },
    { label: 'Best Sellers', page: 'shop', params: { filter: { isBest: true } } },
    { label: 'Clubs', page: 'clubs', params: {} },
    { label: 'National Teams', page: 'shop', params: { filter: { league: 'International' } } },
    { label: 'Kids Jerseys', page: 'shop', params: { filter: { kidsOnly: true } } },
    { label: 'Retro Jerseys', page: 'shop', params: { filter: { type: 'Retro' } } },
    { label: 'Training Kits', page: 'shop', params: { filter: { type: 'Training Kit' } } },
    { label: 'Sale', page: 'shop', params: { filter: { onSale: true } } },
  ];
  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[88%] max-w-sm bg-zinc-950 z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <span className="font-black text-lg text-white">MEHDI<span className="text-lime-400">SPORTS</span></span>
              <button onClick={() => setMenuOpen(false)} className="text-white"><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {sections.map((s, i) => (
                <button key={s.label} onClick={() => navigate(s.page, s.params)}
                  className="w-full flex items-center justify-between px-5 py-4 text-white border-b border-white/5 hover:bg-white/5">
                  <span className="font-medium tracking-wide">{s.label}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              ))}
              <div className="px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-white/40 mt-4">Leagues</div>
              {LEAGUES.map(l => (
                <button key={l.id} onClick={() => navigate('shop', { filter: { league: l.name } })}
                  className="w-full flex items-center justify-between px-5 py-3 text-white/80 hover:text-lime-400">
                  <span className="text-sm">{l.name}</span>
                  <span className="text-xs text-white/30">{l.count}</span>
                </button>
              ))}
            </nav>
            <div className="border-t border-white/10 p-5 space-y-3">
              <button onClick={() => navigate('account')} className="w-full flex items-center gap-3 text-white py-2">
                <User className="w-4 h-4" /> <span className="text-sm">Account</span>
              </button>
              <button onClick={() => navigate('order-tracking')} className="w-full flex items-center gap-3 text-white py-2">
                <Truck className="w-4 h-4" /> <span className="text-sm">Track Order</span>
              </button>
              <button onClick={() => navigate('contact')} className="w-full flex items-center gap-3 text-white py-2">
                <Mail className="w-4 h-4" /> <span className="text-sm">Contact</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ---------- SEARCH OVERLAY --------------------------------------------------
const SearchOverlay = () => {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const ql = q.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(ql) ||
      p.clubName.toLowerCase().includes(ql) ||
      p.league.toLowerCase().includes(ql)
    ).slice(0, 6);
  }, [q]);

  const suggestions = ['Real Madrid', 'Mbappé', 'Retro Jerseys', 'Premier League', 'Player Version', 'Argentina'];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md">
          <div className="max-w-3xl mx-auto pt-20 px-6">
            <div className="flex items-center gap-4 border-b-2 border-lime-400 pb-3">
              <Search className="w-5 h-5 text-lime-400" />
              <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search jerseys, clubs, players..."
                className="flex-1 bg-transparent text-white text-xl md:text-2xl outline-none placeholder:text-white/30" />
              <button onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white"><X className="w-6 h-6" /></button>
            </div>

            {!q && (
              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Trending Searches</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => setQ(s)}
                      className="px-4 py-2 text-sm bg-white/5 hover:bg-lime-400 hover:text-black text-white/80 rounded-full transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q && (
              <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto">
                {results.length === 0 ? (
                  <div className="py-10 text-center">
                    <Search className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <div className="text-white font-bold mb-2">No matches for "{q}"</div>
                    <div className="text-white/50 text-sm mb-5">Try a club name, player, or season</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestions.slice(0, 5).map(s => (
                        <button key={s} onClick={() => setQ(s)}
                          className="px-3 py-1.5 text-xs bg-white/5 hover:bg-lime-400 hover:text-black text-white/70 rounded-full transition-colors">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.map(p => (
                  <button key={p.id}
                    onClick={() => { navigate('product', { productId: p.id }); setSearchOpen(false); setQ(''); }}
                    className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg text-left group">
                    <div className="w-14 h-14 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0">
                      <JerseySVG club={p.club} imageUrl={p.image} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate group-hover:text-lime-400">{p.name}</div>
                      <div className="text-xs text-white/40">{p.league}{p.season ? ` · ${p.season}` : ''}</div>
                    </div>
                    <div className="text-white font-bold whitespace-nowrap">${(p.salePrice || p.price).toFixed(2)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------- PRODUCT CARD ----------------------------------------------------
const ProductCard = ({ product, layout = 'default' }) => {
  const { navigate, toggleWishlist, wishlist, addToCart } = useStore();
  const [hover, setHover] = useState(false);
  const isWishlisted = wishlist.includes(product.id);
  const onSale = !!product.salePrice;
  const price = product.salePrice || product.price;
  const discount = onSale ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
      onClick={() => navigate('product', { productId: product.id })}
    >
      <div className="relative bg-zinc-900 aspect-[4/5] overflow-hidden rounded-sm">
        {/* Badge stack */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isNew && <span className="bg-lime-400 text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">New</span>}
          {product.isLimited && <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">Limited</span>}
          {onSale && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">-{discount}%</span>}
          {product.isBest && !product.isNew && <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">Best Seller</span>}
        </div>

        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur hover:bg-black/70 flex items-center justify-center transition-colors">
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-lime-400 text-lime-400' : 'text-white'}`} />
        </button>

        {/* Jersey image — single, smooth scale on hover (no flip, much faster) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[88%] h-[88%]"
          >
            <JerseySVG club={product.club} imageUrl={product.image} view="front" className="w-full h-full drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Quick add */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); addToCart(product, { size: 'M', qty: 1 }); }}
          initial={{ y: '100%' }}
          animate={{ y: hover ? 0 : '100%' }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 inset-x-0 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-lime-400">
          + Quick Add
        </motion.button>
      </div>

      <div className="pt-3 space-y-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{product.league}</div>
        <div className="text-sm text-white font-medium leading-tight line-clamp-1 group-hover:text-lime-400 transition-colors">
          {product.name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">${price.toFixed(2)}</span>
          {onSale && <span className="text-white/40 line-through text-xs">${product.price.toFixed(2)}</span>}
        </div>
      </div>
    </motion.div>
  );
};

// ---------- HOMEPAGE SECTIONS -----------------------------------------------
const Hero = () => {
  const { navigate } = useStore();
  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-black flex items-end">
      {/* Floodlight gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-lime-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-lime-400/10 rounded-full blur-[150px]" />
        {/* Grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating hero — Composite image of the 5 GOATs */}
      {/*
        ✅ Image lives at: /public/hero-legends.png
        Transparent PNG of Messi, Ronaldo, Mbappé, Neymar, Yamal (left → right)
      */}
      <div className="absolute right-0 bottom-0 w-full md:w-[62%] lg:w-[58%] xl:w-[55%] max-w-[1100px] pointer-events-none z-[1] opacity-30 md:opacity-100">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Multi-layer glow halo behind players */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[80%] h-[80%] bg-lime-400/25 blur-[140px] rounded-full" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] w-[60%] h-[60%] bg-lime-400/15 blur-[100px] rounded-full" />

          {/* Subtle stadium light beams */}
          <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-0 left-[20%] w-[2px] h-full bg-gradient-to-b from-lime-400/60 via-lime-400/10 to-transparent rotate-[8deg]" />
            <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-white/40 via-white/5 to-transparent" />
            <div className="absolute top-0 left-[75%] w-[2px] h-full bg-gradient-to-b from-lime-400/40 via-lime-400/5 to-transparent -rotate-[6deg]" />
          </div>

          {/* The legends image — sits at bottom, no rotation, just a gentle hover */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src="/hero-legends.png"
              alt="Messi · Ronaldo · Mbappé · Neymar · Yamal"
              className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Bottom fade — blends players into the page */}
          <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 pb-16 md:pb-24 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-2xl">

          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black leading-[0.88] tracking-tighter text-white uppercase">
            Worn by<br />
            <span className="italic font-serif font-normal text-lime-400">legends</span>.<br />
            Built for you.
          </h1>
          <p className="mt-6 text-white/60 text-sm md:text-base lg:text-lg max-w-md leading-relaxed">
            Match kits, retro classics, training gear — every team that matters.
            Custom name & number on any jersey, shipped worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => navigate('shop', { filter: { isNew: true } })}
              className="group bg-lime-400 hover:bg-white text-black px-7 py-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
              Shop new arrivals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('shop', { filter: { type: 'Retro' } })}
              className="border border-white/20 hover:border-white text-white px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
              Retro Vault
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-white/50 text-xs">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free shipping $99+</div>
            <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> 30-day returns</div>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

const TrendingClubs = () => {
  const { navigate } = useStore();
  // Find the specific 25/26 Home Jersey for each trending club
  const trending = useMemo(() => {
    const trendingClubNames = ['Real Madrid', 'Barcelona', 'Manchester City', 'Liverpool', 'Paris Saint-Germain', 'Bayern Munich', 'Manchester United', 'Inter Miami'];
    return trendingClubNames.map(name => {
      // STRICT: must be Home jersey for THIS club, current season, no special editions
      const candidates = PRODUCTS.filter(p =>
        p.clubName === name &&
        p.variant === 'Home' &&
        !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
        !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve &&
        // Must be 25/26 season (or 2025/26 long form)
        (p.season === '25/26' || p.season === '2025/26' || p.season === '2025/2026')
      );
      // If no 25/26, fall back to most recent current-season match
      let product = candidates[0];
      if (!product) {
        const fallback = PRODUCTS.filter(p =>
          p.clubName === name &&
          p.variant === 'Home' &&
          !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
          !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve
        );
        fallback.sort((a, b) => {
          const ay = parseInt((a.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
          const by = parseInt((b.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
          return by - ay;
        });
        product = fallback[0];
      }
      return product ? { name, product, color: product.color, league: product.league } : null;
    }).filter(Boolean);
  }, []);

  return (
    <section className="bg-zinc-950 py-16 md:py-24 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2">Top of the table</div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Trending Clubs</h2>
          </div>
          <button onClick={() => navigate('shop')} className="hidden md:flex items-center gap-2 text-white/70 hover:text-lime-400 text-sm uppercase tracking-widest">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {trending.map((club, i) => (
            <motion.button
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => navigate('shop', { filter: { clubName: club.name } })}
              className="group relative aspect-square overflow-hidden bg-zinc-900 rounded-sm"
              style={{ backgroundColor: `${club.color}15` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={club.product.image}
                  alt={club.name}
                  loading="lazy"
                  className="w-2/3 h-2/3 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1">{club.league}</div>
                <div className="text-white font-bold text-sm md:text-lg leading-tight">{club.name}</div>
                <div className="mt-2 flex items-center gap-1 text-lime-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop now <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

// New Arrivals — 26/27 home jerseys of the biggest clubs (next season drops)
const NEW_ARRIVAL_CLUBS = [
  'Real Madrid', 'Barcelona', 'Manchester United', 'Manchester City',
  'Liverpool', 'Arsenal', 'Chelsea', 'Bayern Munich', 'Paris Saint-Germain',
  'Juventus', 'AC Milan', 'Inter Milan', 'Atletico Madrid', 'Tottenham',
];

const NewArrivals = () => {
  const { navigate, catalogLoaded } = useStore();
  // Pick the 26/27 home jersey for each major club (fall back to 25/26 if no 26/27)
  const items = useMemo(() => {
    const picked = [];
    for (const clubName of NEW_ARRIVAL_CLUBS) {
      // Try 26/27 home first
      let match = PRODUCTS.find(p =>
        p.clubName === clubName &&
        p.variant === 'Home' &&
        !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
        !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve &&
        (p.season === '26/27' || p.season === '2026/27' || p.season === '2026/2027')
      );
      // Fall back to 25/26
      if (!match) {
        match = PRODUCTS.find(p =>
          p.clubName === clubName &&
          p.variant === 'Home' &&
          !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
          !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve &&
          (p.season === '25/26' || p.season === '2025/26')
        );
      }
      if (match) picked.push(match);
      if (picked.length >= 8) break;
    }
    return picked;
  }, [catalogLoaded]);

  if (items.length === 0) return null;

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Just dropped — 26/27 season
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">New Arrivals</h2>
            <p className="text-white/40 text-xs mt-2">Next-season home kits from the world's biggest clubs</p>
          </div>
          <button onClick={() => navigate('shop', { filter: { isNew: true } })}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-lime-400 text-sm uppercase tracking-widest">
            See All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

const PromoBanner = () => {
  const { navigate } = useStore();
  // Find real Barcelona + Real Madrid home jerseys from catalog
  const featured = useMemo(() => {
    const findHomeJersey = (clubName) => {
      const candidates = PRODUCTS.filter(p =>
        p.clubName === clubName && !p.isRetro && !p.isKids && p.variant === 'Home'
      );
      candidates.sort((a, b) => {
        const aRecent = (a.season || '').includes('25') || (a.season || '').includes('26') ? 0 : 1;
        const bRecent = (b.season || '').includes('25') || (b.season || '').includes('26') ? 0 : 1;
        return aRecent - bRecent;
      });
      return candidates[0];
    };
    return {
      left: findHomeJersey('Barcelona'),
      right: findHomeJersey('Real Madrid'),
    };
  }, []);

  return (
    <section className="relative bg-lime-400 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <div className="text-[20rem] font-black tracking-tighter">GOAL</div>
      </div>
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-black/60 text-xs uppercase tracking-[0.4em] mb-3">Limited time</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-black tracking-tighter leading-none">
            Buy 2,<br />get 1 free.
          </h2>
          <p className="mt-4 text-black/70 max-w-md">
            Stock up on the kit you love and a second for game day. Use code <span className="font-bold">B2G1</span> at checkout — third jersey on us.
          </p>
          <button onClick={() => navigate('shop')}
            className="mt-6 bg-black hover:bg-zinc-800 text-white px-7 py-4 text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2">
            Shop the drop <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative flex justify-center md:justify-end gap-4 items-center">
          {featured.left && (
            <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity }}
              className="w-40 md:w-56 cursor-pointer pointer-events-auto"
              onClick={() => navigate('product', { productId: featured.left.id })}>
              <img src={featured.left.image} alt={featured.left.clubName}
                className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
          )}
          {featured.right && (
            <motion.div animate={{ rotate: [5, -5, 5] }} transition={{ duration: 8, repeat: Infinity }}
              className="w-40 md:w-56 cursor-pointer pointer-events-auto"
              onClick={() => navigate('product', { productId: featured.right.id })}>
              <img src={featured.right.image} alt={featured.right.clubName}
                className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const ShopByLeague = () => {
  const { navigate } = useStore();
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="mb-10">
          <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2">By competition</div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Shop by League</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3">
          {LEAGUES.map((l, i) => (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate('shop', { filter: { league: l.name } })}
              className="group relative bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-lime-400/40 p-5 md:p-7 text-left transition-all overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 text-[6rem] md:text-[8rem] font-black text-white/[0.03] leading-none">
                {l.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="relative">
                <div className="text-xs text-white/40 uppercase tracking-widest">{l.region}</div>
                <div className="mt-2 text-xl md:text-2xl font-black text-white uppercase tracking-tight">{l.name}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">{l.count} teams</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPlayers = () => {
  const { navigate } = useStore();
  return (
    <section className="bg-zinc-950 py-16 md:py-24 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
              <Award className="w-3 h-3" /> The greats
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Shop By Player</h2>
            <p className="text-white/50 text-sm mt-2">Tap a player to browse every jersey from his career</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {PLAYERS.slice(0, 6).map((player, i) => {
            // Map full team name to JERSEY_DESIGNS key for SVG fallback
            const clubKeyMap = {
              'Real Madrid': 'rma', 'Barcelona': 'bar', 'Manchester City': 'mci',
              'Manchester United': 'mun', 'Liverpool': 'liv', 'Arsenal': 'ars',
              'Paris Saint-Germain': 'psg', 'Bayern Munich': 'bay', 'Al-Nassr': 'alh',
              'Inter Miami': 'mia', 'Santos': 'bra', 'Tottenham': 'tot',
            };
            const svgKey = clubKeyMap[player.club] || 'rma';
            return (
              <motion.button
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('shop', { filter: { playerCareer: player.id, careerHistory: player.career, careerTeams: player.careerTeams } })}
                className="group bg-black aspect-[3/4] relative overflow-hidden border border-white/5 hover:border-lime-400/50 transition-colors"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <JerseySVG club={svgKey} view="back"
                    playerName={player.name.toUpperCase()}
                    playerNumber={player.number}
                    className="w-[80%] h-[80%] group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="text-lime-400 text-[10px] uppercase tracking-widest font-bold">#{player.number}</div>
                  <div className="text-white font-black text-lg uppercase tracking-tight">{player.name}</div>
                  <div className="text-white/40 text-xs">{player.careerTeams.slice(0, 2).join(' · ')}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Specific best-selling jerseys 2025 — based on Statista, Diario AS, Euromericas Sport Marketing
// Format: each entry describes what to match against. The matcher picks the closest product available.
const BEST_SELLING_TARGETS = [
  // The 25/26 Real Madrid Home (Mbappé kit) — Real Madrid 3.13M sold in 2025
  { clubName: 'Real Madrid', variant: 'Home', season: '25/26', label: 'Most sold globally' },
  // The 25/26 Barcelona Home (Yamal/Lewandowski kit) — Barcelona 2.94M
  { clubName: 'Barcelona', variant: 'Home', season: '25/26', label: 'Yamal effect' },
  // Argentina Home — World Cup winners, Messi 3 stars
  { clubName: 'Argentina', variant: 'Home', season: '24/25', label: 'World Champions' },
  // Inter Miami Home — Messi MLS jersey, fastest seller in MLS history
  { clubName: 'Inter Miami', variant: 'Home', season: '25/26', label: 'Messi MLS' },
  // PSG Home 25/26
  { clubName: 'Paris Saint-Germain', variant: 'Home', season: '25/26', label: 'European champs' },
  // Man Utd Home (despite poor form, top PL seller — Bruno effect)
  { clubName: 'Manchester United', variant: 'Home', season: '25/26', label: 'Top PL seller' },
  // Liverpool Home
  { clubName: 'Liverpool', variant: 'Home', season: '25/26', label: "Salah & Van Dijk" },
  // Portugal — Ronaldo
  { clubName: 'Portugal', variant: 'Home', season: '24/25', label: 'Ronaldo Portugal' },
];

const TOP_SELLING_CLUBS = BEST_SELLING_TARGETS.map(t => t.clubName); // backward compat

const BestSellers = () => {
  const { navigate } = useStore();
  // Match each best-seller target to a specific product, with smart fallback
  const items = useMemo(() => {
    const picked = [];
    for (const target of BEST_SELLING_TARGETS) {
      // Try EXACT match: club + variant + season + no retro/kids/special
      let candidates = PRODUCTS.filter(p =>
        p.clubName === target.clubName &&
        p.variant === target.variant &&
        !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
        !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve &&
        (p.season === target.season || p.season === '20' + target.season || p.season === '20' + target.season.replace('/', '/20'))
      );
      // Relax: drop the season requirement, prefer most recent
      if (candidates.length === 0) {
        candidates = PRODUCTS.filter(p =>
          p.clubName === target.clubName &&
          p.variant === target.variant &&
          !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
          !p.isTraining && !p.isGoalkeeper && !p.isSpecial && !p.isLongSleeve
        );
        candidates.sort((a, b) => {
          const ay = parseInt((a.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
          const by = parseInt((b.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
          return by - ay;
        });
      }
      if (candidates.length > 0) {
        picked.push(candidates[0]);
      }
      if (picked.length >= 8) break;
    }
    return picked;
  }, []);

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
              <Flame className="w-3 h-3" /> Top sellers worldwide
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Best Sellers</h2>
            <p className="text-white/40 text-xs mt-2">The kits flying off shelves this season</p>
          </div>
          <button onClick={() => navigate('shop')}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-lime-400 text-sm uppercase tracking-widest">
            See All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

const RetroSection = () => {
  const { navigate } = useStore();
  return (
    <section className="relative bg-zinc-950 py-16 md:py-24 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,#ca8a04_0%,transparent_50%)]" />
      </div>
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-amber-500 text-xs uppercase tracking-[0.4em] mb-3">The Vault</div>
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9]">
            Retro <span className="italic font-serif font-normal text-amber-500">classics</span>.
          </h2>
          <p className="mt-6 text-white/60 max-w-md">
            Iconic kits from the eras that defined football. Maradona '86. Ronaldinho's Barça. Istanbul 2005.
            Reborn for a new generation.
          </p>
          <button onClick={() => navigate('shop', { filter: { type: 'Retro' } })}
            className="mt-7 bg-amber-500 hover:bg-amber-400 text-black px-7 py-4 text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2">
            Enter the vault <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PRODUCTS.filter(p => p.type === 'Retro').slice(0, 6).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="aspect-[3/4] bg-zinc-900 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('product', { productId: p.id })}
            >
              <JerseySVG club={p.club} imageUrl={p.image} className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const pillars = [
    { icon: Truck, title: 'Worldwide shipping', text: 'Free over $99. Tracked from Toronto to your door.' },
    { icon: Shield, title: 'Quality you can feel', text: 'Premium polyester, embroidered crests, heat-pressed sponsors.' },
    { icon: RotateCcw, title: '30-day returns', text: 'Not the right fit? Send it back. No questions asked.' },
    { icon: Award, title: 'Built for fans', text: 'Run by a football fan, for football fans. WhatsApp us anytime.' },
  ];
  return (
    <section className="bg-black py-16 md:py-24 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="text-lime-400 text-xs uppercase tracking-[0.4em] mb-2">Why MehdiSports</div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">No bullshit promises</h2>
          <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">
            We're not a faceless drop-shipper. Real founder, real shipping, real returns.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-zinc-950 border border-white/5 p-6 hover:border-white/15 transition-colors">
              <p.icon className="w-6 h-6 text-lime-400 mb-4" />
              <div className="text-white font-bold text-base">{p.title}</div>
              <p className="mt-2 text-white/60 text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    // Capture email to Formspree → lands in inbox tagged as newsletter signup
    try {
      await fetch('https://formspree.io/f/xaqkobko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `📧 New Email Signup — ${email}`,
          type: 'newsletter_signup',
          source: 'homepage_newsletter',
          email: email,
          discount_code_given: 'WELCOME10',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Newsletter capture failed:', err);
    }
    setDone(true);
  };

  return (
    <section className="bg-lime-400 py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tighter leading-none">
            First in line.<br />
            <span className="italic font-serif font-normal">Always.</span>
          </h2>
          <p className="mt-4 text-black/70 max-w-md">
            Get early access to drops, restock alerts, and a 10% welcome code.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          {!done ? (
            <>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-black/10 border-2 border-black text-black placeholder:text-black/40 px-5 py-4 outline-none focus:bg-black focus:text-white focus:placeholder:text-white/40 transition-colors" />
              <button type="submit" className="bg-black hover:bg-zinc-800 text-white px-7 py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 text-black font-bold py-4">
              <Check className="w-5 h-5" /> Welcome to the club. Check your inbox.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

// ---------- HOMEPAGE --------------------------------------------------------
const HomePage = () => (
  <>
    <Hero />
    <TrustBar />
    <NewArrivals />
    <TrendingClubs />
    <WorldCup2026 />
    <PromoBanner />
    <FeaturedPlayers />
    <RetroSection />
    <RecentlyViewedSection currentProductId={null} />
    <Testimonials />
    <Newsletter />
  </>
);

// ---------- WORLD CUP 2026 SECTION ----------------------------------------
// 2026 FIFA World Cup — only teams that are actually qualified or strongly trending
// Italy DID NOT qualify (failed to qualify in past two cycles too) — removed
const WORLD_CUP_TEAMS = [
  { name: 'Argentina', emoji: '🇦🇷' },
  { name: 'Brazil', emoji: '🇧🇷' },
  { name: 'France', emoji: '🇫🇷' },
  { name: 'England', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Portugal', emoji: '🇵🇹' },
  { name: 'Spain', emoji: '🇪🇸' },
  { name: 'Germany', emoji: '🇩🇪' },
  { name: 'Netherlands', emoji: '🇳🇱' },
  { name: 'Mexico', emoji: '🇲🇽' },
  { name: 'USA', emoji: '🇺🇸' },
  { name: 'Canada', emoji: '🇨🇦' },
  { name: 'Morocco', emoji: '🇲🇦' },
  { name: 'Japan', emoji: '🇯🇵' },
  { name: 'Croatia', emoji: '🇭🇷' },
  { name: 'Belgium', emoji: '🇧🇪' },
  { name: 'South Korea', emoji: '🇰🇷' },
];

const WorldCup2026 = () => {
  const { navigate, catalogLoaded } = useStore();
  // For each nation, find a 25/26 or recent home jersey
  const items = useMemo(() => {
    const picked = [];
    for (const team of WORLD_CUP_TEAMS) {
      const candidates = PRODUCTS.filter(p =>
        p.clubName === team.name &&
        p.variant === 'Home' &&
        !p.isRetro && !p.isKids && !p.isShorts && !p.isTracksuit &&
        !p.isTraining && !p.isGoalkeeper && !p.isLongSleeve
      );
      // Sort by recency
      candidates.sort((a, b) => {
        const ay = parseInt((a.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
        const by = parseInt((b.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
        return by - ay;
      });
      if (candidates.length > 0) {
        picked.push({ ...team, product: candidates[0] });
      }
      if (picked.length >= 12) break;
    }
    return picked;
  }, [catalogLoaded]);

  if (items.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-br from-zinc-950 via-black to-zinc-950 py-20 md:py-28 overflow-hidden border-y border-white/5">
      {/* Massive WC background type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="text-[14rem] md:text-[22rem] font-black tracking-tighter leading-none">2026</div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-3 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
            <span className="text-lime-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">FIFA World Cup · Coming June 2026</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-none">
            Road To <span className="text-lime-400 italic font-serif font-normal">26.</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Wear the colors of your nation. Every World Cup contender's home kit, ready to ship.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {items.map((team, i) => (
            <motion.button
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              onClick={() => navigate('product', { productId: team.product.id })}
              className="group relative aspect-[4/5] overflow-hidden bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-lime-400/40 transition-colors"
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={team.product.image}
                  alt={team.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                <div className="text-2xl mb-1">{team.emoji}</div>
                <div className="text-white font-black uppercase tracking-tight text-base md:text-lg leading-tight">{team.name}</div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">{team.product.season || '25/26'}</span>
                  <span className="text-lime-400 text-xs font-bold">${(team.product.salePrice || team.product.price).toFixed(2)}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <button onClick={() => navigate('shop', { filter: { league: 'International' } })}
            className="inline-flex items-center gap-2 bg-lime-400 hover:bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors">
            View All National Teams <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ---------- TRUST BAR — Sits above the fold for instant credibility -----------
const TrustBar = () => (
  <section className="bg-zinc-950 border-y border-white/5 py-6 md:py-8">
    <div className="max-w-[1600px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { icon: Truck, title: 'Free Shipping', sub: 'Worldwide on $99+' },
          { icon: Sparkles, title: 'Custom Print', sub: 'Name & number · +$10' },
          { icon: RotateCcw, title: '30-Day Returns', sub: 'No questions asked' },
          { icon: Lock, title: 'WhatsApp Support', sub: 'Real human, real fast' },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center flex-shrink-0">
              <b.icon className="w-4 h-4 md:w-5 md:h-5 text-lime-400" />
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm md:text-base leading-tight">{b.title}</div>
              <div className="text-white/50 text-[11px] md:text-xs leading-tight mt-0.5">{b.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- SHOP PAGE -------------------------------------------------------
const ShopPage = () => {
  const { route, catalogLoaded } = useStore();
  // Build a clean filter state from a route filter object (no carry-over from prev)
  const buildFilterState = (rf = {}) => ({
    league: rf.league || '',
    type: rf.type || '',
    version: rf.version || '',
    clubName: rf.clubName || '',
    size: '',
    priceMin: null,
    priceMax: rf.priceMax || 100,
    onSale: !!rf.onSale,
    isNew: !!rf.isNew,
    isBest: !!rf.isBest,
    wc2026: !!rf.wc2026,
    kidsOnly: !!rf.kidsOnly,
    careerTeams: rf.careerTeams || null,
    careerHistory: rf.careerHistory || null,
    playerCareer: rf.playerCareer || null,
  });
  const [filters, setFilters] = useState(() => buildFilterState(route.filter));
  const [sort, setSort] = useState('featured');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  // When the route changes (user clicks a new category), FULLY REPLACE filter state
  // This prevents stale filter carry-over (e.g. league filter persisting after clicking a different nav link)
  useEffect(() => {
    setFilters(buildFilterState(route.filter));
    setPage(1);
  }, [route]);

  // Helper: extract starting year from a product's season string ("25/26" → 2025, "2025/26" → 2025, "1990" → 1990)
  const getSeasonStartYear = (seasonStr) => {
    if (!seasonStr) return null;
    // Pattern: 2025/26 → 2025
    let m = seasonStr.match(/^(\d{4})\//);
    if (m) return parseInt(m[1]);
    // Pattern: 25/26 → 2025
    m = seasonStr.match(/^(\d{2})\//);
    if (m) {
      const yy = parseInt(m[1]);
      return yy < 30 ? 2000 + yy : 1900 + yy;
    }
    // Single 4-digit year
    m = seasonStr.match(/^(\d{4})$/);
    if (m) return parseInt(m[1]);
    return null;
  };

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      // League filter — direct match
      if (filters.league && p.league !== filters.league) return false;

      // Jersey TYPE filter (Retro / Training Kit / Tracksuit / Shorts etc.)
      // Maps user-facing filter values to product flags/types
      if (filters.type) {
        if (filters.type === 'Retro' && !p.isRetro) return false;
        if (filters.type === 'Training Kit' && !p.isTraining) return false;
        if (filters.type === 'Tracksuit' && !p.isTracksuit) return false;
        if (filters.type === 'Shorts' && !p.isShorts) return false;
        if (filters.type === 'Goalkeeper' && !p.isGoalkeeper) return false;
        if (filters.type === 'Long Sleeve' && !p.isLongSleeve) return false;
        // For "Jersey" type — exclude special categories
        if (filters.type === 'Jersey' && (p.isRetro || p.isTraining || p.isTracksuit || p.isShorts)) return false;
      }

      // VERSION filter (Player Version / Fan Version / Kids) — checks product.variants
      if (filters.version) {
        if (!p.variants || !p.variants.includes(filters.version)) return false;
      }

      // CLUB filter
      if (filters.clubName && p.clubName !== filters.clubName) return false;

      // BOOLEAN filters
      if (filters.onSale && !p.salePrice) return false;
      if (filters.isNew && !p.isNew) return false;
      if (filters.isBest && !p.isBest) return false;

      // World Cup 2026 filter — qualified national teams only, current/upcoming home kits
      if (filters.wc2026) {
        const wcTeams = ['Argentina','Brazil','France','England','Portugal','Spain','Germany','Netherlands','Mexico','USA','Canada','Morocco','Japan','Croatia','Belgium','South Korea','Senegal','Australia','Switzerland','Denmark','Uruguay','Colombia','Ecuador','Norway'];
        if (!wcTeams.includes(p.clubName)) return false;
        if (p.variant !== 'Home') return false;
        if (p.isRetro || p.isKids || p.isShorts || p.isTracksuit || p.isTraining || p.isGoalkeeper || p.isLongSleeve) return false;
      }

      // Kids-only filter — show all jerseys with a Kids variant available
      if (filters.kidsOnly) {
        if (!p.isKids && !(p.variants && p.variants.includes('Kids'))) return false;
      }

      // Player CAREER filter (when user clicks a player) — strict team + season window
      if (filters.careerHistory && Array.isArray(filters.careerHistory)) {
        const seasonYear = getSeasonStartYear(p.season);
        const matches = filters.careerHistory.some(stint => {
          if (stint.team !== p.clubName) return false;
          if (seasonYear == null) return true;
          return seasonYear >= stint.fromYear && seasonYear < stint.toYear;
        });
        if (!matches) return false;
      } else if (filters.careerTeams && Array.isArray(filters.careerTeams)) {
        if (!filters.careerTeams.includes(p.clubName)) return false;
      }

      // PRICE filter
      const price = p.salePrice || p.price;
      if (filters.priceMax != null && price > filters.priceMax) return false;
      if (filters.priceMin != null && price < filters.priceMin) return false;

      return true;
    });

    // Sort match kits FIRST for a club page (Home > Away > Third > Goalkeeper > Training > Pre-Match)
    if (filters.clubName) {
      const variantOrder = { 'Home': 0, 'Away': 1, 'Third': 2, 'Fourth': 3, 'Goalkeeper': 4 };
      result.sort((a, b) => {
        // Match kits before training/special
        const aMatch = (!a.isTraining && !a.isShorts && !a.isTracksuit) ? 0 : 1;
        const bMatch = (!b.isTraining && !b.isShorts && !b.isTracksuit) ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
        // Then by variant order
        const av = variantOrder[a.variant] ?? 5;
        const bv = variantOrder[b.variant] ?? 5;
        if (av !== bv) return av - bv;
        // Then by recency (most recent season first)
        const ay = parseInt((a.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
        const by = parseInt((b.season || '0').replace(/\D/g, '').slice(0, 4)) || 0;
        return by - ay;
      });
    }

    switch (sort) {
      case 'price-low': result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case 'price-high': result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [filters, sort, catalogLoaded]);

  // Pre-compute counts per league + club for filter labels (so users see "Premier League (412)")
  const leagueCounts = useMemo(() => {
    const m = {};
    PRODUCTS.forEach(p => { m[p.league] = (m[p.league] || 0) + 1; });
    return m;
  }, [catalogLoaded]);
  const clubCounts = useMemo(() => {
    const m = {};
    PRODUCTS.forEach(p => { m[p.clubName] = (m[p.clubName] || 0) + 1; });
    return m;
  }, [catalogLoaded]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">League</div>
        <div className="space-y-2">
          {['', ...Array.from(new Set(PRODUCTS.map(p => p.league))).sort()].map(l => (
            <button key={l || 'all'} onClick={() => setFilters(f => ({ ...f, league: l }))}
              className={`flex justify-between items-center w-full text-left text-sm py-1 ${filters.league === l ? 'text-lime-400 font-semibold' : 'text-white/70 hover:text-white'}`}>
              <span>{l || 'All Leagues'}</span>
              {l && <span className="text-white/30 text-xs">{leagueCounts[l] || 0}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-6">
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Fit</div>
        <div className="space-y-2">
          {[
            { val: false, label: 'All Sizes' },
            { val: true, label: 'Kids Only' },
          ].map(opt => (
            <button key={String(opt.val)} onClick={() => setFilters(f => ({ ...f, kidsOnly: opt.val }))}
              className={`block w-full text-left text-sm py-1 ${filters.kidsOnly === opt.val ? 'text-lime-400 font-semibold' : 'text-white/70 hover:text-white'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-6">
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Type</div>
        <div className="space-y-2">
          {[
            { val: '', label: 'All Types' },
            { val: 'Jersey', label: 'Match Jerseys' },
            { val: 'Retro', label: 'Retro' },
            { val: 'Training Kit', label: 'Training Kit' },
            { val: 'Tracksuit', label: 'Tracksuit' },
            { val: 'Shorts', label: 'Shorts' },
            { val: 'Goalkeeper', label: 'Goalkeeper' },
            { val: 'Long Sleeve', label: 'Long Sleeve' },
          ].map(opt => (
            <button key={opt.val || 'all'} onClick={() => setFilters(f => ({ ...f, type: opt.val }))}
              className={`block w-full text-left text-sm py-1 ${filters.type === opt.val ? 'text-lime-400 font-semibold' : 'text-white/70 hover:text-white'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-6">
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Club</div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {['', ...Array.from(new Set(PRODUCTS.map(p => p.clubName))).filter(Boolean).sort()].map(c => (
            <button key={c || 'all'} onClick={() => setFilters(f => ({ ...f, clubName: c }))}
              className={`flex justify-between items-center w-full text-left text-sm py-1 ${filters.clubName === c ? 'text-lime-400 font-semibold' : 'text-white/70 hover:text-white'}`}>
              <span className="truncate">{c || 'All Clubs'}</span>
              {c && <span className="text-white/30 text-xs flex-shrink-0 ml-2">{clubCounts[c] || 0}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-6">
        <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
          <span>Max Price</span>
          <span className="text-lime-400">${filters.priceMax}</span>
        </div>
        <input type="range" min="25" max="100" value={filters.priceMax}
          onChange={e => setFilters(f => ({ ...f, priceMax: +e.target.value }))}
          className="w-full accent-lime-400" />
      </div>

      <div className="border-t border-white/5 pt-6 space-y-3">
        {[
          { key: 'onSale', label: 'On Sale' },
          { key: 'isNew', label: 'New Arrivals' },
          { key: 'isBest', label: 'Best Sellers' },
        ].map(opt => (
          <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 border-2 ${filters[opt.key] ? 'border-lime-400 bg-lime-400' : 'border-white/30'} flex items-center justify-center`}>
              {filters[opt.key] && <Check className="w-3 h-3 text-black" />}
            </div>
            <input type="checkbox" checked={filters[opt.key]}
              onChange={e => setFilters(f => ({ ...f, [opt.key]: e.target.checked }))}
              className="sr-only" />
            <span className="text-sm text-white/70 group-hover:text-white">{opt.label}</span>
          </label>
        ))}
      </div>

      <button onClick={() => setFilters({
        league: '', type: '', version: '', clubName: '', size: '', priceMax: 200,
        onSale: false, isNew: false, isBest: false
      })}
        className="w-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 py-3 text-xs uppercase tracking-widest">
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      {/* Page header */}
      <div className="border-b border-white/5 pt-8 md:pt-12 pb-6">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {filters.playerCareer ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-lime-400 mb-2 flex items-center gap-2">
                <Award className="w-3 h-3" /> Player Career Collection
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
                {PLAYERS.find(pl => pl.id === filters.playerCareer)?.name || 'Player'}
              </h1>
              <p className="mt-2 text-white/60 text-sm">
                Every jersey from his career — {filters.careerTeams?.join(' · ')}
              </p>
              <p className="mt-1 text-white/40 text-xs">{filtered.length} products</p>
            </>
          ) : filters.wc2026 ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-lime-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" /> FIFA World Cup · June 2026
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
                Road To 26
              </h1>
              <p className="mt-2 text-white/60 text-sm">Home kits from every qualified nation</p>
              <p className="mt-1 text-white/40 text-xs">{filtered.length} products</p>
            </>
          ) : filters.kidsOnly ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">For the next generation</div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">Kids Jerseys</h1>
              <p className="mt-2 text-white/50 text-sm">{filtered.length} products</p>
            </>
          ) : filters.isNew ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-lime-400 mb-2">Just dropped</div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">New Arrivals</h1>
              <p className="mt-2 text-white/50 text-sm">{filtered.length} products</p>
            </>
          ) : filters.isBest ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-lime-400 mb-2">Most loved worldwide</div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">Best Sellers</h1>
              <p className="mt-2 text-white/50 text-sm">{filtered.length} products</p>
            </>
          ) : filters.onSale ? (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-lime-400 mb-2">Limited time</div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">Sale</h1>
              <p className="mt-2 text-white/50 text-sm">{filtered.length} products</p>
            </>
          ) : (
            <>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">All Products</div>
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
                {filters.league || filters.type || filters.clubName || 'Shop All'}
              </h1>
              <p className="mt-2 text-white/50 text-sm">{filtered.length} products</p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Sort / filter bar */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setFilterPanelOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <div className="hidden lg:block text-white/40 text-sm">{filtered.length} results</div>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="bg-zinc-900 border border-white/10 text-white text-sm px-4 py-2 outline-none focus:border-lime-400">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 md:py-24 max-w-md mx-auto">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <div className="text-white text-xl font-black uppercase mb-2">No matches found</div>
                <p className="text-white/50 text-sm mb-6">Try removing a filter or browsing our full collection below.</p>
                <button onClick={() => setFilters(buildFilterState({}))}
                  className="bg-lime-400 hover:bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors mb-8">
                  Clear All Filters
                </button>
                <div className="pt-6 border-t border-white/5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Or try one of these</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { label: 'New 26/27', filter: { isNew: true } },
                      { label: 'World Cup', filter: { wc2026: true } },
                      { label: 'Retro Vault', filter: { type: 'Retro' } },
                      { label: 'Best Sellers', filter: { isBest: true } },
                    ].map(l => (
                      <button key={l.label} onClick={() => navigate('shop', { filter: l.filter })}
                        className="px-4 py-2 border border-white/10 text-xs text-white hover:border-lime-400 hover:text-lime-400 uppercase tracking-wide transition-colors">
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                  {filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Pagination */}
                {filtered.length > PER_PAGE && (
                  <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
                    <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={page === 1}
                      className="px-5 py-2.5 border border-white/10 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <div className="text-xs text-white/60 tracking-wide">
                      Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{Math.ceil(filtered.length / PER_PAGE)}</span>
                      <span className="hidden md:inline text-white/30 ml-3">· {filtered.length.toLocaleString()} results</span>
                    </div>
                    <button onClick={() => { setPage(p => Math.min(Math.ceil(filtered.length / PER_PAGE), p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={page >= Math.ceil(filtered.length / PER_PAGE)}
                      className="px-5 py-2.5 border border-white/10 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFilterPanelOpen(false)} className="fixed inset-0 bg-black/70 z-50" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85%] bg-zinc-950 z-50 overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-zinc-950">
                <h3 className="text-white font-bold uppercase tracking-wide">Filters</h3>
                <button onClick={() => setFilterPanelOpen(false)} className="text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5">
                <FilterPanel />
                <button onClick={() => setFilterPanelOpen(false)}
                  className="w-full bg-lime-400 text-black py-4 font-bold uppercase tracking-widest mt-6">
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------- RECENTLY VIEWED SECTION (Used on Product Detail Page) -----------
const RecentlyViewedSection = ({ currentProductId }) => {
  const { recentlyViewed } = useStore();
  // Exclude the current product from "recently viewed"
  const items = recentlyViewed
    .filter(id => id !== currentProductId)
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-16 md:mt-20">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <div className="text-lime-400 text-[10px] uppercase tracking-[0.3em] mb-1">Picking up where you left off</div>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">Recently Viewed</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

// ---------- PRODUCT DETAIL PAGE ---------------------------------------------
const ProductPage = () => {
  const { route, addToCart, toggleWishlist, wishlist, navigate, trackView, catalogLoaded } = useStore();
  const product = PRODUCTS.find(p => p.id === route.productId);

  // While catalog is loading, show a skeleton
  if (!catalogLoaded && !product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm uppercase tracking-widest animate-pulse">Loading jersey...</div>
      </div>
    );
  }

  // Genuine 404 — product ID doesn't exist (e.g., bad bookmark)
  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-[8rem] md:text-[12rem] font-black leading-none text-lime-400 tracking-tighter">404</div>
          <h1 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight mb-3">Jersey Not Found</h1>
          <p className="text-white/50 mb-8">This jersey isn't in our inventory, or the link is broken.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('shop')}
              className="bg-lime-400 hover:bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors">
              Browse Shop
            </button>
            <button onClick={() => navigate('home')}
              className="border border-white/10 hover:border-white text-white px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  const club = CLUBS.find(c => c.id === product.club);

  const [size, setSize] = useState('M');
  // Variant: Men's or Kids only (no Player/Fan distinction)
  const hasKidsVariant = product.variants && product.variants.includes('Kids');
  const [selectedVariant, setSelectedVariant] = useState("Men's");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState('front');
  const [playerName, setPlayerName] = useState(route.prefillPlayer?.name || '');
  const [playerNumber, setPlayerNumber] = useState(route.prefillPlayer?.number || '');
  const [zoom, setZoom] = useState(false);
  const [addBadge, setAddBadge] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  // Track this product view for "Recently viewed" section
  useEffect(() => {
    if (product?.id) trackView(product.id);
  }, [product?.id]);

  // Live viewer count — psychologically realistic (8-34 viewers, fluctuates every few seconds)
  const [viewerCount, setViewerCount] = useState(() => {
    const seed = product.id.charCodeAt(1) || 12;
    return 8 + (seed % 27);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(v => {
        const drift = Math.floor(Math.random() * 5) - 2;
        return Math.max(6, Math.min(38, v + drift));
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Recent sales social proof — "X sold in last 24h"
  const recentSales = useMemo(() => {
    const seed = (product.id.charCodeAt(1) || 0) + (product.isBest ? 18 : 0) + (product.isNew ? 12 : 0);
    return 3 + (seed % 22);
  }, [product.id, product.isBest, product.isNew]);

  // Pricing — uses product price directly (no variant markup since training/jersey is set in catalog)
  // Kids variant gets a small discount
  const basePrice = product.salePrice || product.price;
  const price = selectedVariant === 'Kids' ? Math.max(29.99, basePrice - 10) : basePrice;
  const customizationFee = (playerName || playerNumber) ? 10 : 0;
  const badgeFee = addBadge ? 7 : 0;
  const total = (price + customizationFee + badgeFee) * qty;

  // Related products — same team or same league
  const related = PRODUCTS.filter(p => p.club === product.club && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-black min-h-screen pb-32 lg:pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6 text-xs text-white/40 flex items-center gap-2 flex-wrap">
        <button onClick={() => navigate('home')} className="hover:text-lime-400">Home</button>
        <span>/</span>
        <button onClick={() => navigate('shop')} className="hover:text-lime-400">Shop</button>
        <span>/</span>
        <button onClick={() => navigate('shop', { filter: { clubName: product.clubName } })} className="hover:text-lime-400">{product.clubName}</button>
        <span>/</span>
        <span className="text-white/70 truncate">{product.kit} {product.version}</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6 grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image — single, large, premium presentation */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-zinc-950 aspect-square relative overflow-hidden rounded-sm group">
            {/* Sale badge */}
            {product.salePrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase z-10">
                Sale
              </div>
            )}
            {/* New / Best Seller badge */}
            {!product.salePrice && product.isNew && (
              <div className="absolute top-4 left-4 bg-lime-400 text-black text-xs font-bold px-3 py-1 uppercase z-10">
                New
              </div>
            )}
            {!product.salePrice && !product.isNew && product.isBest && (
              <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase z-10">
                Best Seller
              </div>
            )}

            {/* Zoom button */}
            <button onClick={() => setZoom(true)} className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-lime-400 hover:text-black backdrop-blur p-2 text-white rounded-full transition-colors" aria-label="Zoom image">
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Subtle radial glow background */}
            <div className="absolute inset-0 bg-gradient-radial from-white/[0.04] via-transparent to-transparent pointer-events-none" />

            {/* The single product image — large, centered, premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center p-6 md:p-10"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_25px_80px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-transform duration-700"
                  onError={(e) => {
                    // If real image fails, swap to SVG fallback
                    e.target.outerHTML = `<div class="w-full h-full flex items-center justify-center text-white/30 text-sm">Image unavailable</div>`;
                  }}
                />
              ) : (
                <JerseySVG club={product.club} view="front"
                  className="w-full max-w-md drop-shadow-[0_25px_80px_rgba(190,242,100,0.15)]" />
              )}
            </motion.div>
          </div>

          {/* Single inventory image — no fake thumbnails */}
          {/* If multi-image support is added later, thumbnails go here */}
        </div>

        {/* Product info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-lime-400">{product.league}</span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{product.season} Season</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-white/40 text-sm">
            <Star className="w-4 h-4" />
            <span>Be the first to review</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-black text-white">${price.toFixed(2)}</span>
            {product.salePrice && <span className="text-lg text-white/40 line-through">${product.price.toFixed(2)}</span>}
            {product.salePrice && <span className="text-sm text-lime-400 font-semibold">Save ${(product.price - product.salePrice).toFixed(2)}</span>}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
            <span>or 4 × ${(price / 4).toFixed(2)} with</span>
            <span className="font-bold text-white">Klarna</span>
          </div>

          {/* Stock + Urgency Stack */}
          <div className="mt-6 space-y-2.5">
            {/* In stock indicator */}
            <div className="flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <>
                  <div className="relative flex h-2 w-2">
                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                    <div className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                  </div>
                  <span className="text-lime-400 font-semibold">In stock & ready to ship</span>
                </>
              ) : (
                <span className="text-red-400 font-semibold">Out of stock</span>
              )}
            </div>

            {/* Low stock warning — only shown when stock is actually low */}
            {product.stock > 0 && product.stock < 10 && (
              <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-400/5 border border-orange-400/20 px-3 py-2 mt-3">
                <span className="text-base">⚠️</span>
                <span className="font-semibold">Only {product.stock} left in stock — order soon</span>
              </div>
            )}
          </div>

          {/* Variant selector — Men's only, or Men's + Kids if catalog has Kids version */}
          <div className="mt-8 space-y-6">
            {hasKidsVariant && (
              <div>
                <div className="flex justify-between mb-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60">Fit</div>
                  <span className="text-xs text-lime-400">{selectedVariant}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Men's", "Kids"].map(v => {
                    const vPrice = v === 'Kids' ? Math.max(29.99, product.price - 10) : product.price;
                    return (
                      <button key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`border-2 p-3 text-left transition-colors ${selectedVariant === v ? 'border-lime-400 bg-lime-400/10' : 'border-white/10 hover:border-white/30'}`}>
                        <div className="text-sm text-white font-semibold">{v}</div>
                        <div className="text-[11px] text-white/50 mt-0.5">{v === 'Kids' ? 'Youth sizes' : 'Standard'}</div>
                        <div className="text-xs text-lime-400 font-bold mt-1">${vPrice.toFixed(2)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">Size — {size}</div>
                <button onClick={() => setSizeGuideOpen(true)} className="text-xs text-lime-400 underline">Size guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`py-3 border-2 text-sm font-semibold transition-colors ${size === s ? 'border-lime-400 bg-lime-400 text-black' : 'border-white/10 text-white hover:border-white/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div className="border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white">Custom Print</div>
                <span className="text-xs text-lime-400 font-bold">+$10</span>
              </div>

              {/* Live preview — shows how name + number will look on the back */}
              {(playerName || playerNumber) && (
                <div className="mb-4 bg-zinc-950 border border-white/10 px-4 py-5 flex flex-col items-center">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">Preview</div>
                  <div className="font-black uppercase text-white tracking-[0.15em] text-base md:text-lg">
                    {playerName ? playerName.toUpperCase() : '—'}
                  </div>
                  <div className="font-black text-white text-5xl md:text-6xl leading-none mt-1">
                    {playerNumber || '##'}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <input value={playerName} onChange={e => setPlayerName(e.target.value)}
                  maxLength={12}
                  placeholder="NAME"
                  className="col-span-2 bg-black border border-white/10 text-white px-3 py-2.5 text-sm uppercase tracking-widest outline-none focus:border-lime-400 placeholder:text-white/30" />
                <input value={playerNumber} onChange={e => setPlayerNumber(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="##"
                  className="bg-black border border-white/10 text-white px-3 py-2.5 text-sm text-center font-bold outline-none focus:border-lime-400 placeholder:text-white/30" />
              </div>
              <div className="mt-3 text-[11px] text-white/40">Adds 2 days to delivery. Final once printed.</div>
            </div>

            {/* Badge */}
            <label className="flex items-start gap-3 cursor-pointer border border-white/10 p-4 hover:border-white/30">
              <input type="checkbox" checked={addBadge} onChange={e => setAddBadge(e.target.checked)} className="sr-only" />
              <div className={`mt-0.5 w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center ${addBadge ? 'border-lime-400 bg-lime-400' : 'border-white/30'}`}>
                {addBadge && <Check className="w-3 h-3 text-black" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">Add competition badge</span>
                  <span className="text-lime-400 text-xs font-bold">+$7</span>
                </div>
                <div className="text-[11px] text-white/40 mt-1">Champions League, Premier League, La Liga patches available.</div>
              </div>
            </label>

            {/* Qty + Add */}
            <div className="flex gap-3">
              <div className="flex items-center border border-white/10">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 text-white hover:bg-white/5"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center text-white font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-3 text-white hover:bg-white/5"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => addToCart(product, { size, qty, playerName, playerNumber, addBadge, variant: selectedVariant, unitPrice: price })}
                className="flex-1 bg-lime-400 hover:bg-white text-black px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-3">
                <ShoppingBag className="w-4 h-4" /> Add to bag — ${total.toFixed(2)}
              </button>
              <button onClick={() => toggleWishlist(product.id)}
                className={`border-2 p-4 transition-colors ${isWishlisted ? 'border-lime-400 bg-lime-400/10' : 'border-white/10 hover:border-white/30'}`}>
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-lime-400 text-lime-400' : 'text-white'}`} />
              </button>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center border-y border-white/5 py-5">
            <div className="text-xs text-white/60">
              <Truck className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
              Free over $99
            </div>
            <div className="text-xs text-white/60">
              <RotateCcw className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
              30-day returns
            </div>
            <div className="text-xs text-white/60">
              <Shield className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
              Quality stitching
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 space-y-5">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/60">Description</h2>
            <p className="text-white/70 leading-relaxed">
              {product.isRetro
                ? `Iconic ${product.season} ${product.clubName} kit, faithfully recreated with premium fabric and era-accurate styling. A tribute to one of football's defining moments — built to be worn, not just collected.`
                : product.isTraining
                ? `The ${product.season} ${product.clubName} training top. Designed for active wear with breathable sweat-wicking fabric and an athletic fit that moves with you.`
                : product.isTracksuit
                ? `The ${product.season} ${product.clubName} tracksuit. Premium polyester construction with a tailored athletic cut — equally at home on the training pitch or off-duty.`
                : product.isShorts
                ? `Matching ${product.season} ${product.clubName} shorts. Lightweight, breathable, and built for full range of motion.`
                : `The ${product.season} ${product.clubName} ${(product.kit || 'home').toLowerCase()} kit. Premium quality stitching, breathable lightweight fabric, and a tailored athletic fit built for matchday and beyond.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 pt-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Fabric</div>
                <ul className="text-sm text-white/70 space-y-1.5">
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Lightweight polyester blend</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Sweat-wicking technology</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Breathable mesh panels</li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Construction</div>
                <ul className="text-sm text-white/70 space-y-1.5">
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> {product.isRetro ? 'Vintage-styled crest' : 'Embroidered club crest'}</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Heat-pressed sponsor</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Reinforced stitching</li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Fit</div>
                <ul className="text-sm text-white/70 space-y-1.5">
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Athletic match-day cut</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> True to size</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Training & casual wear</li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Care</div>
                <ul className="text-sm text-white/70 space-y-1.5">
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Machine wash cold</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Do not bleach</li>
                  <li className="flex gap-2"><span className="text-lime-400 mt-1">▸</span> Tumble dry low</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="mt-8 border border-white/10 divide-y divide-white/10">
            {[
              { icon: Truck, title: 'Shipping', text: 'Free standard shipping on orders over $99. 7-12 business days delivery.' },
              { icon: RotateCcw, title: 'Returns', text: '30-day free returns. Customized items final sale.' },
              { icon: Shield, title: 'Quality', text: 'Premium stitching and fabric. Quality-checked before shipping.' },
            ].map(item => (
              <details key={item.title} className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-lime-400" />
                    <span className="text-white text-sm font-semibold">{item.title}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/40 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-white/60">{item.text}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-20">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight mb-8">More from {product.clubName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewedSection currentProductId={product.id} />

      {/* MOBILE STICKY ADD-TO-CART BAR — only on mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 pb-safe">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-14 bg-zinc-900 rounded">
            <JerseySVG club={product.club} className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Size {size}</div>
            <div className="text-white font-bold text-lg leading-tight">${total.toFixed(2)}</div>
          </div>
          <button onClick={() => addToCart(product, { size, qty, playerName, playerNumber, addBadge, variant: selectedVariant, unitPrice: price })}
            className="bg-lime-400 hover:bg-white text-black px-5 py-3.5 font-bold uppercase tracking-widest text-xs flex items-center gap-2 active:scale-95 transition-transform">
            <ShoppingBag className="w-4 h-4" /> Add to Bag
          </button>
        </div>
      </div>

      {/* Zoom modal — uses the real product image */}
      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8" onClick={() => setZoom(false)}>
            <button className="absolute top-6 right-6 text-white hover:text-lime-400 z-10" aria-label="Close zoom"><X className="w-6 h-6" /></button>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <JerseySVG club={product.club} view="front" className="max-w-full max-h-full" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size guide modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50" onClick={() => setSizeGuideOpen(false)} />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 bg-zinc-950 border border-white/10 max-w-2xl w-full md:w-auto p-6 md:p-8 z-50 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase text-white">Size Guide</h3>
                <button onClick={() => setSizeGuideOpen(false)} className="text-white"><X className="w-5 h-5" /></button>
              </div>
              <table className="w-full text-sm text-white/80">
                <thead className="text-xs uppercase tracking-widest text-white/50 border-b border-white/10">
                  <tr><th className="py-2 text-left">Size</th><th className="py-2">Chest (in)</th><th className="py-2">Length (in)</th><th className="py-2">Fit</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[['XS','34–36','26','Slim'],['S','36–38','27','Slim'],['M','38–40','28','Regular'],['L','40–42','29','Regular'],['XL','42–44','30','Relaxed'],['XXL','44–46','31','Relaxed']].map(r => (
                    <tr key={r[0]}><td className="py-3 font-bold text-white">{r[0]}</td><td className="py-3 text-center">{r[1]}</td><td className="py-3 text-center">{r[2]}</td><td className="py-3 text-center">{r[3]}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-xs text-white/40">Player Version runs slim. Size up for relaxed fit.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------- CART DRAWER -----------------------------------------------------
const CartDrawer = () => {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, subtotal, navigate } = useStore();
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/70 z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-white font-black uppercase tracking-wide">
                Your Bag {cart.length > 0 && <span className="text-lime-400">({cart.length})</span>}
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-white"><X className="w-5 h-5" /></button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-white/20 mb-4" />
                <div className="text-white font-bold uppercase tracking-wide mb-2">Your bag is empty</div>
                <div className="text-white/40 text-sm mb-6">Find your kit. Custom name & number on every jersey.</div>
                <button onClick={() => { setCartOpen(false); navigate('shop'); }}
                  className="bg-lime-400 text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors mb-6">
                  Browse all jerseys
                </button>
                <div className="w-full pt-6 border-t border-white/5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Quick links</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: 'World Cup 2026', filter: { wc2026: true } },
                      { label: 'New Arrivals', filter: { isNew: true } },
                      { label: 'Retro', filter: { type: 'Retro' } },
                      { label: 'Kids', filter: { kidsOnly: true } },
                    ].map(l => (
                      <button key={l.label} onClick={() => { setCartOpen(false); navigate('shop', { filter: l.filter }); }}
                        className="border border-white/10 py-2.5 text-white hover:border-lime-400 hover:text-lime-400 uppercase tracking-wide transition-colors">
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.map(item => (
                    <div key={item.key} className="flex gap-3 pb-4 border-b border-white/5">
                      <button onClick={() => { setCartOpen(false); navigate('product', { productId: item.product.id }); }}
                        className="w-20 h-24 bg-black flex-shrink-0">
                        <JerseySVG club={item.product.club} imageUrl={item.product.image} className="w-full h-full" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-semibold leading-tight">{item.product.name}</div>
                        <div className="text-xs text-white/40 mt-1">Size {item.size} · {item.product.version}</div>
                        {(item.playerName || item.playerNumber) && (
                          <div className="text-xs text-lime-400 mt-1">
                            {item.playerName?.toUpperCase()} {item.playerNumber && `#${item.playerNumber}`}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-white/10">
                            <button onClick={() => updateQty(item.key, item.qty - 1)} className="px-2 py-1 text-white text-sm">−</button>
                            <span className="px-2 text-white text-sm">{item.qty}</span>
                            <button onClick={() => updateQty(item.key, item.qty + 1)} className="px-2 py-1 text-white text-sm">+</button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold text-sm">${((item.product.salePrice || item.product.price) * item.qty).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.key)} className="text-white/40 hover:text-red-400">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Shipping progress */}
                  <div className="bg-black p-4">
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      <span>{subtotal >= 99 ? '🎉 Free shipping unlocked!' : `Add $${(99 - subtotal).toFixed(2)} for free shipping`}</span>
                    </div>
                    <div className="h-1 bg-white/10 overflow-hidden">
                      <div className="h-full bg-lime-400 transition-all" style={{ width: `${Math.min(100, (subtotal / 99) * 100)}%` }} />
                    </div>
                  </div>

                  {/* Buy 2 Get 1 Free callout — shown when cart has 1 or 2 items */}
                  {cart.length > 0 && cart.length < 3 && (
                    <div className="bg-lime-400/10 border-y border-lime-400/30 p-4 text-center">
                      <div className="text-lime-400 text-xs uppercase tracking-[0.2em] font-bold">
                        {cart.length === 1 ? 'Add 2 more · Get 1 Free' : 'Add 1 more · Get the cheapest free'}
                      </div>
                      <div className="text-white/60 text-[11px] mt-1">Use code <span className="text-white font-bold">B2G1</span> at checkout</div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 p-5 space-y-4">
                  <div className="flex justify-between text-white">
                    <span className="text-sm text-white/60">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-white/40">Tax and shipping calculated at checkout.</div>
                  <button onClick={() => { setCartOpen(false); navigate('checkout'); }}
                    className="w-full bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => setCartOpen(false)}
                    className="w-full border border-white/10 text-white/70 hover:text-white py-3 text-sm uppercase tracking-widest">
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ---------- CHECKOUT PAGE ---------------------------------------------------
const CheckoutPage = () => {
  const { cart, subtotal, navigate } = useStore();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'Canada', phone: '' });
  const [shipping, setShipping] = useState('standard');
  const [discount, setDiscount] = useState({ code: '', applied: 0 });
  const [discountInput, setDiscountInput] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState('MS' + Math.floor(Math.random() * 900000 + 100000));
  const [paymentMethod, setPaymentMethod] = useState(''); // 'interac' | 'crypto'
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT'); // USDT | BTC | ETH
  const [submitting, setSubmitting] = useState(false);

  const shippingCost = subtotal >= 99 ? 0 : 9;
  const tax = (subtotal - discount.applied) * 0.13;
  const total = subtotal + shippingCost + tax - discount.applied;

  const applyDiscount = () => {
    const code = discountInput.toUpperCase();
    if ((code === 'B2G1' || code === 'BUY2GET1') && cart.length >= 3) {
      // Buy 2 Get 1 Free — the cheapest of every 3 items becomes free
      // Build a flat array of unit prices (one per qty)
      const units = [];
      cart.forEach(i => {
        const unitPrice = i.product.salePrice || i.product.price;
        for (let q = 0; q < i.qty; q++) units.push(unitPrice);
      });
      units.sort((a, b) => a - b); // cheapest first
      // For every 3 units in the cart, the cheapest is free
      const freeCount = Math.floor(units.length / 3);
      const freeValue = units.slice(0, freeCount).reduce((s, u) => s + u, 0);
      setDiscount({ code: 'B2G1', applied: freeValue });
    } else if ((code === 'B2G1' || code === 'BUY2GET1') && cart.length < 3) {
      alert('Buy 2 Get 1 Free requires at least 3 jerseys in your cart');
    } else if (code === 'WELCOME10') {
      setDiscount({ code: 'WELCOME10', applied: subtotal * 0.10 });
    } else {
      alert('Invalid code');
    }
  };

  // Submit the order — sends email to admin via Formspree-style endpoint
  // Replace YOUR_FORMSPREE_ID with your real Formspree form ID once you sign up at formspree.io (free, 50 submissions/mo)
  const submitOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setSubmitting(true);

    const orderPayload = {
      order_number: orderNumber,
      customer: info,
      items: cart.map(i => ({
        name: i.product.name,
        size: i.size,
        qty: i.qty,
        playerName: i.playerName || '—',
        playerNumber: i.playerNumber || '—',
        price: i.product.salePrice || i.product.price,
      })),
      subtotal: subtotal.toFixed(2),
      shipping: shippingCost.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.applied.toFixed(2),
      discount_code: discount.code || 'none',
      total: total.toFixed(2),
      payment_method: paymentMethod,
      crypto_currency: paymentMethod === 'crypto' ? cryptoCurrency : null,
      shipping_method: shipping,
      _subject: `New MehdiSports Order — ${orderNumber} — $${total.toFixed(2)}`,
    };

    try {
      // Formspree endpoint — sends order details to your inbox
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqkobko';

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error('Order submission failed');

      setOrderComplete(true);
    } catch (e) {
      alert('Something went wrong submitting your order. Please contact us on WhatsApp or email orders@mehdisports.com and we\'ll process your order manually.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-6" />
          <h1 className="text-3xl font-black uppercase text-white mb-3">Your bag is empty</h1>
          <p className="text-white/50 mb-6">Add some kits before checking out.</p>
          <button onClick={() => navigate('shop')} className="bg-lime-400 text-black px-6 py-3 font-bold uppercase tracking-widest">
            Shop now
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-black min-h-screen p-4 md:p-8">
        <div className="max-w-2xl mx-auto pt-12">
          <div className="bg-zinc-950 border border-lime-400/30 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-full mx-auto flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase text-white mb-3">Order placed</h1>
            <p className="text-white/60 mb-6">Thanks {info.firstName || 'champ'}. One more step to confirm.</p>

            <div className="bg-black p-5 mb-6">
              <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Order Number</div>
              <div className="text-2xl font-black text-lime-400 tracking-wider">{orderNumber}</div>
            </div>

            {/* Payment-specific instructions */}
            {paymentMethod === 'interac' && (
              <div className="bg-lime-400/10 border-2 border-lime-400/40 p-5 mb-6 text-left">
                <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-3">⚡ Complete your Interac e-Transfer</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white"><span className="text-white/60">Send to:</span><span className="font-bold">orders@mehdisports.com</span></div>
                  <div className="flex justify-between text-white"><span className="text-white/60">Amount:</span><span className="font-bold">${total.toFixed(2)} CAD</span></div>
                  <div className="flex justify-between text-white"><span className="text-white/60">Message:</span><span className="font-bold">Order {orderNumber}</span></div>
                  <div className="flex justify-between text-white"><span className="text-white/60">Security Q:</span><span className="font-bold">mehdisports</span></div>
                </div>
                <div className="text-[11px] text-white/50 mt-4 pt-3 border-t border-white/10">
                  Once we receive your transfer (1-2 hours), we'll send shipping confirmation. Your kit ships same-day if paid before 6PM EST.
                </div>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="bg-lime-400/10 border-2 border-lime-400/40 p-5 mb-6 text-left">
                <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-3">⚡ Complete your {cryptoCurrency} payment</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white"><span className="text-white/60">Currency:</span><span className="font-bold">{cryptoCurrency}</span></div>
                  <div className="flex justify-between text-white"><span className="text-white/60">Amount:</span><span className="font-bold">${(total * 0.95).toFixed(2)} USD</span></div>
                  <div className="flex justify-between text-white"><span className="text-white/60">Order ref:</span><span className="font-bold">{orderNumber}</span></div>
                </div>
                <div className="text-[11px] text-white/50 mt-4 pt-3 border-t border-white/10">
                  Check your email — we've sent your wallet address and exact crypto amount. Send within 30 minutes to lock in the rate. Ships within 1 hour of on-chain confirmation.
                </div>
              </div>
            )}

            <p className="text-white/60 text-sm mb-8">
              A confirmation with payment details has been sent to <span className="text-white">{info.email || 'your email'}</span>.
              Questions? Message us on WhatsApp: <span className="text-lime-400 font-bold">+1 (437) 259-5733</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate('order-tracking')}
                className="flex-1 border border-white/20 text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-white/5">
                Track order
              </button>
              <button onClick={() => navigate('home')}
                className="flex-1 bg-lime-400 text-black py-3 text-sm font-bold uppercase tracking-widest">
                Keep shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 grid lg:grid-cols-[1.3fr_1fr] gap-12">
        <div>
          {/* Steps */}
          <div className="flex items-center gap-2 mb-8 text-xs uppercase tracking-widest">
            {['Information', 'Shipping', 'Payment'].map((s, i) => (
              <React.Fragment key={s}>
                <span className={step >= i + 1 ? 'text-lime-400 font-bold' : 'text-white/30'}>{s}</span>
                {i < 2 && <ChevronRight className="w-3 h-3 text-white/20" />}
              </React.Fragment>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter mb-8">
            {step === 1 ? 'Your details' : step === 2 ? 'Delivery' : 'Payment'}
          </h1>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Email</label>
                <input type="email" required value={info.email} onChange={e => setInfo({...info, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">First Name</label>
                  <input value={info.firstName} onChange={e => setInfo({...info, firstName: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Last Name</label>
                  <input value={info.lastName} onChange={e => setInfo({...info, lastName: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Address</label>
                <input value={info.address} onChange={e => setInfo({...info, address: e.target.value})}
                  className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">City</label>
                  <input value={info.city} onChange={e => setInfo({...info, city: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">ZIP / Postal</label>
                  <input value={info.zip} onChange={e => setInfo({...info, zip: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Country</label>
                  <select value={info.country} onChange={e => setInfo({...info, country: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400">
                    <option>Canada</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Spain</option>
                    <option>Italy</option>
                    <option>Netherlands</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Phone</label>
                  <input type="tel" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})}
                    placeholder="+1 (416) ..."
                    className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
                </div>
              </div>
              <button onClick={() => setStep(2)}
                className="w-full bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest mt-4">
                Continue to shipping
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {[
                { id: 'standard', name: 'Standard Shipping', time: '7-12 business days', price: subtotal >= 99 ? 0 : 9 },
              ].map(opt => (
                <label key={opt.id}
                  className={`flex items-center justify-between p-4 border-2 cursor-pointer ${shipping === opt.id ? 'border-lime-400 bg-lime-400/5' : 'border-white/10'}`}>
                  <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id}
                    onChange={() => setShipping(opt.id)} className="sr-only" />
                  <div>
                    <div className="text-white font-semibold">{opt.name}</div>
                    <div className="text-xs text-white/50">{opt.time}</div>
                  </div>
                  <div className="text-white font-bold">{opt.price === 0 ? 'FREE' : `$${opt.price}`}</div>
                </label>
              ))}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="border border-white/10 text-white px-6 py-4 text-sm font-bold uppercase tracking-widest">
                  Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex-1 bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest">
                  Continue to payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-zinc-950 border border-white/10">
                <Lock className="w-4 h-4 text-lime-400" />
                <span className="text-xs text-white/60">All payments verified manually within 1-2 hours · 256-bit SSL</span>
              </div>

              <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Choose payment method</div>

              {/* Interac e-Transfer */}
              <label className={`block cursor-pointer border-2 p-4 transition-colors ${paymentMethod === 'interac' ? 'border-lime-400 bg-lime-400/5' : 'border-white/10 hover:border-white/30'}`}>
                <input type="radio" name="payment" value="interac" checked={paymentMethod === 'interac'}
                  onChange={() => setPaymentMethod('interac')} className="sr-only" />
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === 'interac' ? 'border-lime-400' : 'border-white/30'}`}>
                    {paymentMethod === 'interac' && <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white font-semibold flex items-center gap-2">
                        Interac e-Transfer
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-lime-400 text-black px-1.5 py-0.5">Canada</span>
                      </div>
                      <div className="text-xs text-lime-400 font-bold">No Fees</div>
                    </div>
                    <div className="text-xs text-white/60">Send from any Canadian bank. Instant delivery, no fees, fully secure.</div>
                  </div>
                </div>
                {paymentMethod === 'interac' && (
                  <div className="mt-4 ml-8 p-4 bg-black border border-white/10 space-y-2 text-sm">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Send Interac e-Transfer to:</div>
                    <div className="text-white font-bold text-base">orders@mehdisports.com</div>
                    <div className="text-xs text-white/60 mt-3">
                      <span className="text-lime-400 font-bold">Amount:</span> ${total.toFixed(2)} CAD
                    </div>
                    <div className="text-xs text-white/60">
                      <span className="text-lime-400 font-bold">Message:</span> Order {orderNumber}
                    </div>
                    <div className="text-xs text-white/60">
                      <span className="text-lime-400 font-bold">Security Q:</span> Set to "mehdisports" (lowercase)
                    </div>
                    <div className="text-[11px] text-white/40 mt-3 pt-3 border-t border-white/10">
                      Place your order below. You'll receive an email with these instructions. We'll confirm receipt within 1-2 hours and ship same day if before 6PM EST.
                    </div>
                  </div>
                )}
              </label>

              {/* Crypto */}
              <label className={`block cursor-pointer border-2 p-4 transition-colors ${paymentMethod === 'crypto' ? 'border-lime-400 bg-lime-400/5' : 'border-white/10 hover:border-white/30'}`}>
                <input type="radio" name="payment" value="crypto" checked={paymentMethod === 'crypto'}
                  onChange={() => setPaymentMethod('crypto')} className="sr-only" />
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === 'crypto' ? 'border-lime-400' : 'border-white/30'}`}>
                    {paymentMethod === 'crypto' && <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white font-semibold flex items-center gap-2">
                        Crypto
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-1.5 py-0.5">Global</span>
                      </div>
                      <div className="text-xs text-lime-400 font-bold">−5% Discount</div>
                    </div>
                    <div className="text-xs text-white/60">USDT, BTC, ETH. Fast, private, no chargebacks. Save 5% when you pay with crypto.</div>
                  </div>
                </div>
                {paymentMethod === 'crypto' && (
                  <div className="mt-4 ml-8 space-y-3">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Select cryptocurrency</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { code: 'USDT', name: 'USDT (TRC20)', desc: 'Tether on Tron · low fees' },
                        { code: 'BTC', name: 'Bitcoin', desc: 'BTC mainnet' },
                        { code: 'ETH', name: 'Ethereum', desc: 'ETH mainnet' },
                      ].map(c => (
                        <button key={c.code} type="button" onClick={() => setCryptoCurrency(c.code)}
                          className={`p-3 border-2 text-left transition-colors ${cryptoCurrency === c.code ? 'border-lime-400 bg-lime-400/10' : 'border-white/10 hover:border-white/30'}`}>
                          <div className="text-sm text-white font-bold">{c.name}</div>
                          <div className="text-[10px] text-white/50 mt-0.5">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div className="p-4 bg-black border border-white/10 space-y-2">
                      <div className="text-xs text-white/60">
                        <span className="text-lime-400 font-bold">Amount with 5% crypto discount:</span> ${(total * 0.95).toFixed(2)} USD
                      </div>
                      <div className="text-[11px] text-white/40 mt-2">
                        After you place your order, you'll receive an email with the exact wallet address and amount in {cryptoCurrency}. Send within 30 minutes to lock in the rate. We'll ship within 1 hour of on-chain confirmation.
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* Card — Coming soon */}
              <div className="block border-2 border-white/10 p-4 opacity-50 cursor-not-allowed">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white font-semibold flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Credit / Debit Card
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/60 px-1.5 py-0.5">Coming Soon</span>
                      </div>
                    </div>
                    <div className="text-xs text-white/40">Visa, Mastercard, Amex coming soon. Pay with Interac or Crypto in the meantime.</div>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-white/5 mt-4">
                <div className="text-xs text-white/60">
                  <Shield className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
                  100% Secure
                </div>
                <div className="text-xs text-white/60">
                  <Truck className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
                  Ship within 24h
                </div>
                <div className="text-xs text-white/60">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1.5 text-lime-400" />
                  Money-back guarantee
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} disabled={submitting}
                  className="border border-white/10 text-white px-6 py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-50">
                  Back
                </button>
                <button onClick={submitOrder} disabled={submitting || !paymentMethod}
                  className="flex-1 bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <>Processing...</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Place order — ${paymentMethod === 'crypto' ? (total * 0.95).toFixed(2) : total.toFixed(2)}</>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-white/40 text-center mt-2">
                By placing your order you agree to our <button onClick={() => navigate('terms')} className="underline hover:text-white">Terms</button> and <button onClick={() => navigate('privacy')} className="underline hover:text-white">Privacy Policy</button>.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-zinc-950 p-6">
            <h3 className="text-xs uppercase tracking-widest text-white/60 mb-5">Order Summary</h3>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.key} className="flex gap-3">
                  <div className="w-14 h-16 bg-black flex-shrink-0 relative">
                    <JerseySVG club={item.product.club} imageUrl={item.product.image} className="w-full h-full" />
                    <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{item.product.name}</div>
                    <div className="text-xs text-white/40">Size {item.size}</div>
                  </div>
                  <div className="text-white text-sm font-bold">${((item.product.salePrice || item.product.price) * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 mt-5 pt-5 space-y-2">
              <div className="flex gap-2">
                <input value={discountInput} onChange={e => setDiscountInput(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 bg-black border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-lime-400" />
                <button onClick={applyDiscount}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 text-xs font-bold uppercase tracking-widest">
                  Apply
                </button>
              </div>
              {discount.code && (
                <div className="flex items-center gap-2 text-xs text-lime-400">
                  <Check className="w-3 h-3" /> Code {discount.code} applied
                </div>
              )}
            </div>

            <div className="border-t border-white/10 mt-5 pt-5 space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              {discount.applied > 0 && (
                <div className="flex justify-between text-lime-400">
                  <span>Discount</span>
                  <span>−${discount.applied.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white/60">
                <span>Tax (est.)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-white">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- WISHLIST PAGE ---------------------------------------------------
// ---------- CLUBS PAGE — Browse by league, then by club -------------------
const ClubsPage = () => {
  const { navigate, catalogLoaded } = useStore();
  const [selectedLeague, setSelectedLeague] = useState(null);

  // Build the league → clubs structure dynamically from real inventory
  const leagueData = useMemo(() => {
    const byLeague = {};
    for (const p of PRODUCTS) {
      if (!p.clubName || !p.league) continue;
      if (!byLeague[p.league]) byLeague[p.league] = new Map();
      // Only count once per club — and prefer products with images
      if (!byLeague[p.league].has(p.clubName)) {
        byLeague[p.league].set(p.clubName, {
          name: p.clubName,
          country: p.country,
          color: p.color,
          image: p.image,
          count: 1,
        });
      } else {
        byLeague[p.league].get(p.clubName).count += 1;
      }
    }
    // Convert to array, sort
    const leagues = Object.entries(byLeague)
      .map(([league, clubsMap]) => ({
        name: league,
        clubs: Array.from(clubsMap.values()).sort((a, b) => b.count - a.count),
        totalProducts: Array.from(clubsMap.values()).reduce((s, c) => s + c.count, 0),
      }))
      .sort((a, b) => b.totalProducts - a.totalProducts);
    return leagues;
  }, [catalogLoaded]);

  // League page — pick a featured club image
  const getLeagueImage = (league) => league.clubs[0]?.image;

  if (selectedLeague) {
    const league = leagueData.find(l => l.name === selectedLeague);
    if (!league) {
      setSelectedLeague(null);
      return null;
    }
    return (
      <div className="bg-black min-h-screen">
        <div className="border-b border-white/5 pt-8 md:pt-12 pb-6">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <button onClick={() => setSelectedLeague(null)}
              className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 hover:text-lime-400 flex items-center gap-1.5">
              <ChevronLeft className="w-3 h-3" /> All Leagues
            </button>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">{league.name}</h1>
            <p className="mt-2 text-white/50 text-sm">{league.clubs.length} clubs · {league.totalProducts} jerseys</p>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {league.clubs.map((club, i) => (
              <motion.button
                key={club.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02, 0.4) }}
                onClick={() => navigate('shop', { filter: { clubName: club.name } })}
                className="group relative aspect-[4/5] overflow-hidden bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-lime-400/40 transition-colors rounded-sm"
                style={{ backgroundColor: `${club.color}10` }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={club.image}
                    alt={club.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-1">{club.country}</div>
                  <div className="text-white font-black text-base md:text-lg uppercase tracking-tight leading-tight">{club.name}</div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs text-white/40">{club.count} jerseys</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="border-b border-white/5 pt-8 md:pt-12 pb-6">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Browse the world's football</div>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">Shop By Club</h1>
          <p className="mt-2 text-white/50 text-sm">{leagueData.length} leagues · {leagueData.reduce((s, l) => s + l.clubs.length, 0)} clubs</p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {leagueData.map((league, i) => {
            const featuredImg = getLeagueImage(league);
            return (
              <motion.button
                key={league.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                onClick={() => { setSelectedLeague(league.name); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className="group relative aspect-[5/3] overflow-hidden bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-lime-400/40 transition-colors rounded-sm"
              >
                {featuredImg && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] opacity-50 group-hover:opacity-90 transition-opacity">
                    <img src={featuredImg} alt={league.name} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute -right-8 -bottom-8 text-[7rem] md:text-[9rem] font-black text-white/[0.04] leading-none pointer-events-none">
                  {league.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="relative p-5 md:p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{league.clubs.length} clubs</div>
                    <div className="mt-1.5 text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight">{league.name}</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Top clubs</div>
                      <div className="text-xs text-white/60 leading-tight">{league.clubs.slice(0, 3).map(c => c.name).join(' · ')}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const { wishlist, navigate } = useStore();
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Your collection</div>
        <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-2">Wishlist</h1>
        <p className="text-white/50 mb-8">{items.length} items saved</p>
        {items.length === 0 ? (
          <div className="bg-zinc-950 p-12 md:p-20 text-center border border-white/5">
            <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase text-white mb-2">Nothing saved yet</h2>
            <p className="text-white/40 mb-6">Tap the heart on any jersey to save it for later.</p>
            <button onClick={() => navigate('shop')} className="bg-lime-400 text-black px-6 py-3 font-bold uppercase tracking-widest">
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- ACCOUNT PAGE ----------------------------------------------------
const AccountPage = () => {
  const [mode, setMode] = useState('login');
  const { navigate } = useStore();
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-black text-3xl tracking-tight text-white">MEHDI<span className="text-lime-400">SPORTS</span></div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 mt-2">Member Area</div>
        </div>
        <div className="bg-zinc-950 border border-white/5 p-8">
          <div className="flex border-b border-white/10 mb-6">
            <button onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest ${mode === 'login' ? 'text-lime-400 border-b-2 border-lime-400 -mb-px' : 'text-white/50'}`}>
              Sign In
            </button>
            <button onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest ${mode === 'register' ? 'text-lime-400 border-b-2 border-lime-400 -mb-px' : 'text-white/50'}`}>
              Register
            </button>
          </div>
          <form onSubmit={e => { e.preventDefault(); navigate('home'); }} className="space-y-4">
            {mode === 'register' && (
              <input placeholder="Full name" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
            )}
            <input type="email" required placeholder="Email" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
            <input type="password" required placeholder="Password" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-lime-400 hover:underline">Forgot password?</button>
              </div>
            )}
            <button type="submit" className="w-full bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-white/40">
            By continuing you agree to our <button className="text-lime-400 hover:underline">Terms</button> & <button className="text-lime-400 hover:underline">Privacy</button>.
          </div>
        </div>
        <button onClick={() => navigate('home')} className="mt-6 text-white/50 hover:text-white text-sm mx-auto block">← Back to store</button>
      </div>
    </div>
  );
};

// ---------- ORDER TRACKING --------------------------------------------------
const OrderTrackingPage = () => {
  const [tracked, setTracked] = useState(false);
  const [orderNum, setOrderNum] = useState('');

  const steps = [
    { label: 'Order Placed', date: 'Mar 12', done: true },
    { label: 'Customized & Packed', date: 'Mar 13', done: true },
    { label: 'Shipped', date: 'Mar 14', done: true },
    { label: 'Out for Delivery', date: 'Mar 17', done: false, current: true },
    { label: 'Delivered', date: 'Est. Mar 18', done: false },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Where's my kit?</div>
        <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-8">Track Order</h1>

        {!tracked ? (
          <div className="bg-zinc-950 border border-white/5 p-8">
            <p className="text-white/60 mb-6">Enter your order number to see the latest update.</p>
            <div className="space-y-4">
              <input value={orderNum} onChange={e => setOrderNum(e.target.value)}
                placeholder="Order number (e.g. MS123456)"
                className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
              <input placeholder="Email"
                className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
              <button onClick={() => setTracked(true)} className="w-full bg-lime-400 text-black py-4 font-bold uppercase tracking-widest">
                Track Order
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-white/5 p-8 text-center">
            <div className="w-12 h-12 mx-auto bg-lime-400/10 border border-lime-400/30 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-lime-400" />
            </div>
            <div className="text-xl font-bold text-white mb-2">We're on it</div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
              We'll look up order <span className="text-lime-400 font-bold">{orderNum}</span> and send a status update to your email within 1 hour during business hours.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Need it faster? WhatsApp us at <a href="https://wa.me/14372595733" className="text-lime-400 hover:text-white">+1 (437) 259-5733</a>
            </p>
            <button onClick={() => { setTracked(false); setOrderNum(''); }}
              className="mt-6 px-6 py-2.5 border border-white/10 hover:border-white/30 text-white text-xs uppercase tracking-widest">
              Track Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- STATIC PAGES (About, Contact, FAQ, Policies) --------------------
const AboutPage = () => (
  <div className="bg-black min-h-screen">
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#84cc1620_0%,transparent_50%)]" />
      <div className="relative max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-xs uppercase tracking-[0.4em] text-lime-400 mb-4">About MehdiSports</div>
        <h1 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9]">
          For the love<br />of the <span className="italic font-serif font-normal text-lime-400">game</span>.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
          MehdiSports is a small operation run by one football obsessive out of Toronto, Ontario.
          The mission: bring quality jerseys to fans worldwide without the retail markup
          — every league that matters, every era worth wearing.
        </p>
      </div>
    </section>
    <section className="py-16 md:py-20 border-y border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
        {[
          { num: '2,700+', label: 'Jerseys in stock' },
          { num: '120+', label: 'Countries we ship to' },
          { num: '30-Day', label: 'No-questions returns' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-lime-400 tracking-tighter">{s.num}</div>
            <div className="text-xs uppercase tracking-widest text-white/50 mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
    <section className="py-20 max-w-3xl mx-auto px-4 md:px-8 text-white/70 leading-relaxed space-y-6">
      <h2 className="text-3xl font-black uppercase text-white">Our story</h2>
      <p>Started in 2024 out of a Toronto bedroom with a single goal: make it easy for fans anywhere in the world to wear the kit of the club they love, with the player name and number they want, without compromise on quality.</p>
      <p>Every jersey is hand-picked for AAA+ quality stitching and breathable fabric, then quality-checked individually before it leaves the warehouse. Match kits, retro classics, training gear — if it matters to the football world, we carry it.</p>
      <p>We're not a faceless dropshipper. Real person, real address, real WhatsApp number. If something's wrong, you get a real reply — usually within an hour.</p>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="bg-black min-h-screen py-12 md:py-20">
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Get in touch</div>
      <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-12">Contact us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { icon: Mail, label: 'Email', value: 'orders@mehdisports.com' },
            { icon: Phone, label: 'WhatsApp', value: '+1 (437) 259-5733' },
            { icon: MapPin, label: 'HQ', value: 'Toronto, ON · Canada' },
            { icon: Globe, label: 'Hours', value: 'Mon–Fri · 9am–6pm ET' },
          ].map(c => (
            <div key={c.label} className="flex gap-4">
              <div className="w-10 h-10 bg-lime-400/10 border border-lime-400/30 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-4 h-4 text-lime-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">{c.label}</div>
                <div className="text-white font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="pt-6 border-t border-white/5">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Follow us</div>
            <div className="flex gap-3">
              {[Globe, Globe, Globe, Globe].map((I, i) => (
                <a key={i} className="w-10 h-10 border border-white/10 hover:border-lime-400 hover:text-lime-400 flex items-center justify-center text-white transition-colors">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <form className="space-y-4 bg-zinc-950 p-6 md:p-8 border border-white/5">
          <h2 className="text-2xl font-black uppercase text-white mb-2">Send a message</h2>
          <input placeholder="Name" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
          <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
          <input placeholder="Subject" className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400" />
          <textarea rows={5} placeholder="Your message..." className="w-full bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-400 resize-none" />
          <button onClick={e => { e.preventDefault(); alert('Message sent (demo)'); }}
            className="w-full bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

const FAQPage = () => {
  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping is 7-12 business days worldwide. Custom-printed jerseys add 1-2 days for production.' },
    { q: 'What\'s the difference between Player and Fan versions?', a: 'Player Version is the on-pitch cut — pro-fit, premium fabric, laser-cut ventilation. Fan Version is more relaxed in fit with standard fabric, designed for everyday wear.' },
    { q: 'Can I return a customized jersey?', a: 'Custom-printed jerseys (with name/number) are final sale. Non-customized jerseys can be returned within 30 days, unworn with tags.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship to 120+ countries. International shipping is calculated at checkout. Free shipping on international orders over $100.' },
    { q: 'What sizes are available?', a: 'XS through XXL for adults. Most clubs also have Kids sizes (YXS-YXL). Player Version runs slim — we recommend sizing up for a relaxed fit.' },
    { q: 'How do I track my order?', a: 'You\'ll get a tracking email when your order ships. You can also use our Track Order page with your order number and email.' },
    { q: 'Do you offer wholesale or team orders?', a: 'Yes! Email teams@mehdisports.com for bulk pricing on 12+ jerseys.' },
  ];
  return (
    <div className="bg-black min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Got questions?</div>
        <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-12">FAQ</h1>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-zinc-950 border border-white/5 hover:border-white/15 transition-colors">
              <summary className="flex justify-between items-center p-5 cursor-pointer">
                <span className="text-white font-semibold pr-4">{f.q}</span>
                <Plus className="w-5 h-5 text-lime-400 flex-shrink-0 group-open:rotate-45 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-white/60 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

const PolicyPage = ({ title, body }) => (
  <div className="bg-black min-h-screen py-12 md:py-20">
    <div className="max-w-3xl mx-auto px-4 md:px-8">
      <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Legal</div>
      <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-8">{title}</h1>
      <div className="space-y-6 text-white/70 leading-relaxed">
        {body.map((p, i) => (
          typeof p === 'string'
            ? <p key={i}>{p}</p>
            : <div key={i}><h2 className="text-xl font-black uppercase text-white mb-2">{p.h}</h2><p>{p.p}</p></div>
        ))}
      </div>
    </div>
  </div>
);

const ShippingPolicy = () => <PolicyPage title="Shipping Policy" body={[
  { h: 'Processing time', p: 'Orders ship within 1-2 business days. Custom-printed jerseys (name/number) require an additional 1-2 days for production.' },
  { h: 'Domestic shipping (US/Canada)', p: 'Standard: 7-12 business days · $9 (free over $99).' },
  { h: 'International shipping', p: 'We ship to 120+ countries. Rates calculated at checkout. Free standard shipping on international orders over $100.' },
  { h: 'Tracking', p: 'Every order ships with full tracking. You\'ll receive a tracking number via email as soon as your kit leaves our warehouse.' },
  { h: 'Customs & duties', p: 'International orders may be subject to import duties. These are the responsibility of the recipient.' },
]} />;

const ReturnPolicy = () => <PolicyPage title="Returns & Exchanges" body={[
  { h: '30-day returns', p: 'Not happy with your jersey? Return any unworn, untouched item within 30 days for a full refund.' },
  { h: 'Customized items', p: 'Jerseys with custom printing (name and/or number) are final sale and cannot be returned, unless faulty.' },
  { h: 'How to return', p: 'Email returns@mehdisports.com with your order number. We\'ll send a prepaid return label.' },
  { h: 'Exchanges', p: 'Need a different size? We offer free exchanges on the first attempt for non-customized items.' },
  { h: 'Refund timing', p: 'Once we receive your return, refunds are processed within 3-5 business days back to your original payment method.' },
]} />;

const TermsPage = () => <PolicyPage title="Terms of Service" body={[
  'By accessing and placing an order with MehdiSports, you confirm that you are in agreement with and bound by the terms set forth below.',
  { h: 'Use of site', p: 'You agree to use this site for lawful purposes only. Any unauthorized use may give rise to a claim for damages.' },
  { h: 'Pricing & payment', p: 'All prices are in USD unless otherwise stated. We reserve the right to change prices without notice.' },
  { h: 'Product information', p: 'We make every effort to display accurate colors and images of our products. We cannot guarantee that your monitor displays colors with perfect accuracy.' },
  { h: 'Intellectual property', p: 'All content on this site, including jersey designs, logos, and brand assets, is the property of MehdiSports or its licensors.' },
]} />;

const PrivacyPage = () => <PolicyPage title="Privacy Policy" body={[
  'Your privacy matters. This policy describes how we collect, use, and protect your personal information.',
  { h: 'Information we collect', p: 'We collect information you provide during checkout (name, email, shipping address, payment info) and automatically through cookies (browsing behavior, IP address).' },
  { h: 'How we use it', p: 'To process orders, send order updates, improve our site, and (with your consent) send marketing emails. We never sell your data.' },
  { h: 'Payment security', p: 'We currently accept Interac e-Transfer and cryptocurrency (USDT, BTC, ETH). We never store payment credentials on our servers. Credit/debit card payments coming soon.' },
  { h: 'Your rights', p: 'You can request access, correction, or deletion of your data at any time by emailing privacy@mehdisports.com.' },
]} />;

// ---------- FOOTER ----------------------------------------------------------
const Footer = () => {
  const { navigate, currency, setCurrency } = useStore();
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <div className="font-black text-3xl text-white tracking-tight">MEHDI<span className="text-lime-400">SPORTS</span></div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mt-2">For the love of the game · Est 2025</div>
            <p className="text-white/50 mt-5 text-sm leading-relaxed max-w-sm">
              Premium football jerseys shipped to 120+ countries.
              Match kits, training gear, and retro classics.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-lime-400/80 flex-shrink-0" />
                <span>Toronto, ON · Canada</span>
              </div>
              <div className="flex items-start gap-2 text-white/60">
                <Mail className="w-4 h-4 mt-0.5 text-lime-400/80 flex-shrink-0" />
                <a href="mailto:orders@mehdisports.com" className="hover:text-white">orders@mehdisports.com</a>
              </div>
              <div className="flex items-start gap-2 text-white/60">
                <Phone className="w-4 h-4 mt-0.5 text-lime-400/80 flex-shrink-0" />
                <a href="https://wa.me/14372595733" className="hover:text-white">WhatsApp · +1 (437) 259-5733</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white font-bold mb-4">Shop</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><button onClick={() => navigate('shop', { filter: { isNew: true } })} className="hover:text-lime-400">New Arrivals</button></li>
              <li><button onClick={() => navigate('shop', { filter: { isBest: true } })} className="hover:text-lime-400">Best Sellers</button></li>
              <li><button onClick={() => navigate('shop', { filter: { type: 'Retro' } })} className="hover:text-lime-400">Retro</button></li>
              <li><button onClick={() => navigate('shop', { filter: { league: 'International' } })} className="hover:text-lime-400">National Teams</button></li>
              <li><button onClick={() => navigate('shop', { filter: { onSale: true } })} className="hover:text-lime-400">Sale</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white font-bold mb-4">Help</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><button onClick={() => navigate('contact')} className="hover:text-lime-400">Contact Us</button></li>
              <li><button onClick={() => navigate('faq')} className="hover:text-lime-400">FAQ</button></li>
              <li><button onClick={() => navigate('order-tracking')} className="hover:text-lime-400">Order Tracking</button></li>
              <li><button onClick={() => navigate('shipping')} className="hover:text-lime-400">Shipping</button></li>
              <li><button onClick={() => navigate('returns')} className="hover:text-lime-400">Returns</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white font-bold mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><button onClick={() => navigate('about')} className="hover:text-lime-400">About</button></li>
              <li><button onClick={() => navigate('terms')} className="hover:text-lime-400">Terms</button></li>
              <li><button onClick={() => navigate('privacy')} className="hover:text-lime-400">Privacy</button></li>
              <li><a className="hover:text-lime-400 cursor-pointer">Careers</a></li>
              <li><a className="hover:text-lime-400 cursor-pointer">Affiliates</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white font-bold mb-4">Currency</div>
            <select
              value={currency.code}
              onChange={e => {
                const opts = {
                  USD: { code: 'USD', symbol: '$', rate: 1 },
                  EUR: { code: 'EUR', symbol: '€', rate: 0.93 },
                  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
                  CAD: { code: 'CAD', symbol: 'C$', rate: 1.37 },
                  AUD: { code: 'AUD', symbol: 'A$', rate: 1.53 },
                };
                setCurrency(opts[e.target.value]);
              }}
              className="bg-black border border-white/10 text-white text-sm px-3 py-2 w-full outline-none focus:border-lime-400">
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="CAD">CAD C$</option>
              <option value="AUD">AUD A$</option>
            </select>
            <div className="text-xs uppercase tracking-widest text-white font-bold mt-6 mb-3">We Accept</div>
            <div className="flex flex-wrap gap-1.5">
              {['INTERAC', 'USDT', 'BTC', 'ETH'].map(b => (
                <div key={b} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-white/70">{b}</div>
              ))}
            </div>
            <div className="text-[10px] text-white/40 mt-2">Card payments coming soon</div>
          </div>
        </div>

        {/* Massive brand text */}
        <div className="border-t border-white/5 pt-8 mb-6 overflow-hidden">
          <div className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-none text-white/[0.04] text-center select-none uppercase">
            MehdiSports
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40 pt-6 border-t border-white/5">
          <div>© 2026 MehdiSports. All rights reserved.</div>
          <div className="flex gap-4">
            <button onClick={() => navigate('terms')} className="hover:text-white">Terms</button>
            <button onClick={() => navigate('privacy')} className="hover:text-white">Privacy</button>
            <button onClick={() => navigate('shipping')} className="hover:text-white">Shipping</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ---------- TOAST -----------------------------------------------------------
const Toast = () => {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-lime-400 text-black px-5 py-3 font-bold uppercase tracking-wider text-sm shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------- APP -------------------------------------------------------------
const AppShell = () => {
  const { route } = useStore();
  const renderPage = () => {
    switch (route.page) {
      case 'home': return <HomePage />;
      case 'shop': return <ShopPage />;
      case 'clubs': return <ClubsPage />;
      case 'product': return <ProductPage />;
      case 'checkout': return <CheckoutPage />;
      case 'wishlist': return <WishlistPage />;
      case 'account': return <AccountPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'faq': return <FAQPage />;
      case 'order-tracking': return <OrderTrackingPage />;
      case 'shipping': return <ShippingPolicy />;
      case 'returns': return <ReturnPolicy />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black antialiased w-screen overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,400;1,600&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee-slow { animation: marquee 60s linear infinite; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
        ::-webkit-scrollbar-thumb:hover { background: #a3e635; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <Header />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <Toast />

      <main>
        {renderPage()}
      </main>

      {route.page !== 'checkout' && route.page !== 'account' && <Footer />}

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Exit Intent Popup — recovers abandoning visitors */}
      <ExitIntentPopup />
    </div>
  );
};

// ---------- EXIT INTENT POPUP ----------------------------------------------
// Triggers when mouse moves toward closing the tab (desktop) or after 30s idle (mobile)
// Offers WELCOME10 discount to capture email & save the session
const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // Only show once per session
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shown) return;

    // Desktop: trigger when mouse leaves the top of the viewport (toward close button / address bar)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };

    // Mobile: trigger after 35s of being on site (proxy for "about to leave")
    const mobileTimeout = setTimeout(() => {
      if (!shown && window.innerWidth < 768) {
        setOpen(true);
        setShown(true);
      }
    }, 35000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimeout);
    };
  }, [shown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Send the captured email to Formspree → lands in your inbox
    // Tagged as a "newsletter signup" so you can filter it from real orders in Gmail
    try {
      await fetch('https://formspree.io/f/xaqkobko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `📧 New Email Signup — ${email}`,
          type: 'newsletter_signup',
          source: 'exit_intent_popup',
          email: email,
          discount_code_given: 'WELCOME10',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      // Even if it fails, still show the code so user experience isn't broken
      console.error('Email capture failed:', err);
    }

    setSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[61] max-w-md w-full md:w-[440px] bg-black border-2 border-lime-400 overflow-hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 z-10 text-white/60 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            {/* Header with glow */}
            <div className="relative bg-lime-400 text-black p-6 md:p-8 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <div className="text-[8rem] font-black tracking-tighter">10%</div>
              </div>
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.4em] mb-2 font-bold">Wait — before you go</div>
                <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  Get 10% off<br />your first kit
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {!submitted ? (
                <>
                  <p className="text-white/70 text-sm text-center mb-5">
                    Drop your email and we'll send you a code instantly. No spam — just first dibs on drops, restocks, and exclusive offers.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoFocus
                      className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-3.5 outline-none focus:border-lime-400 text-center"
                    />
                    <button type="submit"
                      className="w-full bg-lime-400 hover:bg-white text-black py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors">
                      Send me the code <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                  <button onClick={() => setOpen(false)} className="w-full text-center text-xs text-white/40 hover:text-white/70 mt-4 underline">
                    No thanks, I'll pay full price
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-14 h-14 bg-lime-400 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white mb-3">You're in.</h3>
                  <p className="text-white/60 text-sm mb-5">Your code is below — copy it and use at checkout.</p>
                  <div className="bg-zinc-950 border-2 border-dashed border-lime-400 p-4 mb-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Your discount code</div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl font-black text-lime-400 tracking-wider">WELCOME10</span>
                      <button onClick={copyCode} className="bg-lime-400 text-black px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white">
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)}
                    className="w-full bg-white hover:bg-lime-400 text-black py-3.5 font-bold uppercase tracking-widest text-sm">
                    Start shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ---------- WHATSAPP FLOATING BUTTON --------------------------------------
// Replace YOUR_NUMBER with your real WhatsApp Business number (with country code, no + or spaces)
// Example: 14165550114 for +1 (437) 259-5733
const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const WHATSAPP_NUMBER = '14372595733'; // Your real WhatsApp Business number
  const defaultMessage = encodeURIComponent("Hi! I'm interested in ordering from MehdiSports. Can you help me?");
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;

  return (
    <>
      {/* Quick chat tooltip */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[280px] bg-zinc-950 border border-white/10 shadow-2xl rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">MehdiSports</div>
                  <div className="text-[10px] text-lime-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-lime-400 rounded-full" /> Online now
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-black/40 p-3 rounded-md mb-3">
              <div className="text-xs text-white/80 leading-relaxed">
                👋 Need help finding a jersey? Want to order via WhatsApp? Message us — we reply within minutes.
              </div>
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#1FAD56] text-white text-center py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors">
              Start Chat
            </a>
            <div className="text-[10px] text-white/30 text-center mt-2">
              Typically replies in under 5 minutes
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1FAD56] rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#25D366] rounded-full opacity-50"
        />
        {open ? <X className="w-6 h-6 text-white relative" /> : <MessageCircle className="w-6 h-6 text-white relative" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-black" />
        )}
      </button>
    </>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
