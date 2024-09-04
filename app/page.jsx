import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Link, CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimonialsCarousel from "@/components/testimonials";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: Link,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
  },
  {
    name: "David Lee",
    role: "Freelance Designer",
    content:
      "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="lg:w-1/2">
            <h1 className="text-7xl font-extrabold pb-6 bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text tracking-tighter text-transparent">
              Simplify Your Scheduling
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Schedulrr helps you manage your time effectively. Create events,
              set your availability, and let others book time with you
              seamlessly.
            </p>
            <Button size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/poster.png"
                alt="Scheduling illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-center text-blue-600">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            What Our Users Say
          </h2>
          <TestimonialsCarousel />
        </div>

        {/* How It Works Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your Scheduling?
          </h2>
          <p className="text-xl mb-6">
            Join thousands of professionals who trust Schedulrr for efficient
            time management.
          </p>
          <Button size="lg" variant="secondary" className="text-blue-600">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      <footer className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Schedulrr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
