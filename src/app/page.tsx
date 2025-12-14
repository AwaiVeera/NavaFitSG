"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Sword, 
  Wind, 
  Brain, 
  Flame, 
  Calendar, 
  ArrowRight, 
  Menu, 
  X,
  Star,
  Shield,
  Zap
} from "lucide-react";

export default function RiseOfDawnPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offerings = [
    {
      icon: Sword,
      title: "STRENGTH",
      subtitle: "Gada & Kalari",
      description: "Master ancient Indian weapons training. Build functional strength through traditional mace work and martial arts.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Wind,
      title: "MOBILITY",
      subtitle: "Flow & Freedom",
      description: "Unlock your body's full range of motion. Develop grace, flexibility, and fluid movement patterns.",
      gradient: "from-teal-400 to-emerald-500",
    },
    {
      icon: Brain,
      title: "BREATHWORK",
      subtitle: "Pranayama",
      description: "Harness the power of breath. Ancient techniques for energy, focus, and mental clarity.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Flame,
      title: "MINDSET",
      subtitle: "Warrior Spirit",
      description: "Forge an unbreakable mindset. Develop discipline, resilience, and the heart of a warrior.",
      gradient: "from-rose-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh K.",
      role: "Tech Executive",
      text: "NavaFit transformed my approach to fitness. The ancient wisdom combined with modern training is unmatched.",
      rating: 5,
    },
    {
      name: "Priya S.",
      role: "Fitness Enthusiast",
      text: "Training with Gada has given me strength I never knew I had. This is the real deal.",
      rating: 5,
    },
    {
      name: "Marcus T.",
      role: "Martial Artist",
      text: "The Kalari techniques here are authentic and powerful. A true warrior's training ground.",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-lg border-b border-[#00bfff]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center">
          {/* Centered Logo with Neon Blue Glow */}
          <Link href="/" className="flex items-center justify-center relative">
            {/* Neon Blue Glow Background */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 30px 10px rgba(0, 191, 255, 0.4), 0 0 60px 20px rgba(0, 191, 255, 0.2), 0 0 100px 40px rgba(0, 191, 255, 0.1)",
                  "0 0 40px 15px rgba(0, 191, 255, 0.6), 0 0 80px 30px rgba(0, 191, 255, 0.3), 0 0 120px 50px rgba(0, 191, 255, 0.15)",
                  "0 0 30px 10px rgba(0, 191, 255, 0.4), 0 0 60px 20px rgba(0, 191, 255, 0.2), 0 0 100px 40px rgba(0, 191, 255, 0.1)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                width: "180px", 
                height: "180px", 
                left: "50%", 
                top: "50%", 
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(0, 191, 255, 0.15) 0%, transparent 70%)"
              }}
            />
            <div className="relative w-[240px] h-[240px]">
              <Image
                src="/images/nfl.png"
                alt="NavaFit"
                fill
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0, 191, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 191, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 191, 255, 0.3))"
                }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 mt-4">
            <Link href="#offerings" className="text-sm tracking-wider hover:text-[#00bfff] transition-colors font-subheading">
              TRAINING
            </Link>
            <Link href="#wisdom" className="text-sm tracking-wider hover:text-[#00bfff] transition-colors font-subheading">
              PHILOSOPHY
            </Link>
            <Link href="#founder" className="text-sm tracking-wider hover:text-[#00bfff] transition-colors font-subheading">
              FOUNDER
            </Link>
            <Link
              href="/early-bird"
              className="px-6 py-2.5 bg-gradient-to-r from-[#3d7a4f] to-[#4c8f60] rounded-full text-sm font-bold tracking-wider hover:shadow-[0_0_30px_rgba(76,143,96,0.5)] transition-all font-subheading"
            >
              JOIN NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute right-6 top-6 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-b border-[#00bfff]/20 p-6"
          >
            <div className="flex flex-col gap-4">
              <Link href="#offerings" className="text-lg font-subheading" onClick={() => setIsMenuOpen(false)}>
                Training
              </Link>
              <Link href="#wisdom" className="text-lg font-subheading" onClick={() => setIsMenuOpen(false)}>
                Philosophy
              </Link>
              <Link href="#founder" className="text-lg font-subheading" onClick={() => setIsMenuOpen(false)}>
                Founder
              </Link>
              <Link
                href="/early-bird"
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#3d7a4f] to-[#4c8f60] rounded-full text-center font-bold font-subheading"
                onClick={() => setIsMenuOpen(false)}
              >
                JOIN NOW
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Black Background */}
          <div className="absolute inset-0 bg-black" />

          {/* Background watermark: nfil.png (glowing, 35% opacity) */}
          <motion.div
            style={{ opacity, scale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] select-none pointer-events-none"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.28, 0.35, 0.28],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/nfil.png"
                alt="NavaFit Background"
                fill
                className="object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 18px rgba(0, 191, 255, 0.45)) drop-shadow(0 0 48px rgba(0, 191, 255, 0.18))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#4c8f60]/50 bg-[#4c8f60]/10 mb-8"
            >
              <Zap className="w-4 h-4 text-[#7dcea0]" />
              <span className="text-[#7dcea0] text-sm font-semibold tracking-[0.2em] font-subheading">
                ANCIENT WISDOM • MODERN POWER
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-glow-hover font-heading"
                style={{ textShadow: "0 0 80px rgba(76,143,96,0.3)" }}
              >
                RISE OF DAWN
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mt-4 text-[#9dcfae] text-glow-hover font-subheading"
              >
                The Hindu Warrior&apos;s Awakening
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-[#8ab89a] max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Forge your body and mind through the sacred arts of{" "}
              <span className="text-white font-semibold">Gada</span>,{" "}
              <span className="text-white font-semibold">Kalari</span>, and{" "}
              <span className="text-white font-semibold">Pranayama</span>.
              <br className="hidden sm:block" />
              Train like the warriors of ancient India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/early-bird"
                className="group px-8 py-4 bg-gradient-to-r from-[#3d7a4f] via-[#4c8f60] to-[#3d7a4f] rounded-full text-lg font-bold tracking-wider flex items-center gap-3 shadow-[0_0_40px_rgba(76,143,96,0.4)] hover:shadow-[0_0_60px_rgba(125,206,160,0.5)] transition-all"
              >
                JOIN TRAINING
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#wisdom"
                className="px-8 py-4 border-2 border-[#4c8f60]/50 rounded-full text-lg font-medium tracking-wider hover:bg-[#4c8f60]/10 hover:border-[#7dcea0] transition-all"
              >
                LEARN THE WAY
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-[#4c8f60]/50 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#7dcea0] rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ANCIENT WISDOM SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="wisdom" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030806] via-[#0a1510] to-[#030806]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#7dcea0] text-sm font-bold tracking-[0.3em] mb-4 block font-subheading">
              THE PHILOSOPHY
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Ancient Wisdom,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c8f60] to-[#7dcea0]">
                Modern Solutions
              </span>
            </h2>
            <p className="text-xl text-[#8ab89a] max-w-3xl mx-auto leading-relaxed">
              For millennia, Indian warriors trained with methods that built not just bodies, 
              but unbreakable spirits. We bring these sacred practices into the modern age, 
              scientifically proven yet spiritually grounded.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "GADA (गदा)",
                subtitle: "The Sacred Mace",
                description: "The weapon of Hanuman. Build rotational power, grip strength, and shoulder stability through this 5000-year-old training tool.",
              },
              {
                icon: Sword,
                title: "KALARI (കളരി)",
                subtitle: "Mother of Martial Arts",
                description: "The oldest fighting system in existence. Develop combat awareness, fluid movement, and explosive power.",
              },
              {
                icon: Wind,
                title: "PRANAYAMA (प्राणायाम)",
                subtitle: "The Breath of Life",
                description: "Master your vital energy. Ancient breathing techniques for stress reduction, focus, and physical performance.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 rounded-2xl bg-gradient-to-b from-[#0d1f14] to-[#071210] border border-[#4c8f60]/20 hover:border-[#7dcea0]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,143,96,0.15)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4c8f60] to-[#2d5a3a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-[#7dcea0] text-sm font-medium mb-4">{item.subtitle}</p>
                <p className="text-[#8ab89a] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHAT YOU GET SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="offerings" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[#030806]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4c8f60]/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7dcea0] text-sm font-bold tracking-[0.3em] mb-4 block font-subheading">
              TRAINING PILLARS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              What You&apos;ll{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c8f60] to-[#7dcea0]">
                Master
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#4c8f60]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl bg-[#0a1510] border border-[#4c8f60]/20 group-hover:border-[#7dcea0]/40 transition-all h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offering.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <offering.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black tracking-wider mb-1">{offering.title}</h3>
                  <p className="text-[#7dcea0] text-sm font-medium mb-4">{offering.subtitle}</p>
                  <p className="text-[#8ab89a] text-sm leading-relaxed">{offering.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOUNDER SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="founder" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030806] via-[#0d1912] to-[#030806]" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(76,143,96,0.1)_0%,transparent_50%)] translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#7dcea0] text-sm font-bold tracking-[0.3em] mb-4 block font-subheading">
                YOUR GUIDE
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Meet{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c8f60] to-[#7dcea0]">
                  Awai Veera
                </span>
              </h2>
              <p className="text-xl text-[#8ab89a] leading-relaxed mb-6">
                A practitioner of ancient Indian martial arts and fitness traditions, 
                Awai brings decades of training in Gada, Kalari, and Pranayama to Singapore.
              </p>
              <p className="text-[#8ab89a] leading-relaxed mb-8">
                Trained in the akharas of India and the kalari of Kerala, he bridges 
                ancient wisdom with modern sports science. His mission: to awaken the 
                warrior within every student.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#7dcea0]">15+</div>
                  <div className="text-sm text-[#8ab89a]">Years Training</div>
                </div>
                <div className="w-px h-12 bg-[#4c8f60]/30" />
                <div className="text-center">
                  <div className="text-3xl font-black text-[#7dcea0]">500+</div>
                  <div className="text-sm text-[#8ab89a]">Students Trained</div>
                </div>
                <div className="w-px h-12 bg-[#4c8f60]/30" />
                <div className="text-center">
                  <div className="text-3xl font-black text-[#7dcea0]">3</div>
                  <div className="text-sm text-[#8ab89a]">Disciplines</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#4c8f60]/20 to-[#7dcea0]/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#4c8f60]/30">
                <Image
                  src="/images/G1.jpeg"
                  alt="Awai Veera"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030806] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030806]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4c8f60]/30 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7dcea0] text-sm font-bold tracking-[0.3em] mb-4 block font-subheading">
              WARRIOR VOICES
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c8f60] to-[#7dcea0]">
                Warriors Say
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#0a1510] border border-[#4c8f60]/20"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#7dcea0] text-[#7dcea0]" />
                  ))}
                </div>
                <p className="text-[#9dcfae] leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-[#7dcea0]">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1912] to-[#030806]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(76,143,96,0.2)_0%,transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#4c8f60]/50 bg-[#4c8f60]/10 mb-8">
              <Calendar className="w-4 h-4 text-[#7dcea0]" />
              <span className="text-[#7dcea0] text-sm font-semibold tracking-wider">
                LAUNCHING MARCH 2026
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c8f60] to-[#7dcea0]">
                Rise?
              </span>
            </h2>
            <p className="text-xl text-[#8ab89a] max-w-2xl mx-auto mb-10">
              Join our exclusive early access list. Be among the first warriors 
              to train with us and receive <span className="text-white font-bold">25% off</span> your first program.
            </p>

            <Link
              href="/early-bird"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#3d7a4f] via-[#4c8f60] to-[#3d7a4f] rounded-full text-xl font-bold tracking-wider shadow-[0_0_50px_rgba(76,143,96,0.4)] hover:shadow-[0_0_80px_rgba(125,206,160,0.5)] transition-all group"
            >
              CLAIM YOUR SPOT
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="mt-6 text-[#5a8a6a] text-sm">
              Free assessment included • Limited spots available
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-12 border-t border-[#4c8f60]/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center relative">
              {/* Neon Blue Glow for Footer Logo */}
              <div 
                className="absolute rounded-full"
                style={{ 
                  width: "100px", 
                  height: "100px", 
                  left: "50%", 
                  top: "50%", 
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 25px 8px rgba(0, 191, 255, 0.4), 0 0 50px 15px rgba(0, 191, 255, 0.2)",
                  background: "radial-gradient(circle, rgba(0, 191, 255, 0.1) 0%, transparent 70%)"
                }}
              />
              <div className="relative w-32 h-32">
                <Image
                  src="/images/nfl.png"
                  alt="NavaFit"
                  fill
                  className="object-contain"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(0, 191, 255, 0.8)) drop-shadow(0 0 15px rgba(0, 191, 255, 0.5))"
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <a
                href="https://instagram.com/awai.veera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/tinesh.awaiveera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@awai.veera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>

            <a
              href="mailto:awaiveera@navafit.sg"
              className="text-[#7dcea0] hover:text-white transition-colors"
            >
              awaiveera@navafit.sg
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-[#4c8f60]/10 text-center text-[#3d6b4a] text-sm">
            © {new Date().getFullYear()} NAVAFIT. All rights reserved. | Singapore
          </div>
        </div>
      </footer>
    </main>
  );
}
