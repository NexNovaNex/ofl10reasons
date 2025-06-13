// Buy Box Interactivity Script

document.addEventListener('DOMContentLoaded', function () {
  const pricing = {
    subscribe: {
      1: { price: 29, old: 49, percent: 41 },
      3: { price: 79, old: 147, percent: 46 },
      6: { price: 149, old: 294, percent: 49 }
    },
    once: {
      1: { price: 39, old: 49, percent: 20 },
      3: { price: 109, old: 147, percent: 26 },
      6: { price: 199, old: 294, percent: 32 }
    }
  };
  const benefits = {
    subscribe: [
      '✔ Benefit 1',
      '✔ Benefit 2',
      '✔ Benefit 3',
      '✔ Benefit 4',
    ],
    once: [
      '✔ Benefit 1',
      '✔ Benefit 2',
      '✔ Benefit 3',
      '✔ Benefit 4',
    ]
  };
  let mode = 'subscribe';
  let bottles = 3;
  // Checkout links
  const checkoutLinks = {
    subscribe: {
      1: 'https://getserenitycore.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNTU1MzAyMzc2MjQ1ODUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiA2ODkwOTkyMTEwMTcsICJzZWxsaW5nX3BsYW5fZ3JvdXBfaWQiOiA3NzA4NTM0NDAwOX1dfQ==&store_id=200246',
      3: 'https://getserenitycore.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNTU1OTIxNTAxMzkxNDUsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiA2ODkxMjc0NTcwMzMsICJzZWxsaW5nX3BsYW5fZ3JvdXBfaWQiOiA3NzExMDAxODMxM31dfQ==&store_id=200246',
      6: 'https://getserenitycore.com/tools/recurring/checkout_link?magic=eyJpdGVtcyI6IFt7ImlkIjogNTU1OTIxNTgwNjkwMDEsICJxdWFudGl0eSI6IDEsICJzZWxsaW5nX3BsYW4iOiA2ODkxMjc0ODk4MDEsICJzZWxsaW5nX3BsYW5fZ3JvdXBfaWQiOiA3NzExMDA1MTA4MX1dfQ==&store_id=200246'
    },
    once: {
      1: 'https://getserenitycore.com/cart/55530237624585:1',
      3: 'https://getserenitycore.com/cart/55592150139145:1',
      6: 'http://getserenitycore.com/cart/55592158069001:1'
    }
  };
  function updateUI() {
    // Toggle button styles
    const buyOnceBtn = document.getElementById('buyOnceBtn');
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (!buyOnceBtn || !subscribeBtn) {
      console.warn('Toggle buttons not found');
      return;
    }
    // Buy Once
    buyOnceBtn.classList.remove('bg-pink-600', 'text-white', 'border-pink-600');
    buyOnceBtn.classList.remove('bg-gray-100', 'text-pink-700', 'border-pink-300');
    if (mode === 'once') {
      buyOnceBtn.classList.add('bg-pink-600', 'text-white', 'border-pink-600');
    } else {
      buyOnceBtn.classList.add('bg-gray-100', 'text-pink-700', 'border-pink-300');
    }
    // Subscribe
    subscribeBtn.classList.remove('bg-pink-600', 'text-white', 'border-pink-600');
    subscribeBtn.classList.remove('bg-gray-100', 'text-pink-700', 'border-pink-300');
    if (mode === 'subscribe') {
      subscribeBtn.classList.add('bg-pink-600', 'text-white', 'border-pink-600');
    } else {
      subscribeBtn.classList.add('bg-gray-100', 'text-pink-700', 'border-pink-300');
    }
    subscribeBtn.innerHTML = `Subscribe & Save <span id='savePercent'>${pricing[mode][bottles].percent}%</span>`;
    // Benefits
    const list = document.getElementById('benefitsList');
    if (list) {
      try {
        // For each benefit li, update classes based on mode
        list.querySelectorAll('li').forEach(li => {
          if (mode === 'once') {
            li.classList.add('line-through', 'text-gray-400', 'opacity-60');
            // Also gray out all spans inside
            li.querySelectorAll('span').forEach(span => {
              span.classList.add('text-gray-400');
              span.classList.remove('text-green-600', 'text-pink-600', 'text-pink-400', 'font-bold');
            });
          } else {
            li.classList.remove('line-through', 'text-gray-400', 'opacity-60');
            // Restore color classes for subscription
            if (li.dataset.benefit === 'discount' || li.dataset.benefit === 'vip') {
              li.querySelectorAll('span').forEach(span => {
                if (span.textContent && span.textContent.includes('✔')) {
                  span.classList.add('text-green-600', 'font-bold');
                  span.classList.remove('text-gray-400');
                }
              });
            } else {
              li.querySelectorAll('span').forEach(span => {
                if (span.textContent && (span.textContent.includes('🎁') || span.textContent.includes('🎧') || span.textContent.includes('🚚'))) {
                  span.classList.add('text-pink-600');
                  span.classList.remove('text-gray-400');
                }
                if (span.classList.contains('line-through')) {
                  span.classList.add('text-pink-400');
                  span.classList.remove('text-gray-400');
                }
              });
            }
          }
        });
      } catch (err) {
        console.error('Error updating benefits list:', err);
      }
    }
    // Prices
    const price1 = document.getElementById('price1');
    const price3 = document.getElementById('price3');
    const price6 = document.getElementById('price6');
    if (price1) price1.innerText = `$${pricing[mode][1].price}`;
    if (price3) price3.innerText = `$${pricing[mode][3].price}`;
    if (price6) price6.innerText = `$${pricing[mode][6].price}`;
    // Option highlight
    [1,3,6].forEach(n => {
      const el = document.getElementById(`option${n}`);
      if (!el) {
        console.warn(`Option ${n} not found`);
        return;
      }
      // Remove all highlight and default classes
      el.classList.remove('border-pink-600', 'bg-pink-100', 'text-pink-900', 'shadow-lg');
      el.classList.remove('border-pink-300', 'bg-white', 'text-pink-700');
      // Add default classes
      el.classList.add('border-pink-300', 'bg-white', 'text-pink-700');
      // Add highlight classes if selected
      if (bottles === n) {
        el.classList.remove('border-pink-300', 'bg-white', 'text-pink-700');
        el.classList.add('border-pink-600', 'bg-pink-100', 'text-pink-900', 'shadow-lg');
      }
    });
    // Savings
    const savingsMsg = document.getElementById('savingsMsg');
    const savingsPercent = document.getElementById('savingsPercent');
    if (savingsMsg && savingsPercent) {
      savingsMsg.style.display = pricing[mode][bottles].percent > 0 ? '' : 'none';
      savingsPercent.innerText = pricing[mode][bottles].percent + '%';
    }
    // Cart price
    const cartPrice = document.getElementById('cartPrice');
    if (cartPrice) cartPrice.innerText = `$${pricing[mode][bottles].price}`;
    // Update Add to Cart button link
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
      addToCartBtn.onclick = function(e) {
        e.preventDefault();
        const link = checkoutLinks[mode === 'subscribe' ? 'subscribe' : 'once'][bottles];
        window.location.href = link;
      };
    }
  }

  // Event delegation: attach to the buy box container
  const buyBox = document.getElementById('pricing-section');
  if (buyBox) {
    buyBox.addEventListener('click', function (e) {
      const target = e.target;
      console.log('Clicked:', target);
      // Toggle buttons
      if (target.closest('#buyOnceBtn')) {
        mode = 'once';
        updateUI();
        console.log('Buy Once selected');
        return;
      }
      if (target.closest('#subscribeBtn')) {
        mode = 'subscribe';
        updateUI();
        console.log('Subscribe selected');
        return;
      }
      // Quantity options
      [1,3,6].forEach(n => {
        const el = document.getElementById(`option${n}`);
        if (el && (target === el || target.closest(`#option${n}`))) {
          bottles = n;
          updateUI();
          console.log(`Option ${n} selected`);
        }
      });
    });
  }
  updateUI();
}); 