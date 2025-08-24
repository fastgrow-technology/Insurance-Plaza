
import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Handshake, Target } from 'lucide-react';
import { getPageBySlug } from '@/lib/data/server';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TeamMember } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about');
  return {
    title: page?.title || 'About Us | Insurance Plaza',
    description: page?.description || 'Learn about Insurance Plaza, our mission, our values, and the dedicated team working to protect your future.',
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug('about');
  const content = page?.content || {};
  const showSection = (section: string) => content?.[section]?.enabled !== false;

  const supabase = createSupabaseServerClient();
  const { data: teamMembers } = await supabase.from('team_members').select('*');

  return (
    <div className="bg-background">
      {showSection('hero') && content.hero && (
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={content.hero?.image || "https://placehold.co/1920x400.png"}
            alt="About Us"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="company team meeting"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-relaxed mb-6 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.title || "About Insurance Plaza"}</h1>
                    <p className="text-xl text-white/90 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.subtitle || "Your dedicated partner in navigating the world of insurance with confidence and ease."}</p>
                </div>
            </div>
        </div>
      </section>
      )}

      {showSection('story') && content.story && (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary tracking-tight">{content.story?.title || "Our Story"}</h2>
              <p className="mt-4 text-muted-foreground">
                {content.story?.text_1 || "Founded in 2010, Insurance Plaza was born from a desire to simplify the insurance process and put people first. We saw a need for an insurance provider that was transparent, trustworthy, and genuinely cared about its clients' well-being."}
              </p>
              <p className="mt-4 text-muted-foreground">
                {content.story?.text_2 || "Over the past decade, we have grown into a leading provider, serving thousands of individuals and families. Our commitment to our founding principles remains unwavering as we continue to innovate and adapt to the evolving needs of our clients."}
              </p>
            </div>
            <div>
              <Image
                src={content.story?.image || "https://placehold.co/600x400.png"}
                alt="Our office"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="modern office building"
              />
            </div>
          </div>
        </div>
      </section>
      )}
      
      {showSection('mission_vision') && content.mission_vision && (
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary tracking-tight">{content.mission_vision?.title || "Our Mission & Values"}</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              {content.mission_vision?.subtitle || "Our principles guide every decision we make and every interaction we have."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Target className="size-8 text-primary" />
                </div>
                <CardTitle>{content.mission_vision?.mission_title || "Our Mission"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {content.mission_vision?.mission_text || "To provide accessible, affordable, and comprehensive insurance solutions, empowering our clients to live their lives with financial security and peace of mind."}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Handshake className="size-8 text-primary" />
                </div>
                <CardTitle>{content.mission_vision?.values_title || "Our Values"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {content.mission_vision?.values_text || "We operate with integrity, empathy, and a commitment to excellence. We build lasting relationships based on trust and mutual respect."}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="size-8 text-primary" />
                </div>
                <CardTitle>{content.mission_vision?.commitment_title || "Our Commitment"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {content.mission_vision?.commitment_text || "We are committed to being there for our clients when they need us most, providing swift, fair, and compassionate support through every claim."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}
      
      {showSection('founder') && content.founder && (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-last md:order-first">
                        <h2 className="text-3xl font-bold text-secondary tracking-tight">{content.founder.title || "A Message from Our Founder"}</h2>
                        <p className="mt-4 text-muted-foreground">
                            {content.founder.paragraph || "Placeholder text for the founder's message. This can be updated from the admin panel."}
                        </p>
                    </div>
                    <div>
                        <Image
                            src={content.founder.image || "https://placehold.co/600x600.png"}
                            alt={content.founder.title || "Founder"}
                            width={600}
                            height={600}
                            className="rounded-lg shadow-md aspect-square object-cover"
                            data-ai-hint="company founder portrait"
                        />
                    </div>
                </div>
            </div>
        </section>
      )}

      {showSection('team') && (
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary tracking-tight">Meet Our Team</h2>
            <p className="mt-2 text-muted-foreground">The experts dedicated to your protection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers?.map((member: TeamMember) => (
              <Card key={member.id} className="text-center border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
