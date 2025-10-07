import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';

// Get all blog post slugs for static generation
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace('.md', ''),
    }));
}

// Get blog post data
async function getBlogPost(slug: string) {
  const contentDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    content,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    category: data.category || 'Allgemein',
    readTime: data.readTime || '5 min',
    excerpt: data.excerpt || '',
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Artikel nicht gefunden | Tech Hilfe Pro',
      description: 'Der gesuchte Artikel konnte nicht gefunden werden.',
    };
  }

  return {
    title: `${post.title} | Tech Hilfe Pro Blog`,
    description: post.excerpt || `${post.title} - IT-Ratgeber von Tech Hilfe Pro aus Köln. Praktische Tipps und Anleitungen für Privatkunden und Kleinunternehmen in NRW.`,
    keywords: [
      post.category,
      'IT-Ratgeber',
      'Tech Hilfe Pro',
      'IT-Support Köln',
      'Computer-Tipps',
      'IT-Beratung NRW',
      'Digitalisierung',
    ],
    authors: [{ name: 'Tech Hilfe Pro Team' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Tech Hilfe Pro Team'],
      locale: 'de_DE',
      url: `https://techhilfepro.de/blog/${slug}`,
      siteName: 'Tech Hilfe Pro',
    },
    alternates: {
      canonical: `https://techhilfepro.de/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Convert markdown to HTML (simple approach)
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      // Headers
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-display font-semibold text-primary mt-8 mb-4">${line.replace('### ', '')}</h3>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-display font-semibold text-primary mt-10 mb-4">${line.replace('## ', '')}</h2>`;
      }
      if (line.startsWith('# ')) {
        return ''; // Skip main title as it's rendered separately
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-2">${line.replace('- ', '')}</li>`;
      }
      
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>');
      
      // Links
      line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-secondary hover:underline">$1</a>');
      
      // Checkmarks and crosses
      line = line.replace(/✅/g, '<span class="text-secondary">✅</span>');
      line = line.replace(/❌/g, '<span class="text-red-500">❌</span>');
      
      // Paragraphs
      if (line.trim() && !line.startsWith('<')) {
        return `<p class="mb-4 leading-relaxed">${line}</p>`;
      }
      
      return line;
    })
    .join('\n');

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Article Header */}
        <section className="section bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                  {post.category}
                </span>
                <span className="text-neutral-500">{post.readTime}</span>
                <span className="text-neutral-500">
                  {new Date(post.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h1 className="heading-hero mb-6">{post.title}</h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section">
          <div className="container-custom">
            <article className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Share & Navigation */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <Button href="/blog" variant="outline">
                    ← Zurück zur Übersicht
                  </Button>
                  <Button href="/kontakt" variant="primary">
                    Haben Sie Fragen? Kontakt aufnehmen
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Related Articles */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-2 mb-8">Weitere Artikel</h2>
              <p className="text-body mb-8">
                Entdecken Sie mehr hilfreiche Tipps und Anleitungen in unserem Blog.
              </p>
              <Button href="/blog" variant="secondary">
                Alle Artikel ansehen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
