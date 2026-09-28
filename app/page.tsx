import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const roles = [
  {
    number: "01",
    title: "Developer",
    description: "Siapkan pengujian Android, atur kebutuhan tester, lalu ikuti progres dan feedback dalam satu alur.",
    href: "/developer/dashboard",
    label: "Buka workspace developer",
    icon: Layers3,
    tint: "violet",
  },
  {
    number: "02",
    title: "Tester",
    description: "Temukan aplikasi yang sesuai, selesaikan misi dengan panduan yang jelas, dan pantau reward tervalidasi.",
    href: "/tester/dashboard",
    label: "Buka workspace tester",
    icon: Users,
    tint: "pink",
  },
  {
    number: "03",
    title: "Admin",
    description: "Tinjau aktivitas platform, tindak lanjuti laporan, dan pantau operasional pengujian.",
    href: "/admin/dashboard",
    label: "Buka workspace admin",
    icon: ShieldCheck,
    tint: "blue",
  },
];

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="landing-hero" aria-labelledby="hero-title">
        <header className="landing-nav">
          <Link href="/" className="landing-brand" aria-label="PlayTest ID, beranda">
            <span className="landing-brand__mark"><span /><span /><span /></span>
            <span>playtest<span className="landing-brand__id">id</span></span>
          </Link>
          <nav className="landing-nav__links" aria-label="Navigasi utama">
            <a href="#cara-kerja">Cara kerja</a>
            <a href="#peran">Untuk siapa</a>
          </nav>
          <Link className="landing-nav__action" href="/developer/dashboard">Masuk workspace <ArrowUpRight size={16} /></Link>
        </header>

        <div className="landing-hero__inner">
          <div className="landing-copy">
            <p className="landing-eyebrow"><Sparkles size={15} /> PLATFORM PENGUJIAN ANDROID</p>
            <h1 id="hero-title">Aplikasi lebih siap.<br /><span>Pengujian lebih terarah.</span></h1>
            <p className="landing-copy__lead">Hubungkan developer dan tester dalam satu siklus kerja yang jelas—dari persiapan aplikasi sampai insight yang bisa ditindaklanjuti.</p>
            <div className="landing-copy__actions">
              <Link className="landing-button landing-button--primary" href="/developer/dashboard">Jelajahi workspace <ArrowRight size={17} /></Link>
              <a className="landing-button landing-button--quiet" href="#cara-kerja">Lihat cara kerja <ArrowDown size={16} /></a>
            </div>
            <div className="landing-proof" aria-label="Fokus platform">
              <span><CircleCheck size={16} /> Misi terstruktur</span>
              <span><CircleCheck size={16} /> Progres transparan</span>
              <span><CircleCheck size={16} /> Feedback kontekstual</span>
            </div>
          </div>

          <div className="landing-visual" aria-label="Ilustrasi dashboard pengujian demo">
            <div className="landing-orbit landing-orbit--outer" />
            <div className="landing-orbit landing-orbit--inner" />
            <div className="preview-window">
              <div className="preview-window__top"><div className="preview-dots"><i /><i /><i /></div><span>WORKSPACE DEVELOPER</span><span className="preview-avatar">PT</span></div>
              <div className="preview-window__body">
                <div className="preview-heading"><span><small>RINGKASAN PENGUJIAN</small><strong>Siklus aplikasi</strong></span><button type="button" aria-label="Menu contoh"><span /><span /><span /></button></div>
                <div className="preview-project">
                  <span className="preview-project__icon"><Layers3 size={20} /></span>
                  <span className="preview-project__name"><strong>Proyek pengujian</strong><small>Contoh tampilan · Demo</small></span>
                  <span className="preview-status"><i /> Berjalan</span>
                </div>
                <div className="preview-cycle" aria-label="Tahapan contoh pengujian">
                  <div className="is-done"><span><Check size={12} /></span><small>Persiapan</small></div>
                  <i /><div className="is-done"><span><Check size={12} /></span><small>Tester</small></div>
                  <i /><div className="is-active"><span>3</span><small>Misi</small></div>
                  <i /><div><span>4</span><small>Review</small></div>
                </div>
                <div className="preview-progress"><div><span>Progres siklus demo</span><strong>68%</strong></div><span className="preview-progress__track"><i /></span></div>
                <div className="preview-bottom"><div><span className="preview-bottom__icon preview-bottom__icon--pink"><Users size={16} /></span><span><small>Tester aktif</small><strong>Dalam satu alur</strong></span></div><div><span className="preview-bottom__icon preview-bottom__icon--blue"><Clock3 size={16} /></span><span><small>Tahap berjalan</small><strong>Terpantau</strong></span></div></div>
              </div>
              <div className="preview-caption"><span><Sparkles size={14} /> Satu siklus, tiga perspektif</span><ChevronRight size={15} /></div>
            </div>
            <div className="floating-note"><span className="floating-note__check"><Check size={15} /></span><span><strong>Feedback tertata</strong><small>Terkait dengan konteks misi</small></span></div>
            <div className="landing-visual__label">CONTOH ANTARMUKA · DATA DEMO</div>
          </div>
        </div>
        <a href="#cara-kerja" className="landing-scroll" aria-label="Gulir untuk melihat cara kerja"><span /> Gulir untuk mengenal PlayTest ID</a>
      </section>

      <section className="landing-how" id="cara-kerja" aria-labelledby="how-title">
        <div className="landing-section-heading"><p className="landing-eyebrow">SATU ALUR YANG TERHUBUNG</p><h2 id="how-title">Dari persiapan sampai insight.</h2><p>Setiap peran tahu apa yang perlu dilakukan berikutnya—dan bagaimana hasilnya membantu siklus pengujian.</p></div>
        <div className="landing-flow"><div><span>01</span><strong>Siapkan pengujian</strong><p>Developer menentukan aplikasi, target tester, dan misi.</p></div><i /><div><span>02</span><strong>Jalankan misi</strong><p>Tester menguji aplikasi dengan arahan yang terukur.</p></div><i /><div><span>03</span><strong>Tinjau hasil</strong><p>Feedback dan laporan membantu tim mengambil langkah berikutnya.</p></div></div>
      </section>

      <section className="landing-roles" id="peran" aria-labelledby="roles-title">
        <div className="landing-section-heading"><p className="landing-eyebrow">DIRANCANG UNTUK SETIAP PERAN</p><h2 id="roles-title">Pilih workspace untuk memulai.</h2></div>
        <div className="landing-role-grid">{roles.map((role) => {
          const Icon = role.icon;
          return <article className={`landing-role landing-role--${role.tint}`} key={role.title}>
            <div className="landing-role__top"><span className="landing-role__icon"><Icon size={20} /></span><span>{role.number}</span></div>
            <h3>{role.title}</h3><p>{role.description}</p>
            <Link href={role.href} aria-label={role.label}>Buka workspace <ArrowUpRight size={17} /></Link>
          </article>;
        })}</div>
      </section>

      <footer className="landing-footer"><Link href="/" className="landing-brand"><span className="landing-brand__mark"><span /><span /><span /></span><span>playtest<span className="landing-brand__id">id</span></span></Link><span>Platform pengujian aplikasi Android.</span><span>© 2026 PlayTest ID · Prototype</span></footer>
    </main>
  );
}
