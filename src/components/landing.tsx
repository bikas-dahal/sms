'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Book,
  Award,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Calendar,
  Trophy,
  Bell,
  UserCheck
} from 'lucide-react';
import { Button } from './ui/button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const JanakalyanSchool = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/api/placeholder/50/50" alt="School Logo" className="h-12 w-12 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Shree Janakalyan</h1>
                <p className="text-sm text-gray-600">Boarding School</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#academics" className="text-gray-700 hover:text-blue-600">Academics</a>
              <a href="#admissions" className="text-gray-700 hover:text-blue-600">Admissions</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-6"
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#academics" className="text-gray-700 hover:text-blue-600">Academics</a>
                <a href="#admissions" className="text-gray-700 hover:text-blue-600">Admissions</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Apply Now</Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20">
        <motion.div 
          className="relative h-[600px] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="container mx-auto px-6 h-full flex items-center relative">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <h1 className="text-5xl font-bold mb-6">Welcome to Shree Janakalyan Boarding School</h1>
              <p className="text-xl mb-8">Empowering minds, Building character, Shaping futures in Pokhara-23, Nepal</p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Admission Open 2024
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                  Virtual Tour
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Notice Banner */}
      <motion.div 
        className="bg-yellow-50 border-y border-yellow-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">Admissions open for Academic Year 2024-25</p>
          </div>
          <Button variant="outline" size="sm" className="text-yellow-800 border-yellow-600 hover:bg-yellow-100">
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Shree Janakalyan?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience excellence in education through our comprehensive approach to academic and personal development.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Trophy className="w-8 h-8 text-blue-600" />,
                title: "Academic Excellence",
                description: "Consistently high academic performance with outstanding board results"
              },
              {
                icon: <UserCheck className="w-8 h-8 text-blue-600" />,
                title: "Expert Faculty",
                description: "Experienced and dedicated teaching staff committed to student success"
              },
              {
                icon: <Book className="w-8 h-8 text-blue-600" />,
                title: "Modern Facilities",
                description: "Well-equipped labs, library, and smart classrooms"
              },
              {
                icon: <Award className="w-8 h-8 text-blue-600" />,
                title: "Holistic Development",
                description: "Focus on academics, sports, arts, and character building"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Academic Programs */}
      <motion.section 
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Academic Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive education from Early Childhood to Secondary level</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary Level",
                grades: "Grades 1-5",
                features: ["Foundation in core subjects", "Activity-based learning", "Personal development"]
              },
              {
                title: "Lower Secondary",
                grades: "Grades 6-8",
                features: ["Advanced core subjects", "Project-based learning", "Leadership development"]
              },
              {
                title: "Secondary Level",
                grades: "Grades 9-10",
                features: ["SEE preparation", "Career counseling", "Specialized training"]
              }
            ].map((program, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                    <p className="text-sm text-gray-600">{program.grades}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <ChevronRight className="w-4 h-4 text-blue-600 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements & Stats */}
      <motion.section 
        className="py-20 bg-blue-900 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="w-12 h-12" />, number: "1000+", label: "Students" },
              { icon: <GraduationCap className="w-12 h-12" />, number: "100%", label: "Pass Rate" },
              { icon: <Trophy className="w-12 h-12" />, number: "50+", label: "Awards" },
              { icon: <Calendar className="w-12 h-12" />, number: "25+", label: "Years of Excellence" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-6"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get in touch with us for admissions and inquiries</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Phone className="w-6 h-6 text-blue-600" />,
                title: "Call Us",
                info: "+977-61-XXXXXX",
                subInfo: "Mon-Fri, 8:00 AM - 4:00 PM"
              },
              {
                icon: <Mail className="w-6 h-6 text-blue-600" />,
                title: "Email Us",
                info: "info@janakalyan.edu.np",
                subInfo: "We'll respond within 24 hours"
              },
              {
                icon: <MapPin className="w-6 h-6 text-blue-600" />,
                title: "Visit Us",
                info: "Pokhara-23, Nepal",
                subInfo: "Near City Landmark"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-center mb-4">{contact.icon}</div>
                <h3 className="font-semibold mb-2">{contact.title}</h3>
                <p className="text-gray-800 mb-1">{contact.info}</p>
                <p className="text-sm text-gray-600">{contact.subInfo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Shree Janakalyan Boarding School has been providing quality education since its establishment, nurturing future leaders of Nepal.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Admissions</a></li>
                <li><a href="#" className="hover:text-white">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-white">News & Events</a></li>
                <li><a href="#" className="hover:text-white">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-6 h-6 mr-2" />
                  <span>+977-61-XXXXXX</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  <span>info@janakalyan.edu.np</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  <span>Pokhara-23, Nepal</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; 2023 Shree Janakalyan Boarding School. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};