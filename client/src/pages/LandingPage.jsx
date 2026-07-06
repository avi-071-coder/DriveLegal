import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const CinematicText = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-2 leading-none">
          <span className="split-word inline-block origin-bottom-left" style={{ transformStyle: 'preserve-3d', opacity: 0, transform: 'translateY(120%) rotateX(-90deg)' }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to({ val: 0 }, {
        val: 100,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].val));
        },
        onComplete: () => {
          gsap.to(".preloader-wrapper", {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete
          });
        }
      });
    });
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader-wrapper fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none">
      <div className="text-white text-[6rem] md:text-[15rem] font-bold font-mono tracking-tighter mix-blend-difference overflow-hidden h-[1em] relative">
         <motion.div initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
           {progress.toString().padStart(3, '0')}
         </motion.div>
      </div>
      <div className="absolute bottom-10 text-[#52525B] uppercase tracking-[0.2em] text-xs font-bold">
        Initializing Intelligence
      </div>
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 3, background: "#FFFFFF", mixBlendMode: "difference", duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, background: "#10B981", mixBlendMode: "normal", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) onMouseEnter();
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) onMouseLeave();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 bg-[#10B981] rounded-full pointer-events-none z-[10000]"
    />
  );
}

function FloatingPlates() {
  const group = useRef();
  
  useFrame((state) => {
    const scrollY = window.scrollY;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollY * 0.002, 0.1);
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-4, 2, -5]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[3, 4, 0.05]} />
          <meshPhysicalMaterial color="#10B981" metalness={0.9} roughness={0.1} transmission={0.9} thickness={0.5} clearcoat={1} envMapIntensity={2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[5, -1, -8]} rotation={[-0.2, -0.5, 0.2]}>
          <boxGeometry args={[4, 6, 0.05]} />
          <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.1} transmission={0.6} clearcoat={1} envMapIntensity={1.5} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[1, -4, -3]} rotation={[0.1, 0.2, 0.5]}>
          <boxGeometry args={[6, 2, 0.05]} />
          <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} envMapIntensity={3} />
        </mesh>
      </Float>
      <Environment preset="city" />
    </group>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let ctx = gsap.context(() => {
        
        gsap.utils.toArray('.cinematic-chapter').forEach((chapter, i) => {
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: "top top",
              end: "+=100%", 
              scrub: 1, 
            }
          });

          // A. Split Text Entry Animation
          const words = chapter.querySelectorAll('.split-word');
          if (words.length > 0) {
            gsap.fromTo(words, 
              { y: 100, opacity: 0, rotationX: -90 },
              {
                y: 0, opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.08, ease: "expo.out",
                scrollTrigger: { trigger: chapter, start: "top 60%", toggleActions: "play none none none" }
              }
            );
          }

          // Description Fades
          const desc = chapter.querySelectorAll('.cinematic-desc');
          if (desc.length > 0) {
            gsap.fromTo(desc, 
              { y: 50, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out",
                scrollTrigger: { trigger: chapter, start: "top 60%", toggleActions: "play none none none" }
              }
            );
          }

          // B. Wipe Mask for chapter entering
          if (i > 0) {
            gsap.fromTo(chapter,
              { clipPath: "circle(0% at 50% 100%)" },
              {
                clipPath: "circle(150% at 50% 50%)",
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top bottom",
                  end: "top top",
                  scrub: 1,
                }
              }
            );
          }

          // C. THE EXTREME EXIT SCATTER
          const contentBlock = chapter.querySelector('.content-block');
          const bg = chapter.querySelector('.chapter-bg');
          const effectType = i % 4;
          
          if (contentBlock) {
            const elements = gsap.utils.toArray(contentBlock.children);
            let textVars = { opacity: 0, ease: "power2.inOut", duration: 1 };
            
            if (effectType === 0) { textVars.x = -600; textVars.y = -200; textVars.rotationZ = -30; textVars.scale = 0.5; }
            else if (effectType === 1) { textVars.x = 600; textVars.y = -200; textVars.rotationZ = 30; textVars.scale = 0.5; }
            else if (effectType === 2) { textVars.scale = 0; textVars.rotationZ = 90; textVars.y = 100; gsap.set(elements, { transformOrigin: "center center" }); }
            else { textVars.scale = 2.5; textVars.y = (index) => (index % 2 === 0 ? -300 : 300); textVars.filter = "blur(20px)"; }
            
            tl.to(elements, textVars, 0);
          }

          if (bg) {
            let bgVars = { opacity: 0, ease: "power2.inOut", duration: 1 };
            
            if (effectType === 0) { bgVars.x = "-100vw"; bgVars.y = "-50vh"; bgVars.rotationZ = -25; bgVars.scale = 0.3; }
            else if (effectType === 1) { bgVars.x = "100vw"; bgVars.y = "-50vh"; bgVars.rotationZ = 25; bgVars.scale = 0.3; }
            else if (effectType === 2) { bgVars.y = "50vh"; bgVars.scale = 0.05; bgVars.rotationX = 45; }
            else { bgVars.y = "-100vh"; bgVars.scale = 1.5; bgVars.rotationZ = -10; }
            
            tl.to(bg, bgVars, 0);
          }
        });

        // Special Transition
        const confusionElements = document.querySelectorAll('.confusion-float');
        if (confusionElements.length > 0) {
          gsap.to(confusionElements, {
            y: (i) => Math.random() * -800 - 300,
            x: (i) => Math.random() * 800 - 400,
            rotationZ: (i) => Math.random() * 180 - 90,
            opacity: 0,
            scale: 0.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: "#chapter-confusion",
              start: "top top",
              end: "+=120%", 
              scrub: 1,
            }
          });
        }

      }, containerRef);

      return () => {
        ctx.revert();
      };
    }
  }, [isLoading]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans overflow-x-hidden">
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <nav className="fixed top-0 left-0 right-0 z-[999] p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <img src="/logo-transparent.png" alt="DriveLegal" className="h-8 md:h-10 opacity-90" />
        </div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="block text-sm font-bold uppercase tracking-wider text-[#10B981] hover:text-white transition-colors"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <div className="fixed inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen" style={{ pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <FloatingPlates />
        </Canvas>
      </div>

      {/* CH 1 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-center overflow-hidden z-[0] bg-[#050505]">
        <div className="chapter-bg absolute inset-0 w-full h-full">
           <img src="/ch1_commute.png" className="w-full h-full object-cover opacity-60 pointer-events-none" alt="Commute" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>
        <div className="content-block relative z-20 text-center px-6 w-full">
          <h1 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85]">
            <CinematicText text="Every" className="text-white" /> <CinematicText text="Journey" className="text-[#10B981]" /><br/>
            <CinematicText text="Starts" className="text-white" /> <CinematicText text="Here." className="text-white" />
          </h1>
          <div className="w-full">
            <p className="cinematic-desc text-xl md:text-2xl text-[#A1A1AA] font-light mt-8 max-w-2xl mx-auto tracking-wide">
              Before the flash, before the rules, it's just you and the road.
            </p>
          </div>
        </div>
      </section>

      {/* CH 2 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-center overflow-hidden z-[1] bg-[#020202]">
        <div className="chapter-bg absolute inset-0 w-full h-full mix-blend-luminosity">
          <img src="/ch2_flash.png" className="w-full h-full object-cover opacity-50 pointer-events-none" alt="Flash" />
        </div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <div className="content-block relative z-20 max-w-5xl px-6 text-center w-full">
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            <CinematicText text="Then," className="text-white" /> <br/>
            <CinematicText text="The" className="text-white" /> <CinematicText text="Flash." className="text-[#10B981]" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-3xl text-[#A1A1AA] font-light leading-snug max-w-3xl mx-auto">
              A single moment changes the commute. Rules differ. Penalties compound. The reality of enforcement activates.
            </p>
          </div>
        </div>
      </section>

      {/* CH 3 */}
      <section id="chapter-confusion" className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-center overflow-hidden z-[2] bg-[#0A0A0A]">
        <img src="/ch3_confusion.png" className="confusion-float absolute top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none" alt="Confusion" />
        <div className="content-block relative z-20 max-w-5xl px-6 text-center w-full">
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none mb-6">
            <CinematicText text="The" className="text-white" /> <CinematicText text="Chaos." className="text-white opacity-50" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-3xl text-[#A1A1AA] font-light leading-snug max-w-3xl mx-auto">
              State-wise regulations, floating documents, missing contexts. Information overload.
            </p>
          </div>
        </div>
      </section>

      {/* CH 4 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-center overflow-hidden z-[3] bg-[#050505]">
        <div className="chapter-bg absolute inset-0 w-full h-full mix-blend-screen">
          <img src="/ch4_clarity.png" className="w-full h-full object-cover opacity-60 pointer-events-none" alt="Clarity" />
        </div>
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        <div className="content-block relative z-20 max-w-5xl px-6 text-center w-full">
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none mb-6">
            <CinematicText text="The" className="text-[#10B981]" /> <CinematicText text="Clarity." className="text-[#10B981]" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-3xl text-white font-light leading-snug max-w-3xl mx-auto">
              Chaos becomes precision. DriveLegal aligns every document and law into a perfect, accessible structure.
            </p>
          </div>
        </div>
      </section>

      {/* CH 5 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-end pb-32 px-6 md:px-20 overflow-hidden z-[4] bg-[#000000]">
        <div className="chapter-bg absolute inset-0 w-full h-full">
          <img src="/ch5_engine.png" className="w-full h-full object-cover opacity-70 pointer-events-none" alt="Engine" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
        <div className="content-block relative z-20 max-w-3xl w-full">
          <div className="uppercase text-xs font-bold tracking-widest text-[#10B981] mb-6">Chapter 05</div>
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            <CinematicText text="The" className="text-white" /> <br/>
            <CinematicText text="Engine." className="text-[#10B981]" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-2xl text-[#A1A1AA] font-light leading-relaxed">
              Architected like a massive control center. Legal data processed through high-speed validation pathways. Unmatched intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* CH 6 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center px-6 md:px-20 overflow-hidden z-[5] bg-[#020202]">
        <div className="chapter-bg absolute inset-0 w-full h-full">
          <img src="/ch6_twin.png" className="w-full h-full object-cover opacity-30 pointer-events-none" alt="Twin" />
        </div>
        <div className="content-block relative z-20 max-w-3xl w-full">
          <div className="uppercase text-xs font-bold tracking-widest text-[#10B981] mb-6">Chapter 06</div>
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            <CinematicText text="Digital" className="text-white" /> <br/>
            <CinematicText text="Twin." className="text-white opacity-50" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-2xl text-[#A1A1AA] font-light leading-relaxed">
              We understand traffic flow at scale. Entire cities rendered as interconnected legal boundaries, updating in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CH 7 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-end px-6 md:px-20 overflow-hidden z-[6] bg-[#050505]">
        <div className="chapter-bg absolute inset-0 w-full h-full">
          <img src="/ch7_network.png" className="w-full h-full object-cover opacity-60 pointer-events-none" alt="Network" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
        <div className="content-block relative z-20 max-w-3xl text-right w-full flex flex-col items-end">
          <div className="uppercase text-xs font-bold tracking-widest text-[#10B981] mb-6">Chapter 07</div>
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            <CinematicText text="State" className="text-white" /> <br/>
            <CinematicText text="By" className="text-[#10B981]" /> <br/>
            <CinematicText text="State." className="text-white" />
          </h2>
          <div className="w-full flex justify-end">
            <p className="cinematic-desc text-lg md:text-2xl text-[#A1A1AA] font-light max-w-xl">
              Every regulation, every penalty, mapped precisely across the nation's neural network of highways.
            </p>
          </div>
        </div>
      </section>

      {/* CH 8 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex items-center justify-center overflow-hidden z-[7] bg-[#0A0A0A]">
        <div className="chapter-bg absolute inset-0 w-full h-full">
          <img src="/ch8_vault.png" className="w-full h-full object-cover opacity-50 pointer-events-none" alt="Vault" />
        </div>
        <div className="content-block relative z-[999] text-center w-full flex flex-col items-center pointer-events-auto px-4">
          <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            <CinematicText text="The" className="text-white opacity-50" /> <br/>
            <CinematicText text="Vault." className="text-white" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-2xl text-[#A1A1AA] font-light mb-12 max-w-2xl text-center mx-auto">
              Your personal legal repository. Access state-specific laws, instantly decipher challans, and maintain total driving compliance.
            </p>
          </div>
          <button 
            onClick={() => navigate('/codex')} 
            className="cursor-pointer border border-[#10B981] bg-black/50 backdrop-blur-md text-white px-6 py-2 md:px-8 md:py-3 rounded-full uppercase text-xs md:text-sm font-bold tracking-widest hover:bg-[#10B981] hover:text-black transition-colors"
            style={{ pointerEvents: 'all' }}
          >
            Access Codex
          </button>
        </div>
      </section>

      {/* CH 9 */}
      <section className="cinematic-chapter sticky top-0 snap-always snap-start h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden z-[8] bg-[#020202]">
        <div className="chapter-bg absolute inset-0 w-full h-full mix-blend-luminosity">
          <img src="/hero_interchange.png" className="w-full h-full object-cover opacity-30 pointer-events-none" alt="Final" />
        </div>
        <div className="content-block relative z-[999] max-w-5xl px-6 w-full flex flex-col items-center pointer-events-auto">
          <h2 className="text-[10vw] md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            <CinematicText text="Drive" className="text-white" /> <CinematicText text="Smarter." className="text-[#10B981]" /><br/>
            <CinematicText text="Know" className="text-white" /> <CinematicText text="The" className="text-white" /> <CinematicText text="Law." className="text-white" />
          </h2>
          <div className="w-full">
            <p className="cinematic-desc text-lg md:text-2xl text-[#A1A1AA] font-light mb-12 max-w-2xl text-center mx-auto">
              You are in control. Enter the intelligence platform and take command of your legal compliance today.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="cursor-pointer bg-[#10B981] text-black px-8 py-4 md:px-16 md:py-6 rounded-full text-lg md:text-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            style={{ pointerEvents: 'all' }}
          >
            Enter Dashboard
          </button>
        </div>
      </section>
      
    </div>
  );
}
