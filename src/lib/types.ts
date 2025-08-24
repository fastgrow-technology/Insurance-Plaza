
export interface ServicePlan {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ContentSection {
  type: 'text-image' | 'image-text' | 'text-only';
  title: string;
  text: string;
  image?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  image: string;
  short_description: string;
  long_description: string | null; // Kept for potential fallback, but new content goes in sections
  content_sections: ContentSection[] | null;
  icon_svg: string | null;
  show_benefits: boolean;
  benefits: ServiceBenefit[] | null;
  show_target_audience: boolean;
  target_audience: string | null;
  show_plans: boolean;
  plans: ServicePlan[] | null;
  show_steps: boolean;
  steps: ServiceStep[] | null;
  show_faqs: boolean;
  faqs: ServiceFAQ[] | null;
  show_related_services: boolean;
  related_services: string[] | null;
}

export interface RelatedService {
    slug: string;
    title: string;
    image: string;
    short_description: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  published_at: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text?: string;
  quote: string;
  image: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Page {
  slug: string;
  title: string;
  description: string;
  content: any;
}

export type SiteSettings = {
    [key: string]: string;
}

export interface Media {
  name: string;
  url: string;
  alt_text: string | null;
  created_at: string;
}
