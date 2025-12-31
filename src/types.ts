export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  link: string;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export const Section = {
  HERO: 'hero',
  WORK: 'work',
  ABOUT: 'about',
  CONTACT: 'contact',
  TESTIMONIALS: "testimonials",
} as const;

export type Section = (typeof Section)[keyof typeof Section];