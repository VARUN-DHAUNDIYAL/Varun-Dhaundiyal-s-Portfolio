import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

// Mobile Menu Portal Component
function MobileMenuPortal({ isOpen, onClose, navLinks, scrollToSection }: {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { name: string; href: string }[];
    scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            id="mobile-nav-portal"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.98)',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out',
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                }}
                aria-label="Close menu"
            >
                <X size={24} />
            </button>

            {/* Navigation Links */}
            <nav style={{ textAlign: 'center' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {navLinks.map((link, index) => (
                        <li
                            key={link.name}
                            style={{
                                marginBottom: '24px',
                                animation: `slideUp 0.4s ease-out ${index * 0.1}s both`,
                            }}
                        >
                            <a
                                href={link.href}
                                onClick={(e) => {
                                    scrollToSection(e, link.href);
                                    onClose();
                                }}
                                style={{
                                    color: 'white',
                                    fontSize: '28px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'block',
                                    padding: '12px 24px',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Keyframe animations injected as style tag */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                #mobile-nav-portal * {
                    transform: none !important;
                    backface-visibility: visible !important;
                }
            `}</style>
        </div>,
        document.body
    );
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[101] transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
                    <a
                        href="#canvas-container"
                        onClick={(e) => scrollToSection(e, '#canvas-container')}
                        className="text-xl font-bold tracking-tighter text-white/90 hover:text-white transition-colors"
                    >
                        VD<span className="text-primary">.</span>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        aria-label="Open menu"
                        style={{ minWidth: '40px', minHeight: '40px' }}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu rendered via Portal */}
            <MobileMenuPortal
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={navLinks}
                scrollToSection={scrollToSection}
            />
        </>
    );
}
