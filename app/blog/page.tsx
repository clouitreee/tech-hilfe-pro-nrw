'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Card from '@/components/ui/Card';

// Sample blog posts (will be replaced with Supabase data later)
const blogPosts = [
  {
    id: 1,
    title: 'NIS2 einfach erklärt: Was Kleinstunternehmen in NRW jetzt wissen müssen',
    slug: 'nis2-einfach-erklaert',
    excerpt: 'Die neue EU-Richtlinie NIS2 betrifft auch viele Kleinunternehmen. Wir erklären, was Sie wissen müssen und wie Sie sich vorbereiten können.',
    category: 'NIS2-Info',
    date: '2025-10-05',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Sicher online bezahlen: Ein Ratgeber für Senioren',
    slug: 'sicher-online-bezahlen-senioren',
    excerpt: 'Online-Shopping ist bequem, aber wie bezahlt man sicher? Wir zeigen Ihnen Schritt für Schritt, worauf Sie achten müssen.',
    category: 'Senioren & Technik',
    date: '2025-10-03',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'Die 5 häufigsten PC-Probleme und wie Sie sie selbst lösen können',
    slug: 'pc-probleme-selbst-loesen',
    excerpt: 'Langsamer Computer? Programme stürzen ab? Wir zeigen Ihnen einfache Lösungen für die häufigsten PC-Probleme.',
    category: 'KMU-Tipps',
    date: '2025-10-01',
    readTime: '10 min',
  },
  {
    id: 4,
    title: 'Leitfaden: So beantragen Sie "Digital Jetzt"-Fördermittel in NRW',
    slug: 'digital-jetzt-foerdermittel-nrw',
    excerpt: 'Das Förderprogramm "Digital Jetzt" unterstützt Unternehmen bei der Digitalisierung. Wir führen Sie durch den Antragsprozess.',
    category: 'KMU-Tipps',
    date: '2025-09-28',
    readTime: '12 min',
  },
  {
    id: 5,
    title: 'Das perfekte Home-Office-Netzwerk: Eine Schritt-für-Schritt-Anleitung',
    slug: 'home-office-netzwerk-anleitung',
    excerpt: 'Arbeiten Sie von zu Hause? Wir zeigen Ihnen, wie Sie ein schnelles, sicheres und zuverlässiges Netzwerk einrichten.',
    category: 'Home-Office & Remote Work',
    date: '2025-09-25',
    readTime: '15 min',
  },
];

const categories = ['Alle', 'NIS2-Info', 'Senioren & Technik', 'KMU-Tipps', 'Home-Office & Remote Work', 'Sicherheit & Datenschutz'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredPosts = selectedCategory === 'Alle'
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-hero mb-6">Blog & Ratgeber</h1>
              <p className="text-body max-w-2xl mx-auto">
                Tipps, Anleitungen und Neuigkeiten rund um IT-Sicherheit, Digitalisierung und Technik-Hilfe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-secondary text-white shadow-glow'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-soft'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card key={post.id} delay={index * 0.1}>
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">📝</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="text-neutral-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-primary mb-3 hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500">
                        <span>{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-secondary font-medium hover:underline">
                          Weiterlesen →
                        </span>
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-neutral-600 text-lg">
                  Keine Artikel in dieser Kategorie gefunden.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
