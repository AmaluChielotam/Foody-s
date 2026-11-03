import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft,
  ChevronRight, Clock3, Download, Heart, MapPin, Menu, PackageCheck, Play,
  Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, Store, Truck,
  Utensils, X, Zap
} from 'lucide-react';

const RED = '#e62e3b';
const typePhrases = ['your hostel', 'your lecture break', 'your study session', 'your favourite spot'];
const slides = [
  {
    eyebrow: 'YOUR CAMPUS. YOUR CRAVINGS.',
    title: <>Your favourite.<br /><span>A tap away.</span></>,
    copy: 'From the spots you already love to new campus favourites — get it delivered without interrupting your day.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    tag: 'THE CLASSIC BURGER', sub: 'Big flavour. Zero stress.', price: 'From ₦3,500', bg: 'coral'
  },
  {
    eyebrow: 'GOOD FOOD, GOOD MOOD.',
    title: <>Make room for<br /><span>something delicious.</span></>,
    copy: 'Explore meals, snacks and drinks from shops around Veritas — all in one easy-to-use app.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
    tag: 'PIZZA O’CLOCK', sub: 'Your break just got better.', price: 'From ₦4,000', bg: 'gold'
  },
  {
    eyebrow: 'MORE TIME FOR YOU.',
    title: <>Less waiting.<br /><span>More living.</span></>,
    copy: 'Place your order, follow its journey and get back to what matters. Foodys keeps your cravings moving.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    tag: 'FRESH & FEEL-GOOD', sub: 'A little goodness goes far.', price: 'Made for your day', bg: 'mint'
  }
];

const shopCards = [
  { name: 'The Campus Kitchen', type: 'Meals & local favourites', time: '15–25 min', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80', badge: 'STUDENT FAVOURITE' },
  { name: 'Crave Corner', type: 'Burgers, wraps & bites', time: '20–30 min', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80', badge: 'QUICK BITES' },
  { name: 'Sweet Spot', type: 'Treats, pastries & drinks', time: '10–20 min', image: 'https://images.unsplash.com/photo-1551024506-0csvd5b1?auto=format&fit=crop&w=700&q=80', badge: 'SOMETHING SWEET' },
];

const steps = [
  { n: '01', title: 'Browse', text: 'Explore campus shops and discover amazing meals from the spots you already love.', icon: Search, color: 'red' },
  { n: '02', title: 'Order', text: 'Choose your favourites, customise your order and check out in a few easy taps.', icon: ShoppingBag, color: 'yellow' },
  { n: '03', title: 'Track', text: 'Follow your order in real time, with updates that keep you in the loop.', icon: MapPin, color: 'blue' },
  { n: '04', title: 'Enjoy', text: 'Get your delicious food delivered hot and fresh right to your door.', icon: Sparkles, color: 'green' },
];

const faqs = [
  ['What is Foodys?', 'Foodys is a campus delivery platform that connects you with participating food shops and vendors around Veritas University. Browse, order, track and enjoy from one app.'],
  ['How do I place an order?', 'Download Foodys, choose a participating shop, browse its available menu, add your favourites to your order and follow the checkout steps in the app.'],
  ['Can I order from different shops?', 'You can explore the participating shops available on Foodys and choose the one that fits your craving. Availability and multi-shop ordering depend on the app’s current features.'],
  ['How do I track my delivery?', 'After placing an eligible order, use the order-tracking feature in the Foodys app to follow updates on its progress.'],
];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Foodys home">
    <span className="brand-mark"><span className="brand-mark-inner">f</span><i /></span>
    <span>foodys<span className="brand-dot">.</span></span>
  </a>;
}

function App() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState('');
  const [typedPhrase, setTypedPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const active = slides[slide];

  useEffect(() => {
    const onScroll = () => setShowFloatingNav(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const phrase = typePhrases[phraseIndex];
    const deleting = typedPhrase === phrase;
    const delay = deleting ? 1450 : 72;
    const timer = window.setTimeout(() => {
      if (deleting) { setTypedPhrase(''); setPhraseIndex((i) => (i + 1) % typePhrases.length); }
      else setTypedPhrase(phrase.slice(0, typedPhrase.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typedPhrase, phraseIndex]);

  const nextSlide = () => setSlide((s) => (s + 1) % slides.length);
  const prevSlide = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const downloadAction = () => {
    setToast('You’re one step closer to Foodys! Add your official app-store links here.');
    window.setTimeout(() => setToast(''), 4200);
  };
  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(email.trim() ? `Thanks! We’ll keep ${email} in the loop.` : 'Enter your email to continue.');
    window.setTimeout(() => setToast(''), 4200);
    if (email.trim()) setEmail('');
  };

  return <div id="home" className="site-shell">
    <div className="announcement"><Sparkles size={14} /> Your campus cravings called. <strong>Foodys is on the way.</strong><a href="#how-it-works">See how it works <ArrowRight size={13} /></a></div>
    <header className={`header header-floating ${showFloatingNav ? 'header-visible' : ''}`}>
      <div className="container nav-wrap">
        <Brand />
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a className="nav-active" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#campus-shops" onClick={() => setMenuOpen(false)}>Campus shops</a>
          <a href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="nav-cta" onClick={downloadAction}>Get the app <ArrowUpRight size={17} /></button>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero container">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow-pulse" /> {active.eyebrow}</motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={slide} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .42 }}>
              <h1>{active.title}</h1>
            </motion.div>
          </AnimatePresence>
          <div className="hero-type-line" aria-label={`From café to ${typedPhrase}`}>
            <span>From café to</span> <strong>{typedPhrase}</strong><span className="type-cursor" aria-hidden="true">|</span>
          </div>
          <p className="hero-description">{active.copy}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={downloadAction}><Download size={18} /> Download Foodys <ArrowRight size={17} /></button>
            <a className="btn-secondary" href="#how-it-works"><span className="play-icon"><Play size={13} fill="currentColor" /></span> See how it works</a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><span>🍔</span><span>🍕</span><span>🍜</span><span>🥤</span></div>
            <div><div className="proof-stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div><p><strong>Made for campus life.</strong> Built around your cravings.</p></div>
          </div>
        </div>
        <div className={`hero-visual ${active.bg}`}>
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <AnimatePresence mode="wait">
            <motion.div className="hero-food-frame" key={active.image} initial={{ opacity: 0, scale: .94, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .96, rotate: -2 }} transition={{ duration: .45 }}>
              <img src={active.image} alt="Delicious meal available from participating campus shops" />
            </motion.div>
          </AnimatePresence>
          <motion.div className="floating-card food-tag" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}><span className="mini-food-icon">✦</span><div><b>{active.tag}</b><small>{active.sub}</small></div><span className="tag-price">{active.price}</span></motion.div>
          <motion.div className="floating-card delivery-tag" animate={{ y: [0, 7, 0] }} transition={{ duration: 3.5, repeat: Infinity }}><span className="delivery-icon"><Truck size={19} /></span><div><b>Good things are moving</b><small>Order. Track. Enjoy.</small></div><span className="live-dot" /></motion.div>
          <div className="hero-sticker"><span>MADE FOR</span><b>CAMPUS<br/>LIFE!</b><ArrowDownRight size={24}/></div>
          <div className="slider-controls">
            <div className="slider-count"><b>0{slide + 1}</b><span>/</span>0{slides.length}</div>
            <div className="slider-dots">{slides.map((s, i) => <button key={s.eyebrow} aria-label={`Show slide ${i + 1}`} onClick={() => setSlide(i)} className={i === slide ? 'dot active' : 'dot'} />)}</div>
            <div className="slider-arrows"><button aria-label="Previous slide" onClick={prevSlide}><ChevronLeft size={19}/></button><button aria-label="Next slide" onClick={nextSlide}><ChevronRight size={19}/></button></div>
          </div>
          <div className="hero-scribble">yum<span>!</span></div>
        </div>
        <div className="hero-scroll"><span /> SCROLL TO GET HUNGRY</div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <div className="trust-intro"><span className="tiny-spark">✳</span><b>Your campus, connected.</b></div>
          <div><Store size={19}/><span>Shops you know</span></div><div><Zap size={19}/><span>Easy ordering</span></div><div><PackageCheck size={19}/><span>Order updates</span></div><div><Heart size={19}/><span>More time for you</span></div>
        </div>
      </section>

      <section id="how-it-works" className="section process-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-kicker">FOODYS, MADE SIMPLE</span>
            <h2>Four steps. <span>One happy you.</span></h2>
            <p>From “what should I eat?” to “that hit the spot.” Here’s how Foodys makes it happen.</p>
          </div>
          <div className="steps-track"><div className="track-line"><span /></div>
            {steps.map((step, i) => { const Icon = step.icon; return <motion.article className={`step-card step-${step.color}`} key={step.n} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: i * .12, duration: .5 }}>
              <div className="step-icon"><Icon size={30} strokeWidth={1.8}/><span>{step.n}</span></div><h3>{step.title}</h3><p>{step.text}</p>
            </motion.article>})}
          </div>
          <div className="process-bottom"><span><Check size={15}/> Simple by design</span><span><Check size={15}/> Made for campus life</span><span><Check size={15}/> All in one app</span></div>
        </div>
      </section>

      <section id="campus-shops" className="section shops-section">
        <div className="container">
          <div className="shops-head"><div><span className="section-kicker">THE PLACES YOU LOVE</span><h2>Campus shops.<br/><span>Meet Foodys.</span></h2><p>Your favourite spots, all coming together in one app.</p></div><a href="#download" className="text-link">Explore with Foodys <ArrowUpRight size={18}/></a></div>
          <div className="shop-grid">{shopCards.map((shop, i) => <motion.article className="shop-card" key={shop.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
            <div className="shop-image"><img src={shop.image} alt={`${shop.type} from a sample campus shop`} loading="lazy"/><span className="shop-badge">{shop.badge}</span><button className="shop-heart" aria-label={`Save ${shop.name}`} onClick={(e) => { const b = e.currentTarget; b.classList.toggle('liked'); }}><Heart size={18}/></button></div>
            <div className="shop-content"><div><h3>{shop.name}</h3><p>{shop.type}</p></div><span className="shop-time"><Clock3 size={14}/>{shop.time}</span><div className="shop-footer"><span><MapPin size={14}/> Veritas campus concept</span><button onClick={downloadAction}>Order in app <ArrowRight size={15}/></button></div></div>
          </motion.article>)}</div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <div className="why-heading"><span className="section-kicker">A LITTLE MORE JOY IN YOUR DAY</span><h2>Why students choose <span>Foodys.</span></h2><p>Campus life moves fast. Getting your favourite things shouldn’t slow you down.</p></div>
          <div className="why-grid">
            <motion.article className="why-card why-red" whileHover={{ y: -8, rotate: -1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}><span className="why-icon"><Store size={26}/></span><span className="why-number">01 / DISCOVER</span><h3>Your campus, all in one place.</h3><p>Find participating shops around Veritas without hopping between different pages and menus.</p><span className="why-decoration">✳</span></motion.article>
            <motion.article className="why-card why-yellow" whileHover={{ y: -8, rotate: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}><span className="why-icon"><Zap size={26}/></span><span className="why-number">02 / EASY</span><h3>Less hassle. More yum.</h3><p>Browse what you’re craving and place an order through one simple app experience.</p><span className="why-decoration">✦</span></motion.article>
            <motion.article className="why-card why-mint" whileHover={{ y: -8, rotate: -1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}><span className="why-icon"><PackageCheck size={26}/></span><span className="why-number">03 / IN THE LOOP</span><h3>Know what’s happening.</h3><p>Follow order updates and feel more in control from checkout to delivery.</p><span className="why-decoration">♡</span></motion.article>
          </div>
        </div>
      </section>

      <section className="section feature-section">
        <div className="container feature-layout">
          <div className="phone-stage">
            <div className="phone-halo" />
            <motion.div className="phone-mock" initial={{ y: 30, rotate: -5 }} whileInView={{ y: 0, rotate: -3 }} viewport={{ once: true }} transition={{ duration: .7 }}>
              <div className="phone-notch" /><div className="phone-status"><span>9:41</span><span>● ▰ ▴</span></div>
              <div className="phone-brand"><Brand/></div>
              <div className="phone-greeting">Hey there, foodie 👋<h3>What are you craving?</h3></div>
              <div className="phone-search"><Search size={14}/> Search meals or shops</div>
              <div className="phone-categories"><span>🍛<small>Meals</small></span><span>🍔<small>Burgers</small></span><span>🍕<small>Pizza</small></span><span>🧋<small>Drinks</small></span></div>
              <div className="phone-promo"><span>YOUR NEXT<br/>FAVOURITE</span><b>is a tap away.</b><span className="promo-emoji">🍔</span></div>
              <div className="phone-label">Popular near you <span>See all</span></div>
              <div className="phone-meal"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=250&q=75" alt="Burger preview"/><div><b>Classic Burger</b><small>Crave Corner</small><strong>₦3,500</strong></div><span>＋</span></div>
              <div className="phone-nav"><span>⌂<small>Home</small></span><span>♡<small>Saved</small></span><span>▤<small>Orders</small></span><span>☺<small>Profile</small></span></div>
            </motion.div>
            <div className="phone-float float-one"><span>⚡</span><div><b>Easy ordering</b><small>Just a few taps</small></div></div>
            <div className="phone-float float-two"><span>♡</span><div><b>Your go-to spots</b><small>All in one place</small></div></div>
          </div>
          <div className="feature-copy"><span className="section-kicker">YOUR DAY, UPGRADED</span><h2>Good food is great.<br/><span>Convenience is better.</span></h2><p>Foodys brings participating campus shops closer to you. No more wondering where to start — just find your craving, place your order and keep your day moving.</p>
            <div className="feature-list"><div><span className="feature-icon"><Search/></span><div><b>Find your kind of delicious</b><p>Browse shops and discover something new or stick with your go-to.</p></div></div><div><span className="feature-icon"><ShieldCheck/></span><div><b>Stay in the loop</b><p>Order updates help you know what’s happening next.</p></div></div><div><span className="feature-icon"><Smartphone/></span><div><b>Made for life on campus</b><p>A simple app experience built around busy student days.</p></div></div></div>
            <button className="btn-primary" onClick={downloadAction}><Download size={18}/> Get the Foodys app <ArrowRight size={17}/></button>
          </div>
        </div>
      </section>

      <section id="download" className="download-section">
        <div className="container">
          <div className="download-panel">
            <div className="download-shapes"><span/><span/><span/></div>
            <div className="download-art"><div className="download-circle"><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85" alt="A delicious spread of food"/><span className="circle-label">YOUR CRAVINGS<br/>HAVE A HOME.</span></div><div className="download-spark spark-a">✳</div><div className="download-spark spark-b">✦</div><div className="download-sticker">TAP.<br/>ORDER.<br/><i>YUM.</i></div></div>
            <div className="download-copy"><span className="download-kicker"><Sparkles size={14}/> YOUR NEXT CRAVING IS CALLING</span><h2>One app. More options.<br/><span>Way more yum.</span></h2><p>Bring your favourite campus shops to your fingertips. Download Foodys and make your next meal the easiest decision of your day.</p><div className="download-buttons"><button className="store-button" onClick={downloadAction}><span className="store-icon">▶</span><span><b>Google Play</b></span><ArrowUpRight size={18}/></button><button className="store-button" onClick={downloadAction}><span className="apple-icon">●</span><span><b>App Store</b></span><ArrowUpRight size={18}/></button></div><small className="store-note">Official app-store links can be connected here before launch.</small></div>
          </div>
        </div>
      </section>

      <section id="faqs" className="section faq-section"><div className="container faq-layout"><div><span className="section-kicker">GOOD QUESTIONS</span><h2>Curious?<br/><span>We’ve got you.</span></h2><p>Everything you need to know before your first Foodys order.</p><a className="text-link" href="#contact">Still need help? Talk to us <ArrowRight size={17}/></a></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item faq-tone-${i % 4} ${faqOpen === i ? 'faq-expanded' : ''}`} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span><i>0{i + 1}</i>{q}</span><ChevronDown size={19}/></button><AnimatePresence>{faqOpen === i && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

      <section id="contact" className="newsletter-section"><div className="container newsletter-inner"><div><span className="section-kicker">STAY IN THE LOOP</span><h2>Good things are <span>delivering.</span></h2><p>Be first to hear about Foodys updates, campus shop additions and more.</p></div><form onSubmit={submitEmail}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" required placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit">Keep me posted <ArrowRight size={17}/></button><small>This demo form does not send or store email addresses yet.</small></form></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand/><p>Your favourite campus shops,<br/>delivered with a little extra joy.</p><div className="social-links"><a href="#contact" aria-label="Instagram">ig</a><a href="#contact" aria-label="TikTok">tk</a><a href="#contact" aria-label="X">𝕏</a></div></div><div className="footer-links"><b>Explore</b><a href="#how-it-works">How it works</a><a href="#campus-shops">Campus shops</a><a href="#download">Get the app</a><a href="#faqs">FAQs</a></div><div className="footer-links"><b>Say hello</b><a href="#contact">Contact Foodys</a><a href="#contact">Partner with us</a><a href="#contact">Support</a></div><div className="footer-app"><span className="footer-app-icon"><ShoppingBag/></span><b>Cravings don’t wait.</b><p>Make your next order a Foodys order.</p><button onClick={downloadAction}>Download the app <ArrowRight size={15}/></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Foodys. All good things reserved.</span><div><a href="#contact">Privacy</a><a href="#contact">Terms</a></div><span className="footer-made">Made for campus life <span>♥</span></span></div></div></footer>
    <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}><Check size={17}/>{toast}<button aria-label="Close notification" onClick={() => setToast('')}><X size={15}/></button></motion.div>}</AnimatePresence>
  </div>;
}

export default App;