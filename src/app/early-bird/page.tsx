"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function EarlyBirdPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/early-bird", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          question: formData.question,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback to mailto if server-side email fails for any reason
        window.location.href = `mailto:awaiveera@navafit.sg?subject=${encodeURIComponent(
          `NavaFit Rise-At-Dawn Lead: ${formData.name}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nQuestion: ${formData.question}`
        )}`;
        setIsSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:awaiveera@navafit.sg?subject=${encodeURIComponent(
        `NavaFit Rise-At-Dawn Lead: ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nQuestion: ${formData.question}`
      )}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const trainingTiles = [
    { title: "गदा", subtitle: "GADA", image: "/images/G1.jpeg" },
    { title: "कलारी", subtitle: "KALARI", image: "/images/K1.jpeg" },
    { title: "प्राण", subtitle: "BREATH", image: "/images/G2.jpeg" },
    { title: "आहार", subtitle: "NUTRITION", image: "/images/nutri.png" },
  ];

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter",
      tagline: "Busy professionals • consistency first",
      sessions: "4 sessions / month",
      highlight: false,
      includes: [
        "FREE 1:1 assessment (movement + goals)",
        "Online materials (at‑home training until AI Coach launches)",
        "Program guidance for recovery + mobility",
        "Earlybird spots limited",
      ],
    },
    {
      id: "warrior",
      name: "Warrior Build",
      tagline: "Most popular • strength + mobility",
      sessions: "6 sessions / month",
      highlight: true,
      includes: [
        "FREE 1:1 assessment (movement + goals)",
        "Online materials (at‑home training until AI Coach launches)",
        "Priority booking windows (limited)",
        "Earlybird spots limited",
      ],
    },
    {
      id: "elite",
      name: "Elite Transformation",
      tagline: "Best value • fastest progress",
      sessions: "8 sessions / month",
      highlight: false,
      includes: [
        "FREE 1:1 assessment (movement + goals)",
        "Online materials (at‑home training until AI Coach launches)",
        "Higher touch programming support",
        "Earlybird spots limited",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />

        {/* Background watermark: nfil.png (glowing, 35% opacity) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] select-none">
          <Image
            src="/images/nfil.png"
            alt="NavaFit Background"
            fill
            className="object-contain opacity-35"
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(0, 191, 255, 0.45)) drop-shadow(0 0 48px rgba(0, 191, 255, 0.18))",
            }}
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* ════════════════════════════════════════════════════════
            LOGO
        ════════════════════════════════════════════════════════ */}
        <div className="w-full flex justify-center pt-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ 
                filter: [
                  "drop-shadow(0 0 30px rgba(76,143,96,0.4))",
                  "drop-shadow(0 0 60px rgba(76,143,96,0.6))",
                  "drop-shadow(0 0 30px rgba(76,143,96,0.4))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Image
                src="/images/nfl.png"
                alt="NavaFit"
                width={500}
                height={150}
                className="h-24 md:h-32 w-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
            HEADLINE
        ════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center text-center px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="inline-block px-10 py-4 rounded-full border-2 border-[#4c8f60]/50 bg-[#4c8f60]/10">
              <span className="text-[#7dcea0] font-bold text-xl tracking-[0.3em]">
                ✦ RISE AT DAWN ✦
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <span 
              className="block text-6xl md:text-8xl lg:text-9xl font-black text-white"
              style={{ textShadow: '0 0 80px rgba(76,143,96,0.3)' }}
            >
              EARLY ACCESS
            </span>
            <span 
              className="block text-5xl md:text-7xl lg:text-8xl font-black mt-4"
              style={{ 
                background: 'linear-gradient(135deg, #4c8f60 0%, #7dcea0 50%, #4c8f60 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(125,206,160,0.5))'
              }}
            >
              25% OFF
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-[#9dcfae] max-w-4xl leading-relaxed font-medium"
          >
            Join the exclusive <span className="text-white font-bold">Rise of Dawn</span> warriors list.
            <br />
            <span className="text-[#7dcea0]">Free Assessment</span> • <span className="text-[#7dcea0]">March 2026</span> • <span className="text-[#7dcea0]">Limited Spots</span>
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════════════════
            FEATURE TILES - CENTERED
        ════════════════════════════════════════════════════════ */}
        <div className="w-full flex justify-center px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-6xl"
          >
            {trainingTiles.map((tile, index) => (
              <motion.div
                key={tile.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[#4c8f60]/30 group-hover:border-[#7dcea0]/60 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(76,143,96,0.3)]">
                  <Image
                    src={tile.image}
                    alt={tile.subtitle}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030806] via-[#030806]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div 
                      className="text-5xl text-[#7dcea0] mb-2"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(125,206,160,0.6))' }}
                    >
                      {tile.title}
                    </div>
                    <div className="text-white font-black text-lg tracking-[0.15em]">
                      {tile.subtitle}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
            FORM - CENTERED
        ════════════════════════════════════════════════════════ */}
        <div className="w-full flex justify-center px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-xl"
          >
            {/* ════════════════════════════════════════════════════════
                PRICING (3 TIERS)
            ════════════════════════════════════════════════════════ */}
            <div className="w-full flex flex-col items-center text-center px-0 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mb-6"
              >
                <span className="text-[#00bfff] text-sm font-bold tracking-[0.3em]">
                  EARLYBIRD TIERS
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black">
                  Choose your training rhythm
                </h2>
                <p className="mt-4 text-[#9dcfae] text-lg md:text-xl leading-relaxed">
                  Built for young professionals and older clients in Singapore — strength,
                  mobility, and confident movement.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {pricingTiers.map((tier, idx) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + idx * 0.08 }}
                    className={`relative rounded-3xl border ${
                      tier.highlight
                        ? "border-[#00bfff]/50 bg-[#061018]/80 shadow-[0_0_40px_rgba(0,191,255,0.15)]"
                        : "border-white/10 bg-white/[0.04]"
                    } p-8`}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00bfff] text-black text-xs font-black tracking-[0.2em]">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="text-left">
                      <div className="text-2xl font-black">{tier.name}</div>
                      <div className="mt-2 text-sm text-white/70">{tier.tagline}</div>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                        <div className="text-[#00bfff] text-xs font-bold tracking-[0.25em]">
                          TRAINING FREQUENCY
                        </div>
                        <div className="mt-1 text-lg font-black">{tier.sessions}</div>
                      </div>

                      <ul className="mt-6 space-y-3 text-sm text-white/80">
                        {tier.includes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#00bfff]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <a
                          href="#lead-form"
                          className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-4 text-sm font-black tracking-[0.2em] transition-all ${
                            tier.highlight
                              ? "bg-[#00bfff] text-black hover:shadow-[0_0_30px_rgba(0,191,255,0.35)]"
                              : "border border-white/15 bg-white/[0.03] hover:bg-white/[0.06]"
                          }`}
                        >
                          GET EARLYBIRD ACCESS
                        </a>
                        <p className="mt-3 text-xs text-white/50">
                          Exact pricing is shared after your free assessment — to match your
                          goals and schedule.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════
                FOUNDER
            ════════════════════════════════════════════════════════ */}
            <div className="w-full pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.92 }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 20%, rgba(0,191,255,0.12) 0%, transparent 55%)" }} />
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                    <Image
                      src="/images/G1.jpeg"
                      alt="Awai Veera — Founder, NavaFit"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  <div className="p-8 md:p-10 text-left">
                    <div className="text-[#00bfff] text-sm font-bold tracking-[0.3em]">
                      FOUNDER
                    </div>
                    <h3 className="mt-3 text-3xl md:text-4xl font-black">
                      Awai Veera
                    </h3>
                    <p className="mt-4 text-white/80 leading-relaxed">
                      NavaFit is built on a simple belief:{" "}
                      <span className="text-white font-bold">
                        discipline should feel empowering, not punishing.
                      </span>{" "}
                      This is Hindu warrior training — strength, breath, and mobility —
                      shaped for modern life in Singapore.
                    </p>
                    <p className="mt-4 text-white/70 leading-relaxed">
                      If you’re a young professional rebuilding consistency, or an older
                      client looking for confident, pain‑reduced movement, your plan will
                      be tailored — with a free assessment first.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href="#lead-form"
                        className="inline-flex items-center justify-center rounded-xl bg-[#00bfff] text-black px-6 py-4 text-sm font-black tracking-[0.2em] hover:shadow-[0_0_30px_rgba(0,191,255,0.35)] transition-all"
                      >
                        BOOK FREE ASSESSMENT
                      </a>
                      <a
                        href="#lead-form"
                        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-black tracking-[0.2em] hover:bg-white/[0.06] transition-all"
                      >
                        GET EARLYBIRD ACCESS
                      </a>
                    </div>

                    <p className="mt-4 text-xs text-white/50">
                      No hard sell. Just clarity: where you are now, and the fastest path
                      to progress.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {!isSubmitted ? (
              <div className="relative">
                <div className="absolute -inset-4 bg-[#4c8f60]/10 rounded-3xl blur-2xl" />
                <form
                  id="lead-form"
                  onSubmit={handleSubmit}
                  className="relative p-10 md:p-12 rounded-3xl bg-[#0a1a0f]/95 border-2 border-[#4c8f60]/30"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
                      JOIN THE WARRIORS
                    </h2>
                    <p className="text-[#7dcea0] text-xl">
                      Secure your spot now
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[#7dcea0] text-sm font-bold mb-3 tracking-[0.15em]">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-5 py-4 rounded-xl bg-[#061208] border-2 border-[#4c8f60]/40 text-white text-lg placeholder-[#3d6b4a] focus:outline-none focus:border-[#7dcea0] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#7dcea0] text-sm font-bold mb-3 tracking-[0.15em]">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 rounded-xl bg-[#061208] border-2 border-[#4c8f60]/40 text-white text-lg placeholder-[#3d6b4a] focus:outline-none focus:border-[#7dcea0] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#7dcea0] text-sm font-bold mb-3 tracking-[0.15em]">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+65 XXXX XXXX"
                        className="w-full px-5 py-4 rounded-xl bg-[#061208] border-2 border-[#4c8f60]/40 text-white text-lg placeholder-[#3d6b4a] focus:outline-none focus:border-[#7dcea0] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#7dcea0] text-sm font-bold mb-3 tracking-[0.15em]">
                        QUESTION
                      </label>
                      <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Any questions for us?"
                        rows={3}
                        className="w-full px-5 py-4 rounded-xl bg-[#061208] border-2 border-[#4c8f60]/40 text-white text-lg placeholder-[#3d6b4a] focus:outline-none focus:border-[#7dcea0] transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 mt-4 bg-gradient-to-r from-[#3d7a4f] via-[#4c8f60] to-[#3d7a4f] text-white font-black text-xl rounded-xl flex items-center justify-center gap-3 disabled:opacity-70 shadow-[0_0_30px_rgba(76,143,96,0.4)] hover:shadow-[0_0_50px_rgba(125,206,160,0.5)] transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          JOIN NOW
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-center text-[#3d6b4a] text-sm mt-6">
                    By signing up, you agree to receive updates from NavaFit.
                  </p>
                </form>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-4 bg-[#4c8f60]/10 rounded-3xl blur-2xl" />
                <div className="relative p-12 rounded-3xl bg-[#0a1a0f]/95 border-2 border-[#4c8f60]/30 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#4c8f60]/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-[#7dcea0]" />
                  </motion.div>
                  <h3 className="text-4xl font-black text-white mb-3">
                    YOU&apos;RE IN!
                  </h3>
                  <p className="text-[#9dcfae] text-xl mb-6">
                    Welcome to the warrior brotherhood.
                  </p>
                  <div className="text-6xl mb-4">🌅</div>
                  <p className="text-[#7dcea0] font-bold text-xl">
                    See you at Dawn!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
            FOOTER - CENTERED
        ════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center py-12 border-t border-[#4c8f60]/20">
          <div className="flex items-center gap-10 mb-6">
            <motion.a
              href="https://instagram.com/awai.veera"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://facebook.com/tinesh.awaiveera"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://tiktok.com/@awai.veera"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="text-[#4c8f60] hover:text-[#7dcea0] transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </motion.a>
          </div>
          <a 
            href="mailto:awaiveera@navafit.sg"
            className="text-[#7dcea0] text-lg font-medium hover:text-white transition-colors mb-4"
          >
            awaiveera@navafit.sg
          </a>
          <p className="text-[#3d6b4a] text-sm">
            © 2025 NAVAFIT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </main>
  );
}
