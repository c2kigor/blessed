/**
 * BLESSED BY ZARCKENY BARBERSHOP - MAIN JAVASCRIPT
 * Features:
 * - Dynamic Live Open/Closed indicator (Europe/Bucharest time)
 * - Full RO / EN Bilingual toggle with instant text swapping
 * - Universal Booking Modal with automatic service pre-selection
 * - WhatsApp direct booking dispatch & extensible Booksy/Fresha hooks
 * - Mobile Navigation Drawer & Gallery Lightbox
 */

(function () {
  'use strict';

  // --- CONFIGURATION OBJECT ---
  // Easy to plug in external booking engines (Booksy, Fresha, etc.)
  const CONFIG = {
    barbershopName: "Blessed by Zarckeny Barbershop",
    phone: "0734 171 995",
    phoneRaw: "+40734171995",
    whatsappNumber: "40734171995",
    address: "Strada Locotenent Stancu Ion nr. 4, Târgoviște",
    bookingMode: "whatsapp", // Options: 'whatsapp' or 'external'
    externalBookingUrl: "",  // E.g. "https://booksy.com/ro-ro/..." or Fresha URL
    instagramUrl: "https://www.instagram.com/blessedbyzarckeny/",
    tiktokUrl: "https://www.tiktok.com/@blessedbyzarckeny"
  };

  // --- TRANSLATION DICTIONARY (RO / EN) ---
  const TRANSLATIONS = {
    ro: {
      nav_services: "Servicii & Prețuri",
      nav_barber: "Despre Zarckeny",
      nav_gallery: "Galerie",
      nav_reviews: "Recenzii (5.0★)",
      nav_location: "Locație & Program",
      btn_book_now: "Programează-te",
      hero_tag: "Frizerie de Elită în Târgoviște • Zona Piața 1 Mai",
      hero_tagline: "Mai mult decât un tuns. O stare de spirit, precizie milimetrică și atenție obsesivă la detalii.",
      hero_cta_primary: "Programează-te Acum",
      trust_reviews_count: "159+ Recenzii Google",
      trust_location_title: "Târgoviște",
      trust_walkins_title: "Fără Timp Pierdut",
      trust_walkins_sub: "Cu / Fără programare",
      services_tag: "Măiestrie & Transparență",
      services_subtitle: "Prețuri clare, fără surprize. Fiecare tunsoare include consultanță de stil, spălat și produse de îngrijire de top.",
      combos_label: "Pachete Combo Recomandate (Economisești & Arăți Impecabil)",
      combo_best_choice: "ALEGEREA CLIENTULUI",
      combo_1_desc: "Pachetul complet pentru o reîmprospătare totală. Look impecabil și îngrijire completă a tenului și părului.",
      c1_f1: "Tuns Barbershop complet",
      c1_f2: "Aranjat & Contur Barbă",
      c1_f3: "Spălat capilar profesional",
      c1_f4: "Ceară facială pentru contur curat",
      btn_choose_combo: "Alege Acest Pachet",
      combo_2_desc: "Experiența supremă de lux și relaxare. Tratament complet capilar, bărbierit, culoare și îngrijire facială premium.",
      c2_f1: "Tuns + Barbă + Vopsit Barbă",
      c2_f2: "Spălat capilar + Masaj capilar relaxant",
      c2_f3: "Ceară facială + Mască facială revigorantă",
      c2_f4: "Pensat cu briciul & styling de top",
      combo_3_desc: "Vino împreună cu fiul sau un prieten și beneficiați amândoi de tunsori executate impecabil, la un tarif avantajos.",
      c3_f1: "2 x Tunsori complete",
      c3_f2: "Adaptate stilului fiecăruia (modern sau clasic)",
      c3_f3: "Spălat + styling inclus pentru amândoi",
      c3_f4: "Atmosferă prietenoasă și răbdare maximă",
      individual_services_title: "Servicii Individuale",
      s1_name: "Tuns Barbershop Clasic / Fade",
      s1_desc: "Consultanță stil, Skin Fade, Taper Fade sau tuns foarfecă. Include spălat și aranjat.",
      s2_name: "Aranjat Barbă & Contur",
      s2_desc: "Scurtat, filat, conturare precisă din mașină și lamă, produse hidratante.",
      s3_name: "Pensat cu Briciul",
      s3_desc: "Stilizare sprâncene și curățare impecabilă cu lama briciului pentru un look îngrijit.",
      s4_name: "Spălat Capilar",
      s4_desc: "Curățare profesională a scalpului cu șampon premium și răcorire instantă.",
      s5_name: "Ceară Facială & Îngrijire Ten",
      s5_desc: "Epilare pomeți / nas / urechi și aplicare mască purificatoare cu prosop cald.",
      s6_name: "Vopsit Barbă",
      s6_desc: "Camuflare fire albe și uniformizare discretă a nuanței pentru o barbă densă și conturată.",
      btn_select: "Alege",
      services_cta_note: "Ai un stil anume în minte? Vino cu poza sau lasă-te pe mâna noastră!",
      btn_book_appointment: "✂️ Programează o Ședință",
      barber_tag: "Maeștrii Foarfecii",
      barber_subtitle: "Pasiune autentică, tehnici moderne și dedicare totală pentru fiecare client care se așază pe scaun.",
      barber_bio: "Cu o pasiune clădită pe mii de ore de lucru și o atenție obsesivă la detalii, Zarckeny a adus în Târgoviște conceptul de barbershop în care fiecare tunsoare este personalizată pe fizionomia ta. La Blessed Barbershop, fiecare client beneficiază de aceeași dedicare și calitate fără compromis.",
      barber_specialties_label: "Stiluri Semnătură:",
      btn_book_with_zarckeny: "Programează-te cu Zarckeny",
      gallery_tag: "Portofoliu & Rezultate",
      gallery_subtitle: "Vezi câteva dintre tunsorile și contururile de barbă executate la salon. Fiecare detaliu vorbește de la sine.",
      insta_cta_title: "Vrei să vezi clipuri video cu lucrările noastre zilnice?",
      insta_cta_desc: "Urmărește contul oficial @blessedbyzarckeny pe Instagram și TikTok pentru transformări video reale.",
      reviews_tag: "Reputație & Încredere",
      reviews_subtitle: "Punctajul maxim de 5 stele vorbește despre devotamentul nostru pentru calitate și atmosferă.",
      reviews_total_count: "Pe baza a 159+ recenzii Google Maps",
      btn_view_all_reviews: "Vezi toate recenziile pe Google",
      reviews_convince_note: "Alătură-te sutelor de bărbați care aleg calitatea Blessed Barbershop.",
      location_tag: "Vino la Salon",
      location_subtitle: "Suntem poziționați central în Târgoviște, ușor accesibil, cu locuri de parcare în proximitate.",
      loc_address_title: "Adresă Salon",
      loc_open_maps: "Deschide în Google Maps / Waze →",
      loc_hours_title: "Program de Lucru",
      day_mon_sat: "Luni – Sâmbătă:",
      day_sun: "Duminică:",
      day_closed: "Închis",
      walkin_text: "Cu sau fără programare: În mod obișnuit lucrăm pe bază de programare, dar te poți tunde și fără programare prealabilă, în funcție de disponibilitatea pe scaun.",
      loc_contact_title: "Contact & Programări Rapide",
      loc_contact_sub: "Apelează direct sau scrie-ne un mesaj pe WhatsApp:",
      final_cta_eyebrow: "SCHIMBĂ-ȚI STILUL CHIAR AZI",
      final_cta_sub: "Scaunul tău te așteaptă la Blessed by Zarckeny. Programează-te acum în doar câteva secunde și bucură-te de o experiență de barbershop la superlativ.",
      final_cta_micro: "✓ Fără timp de așteptare • ✓ Produse de top • ✓ Punctaj Google 5.0★",
      footer_brand_desc: "Frizerie și styling masculin în Târgoviște. Precizie milimetrică, atmosferă relaxantă și devotament pentru fiecare client.",
      footer_quick_links: "Link-uri Rapide",
      footer_walkin_hint: "Se poate tunde și fără programare în funcție de disponibilitate.",
      footer_rights: "Toate drepturile rezervate.",
      footer_crafted: "Creat pentru stil și performanță.",
      modal_title: "Programează-te Rapid",
      modal_subtitle: "Alege serviciul dorit și trimite detaliile direct pe WhatsApp sau apelează-ne instant.",
      modal_label_service: "Alege Serviciul sau Pachetul:",
      modal_label_name: "Numele Tău:",
      modal_label_phone: "Telefon:",
      modal_label_date: "Data Preferată:",
      modal_label_time: "Ora Preferată:",
      modal_btn_send_whatsapp: "Trimite Programarea pe WhatsApp",
      modal_or: "sau sună direct",
      modal_call_now: "Apelează 0734 171 995",
      sticky_call: "Sună",
      sticky_book: "✂️ Programează-te"
    },
    en: {
      nav_services: "Services & Prices",
      nav_barber: "About Zarckeny",
      nav_gallery: "Gallery",
      nav_reviews: "Reviews (5.0★)",
      nav_location: "Location & Hours",
      btn_book_now: "Book Now",
      hero_tag: "Elite Barbershop in Târgoviște • Piața 1 Mai Area",
      hero_tagline: "More than a haircut. A state of mind, millimeter precision, and relentless attention to detail.",
      hero_cta_primary: "Book Your Cut Now",
      trust_reviews_count: "159+ Google Reviews",
      trust_location_title: "Târgoviște",
      trust_walkins_title: "Zero Waiting Time",
      trust_walkins_sub: "Appointments & Walk-ins",
      services_tag: "Craft & Transparency",
      services_subtitle: "Transparent pricing, no surprises. Every cut includes custom consultation, hair wash, and premium styling.",
      combos_label: "Featured Combo Packages (Save Money & Look Sharp)",
      combo_best_choice: "CLIENT'S CHOICE",
      combo_1_desc: "The complete grooming ritual for total freshness. Sharp look with complete hair and facial care.",
      c1_f1: "Full Barbershop Cut",
      c1_f2: "Beard Trim & Clean Outline",
      c1_f3: "Professional Scalp Wash",
      c1_f4: "Facial Waxing for ultra-clean contour",
      btn_choose_combo: "Select This Combo",
      combo_2_desc: "The ultimate luxury grooming experience. Complete haircut, beard care, color camouflage, and revitalizing facial treatment.",
      c2_f1: "Haircut + Beard + Beard Color Camouflage",
      c2_f2: "Scalp Wash + Relaxing Head Massage",
      c2_f3: "Facial Waxing + Purifying Face Mask",
      c2_f4: "Straight Razor Brow Styling & Premium Finish",
      combo_3_desc: "Visit us together with your son or friend and enjoy master cuts at an attractive package price.",
      c3_f1: "2 x Full Haircuts (Father + Son / Duo)",
      c3_f2: "Tailored to individual styles (classic or modern)",
      c3_f3: "Wash + Styling included for both",
      c3_f4: "Welcoming vibe and utmost patience",
      individual_services_title: "Individual Services",
      s1_name: "Classic / Fade Barbershop Cut",
      s1_desc: "Style consultation, Skin Fade, Taper, or scissor cut. Includes wash & styling.",
      s2_name: "Beard Trim & Contour",
      s2_desc: "Trimming, blending, machine & razor shaping, soothing beard balm.",
      s3_name: "Straight Razor Brow Styling",
      s3_desc: "Precision eyebrow cleanup and razor detailing for a sharp look.",
      s4_name: "Scalp Wash",
      s4_desc: "Professional deep scalp cleanse with premium refreshing shampoo.",
      s5_name: "Facial Waxing & Skin Care",
      s5_desc: "Cheek, nose, ear waxing followed by hot towel and purifying mask.",
      s6_name: "Beard Color Camouflage",
      s6_desc: "Natural gray blending for a fuller, denser, and well-defined beard.",
      btn_select: "Select",
      services_cta_note: "Have a specific style in mind? Bring a photo or let us craft it for you!",
      btn_book_appointment: "✂️ Book an Appointment",
      barber_tag: "Masters of the Blade",
      barber_subtitle: "True passion, modern techniques, and dedicated attention for every gentleman in the chair.",
      barber_bio: "With skills honed over thousands of hours and an eye for geometry, Zarckeny brought to Târgoviște a barbershop concept where every cut is sculpted to match your facial profile. At Blessed Barbershop, you are treated with mastery and respect.",
      barber_specialties_label: "Signature Styles:",
      btn_book_with_zarckeny: "Book with Zarckeny",
      gallery_tag: "Portfolio & Cuts",
      gallery_subtitle: "Browse recent cuts and beard transformations executed in our shop. The craftsmanship speaks for itself.",
      insta_cta_title: "Want to see daily video transformations?",
      insta_cta_desc: "Follow @blessedbyzarckeny on Instagram & TikTok for real transformation videos and style reels.",
      reviews_tag: "Reputation & Trust",
      reviews_subtitle: "Our 5-star rating reflects our uncompromising devotion to quality, hygiene, and vibe.",
      reviews_total_count: "Based on 159+ Google Maps Reviews",
      btn_view_all_reviews: "View all Google Reviews",
      reviews_convince_note: "Join hundreds of gentlemen who trust Blessed Barbershop for their look.",
      location_tag: "Visit Our Shop",
      location_subtitle: "Centrally located in Târgoviște, easily accessible with parking spots nearby.",
      loc_address_title: "Shop Address",
      loc_open_maps: "Open in Google Maps / Waze →",
      loc_hours_title: "Opening Hours",
      day_mon_sat: "Monday – Saturday:",
      day_sun: "Sunday:",
      day_closed: "Closed",
      walkin_text: "Appointments & Walk-ins: We generally operate on scheduled bookings, but walk-ins are warmly accepted depending on seat availability.",
      loc_contact_title: "Contact & Fast Booking",
      loc_contact_sub: "Call directly or send us a quick WhatsApp message:",
      final_cta_eyebrow: "UPGRADE YOUR LOOK TODAY",
      final_cta_sub: "Your barber chair is ready at Blessed by Zarckeny. Book in just a few seconds and experience top-tier barbershop craftsmanship.",
      final_cta_micro: "✓ Zero waiting time • ✓ Premium products • ✓ Google Score 5.0★",
      footer_brand_desc: "Premium men's grooming & styling in Târgoviște. Millimeter precision, relaxed atmosphere, and devotion to style.",
      footer_quick_links: "Quick Navigation",
      footer_walkin_hint: "Walk-ins accepted based on barber availability.",
      footer_rights: "All rights reserved.",
      footer_crafted: "Crafted for style and performance.",
      modal_title: "Quick Appointment",
      modal_subtitle: "Pick your service and send details straight to WhatsApp or give us a direct call.",
      modal_label_service: "Choose Service or Package:",
      modal_label_name: "Your Name:",
      modal_label_phone: "Phone Number:",
      modal_label_date: "Preferred Date:",
      modal_label_time: "Preferred Time:",
      modal_btn_send_whatsapp: "Send Booking via WhatsApp",
      modal_or: "or call directly",
      modal_call_now: "Call 0734 171 995",
      sticky_call: "Call",
      sticky_book: "✂️ Book Now"
    }
  };

  let currentLang = 'ro';

  // --- LANGUAGE SWITCHER FUNCTION ---
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;

    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update all i18n data elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
    localStorage.setItem('blessed_lang', lang);
    updateLiveStatus();
  }

  // --- LIVE OPEN / CLOSED STATUS CALCULATION ---
  function updateLiveStatus() {
    const statusPill = document.getElementById('live-status-pill');
    const statusText = document.getElementById('live-status-text');
    if (!statusPill || !statusText) return;

    // Get time in Europe/Bucharest timezone
    const now = new Date();
    const roTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Bucharest" }));
    const day = roTime.getDay(); // 0 is Sunday, 1..6 is Mon..Sat
    const hour = roTime.getHours();
    const minute = roTime.getMinutes();
    const timeVal = hour + minute / 60;

    let isOpen = false;
    let label = "";

    if (day >= 1 && day <= 6) {
      // Monday to Saturday: 09:00 - 19:00
      if (timeVal >= 9.0 && timeVal < 19.0) {
        isOpen = true;
        label = currentLang === 'ro' ? "DESCHIS ACUM (Până la 19:00)" : "OPEN NOW (Until 19:00)";
      } else if (timeVal < 9.0) {
        isOpen = false;
        label = currentLang === 'ro' ? "Se deschide azi la 09:00" : "Opens today at 09:00";
      } else {
        isOpen = false;
        const nextDayLabel = day === 6 
          ? (currentLang === 'ro' ? "Se deschide Luni la 09:00" : "Opens Monday at 09:00")
          : (currentLang === 'ro' ? "Se deschide mâine la 09:00" : "Opens tomorrow at 09:00");
        label = currentLang === 'ro' ? `ÎNCHIS ACUM (${nextDayLabel})` : `CLOSED NOW (${nextDayLabel})`;
      }
    } else {
      // Sunday
      isOpen = false;
      label = currentLang === 'ro' ? "ÎNCHIS DUMINICĂ (Deschide Luni 09:00)" : "CLOSED SUNDAY (Opens Monday 09:00)";
    }

    if (isOpen) {
      statusPill.classList.remove('closed');
      statusText.textContent = label;
    } else {
      statusPill.classList.add('closed');
      statusText.textContent = label;
    }
  }

  // --- STICKY HEADER SCROLL EFFECT ---
  function setupHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- MOBILE DRAWER NAVIGATION ---
  function setupMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close');
    const links = document.querySelectorAll('.drawer-link');

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });

    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    links.forEach(link => link.addEventListener('click', closeDrawer));

    // Escape key closes mobile drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --- BOOKING MODAL LOGIC & WHATSAPP DISPATCH ---
  function setupBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('booking-service');
    const dateInput = document.getElementById('booking-date');

    // Default date to tomorrow
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    function openModal(preSelectedService) {
      // Check if external booking engine is configured
      if (CONFIG.bookingMode === 'external' && CONFIG.externalBookingUrl) {
        window.open(CONFIG.externalBookingUrl, '_blank');
        return;
      }

      // If a service was clicked, select or match it
      if (preSelectedService && serviceSelect) {
        let matched = false;
        for (let i = 0; i < serviceSelect.options.length; i++) {
          const opt = serviceSelect.options[i];
          if (opt.value.toLowerCase().includes(preSelectedService.toLowerCase()) || 
              preSelectedService.toLowerCase().includes(opt.value.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          // If not matched, add a temporary option or leave current
          const newOpt = new Option(preSelectedService, preSelectedService, true, true);
          serviceSelect.add(newOpt);
        }
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Attach trigger to all booking buttons
    document.querySelectorAll('.btn-book-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || '';
        openModal(service);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Handle Form Submit -> WhatsApp Message
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const service = document.getElementById('booking-service').value;
        const name = document.getElementById('booking-name').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;

        // Build clean WhatsApp message
        const isRo = currentLang === 'ro';
        const msgHeader = isRo ? "Salut Zarckeny! Vreau să fac o programare la Blessed Barbershop:" : "Hi Zarckeny! I'd like to book an appointment at Blessed Barbershop:";
        const srvLabel = isRo ? "Serviciu" : "Service";
        const nameLabel = isRo ? "Nume" : "Name";
        const phoneLabel = isRo ? "Telefon" : "Phone";
        const dateLabel = isRo ? "Data" : "Date";
        const timeLabel = isRo ? "Ora" : "Time";

        const text = `${msgHeader}\n\n✂️ *${srvLabel}:* ${service}\n👤 *${nameLabel}:* ${name}\n📞 *${phoneLabel}:* ${phone}\n📅 *${dateLabel}:* ${date}\n⏰ *${timeLabel}:* ${time}\n\nMulțumesc!`;

        const encoded = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;

        // On mobile devices, direct navigation opens WhatsApp app instantly without pop-up blocker issues
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobileDevice) {
          window.location.href = whatsappUrl;
        } else {
          window.open(whatsappUrl, '_blank');
        }
        closeModal();
      });
    }
  }

  // --- LIGHTBOX GALLERY ---
  function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !imgEl) return;

    function openLightbox(src, caption) {
      imgEl.src = src;
      imgEl.alt = caption || "Barbershop Haircut Preview";
      if (captionEl) captionEl.textContent = caption || "";
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      imgEl.src = "";
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const fullSrc = card.getAttribute('data-full');
        const caption = card.getAttribute('data-caption');
        if (fullSrc) openLightbox(fullSrc, caption);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // --- INITIALIZE EVERYTHING ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Language preference check
    const savedLang = localStorage.getItem('blessed_lang') || 'ro';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });
    setLanguage(savedLang);

    // 2. Setup interactive components
    setupHeaderScroll();
    setupMobileDrawer();
    setupBookingModal();
    setupLightbox();
    updateLiveStatus();

    // 3. Periodic update of live status every minute
    setInterval(updateLiveStatus, 60000);
  });

})();
