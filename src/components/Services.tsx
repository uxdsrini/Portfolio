import React from 'react';
import { Palette, Layout, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'UX Design',
    description: 'Creating intuitive user experiences through research, wireframing, and prototyping.'
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Crafting visually appealing designs that communicate your brand message effectively.'
  },
  {
    icon: Lightbulb,
    title: 'Share Thoughts & Ideas',
    description: 'Collaborative sessions to brainstorm and develop innovative solutions for your projects.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}