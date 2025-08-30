import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Search, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/ui/scroll-to-top';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const faqCategories = [
    {
      id: 'general',
      title: 'General',
      color: 'bg-teal-500/10 border-teal-500/30',
      questions: [
        {
          id: 'what-does-trivesha-do',
          question: 'What does Trivesha do?',
          answer: 'We design, develop, and deploy web and app solutions with integrated DevOps since 2019. Our team specializes in creating custom digital experiences that help businesses grow online.'
        },
        {
          id: 'where-located',
          question: 'Where are you located?',
          answer: 'We\'re based in Khammam, India - but we work with clients worldwide. Distance is never a barrier to delivering exceptional digital solutions.'
        },
        {
          id: 'how-to-start',
          question: 'How do I start a project with you?',
          answer: 'Just hit "Get a Quote" on our site or email trivesha.tech@gmail.com with your idea. We\'ll schedule a free consultation to discuss your project requirements and provide a detailed proposal.'
        },
        {
          id: 'timeline',
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on complexity. A simple website takes 2-3 weeks, while complex applications can take 2-3 months. We provide detailed timelines during the proposal phase.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      color: 'bg-blue-500/10 border-blue-500/30',
      questions: [
        {
          id: 'services-offered',
          question: 'What services do you offer?',
          answer: 'UI/UX design, website development, app development, DevOps automation, cloud hosting, and ongoing maintenance. We\'re your one-stop shop for all digital needs.'
        },
        {
          id: 'custom-vs-template',
          question: 'Do you offer custom designs or templates?',
          answer: 'Always custom. No cookie-cutters - your project gets its own tailored look and feel that perfectly represents your brand and meets your specific requirements.'
        },
        {
          id: 'mobile-responsive',
          question: 'Are your websites mobile-responsive?',
          answer: 'Absolutely! Every website and application we build is fully responsive and optimized for mobile, tablet, and desktop devices. Mobile-first design is our standard approach.'
        },
        {
          id: 'cms-options',
          question: 'Do you build websites with content management systems?',
          answer: 'Yes, we can integrate popular CMS platforms like WordPress, or build custom content management solutions based on your specific needs and technical requirements.'
        }
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing',
      color: 'bg-green-500/10 border-green-500/30',
      questions: [
        {
          id: 'website-cost',
          question: 'How much will my website cost?',
          answer: 'Small business sites start around ₹30,000, while advanced custom builds depend on features and complexity. We provide transparent, detailed quotes with no hidden fees.'
        },
        {
          id: 'payment-terms',
          question: 'Do you require an upfront payment?',
          answer: 'Yes, we take 50% upfront and 50% upon completion. This helps us allocate resources effectively and ensures project commitment from both sides.'
        },
        {
          id: 'payment-methods',
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, UPI, credit/debit cards, and digital wallets. International clients can pay via PayPal or wire transfer.'
        },
        {
          id: 'refund-policy',
          question: 'Do you offer refunds?',
          answer: 'We offer partial refunds based on work completed if a project is cancelled early. Our terms are clearly outlined in the contract to ensure transparency.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical',
      color: 'bg-purple-500/10 border-purple-500/30',
      questions: [
        {
          id: 'code-ownership',
          question: 'Who owns the code after delivery?',
          answer: 'You do. 100% ownership after final payment. We provide complete source code, documentation, and transfer all intellectual property rights to you.'
        },
        {
          id: 'technologies',
          question: 'Which technologies do you use?',
          answer: 'Primarily React, TypeScript, Node.js, Python, and cloud services like AWS - but we pick the technology stack that best fits your project requirements and long-term goals.'
        },
        {
          id: 'security',
          question: 'How do you ensure website security?',
          answer: 'We implement SSL certificates, secure coding practices, regular updates, backup systems, and follow industry-standard security protocols to protect your data and users.'
        },
        {
          id: 'hosting',
          question: 'Do you provide hosting services?',
          answer: 'Yes, we offer reliable cloud hosting solutions with regular backups, monitoring, and maintenance. We can also help you choose and set up hosting with other providers.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Maintenance',
      color: 'bg-orange-500/10 border-orange-500/30',
      questions: [
        {
          id: 'post-launch-support',
          question: 'Do you provide post-launch support?',
          answer: 'Yes, we include 30 days of free support after launch. After that, we offer flexible maintenance plans tailored to your needs and budget.'
        },
        {
          id: 'bug-fixing',
          question: 'How fast do you fix bugs?',
          answer: 'Most bugs are fixed within 24–48 hours. Critical issues affecting site functionality are prioritized and addressed immediately.'
        },
        {
          id: 'maintenance-plans',
          question: 'What do your maintenance plans include?',
          answer: 'Regular updates, security patches, performance monitoring, backups, minor content changes, and technical support. Plans are customized based on your specific needs.'
        },
        {
          id: 'emergency-support',
          question: 'Do you offer emergency support?',
          answer: 'Yes, we provide 24/7 emergency support for critical issues. Our team is always ready to help when your business depends on it.'
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & Policies',
      color: 'bg-gray-500/10 border-gray-500/30',
      questions: [
        {
          id: 'privacy-terms',
          question: 'Where can I read your Privacy Policy and Terms of Service?',
          answer: 'They\'re available on our Privacy Policy and Terms of Service pages. These documents outline how we handle your data and our working relationship.'
        },
        {
          id: 'nda',
          question: 'Do you sign Non-Disclosure Agreements?',
          answer: 'Absolutely. We take client confidentiality seriously and are happy to sign NDAs before discussing your project details.'
        },
        {
          id: 'licensing',
          question: 'What about software licensing for third-party tools?',
          answer: 'We ensure all third-party tools and libraries we use have proper licensing. Any licensing costs are discussed upfront and included in the project quote.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const canonical = typeof window !== 'undefined' ? window.location.href : '/faq';

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Trivesha</title>
        <meta name="description" content="Got questions? We've got answers. Find answers to common questions about our web design, development, and DevOps services." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 relative overflow-hidden">
          {/* Background particles */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-32 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-40 left-40 w-4 h-4 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins'] bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text">
              Got Questions? We've Got Answers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-['Inter']">
              Whether it's about pricing, process, or support - here's everything you need to know.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-700/50 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl px-6">
            {filteredCategories.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No FAQs found matching your search.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}

            {filteredCategories.map((category) => (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50 ${category.color}`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                      >
                        <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors font-['Inter']">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          className={`text-teal-400 transition-transform duration-300 ${
                            openAccordion === faq.id ? 'rotate-180' : ''
                          }`} 
                          size={20} 
                        />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        openAccordion === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-5">
                          <p className="text-gray-300 leading-relaxed font-['Inter']">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 border-t border-gray-800 relative overflow-hidden">
          {/* Background particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-teal-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text mb-4 font-['Poppins']">
              Still got questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-['Inter']">
              We're here to help. Get in touch and let's discuss your project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/25"
              >
                <Mail size={20} />
                <span>Contact Us</span>
              </Link>
              
              <a
                href="https://wa.me/917330975148"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#25D366]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </>
  );
};

export default FAQ;
