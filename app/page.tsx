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
    fbq?: (...args: any[]) => void;
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
    img: "/apigen.jpg",
    title: "1. It's Side-Effect-Free and Non-Hormonal",
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
    img: "/before-after.jpg",
    title: "4. Over 10,000 Men Have Ditched Their Caps Thanks to OneFix",
    desc: (
      <>
        Since launching, OneFix Labs has helped thousands of men go from hiding under hats to standing confidently in photos.<br />
        Real customers with <b>real results in 30-60 days</b>.<br />
        <b>80% of customers report visible hair growth within the first month</b>, and 85% keep coming back because it actually works.
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
    img: "/Newimage1.jpg",
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerSectionRef = useRef<HTMLDivElement | null>(null);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  // Sticky button state
  const [showStickyButton, setShowStickyButton] = useState(false);

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
      <div className="max-w-3xl mx-auto px-4 pt-1 pb-10"> {/* pt-1 for minimal top space */}
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a237e] mb-4 mt-0 leading-tight">
          10 Reasons Why Microneedling is becoming America's #1 At Home Hair Growth Solution -<br />
         
        </h1>
        {/* Author and Date */}
        <div className="flex items-center gap-3 mb-4">
          <Image src="/founder-avatar.jpg" alt="Max B." width={48} height={48} className="rounded-full border-2 border-blue-200" />
              <div>
            <div className="font-bold text-[#1a237e] text-sm">By Max B.</div>
            <div className="text-xs text-gray-500">Last Updated June. 25, 2025</div>
          </div>
        </div>
        {/* Summary */}
        <div className="mb-6 text-black">
          <span className="font-bold">Summary:</span> Say goodbye to minoxidil side effects, cheap rollers that don't work, and $600 hair transplants you can't afford. Developed by a team of doctors and dermatologists, Onefix Labs is the <span className="font-bold">only</span> microneedling system designed to deliver <span className="font-bold">DHT-blocked serum directly to your folicle roots</span>. Keep reading to see why over 90% of users are ditching their caps and growing back their confidence.
        </div>
        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl shadow-xl bg-white mt-8">
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
      <div className="mt-12 space-y-10">
        {reasons.map((reason, idx) => (
          <section
            key={idx}
            className={`group flex flex-col items-center gap-0 rounded-3xl border border-slate-200 shadow-sm md:shadow-lg p-0 transition-all duration-200 bg-gradient-to-br ${idx % 2 === 0 ? 'from-white to-[#f0f4ff]' : 'from-[#e3f6f5] to-white'} hover:shadow-2xl hover:-translate-y-1`}
          >
            <div className="flex flex-col w-full items-center justify-center p-6 md:p-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#232c85] mb-2 text-center leading-tight drop-shadow-sm">{reason.title}</h2>
              <div className="overflow-hidden rounded-2xl w-full max-w-[320px] aspect-[4/3] bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Image
                  src={reason.img}
                  alt={reason.title}
                  width={320}
                  height={240}
                  className="object-cover w-full h-full"
                  unoptimized={reason.img.endsWith('.gif')}
                />
              </div>
              <div className="text-lg md:text-xl text-[#232c85] leading-relaxed text-center">{reason.desc}</div>
            </div>
          </section>
        ))}
      </div>
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-2 py-3 md:py-4 flex flex-col items-center md:items-stretch">
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl bg-[#2563eb] hover:bg-[#1e40af] text-white text-lg md:text-xl font-extrabold text-center py-4 transition mb-2 md:mb-3 shadow-md"
          >
            Yes! Get 56% Off <span className="ml-2">&rarr;</span>
          </a>
          <div className="flex w-full justify-between items-center text-xs md:text-sm text-slate-700 px-2">
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