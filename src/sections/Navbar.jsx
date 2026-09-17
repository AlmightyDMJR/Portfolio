import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Sparkles,
  Mail,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { mySocials } from '../constants';

// Social profiles lookup map
const socialLinks = {
  GitHub: mySocials.find((s) => s.name === 'GitHub')?.href || 'https://github.com/AlmightyDMJR',
  LinkedIn: mySocials.find((s) => s.name === 'LinkedIn')?.href || 'https://www.linkedin.com/in/diganta-mukherjee-a1b31a323/',
  Instagram: mySocials.find((s) => s.name === 'Instagram')?.href || 'https://www.instagram.com/the_almighty_dmjr/',
};

// Inline SVG social icons for high fidelity
const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll handler for in-page anchors
  const scrollToSection = (e, href) => {
    if (e) e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  // External profile link handler
  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Navigation Items
  const navButtons = [
    {
      name: 'Home',
      icon: <Home className="w-5 h-5" />,
      onClick: (e) => scrollToSection(e, '#home'),
      href: '#home',
    },
    {
      name: 'About',
      icon: <User className="w-5 h-5" />,
      onClick: (e) => scrollToSection(e, '#about'),
      href: '#about',
    },
    {
      name: 'Work',
      icon: <Briefcase className="w-5 h-5" />,
      onClick: (e) => scrollToSection(e, '#projects'),
      href: '#projects',
    },
    {
      name: 'Hobbies',
      icon: <Sparkles className="w-5 h-5" />,
      onClick: (e) => scrollToSection(e, '#hobbies'),
      href: '#hobbies',
    },
    {
      name: 'Contact',
      icon: <Mail className="w-5 h-5" />,
      onClick: (e) => scrollToSection(e, '#contact'),
      href: '#contact',
    },
  ];

  // Social Profile Items
  const socialButtons = [
    {
      name: 'GitHub Profile',
      icon: <GitHubIcon />,
      onClick: () => openSocial(socialLinks.GitHub),
      href: socialLinks.GitHub,
    },
    {
      name: 'LinkedIn Profile',
      icon: <LinkedInIcon />,
      onClick: () => openSocial(socialLinks.LinkedIn),
      href: socialLinks.LinkedIn,
    },
    {
      name: 'Instagram Profile',
      icon: <InstagramIcon />,
      onClick: () => openSocial(socialLinks.Instagram),
      href: socialLinks.Instagram,
    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(3, 4, 18, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <nav className="container mx-auto max-w-7xl c-space h-20 flex items-center justify-between">
        {/* Left Side: The DMJR.dev line */}
        <a
          href="#home"
          id="nav-logo"
          onClick={(e) => scrollToSection(e, '#home')}
          className="text-xl font-bold tracking-tight select-none flex items-center gap-2 group transition-all duration-300 hover:scale-105"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #7a57db, #33c2cc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DMJR.dev
          </span>
        </a>

        {/* Desktop Nav: Apple-Style Dock */}
        <div className="hidden md:flex items-center">
          <Dock
            singlePop={true}
            panelHeight={52}
            className="items-center border border-white/[0.08] backdrop-blur-2xl rounded-2xl px-4 md:px-6 py-2 gap-3 md:gap-4"
            style={{
              background:
                'radial-gradient(135% 100% at 50% 50%, rgba(26, 30, 58, 0.72) 0%, rgba(15, 18, 38, 0.45) 60%, rgba(6, 9, 31, 0.1) 100%)',
              boxShadow:
                '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(122, 87, 219, 0.06)',
            }}
          >
            {/* Nav buttons: Home, About, Work, Hobbies, Contact */}
            {navButtons.map((item) => (
              <DockItem
                key={item.name}
                onClick={item.onClick}
                aria-label={item.name}
                className="w-10 h-10 aspect-square rounded-xl bg-white/[0.05] hover:bg-white/[0.14] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors duration-150 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-lavender/30"
              >
                <DockLabel className="top-full mt-2.5 border border-white/15 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-md px-2.5 py-1 text-xs font-medium rounded-lg">
                  {item.name}
                </DockLabel>
                <DockIcon className="text-neutral-300 hover:text-white">
                  {item.icon}
                </DockIcon>
              </DockItem>
            ))}

            {/* Visual divider separating navigation links from social profiles */}
            <div
              className="w-[1px] h-6 bg-white/20 self-center mx-1.5 md:mx-2 rounded-full shrink-0"
              aria-hidden="true"
            />

            {/* Social buttons: GitHub, LinkedIn, Instagram */}
            {socialButtons.map((item) => (
              <DockItem
                key={item.name}
                onClick={item.onClick}
                aria-label={item.name}
                className="w-10 h-10 aspect-square rounded-xl bg-white/[0.05] hover:bg-white/[0.14] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors duration-150 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-aqua/30"
              >
                <DockLabel className="top-full mt-2.5 border border-white/15 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-md px-2.5 py-1 text-xs font-medium rounded-lg">
                  {item.name}
                </DockLabel>
                <DockIcon className="text-neutral-300 hover:text-white">
                  {item.icon}
                </DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          id="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <motion.span
            className="w-6 h-0.5 bg-white block origin-center"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white block"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white block origin-center"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10"
            style={{ background: 'rgba(3, 4, 18, 0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="c-space py-4 flex flex-col gap-2">
              {navButtons.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => {
                    item.onClick(e);
                    setIsOpen(false);
                  }}
                  id={`mobile-nav-${item.name.toLowerCase()}`}
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-200 text-left cursor-pointer"
                >
                  <span className="text-lavender">{item.icon}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              ))}

              <div className="flex items-center gap-3 px-4 pt-4 border-t border-white/10 mt-2">
                {socialButtons.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    aria-label={item.name}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
