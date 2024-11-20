import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">UXDSrini</h3>
            <p className="text-gray-300">
              Creating exceptional digital experiences through user-centered design.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:uxdsrini@gmail.com">uxdsrini@gmail.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+91 - 9963092123</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/srinivasbiskula/" className="hover:text-secondary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://x.com/uxdsrini" className="hover:text-secondary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/creativeboysri/" className="hover:text-secondary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 UXDSrini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}