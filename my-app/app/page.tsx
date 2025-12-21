'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Cloud, Target, Bug, ChevronRight, Lock, Eye, Zap, CheckCircle, ArrowRight, Menu, X, Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react";
import { apiFetch } from "@/src/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((data: { user: User }) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#0a0a0f] p-2 rounded-lg border border-cyan-500/30">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ApniSec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Features</a>
            <a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Services</a>
            <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">About</a>
            <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Contact</a>
          </div>

          {/* Auth Buttons */}
          {!loading && (
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="relative group px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-all group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/10 pt-4 space-y-4">
            <a href="#features" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Features</a>
            <a href="#services" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Services</a>
            <a href="#about" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">About</a>
            <a href="#contact" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Contact</a>
            <div className="flex gap-4 pt-4">
              <Link href="/login" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Login</Link>
              <Link href="/register" className="text-cyan-400 font-medium text-sm">Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Feature({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 bg-[#0f0f18]/80 border border-cyan-500/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 h-full">
        <div className="w-14 h-14 bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
        <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, features, linear }: { icon: any; title: string; features: string[]; linear: string }) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 ${linear} rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="relative p-8 bg-[#0f0f18]/90 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 h-full">
        <div className={`w-16 h-16 ${linear} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-400">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button className="mt-8 w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group-hover:border-white/20">
          Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative bg-[#050508] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 p-2 rounded-lg border border-cyan-500/30">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ApniSec
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering organizations with comprehensive cybersecurity solutions to protect their digital assets.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg flex items-center justify-center transition-all">
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Home</a></li>
              <li><a href="#features" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Features</a></li>
              <li><a href="#services" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Services</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Cloud Security</a></li>
              <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Red Team Assessment</a></li>
              <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">VAPT</a></li>
              <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Consulting</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-gray-500 text-sm">contact@apnisec.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-gray-500 text-sm">+91 123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-gray-500 text-sm">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 ApniSec. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-linear(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-linear(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Trusted by 500+ Organizations</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Secure Your</span>
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Infrastructure
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Track and manage Cloud Security, Red Team Assessments, and VAPT issues in one unified, intelligent platform designed for modern security teams.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group relative px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500" />
                <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="#services"
                className="px-8 py-4 text-lg font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Explore Services
              </a>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-500 text-sm mt-1">Clients Protected</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">10K+</div>
                <div className="text-gray-500 text-sm mt-1">Vulnerabilities Found</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">99.9%</div>
                <div className="text-gray-500 text-sm mt-1">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Why Choose ApniSec</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Security Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to identify, track, and resolve security risks effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={Lock}
              title="End-to-End Encryption"
              description="All your security data is encrypted at rest and in transit with military-grade encryption."
            />
            <Feature
              icon={Eye}
              title="Real-time Monitoring"
              description="24/7 monitoring of your infrastructure with instant alerts for any security anomalies."
            />
            <Feature
              icon={Target}
              title="Threat Intelligence"
              description="Stay ahead of threats with our AI-powered threat intelligence and analysis."
            />
            <Feature
              icon={Zap}
              title="Automated Scanning"
              description="Continuous automated vulnerability scanning to identify risks before attackers do."
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 px-6 bg-[#050508]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive Security Solutions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose from our range of specialized cybersecurity services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Cloud}
              title="Cloud Security"
              linear="bg-linear-to-br from-cyan-500 to-blue-600"
              features={[
                "Cloud configuration auditing",
                "Identity & access management",
                "Data protection & encryption",
                "Compliance monitoring"
              ]}
            />
            <ServiceCard
              icon={Target}
              title="Red Team Assessment"
              linear="bg-linear-to-br from-red-500 to-orange-600"
              features={[
                "Adversary simulation",
                "Social engineering tests",
                "Physical security testing",
                "Executive reporting"
              ]}
            />
            <ServiceCard
              icon={Bug}
              title="VAPT"
              linear="bg-linear-to-br from-emerald-500 to-teal-600"
              features={[
                "Web application testing",
                "Network penetration testing",
                "Mobile app security",
                "API security assessment"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 bg-linear-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-3xl">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-emerald-500/5 rounded-3xl" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Secure Your Future?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Join hundreds of organizations that trust ApniSec to protect their digital assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="group px-8 py-4 bg-linear-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}