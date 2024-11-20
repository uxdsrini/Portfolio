import React from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

interface AboutProps {
  onBookAppointment: () => void;
}

export default function About({ onBookAppointment }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary">About Me</h2>
            <p className="text-lg text-gray-600">
              I'm a passionate UX designer with over 8 years of experience in creating 
              intuitive and engaging digital experiences. My approach combines user-centered 
              design principles with creative problem-solving to deliver exceptional results.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" 
              alt="UX Designer working"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Appointment Booking Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 transform translate-y-6">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-primary mb-4">Book a Consultation</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can create exceptional user experiences together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600">Choose a time that works best for you</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">60-Minute Session</h4>
              <p className="text-gray-600">In-depth discussion of your project needs</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Expert Consultation</h4>
              <p className="text-gray-600">Personalized UX design guidance</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onBookAppointment}
              className="inline-flex items-center bg-secondary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Schedule Your Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}