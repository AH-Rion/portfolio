import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    text: "John delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise made our vision come to life perfectly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO, InnovateCo",
    text: "Working with John was a game-changer for our team. He brought innovative solutions and a collaborative spirit that elevated our entire project.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, DesignHub",
    text: "An incredibly talented developer with an eye for design. John consistently delivers high-quality work on time and communicates excellently throughout the process.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder, AppWorks",
    text: "John's full-stack capabilities and problem-solving skills are unmatched. He transformed our complex requirements into an elegant, user-friendly application.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              What <span className="gradient-text">Clients</span> Say
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="glass rounded-2xl p-8 md:p-12 glow-box relative overflow-hidden min-h-[280px] flex items-center">
              <Quote className="absolute top-6 left-6 text-primary/10" size={60} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center relative z-10 w-full"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star size={18} className="fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                    "{testimonials[current].text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold gradient-text">
                      {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{testimonials[current].name}</p>
                      <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="p-2 rounded-full glass text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="p-2 rounded-full glass text-muted-foreground hover:text-foreground"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
