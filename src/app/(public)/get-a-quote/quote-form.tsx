
'use client';

import * as React from 'react';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Loader2,
    HeartPulse,
    Plane,
    FileText,
    GraduationCap,
    Landmark,
    PiggyBank,
    Stethoscope,
    Globe,
    User,
    PartyPopper,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { submitQuote } from '@/lib/actions';
import { quoteFormSchema } from '@/lib/validators';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const services = [
  { value: 'life-insurance', label: 'Life Insurance', icon: HeartPulse },
  { value: 'visitor-insurance', label: 'Visitor Insurance', icon: Plane },
  { value: 'super-visa-insurance', label: 'Supervisa Insurance', icon: FileText },
  { value: 'resp', label: 'RESP (Registered Education Savings Plan)', icon: GraduationCap },
  { value: 'tfsa', label: 'TFSA (Tax-Free Savings Account)', icon: Landmark },
  { value: 'rrsp', label: 'RRSP (Registered Retirement Savings Plan)', icon: PiggyBank },
  { value: 'health-dental', label: 'Extended Health and Dental Plan', icon: Stethoscope },
  { value: 'travel-insurance-canadians', label: 'Travel Insurance for Canadians', icon: Globe },
  { value: 'international-students-plan', label: 'International Students Plan', icon: User },
];

const steps = [
    { id: 'service', title: 'Service' },
    { id: 'service-details', title: 'Details' },
    { id: 'personal-info', title: 'About You' },
    { id: 'submit', title: 'Submit' },
];

export function QuoteForm() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            smoker: "No",
            pre_existing_conditions: "No",
            resp_has_savings: "No",
            tfsa_has_existing: "No",
            rrsp_has_existing: "No",
            health_has_existing_plan: "No",
            travel_pre_existing_conditions: "No",
            international_pre_existing_conditions: "No"
        },
    });

    const selectedService = form.watch('service');

    const onSubmit = (data: QuoteFormData) => {
        startTransition(async () => {
            const result = await submitQuote(data);

            if (result.success) {
                router.push('/quote-submitted');
            } else {
                 const message = result.message || "Please check the form fields.";
                 toast({
                    title: "Submission Failed",
                    description: message,
                    variant: 'destructive',
                 });
                 // This part might need adjustment if issues are not field-specific
                 if (result.issues) {
                    result.issues.forEach(issue => {
                        form.setError(issue.path[0] as keyof QuoteFormData, { type: 'server', message: issue.message });
                    });
                 }
            }
        });
    };

    const getFieldsForStep = (stepIndex: number) => {
        const service = form.watch('service');
        if (stepIndex === 0) return ['service'];
        if (stepIndex === 1) { // Service-specific questions
            switch (service) {
                case 'life-insurance': return ['gender', 'smoker', 'coverage_amount_life', 'term_length', 'pre_existing_conditions', 'smoker_details', 'conditions_details_life'];
                case 'visitor-insurance': return ['coverage_start_date_visitor', 'coverage_end_date_visitor', 'coverage_amount_visitor', 'pre_existing_conditions', 'conditions_details_visitor', 'purpose_of_visit'];
                case 'super-visa-insurance': return ['coverage_amount_super_visa', 'pre_existing_conditions', 'conditions_details_super_visa', 'coverage_duration_super_visa', 'relationship_to_applicant'];
                case 'resp': return ['resp_contribution_goal', 'resp_investment_horizon', 'resp_has_savings', 'resp_savings_amount'];
                case 'tfsa': return ['tfsa_annual_contribution', 'tfsa_investment_style', 'tfsa_has_existing', 'tfsa_existing_amount', 'tfsa_start_contribution'];
                case 'rrsp': return ['rrsp_retirement_age', 'rrsp_annual_contribution', 'rrsp_investment_style', 'rrsp_has_existing', 'rrsp_existing_balance', 'rrsp_start_advice'];
                case 'health-dental': return ['health_has_existing_plan', 'health_existing_coverage_details', 'health_coverage_need', 'health_who_needs_coverage'];
                case 'travel-insurance-canadians': return ['travel_destination', 'travel_start_date', 'travel_end_date', 'travel_coverage_amount', 'travel_pre_existing_conditions', 'travel_conditions_details'];
                case 'international-students-plan': return ['international_school_name', 'international_coverage_start_date', 'international_coverage_end_date', 'international_coverage_amount', 'international_pre_existing_conditions', 'international_conditions_details'];
                default: return [];
            }
        }
        if (stepIndex === 2) return ['full_name', 'dob', 'email', 'phone', 'city_province'];
        if (stepIndex === 3) return []; // Review step
        return [];
    };

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(currentStep) as (keyof QuoteFormData)[];
        const isValid = await form.trigger(fieldsToValidate);
        
        if (isValid) {
            setCurrentStep((prev) => prev + 1);
        } else {
            toast({
                title: "Incomplete Step",
                description: "Please fill out all required fields before continuing.",
                variant: 'destructive'
            })
        }
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);
    
    const progress = ((currentStep + 1) / steps.length) * 100;

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return <StepService />;
            case 1: return <StepServiceDetails service={selectedService} />;
            case 2: return <StepContactInfo />;
            case 3: return <StepReview formValues={form.getValues()} />;
            default: return null;
        }
    };
    
    return (
        <FormProvider {...form}>
            <div className="mb-12 space-y-4">
                <Progress value={progress} className="w-full h-2" />
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-medium">
                       Step {currentStep + 1} of {steps.length}: <span className="text-primary">{steps[currentStep].title}</span>
                    </p>
                </div>
            </div>
             <form onSubmit={form.handleSubmit(onSubmit)}>
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-between mt-8">
                    {currentStep > 0 && <Button type="button" variant="outline" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>}
                    {currentStep < steps.length - 1 && <Button type="button" onClick={nextStep} className="ml-auto">Continue <ChevronRight className="ml-2" /></Button>}
                    {currentStep === steps.length - 1 && (
                        <Button type="submit" disabled={isPending} className="ml-auto">
                            {isPending ? <><Loader2 className="animate-spin" /> Submitting...</> : <><PartyPopper className="mr-2" /> Get My Quote</>}
                        </Button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}

// Step Components

const StepService = () => {
    const { control, formState: { errors } } = useFormContext();
    return (
         <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What service are you interested in?</h2>
             <Controller
                name="service"
                control={control}
                render={({ field }) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(service => (
                        <Label key={service.value} className={cn(
                            "cursor-pointer p-4 border-2 rounded-lg transition-colors flex flex-col items-center justify-center text-center gap-2",
                            field.value === service.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"
                        )}>
                            <input
                                type="radio"
                                className="sr-only"
                                {...field}
                                value={service.value}
                                checked={field.value === service.value}
                            />
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <service.icon className="size-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">{service.label}</h3>
                        </Label>
                    ))}
                    </div>
                )}
            />
            {errors.service && <p className="text-sm text-red-500 text-center mt-4">{(errors.service as any).message}</p>}
        </div>
    );
};

const StepServiceDetails = ({ service }: { service: string }) => {
    const { register, control, watch, formState: { errors } } = useFormContext();
    
    const renderContent = () => {
        switch (service) {
            case 'life-insurance': return (
                <>
                    <FieldRadio name="gender" label="Gender" options={['Male', 'Female', 'Other']} />
                    <FieldRadio name="smoker" label="Smoker?" options={['Yes', 'No']} />
                    {watch('smoker') === 'Yes' && <FieldInput name="smoker_details" label="How many per day?" />}
                    <FieldSelect name="coverage_amount_life" label="Coverage Amount" options={['$100,000', '$250,000', '$500,000', '$1,000,000', 'Other']} />
                    <FieldSelect name="term_length" label="Term Length" options={['10 years', '20 years', 'Whole Life', 'Other']} />
                    <FieldRadio name="pre_existing_conditions" label="Pre-existing health conditions?" options={['Yes', 'No']} />
                    {watch('pre_existing_conditions') === 'Yes' && <FieldTextarea name="conditions_details_life" label="Please list conditions" />}
                </>
            );
            case 'visitor-insurance': return (
                 <>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FieldInput name="coverage_start_date_visitor" label="Coverage Start Date" type="date" />
                        <FieldInput name="coverage_end_date_visitor" label="Coverage End Date" type="date" />
                    </div>
                    <FieldSelect name="coverage_amount_visitor" label="Coverage Amount" options={['$25,000', '$50,000', '$100,000']} />
                    <FieldRadio name="pre_existing_conditions" label="Pre-existing Conditions?" options={['Yes', 'No']} />
                    {watch('pre_existing_conditions') === 'Yes' && <FieldTextarea name="conditions_details_visitor" label="Provide details" />}
                    <FieldInput name="purpose_of_visit" label="Purpose of Visit" placeholder="e.g., Tourism, Business" />
                </>
            );
            case 'super-visa-insurance': return (
                <>
                    <FieldSelect name="coverage_amount_super_visa" label="Coverage Amount" options={['$100,000', '$150,000', '$200,000', 'Other']} />
                    <FieldRadio name="pre_existing_conditions" label="Pre-existing Conditions?" options={['Yes', 'No']} />
                    {watch('pre_existing_conditions') === 'Yes' && <FieldTextarea name="conditions_details_super_visa" label="Provide details" />}
                    <FieldSelect name="coverage_duration_super_visa" label="Coverage Duration" options={['1 year', '2 years', 'Other']} />
                    <FieldRadio name="relationship_to_applicant" label="Relationship to Applicant" options={['Parent', 'Grandparent']} />
                </>
            );
            case 'resp': return (
                 <>
                    <FieldRadio name="resp_contribution_goal" label="Contribution Goal" options={['Monthly', 'One-time']} />
                    <FieldRadio name="resp_investment_horizon" label="Investment Horizon" options={['5 years', '10 years', '15+ years']} />
                    <FieldRadio name="resp_has_savings" label="Current Savings?" options={['Yes', 'No']} />
                    {watch('resp_has_savings') === 'Yes' && <FieldInput name="resp_savings_amount" label="How much saved so far?" />}
                 </>
            );
            case 'tfsa': return (
                <>
                    <FieldInput name="tfsa_annual_contribution" label="Annual Contribution Goal" />
                    <FieldRadio name="tfsa_investment_style" label="Investment Style" options={['Conservative', 'Balanced', 'Growth']} />
                    <FieldRadio name="tfsa_has_existing" label="Existing TFSA?" options={['Yes', 'No']} />
                    {watch('tfsa_has_existing') === 'Yes' && <FieldInput name="tfsa_existing_amount" label="How much already contributed?" />}
                    {watch('tfsa_has_existing') === 'No' && <FieldRadio name="tfsa_start_contribution" label="Would you like to start with a minimum contribution?" options={['Yes', 'No']} />}
                </>
            );
            case 'rrsp': return (
                <>
                    <FieldInput name="rrsp_retirement_age" label="Retirement Goal Age" type="number" />
                    <FieldInput name="rrsp_annual_contribution" label="Annual Contribution Amount" />
                    <FieldRadio name="rrsp_investment_style" label="Investment Style" options={['Safe', 'Moderate', 'Aggressive']} />
                    <FieldRadio name="rrsp_has_existing" label="Existing RRSP?" options={['Yes', 'No']} />
                    {watch('rrsp_has_existing') === 'Yes' && <FieldInput name="rrsp_existing_balance" label="Approximate balance?" />}
                    {watch('rrsp_has_existing') === 'No' && <FieldRadio name="rrsp_start_advice" label="Would you like advice on starting one?" options={['Yes', 'No']} />}
                </>
            );
            case 'health-dental': return (
                <>
                    <FieldRadio name="health_has_existing_plan" label="Do you have an existing plan?" options={['Yes', 'No']} />
                    {watch('health_has_existing_plan') === 'Yes' && <FieldTextarea name="health_existing_coverage_details" label="What coverage do you already have?" />}
                    {watch('health_has_existing_plan') === 'No' && <FieldSelect name="health_coverage_need" label="Which type of coverage do you need?" options={['Prescription', 'Dental', 'Vision', 'Full Package']} />}
                    <FieldRadio name="health_who_needs_coverage" label="Who needs coverage?" options={['Individual', 'Couple', 'Family']} />
                </>
            );
            case 'travel-insurance-canadians': return (
                 <>
                    <FieldInput name="travel_destination" label="Travel Destination(s)" />
                    <div className="grid md:grid-cols-2 gap-6">
                        <FieldInput name="travel_start_date" label="Travel Start Date" type="date" />
                        <FieldInput name="travel_end_date" label="Travel End Date" type="date" />
                    </div>
                    <FieldSelect name="travel_coverage_amount" label="Coverage Amount" options={['$100,000', '$500,000', '$1,000,000']} />
                    <FieldRadio name="travel_pre_existing_conditions" label="Pre-existing medical conditions?" options={['Yes', 'No']} />
                    {watch('travel_pre_existing_conditions') === 'Yes' && <FieldTextarea name="travel_conditions_details" label="Please list" />}
                </>
            );
            case 'international-students-plan': return (
                 <>
                    <FieldInput name="international_school_name" label="School/College Name" />
                     <div className="grid md:grid-cols-2 gap-6">
                        <FieldInput name="international_coverage_start_date" label="Coverage Start Date" type="date" />
                        <FieldInput name="international_coverage_end_date" label="Coverage End Date" type="date" />
                    </div>
                    <FieldSelect name="international_coverage_amount" label="Coverage Amount" options={['$50,000', '$100,000', '$200,000']} />
                    <FieldRadio name="international_pre_existing_conditions" label="Pre-existing Conditions?" options={['Yes', 'No']} />
                    {watch('international_pre_existing_conditions') === 'Yes' && <FieldTextarea name="international_conditions_details" label="Please list" />}
                </>
            );
            default: return <p>Please select a service to see the relevant questions.</p>;
        }
    }
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provide Some Details</h2>
            <div className="space-y-6">
                {renderContent()}
            </div>
        </div>
    );
};

const StepContactInfo = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tell us about yourself</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldInput name="full_name" label="Full Name" />
                <FieldInput name="dob" label="Date of Birth" type="date" />
                <FieldInput name="email" label="Email Address" type="email" />
                <FieldInput name="phone" label="Phone Number" type="tel" />
                <div className="md:col-span-2">
                    <FieldInput name="city_province" label="City/Province" />
                </div>
            </div>
        </div>
    );
};

const StepReview = ({ formValues }: { formValues: any }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Review & Submit</h2>
            <div className="space-y-4">
                {Object.entries(formValues).map(([key, value]) => {
                    // Don't show empty values or the service object
                    if (!value || typeof value === 'object' && value !== null) return null;

                    // A simple way to format the key for display
                    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    return (
                        <div key={key} className="flex justify-between items-center bg-muted/50 px-4 py-2 rounded-md">
                            <span className="text-sm font-medium text-gray-600">{label}:</span>
                            <span className="text-sm text-gray-900 text-right">{String(value)}</span>
                        </div>
                    );
                })}
            </div>
             <p className="text-xs text-muted-foreground mt-8 text-center">By clicking "Get My Quote", you agree to our terms and conditions. We will use this information to provide you with an accurate insurance quote.</p>
        </div>
    );
};


// Field Components
const FieldInput = ({ name, label, type = "text", placeholder }: any) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} type={type} {...register(name)} placeholder={placeholder} />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{(errors[name] as any)?.message}</p>}
        </div>
    );
}

const FieldTextarea = ({ name, label }: any) => {
     const { register, formState: { errors } } = useFormContext();
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Textarea id={name} {...register(name)} />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{(errors[name] as any)?.message}</p>}
        </div>
    );
}

const FieldSelect = ({ name, label, options }: any) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <div>
            <Label>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder={`Select ${label.toLowerCase()}`} /></SelectTrigger>
                        <SelectContent>
                            {options.map((opt: string) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{(errors[name] as any)?.message}</p>}
        </div>
    );
}

const FieldRadio = ({ name, label, options }: any) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <div>
            <Label>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4 mt-2">
                        {options.map((opt: string) => (
                            <Label key={opt} className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary text-sm">
                                <RadioGroupItem value={opt} /> {opt}
                            </Label>
                        ))}
                    </RadioGroup>
                )}
            />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{(errors[name] as any)?.message}</p>}
        </div>
    );
}

    