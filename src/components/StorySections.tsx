import { ArrowUpRight, BarChart3, Bell, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3, Dumbbell, Instagram, MessageCircle, Play, UtensilsCrossed } from 'lucide-react'
import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { consultationUrl } from '../data/content'
import { ContainerScroll } from './ui/ContainerScroll'
import { MagicText } from './ui/MagicText'
import { ResultsShowcase, type ResultShowcaseSlide } from './ui/ResultsShowcase'
import { TestimonialsColumn, type Testimonial } from './ui/TestimonialsColumn'

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .18 },
  transition: { duration: .75, ease: [0.16, 1, 0.3, 1] as const },
}

export function Desire() {
  const sequence = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sequence,
    offset: ['start 0.92', 'end 0.7'],
  })

  return (
    <section className="desire paper-section" id="jornada">
      <div className="desire-copy" ref={sequence}>
        <MagicText
          text="Você treina, mas o seu corpo não muda como deveria?"
          highlights={['não muda como deveria?']}
          progress={scrollYProgress}
          progressRange={[0, .5]}
        />
        <MagicText
          text="Muitas vezes, é falta de um profissional que sabe perfeitamente o caminho que você deve seguir."
          highlights={['perfeitamente']}
          progress={scrollYProgress}
          progressRange={[.5, 1]}
        />
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section className="expertise expertise-redesign dark-section" id="acompanhamento">
      <img className="expertise-background" src="/assets/media/igor-mentor-concept.jpg" alt="Ígor Souza sentado, representando o acompanhamento individual da consultoria" />
      <div className="expertise-scrim" aria-hidden="true" />
      <motion.div className="expertise-copy" {...reveal}>
        <h2>Um plano não basta. <em>Você precisa de direção.</em></h2>
        <p>Ígor transforma seu objetivo, sua rotina e seu ponto de partida em uma estratégia clara — e acompanha de perto para que cada ajuste aproxime você do resultado.</p>
        <ul>
          <li><span>01</span>Diagnóstico completo do seu momento e da sua meta</li>
          <li><span>02</span>Treino e dieta personalizados para a sua rotina</li>
          <li><span>03</span>Acompanhamento e ajustes conforme a sua evolução</li>
        </ul>
        <a className="expertise-cta" href={consultationUrl} target="_blank" rel="noreferrer">
          <span>Quero solicitar uma vaga</span><i><ArrowUpRight size={18} strokeWidth={1.8} /></i>
        </a>
      </motion.div>
      <span className="expertise-credit">Imagem conceitual gerada por IA</span>
    </section>
  )
}

function AppPhone({ view }: { view: 'today' | 'diet' }) {
  const isToday = view === 'today'

  return (
    <div className={`app-phone app-phone--${view}`} aria-label={`Mockup ilustrativo do aplicativo — ${isToday ? 'treino do dia' : 'dieta do dia'}`}>
      <div className="app-phone__frame">
        <span className="app-phone__speaker" aria-hidden="true" />
        <div className="app-phone__screen">
          <div className="app-ui__status" aria-hidden="true"><b>9:41</b><span>● ●●</span></div>
          <header className="app-ui__header">
            <span className="app-ui__brand"><img src="/assets/media/igor-logo-gold.png" alt="" /></span>
            <span><small>CONSULTORIA</small><strong>Ígor Souza</strong></span>
            <i aria-hidden="true">IS</i>
          </header>

          {isToday ? (
            <>
              <div className="app-ui__welcome"><small>SEU PLANO</small><h3>Boa tarde,<br />Mariana.</h3><p>Seu treino está pronto para hoje.</p></div>
              <div className="app-ui__hero-card">
                <div className="app-ui__hero-top"><span><Dumbbell size={15} /> TREINO DE HOJE</span><i><Play size={14} fill="currentColor" /></i></div>
                <h4>Inferiores A</h4>
                <div className="app-ui__meta"><span><Clock3 size={12} /> 46 min</span><span>6 exercícios</span></div>
                <div className="app-ui__progress"><i /></div>
                <small>Pronta para começar</small>
              </div>
              <div className="app-ui__section-line"><strong>Seu ritmo</strong><span>Esta semana</span></div>
              <div className="app-ui__week" aria-hidden="true">
                {['S', 'T', 'Q', 'Q', 'S'].map((day, index) => <span className={index < 3 ? 'is-done' : index === 3 ? 'is-current' : ''} key={`${day}-${index}`}>{day}<i>{index < 3 ? <Check size={9} /> : index + 2}</i></span>)}
              </div>
            </>
          ) : (
            <>
              <div className="app-ui__plan-head"><small>SUA DIETA</small><h3>Plano alimentar,<br /><em>sempre à mão.</em></h3></div>
              <div className="app-ui__calendar">
                <div><span><UtensilsCrossed size={15} /></span><p><small>PLANO DO DIA</small><strong>Dieta personalizada</strong></p><ChevronRight size={16} /></div>
                <div className="app-ui__calendar-progress"><i /></div>
                <small>Próxima refeição: almoço</small>
              </div>
              <div className="app-ui__section-line"><strong>Refeições de hoje</strong><span>Ver dieta</span></div>
              <div className="app-ui__workouts">
                <article><span className="is-complete"><CheckCircle2 size={16} /></span><p><strong>Café da manhã</strong><small>Concluído</small></p><ChevronRight size={15} /></article>
                <article><span><UtensilsCrossed size={16} /></span><p><strong>Almoço</strong><small>Próxima refeição</small></p><ChevronRight size={15} /></article>
                <article><span><UtensilsCrossed size={16} /></span><p><strong>Lanche da tarde</strong><small>Mais tarde</small></p><ChevronRight size={15} /></article>
              </div>
            </>
          )}

          <nav className="app-ui__nav" aria-hidden="true"><span className="is-active"><i />Início</span><span><i />Treinos</span><span><i />Dieta</span></nav>
        </div>
      </div>
    </div>
  )
}

function AppDashboard() {
  const menu = [
    { label: 'Visão geral', icon: <BarChart3 size={16} /> },
    { label: 'Meu treino', icon: <Dumbbell size={16} /> },
    { label: 'Plano alimentar', icon: <UtensilsCrossed size={16} /> },
    { label: 'Agenda', icon: <CalendarDays size={16} /> },
    { label: 'Mensagens', icon: <MessageCircle size={16} /> },
  ]

  return (
    <div className="app-dashboard" aria-label="Tela completa ilustrativa do aplicativo da consultoria">
      <header className="app-dashboard__topbar">
        <div className="app-dashboard__brand"><img src="/assets/media/igor-logo-gold.png" alt="" /><span><small>CONSULTORIA</small><strong>Ígor Souza</strong></span></div>
        <div className="app-dashboard__actions"><span><Bell size={15} /></span><i>IS</i></div>
      </header>

      <div className="app-dashboard__body">
        <aside className="app-dashboard__sidebar">
          <p>SEU ACOMPANHAMENTO</p>
          <nav>{menu.map((item, index) => <span className={index === 0 ? 'is-active' : ''} key={item.label}>{item.icon}{item.label}</span>)}</nav>
          <div><small>PROGRESSO DO MÊS</small><strong>82%</strong><span><i /></span><p>Você está no caminho certo.</p></div>
        </aside>

        <main className="app-dashboard__content">
          <div className="app-dashboard__welcome">
            <span><small>SEGUNDA, 12 DE SETEMBRO</small><h3>Boa tarde, Mariana.</h3><p>Seu plano de hoje está pronto.</p></span>
            <button type="button"><MessageCircle size={15} /> Falar com o Ígor</button>
          </div>

          <div className="app-dashboard__metrics">
            <article><span><Dumbbell size={16} /></span><p><small>TREINOS NA SEMANA</small><strong>3 <i>/ 5</i></strong></p></article>
            <article><span><UtensilsCrossed size={16} /></span><p><small>PLANO ALIMENTAR</small><strong>75%</strong></p></article>
            <article><span><BarChart3 size={16} /></span><p><small>EVOLUÇÃO</small><strong>+8%</strong></p></article>
          </div>

          <div className="app-dashboard__grid">
            <section className="app-dashboard__workout">
              <div className="app-dashboard__section-head"><span><small>TREINO DE HOJE</small><strong>Inferiores A</strong></span><i><Play size={15} fill="currentColor" /></i></div>
              <div className="app-dashboard__workout-meta"><span><Clock3 size={13} /> 46 min</span><span>6 exercícios</span><span>Nível intermediário</span></div>
              <ol>
                <li><b>01</b><span><strong>Agachamento livre</strong><small>4 séries · 10 repetições</small></span><CheckCircle2 size={17} /></li>
                <li><b>02</b><span><strong>Leg press 45°</strong><small>4 séries · 12 repetições</small></span><span className="is-current">Em andamento</span></li>
                <li><b>03</b><span><strong>Cadeira extensora</strong><small>3 séries · 15 repetições</small></span><ChevronRight size={17} /></li>
              </ol>
            </section>

            <section className="app-dashboard__diet">
              <div className="app-dashboard__section-head"><span><small>PLANO ALIMENTAR</small><strong>Próximas refeições</strong></span><UtensilsCrossed size={17} /></div>
              <article><span>12:30</span><p><strong>Almoço</strong><small>Proteína, carboidrato e salada</small></p><ChevronRight size={15} /></article>
              <article><span>16:00</span><p><strong>Lanche da tarde</strong><small>Refeição planejada</small></p><ChevronRight size={15} /></article>
              <div className="app-dashboard__coach"><img src="/assets/media/igor-logo-gold.png" alt="" /><p><small>ORIENTAÇÃO DO ÍGOR</small><strong>“Mantenha o ritmo. Seu progresso está consistente.”</strong></p></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export function AppExperience() {
  return (
    <section className="app-chapter paper-section" id="aplicativo">
      <ContainerScroll
        titleComponent={
          <div className="app-scroll-title">
            <span className="section-eyebrow">Aplicativo da consultoria</span>
            <h2>Seu plano inteiro,<br /><em>sempre à mão.</em></h2>
            <p>Acesse seu treino, sua dieta, sua evolução e as orientações do Ígor em uma única tela — tudo organizado para a sua rotina.</p>
          </div>
        }
      >
        <div className="app-scroll-showcase app-scroll-showcase--dashboard">
          <AppDashboard />
          <small className="app-scroll-showcase__note">Interface ilustrativa do aplicativo</small>
        </div>
      </ContainerScroll>
    </section>
  )
}

const resultSlides: ResultShowcaseSlide[] = [
  { src: '/assets/media/result-before-after-02.png', alt: 'Comparativo lateral de evolução corporal enviado por uma aluna' },
  { src: '/assets/media/result-before-after-01.png', alt: 'Comparativo de evolução corporal enviado por uma aluna' },
  { src: '/assets/media/result-before-after-03.png', alt: 'Comparativo de evolução física em ambiente de academia' },
  { src: '/assets/media/result-before-after-04.png', alt: 'Comparativo lateral de composição corporal' },
  { src: '/assets/media/result-before-after-05.png', alt: 'Comparativo de evolução de definição e massa muscular' },
]

export function Method() {
  return (
    <section className="results results-redesign" id="resultados">
      <div className="results-redesign__shell">
        <motion.header className="results-redesign__header" {...reveal}>
          <div>
            <span className="results-redesign__eyebrow">Resultados reais</span>
            <h2>Veja o que acontece quando existe <em>direção em cada etapa.</em></h2>
          </div>
          <div className="results-redesign__intro">
            <p>Histórias de mulheres que deixaram as tentativas soltas para seguir um plano desenhado, acompanhado e ajustado para elas.</p>
            <a className="results-redesign__cta" href={consultationUrl} target="_blank" rel="noreferrer">
              <span>Quero construir meu resultado</span>
              <i><ArrowUpRight size={18} strokeWidth={1.8} /></i>
            </a>
          </div>
        </motion.header>

        <motion.div className="results-redesign__gallery" {...reveal}>
          <ResultsShowcase slides={resultSlides} />
        </motion.div>

        <small className="results-redesign__note">Resultados individuais variam conforme contexto, adesão e continuidade.</small>
      </div>
    </section>
  )
}

const programs = [
  { title: 'Hipertrofia', image: '/assets/media/program-hypertrophy-result-green-v2.png', alt: 'Antes e depois de aluna que ganhou 7,5 kg em um processo de hipertrofia', text: 'Treino progressivo para aumentar massa muscular, força e volume de forma planejada.' },
  { title: 'Emagrecimento', image: '/assets/media/program-weightloss-result-green-v2.png', alt: 'Antes e depois de aluna que eliminou 12 kg em um processo de emagrecimento', text: 'Treino e dieta ajustados para reduzir gordura sem depender de uma rotina impossível de manter.' },
]

export function Programs() {
  return (
    <section className="programs programs-redesign" id="metodo">
      <div className="programs-redesign__shell">
        <motion.header className="programs-redesign__header" {...reveal}>
          <div>
            <h2>Hipertrofia<br /><em>ou emagrecimento.</em></h2>
          </div>
          <p>O ponto de partida muda. A meta também. Por isso, treino e alimentação são definidos para o seu corpo e para a rotina que você realmente consegue cumprir.</p>
        </motion.header>

        <div className="programs-redesign__grid">
          {programs.map((program, index) => (
            <motion.article key={program.title} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}>
              <div className="programs-redesign__image"><img src={program.image} alt={program.alt} /></div>
              <div className="programs-redesign__copy">
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <a href={consultationUrl} target="_blank" rel="noreferrer">Quero um plano para este objetivo <i><ArrowUpRight size={17} /></i></a>
              </div>
            </motion.article>
          ))}
        </div>

        <small className="programs-redesign__note">O treino e a dieta são definidos após a análise do seu objetivo, rotina e histórico.</small>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="about about-redesign dark-section" id="sobre">
      <div className="about-redesign__shell">
        <div className="about-redesign__visual">
          <motion.figure
            className="about-redesign__main-image"
            initial={{ opacity: 0, x: -36, scale: .97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: .12 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/assets/media/igor-tablet-concept.jpg" alt="Ígor Souza analisando um plano em um tablet" />
          </motion.figure>
          <motion.figure
            className="about-redesign__secondary-image"
            initial={{ opacity: 0, x: 45, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true, amount: .12 }}
            transition={{ duration: .9, delay: .28, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/assets/media/igor-bench-concept.jpg" alt="Ígor Souza sentado em um estúdio de treinamento" />
          </motion.figure>
          <div className="about-redesign__logo"><span aria-hidden="true" /><img src="/assets/media/igor-logo-gold.png" alt="Marca Ígor Souza" /></div>
        </div>
        <motion.div className="about-redesign__copy" {...reveal}>
          <h2>Conheça <em>Ígor Souza.</em></h2>
          <p>Farmacêutico, nutricionista e coach bodybuilder. Ígor une saúde, treinamento e nutrição para transformar objetivos estéticos em estratégias que funcionam fora do papel.</p>
          <blockquote>“O plano precisa respeitar o seu corpo, a sua rotina e o resultado que você quer construir.”</blockquote>
          <div className="about-redesign__credentials">
            <span><strong>1.000+</strong><small>pessoas acompanhadas</small></span>
            <span><strong>Saúde + performance</strong><small>visão integrada do processo</small></span>
          </div>
          <a className="about-redesign__cta" href={consultationUrl} target="_blank" rel="noreferrer">
            <span>Quero ser acompanhado pelo Ígor</span><i><ArrowUpRight size={18} strokeWidth={1.8} /></i>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export function PositioningStrip() {
  const message = 'TREINO PERSONALIZADO  ·  DIETA NO APLICATIVO  ·  ACOMPANHAMENTO INDIVIDUAL  ·  AJUSTES PERIÓDICOS  ·  '
  return (
    <div className="positioning-strip" aria-label="Treino personalizado, dieta no aplicativo, acompanhamento individual e ajustes periódicos">
      <div>{message.repeat(4)}</div>
    </div>
  )
}

const testimonials: Testimonial[] = [
  {
    label: 'Resultado e consistência',
    text: 'Surreal o resultado depois que comecei o acompanhamento e segui a dieta. O que mais me incomodava era a barriga, e está ficando exatamente como eu queria. Obrigada, você é demais!',
    name: 'Aluna da consultoria',
    role: 'Emagrecimento e definição',
    avatar: { image: '/assets/media/testimonial-01.png', size: '465px 310px', position: '-15px -272px' },
  },
  {
    label: 'Evolução percebida',
    text: 'Estou sentindo que estou reduzindo medidas. As roupas estão ficando muito mais folgadas. Fiz o treino cedo e foi bom demais — senti muito o glúteo e o quadríceps!',
    name: 'Tauane Vieira',
    role: 'Treino personalizado',
    avatar: { image: '/assets/media/testimonial-02.png', size: '387px 435px', position: '-83px -3px' },
  },
  {
    label: 'Orientação individual',
    text: 'Obrigada, sem você isso não seria possível. Você dá muita assistência e, com a sua orientação, os resultados vêm rápido.',
    name: 'Aluna da consultoria',
    role: 'Acompanhamento individual',
    avatar: { image: '/assets/media/testimonial-03.png', size: '431px 157px', position: '-15px -120px' },
  },
  {
    label: 'Confiança no processo',
    text: 'No início, achei que consultoria online não fosse para mim. Hoje, com resultado no corpo e confiança, posso dizer: valeu cada treino, cada ajuste e cada passo. Você acreditou em mim antes mesmo de eu enxergar meu potencial.',
    name: 'Marília',
    role: 'Evolução física e confiança',
    avatar: { image: '/assets/media/testimonial-04.png', size: '417px 392px', position: '-8px 0' },
  },
  {
    label: 'Progresso acompanhado',
    text: 'Olhei e chorei. Às vezes é difícil enxergarmos o nosso resultado pelos nossos próprios olhos. Obrigada, Ígor, por tudo. Sou grata todos os dias por poder contar com você nesse processo.',
    name: 'Heloizy',
    role: 'Preparação e performance',
    avatar: { image: '/assets/media/testimonial-05.png', size: '430px 206px', position: '-8px 0' },
  },
  {
    label: 'Suporte de verdade',
    text: 'Gratidão demais por você estar me ajudando a confiar no meu processo. Você merece todo o mérito e respeito. Ainda temos muito mais pela frente. Tamo junto sempre, mestre!',
    name: 'Juliana',
    role: 'Acompanhamento e confiança',
    avatar: { image: '/assets/media/testimonial-06.png', size: '417px 130px', position: '-7px 0' },
  },
]

export function Process() {
  return (
    <section className="testimonials dark-section" id="depoimentos">
      <motion.div className="section-title dark" {...reveal}>
        <span className="section-eyebrow light">Depoimentos reais</span>
        <h2>O acompanhamento aparece no que <em>elas contam.</em></h2>
        <p>Mensagens enviadas durante o processo sobre os treinos, o suporte recebido e os resultados alcançados.</p>
      </motion.div>
      <motion.div className="testimonials-columns" {...reveal}>
        <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={16} />
        <TestimonialsColumn testimonials={testimonials.slice(2, 4)} duration={20} className="testimonials-column--second" />
        <TestimonialsColumn testimonials={testimonials.slice(4, 6)} duration={18} className="testimonials-column--third" />
      </motion.div>
    </section>
  )
}

const faqs = [
  ['O aplicativo está incluso na consultoria?', 'Sim. Todos os alunos recebem acesso ao aplicativo usado para acompanhar o treino e a dieta.'],
  ['O treino e a dieta são personalizados?', 'Sim. O planejamento é definido após a análise do seu objetivo, rotina, histórico e nível de treinamento.'],
  ['O que acontece depois que envio o formulário?', 'Ígor analisa suas respostas. Se houver uma vaga adequada ao seu perfil, você recebe o contato com os próximos passos.'],
  ['A aplicação garante uma vaga?', 'Não. A aplicação é o primeiro passo para avaliar se o momento e o perfil combinam com a proposta.'],
  ['Quanto tempo leva para preencher?', 'O formulário de aplicação leva menos de três minutos.'],
]

const applicationSteps = [
  ['Conte sobre você', 'Preencha o formulário com seu objetivo, rotina e momento atual.'],
  ['Receba uma análise', 'Ígor avalia seu perfil e entra em contato se houver uma vaga adequada.'],
  ['Comece seu plano', 'Treino, dieta, aplicativo e acompanhamento são organizados para você.'],
]

export function Application() {
  return (
    <section className="consultation-guide" id="como-funciona">
      <div className="consultation-guide__shell">
        <motion.header className="consultation-guide__header" {...reveal}>
          <h2>O caminho para entrar na consultoria, <em>sem complicação.</em></h2>
          <p>Três etapas para Ígor entender seu momento e avaliar se a consultoria é adequada para você.</p>
        </motion.header>

        <div className="consultation-guide__body">
          <motion.div className="consultation-guide__steps" {...reveal}>
            <ol>
              {applicationSteps.map(([title, text], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><strong>{title}</strong><p>{text}</p></div>
                  <Check size={16} />
                </li>
              ))}
            </ol>
            <a href={consultationUrl} target="_blank" rel="noreferrer">Preencher minha aplicação <i><ArrowUpRight size={18} /></i></a>
          </motion.div>

          <motion.div className="consultation-guide__faq" id="duvidas" {...reveal}>
            <span>Dúvidas frequentes</span>
            <div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <>
      <section className="closing closing-redesign dark-section">
        <img src="/assets/media/igor-hero-background-mobile-fitness-v2.webp" alt="Academia com iluminação sofisticada" />
        <div className="closing-shade" />
        <motion.div className="closing-copy" {...reveal}>
          <img src="/assets/media/igor-logo-gold.png" alt="" />
          <span>O próximo passo é seu</span>
          <h2>Seu resultado começa com <em>uma decisão.</em></h2>
          <p>Conte ao Ígor onde você está e o que quer construir. A aplicação leva menos de três minutos.</p>
          <a className="closing-redesign__cta" href={consultationUrl} target="_blank" rel="noreferrer">
            <span>Preencher aplicação agora</span><i><ArrowUpRight size={20} /></i>
          </a>
          <small>Leva menos de 3 minutos. O envio da aplicação não garante vaga.</small>
        </motion.div>
      </section>

      <footer className="footer dark-section">
        <div className="brand"><img className="brand-logo" src="/assets/media/igor-logo-gold.png" alt="Ígor Souza" /></div>
        <nav><a href="#aplicativo">Aplicativo</a><a href="#metodo">Método</a><a href="#acompanhamento">Acompanhamento</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav>
        <a href="https://www.instagram.com/igorsouza.es/" target="_blank" rel="noreferrer"><Instagram size={17} /><span>Instagram</span><ArrowUpRight size={14} /></a>
      </footer>
    </>
  )
}
