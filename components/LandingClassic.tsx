"use client";

import { useEffect } from "react";
import PlasmaBackground from "@/components/PlasmaBackground";

export default function LandingClassic() {
  useEffect(() => {
    const words = ["Innovation", "Impact", "Community", "Everything"];
    let currentIndex = 0;
    const rotatingText = document.getElementById("rotatingText");
    if (!rotatingText) return;
    (rotatingText as HTMLElement).style.transition = "opacity 0.3s";

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      (rotatingText as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        rotatingText.textContent = words[currentIndex];
        (rotatingText as HTMLElement).style.opacity = "1";
      }, 300);
    }, 2500);

    // Smooth anchors
    const handlers: Array<() => void> = [];
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute("href") || "");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      anchor.addEventListener("click", handler);
      handlers.push(() => anchor.removeEventListener("click", handler));
    });

    // Parallax floating elements
    const onMouse = (e: MouseEvent) => {
      const floatingElements = document.querySelectorAll(".floating-element");
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      floatingElements.forEach((el, index) => {
        const speed = (index + 1) * 28;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    document.addEventListener("mousemove", onMouse);

    // Fade-in observer
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" } as const;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, observerOptions);
    document.querySelectorAll(".experience-card, .work-item, .partner-logo").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      handlers.forEach((off) => off());
      document.removeEventListener("mousemove", onMouse);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <PlasmaBackground className="pointer-events-none fixed inset-0 -z-10 opacity-95" />
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}

const markup = `
  <style>
    :root{--gold:#d4af37;--gold2:#f4d03f;--ease: cubic-bezier(.23,1,.32,1)}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:#0a0a0a;color:#fff;overflow-x:hidden}
    .nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;justify-content:space-between;align-items:center;padding:2rem 4rem;background:rgba(10,10,10,.8);backdrop-filter:blur(10px)}
    .logo{font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
    .nav-links{display:flex;gap:3rem;list-style:none}
    .nav-links a{color:#fff;text-decoration:none;font-size:.95rem;transition:opacity .3s}
    .nav-links a:hover{opacity:.6}
    .hero{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden;padding:0 2rem}
    .hero-title{font-size:clamp(3rem,12vw,10rem);font-weight:900;letter-spacing:-.04em;line-height:.9;text-align:center;margin-bottom:2rem}
    .rotating-text{display:inline-block;background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:slideUp 8s infinite}
    .hero-subtitle{font-size:clamp(1rem,2vw,1.5rem);font-weight:300;text-align:center;max-width:700px;opacity:.8;line-height:1.5;margin-bottom:2rem}
    .resume-btn{padding:1rem 2.5rem;background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);color:#0a0a0a;font-size:1.1rem;font-weight:600;border:none;border-radius:50px;cursor:pointer;transition:transform .35s var(--ease), box-shadow .35s var(--ease);text-decoration:none;display:inline-block}
    .resume-btn:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 18px 40px rgba(212,175,55,.35)}
    .scroll-indicator{position:absolute;bottom:3rem;left:50%;transform:translateX(-50%);width:2px;height:60px;background:rgba(255,255,255,.2);animation:scrollPulse 2s infinite}
    @keyframes scrollPulse{0%,100%{opacity:.2}50%{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
    .floating-element{position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,.14) 0%,transparent 70%);pointer-events:none;animation:float 7s var(--ease) infinite;mix-blend-screen;filter: blur(2px)}
    .float-1{top:20%;left:10%;animation-delay:0s}
    .float-2{top:60%;right:15%;animation-delay:2s}
    .float-3{bottom:20%;left:20%;animation-delay:4s}
    .section{padding:8rem 4rem;min-height:100vh;display:flex;flex-direction:column;justify-content:center}
    .section-title{font-size:clamp(2rem,5vw,4rem);font-weight:800;margin-bottom:3rem;letter-spacing:-.03em}
    .about-content{display:grid;grid-template-columns:1fr 1fr;gap:6rem;max-width:1400px;margin:0 auto}
    .about-text{font-size:1.3rem;line-height:1.7;font-weight:300;opacity:.9}
    .about-text strong{color:#d4af37;font-weight:600}
    .skills{display:flex;flex-direction:column;gap:2rem}
    .skill-item{font-size:1.8rem;font-weight:600;padding:1.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);transition:color .4s var(--ease), padding .5s var(--ease), border-color .4s var(--ease);cursor:pointer;position:relative;overflow:hidden}
    .skill-item::before{content:"";position:absolute;left:0;bottom:0;width:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .6s var(--ease)}
    .skill-item:hover::before{width:100%}
    .skill-item:hover{padding-left:2rem;color:var(--gold);border-color:var(--gold)}
    .experience-section{background:#0f0f0f}
    .experience-grid{max-width:1400px;margin:0 auto;display:flex;flex-direction:column;gap:4rem}
    .experience-card{padding:3rem;background:rgba(255,255,255,.02);border-radius:20px;border:1px solid rgba(255,255,255,.05);transition:transform .5s var(--ease), box-shadow .5s var(--ease), border-color .5s var(--ease), background .5s var(--ease);cursor:pointer;position:relative;overflow:hidden}
    .experience-card::after{content:"";position:absolute;top:0;left:-120%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(212,175,55,.15),transparent);transition:left .8s var(--ease)}
    .experience-card:hover::after{left:120%}
    .experience-card:hover{background:rgba(255,255,255,.05);border-color:rgba(212,175,55,.35);transform:translateY(-6px);box-shadow:0 16px 40px rgba(212,175,55,.18)}
    .experience-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem}
    .experience-title{font-size:1.8rem;font-weight:700;color:#d4af37}
    .experience-date{font-size:1rem;opacity:.6}
    .experience-company{font-size:1.2rem;opacity:.8;margin-bottom:1rem}
    .experience-desc{font-size:1.05rem;line-height:1.7;opacity:.85}
    .work-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:3rem;max-width:1400px;margin:0 auto}
    .work-item{background:linear-gradient(135deg,#1e1e1e 0%,#2a2a2a 100%);border-radius:20px;padding:3rem;transition:transform .5s var(--ease), box-shadow .5s var(--ease);cursor:pointer;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.05)}
    .work-item::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);opacity:0;transition:opacity .5s var(--ease)}
    .work-item:hover{transform:translateY(-12px) scale(1.03);box-shadow:0 26px 54px rgba(212,175,55,.25)}
    .work-item:hover::before{opacity:.12}
    .work-content{position:relative;z-index:1}
    .work-title{font-size:1.8rem;font-weight:700;margin-bottom:1rem;color:#d4af37}
    .work-desc{font-size:1.05rem;line-height:1.6;opacity:.85}
    .partners{background:#0f0f0f}
    .partners-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:3rem;max-width:1400px;margin:0 auto;align-items:center}
    .partner-logo{height:70px;background:rgba(255,255,255,.03);border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:600;opacity:.6;transition:transform .45s var(--ease), box-shadow .45s var(--ease), border-color .45s var(--ease), background .45s var(--ease);border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden}
    .partner-logo::before{content:"";position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(212,175,55,.15);transform:translate(-50%,-50%);transition:width .6s var(--ease),height .6s var(--ease)}
    .partner-logo:hover::before{width:220%;height:220%}
    .partner-logo:hover{opacity:1;background:rgba(255,255,255,.1);border-color:rgba(212,175,55,.35);transform:scale(1.06);box-shadow:0 16px 34px rgba(212,175,55,.22)}
    .partner-logo span{position:relative;z-index:1}
    .contact{text-align:center}
    .contact-info{display:flex;flex-direction:column;gap:2rem;margin-top:4rem;align-items:center}
    .contact-link{font-size:clamp(1.5rem,4vw,3rem);font-weight:700;color:#fff;text-decoration:none;transition:all .3s;display:inline-block}
    .contact-link:hover{background:linear-gradient(135deg,#d4af37 0%,#f4d03f 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;transform:translateX(20px)}
    footer{padding:3rem 4rem;text-align:center;opacity:.5;font-size:.9rem}
    @media (max-width:768px){.nav{padding:1.5rem 2rem}.nav-links{gap:1.5rem;font-size:.85rem}.section{padding:4rem 2rem}.about-content{grid-template-columns:1fr;gap:3rem}.work-grid{grid-template-columns:1fr}.partners-grid{grid-template-columns:repeat(2,1fr);gap:2rem}.experience-card{padding:2rem}}
  </style>
  <nav class="nav">
    <div class="logo">Vaneeza Maqsood</div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
  <section class="hero">
    <div class="floating-element float-1"></div>
    <div class="floating-element float-2"></div>
    <div class="floating-element float-3"></div>
    <h1 class="hero-title">Design<br/>Drives<br/><span class="rotating-text" id="rotatingText">Innovation</span></h1>
    <p class="hero-subtitle">Product Designer & Ecosystem Lead crafting human-centered digital experiences at the intersection of UX, AI, and startup innovation</p>
    <a href="#" class="resume-btn" download="Vaneeza-Maqsood-CV.pdf">Download Resume</a>
    <div class="scroll-indicator"></div>
  </section>
  <section class="section" id="about">
    <div class="about-content">
      <div>
        <h2 class="section-title">About Me</h2>
        <p class="about-text">I'm a creative and impact-driven product designer and ecosystem leader based in <strong>Helsinki, Finland</strong>... </p>
      </div>
      <div class="skills">
        <div class="skill-item">UX/UI Design</div>
        <div class="skill-item">Front-End Development</div>
        <div class="skill-item">Community Leadership</div>
        <div class="skill-item">AI Integration</div>
        <div class="skill-item">Photography & Content</div>
      </div>
    </div>
  </section>
  <section class="section experience-section" id="experience">
    <h2 class="section-title">Experience</h2>
    <div class="experience-grid">
      <div class="experience-card">
        <div class="experience-header">
          <div>
            <div class="experience-title">Head of Ecosystem</div>
            <div class="experience-company">Aalto Entrepreneurship Society (Aaltoes)</div>
          </div>
          <div class="experience-date">Jan 2025 – Present</div>
        </div>
        <p class="experience-desc">Leading community growth and partnerships for Europe's largest university entrepreneurship hub...</p>
      </div>
    </div>
  </section>
  <section class="section" id="projects">
    <h2 class="section-title">Selected Projects</h2>
    <div class="work-grid">
      <div class="work-item"><div class="work-content"><div class="work-title">Carbon Footprint Calculator</div><div class="work-desc">Designed comprehensive prototype in Figma...</div></div></div>
    </div>
  </section>
  <section class="section partners">
    <h2 class="section-title">Collaborated With</h2>
    <div class="partners-grid">
      <div class="partner-logo"><span>Supercell</span></div>
      <div class="partner-logo"><span>Nokia</span></div>
      <div class="partner-logo"><span>Hugging Face</span></div>
      <div class="partner-logo"><span>Aalto University</span></div>
    </div>
  </section>
  <section class="section contact" id="contact">
    <h2 class="section-title">Let's Connect</h2>
    <div class="contact-info">
      <a href="mailto:simal.maqsood@gmail.com" class="contact-link">simal.maqsood@gmail.com</a>
      <a href="https://linkedin.com/in/vaneeza-maqsood" class="contact-link">LinkedIn</a>
      <a href="https://vaneeza.fi" class="contact-link">vaneeza.fi</a>
      <a href="https://github.com/vaneezamaqsood" class="contact-link">GitHub</a>
    </div>
  </section>
  <footer><p>© 2025 Vaneeza Maqsood. Based in Helsinki, Finland.</p></footer>
`;


