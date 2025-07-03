import React, { useState } from 'react';

const pricing = {
  subscribe: {
    2: { price: 69, old: 218, percent: 68 },
    4: { price: 119, old: 436, percent: 73 },
    6: { price: 159, old: 654, percent: 76 }
  },
  once: {
    2: { price: 79, old: 218, percent: 64 },
    4: { price: 129, old: 436, percent: 70 },
    6: { price: 169, old: 654, percent: 74 }
  }
};

// Single product page URL for all CTAs
const productPageUrl = 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607';

const HairGrowthBuyBox = () => {
  const [mode, setMode] = useState<'subscribe' | 'once'>('subscribe');
  const [bottles, setBottles] = useState<2 | 4 | 6>(4);
  const priceData = pricing[mode][bottles as 2 | 4 | 6];
  const showSavings = priceData.percent > 0;
  const [selectedPackage, setSelectedPackage] = useState('4-month');

  return (
    <section id="pricing-section" className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-3xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-slate-100 via-white to-slate-100 border-2 border-slate-200 p-0 md:p-0">
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
          {/* Toggle */}
          <div className="flex flex-col items-center mb-2">
            <div className="flex items-center gap-2 rounded-full p-1 border-2 border-slate-300 bg-white">
              <button
                id="buyOnceBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'once' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
                onClick={() => setMode('once')}
              >
                Buy Once
              </button>
              <button
                id="subscribeBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'subscribe' ? 'bg-blue-700 text-white border-blue-700' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
                onClick={() => setMode('subscribe')}
              >
                Subscribe & Save{priceData.percent > 0 ? ` ${priceData.percent}%` : ''}
              </button>
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
                    <span className="line-through text-slate-400 text-lg mr-1">${pricing[mode][n as 2 | 4 | 6].old}</span>
                    <span id={`price${n}`}>${pricing[mode][n as 2 | 4 | 6].price}</span>
                  </div>
                  <div className="text-xs text-slate-600">Per Pack</div>
                </div>
              </div>
            ))}
          </div>
          {/* Savings Message */}
          {showSavings && (
            <div id="savingsMsg" className="bg-blue-50 border border-blue-300 rounded-xl px-4 py-2 mb-4 text-blue-700 font-semibold text-center text-base shadow">
              🎉 Congrats! You're saving <span id="savingsPercent">{priceData.percent}%</span>
            </div>
          )}
          {/* Add to Cart Button */}
          <a
            id="addToCartBtn"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-full text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-2"
            href={productPageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GET ONEFIX NOW - <span id="cartPrice">${priceData.price}</span>
          </a>
          {/* Money Back Guarantee */}
          <div className="text-sm text-slate-600 mt-4 flex items-center justify-center gap-2">
            <span>🛡️</span>
            <span className="font-semibold">90-Day Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairGrowthBuyBox; 