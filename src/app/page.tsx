"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fafafa] text-[#1e293b]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-white/85 backdrop-blur-md border-b border-black/[0.06]">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#0d9488]">
          PulsePoint<span className="text-[#1e293b]"> Heart</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">About</a>
          <a href="#services" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">Services</a>
          <a href="#why-us" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">Why Us</a>
          <a href="#contact" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">Contact</a>
        </div>
        <a href="#contact" className="px-5 py-2 rounded-full text-sm font-semibold btn-primary">
          Book Appointment
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 pt-24 pb-12 max-w-7xl mx-auto gap-12">
        <div className="flex-1 max-w-xl">
          <p className="text-[#0d9488] text-sm font-semibold tracking-widest uppercase mb-4 animate-slide-up">
            BOARD-CERTIFIED CARDIOLOGIST
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Heart care that puts{" "}
            <span className="text-[#0d9488]">you first.</span>
          </h1>
          <p
            className="text-lg text-[#64748b] leading-relaxed mb-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Comprehensive cardiology services from prevention to advanced treatment.
            Personalized care plans. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a href="#contact" className="btn-primary px-8 py-4 rounded-full font-bold text-base inline-flex items-center gap-2">
              Schedule Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a href="#services" className="px-8 py-4 rounded-full border border-[#0d9488]/30 text-[#0d9488] font-semibold text-base hover:bg-[#0d9488]/5 transition-colors">
              Our Services
            </a>
          </div>
          <div className="mt-10 flex gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl font-extrabold text-[#0d9488]">15+</p>
              <p className="text-xs text-[#64748b] uppercase tracking-wider font-semibold mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#0d9488]">3,000+</p>
              <p className="text-xs text-[#64748b] uppercase tracking-wider font-semibold mt-1">Patients Treated</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#0d9488]">4.9★</p>
              <p className="text-xs text-[#64748b] uppercase tracking-wider font-semibold mt-1">Patient Rating</p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="card p-4">
            <Image
              src="/images/doctor-hero.jpg"
              alt="Dr. [Name] - Cardiologist"
              width={500}
              height={600}
              className="rounded-xl w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Doctor */}
      <section id="about" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="card p-8">
              <Image
                src="/images/doctor-portrait.jpg"
                alt="Dr. [Name] - Board Certified Cardiologist"
                width={500}
                height={500}
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>
          <div className="reveal">
            <p className="text-[#0d9488] text-sm font-semibold tracking-widest uppercase mb-3">ABOUT THE DOCTOR</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Dr. [Name], MD, FACC</h2>
            <p className="text-[#64748b] leading-relaxed mb-4">
              Board-certified in cardiovascular disease with over 15 years of clinical experience.
              Trained at Johns Hopkins and completed fellowship at Cleveland Clinic.
            </p>
            <p className="text-[#64748b] leading-relaxed mb-6">
              Specializing in preventive cardiology, heart failure management, and interventional
              procedures. Committed to providing patient-centered care with the latest evidence-based treatments.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Board Certified", value: "Cardiovascular Disease" },
                { label: "Education", value: "Johns Hopkins School of Medicine" },
                { label: "Fellowship", value: "Cleveland Clinic" },
                { label: "Hospital Affiliation", value: "[Hospital Name]" },
              ].map((cred, i) => (
                <div key={i} className="card p-4">
                  <p className="text-xs text-[#64748b] uppercase tracking-wider mb-1">{cred.label}</p>
                  <p className="text-sm font-semibold text-[#1e293b]">{cred.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-[#0d9488] text-sm font-semibold tracking-widest uppercase mb-3">SERVICES</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Comprehensive Heart Care</h2>
          <p className="text-[#64748b] mt-4 max-w-2xl mx-auto">From preventive screenings to advanced interventions, we offer full-spectrum cardiovascular care.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: "🫀", title: "Preventive Cardiology", desc: "Risk assessment, lifestyle counseling, cholesterol management, and heart disease prevention programs." },
            { icon: "📊", title: "Diagnostic Testing", desc: "ECG, echocardiogram, stress testing, Holter monitoring, and cardiac CT imaging." },
            { icon: "💊", title: "Heart Failure Management", desc: "Comprehensive care for congestive heart failure including medication optimization and device therapy." },
            { icon: "⚡", title: "Arrhythmia Treatment", desc: "Diagnosis and management of atrial fibrillation, palpitations, and other rhythm disorders." },
            { icon: "🩺", title: "Hypertension Care", desc: "Expert blood pressure management with personalized treatment plans and remote monitoring." },
            { icon: "🔧", title: "Interventional Procedures", desc: "Cardiac catheterization, angioplasty, stent placement, and structural heart interventions." },
          ].map((s, i) => (
            <div
              key={i}
              className="card p-7 reveal group"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#0d9488] transition-colors">{s.title}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-[#0d9488] text-sm font-semibold tracking-widest uppercase mb-3">WHY CHOOSE US</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Trust Your Heart to the Best</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "⏱️", title: "Same-Week Appointments", desc: "No long waits. Get seen quickly when you need care." },
            { icon: "🏥", title: "Hospital Affiliated", desc: "Direct admission privileges for seamless inpatient care." },
            { icon: "📱", title: "Telehealth Available", desc: "Virtual consultations for follow-ups and urgent questions." },
            { icon: "🔒", title: "Insurance Accepted", desc: "Most major insurance plans including Medicare and Medicaid." },
          ].map((item, i) => (
            <div
              key={i}
              className="card p-6 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-base mb-2">{item.title}</h4>
              <p className="text-[#64748b] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="card rounded-3xl p-8 md:p-16 text-center reveal" style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)' }}>
          <p className="text-[#0d9488] text-sm font-semibold tracking-widest uppercase mb-4">TAKE THE FIRST STEP</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your heart deserves expert care.</h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto mb-8">
            Schedule your consultation today. Same-week appointments available for new patients.
            Most insurance accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="tel:+1234567890" className="btn-primary px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 justify-center">
              Call (123) 456-7890
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a href="mailto:info@pulsepointheart.com" className="px-8 py-4 rounded-full border border-[#0d9488]/30 text-[#0d9488] font-semibold hover:bg-[#0d9488]/5 transition-colors">
              Email Us
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="card p-4">
              <p className="text-xs text-[#64748b] uppercase mb-1">Location</p>
              <p className="text-sm font-semibold">123 Medical Center Dr</p>
              <p className="text-sm text-[#64748b]">Suite 400, City, ST 12345</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-[#64748b] uppercase mb-1">Hours</p>
              <p className="text-sm font-semibold">Mon – Fri: 8am – 5pm</p>
              <p className="text-sm text-[#64748b]">Sat: 9am – 12pm</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-[#64748b] uppercase mb-1">Emergency</p>
              <p className="text-sm font-semibold text-[#dc2626]">Call 911</p>
              <p className="text-sm text-[#64748b]">For life-threatening emergencies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/[0.06] px-6 py-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#0d9488]">
            PulsePoint<span className="text-[#1e293b]"> Heart</span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">About</a>
            <a href="#services" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">Services</a>
            <a href="#contact" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">Contact</a>
            <a href="mailto:info@pulsepointheart.com" className="text-sm text-[#64748b] hover:text-[#0d9488] transition-colors">info@pulsepointheart.com</a>
          </div>
          <p className="text-xs text-[#94a3b8]">© 2026 PulsePoint Heart. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
