import React from 'react';
import { motion } from 'framer-motion';

interface Card3DContent {
  title: string;
  description: string;
  features?: Array<{
    icon?: React.ReactNode;
    label: string;
    value?: string | number;
  }>;
  badge?: string;
  imageUrl?: string;
  backgroundTexts?: string[];
  backgroundImage?: string;
}

interface Card3DWithContentProps {
  content: Card3DContent;
  className?: string;
  direction?: 'left' | 'right';
}

export default function Card3DWithContent({ 
  content, 
  className = '',
  direction = 'left'
}: Card3DWithContentProps) {
  const {
    title,
    description,
    features = [],
    badge,
    imageUrl,
    backgroundTexts = [],
    backgroundImage
  } = content;

  const contentSection = (
    <motion.div 
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center space-y-6"
    >
      {badge && (
        <div className="inline-flex w-fit">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">
            {badge}
          </p>
        </div>
      )}
      
      <div>
        <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h3>
        <p className="text-lg text-white/60 leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {features.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#0f172a]/5 border border-white/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all"
            >
              {feature.icon && (
                <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 flex-center text-blue-400">
                  {feature.icon}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  {feature.label}
                </p>
                {feature.value && (
                  <p className="text-xs text-blue-300 font-bold mt-1">
                    {feature.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const cardSection = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="relative h-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 perspective"
    >
      {imageUrl ? (
        <>
          <img 
            src={imageUrl} 
            alt="Dashboard"
            className="w-full h-auto object-cover rounded-2xl"
          />
          {/* Subtle glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none rounded-2xl" />
        </>
      ) : (
        // Fallback dashboard mockup
        <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500/30 border border-blue-400/50" />
                <span className="text-sm font-semibold text-white">Elevara</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0f172a]/20" />
                <div className="w-2 h-2 rounded-full bg-[#0f172a]/20" />
              </div>
            </div>

            {/* Main content */}
            <div>
              <p className="text-sm text-white/60 mb-2">Good Evening,</p>
              <h3 className="text-2xl font-bold text-white mb-4">Let's Grow Your Career</h3>
              <div className="flex gap-2 bg-[#0f172a]/5 rounded-lg p-3 border border-white/10">
                <input 
                  type="text" 
                  placeholder="Search jobs, skills, or learning resources..." 
                  className="bg-transparent text-white text-sm placeholder-white/40 outline-none flex-1"
                />
                <button className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">→</button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-[#0f172a]/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Applications</div>
                <div className="text-xl font-bold text-white">85%</div>
              </div>
              <div className="bg-[#0f172a]/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Interviews</div>
                <div className="text-xl font-bold text-white">24</div>
              </div>
              <div className="bg-[#0f172a]/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Learning</div>
                <div className="text-xl font-bold text-white">12</div>
              </div>
              <div className="bg-[#0f172a]/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Offers</div>
                <div className="text-xl font-bold text-white">3</div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <p className="text-xs text-white/60 mb-3">Recommended for You</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#0f172a]/5 rounded p-2 border border-white/10 text-center">
                  <p className="text-xs text-white/80">Frontend Developer</p>
                  <p className="text-xs text-blue-400 font-semibold mt-1">89% Match</p>
                </div>
                <div className="bg-[#0f172a]/5 rounded p-2 border border-white/10 text-center">
                  <p className="text-xs text-white/80">Software Engineer</p>
                  <p className="text-xs text-blue-400 font-semibold mt-1">92% Match</p>
                </div>
                <div className="bg-[#0f172a]/5 rounded p-2 border border-white/10 text-center">
                  <p className="text-xs text-white/80">Full Stack Dev</p>
                  <p className="text-xs text-blue-400 font-semibold mt-1">89% Match</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={`w-full relative ${className}`}>
      {/* Full background with gradient - no rounded corners */}
      <div 
        className="absolute inset-0 -z-20"
        style={{
          background: backgroundImage || 'linear-gradient(135deg, #0f172a 0%, #1a2a4a 50%, #132850 100%)'
        }}
      />

      {/* Fade to black on edges */}
      <div className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      {/* Background watermark text */}
      {backgroundTexts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="relative w-full h-full">
            {backgroundTexts.map((text, idx) => (
              <div
                key={idx}
                className="absolute text-white/5 font-bold text-6xl lg:text-8xl whitespace-nowrap"
                style={{
                  top: `${15 + idx * 25}%`,
                  right: `${-10 + idx * 5}%`,
                  transform: 'rotate(-15deg)'
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 py-12 px-8">
        {direction === 'left' ? (
          <>
            {contentSection}
            {cardSection}
          </>
        ) : (
          <>
            {cardSection}
            {contentSection}
          </>
        )}
      </div>
    </div>
  );
}




