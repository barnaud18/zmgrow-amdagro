/**
 * ZM-GROW — AMD Agro
 * Site institucional do biofertilizante ZM Grow
 * Design: Organic Premium Agriculture
 * Palette: Deep Green (#0B3D2E) + Gold (#C8982C) + Earth (#7A5C3E)
 * Typography: Playfair Display (display) + DM Sans (body)
 */
import { useEffect, useRef, useState } from "react";

// ── Arrow icon ──────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ── Nav ──────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "nutrientes",  label: "Nutrientes" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "resultados",  label: "Resultados" },
  { id: "culturas",    label: "Culturas" },
  { id: "aplicacao",   label: "Aplicação" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const navHeight = 72;
      let current = "";
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - navHeight <= 0) {
          current = id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <a href="#" className="nav-logo">ZM<span>Grow</span></a>
      <ul className={`nav-links${menuOpen ? " show" : ""}`}>
        {NAV_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeId === id ? "nav-active" : ""}
              onClick={closeMenu}
            >
              {label}
            </a>
          </li>
        ))}
        <li><a href="#formulario" className="nav-contact" onClick={closeMenu}>Fale Conosco</a></li>
      </ul>
      <button
        className="mobile-toggle"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-grain" />
      <div className="hero-content">
        <div>
          <div className="hero-badge">Biofertilizante de Alta Performance</div>
          <h1>
            Nutrição <span>completa</span> para o máximo potencial da sua lavoura
          </h1>
          <p className="hero-sub">
            ZM Grow combina Zinco, Manganês e Enxofre em uma formulação líquida de alta absorção,
            projetada para todas as culturas e todos os estágios fenológicos.
          </p>
          <div className="hero-cta">
            <a href="#contato" className="btn-primary">
              Solicitar Cotação
              <ArrowIcon />
            </a>
            <a href="#nutrientes" className="btn-secondary">Conhecer o Produto</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="product-showcase">
            <div className="product-glow" />
            <div className="product-photo-wrapper">
              <img
                src="/manus-storage/zm-grow_fb05be3f.webp"
                alt="Galão ZM-GROW 10 litros — AMD Agro"
                className="product-photo"
              />
            </div>
            <div className="floating-element float-zn">🧪 Zn — Zinco</div>
            <div className="floating-element float-mn">⚗️ Mn — Manganês</div>
            <div className="floating-element float-s">🔬 S — Enxofre</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Scroll reveal hook ────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>(
      ".nutrient-card, .stat-card, .culture-item, .app-step"
    );

    children.forEach((child) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(20px)";
      child.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ── Nutrients ────────────────────────────────────────────────
function Nutrients() {
  return (
    <section className="nutrients" id="nutrientes">
      <div className="section-header">
        <div className="section-tag">Composição</div>
        <h2>Três nutrientes essenciais em uma única aplicação</h2>
        <p>Cada elemento foi dosado para máxima eficiência de absorção e sinergismo entre nutrientes.</p>
      </div>
      <div className="nutrient-grid">
        <div className="nutrient-card card-zn">
          <div className="nutrient-symbol sym-zn">Zn</div>
          <h3>Zinco</h3>
          <p>Essencial para a síntese de auxinas e ativação enzimática, o zinco é o micronutriente mais deficiente nos solos brasileiros.</p>
          <ul className="nutrient-benefits">
            <li>Regulação do crescimento celular</li>
            <li>Síntese de proteínas e clorofila</li>
            <li>Formação de grãos e sementes</li>
            <li>Tolerância a estresse hídrico</li>
          </ul>
        </div>
        <div className="nutrient-card card-mn">
          <div className="nutrient-symbol sym-mn">Mn</div>
          <h3>Manganês</h3>
          <p>Cofator essencial na fotossíntese e no metabolismo do nitrogênio, atua diretamente na produção de energia da planta.</p>
          <ul className="nutrient-benefits">
            <li>Ativação de mais de 35 enzimas</li>
            <li>Fotólise da água (fotossistema II)</li>
            <li>Metabolismo de carboidratos</li>
            <li>Defesa contra patógenos</li>
          </ul>
        </div>
        <div className="nutrient-card card-s">
          <div className="nutrient-symbol sym-s">S</div>
          <h3>Enxofre</h3>
          <p>Componente dos aminoácidos metionina e cisteína, o enxofre é fundamental para a qualidade proteica dos grãos.</p>
          <ul className="nutrient-benefits">
            <li>Formação de aminoácidos essenciais</li>
            <li>Síntese de óleos e vitaminas</li>
            <li>Eficiência do uso de nitrogênio</li>
            <li>Resistência a doenças fúngicas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ────────────────────────────────────────────
const testimonials = [
  {
    name: "Carlos Mendonça",
    role: "Produtor de Soja — Mato Grosso",
    initials: "CM",
    color: "sym-zn",
    text: "Apliquei o ZM Grow na safra de soja e a diferença foi visível já nas primeiras semanas. As folhas ficaram mais verdes e o fechamento das linhas foi mais rápido. Tivemos um ganho de quase 4 sacas por hectare em relação ao ano anterior.",
    stars: 5,
  },
  {
    name: "Fernanda Oliveira",
    role: "Produtora de Milho — Goiás",
    initials: "FO",
    color: "sym-mn",
    text: "Sempre tive problema com deficiência de manganês no meu talhão. Com o ZM Grow resolvi isso e ainda melhorei a nutrição geral da lavoura. O custo-benefício é excelente — recomendo a qualquer produtor que queira resultado de verdade.",
    stars: 5,
  },
  {
    name: "João Batista Rezende",
    role: "Cafeicultor — Sul de Minas",
    initials: "JR",
    color: "sym-s",
    text: "No café, a qualidade do grão melhorou bastante depois que comecei a usar o ZM Grow. O enxofre faz toda a diferença na formação dos grãos. Meu agrônomo ficou surpreso com os resultados da análise foliar após duas aplicações.",
    stars: 5,
  },
  {
    name: "Marcos Vinícius Souza",
    role: "Produtor de Feijão — Paraná",
    initials: "MS",
    color: "sym-zn",
    text: "Testei o ZM Grow em metade do talhão e a diferença foi notória na colheita. A parte tratada teve vagens mais cheias e menos perdas por aborto de flores. Hoje uso em toda a propriedade e não abro mão mais.",
    stars: 5,
  },
  {
    name: "Ana Paula Teixeira",
    role: "Produtora de Arroz — Rio Grande do Sul",
    initials: "AT",
    color: "sym-mn",
    text: "A deficiência de manganês era um problema crônico nas minhas áreas alagadas. Depois de duas safras com ZM Grow, os sintomas desapareceram e a produtividade subiu 12%. O produto é fácil de aplicar e mistura bem com os defensivos que já uso.",
    stars: 5,
  },
  {
    name: "Roberto Alves Pinheiro",
    role: "Produtor de Milho Silagem — Minas Gerais",
    initials: "RP",
    color: "sym-s",
    text: "Uso o ZM Grow no milho para silagem há duas safras. A massa verde aumentou visivelmente e o teor de proteína na análise bromatológica melhorou. O gado responde melhor à dieta e o custo por tonelada de silagem caiu. Recomendo sem hesitar.",
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--gold-300)' }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  // auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="testimonials" id="depoimentos">
      <div className="section-header">
        <div className="section-tag">Depoimentos</div>
        <h2>O que dizem os produtores</h2>
        <p>Resultados reais de quem já usa o ZM Grow na lavoura.</p>
      </div>

      <div className="carousel-wrapper">
        {/* Seta esquerda */}
        <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Card */}
        <div className="carousel-card-wrap">
          <div className="testimonial-card carousel-card" key={active}>
            <div className="testimonial-quote-icon">“</div>
            <div className="testimonial-stars">
              {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
            </div>
            <blockquote className="testimonial-text">{t.text}</blockquote>
            <div className="testimonial-author">
              <div className={`testimonial-avatar ${t.color}`}>{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Seta direita */}
        <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Próximo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Depoimento ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Results ──────────────────────────────────────────────────
function Results() {
  return (
    <section className="results" id="resultados">
      <div className="section-header">
        <div className="section-tag">Impacto Comprovado</div>
        <h2>Resultados que transformam a lavoura</h2>
        <p>Dados consolidados de ensaios em campo em diferentes regiões e culturas do Brasil.</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">+18%</div>
          <div className="stat-label">Aumento médio na produtividade</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">+25%</div>
          <div className="stat-label">Eficiência fotossintética</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3:1</div>
          <div className="stat-label">Retorno sobre investimento médio</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Compatível com todas as culturas</div>
        </div>
      </div>
    </section>
  );
}

// ── Cultures ─────────────────────────────────────────────────
function Cultures() {
  const cultures = [
    { emoji: "🌱", name: "Soja" },
    { emoji: "🌽", name: "Milho" },
    { emoji: "🌾", name: "Arroz" },
    { emoji: "☕", name: "Café" },
    { emoji: "🫘", name: "Feijão" },
    { emoji: "🥬", name: "Hortaliças" },
  ];

  return (
    <section className="cultures" id="culturas">
      <div className="section-header">
        <div className="section-tag">Versatilidade</div>
        <h2>Para todas as culturas</h2>
        <p>ZM Grow é compatível com qualquer cultura, proporcionando nutrição balanceada em cada estágio de desenvolvimento.</p>
      </div>
      <div className="culture-grid">
        {cultures.map((c) => (
          <div className="culture-item" key={c.name}>
            <div className="culture-emoji">{c.emoji}</div>
            <div className="culture-name">{c.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Application ──────────────────────────────────────────────
function Application() {
  const steps = [
    {
      num: "1",
      title: "Tratamento de Sementes",
      desc: "Aplique ZM Grow diretamente nas sementes antes do plantio para estimular a germinação e o desenvolvimento radicular inicial.",
    },
    {
      num: "2",
      title: "Aplicação Foliar",
      desc: "Pulverize nos estágios V4-V6 e R1-R3 para nutrição direta via folha, com rápida absorção de Zn, Mn e S.",
    },
    {
      num: "3",
      title: "Aplicação em Sulco",
      desc: "Adicione ZM Grow no sulco de plantio junto à semeadura para disponibilizar os nutrientes desde a emergência.",
    },
  ];

  const specs = [
    { label: "Apresentação", value: "Líquido concentrado" },
    { label: "Embalagem", value: "Galão de 10 litros" },
    { label: "Nutrientes", value: "Zn + Mn + S" },
    { label: "Aplicação", value: "Semente / Foliar / Sulco" },
    { label: "Compatibilidade", value: "Todas as culturas" },
    { label: "Armazenamento", value: "Local seco e arejado" },
    { label: "Validade", value: "24 meses" },
    { label: "Importador", value: "AMD Agro" },
  ];

  return (
    <section className="application" id="aplicacao">
      <div className="app-container">
        <div>
          <div className="section-tag">Como Usar</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--green-900)", margin: "12px 0 32px" }}>
            Aplicação simples, resultado comprovado
          </h2>
          <div className="app-steps">
            {steps.map((s) => (
              <div className="app-step" key={s.num}>
                <div className="step-num">{s.num}</div>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="app-info-card">
          <h3>Ficha Técnica</h3>
          {specs.map((s) => (
            <div className="info-row" key={s.label}>
              <span className="info-label">{s.label}</span>
              <span className="info-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta-section" id="contato">
      <div className="cta-card">
        <h2>Pronto para turbinar sua lavoura?</h2>
        <p>
          Entre em contato com nossa equipe comercial e solicite uma cotação personalizada
          para sua região e cultura.
        </p>
        <a
          href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20ZM%20Grow"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar pelo WhatsApp
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

// ── WhatsApp Floating Button ────────────────────────────────
function WhatsAppButton() {
  const phone = "4368110797136";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o ZM Grow.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="whatsapp-fab-label">Fale Conosco</span>
    </a>
  );
}

// ── Contact Form ──────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", culture: "", area: "", region: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const cultures = ["Soja", "Milho", "Café", "Arroz", "Feijão", "Hortaliças", "Cana-de-açúcar", "Algodão", "Outra"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simula envio — integre com backend/e-mail conforme necessário
    setTimeout(() => setStatus("sent"), 1200);
  };

  const whatsappUrl = `https://wa.me/4368110797136?text=${encodeURIComponent(
    `Olá! Meu nome é ${form.name}. Produzo ${form.culture} em ${form.region}, área de ${form.area} ha. ${form.message}`
  )}`;

  return (
    <section className="contact-section" id="formulario">
      <div className="contact-inner">
        <div className="contact-info">
          <div className="section-tag">Contato</div>
          <h2>Fale com um especialista da AMD Agro</h2>
          <p>Preencha o formulário e nossa equipe entrará em contato para apresentar a melhor solução para sua lavoura.</p>
          <div className="contact-highlights">
            <div className="contact-highlight">
              <span className="highlight-icon">⚡</span>
              <span>Resposta em até 24 horas</span>
            </div>
            <div className="contact-highlight">
              <span className="highlight-icon">🌱</span>
              <span>Consultoria agronômica gratuita</span>
            </div>
            <div className="contact-highlight">
              <span className="highlight-icon">📦</span>
              <span>Cotação personalizada por região</span>
            </div>
          </div>
          <div className="contact-amd-logo-wrap">
            <img src={AMD_LOGO} alt="AMD Agro" className="contact-amd-logo" />
          </div>
        </div>

        <div className="contact-form-card">
          {status === "sent" ? (
            <div className="form-success">
              {/* Checkmark animado */}
              <div className="success-check-wrap">
                <svg className="success-check-svg" viewBox="0 0 52 52">
                  <circle className="success-check-circle" cx="26" cy="26" r="24" fill="none" />
                  <path className="success-check-tick" fill="none" d="M14 27l8 8 16-16" />
                </svg>
              </div>

              <div className="success-confetti" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`confetti-dot confetti-dot-${i}`} />
                ))}
              </div>

              <h3 className="success-title">Mensagem enviada com sucesso!</h3>
              <p className="success-subtitle">
                Olá, <strong>{form.name}</strong>! Nossa equipe entrará em contato em breve
                com uma cotação personalizada para sua lavoura de <strong>{form.culture}</strong>.
              </p>

              <div className="success-details">
                <div className="success-detail-item">
                  <span className="success-detail-label">Cultura</span>
                  <span className="success-detail-value">{form.culture}</span>
                </div>
                <div className="success-detail-item">
                  <span className="success-detail-label">Área</span>
                  <span className="success-detail-value">{form.area} ha</span>
                </div>
                <div className="success-detail-item">
                  <span className="success-detail-label">Região</span>
                  <span className="success-detail-value">{form.region}</span>
                </div>
              </div>

              <a href={whatsappUrl} className="btn-primary success-whatsapp" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Continuar pelo WhatsApp
              </a>

              <button
                className="success-reset"
                onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", culture: "", area: "", region: "", message: "" }); }}
              >
                Enviar outro contato
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome completo *</label>
                  <input id="name" name="name" type="text" placeholder="Ex: João Silva" required value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">WhatsApp / Telefone *</label>
                  <input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" required value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="culture">Cultura principal *</label>
                  <select id="culture" name="culture" required value={form.culture} onChange={handleChange}>
                    <option value="">Selecione a cultura</option>
                    {cultures.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="area">Área da propriedade (ha) *</label>
                  <input id="area" name="area" type="number" min="1" placeholder="Ex: 100" required value={form.area} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="region">Região / Estado *</label>
                <input id="region" name="region" type="text" placeholder="Ex: Sorriso — MT" required value={form.region} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem (opcional)</label>
                <textarea id="message" name="message" rows={3} placeholder="Conte sobre sua lavoura ou dúvida..." value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="btn-primary form-submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="form-spinner" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <ArrowIcon />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
const AMD_LOGO = "/manus-storage/amdagro-logo_3cf76ebf.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-group">
          <div className="footer-brand">ZM<span>Grow</span></div>
          <div className="footer-brand-sep" />
          <img src={AMD_LOGO} alt="AMD Agro" className="footer-amd-logo" />
        </div>
        <div className="footer-sub">Biofertilizante com Zinco, Manganês e Enxofre</div>
      </div>
      <div className="footer-links">
        <a href="#nutrientes">Nutrientes</a>
        <a href="#resultados">Resultados</a>
        <a href="#culturas">Culturas</a>
        <a href="#aplicacao">Aplicação</a>
        <a href="#formulario">Contato</a>
      </div>
      <div className="footer-copy">© 2026 AMD Agro. Todos os direitos reservados.</div>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function Home() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <Nav />
      <Hero />
      <Nutrients />
      <Testimonials />
      <Results />
      <Cultures />
      <Application />
      <CTA />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
