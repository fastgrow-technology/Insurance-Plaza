
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { z } from 'zod';
import type { quoteFormSchema } from '@/lib/validators';

type QuoteSubmission = z.infer<typeof quoteFormSchema> & { id: number, created_at: string };

const DetailItem = ({ label, value }: { label: string, value: any }) => {
    if (!value) return null;
    return (
        <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium text-lg capitalize">{String(value)}</p>
        </div>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-secondary mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

export default async function QuoteDetailPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('quote_submissions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    notFound();
  }
  
  const submission = data as unknown as QuoteSubmission;

  return (
    <div className="flex min-h-screen w-full flex-col">
       <main className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/submissions/quotes">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Quotes</span>
                    </Link>
                </Button>
                <h1 className="text-xl md:text-2xl font-semibold">
                    Quote Submission Details
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {submission.full_name}
                    </CardTitle>
                    <CardDescription>
                        Received on {format(new Date(submission.created_at), 'PPP p')} for <span className="font-semibold text-primary">{submission.service}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Section title="Personal Information">
                        <DetailItem label="Full Name" value={submission.full_name} />
                        <DetailItem label="Date of Birth" value={submission.dob ? format(new Date(submission.dob), 'PPP') : 'N/A'} />
                        <DetailItem label="Email Address" value={submission.email} />
                        <DetailItem label="Phone Number" value={submission.phone} />
                        <DetailItem label="City/Province" value={submission.city_province} />
                    </Section>
                    
                    <Section title="Service-Specific Details">
                        {submission.service === 'life-insurance' && (
                            <>
                                <DetailItem label="Gender" value={submission.gender} />
                                <DetailItem label="Smoker" value={submission.smoker} />
                                <DetailItem label="Smoker Details" value={submission.smoker_details} />
                                <DetailItem label="Coverage Amount" value={submission.coverage_amount_life} />
                                <DetailItem label="Term Length" value={submission.term_length} />
                                <DetailItem label="Pre-existing Conditions" value={submission.pre_existing_conditions} />
                                <DetailItem label="Condition Details" value={submission.conditions_details_life} />
                            </>
                        )}
                         {submission.service === 'visitor-insurance' && (
                            <>
                                <DetailItem label="Coverage Start" value={submission.coverage_start_date_visitor} />
                                <DetailItem label="Coverage End" value={submission.coverage_end_date_visitor} />
                                <DetailItem label="Coverage Amount" value={submission.coverage_amount_visitor} />
                                <DetailItem label="Pre-existing Conditions" value={submission.pre_existing_conditions} />
                                <DetailItem label="Condition Details" value={submission.conditions_details_visitor} />
                                <DetailItem label="Purpose of Visit" value={submission.purpose_of_visit} />
                            </>
                        )}
                        {submission.service === 'super-visa-insurance' && (
                             <>
                                <DetailItem label="Coverage Amount" value={submission.coverage_amount_super_visa} />
                                <DetailItem label="Pre-existing Conditions" value={submission.pre_existing_conditions} />
                                <DetailItem label="Condition Details" value={submission.conditions_details_super_visa} />
                                <DetailItem label="Coverage Duration" value={submission.coverage_duration_super_visa} />
                                <DetailItem label="Relationship to Applicant" value={submission.relationship_to_applicant} />
                            </>
                        )}
                         {submission.service === 'resp' && (
                             <>
                                <DetailItem label="Contribution Goal" value={submission.resp_contribution_goal} />
                                <DetailItem label="Investment Horizon" value={submission.resp_investment_horizon} />
                                <DetailItem label="Has Savings?" value={submission.resp_has_savings} />
                                <DetailItem label="Savings Amount" value={submission.resp_savings_amount} />
                            </>
                        )}
                         {submission.service === 'tfsa' && (
                             <>
                                <DetailItem label="Annual Contribution Goal" value={submission.tfsa_annual_contribution} />
                                <DetailItem label="Investment Style" value={submission.tfsa_investment_style} />
                                <DetailItem label="Has Existing TFSA?" value={submission.tfsa_has_existing} />
                                <DetailItem label="Existing Amount" value={submission.tfsa_existing_amount} />
                                <DetailItem label="Start with Minimum?" value={submission.tfsa_start_contribution} />
                            </>
                        )}
                         {submission.service === 'rrsp' && (
                             <>
                                <DetailItem label="Retirement Age Goal" value={submission.rrsp_retirement_age} />
                                <DetailItem label="Annual Contribution" value={submission.rrsp_annual_contribution} />
                                <DetailItem label="Investment Style" value={submission.rrsp_investment_style} />
                                <DetailItem label="Has Existing RRSP?" value={submission.rrsp_has_existing} />
                                <DetailItem label="Existing Balance" value={submission.rrsp_existing_balance} />
                                <DetailItem label="Wants Advice?" value={submission.rrsp_start_advice} />
                            </>
                        )}
                         {submission.service === 'health-dental' && (
                             <>
                                <DetailItem label="Has Existing Plan?" value={submission.health_has_existing_plan} />
                                <DetailItem label="Existing Coverage Details" value={submission.health_existing_coverage_details} />
                                <DetailItem label="Coverage Needed" value={submission.health_coverage_need} />
                                <DetailItem label="Who Needs Coverage?" value={submission.health_who_needs_coverage} />
                            </>
                        )}
                         {submission.service === 'travel-insurance-canadians' && (
                             <>
                                <DetailItem label="Destination" value={submission.travel_destination} />
                                <DetailItem label="Start Date" value={submission.travel_start_date} />
                                <DetailItem label="End Date" value={submission.travel_end_date} />
                                <DetailItem label="Coverage Amount" value={submission.travel_coverage_amount} />
                                <DetailItem label="Pre-existing Conditions" value={submission.travel_pre_existing_conditions} />
                                <DetailItem label="Condition Details" value={submission.travel_conditions_details} />
                            </>
                        )}
                         {submission.service === 'international-students-plan' && (
                             <>
                                <DetailItem label="School Name" value={submission.international_school_name} />
                                <DetailItem label="Start Date" value={submission.international_coverage_start_date} />
                                <DetailItem label="End Date" value={submission.international_coverage_end_date} />
                                <DetailItem label="Coverage Amount" value={submission.international_coverage_amount} />
                                <DetailItem label="Pre-existing Conditions" value={submission.international_pre_existing_conditions} />
                                <DetailItem label="Condition Details" value={submission.international_conditions_details} />
                            </>
                        )}
                    </Section>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
