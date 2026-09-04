// Central configuration for the portfolio.
// Edit values here to update the site without touching components.

export const profile = {
  name: 'Pranav Saraswat',
  role: 'Student Developer',
  intro:
    'A student developer drawn to how code can reason about itself — building tools that verify, analyze, and regenerate rather than just run. Curious about correctness, automation, and the systems behind meaningful software.',
  heroCta: 'Explore My Work',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'code-factory', label: 'Code Factory' },
  { id: 'contact', label: 'Contact' },
];

export const aboutContent = {
  lead: 'A student who learns by building, breaking, and rebuilding.',
  body: "I'm Pranav Saraswat, a student developer drawn to the parts of software that reason about themselves — verification, analysis, and the quiet machinery that keeps code correct. I enjoy experimenting, solving hard technical problems, and shipping things that actually work end-to-end.",
  traits: [
    {
      label: 'Focus',
      value: 'Verification & Analysis',
      detail: 'Interested in how automated systems can reason about code correctness.',
    },
    {
      label: 'Approach',
      value: 'Build, Break, Rebuild',
      detail: 'Learning by shipping end-to-end pipelines and refining them.',
    },
    {
      label: 'Mindset',
      value: 'Generalization over Hardcoding',
      detail: 'Prefers solutions that adapt rather than ones tuned to a single target.',
    },
  ],
  journey: [
    {
      phase: 'Learning',
      description: 'Studying core computer science — languages, systems, and how software is structured.',
    },
    {
      phase: 'Experimenting',
      description: 'Building small tools and exploring how static analysis and ASTs can drive verification.',
    },
    {
      phase: 'Building',
      description: 'Developing Code Factory — an end-to-end verification pipeline from scratch.',
    },
  ],
};

export type SkillCategory = {
  name: string;
  label: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: 'frontend',
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Python', 'REST APIs'],
  },
  {
    name: 'programming',
    label: 'Programming',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++'],
  },
  {
    name: 'tools',
    label: 'Tools & Workflow',
    items: ['Git', 'VS Code', 'Linux', 'Docker'],
  },
];

export const codeFactory = {
  label: 'CURRENT PROJECT',
  title: 'CODE FACTORY',
  tagline: 'A code verification & analysis pipeline.',
  description:
    'Code Factory is a verification pipeline that analyzes code, generalizes findings through AST-based reasoning, and regenerates corrected output on each run — rather than relying on hardcoded identifiers or a fixed target.',
  pipeline: [
    {
      stage: 'INPUT',
      description: 'Source code enters the system.',
      detail: 'A file or repository is fed into the pipeline as the starting point.',
    },
    {
      stage: 'ANALYSIS',
      description: 'The system examines and processes the code.',
      detail: 'The source is parsed into an AST and walked to locate patterns of interest.',
    },
    {
      stage: 'VERIFICATION',
      description: 'The pipeline evaluates the relevant logic.',
      detail: 'Findings are generalized beyond fixed IDs and checked against regression cases.',
    },
    {
      stage: 'RESULT',
      description: 'The final outcome is presented clearly.',
      detail: 'Corrected output is regenerated fresh on every run, with no stale artifacts.',
    },
  ],
  highlights: [
    {
      title: 'End-to-end verification pipeline',
      detail: 'A working flow from input through analysis to verified result, runnable in a single pass.',
    },
    {
      title: 'Regression cases verified',
      detail: 'Both vulnerable and secure regression cases are covered and confirmed by the pipeline.',
    },
    {
      title: 'AST-based generalization',
      detail: 'Findings generalize across the abstract syntax tree instead of matching a hardcoded ID or fixed target.',
    },
    {
      title: 'Clean regeneration each run',
      detail: 'Corrected output is regenerated fresh on every run, with no stale artifacts carried forward.',
    },
  ],
  architecture: [
    { label: 'PARSER', note: 'Builds an AST from the input source.' },
    { label: 'ANALYZER', note: 'Walks the tree to locate patterns of interest.' },
    { label: 'GENERALIZER', note: 'Lifts specific matches to general, reusable findings.' },
    { label: 'REGENERATOR', note: 'Produces corrected output from the analyzed tree.' },
  ],
  terminalLines: [
    { type: 'cmd', text: '$ code-factory run --input src/sample.cpp' },
    { type: 'out', text: '[parser] building AST from 248 nodes...' },
    { type: 'out', text: '[analyzer] scanning 12 functions, 38 callsites...' },
    { type: 'warn', text: '[generalizer] pattern matched at L42 — generalized beyond fixed ID' },
    { type: 'out', text: '[verifier] regression suite: 6 vulnerable, 4 secure — all pass' },
    { type: 'ok', text: '[regenerator] clean output written → build/sample.fixed.cpp' },
    { type: 'cmd', text: '$ _' },
  ],
  links: {
    repository: null as string | null,
    live: null as string | null,
  },
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Pranavv1o1', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranav-saraswat-688aa4340', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:pranavsaraswat565@gmail.com', icon: 'mail' },
];

export const footer = {
  name: 'Pranav Saraswat',
  year: new Date().getFullYear(),
  signature: 'Built with intent',
};
