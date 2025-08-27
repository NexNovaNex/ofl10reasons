'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import HairGrowthBuyBox from '../components/HairGrowthBuyBox';
import type { FC } from 'react';

// Add this TypeScript declaration at the top, after imports
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Product page URL for all CTAs
const productPageUrl = 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607';

const reasons = [
  {
    img: "/before-after.jpg",
    title: "1. 37,454 Men Have Ditched Their Caps Thanks to OneFix",
    desc: (
      <>
        Since launching, OneFix Labs has helped thousands of men go from hiding under hats to standing confidently in photos.<br />
        Real customers with <b>real results in 30-60 days</b>.<br />
        <b>80% of customers report visible hair growth within the first month</b>, and 85% keep coming back because it actually works.
      </>
    ),
  },
  {
    img: "/ezgif.com-video-to-gif-converter.gif",
    title: "2. It Actually Reaches Where Hair Growth Happens",
    desc: (
      <>
        You've probably tried creams, shampoos, and serums that just sit on your scalp doing nothing.<br />
        That's because your scalp is a natural barrier that blocks <b>95% of topical treatments</b> from reaching your follicles.<br />
        <b>OneFix Labs creates thousands of tiny, painless channels</b> that deliver DHT-blocking serum directly to the follicle root—<b>where hair growth actually happens</b>.
      </>
    ),
  },
  {
    img: "/rolling.jpg",
    title: "3. It's Effective (Unlike Cheap Alternatives)",
    desc: (
      <>
        Cheap derma rollers from Amazon are <b>torture devices</b> that tear your scalp and cause infections.<br />
        Clinic microneedling sessions are <b>painful and expensive</b>.<br />
        <b>OneFix Labs uses precision-engineered needles</b> that feel therapeutic, not painful.<br />
        Most customers say it's actually <i>relaxing</i>.
      </>
    ),
  },
  {
    img: "/apigen.jpg",
    title: "4. It's Side-Effect-Free and Non-Hormonal",
    desc: (
      <>
        Here's a shocking fact - most hair loss treatments come with serious side effects that can be worse than hair loss itself.<br />
        <b>Minoxidil</b> causes <b>ED</b>, headaches, and weight gain.<br />
        <b>Finasteride</b> leads to <b>depression</b>, brain fog, and sexual dysfunction.<br />
        <b>OneFix Labs is completely side-effect-free and non-hormonal</b>, making it the only hair restoration system designed for safe daily use.
      </>
    ),
  },
  {
    img: "/Hairtransplant.png",
    title: "5. It's the Ultimate Money Saver",
    desc: (
      <>
        Spending <b>$6,000+ on a hair transplant</b> or <b>$1,200+ yearly on Minoxidil</b> for life is financial insanity.<br />
        Clinic microneedling costs <b>$200+ per session</b>.<br />
        <b>OneFix Labs costs just $159 for 6 months of treatment</b>—that's what most guys spend on Minoxidil in 6 weeks.<br />
        You get <b>clinical results without the lifelong price tag</b>.
      </>
    ),
  },
  {
    img: "Step3.gif",
    title: "6. Studies Show Microneedling is 3x More Effective Than Minoxidil Alone",
    desc: (
      <>
        Clinical research proves that <b>microneedling combined with DHT-blocking serum is significantly more effective</b> than any single treatment.<br />
        You're not hoping it works—you're using <b>scientifically-proven technology</b> to ensure the serum reaches exactly where growth happens.
      </>
    ),
  },
  {
    img: "/Step1.gif",
    title: "7. It's Doctor-Formulated with Natural Ingredients",
    desc: (
      <>
        Unlike mystery chemicals in other treatments, OneFix Labs was developed by <b>doctors</b> and uses a <b>natural serum with DHT blockers, blood-flow boosters, and growth activators</b>.<br />
        No synthetic hormones, no artificial junk—just <b>clean science that wakes up your follicles safely</b>.
      </>
    ),
  },
  {
    img: "/profile1.jpg",
    title: "8. You Start to See Results in 30 Days (Not 6-12 Months)",
    desc: (
      <>
        While other treatments take <b>6-12 months to show minimal results</b>, OneFix Labs customers report <b>thicker, fuller hair in just 30 days</b>.<br />
        That's because the serum is delivered <b>directly to the source</b>, not wasted on your scalp surface. <br /> Significant Results within 90 days.
      </>
    ),
  },
  {
    img: "/bottle-placeholder-onefixlabs.jpg",
    title: "9. You Break Free From Lifelong Dependency",
    desc: (
      <>
        Minoxidil and Finasteride trap you in <b>lifelong dependency</b>—stop using them and your hair falls out worse than before.<br />
        OneFix Labs helps <b>restore your natural hair growth cycle</b>.<br />
        After 12 months of treatment, many customers reduce frequency to <b>maintenance mode</b> rather than being trapped forever.
      </>
    ),
  },
  {
    img: "/Dermatologists_1.png",
    title: "10. If You Made It This Far, You're Ready to Stop Hiding",
    desc: (
      <>
        You're tired of hats, avoiding photos, and feeling invisible.<br />
        You've tried the <b>cheap stuff</b>, researched the <b>expensive stuff</b>, and you're ready for something that <b>actually works</b>.<br />
        OneFix Labs is for men who refuse to give up on their hair and want <b>clinical results at home for less than $70</b>.
      </>
    ),
  },
];

const CTA_LINK = "https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607";

const Page: FC = () => {
  // FORCE DEPLOYMENT - COMPLETE REBUILD
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerSectionRef = useRef<HTMLDivElement | null>(null);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  // Sticky button state
  const [showStickyButton, setShowStickyButton] = useState(false);

  // Buy box state - Single purchase only
  const [bottles, setBottles] = useState<2 | 4 | 6>(4);

  const pricing = {
    2: { price: 69, old: 218, percent: 68 },
    4: { price: 119, old: 436, percent: 73 },
    6: { price: 159, old: 654, percent: 76 }
  };

  const checkoutLinks = {
    2: 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607',
    4: 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607',
    6: 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607'
  };

  const priceData = pricing[bottles as 2 | 4 | 6];
  const showSavings = priceData.percent > 0;



  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")} Hrs : ${m.toString().padStart(2, "0")} Min : ${s.toString().padStart(2, "0")} Sec`;
  }

  function formatTimeParts(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s];
  }

  const [h, m, s] = formatTimeParts(timeLeft);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Sticky button scroll detection
  useEffect(() => {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowStickyButton(true);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    if (triggerSectionRef.current) {
      stickyObserver.observe(triggerSectionRef.current);
    }

    return () => stickyObserver.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  return (
    <main className="bg-[#f8fafc] min-h-screen pb-40">
      {/* Sticky Announcement Bars */}
      <div className="sticky top-0 z-50">
        {/* Navy Blue Announcement Bar */}
        <div className="w-full bg-[#1a237e] text-white text-center py-2 font-bold text-sm">
          🎉 BIGGEST SALE OF THE YEAR + FREE GIFTS TODAY ONLY 🎁
        </div>
        {/* Blue Sale Bar */}
        <div className="w-full bg-[#5bc0f8] text-black flex items-center justify-center py-2 gap-4 text-sm font-semibold">
          <span>SUMMER SALE ☀️ UP TO 56% OFF</span>
          {timeLeft > 0 ? (
            <span className="flex items-center gap-2">
              {/* Timer Pills - compact, single line */}
              <span className="flex flex-row items-center bg-white rounded-full px-2 md:px-3 py-1 shadow font-bold gap-2">
                <span className="flex flex-col items-center">
                  <span className="text-base md:text-xl text-[#1e40af] font-extrabold tabular-nums leading-none">{h.toString().padStart(2, "0")}</span>
                  <span className="text-[10px] text-[#64748b] font-semibold leading-none">HRS</span>
                </span>
                <span className="text-base md:text-xl text-[#1e40af] font-extrabold leading-none">:</span>
                <span className="flex flex-col items-center">
                  <span className="text-base md:text-xl text-[#1e40af] font-extrabold tabular-nums leading-none">{m.toString().padStart(2, "0")}</span>
                  <span className="text-[10px] text-[#64748b] font-semibold leading-none">MIN</span>
                </span>
                <span className="text-base md:text-xl text-[#1e40af] font-extrabold leading-none">:</span>
                <span className="flex flex-col items-center">
                  <span className="text-base md:text-xl text-[#1e40af] font-extrabold tabular-nums leading-none">{s.toString().padStart(2, "0")}</span>
                  <span className="text-[10px] text-[#64748b] font-semibold leading-none">SEC</span>
                </span>
              </span>
            </span>
          ) : (
            <span className="bg-red-600 text-white rounded-full px-4 py-1 font-bold shadow text-base">Deal Ended</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 pt-1 pb-10"> {/* pt-1 for minimal top space */}
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a237e] mb-4 mt-0 leading-tight">
        The Microneedling Takeover: 10 Reasons It's Replacing Minoxidil.
        </h1>
        {/* FRESH DEPLOYMENT: Force complete rebuild to match localhost exactly - 2025-08-02-19-45 - CLEAN VERSION */}
        {/* Author and Date */}
        <div className="flex items-center gap-3 mb-4">
          <Image src="/founder-avatar.jpg" alt="Max B." width={48} height={48} className="rounded-full border-2 border-blue-200" />
              <div>
            <div className="font-bold text-[#1a237e] text-sm">By Max B.</div>
            <div className="text-xs text-gray-500">Last Updated June. 25, 2025</div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-0 text-black">
          <span className="font-bold">Summary:</span> Say goodbye to minoxidil side effects, cheap rollers that don't work, and $600 hair transplants you can't afford. Developed by a team of doctors and dermatologists, Onefix Labs is the <span className="font-bold">only</span> microneedling system designed to deliver <span className="font-bold">DHT-blocked serum directly to your folicle roots</span>. Keep reading to see why over 90% of users are ditching their caps and growing back their confidence.
        </div>
              </div>
      
      <div className="mt-0 space-y-6 md:space-y-8">
        {reasons.map((reason, idx) => (
          <>
            <section
              key={idx}
              className={`group flex flex-col items-center gap-0 rounded-3xl border border-slate-200 shadow-sm md:shadow-lg p-0 transition-all duration-200 bg-gradient-to-br ${idx % 2 === 0 ? 'from-white to-[#f0f4ff]' : 'from-[#e3f6f5] to-white'} hover:shadow-2xl hover:-translate-y-1`}
            >
              <div className="flex flex-col w-full items-center justify-center p-4 md:p-8">
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#232c85] mb-2 text-center leading-tight drop-shadow-sm">{reason.title}</h2>
                <div className={`overflow-hidden rounded-2xl w-full max-w-[320px] ${reason.img === "/before-after.jpg" ? "aspect-square" : "aspect-[4/3]"} bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                  <Image
                    src={reason.img}
                    alt={reason.title}
                    width={320}
                    height={reason.img === "/before-after.jpg" ? 320 : 240}
                    className="object-cover w-full h-full"
                    unoptimized={reason.img.endsWith('.gif')}
                  />
                </div>
                <div className="text-lg md:text-xl text-[#232c85] leading-relaxed text-center">{reason.desc}</div>
              </div>
            </section>
            
            {/* Insert testimonials between reason 4 and 5 */}
            {idx === 3 && (
              <section className="group flex flex-col items-center gap-0 rounded-3xl border-2 border-[#2563eb] shadow-xl md:shadow-2xl p-0 transition-all duration-200 bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]"></div>
                <div className="flex flex-col w-full items-center justify-center p-4 md:p-8 relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#2563eb] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-lg">⭐</span>
                    </div>
                    <h2 className="text-xl md:text-4xl font-extrabold text-[#1e3a8a] text-center leading-tight drop-shadow-sm">
                      Real Results from Real Customers
                    </h2>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#2563eb] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-lg">⭐</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-lg text-[#374151] text-center mb-6 md:mb-8 max-w-2xl">
                    See how real guys dealing with hair loss are finally getting their confidence — and identity — back. No pills. No fluff. Just results that feel real.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
                    {/* Testimonial 1 */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border-2 border-[#e5e7eb] hover:border-[#2563eb] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="overflow-hidden rounded-lg md:rounded-xl w-full aspect-[2/1] bg-gray-100 flex items-center justify-center relative">
                          <div className="absolute top-2 left-2 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded-full">
                            BEFORE & AFTER
                          </div>
                          <Image
                            src="/Newimage1.jpg"
                            alt="Daniel C. Before and After"
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                              DC
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 md:mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-xs md:text-sm">★</span>
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-sm md:text-base font-semibold text-[#1e3a8a] mb-1 md:mb-2 leading-tight">
                              "The first time in years I liked my reflection."
                            </blockquote>
                            <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm font-medium">- Daniel C.</p>
                            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                              I used to avoid the bathroom mirror. I'd throw on a hoodie just to feel okay. Three weeks into OneFix Labs and I actually caught myself fixing my hair instead of hiding it. Might not sound like much — but to me, that was huge.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border-2 border-[#e5e7eb] hover:border-[#2563eb] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="overflow-hidden rounded-lg md:rounded-xl w-full aspect-[2/1] bg-gray-100 flex items-center justify-center relative">
                          <div className="absolute top-2 left-2 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded-full">
                            BEFORE & AFTER
                          </div>
                          <Image
                            src="/Newimage2.jpg"
                            alt="Jason M. Before and After"
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                              JM
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 md:mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-xs md:text-sm">★</span>
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-sm md:text-base font-semibold text-[#1e3a8a] mb-1 md:mb-2 leading-tight">
                              "Finally found something that works."
                            </blockquote>
                            <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm font-medium">- Jason M.</p>
                            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                              I tried everything. Serums, shampoos, Reddit "hacks." Nothing lasted. OneFix Labs is the first thing that made my scalp feel healthy — like it wasn't fighting me anymore. That alone was a win.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border-2 border-[#e5e7eb] hover:border-[#2563eb] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="overflow-hidden rounded-lg md:rounded-xl w-full aspect-[2/1] bg-gray-100 flex items-center justify-center relative">
                          <div className="absolute top-2 left-2 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded-full">
                            BEFORE & AFTER
                          </div>
                          <Image
                            src="/Newimage3.jpg"
                            alt="Chris R. Before and After"
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                              CR
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 md:mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-xs md:text-sm">★</span>
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-sm md:text-base font-semibold text-[#1e3a8a] mb-1 md:mb-2 leading-tight">
                              "Got my confidence back."
                            </blockquote>
                            <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm font-medium">- Chris R.</p>
                            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                              It's not just about regrowth. It's about not thinking about it all day. I wore a hat for five years straight — now I forget I even have one. That's what OneFix Labs gave me. Headspace.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial 4 */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border-2 border-[#e5e7eb] hover:border-[#2563eb] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="overflow-hidden rounded-lg md:rounded-xl w-full aspect-[2/1] bg-gray-100 flex items-center justify-center relative">
                          <div className="absolute top-2 left-2 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded-full">
                            BEFORE & AFTER
                          </div>
                          <Image
                            src="/elikef.jpg"
                            alt="Eli K. Before and After"
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                              EK
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 md:mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-xs md:text-sm">★</span>
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-sm md:text-base font-semibold text-[#1e3a8a] mb-1 md:mb-2 leading-tight">
                              "Finally, real results."
                            </blockquote>
                            <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm font-medium">- Eli K.</p>
                            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                              Why does no one talk about this stuff honestly? Everyone just says, "Shave it." But OneFix Labs actually made me feel like I had a shot again. Like I wasn't broken — just needed the right fix.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {/* Insert comparison table between reason 8 and 9 */}
            {idx === 7 && (
              <section className="group flex flex-col items-center gap-0 rounded-3xl border border-slate-200 shadow-sm md:shadow-lg p-0 transition-all duration-200 bg-gradient-to-br from-white to-[#f0f4ff] hover:shadow-2xl hover:-translate-y-1">
                <div className="flex flex-col w-full items-center justify-center p-4 md:p-6">
                  <h2 className="text-2xl md:text-4xl font-extrabold text-[#232c85] mb-4 text-center leading-tight drop-shadow-sm">
                    How OneFix Labs Compares to Other Treatments
                  </h2>
                  <div className="overflow-x-auto rounded-2xl shadow-xl bg-white w-full max-w-4xl">
                    <table className="min-w-[500px] w-full text-xs md:text-base text-center border-separate border-spacing-0">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-[#1e3a8a] text-white font-extrabold text-xs md:text-lg">
                          <th className="py-2 md:py-3 px-1 md:px-4 rounded-tl-2xl text-center">Treatment</th>
                          <th className="py-2 md:py-3 px-1 md:px-4">Side Effects</th>
                          <th className="py-2 md:py-3 px-1 md:px-4">Results Time</th>
                          <th className="py-2 md:py-3 px-1 md:px-4">Convenience</th>
                          <th className="py-2 md:py-3 px-1 md:px-4 rounded-tr-2xl">Effectiveness</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Onefix Labs row - highlighted, dark text */}
                        <tr className="bg-[#e3f0ff] border-l-4 border-[#2563eb] font-bold text-[#1e3a8a]">
                          <td className="py-2 md:py-4 px-1 md:px-4 text-center align-middle" style={{width: '20%'}}>Onefix Labs</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">None</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">30-60 Days</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">At Home Once a Week, Painless</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">90%+</td>
                        </tr>
                        <tr><td colSpan={5} className="h-0 p-0"><div className="border-b border-slate-200 w-full mx-auto"></div></td></tr>
                        {/* Minoxidil */}
                        <tr className="bg-white text-slate-800">
                          <td className="py-2 md:py-4 px-1 md:px-4 text-center align-middle font-semibold">Minoxidil</td>
                          <td className="py-2 md:py-4 px-1 md:px-4 text-red-600 font-bold">ED, Headaches, Weight Gain</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">3-6 Months</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">Apply Daily</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">70%</td>
                        </tr>
                        <tr><td colSpan={5} className="h-0 p-0"><div className="border-b border-slate-200 w-full mx-auto"></div></td></tr>
                        {/* Hair Transplant */}
                        <tr className="bg-[#f8fafc] text-slate-800">
                          <td className="py-2 md:py-4 px-1 md:px-4 text-center align-middle font-semibold">Hair Transplant</td>
                          <td className="py-2 md:py-4 px-1 md:px-4 text-red-600 font-bold">Surgery Risks, Scarring</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">12+ Months</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">Surgery + Recovery</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">60%</td>
                        </tr>
                        <tr><td colSpan={5} className="h-0 p-0"><div className="border-b border-slate-200 w-full mx-auto"></div></td></tr>
                        {/* Finasteride */}
                        <tr className="bg-white text-slate-800">
                          <td className="py-2 md:py-4 px-1 md:px-4 text-center align-middle font-semibold">Finasteride</td>
                          <td className="py-2 md:py-4 px-1 md:px-4 text-red-600 font-bold">Depression, Brain Fog, ED</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">3-6 Months</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">Daily Pills</td>
                          <td className="py-2 md:py-4 px-1 md:px-4">90%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </>
        ))}
      </div>
      
      {/* Buy Box */}
      <section id="pricing-section" className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-slate-100 via-white to-slate-100 border-2 border-slate-200 p-0 md:p-0">
          <div className="px-6 md:px-12 pt-8 pb-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Clinic Results without Clinic Prices</h2>
            <div className="text-lg text-blue-700 mb-4 font-semibold">Mid-Year Sale Offer</div>
            {/* Product Image */}
            <div className="flex justify-center mb-6">
              <img 
                src="/microneedle-kit.jpg" 
                alt="Hair Growth Microneedle Kit" 
                className="w-80 h-80 md:w-[400px] md:h-[400px] object-cover rounded-2xl shadow-lg" 
                width={400} 
                height={400} 
              />
            </div>
            {/* Features/Benefits Box */}
            <div className="w-full max-w-lg mx-auto mt-2">
              <ul id="benefitsList" className="border-2 border-slate-200 bg-white rounded-xl px-6 py-4 grid grid-cols-1 gap-2 text-base font-medium shadow">
                <li className="flex items-center justify-between gap-2" data-benefit="guide">
                  <span className="flex items-center gap-2 text-slate-700">📱 <span className="font-bold">FREE</span> Hair Growth Ebook</span>
                  <span className="line-through text-slate-400">$19</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="massager">
                  <span className="flex items-center gap-2 text-slate-700">🎁 <span className="font-bold">FREE</span> Scalp Activation Massage Tool</span>
                  <span className="line-through text-slate-400">$29</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="needle">
                  <span className="flex items-center gap-2 text-slate-700">💉 <span className="font-bold">FREE</span> Extra Micro Precision Needle</span>
                  <span className="line-through text-slate-400">$29</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="shipping">
                  <span className="flex items-center gap-2 text-slate-700">🚚 <span className="font-bold">FREE</span> Priority Shipping</span>
                  <span className="line-through text-slate-400">$9</span>
                </li>
                <li className="flex items-center gap-2" data-benefit="vip">
                  <span className="flex items-center gap-2 text-blue-700 font-bold">✔ VIP Access to Hair Care Specialists</span>
                </li>
              </ul>
            </div>
            {/* Bottle Options */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
              {[2, 4, 6].map((n) => (
                <div
                  key={n}
                  id={`option${n}`}
                  className={`bottle-option border-2 rounded-2xl p-6 text-center cursor-pointer transition relative ${bottles === n
                    ? 'border-blue-600 bg-blue-50 text-slate-900 shadow-lg'
                    : 'border-slate-300 bg-white text-slate-700 hover:shadow-lg'}`}
                  onClick={() => setBottles(n as 2 | 4 | 6)}
                >
                  {n === 4 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-amber-400 z-10">MOST POPULAR</div>
                  )}
                  {n === 6 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-200 text-blue-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-blue-400 z-10">BEST VALUE</div>
                  )}
                  <div className="font-bold text-lg">{n} Months Supply</div>
                  <div className="mb-2">{n * 30} day supply</div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-extrabold mb-1 break-words md:text-2xl text-xl">
                      <span className="line-through text-slate-400 text-lg mr-1">${pricing[n as 2 | 4 | 6].old}</span>
                      <span id={`price${n}`}>${pricing[n as 2 | 4 | 6].price}</span>
                    </div>
                    <div className="text-xs text-slate-600">Per Pack</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Savings Message */}
            {showSavings && (
              <div id="savingsMsg" className="bg-blue-50 border border-blue-300 rounded-xl px-4 py-2 mb-4 text-blue-700 font-semibold text-center text-base shadow">
                🎉 Congrats! You're saving <span id="savingsPercent">{priceData.percent}%</span> off retail price
              </div>
            )}
            {/* Add to Cart Button */}
            <a
              id="addToCartBtn"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-full text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-2"
              href={checkoutLinks[bottles as 2 | 4 | 6]}
              target="_blank"
              rel="noopener noreferrer"
            >
              ADD TO CART - <span id="cartPrice">${priceData.price}</span>
            </a>
            {/* Updated: All ATC buttons now link to OneFix Labs product page */}
            {/* Money Back Guarantee */}
            <div className="text-sm text-slate-600 mt-4 flex items-center justify-center gap-2">
              <span>🛡️</span>
              <span className="font-semibold">90-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-2 py-3 md:py-4 flex flex-col items-center md:items-stretch">
        <div className="w-full max-w-md md:max-w-none mx-auto flex flex-col items-center">
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-[#2563eb] hover:bg-[#1e40af] text-white text-base md:text-lg font-semibold text-center py-4 md:py-5 transition mb-2 md:mb-3 shadow"
          >
            Get OneFix Now <span className="ml-2">&rarr;</span>
          </a>
          <div className="flex w-full justify-between items-center text-xs text-slate-500 px-1 md:px-2">
            <div className="flex items-center gap-1">
              <span role="img" aria-label="truck">🚚</span> Express Shipping
            </div>
            <div className="flex items-center gap-1">
              <span role="img" aria-label="smile">😊</span> Hairgrowth Guaranteed
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;