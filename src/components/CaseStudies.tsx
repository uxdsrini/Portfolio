import React from 'react';
import { ArrowRight, Clock, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface CaseStudiesProps {
  onCaseStudyClick: (id: string) => void;
}

const caseStudies = [
  {
    id: 'ecommerce-redesign',
    title: 'E-commerce Redesign',
    client: 'Fashion Retailer',
    duration: '3 months',
    impact: '40% conversion increase',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    tags: ['UX Design', 'UI Design', 'Research']
  },
  {
    id: 'banking-app',
    title: 'Banking App UI',
    client: 'FinTech Startup',
    duration: '4 months',
    impact: '85% user satisfaction',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    tags: ['Mobile App', 'FinTech', 'UI Design']
  },
  {
    id: 'healthcare-platform',
    title: 'Healthcare Platform',
    client: 'Medical Services',
    duration: '6 months',
    impact: '92% task completion',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    tags: ['Healthcare', 'UX Research', 'Design System']
  }
];

export default function CaseStudies({ onCaseStudyClick }: CaseStudiesProps) {
  const handleCaseStudyClick = (id: string) => {
    window.history.pushState({}, '', `/case-study/${id}`);
    window.location.reload();
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Case Studies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore how we've helped businesses transform their digital presence through 
            user-centered design solutions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative group">
                <img 
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleCaseStudyClick(study.id)}
                    className="bg-white text-primary px-6 py-2 rounded-full flex items-center transform -translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">Client: {study.client}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    {study.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-secondary" />
                    {study.client}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1 text-secondary" />
                    {study.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}