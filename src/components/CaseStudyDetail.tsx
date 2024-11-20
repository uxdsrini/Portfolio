import React from 'react';
import { ArrowLeft, Clock, Users, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CaseStudyDetailProps {
  id: string;
}

const caseStudyData = {
  'ecommerce-redesign': {
    title: 'E-commerce Redesign',
    client: 'Fashion Retailer',
    duration: '3 months',
    impact: '40% conversion increase',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    challenge: "The client's e-commerce platform had a high cart abandonment rate and poor mobile experience, leading to lost sales and customer frustration.",
    solution: "We conducted extensive user research and redesigned the entire shopping experience with a focus on mobile-first design, streamlined checkout process, and improved product discovery.",
    process: [
      'User Research & Analysis',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Usability Testing',
      'Visual Design',
      'Implementation Support'
    ],
    results: [
      '40% increase in conversion rate',
      '65% reduction in cart abandonment',
      '85% increase in mobile sales',
      '92% positive user feedback'
    ],
    images: [
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80'
    ]
  },
  'banking-app': {
    title: 'Banking App UI',
    client: 'FinTech Startup',
    duration: '4 months',
    impact: '85% user satisfaction',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    challenge: "The existing banking app was complex and difficult to navigate, resulting in poor user satisfaction and increased support calls.",
    solution: "We simplified the interface and implemented intuitive navigation patterns while maintaining robust security features.",
    process: [
      'User Research',
      'Security Analysis',
      'UI/UX Design',
      'Prototyping',
      'User Testing',
      'Implementation'
    ],
    results: [
      '85% user satisfaction score',
      '50% reduction in support calls',
      '90% task completion rate',
      '95% security compliance'
    ],
    images: [
      'https://images.unsplash.com/photo-1563986768494-4dee9056b3c7?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563986768517-527195c3c5fc?auto=format&fit=crop&q=80'
    ]
  },
  'healthcare-platform': {
    title: 'Healthcare Platform',
    client: 'Medical Services',
    duration: '6 months',
    impact: '92% task completion',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    challenge: "Healthcare providers needed a more efficient way to manage patient data and appointments while ensuring HIPAA compliance.",
    solution: "We developed a comprehensive platform that streamlines patient management while maintaining strict security and privacy standards.",
    process: [
      'Stakeholder Interviews',
      'Workflow Analysis',
      'HIPAA Compliance Review',
      'UX Design',
      'Security Testing',
      'Staff Training'
    ],
    results: [
      '92% task completion rate',
      '75% reduction in paperwork',
      '99.9% uptime',
      '100% HIPAA compliance'
    ],
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160291-258c4c2d2e76?auto=format&fit=crop&q=80'
    ]
  }
};

export default function CaseStudyDetail({ id }: CaseStudyDetailProps) {
  const study = caseStudyData[id as keyof typeof caseStudyData];
  
  const handleBack = () => {
    window.location.href = '/';
  };

  if (!study) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Case Study Not Found</h1>
          <button
            onClick={handleBack}
            className="text-secondary hover:text-primary transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center text-primary mb-8 hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <img 
            src={study.thumbnail}
            alt={study.title}
            className="w-full h-48 md:h-96 object-cover"
          />

          <div className="p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{study.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <Clock className="w-6 h-6 text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{study.duration}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-semibold">{study.client}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <Target className="w-6 h-6 text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Impact</p>
                    <p className="font-semibold">{study.impact}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 md:space-y-12">
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">The Challenge</h2>
                  <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">The Solution</h2>
                  <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Process</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {study.process.map((step, index) => (
                      <div 
                        key={index}
                        className="flex items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                        <span className="text-sm md:text-base">{step}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Results</h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {study.results.map((result, index) => (
                      <div 
                        key={index}
                        className="bg-secondary/10 p-4 rounded-lg text-center"
                      >
                        <p className="text-secondary font-semibold text-sm md:text-base">{result}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Project Gallery</h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {study.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="rounded-lg shadow-md w-full h-48 md:h-64 object-cover"
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}