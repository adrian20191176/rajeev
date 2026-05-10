// Royal Crown Bearings — global interactive layer
// Manages: enquiry list (localStorage), search palette, enquiry modal, toasts

export type EnquiryProduct = {
  id: number;
  code: string;
  name: string;
  brand: string;
  family: string;
  iconType: string;
  diameter: string;
  image: string | null;
  category: string;
};

type Toast = {
  id: string;
  tone: 'success' | 'error' | 'info';
  title: string;
  message?: string;
};

const STORAGE_KEY = 'rcb.enquiryList.v1';
const WHATSAPP    = '+94766550249';

// ─── Enquiry list ──────────────────────────────────────────────────────────────

export function getList(): EnquiryProduct[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveList(list: EnquiryProduct[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function updateCountBadges(): void {
  const list = getList();
  document.querySelectorAll<HTMLElement>('[data-enquiry-count]').forEach((el) => {
    el.textContent = String(list.length);
    if (list.length > 0) {
      el.classList.add('bg-amber-signal', 'text-ink-900');
      el.classList.remove('bg-ink-600', 'text-chrome-100');
    } else {
      el.classList.remove('bg-amber-signal', 'text-ink-900');
      el.classList.add('bg-ink-600', 'text-chrome-100');
    }
  });
}

function resolveProduct(idOrProduct: number | EnquiryProduct): EnquiryProduct | null {
  if (typeof idOrProduct !== 'number') return idOrProduct;
  const dataEl = document.getElementById('rcb-search-data');
  if (!dataEl) return null;
  try {
    const { products } = JSON.parse(dataEl.textContent || '{}') as {
      products: Array<EnquiryProduct>;
    };
    return products.find((p) => p.id === idOrProduct) ?? null;
  } catch { return null; }
}

export function addToEnquiry(idOrProduct: number | EnquiryProduct): void {
  const product = resolveProduct(idOrProduct);
  if (!product) { showToast({ tone: 'error', title: 'Product not found' }); return; }
  const list = getList();
  if (list.some((p) => p.id === product.id)) {
    showToast({ tone: 'info', title: 'Already in Enquiry List', message: product.name });
    return;
  }
  saveList([...list, product]);
  updateCountBadges();
  window.dispatchEvent(new CustomEvent('rcb:list-updated'));
  showToast({ tone: 'success', title: 'Added to Enquiry List', message: product.name });
}

export function removeFromEnquiry(id: number): void {
  saveList(getList().filter((p) => p.id !== id));
  updateCountBadges();
  window.dispatchEvent(new CustomEvent('rcb:list-updated'));
  showToast({ tone: 'info', title: 'Removed from Enquiry List' });
}

export function clearEnquiry(): void {
  saveList([]);
  updateCountBadges();
  window.dispatchEvent(new CustomEvent('rcb:list-updated'));
  showToast({ tone: 'info', title: 'Enquiry List cleared' });
}

// ─── Toasts ────────────────────────────────────────────────────────────────────

export function showToast(t: Omit<Toast, 'id'>): void {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = Math.random().toString(36).slice(2);
  const tones: Record<string, string> = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error:   'bg-red-500/10 border-red-500/20',
    info:    'bg-ink-700/80 border-white/10',
  };
  const icons: Record<string, string> = {
    success: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="5,12 10,17 19,7"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>`,
  };
  const iconColors: Record<string, string> = {
    success: 'bg-emerald-500/20 text-emerald-300',
    error:   'bg-red-500/20 text-red-300',
    info:    'bg-cyan-brand/20 text-cyan-brand',
  };

  const el = document.createElement('div');
  el.id = `toast-${id}`;
  el.className = `toast-in chrome-border rounded-lg px-4 py-3 flex items-start gap-3 backdrop-blur-md border ${tones[t.tone]}`;
  el.innerHTML = `
    <div class="mt-0.5 grid place-items-center w-6 h-6 rounded-full ${iconColors[t.tone]} shrink-0">
      ${icons[t.tone]}
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-medium text-chrome-50">${t.title}</div>
      ${t.message ? `<div class="text-[12.5px] text-chrome-100/80 mt-0.5">${t.message}</div>` : ''}
    </div>
    <button onclick="document.getElementById('toast-${id}')?.remove()" class="text-chrome-200/60 hover:text-chrome-50 shrink-0">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
    </button>
  `;
  container.appendChild(el);
  setTimeout(() => el?.remove(), 4500);
}

// ─── Search palette ─────────────────────────────────────────────────────────────

export function openSearch(): void {
  const palette = document.getElementById('search-palette');
  if (!palette) return;
  palette.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  setTimeout(() => input?.focus(), 50);
}

export function closeSearch(): void {
  const palette = document.getElementById('search-palette');
  if (!palette) return;
  palette.setAttribute('hidden', '');
  document.body.style.overflow = '';
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  if (input) input.value = '';
  renderSearchResults('');
}

function renderSearchResults(q: string): void {
  const container = document.getElementById('search-results');
  if (!container) return;

  const dataEl  = document.getElementById('rcb-search-data');
  if (!dataEl) return;
  const { categories, products } = JSON.parse(dataEl.textContent || '{}') as {
    categories: Array<{ slug: string; name: string; short: string; family: string }>;
    products:   Array<{ id: number; name: string; code: string; brand: string; diameter: string; category: string }>;
  };

  const s = q.toLowerCase().trim();
  const matchedCats = s
    ? categories.filter((c) => c.name.toLowerCase().includes(s) || c.family.toLowerCase().includes(s)).slice(0, 5)
    : categories.slice(0, 5);
  const matchedProds = s
    ? products.filter((p) => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s)).slice(0, 8)
    : products.slice(0, 6);

  let html = '';

  if (matchedCats.length) {
    html += `<div class="px-3 pt-3 pb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-chrome-200/60">Categories</div><ul class="mb-2">`;
    matchedCats.forEach((c) => {
      html += `
        <li>
          <a href="/categories/${c.slug}" onclick="closeSearchPalette()"
             class="w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-md hover:bg-ink-700/70 transition-colors">
            <div>
              <div class="text-chrome-50 text-sm">${c.name}</div>
              <div class="text-[12px] text-chrome-200/60">${c.short}</div>
            </div>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" class="text-chrome-200/50 shrink-0"><polyline points="9,6 15,12 9,18"/></svg>
          </a>
        </li>`;
    });
    html += '</ul>';
  }

  if (matchedProds.length) {
    html += `<div class="px-3 pt-2 pb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-chrome-200/60">Products</div><ul>`;
    matchedProds.forEach((p) => {
      html += `
        <li>
          <a href="/products/${p.id}" onclick="closeSearchPalette()"
             class="w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-md hover:bg-ink-700/70 transition-colors">
            <div>
              <div class="text-chrome-50 text-sm font-mono">${p.name}</div>
              <div class="text-[12px] text-chrome-200/60">${p.diameter}</div>
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded font-mono text-[10px] tracking-[0.16em] uppercase border border-cyan-brand/40 text-cyan-brand bg-cyan-brand/5 shrink-0">${p.brand}</span>
          </a>
        </li>`;
    });
    html += '</ul>';
  }

  if (!matchedCats.length && !matchedProds.length && s) {
    html = `<div class="px-4 py-12 text-center text-chrome-200/60 text-sm">No results for "${q}". Try a part code, brand, or category.</div>`;
  }

  container.innerHTML = html;
}

// ─── Enquiry modal ──────────────────────────────────────────────────────────────

let _enquiryProducts: EnquiryProduct[] = [];

export function openEnquiryModal(products: EnquiryProduct[]): void {
  _enquiryProducts = products;
  const modal = document.getElementById('enquiry-modal');
  if (!modal) return;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Render selected products list
  const listEl = document.getElementById('enquiry-products-list');
  if (listEl && products.length > 0) {
    listEl.innerHTML = `
      <div class="mb-5 rounded-md border border-white/10 bg-ink-900/40">
        <div class="px-3 py-2 font-mono text-[10px] tracking-[0.22em] uppercase text-chrome-200/60 border-b border-white/[0.06]">
          Selected Products · ${products.length}
        </div>
        <ul class="divide-y divide-white/[0.04] max-h-40 overflow-y-auto">
          ${products.map((p) => `
            <li class="px-3 py-2 flex items-center justify-between text-sm">
              <span class="text-chrome-50 font-medium">${p.name}</span>
              <span class="font-mono text-[11px] text-cyan-brand/80">${p.diameter}</span>
            </li>
          `).join('')}
        </ul>
      </div>`;
  } else if (listEl) {
    listEl.innerHTML = '';
  }
}

export function closeEnquiryModal(): void {
  const modal = document.getElementById('enquiry-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  const form = document.getElementById('enquiry-form') as HTMLFormElement | null;
  form?.reset();
  _enquiryProducts = [];
}

// ─── Global init ────────────────────────────────────────────────────────────────

export function initGlobal(): void {
  // ─ Update count badges on load
  updateCountBadges();

  // ─ ⌘K / Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeEnquiryModal();
    }
  });

  // ─ Search input live filter
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  searchInput?.addEventListener('input', () => renderSearchResults(searchInput.value));

  // ─ Enquiry form submit
  const form = document.getElementById('enquiry-form') as HTMLFormElement | null;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    await new Promise((r) => setTimeout(r, 900));
    const ok = Math.random() > 0.1;
    closeEnquiryModal();

    if (ok) {
      showToast({
        tone: 'success',
        title: 'Enquiry sent successfully',
        message: _enquiryProducts.length > 0
          ? `Our team will reply about ${_enquiryProducts.length} product${_enquiryProducts.length === 1 ? '' : 's'} within the hour.`
          : 'Our team will reply within the hour.',
      });
      if (_enquiryProducts.length > 0 && _enquiryProducts.length === getList().length) {
        clearEnquiry();
      }
    } else {
      showToast({ tone: 'error', title: "Couldn't send enquiry", message: `Please try again, or WhatsApp ${WHATSAPP}.` });
    }

    if (btn) { btn.disabled = false; btn.textContent = 'Send Enquiry'; }
  });

  // ─ Custom events from other scripts
  window.addEventListener('rcb:add', (e: Event) => addToEnquiry((e as CustomEvent<EnquiryProduct>).detail));
  window.addEventListener('rcb:open-enquiry', (e: Event) => openEnquiryModal((e as CustomEvent<EnquiryProduct[]>).detail));
  window.addEventListener('rcb:open-search', () => openSearch());

  // ─ Expose to inline onclick handlers
  (window as unknown as Record<string, unknown>).openSearchPalette  = openSearch;
  (window as unknown as Record<string, unknown>).closeSearchPalette = closeSearch;
  (window as unknown as Record<string, unknown>).openEnquiryModal   = openEnquiryModal;
  (window as unknown as Record<string, unknown>).closeEnquiryModal  = closeEnquiryModal;
  (window as unknown as Record<string, unknown>).addToEnquiry       = (idOrProduct: number | EnquiryProduct) => addToEnquiry(idOrProduct);
  (window as unknown as Record<string, unknown>).removeFromEnquiry  = removeFromEnquiry;
  (window as unknown as Record<string, unknown>).clearEnquiry       = clearEnquiry;
  (window as unknown as Record<string, unknown>).getEnquiryList     = getList;
  (window as unknown as Record<string, unknown>).showToast          = showToast;
  (window as unknown as Record<string, unknown>).whatsappEnquiry    = (products: EnquiryProduct[]) => {
    const lines = products.map((p) => `• ${p.name} — ${p.diameter}`).join('\n');
    const msg = encodeURIComponent(`Enquiry — ${products.length} product${products.length === 1 ? '' : 's'}:\n${lines}\n\nPlease share availability and quote.`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };
}
