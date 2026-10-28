import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Check, ChevronDown, Code2, Database, Download, ExternalLink, FileText,
  Github, GraduationCap, Laptop, Linkedin, Mail, MapPin, Menu, Moon,
  Phone, Send, Server, Sun, Terminal, X, Zap,
} from 'lucide-react';
import { portfolioConfig as config } from './config';

const navItems = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['experience', 'Experience'], ['projects', 'Projects'],
  ['education', 'Education'], ['contact', 'Contact'],
];

const skillGroups = [
  { title: 'Frontend', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap'] },
  { title: 'Backend', icon: Server, items: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Database', icon: Database, items: ['MongoDB', 'Mongoose'] },
  { title: 'Languages', icon: Terminal, items: ['Java', 'Python', 'C', 'C++'] },
  { title: 'Developer tools', icon: Laptop, items: ['Git', 'GitHub', 'VS Code', 'Postman', 'MongoDB Compass'] },
];

const coursework = [
  'Data Structures and Algorithms', 'Object-Oriented Programming',
  'Database Management Systems', 'Operating Systems', 'Computer Networks',
  'Software Engineering',
];

const responsibilities = [
  'Developed a web-based food ordering application using the MERN stack.',
  'Created responsive user interfaces with React.js and Bootstrap.',
  'Developed RESTful APIs using Node.js and Express.js.',
  'Integrated MongoDB using Mongoose.',
  'Implemented secure user authentication using bcrypt password hashing.',
  'Performed CRUD operations, backend debugging, and application testing.',
];

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}<span className="sr-only">{label}</span>
    </a>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('aniket-portfolio-theme') || 'dark'; }
    catch { return 'dark'; }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [roleIndex, setRoleIndex] = useState(0);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const roles = useMemo(() => ['Full Stack Developer', 'MERN Stack Developer', 'Computer Engineering Student'], []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('aniket-portfolio-theme', theme); } catch { /* storage may be unavailable */ }
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2800);
    return () => window.clearInterval(timer);
  }, [roles]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.45] });
    navItems.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setFormStatus({ type: '', message: '' });
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !subject || !message) {
      setFormStatus({ type: 'error', message: 'Please complete every field before continuing.' });
      return;
    }
    const body = `Hi Aniket,\n\n${message}\n\nFrom: ${name}\nReply email: ${email}`;
    const mailto = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus({ type: 'success', message: 'Your email app should open with your message filled in. Please send it there to complete delivery.' });
    window.location.href = mailto;
  };

  const sourceUrl = config.projects.gofoodSourceCode.trim();
  const liveUrl = config.projects.gofoodLiveDemo.trim();

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header">
        <div className="container nav-container">
          <a href="#home" className="brand" onClick={(event) => { event.preventDefault(); goTo('home'); }} aria-label={`${config.name}, home`}>
            <span className="brand-mark">A<span>.</span></span>
            <span className="brand-name">aniket<span>.dev</span></span>
          </a>
          <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}
                onClick={(event) => { event.preventDefault(); goTo(id); }}>
                {label}
              </a>
            ))}
            <button className="theme-toggle mobile-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </nav>
          <div className="nav-actions">
            <button className="theme-toggle desktop-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="nav-cta" href={`mailto:${config.email}`}>Let's talk <ArrowUpRight size={15} /></a>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section-anchor" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="availability-pill">
                <span className="status-pulse" /> Open to opportunities <span className="pill-divider">/</span> 2027 graduate
              </motion.div>
              <motion.p className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>HELLO, I'M</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }}>
                Aniket <span className="gradient-text">Lasulkar</span><span className="title-period">.</span>
              </motion.h1>
              <div className="hero-role-line"><span className="role-prefix">I'm a</span>
                <AnimatePresence mode="wait"><motion.span key={roles[roleIndex]} className="animated-role" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -9 }} transition={{ duration: 0.25 }}>{roles[roleIndex]}</motion.span></AnimatePresence>
              </div>
              <p className="hero-description">I build responsive web experiences and practical digital products, bringing ideas to life with clean interfaces and reliable backend systems.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => goTo('projects')}>Explore my work <ArrowRight size={17} /></button>
                <a className="button button-secondary" href={config.resumePath} download="Aniket-Lasulkar-Resume.pdf"><Download size={16} /> Download resume</a>
              </div>
              <div className="hero-meta-row">
                <div className="social-links">
                  <SocialLink href={config.github} label="GitHub"><Github size={18} /></SocialLink>
                  <SocialLink href={config.linkedin} label="LinkedIn"><Linkedin size={18} /></SocialLink>
                  <SocialLink href={`mailto:${config.email}`} label="Email"><Mail size={18} /></SocialLink>
                </div>
                <span className="location-label"><MapPin size={14} /> {config.location}</span>
              </div>
            </div>

            <motion.div className="hero-art-wrap" initial={{ opacity: 0, scale: 0.94, x: 18 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
              <div className="art-orbit orbit-a" aria-hidden="true" />
              <div className="art-orbit orbit-b" aria-hidden="true" />
              <div className="art-glow" aria-hidden="true" />
              <div className="code-window">
                <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>aniket.jsx</span><div className="window-top-icon"><Code2 size={14} /></div></div>
                <div className="code-content">
                  <div className="code-line"><span className="line-number">01</span><span><span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}</span></div>
                  <div className="code-line indent"><span className="line-number">02</span><span><span className="code-cyan">name</span>: <span className="code-green">"Aniket"</span>,</span></div>
                  <div className="code-line indent"><span className="line-number">03</span><span><span className="code-cyan">focus</span>: <span className="code-green">"Full Stack"</span>,</span></div>
                  <div className="code-line indent"><span className="line-number">04</span><span><span className="code-cyan">stack</span>: [<span className="code-green">"React"</span>,</span></div>
                  <div className="code-line indent deeper"><span className="line-number">05</span><span><span className="code-green">"Node.js"</span>, <span className="code-green">"MongoDB"</span>],</span></div>
                  <div className="code-line indent"><span className="line-number">06</span><span><span className="code-cyan">learning</span>: <span className="code-purple">true</span>,</span></div>
                  <div className="code-line"><span className="line-number">07</span><span>{'}'};</span></div>
                  <div className="code-line spacer-line"><span className="line-number">08</span><span /></div>
                  <div className="code-line"><span className="line-number">09</span><span><span className="code-purple">export default</span> <span className="code-blue">developer</span>;</span></div>
                  <span className="code-cursor" aria-hidden="true" />
                </div>
                <div className="window-bottom"><span><span className="bottom-dot" /> Ready to build</span><span>JavaScript · UTF-8</span></div>
              </div>
              <div className="floating-chip chip-react"><span className="react-symbol">✳</span> React.js</div>
              <div className="floating-chip chip-node"><span className="node-symbol">⬡</span> Node.js</div>
              <div className="floating-chip chip-mongo"><Database size={15} /> MongoDB</div>
              <div className="art-caption"><span className="caption-line" /> turning ideas into applications</div>
            </motion.div>
          </div>
          <button className="scroll-cue" onClick={() => goTo('about')} aria-label="Scroll to about section"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></button>
        </section>

        <section className="section about-section section-anchor" id="about">
          <div className="container">
            <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Building with curiosity.<br /><span className="muted-heading">Learning with purpose.</span></>} description="A developer in progress, focused on turning what I learn into things people can use." />
            <div className="about-grid">
              <Reveal className="about-copy-wrap">
                <p className="lead-paragraph">I'm a Computer Engineering student with hands-on experience in <strong>MERN stack development</strong>. I enjoy working across the stack — from crafting responsive interfaces to building APIs and connecting data.</p>
                <p className="body-copy">During my internship at Seema Technology, I worked on GoFood, a web-based food ordering application. That experience helped me apply authentication, REST API development, database integration, and practical debugging in a real project workflow.</p>
                <p className="body-copy">I'm continuously expanding my skills, strengthening my fundamentals, and looking for opportunities to contribute to useful software with a collaborative team.</p>
                <button className="text-link" onClick={() => goTo('contact')}>Let's connect <ArrowUpRight size={16} /></button>
              </Reveal>
              <Reveal delay={0.1} className="stats-grid">
                <div className="stat-card stat-large"><div className="stat-icon"><Code2 size={20} /></div><strong>01<span>+</span></strong><span className="stat-label">Featured full-stack project</span><div className="stat-card-glow" /></div>
                <div className="stat-card"><div className="stat-icon violet"><BriefcaseBusiness size={19} /></div><strong>MERN</strong><span className="stat-label">Stack development experience</span></div>
                <div className="stat-card"><div className="stat-icon green"><GraduationCap size={20} /></div><strong>{config.graduationYear}</strong><span className="stat-label">Expected graduation</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section skills-section section-anchor" id="skills">
          <div className="container">
            <SectionHeading eyebrow="MY TOOLKIT" title={<>Technologies I work <span className="gradient-text">with.</span></>} description="Tools and technologies I've used while learning and building full-stack applications." center />
            <div className="skills-grid">
              {skillGroups.map((group, index) => {
                const Icon = group.icon;
                return <Reveal key={group.title} delay={index * 0.06} className={`skill-card skill-card-${index + 1}`}>
                  <div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span className="skill-count">{String(group.items.length).padStart(2, '0')} TOOLS</span></div>
                  <h3>{group.title}</h3>
                  <div className="skill-pills">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </Reveal>;
              })}
            </div>
            <p className="skills-note"><Zap size={15} /> Always learning, always improving.</p>
          </div>
        </section>

        <section className="section experience-section section-anchor" id="experience">
          <div className="container">
            <SectionHeading eyebrow="WHERE I'VE GROWN" title={<>Experience that builds <span className="gradient-text">foundations.</span></>} description="Practical work that helped connect classroom concepts with product development." />
            <Reveal className="experience-card">
              <div className="experience-rail"><div className="experience-company-mark">ST<span>.</span></div><div className="rail-line" /></div>
              <div className="experience-main">
                <div className="experience-topline"><div><span className="experience-type">INTERNSHIP</span><h3>Full Stack Developer Intern</h3><p className="company-name">Seema Technology <span>·</span> Nashik, Maharashtra</p></div><span className="experience-date">Professional training</span></div>
                <p className="experience-summary">Worked on a web-based food ordering application, contributing to frontend development, backend APIs, database integration, and authentication.</p>
                <div className="responsibility-list">{responsibilities.map((item) => <div className="responsibility" key={item}><span className="check-icon"><Check size={13} /></span><span>{item}</span></div>)}</div>
                <div className="experience-tech"><span>React.js</span><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>Bootstrap</span><span>bcrypt</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section projects-section section-anchor" id="projects">
          <div className="container">
            <div className="projects-heading-row"><SectionHeading eyebrow="SELECTED WORK" title={<>A project built <span className="gradient-text">to solve a need.</span></>} description="A look at the full-stack application I've worked on so far." /><span className="project-index">01 / 01</span></div>
            <Reveal className="project-card">
              <div className="project-visual">
                <div className="project-visual-grid" aria-hidden="true" />
                <div className="mock-browser">
                  <div className="mock-browser-bar"><div className="window-dots"><i /><i /><i /></div><div className="mock-url"><span /> gofood.app</div><span className="mock-browser-menu">•••</span></div>
                  <div className="mock-app-content"><div className="mock-app-nav"><strong><span className="gofood-mark">G</span> GoFood</strong><span>Menu&nbsp;&nbsp;&nbsp; About&nbsp;&nbsp;&nbsp; <b>Sign in</b></span></div><div className="mock-app-hero"><span className="mock-tag">FRESH · FAST · DELICIOUS</span><h4>Good food.<br /><em>Good mood.</em></h4><p>Discover something delicious today.</p><div className="mock-order-button">Explore menu <ArrowRight size={10} /></div></div><div className="mock-food-row"><div className="food-tile food-one"><span>🍔</span><small>Classic Burger</small></div><div className="food-tile food-two"><span>🍕</span><small>Italian Pizza</small></div><div className="food-tile food-three"><span>🥗</span><small>Fresh Salad</small></div></div></div>
                </div>
                <div className="project-floating-icon"><Code2 size={20} /></div>
              </div>
              <div className="project-details">
                <div className="project-topline"><span className="project-label"><span /> FEATURED PROJECT</span><span className="project-number">01</span></div>
                <h3>GoFood <span>— Online Food Ordering System</span></h3>
                <p className="project-description">A full-stack web application where users can register, log in securely, browse food items, add products to a shopping cart, and place orders.</p>
                <div className="project-features"><span><Check size={14} /> Secure registration and login</span><span><Check size={14} /> Shopping cart and ordering</span><span><Check size={14} /> REST API + MongoDB</span><span><Check size={14} /> Responsive interface</span></div>
                <div className="project-tags">{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap', 'bcrypt'].map((tag) => <span key={tag}>{tag}</span>)}</div>
                {(liveUrl || sourceUrl) && <div className="project-actions">
                  {liveUrl && <a className="button button-primary" href={liveUrl} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>}
                  {sourceUrl && <a className="button button-secondary" href={sourceUrl} target="_blank" rel="noreferrer"><Github size={16} /> Source code <ArrowUpRight size={14} /></a>}
                </div>}
                {!liveUrl && !sourceUrl && <p className="project-link-note"><FileText size={14} /> Demo and repository links will appear here when configured.</p>}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section education-section section-anchor" id="education">
          <div className="container education-layout">
            <div className="education-left"><SectionHeading eyebrow="THE LEARNING PATH" title={<>Learning today.<br /><span className="muted-heading">Building tomorrow.</span></>} description="The academic foundation behind my work in software development." />
              <div className="coursework-wrap"><h3>Relevant coursework</h3><div className="coursework-grid">{coursework.map((course, index) => <div key={course} className="course-item"><span>{String(index + 1).padStart(2, '0')}</span>{course}</div>)}</div></div>
            </div>
            <Reveal className="education-card">
              <div className="education-card-top"><div className="education-icon"><GraduationCap size={22} /></div><span className="education-status"><span /> IN PROGRESS</span></div>
              <span className="education-degree-label">BACHELOR'S DEGREE</span>
              <h3>Bachelor of Engineering</h3><p className="education-specialty">Computer Engineering</p>
              <div className="education-divider" />
              <p className="education-institution">PVG's College of Engineering &amp; S.S.D. Institute of Management</p>
              <p className="education-location"><MapPin size={14} /> Nashik, Maharashtra</p>
              <div className="education-footer"><span>Savitribai Phule Pune University</span><strong>Class of {config.graduationYear}</strong></div>
            </Reveal>
          </div>
        </section>

        <section className="section contact-section section-anchor" id="contact">
          <div className="container">
            <div className="contact-panel">
              <div className="contact-decoration contact-decoration-one" aria-hidden="true" /><div className="contact-decoration contact-decoration-two" aria-hidden="true" />
              <div className="contact-content">
                <SectionHeading eyebrow="LET'S TALK" title={<>Have a project in mind?<br /><span className="gradient-text">Let's connect.</span></>} description="Have an internship opportunity, project idea, or just want to talk tech? Send me a message." />
                <div className="contact-info-list">
                  <a href={`mailto:${config.email}`} className="contact-info-item"><span className="contact-info-icon"><Mail size={18} /></span><span><small>EMAIL ME AT</small><strong>{config.email}</strong></span><ArrowUpRight size={16} className="contact-info-arrow" /></a>
                  <a href={`tel:${config.phoneHref}`} className="contact-info-item"><span className="contact-info-icon"><Phone size={18} /></span><span><small>CALL ME</small><strong>{config.phone}</strong></span><ArrowUpRight size={16} className="contact-info-arrow" /></a>
                  <div className="contact-info-item"><span className="contact-info-icon"><MapPin size={18} /></span><span><small>BASED IN</small><strong>{config.location}</strong></span></div>
                </div>
                <div className="contact-socials"><span>Find me elsewhere</span><a href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a></div>
              </div>
              <div className="contact-form-wrap">
                <div className="form-heading"><span className="form-step">01 — 04</span><h3>Send a message</h3><p>All fields are required.</p></div>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-row"><label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" maxLength="100" required /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength="254" required /></label></div>
                  <label>Subject<input name="subject" type="text" placeholder="What is this about?" maxLength="140" required /></label>
                  <label>Message<textarea name="message" placeholder="Tell me a little about it..." rows="4" minLength="10" maxLength="3000" required /></label>
                  <p className="form-helper"><span /> This form opens your email application; it does not send messages directly.</p>
                  <button type="submit" className="button button-primary send-button">Prepare email <Send size={16} /></button>
                  {formStatus.message && <p role="status" className={`form-status ${formStatus.type}`}>{formStatus.message}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><a href="#home" className="brand footer-brand" onClick={(event) => { event.preventDefault(); goTo('home'); }}><span className="brand-mark">A<span>.</span></span><span className="brand-name">aniket<span>.dev</span></span></a><p>Designed &amp; built with curiosity by <strong>{config.name}</strong>.</p><div className="footer-links"><a href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={`mailto:${config.email}`} aria-label="Email"><Mail size={17} /></a></div><span className="copyright">© {new Date().getFullYear()} {config.name}</span></div>
      </footer>
      <button className="back-to-top" onClick={() => goTo('home')} aria-label="Back to top"><ArrowDownRight size={18} /></button>
    </div>
  );
}

export default App;
