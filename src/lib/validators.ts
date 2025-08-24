
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: z.ZodIssue[] | Record<string, string[] | undefined>;
  data?: {
    department: string;
    agent?: string;
    reason: string;
  };
}

const planSchema = z.object({
  name: z.string(),
  price: z.string(),
  features: z.array(z.string()),
});

const benefitSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const stepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const contentSectionSchema = z.object({
  type: z.enum(['text-image', 'image-text', 'text-only']),
  title: z.string().min(1, 'Section title is required'),
  text: z.string().min(1, 'Section text is required'),
  image: z.string().url().optional().or(z.literal('')),
});


export const serviceFormSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  image: z.string().url().optional().or(z.literal('')),
  short_description: z.string().min(1, 'Short description is required'),
  long_description: z.string().nullable().optional(),
  content_sections: z.array(contentSectionSchema).nullable().optional(),
  icon_svg: z.string().nullable().optional(),
  show_benefits: z.boolean().default(false),
  benefits: z.array(benefitSchema).nullable().optional(),
  show_target_audience: z.boolean().default(false),
  target_audience: z.string().nullable().optional(),
  show_plans: z.boolean().default(false),
  plans: z.array(planSchema).nullable().optional(),
  show_steps: z.boolean().default(false),
  steps: z.array(stepSchema).nullable().optional(),
  show_faqs: z.boolean().default(false),
  faqs: z.array(faqSchema).nullable().optional(),
  show_related_services: z.boolean().default(false),
  related_services: z.array(z.string()).nullable().optional(),
});


export const blogPostFormSchema = z.object({
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  published_at: z.string().transform((str) => new Date(str).toISOString()),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().url().optional().or(z.literal('')),
});

export const testimonialFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  image: z.string().url().optional().or(z.literal('')),
});

export const teamMemberFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  image: z.string().url().optional().or(z.literal('')),
});


export const pageContentFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  'hero.title': z.string().optional(),
  'hero.subtitle': z.string().optional(),
  'hero.image': z.string().url().optional().or(z.literal('')),
  'about.title': z.string().optional(),
  'about.text': z.string().optional(),
  'about.image': z.string().url().optional().or(z.literal('')),
  'story.title': z.string().optional(),
  'story.text_1': z.string().optional(),
  'story.text_2': z.string().optional(),
  'story.image': z.string().url().optional().or(z.literal('')),
}).catchall(z.any());

export const quoteFormSchema = z.object({
    // Step 1
    service: z.string({ required_error: 'Please select a service.' }),

    // Step 2: Service-Specific
    // Life Insurance
    gender: z.string().optional(),
    smoker: z.string().optional(),
    smoker_details: z.string().optional(),
    coverage_amount_life: z.string().optional(),
    term_length: z.string().optional(),
    pre_existing_conditions: z.string().optional(),
    conditions_details_life: z.string().optional(),

    // Visitor Insurance
    coverage_start_date_visitor: z.string().optional(),
    coverage_end_date_visitor: z.string().optional(),
    coverage_amount_visitor: z.string().optional(),
    conditions_details_visitor: z.string().optional(),
    purpose_of_visit: z.string().optional(),
    
    // Supervisa Insurance
    coverage_amount_super_visa: z.string().optional(),
    conditions_details_super_visa: z.string().optional(),
    coverage_duration_super_visa: z.string().optional(),
    relationship_to_applicant: z.string().optional(),

    // RESP
    resp_contribution_goal: z.string().optional(),
    resp_investment_horizon: z.string().optional(),
    resp_has_savings: z.string().optional(),
    resp_savings_amount: z.string().optional(),

    // TFSA
    tfsa_annual_contribution: z.string().optional(),
    tfsa_investment_style: z.string().optional(),
    tfsa_has_existing: z.string().optional(),
    tfsa_existing_amount: z.string().optional(),
    tfsa_start_contribution: z.string().optional(),

    // RRSP
    rrsp_retirement_age: z.string().optional(),
    rrsp_annual_contribution: z.string().optional(),
    rrsp_investment_style: z.string().optional(),
    rrsp_has_existing: z.string().optional(),
    rrsp_existing_balance: z.string().optional(),
    rrsp_start_advice: z.string().optional(),

    // Health & Dental
    health_has_existing_plan: z.string().optional(),
    health_existing_coverage_details: z.string().optional(),
    health_coverage_need: z.string().optional(),
    health_who_needs_coverage: z.string().optional(),

    // Travel Insurance for Canadians
    travel_destination: z.string().optional(),
    travel_start_date: z.string().optional(),
    travel_end_date: z.string().optional(),
    travel_coverage_amount: z.string().optional(),
    travel_pre_existing_conditions: z.string().optional(),
    travel_conditions_details: z.string().optional(),
    
    // International Students Plan
    international_school_name: z.string().optional(),
    international_coverage_start_date: z.string().optional(),
    international_coverage_end_date: z.string().optional(),
    international_coverage_amount: z.string().optional(),
    international_pre_existing_conditions: z.string().optional(),
    international_conditions_details: z.string().optional(),

    // Step 3: Contact Info
    full_name: z.string().min(1, 'Full name is required.'),
    dob: z.string().min(1, 'Date of birth is required.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().min(1, 'Phone number is required.'),
    city_province: z.string().min(1, 'City/Province is required.'),

}).superRefine((data, ctx) => {
    // Conditional validation based on selected service
    switch(data.service) {
        case 'life-insurance':
            if (!data.gender) ctx.addIssue({ code: 'custom', message: 'Gender is required.', path: ['gender'] });
            if (!data.smoker) ctx.addIssue({ code: 'custom', message: 'Smoker status is required.', path: ['smoker'] });
            if (data.smoker === 'Yes' && !data.smoker_details) ctx.addIssue({ code: 'custom', message: 'Please specify how many per day.', path: ['smoker_details'] });
            if (!data.coverage_amount_life) ctx.addIssue({ code: 'custom', message: 'Coverage amount is required.', path: ['coverage_amount_life'] });
            if (!data.term_length) ctx.addIssue({ code: 'custom', message: 'Term length is required.', path: ['term_length'] });
            if (!data.pre_existing_conditions) ctx.addIssue({ code: 'custom', message: 'This field is required.', path: ['pre_existing_conditions'] });
            if (data.pre_existing_conditions === 'Yes' && !data.conditions_details_life) ctx.addIssue({ code: 'custom', message: 'Please list your conditions.', path: ['conditions_details_life'] });
            break;
        case 'visitor-insurance':
            if (!data.coverage_start_date_visitor) ctx.addIssue({ code: 'custom', message: 'Start date is required.', path: ['coverage_start_date_visitor'] });
            if (!data.coverage_end_date_visitor) ctx.addIssue({ code: 'custom', message: 'End date is required.', path: ['coverage_end_date_visitor'] });
            if (!data.coverage_amount_visitor) ctx.addIssue({ code: 'custom', message: 'Coverage amount is required.', path: ['coverage_amount_visitor'] });
            if (!data.pre_existing_conditions) ctx.addIssue({ code: 'custom', message: 'This field is required.', path: ['pre_existing_conditions'] });
            if (data.pre_existing_conditions === 'Yes' && !data.conditions_details_visitor) ctx.addIssue({ code: 'custom', message: 'Please provide details.', path: ['conditions_details_visitor'] });
            if (!data.purpose_of_visit) ctx.addIssue({ code: 'custom', message: 'Purpose of visit is required.', path: ['purpose_of_visit'] });
            break;
        // Add other cases here...
    }
});


export type QuoteFormState = {
  success: boolean;
  message?: string | null;
  issues?: z.ZodIssue[];
};

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});
