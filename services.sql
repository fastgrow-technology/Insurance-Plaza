-- Clear existing services to avoid duplicates
TRUNCATE TABLE services RESTART IDENTITY CASCADE;

-- Insert all services with detailed content
INSERT INTO services (
  slug, title, image, short_description, icon_svg,
  show_benefits, benefits,
  show_target_audience, target_audience,
  show_plans, plans,
  show_steps, steps,
  show_faqs, faqs,
  show_related_services, related_services,
  content_sections
) VALUES
(
  'life-insurance',
  'Life Insurance',
  'https://placehold.co/1920x400.png',
  'Secure your family''s future with comprehensive life insurance plans that provide financial stability when they need it most.',
  null,
  true,
  '[
    {"title": "Financial Security", "description": "Provide a financial safety net for your loved ones in your absence."},
    {"title": "Debt Coverage", "description": "Cover outstanding debts like mortgages, loans, and final expenses."},
    {"title": "Income Replacement", "description": "Replace your income to help your family maintain their standard of living."},
    {"title": "Tax-Free Benefit", "description": "The death benefit is generally paid out tax-free to your beneficiaries."}
  ]',
  true,
  'Anyone who has dependents, financial obligations, or wants to leave a financial legacy for their loved ones. It''s essential for breadwinners, parents, and homeowners.',
  false, '[]',
  true,
  '[
    {"title": "Assess Your Needs", "description": "We''ll help you determine the right amount of coverage based on your income, debts, and future goals."},
    {"title": "Compare Plans", "description": "Choose from a variety of term, whole, and universal life insurance policies to find the best fit."},
    {"title": "Apply & Get Covered", "description": "Our streamlined application process makes it easy to get the protection you need quickly."}
  ]',
  true,
  '[
    {"question": "What''s the difference between term and whole life insurance?", "answer": "Term life insurance provides coverage for a specific period (e.g., 10, 20, or 30 years), while whole life insurance provides lifelong coverage and includes a cash value component that grows over time."},
    {"question": "How much life insurance do I need?", "answer": "A common rule of thumb is 10-12 times your annual income, but the right amount depends on your individual circumstances, including your debts, assets, and your family''s future financial needs."},
    {"question": "Can I get life insurance if I have a medical condition?", "answer": "Yes, in many cases, you can still get life insurance with a medical condition, although it may affect your premium. We specialize in finding solutions for various health profiles."}
  ]',
  true,
  '{"visitor-insurance", "super-visa-insurance", "health-dental"}',
  '[
    {"type": "text-image", "title": "Protecting Your Family''s Tomorrow, Today", "text": "Life insurance is a fundamental part of a sound financial plan. It''s a promise you make to your loved ones that they will be taken care of, no matter what the future holds. Whether it''s ensuring your children can afford a good education, your spouse can stay in the family home, or your business can continue to operate, a life insurance policy provides the ultimate peace of mind. We offer a range of customizable options to fit your unique needs and budget, ensuring your legacy is one of security and care.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Choosing the Right Policy for You", "text": "Navigating the world of life insurance can be complex. That''s why we''re here to simplify it for you. We''ll walk you through the key differences between Term Life, Whole Life, and Universal Life policies. We''ll discuss riders and add-ons that can enhance your coverage, such as critical illness or disability benefits. Our goal is to empower you with the knowledge to make an informed decision that aligns perfectly with your long-term financial objectives and family needs.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'visitor-insurance',
  'Visitor Insurance',
  'https://placehold.co/1920x400.png',
  'Protect your visiting family and friends with emergency medical coverage for unexpected health issues during their stay in Canada.',
  null,
  true,
  '[
    {"title": "Emergency Medical", "description": "Coverage for unforeseen medical emergencies, hospitalization, and doctor visits."},
    {"title": "Flexible Plans", "description": "Choose from various coverage amounts and deductible options to suit your budget."},
    {"title": "Peace of Mind", "description": "Enjoy your time with loved ones, knowing they are protected from high medical costs."},
    {"title": "Side Trips Covered", "description": "Coverage can extend to side trips outside of Canada (excluding home country)."}
  ]',
  true,
  'For individuals visiting Canada on a tourist visa, for family members visiting from another country, or for new immigrants awaiting government health plan coverage.',
  false, '[]',
  true,
  '[
    {"title": "Get a Quote", "description": "Provide the visitor''s age, trip duration, and desired coverage amount."},
    {"title": "Select Your Plan", "description": "Choose the plan that best fits your needs, with or without coverage for pre-existing conditions."},
    {"title": "Purchase Online", "description": "Receive your policy documents instantly via email. It''s that simple."}
  ]',
  true,
  '[
    {"question": "Does this cover pre-existing medical conditions?", "answer": "You can choose a plan that includes coverage for stable pre-existing conditions. A condition is typically considered stable if there have been no changes in medication or treatment for a specific period before the policy starts."},
    {"question": "When should I buy visitor insurance?", "answer": "It is highly recommended to purchase visitor insurance before the visitor arrives in Canada to ensure they are covered from the moment they land."},
    {"question": "Can I get a refund if the visitor leaves early?", "answer": "Yes, partial refunds are often available for the unused portion of the policy if the visitor returns to their home country early and has not made a claim. Conditions apply."}
  ]',
  true,
  '{"super-visa-insurance", "travel-insurance", "international-students-plan"}',
  '[
    {"type": "text-image", "title": "Worry-Free Visits for Your Loved Ones", "text": "When friends and family visit from abroad, the last thing you want to worry about is a medical emergency. Canadian healthcare costs can be extremely high for non-residents. Visitor Insurance provides essential coverage for unexpected accidents and sicknesses, from a walk-in clinic visit to a hospital stay. It ensures your guests can get the medical attention they need without facing a significant financial burden, allowing everyone to focus on enjoying their time together.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Simple, Fast, and Reliable Coverage", "text": "We make getting visitor insurance straightforward. With a simple online application, you can secure coverage in minutes. We offer a variety of plans from Canada''s top insurance providers, with options for different coverage amounts, deductibles, and even for stable pre-existing conditions. Let us help you find the right protection for your visitors, so you can have peace of mind during their entire stay.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'super-visa-insurance',
  'Supervisa Insurance',
  'https://placehold.co/1920x400.png',
  'Meet IRCC requirements with mandatory medical insurance for parents and grandparents visiting Canada on a Super Visa.',
  null,
  true,
  '[
    {"title": "IRCC Compliant", "description": "Plans meet and exceed the government''s requirements for Super Visa applicants."},
    {"title": "Minimum $100,000 Coverage", "description": "Secure the mandatory minimum of $100,000 in emergency medical coverage."},
    {"title": "Valid for 365 Days", "description": "Policies are valid for one full year, as required for the Super Visa application."},
    {"title": "Monthly Payment Options", "description": "Flexible payment plans are available to make the premium more manageable."}
  ]',
  true,
  'For Canadian citizens and permanent residents who are applying for the Super Visa program to bring their parents or grandparents to Canada for an extended stay.',
  false, '[]',
  true,
  '[
    {"title": "Instant Quote", "description": "Enter the applicants'' details to receive competitive quotes from leading Canadian insurers."},
    {"title": "Customize Your Plan", "description": "Select coverage options and payment plans that work for your family."},
    {"title": "Receive Documents", "description": "Get all necessary policy documents immediately to include in your IRCC application."}
  ]',
  true,
  '[
    {"question": "What are the requirements for Super Visa insurance?", "answer": "You need proof of private medical insurance from a Canadian insurance company that is valid for at least one year, provides a minimum of $100,000 in coverage, and covers healthcare, hospitalization, and repatriation."},
    {"question": "Can I pay for the policy in installments?", "answer": "Yes, many of our providers offer convenient monthly payment plans to help spread out the cost of the annual premium."},
    {"question": "What happens if the Super Visa application is denied?", "answer": "If the Super Visa application is denied, you can typically receive a full refund for your insurance premium, provided you show proof of the denial."}
  ]',
  true,
  '{"visitor-insurance", "life-insurance", "health-dental"}',
  '[
    {"type": "text-image", "title": "Reunite Your Family with Confidence", "text": "The Super Visa is a fantastic option for bringing parents and grandparents to Canada for longer visits. A key requirement is having the right medical insurance. Our Super Visa insurance plans are specifically designed to meet all Immigration, Refugees and Citizenship Canada (IRCC) standards. We provide the necessary proof of coverage you need for a smooth application process, helping you reunite with your family without unnecessary stress or delays.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Affordable and Comprehensive Protection", "text": "We believe that bringing your family to Canada should be affordable. We compare policies from Canada''s most trusted insurers to find you the best rates. Whether you need a basic plan that meets the minimum requirements or a more comprehensive policy that covers stable pre-existing conditions, we have a solution. We offer flexible payment options, including monthly plans, to make the cost manageable for your family''s budget.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'resp',
  'RESP (Registered Education Savings Plan)',
  'https://placehold.co/1920x400.png',
  'Invest in your child''s future education with an RESP and take advantage of government grants to grow your savings faster.',
  null,
  true,
  '[
    {"title": "Government Grants", "description": "Receive the Canada Education Savings Grant (CESG) - an extra 20% on your contributions."},
    {"title": "Tax-Deferred Growth", "description": "Your investments grow tax-free within the RESP until withdrawn for education."},
    {"title": "Flexible Contributions", "description": "Contribute at your own pace with options that fit your family''s budget."},
    {"title": "Wide Range of Uses", "description": "Funds can be used for tuition, books, housing, and other post-secondary expenses."}
  ]',
  true,
  'For parents, grandparents, and family friends who want to save for a child''s post-secondary education in a tax-advantaged way and benefit from government grants.',
  false, '[]',
  true,
  '[
    {"title": "Open an Account", "description": "We''ll help you set up an individual or family RESP plan quickly and easily."},
    {"title": "Set Up Contributions", "description": "Decide on a contribution schedule that works for you, and we''ll handle the rest."},
    {"title": "Watch It Grow", "description": "Benefit from compound growth and government grants to build a substantial education fund."}
  ]',
  true,
  '[
    {"question": "How does the CESG grant work?", "answer": "The government matches 20% of your annual contributions, up to $500 per year, with a lifetime maximum of $7,200 per child. Some families may also qualify for the Additional CESG."},
    {"question": "What happens if my child doesn''t go to college or university?", "answer": "You have several options. You can transfer the funds to another beneficiary, transfer the earnings to your RRSP (if you have room), or withdraw your contributions tax-free. The grant portion must be returned to the government."},
    {"question": "What can RESP funds be used for?", "answer": "Funds can be used for a wide range of expenses at qualifying post-secondary institutions, including universities, colleges, trade schools, and apprenticeship programs. This includes tuition, accommodation, books, and supplies."}
  ]',
  true,
  '{"tfsa", "rrsp", "life-insurance"}',
  '[
    {"type": "text-image", "title": "Investing in Their Bright Future", "text": "A post-secondary education is one of the most valuable gifts you can give a child. A Registered Education Savings Plan (RESP) is the smartest way to save for it. Not only do your contributions grow tax-deferred, but the government also helps you save with the Canada Education Savings Grant (CESG). This powerful combination helps you build a substantial education fund, opening doors for your child''s future without the burden of heavy student loans.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Maximize Your Savings with Expert Guidance", "text": "We make it easy to start and manage an RESP. We''ll help you choose the right investment strategy based on your timeline and risk tolerance, from conservative options to growth-focused portfolios. We ensure you maximize all available government grants and provide clear, ongoing advice to keep your education savings plan on track. Start today and give your child the head start they deserve.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'tfsa',
  'TFSA (Tax Free Savings Account)',
  'https://placehold.co/1920x400.png',
  'Grow your money completely tax-free. A TFSA is a powerful and flexible tool for saving towards any goal, big or small.',
  null,
  true,
  '[
    {"title": "Tax-Free Growth", "description": "All investment income, capital gains, and dividends earned within a TFSA are completely tax-free."},
    {"title": "Tax-Free Withdrawals", "description": "Withdraw your money at any time, for any reason, without paying any tax."},
    {"title": "Flexible Contributions", "description": "Unused contribution room is carried forward, and withdrawn amounts are added back the following year."},
    {"title": "Versatile Savings Tool", "description": "Perfect for short-term goals like a vacation or down payment, or long-term retirement savings."}
  ]',
  true,
  'For any Canadian resident aged 18 or older who wants a flexible way to save and invest their money without being taxed on the growth or withdrawals.',
  false, '[]',
  false, '[]',
  true,
  '[
    {"question": "What is the annual TFSA contribution limit?", "answer": "The TFSA dollar limit varies each year. For 2024, the limit is $7,000. If you''ve never contributed and were eligible since 2009, your total contribution room could be as high as $95,000."},
    {"question": "Can I hold stocks and ETFs in a TFSA?", "answer": "Yes, a TFSA is not just a savings account. You can hold a wide variety of investments, including GICs, bonds, stocks, mutual funds, and ETFs, all of which grow tax-free."},
    {"question": "What''s the difference between a TFSA and an RRSP?", "answer": "The main difference is how they are taxed. RRSP contributions are tax-deductible, and withdrawals are taxed as income. TFSA contributions are not tax-deductible, but all growth and withdrawals are completely tax-free."}
  ]',
  true,
  '{"rrsp", "resp", "life-insurance"}',
  '[
    {"type": "text-image", "title": "The Ultimate Flexible Savings Tool", "text": "The Tax-Free Savings Account (TFSA) is one of the most powerful savings tools available to Canadians. It allows you to save or invest money up to your contribution limit, and you won''t pay a single cent of tax on the investment income you earn. Whether you''re saving for a down payment on a house, a new car, a dream vacation, or supplementing your retirement, the TFSA offers unparalleled flexibility and tax-free growth.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Unlock Your Investment Potential", "text": "Don''t let the name fool you; a TFSA is much more than a simple savings account. It''s a versatile investment vehicle. You can hold a wide range of investments like stocks, bonds, GICs, and mutual funds within your TFSA. We can help you set up a TFSA and create an investment strategy that aligns with your financial goals, helping you harness the full power of tax-free compounding to reach your dreams faster.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'rrsp',
  'RRSP (Registered Retirement Savings Plan)',
  'https://placehold.co/1920x400.png',
  'Save for your retirement and reduce your taxable income today. An RRSP is a cornerstone of long-term financial planning.',
  null,
  true,
  '[
    {"title": "Tax-Deductible Contributions", "description": "Lower your annual taxable income by deducting your RRSP contributions."},
    {"title": "Tax-Deferred Growth", "description": "Your investments grow tax-deferred until you retire, maximizing compound growth."},
    {"title": "Retirement Savings", "description": "The primary tool for building a nest egg for a comfortable retirement."},
    {"title": "Home Buyers'' Plan", "description": "Withdraw funds tax-free to use as a down payment on your first home."}
  ]',
  true,
  'For individuals who are earning an income and want to save for retirement while deferring taxes to a later date when their income may be lower.',
  false, '[]',
  false, '[]',
  true,
  '[
    {"question": "How much can I contribute to my RRSP?", "answer": "Your contribution limit is 18% of your previous year''s earned income, up to a maximum amount set by the government for the year, plus any unused room from previous years."},
    {"question": "What is the deadline for RRSP contributions?", "answer": "You can contribute to your RRSP for a given tax year up to 60 days into the following year (typically until March 1st)."},
    {"question": "What happens when I withdraw from my RRSP?", "answer": "Withdrawals from an RRSP are considered taxable income and are subject to withholding tax at the time of withdrawal. The idea is to withdraw during retirement when you are in a lower tax bracket."}
  ]',
  true,
  '{"tfsa", "resp", "life-insurance"}',
  '[
    {"type": "text-image", "title": "Building a Foundation for Your Retirement", "text": "A Registered Retirement Savings Plan (RRSP) is an essential tool for securing a comfortable future. Every contribution you make is tax-deductible, reducing the amount of income tax you pay today. Inside the plan, your investments grow tax-deferred, meaning you don''t pay tax on the earnings until you withdraw them in retirement. This powerful combination allows your retirement savings to grow significantly faster.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Strategic Retirement Planning", "text": "We do more than just open an RRSP account for you. We provide strategic advice on how to maximize your contributions, choose the right investment mix, and integrate your RRSP with your other financial goals, like using the Home Buyers'' Plan. We''ll help you build a comprehensive retirement strategy that ensures you can enjoy your golden years with financial confidence and security.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'health-dental',
  'Extended Health and Dental Plan',
  'https://placehold.co/1920x400.png',
  'Bridge the gaps in your provincial health plan with coverage for prescription drugs, dental care, vision, and more.',
  null,
  true,
  '[
    {"title": "Prescription Drugs", "description": "Coverage for medications not covered by your provincial health plan."},
    {"title": "Dental Care", "description": "Includes routine check-ups, cleanings, fillings, and major dental procedures."},
    {"title": "Vision Care", "description": "Coverage for eye exams, prescription glasses, and contact lenses."},
    {"title": "Paramedical Services", "description": "Access to services like massage therapy, physiotherapy, and chiropractic care."}
  ]',
  true,
  'For self-employed individuals, small business owners, retirees, and anyone not covered by a group benefits plan who wants protection from routine and unexpected health costs.',
  false, '[]',
  false, '[]',
  true,
  '[
    {"question": "Why do I need health insurance if I have a provincial plan?", "answer": "Provincial plans (like OHIP) don''t cover many common medical expenses, including most prescription drugs, dental services, vision care, and registered specialists. Private health insurance helps pay for these costs."},
    {"question": "Can I get a plan that only covers dental?", "answer": "Yes, we offer a variety of plans, including standalone dental plans as well as comprehensive packages that combine health, dental, and more."},
    {"question": "Are my premiums a tax-deductible expense?", "answer": "If you are self-employed, you can often deduct your private health insurance premiums as a business expense. We recommend consulting with a tax professional for advice specific to your situation."}
  ]',
  true,
  '{"life-insurance", "visitor-insurance", "travel-insurance"}',
  '[
    {"type": "text-image", "title": "Complete Health and Wellness Coverage", "text": "Your provincial health plan provides a solid foundation, but it doesn''t cover everything. Unexpected dental bills, the cost of prescription medication, or the need for vision care can quickly add up. An Extended Health and Dental Plan fills these crucial gaps. It provides financial protection and ensures you and your family can access the care you need to stay healthy, without worrying about the cost.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Customizable Plans for Your Lifestyle", "text": "We understand that everyone''s health needs are different. That''s why we offer flexible and affordable plans that you can tailor to your specific needs. Whether you''re a freelancer, a small business owner, or a retiree, we have a plan for you. Choose the level of coverage you want for prescription drugs, dental, vision, paramedical services, and more, creating a personalized health plan that fits your life and budget.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'travel-insurance',
  'Travel Insurance for Canadians',
  'https://placehold.co/1920x400.png',
  'Travel the world with confidence. Our travel insurance plans protect you from medical emergencies and trip disruptions.',
  null,
  true,
  '[
    {"title": "Emergency Medical", "description": "Up to $10 million in coverage for medical emergencies while traveling outside of Canada."},
    {"title": "Trip Cancellation & Interruption", "description": "Get reimbursed for non-refundable travel costs if your trip is cancelled or cut short."},
    {"title": "Baggage Loss & Delay", "description": "Coverage for lost, stolen, or delayed baggage and personal effects."},
    {"title": "24/7 Assistance", "description": "Worldwide, multilingual emergency assistance is just a phone call away."}
  ]',
  true,
  'For Canadian residents traveling outside their home province or outside of Canada for vacation, business, or any other reason.',
  true,
  '[
    {"name": "Single Trip Plan", "price": "From $2/day", "features": ["Coverage for one specific trip", "Ideal for vacations and short getaways", "Choose your exact travel dates"]},
    {"name": "Multi-Trip Annual Plan", "price": "From $150/year", "features": ["Coverage for unlimited trips within a year", "Perfect for frequent travellers", "Choose a maximum trip duration (e.g., 15, 30 days)"]},
    {"name": "All-Inclusive Plan", "price": "Varies", "features": ["Bundles medical, trip cancellation, and baggage", "Comprehensive, worry-free coverage", "Often the best value for total protection"]}
  ]',
  false, '[]',
  true,
  '[
    {"question": "Doesn''t my provincial plan cover me when I travel?", "answer": "Your provincial health plan (like OHIP) covers very little, often less than 10%, of medical costs incurred outside of Canada. A medical emergency in a country like the U.S. can easily cost tens of thousands of dollars."},
    {"question": "When should I buy travel insurance?", "answer": "You should purchase your insurance as soon as you''ve booked your trip. This ensures you are covered for unforeseen events that could cause you to cancel your trip before you even leave."},
    {"question": "What is the difference between trip cancellation and trip interruption?", "answer": "Trip cancellation covers you before your trip starts, reimbursing you for pre-paid, non-refundable expenses. Trip interruption covers you after you''ve departed, helping you get home and reimbursing you for the unused portion of your trip if you have to cut it short due to a covered reason."}
  ]',
  true,
  '{"visitor-insurance", "super-visa-insurance", "international-students-plan"}',
  '[
    {"type": "text-image", "title": "Your Essential Travel Companion", "text": "Whether you''re planning a weekend trip to the US or a month-long European adventure, travel insurance is non-negotiable. Your government health plan offers very limited coverage outside of your home province. Without travel insurance, you could be personally responsible for crippling medical bills in the event of an accident or illness abroad. Our plans provide robust emergency medical coverage, giving you access to quality care without the financial worry.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "More Than Just Medical Coverage", "text": "True peace of mind comes from knowing you''re protected against all travel mishaps. That''s why we offer comprehensive plans that go beyond medical emergencies. With coverage for trip cancellation, trip interruption, baggage loss, and flight delays, you can travel with confidence. We offer single-trip plans for occasional getaways and multi-trip annual plans for frequent flyers, ensuring you always have the right protection at the best price.", "image": "https://placehold.co/500x500.png"}
  ]'
),
(
  'international-students-plan',
  'International Students Plan',
  'https://placehold.co/1920x400.png',
  'Affordable and comprehensive medical insurance for international students studying in Canada, filling the gaps left by university plans.',
  null,
  true,
  '[
    {"title": "Emergency Medical Care", "description": "Cover for hospital stays, doctor visits, prescription drugs, and ambulance services."},
    {"title": "Affordable Premiums", "description": "Budget-friendly plans designed specifically for the needs of international students."},
    {"title": "Meets School Requirements", "description": "Our plans meet or exceed the insurance requirements of most Canadian universities and colleges."},
    {"title": "24/7 Support", "description": "Access to a multilingual team that can help you navigate the Canadian healthcare system."}
  ]',
  true,
  'For international students who are enrolled in a Canadian educational institution and are not yet eligible for a provincial government health plan or need to supplement a basic university plan.',
  false, '[]',
  false, '[]',
  true,
  '[
    {"question": "My school provides a health plan. Why do I need this?", "answer": "Many basic university health plans (like UHIP) have limitations and may not cover everything. Our plans can supplement your school''s insurance, providing more comprehensive coverage for things like prescription drugs, dental, and paramedical services. It can also be used as your primary insurance if your school allows you to opt-out of their plan."},
    {"question": "How long can I be covered for?", "answer": "Policies are typically purchased for the duration of your school term or for a full 365 days, and they are renewable for as long as you are a student in Canada."},
    {"question": "Does this plan cover me if I travel outside of my province of study?", "answer": "Yes, your coverage is valid across all of Canada. It may also include coverage for short trips back to your home country or to other destinations (conditions apply)."}
  ]',
  true,
  '{"visitor-insurance", "travel-insurance", "health-dental"}',
  '[
    {"type": "text-image", "title": "Focus on Your Studies, Not Medical Bills", "text": "As an international student in Canada, having proper medical insurance is essential. Healthcare costs can be expensive, and an unexpected illness or accident could disrupt your studies and your finances. Our International Student Plan is designed to provide robust, affordable coverage that protects you from these high costs. It ensures you can get the medical care you need, when you need it, so you can focus on achieving your academic goals.", "image": "https://placehold.co/500x500.png"},
    {"type": "image-text", "title": "Coverage Tailored for Student Life", "text": "We''ve worked with leading insurers to create plans that are perfect for the student lifestyle. Our policies are easy to purchase online, meet the requirements of Canadian schools, and provide comprehensive benefits. From doctor''s visits and prescription medications to emergency hospitalization and dental care, we''ve got you covered. We''ll help you navigate your options to find a plan that fits your budget and gives you complete peace of mind.", "image": "https://placehold.co/500x500.png"}
  ]'
);
