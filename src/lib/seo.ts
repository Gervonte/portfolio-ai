import { Metadata } from 'next';

// SEO Configuration
export const seoConfig = {
  title: 'Gervonte Fowler - Full-Stack Software Engineer & AI Researcher',
  description:
    'Professional portfolio showcasing AI-assisted and traditional development work. Full-stack engineer specializing in React, Node.js, and AI/ML research with experience at fintech startups.',
  keywords: [
    'Gervonte Fowler',
    'Full-Stack Developer',
    'Software Engineer',
    'AI Researcher',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'Python',
    'Machine Learning',
    'LLM Evaluation',
    'Explainable AI',
    'Portfolio',
    'Web Development',
    'Fintech',
    'NovaCredit',
  ],
  author: 'Gervonte Fowler',
  url: 'https://portfolio-ai-xi.vercel.app',
  image: 'https://portfolio-ai-xi.vercel.app/og-image.png',
  twitterHandle: '@gervontefowler',
  linkedinHandle: 'gervonte-fowler',
  githubHandle: 'gervonte',
};

// Generate metadata for pages
export function generatePageMetadata(
  title?: string,
  description?: string,
  image?: string,
  path?: string
): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.title}` : seoConfig.title;
  const fullDescription = description || seoConfig.description;
  const fullImage = image || seoConfig.image;
  const fullUrl = path ? `${seoConfig.url}${path}` : seoConfig.url;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: seoConfig.title,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// Generate structured data for the portfolio
export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gervonte Fowler',
    jobTitle: 'Full-Stack Software Engineer & AI Researcher',
    description: seoConfig.description,
    url: seoConfig.url,
    image: seoConfig.image,
    sameAs: [
      `https://linkedin.com/in/${seoConfig.linkedinHandle}`,
      `https://github.com/${seoConfig.githubHandle}`,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lakeland',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Florida Polytechnic University',
    },
    knowsAbout: [
      'Full-Stack Development',
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'Machine Learning',
      'AI Research',
      'LLM Evaluation',
      'Explainable AI',
      'Web Development',
      'Software Engineering',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Florida Polytechnic University',
    },
  };
}
