import {
  AppWindow,
  Braces,
  Code2,
  Layers,
  PanelsTopLeft,
  Smartphone,
  ShoppingBag,
} from 'lucide-react'

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    number: '01',
    title: 'Business websites',
    description: 'A clear, credible home for your business, designed to turn a first visit into a confident next step.',
    icon: AppWindow,
    tags: ['Brand-led', 'Fast', 'Accessible'],
  },
  {
    number: '02',
    title: 'Landing pages',
    description: 'Focused pages that make one idea easy to understand, explore, and act on across every screen.',
    icon: PanelsTopLeft,
    tags: ['Campaigns', 'Product launches', 'Conversion'],
  },
  {
    number: '03',
    title: 'Responsive design',
    description: 'Flexible layouts and considered details that feel natural from a wide desktop to a small phone.',
    icon: Smartphone,
    tags: ['Mobile-first', 'Fluid layouts', 'Inclusive'],
  },
  {
    number: '04',
    title: 'Frontend development',
    description: 'Polished, maintainable interfaces that bring thoughtful design and lively interactions to life.',
    icon: Code2,
    tags: ['React', 'JavaScript', 'UI craft'],
  },
  {
    number: '05',
    title: 'Backend development',
    description: 'Practical server-side foundations for the flows and features that make an experience work.',
    icon: Braces,
    tags: ['Java', 'Spring Boot', 'APIs'],
  },
  {
    number: '06',
    title: 'Shopify store development',
    description: 'Shopify store setup and theme customization, with organized products, collections, and responsive storefront layouts.',
    icon: ShoppingBag,
    tags: ['Shopify', 'Theme customization', 'E-commerce'],
  },
  {
    number: '07',
    title: 'Website refreshes',
    description: 'A considered redesign to give an existing site a clearer structure, sharper visual language, and a fresh feel.',
    icon: Layers,
    tags: ['New direction', 'Better flow', 'Modern UI'],
  },
]

export const projects = [
  {
    number: '01',
    name: 'Arc Studio',
    category: 'CREATIVE STUDIO · PERSONAL CONCEPT',
    description: 'A confident digital home for a fictional design studio, balancing bold typography with a calm, gallery-like portfolio.',
    tags: ['React', 'Motion', 'Responsive UI'],
    visual: 'arc',
    glyph: 'A',
  },
  {
    number: '02',
    name: 'Northstar',
    category: 'PRODUCT DASHBOARD · PERSONAL CONCEPT',
    description: 'A dark, data-rich dashboard concept built around readable charts, modular cards, and an effortless sense of clarity.',
    tags: ['React', 'Tailwind CSS', 'Data UI'],
    visual: 'northstar',
    glyph: 'N',
  },
  {
    number: '03',
    name: 'Form & Field',
    category: 'E-COMMERCE · PERSONAL CONCEPT',
    description: 'A warm editorial storefront for a fictional objects brand, designed to let the product and photography breathe.',
    tags: ['JavaScript', 'CSS', 'Commerce UI'],
    visual: 'field',
    glyph: 'F',
  },
]

export const skills = [
  { name: 'HTML', group: 'THE BUILDING BLOCKS', symbol: '5' },
  { name: 'CSS', group: 'THE BUILDING BLOCKS', symbol: '3' },
  { name: 'JavaScript', group: 'THE BUILDING BLOCKS', symbol: 'JS' },
  { name: 'React', group: 'FRONTEND', symbol: 'R' },
  { name: 'Tailwind CSS', group: 'FRONTEND', symbol: 'TW' },
  { name: 'Responsive Web Design', group: 'FRONTEND', symbol: '↔' },
  { name: 'Java', group: 'BACKEND', symbol: 'J' },
  { name: 'Spring Boot', group: 'BACKEND', symbol: 'SB' },
  { name: 'Shopify', group: 'E-COMMERCE', symbol: 'S' },
  { name: 'Shopify Theme Customization', group: 'E-COMMERCE', symbol: 'ST' },
]
