"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Bell,
  BookOpenCheck,
  Bug,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  FileCheck2,
  FileClock,
  FilePlus2,
  Filter,
  Flag,
  FolderKanban,
  Gift,
  Headphones,
  History,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  Upload,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type Role = "developer" | "tester" | "admin";
type NavEntry = { section: string; label: string; icon: LucideIcon };

const roleInfo: Record<Role, { label: string; detail: string; initials: string }> = {
  developer: { label: "Developer", detail: "Workspace aplikasi", initials: "DV" },
  tester: { label: "Tester", detail: "Misi & pengujian", initials: "TS" },
  admin: { label: "Admin", detail: "Control center", initials: "AD" },
};

const navByRole: Record<Role, NavEntry[]> = {
  developer: [
    { section: "dashboard", label: "Beranda", icon: LayoutDashboard },
    { section: "projects", label: "Pengujian", icon: FolderKanban },
    { section: "create-test", label: "Buat pengujian", icon: FilePlus2 },
    { section: "history", label: "Riwayat", icon: History },
    { section: "profile", label: "Profil & pengaturan", icon: Settings2 },
  ],
  tester: [
    { section: "dashboard", label: "Beranda", icon: LayoutDashboard },
    { section: "explore", label: "Eksplorasi", icon: Search },
    { section: "my-tests", label: "Pengujian saya", icon: ListChecks },
    { section: "rewards", label: "Poin & reward", icon: Gift },
    { section: "profile", label: "Profil", icon: Settings2 },
  ],
  admin: [
    { section: "dashboard", label: "Beranda", icon: LayoutDashboard },
    { section: "users", label: "Pengguna", icon: Users },
    { section: "apps-tests", label: "Aplikasi & pengujian", icon: Smartphone },
    { section: "transactions", label: "Transaksi & keuangan", icon: Banknote },
    { section: "tickets", label: "Laporan & keluhan", icon: TicketCheck },
    { section: "rewards", label: "Reward", icon: Gift },
    { section: "settings", label: "Pengaturan platform", icon: Settings2 },
  ],
};

const sectionTitles: Record<string, string> = {
  dashboard: "Beranda",
  projects: "Proyek pengujian",
  "create-test": "Buat pengujian baru",
  "project-detail": "Detail pengujian",
  history: "Riwayat aktivitas",
  explore: "Aplikasi tersedia",
  "app-detail": "Detail aplikasi",
  "my-tests": "Pengujian saya",
  mission: "Misi pengujian",
  rewards: "Poin & reward",
  profile: "Profil & keamanan",
  users: "Manajemen pengguna",
  "apps-tests": "Aplikasi & pengujian",
  transactions: "Transaksi & keuangan",
  tickets: "Laporan & keluhan",
  settings: "Pengaturan platform",
};

const testProjects = [
  { name: "Demo Aurora", version: "v2.4.0 · Android 12+", code: "PT-DEMO-024", testers: "18 / 24", progress: 72, state: "Sedang berjalan", tone: "active", updated: "Aktivitas demo · 09.42" },
  { name: "Demo Katalog", version: "v1.8.2 · Android 10+", code: "PT-DEMO-019", testers: "12 / 20", progress: 54, state: "Rekrutmen", tone: "recruiting", updated: "Aktivitas demo · 08.16" },
  { name: "Demo Perjalanan", version: "v3.1.0 · Android 11+", code: "PT-DEMO-011", testers: "20 / 20", progress: 100, state: "Perlu ditinjau", tone: "review", updated: "Aktivitas demo · kemarin" },
];

const missionApps = [
  { name: "Demo Aurora", category: "Produktivitas", reward: "Reward mengikuti konfigurasi", slots: "6 slot tersedia", duration: "14 hari · demo", accent: "coral", icon: Smartphone },
  { name: "Demo Katalog", category: "Belanja", reward: "Reward mengikuti konfigurasi", slots: "8 slot tersedia", duration: "10 hari · demo", accent: "teal", icon: BookOpenCheck },
  { name: "Demo Perjalanan", category: "Transportasi", reward: "Reward mengikuti konfigurasi", slots: "Kuota penuh", duration: "7 hari · demo", accent: "yellow", icon: Flag },
];

const issueRows = [
  { id: "BUG-DEMO-08", title: "Tombol lanjut tidak merespons", project: "Demo Aurora · Misi hari 3", severity: "Tinggi", status: "Perlu ditinjau", tone: "review" },
  { id: "BUG-DEMO-06", title: "Ringkasan belum diperbarui", project: "Demo Katalog · Feedback", severity: "Sedang", status: "Dalam proses", tone: "active" },
];

const demoActivities = [
  { title: "Sesi misi dikirim untuk validasi", meta: "Demo Aurora · Tester demo", time: "09.42", icon: CheckCheck },
  { title: "Laporan bug baru masuk", meta: "Demo Aurora · BUG-DEMO-08", time: "09.18", icon: Bug },
  { title: "Proyek memasuki tahap rekrutmen", meta: "Demo Katalog · PT-DEMO-019", time: "08.16", icon: Users },
];

const appUsers = [
  { name: "Raka Pradana", email: "raka.demo@example.test", role: "Tester", status: "Aktif", initials: "RP" },
  { name: "Nadia Putri", email: "nadia.demo@example.test", role: "Developer", status: "Menunggu verifikasi", initials: "NP" },
  { name: "Dimas Wicaksono", email: "dimas.demo@example.test", role: "Tester", status: "Ditangguhkan", initials: "DW" },
  { name: "Mira Santoso", email: "mira.demo@example.test", role: "Developer", status: "Aktif", initials: "MS" },
];

function target(role: Role, section: string) {
  return `/${role}/${section}`;
}

function normalizeRole(value: string): Role {
  return value === "tester" || value === "admin" ? value : "developer";
}

function StatusTag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-tag status-tag--${tone}`}><span className="status-dot" aria-hidden="true" />{children}</span>;
}

function Heading({ title, description, actions }: { title: string; description?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="page-heading">
      <div><h1>{title}</h1>{description && <p>{description}</p>}</div>
      {actions && <div className="page-heading__actions">{actions}</div>}
    </div>
  );
}

function SectionHead({ title, detail, href, linkLabel = "Lihat semua" }: { title: string; detail?: string; href?: string; linkLabel?: string }) {
  return <div className="section-head"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{href && <Link className="text-link" href={href}>{linkLabel}<ArrowRight size={15} /></Link>}</div>;
}

function Button({ children, variant = "primary", icon: Icon, type = "button", onClick, disabled, className = "" }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "quiet" | "danger"; icon?: LucideIcon; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean; className?: string;
}) {
  return <button type={type} className={`button button--${variant} ${className}`} onClick={onClick} disabled={disabled}>{Icon && <Icon size={16} strokeWidth={1.8} />}{children}</button>;
}

function DemoNotice() {
  return <div className="demo-notice" role="note"><Sparkles size={14} aria-hidden="true" /><span><strong>Mode demo.</strong> Akun dan aktivitas di layar ini bersifat ilustratif; aksi tidak tersimpan ke server.</span></div>;
}

function RunSheet({ active = 2 }: { active?: number }) {
  const steps = ["Persiapan", "Rekrutmen", "Sesi misi", "Validasi", "Laporan"];
  return (
    <div className="runsheet" aria-label={`Tahap pengujian: ${steps[active - 1]}`}>
      {steps.map((step, i) => <div className={`runsheet__step ${i + 1 < active ? "is-done" : ""} ${i + 1 === active ? "is-active" : ""}`} key={step}>
        <span className="runsheet__mark" aria-hidden="true">{i + 1 < active ? <Check size={12} /> : String(i + 1).padStart(2, "0")}</span>
        <span className="runsheet__label">{step}</span>
      </div>)}
    </div>
  );
}

function Meter({ value, label, tone = "coral" }: { value: number; label: string; tone?: string }) {
  return <div className="meter-wrap"><div className="meter-label"><span>{label}</span><strong>{value}%</strong></div><div className={`meter meter--${tone}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><span style={{ "--meter-progress": value / 100 } as React.CSSProperties} /></div></div>;
}

function DataStrip({ items }: { items: { label: string; value: string; note: string; tone?: string }[] }) {
  return <div className="data-strip">{items.map((item) => <div className="data-strip__item" key={item.label}><span>{item.label}</span><strong className={item.tone ? `ink-${item.tone}` : ""}>{item.value}</strong><small>{item.note}</small></div>)}</div>;
}

function Avatar({ initials, tone = "blue" }: { initials: string; tone?: string }) {
  return <span className={`avatar avatar--${tone}`} aria-hidden="true">{initials}</span>;
}

function ActivityList({ compact = false }: { compact?: boolean }) {
  return <ol className={`activity-list ${compact ? "activity-list--compact" : ""}`}>{demoActivities.map((item) => <li key={item.title}>
    <span className="activity-list__icon"><item.icon size={15} /></span><div><strong>{item.title}</strong><small>{item.meta}</small></div><time>{item.time}</time>
  </li>)}</ol>;
}

function ProjectRows({ filter = "Semua" }: { filter?: string }) {
  const visible = filter === "Semua" ? testProjects : testProjects.filter((project) => project.state === filter);
  return <div className="project-list">{visible.length ? visible.map((project) => <Link className="project-row" href="/developer/project-detail" key={project.code}>
    <span className="project-row__app"><span className="app-glyph"><Smartphone size={19} /></span><span><strong>{project.name}</strong><small>{project.version} <span className="mono">· {project.code}</span></small></span></span>
    <span className="project-row__count"><strong>{project.testers}</strong><small>tester</small></span>
    <span className="project-row__progress"><Meter value={project.progress} label="Progres proyek" /></span>
    <span className="project-row__state"><StatusTag tone={project.tone}>{project.state}</StatusTag><small>{project.updated}</small></span>
    <ChevronRight className="project-row__arrow" size={17} aria-hidden="true" />
  </Link>) : <div className="empty-state"><FileCheck2 size={22} /><strong>Belum ada proyek pada status ini</strong><span>Ubah filter untuk melihat daftar lain.</span></div>}</div>;
}

function IncidentList({ rows = issueRows }: { rows?: typeof issueRows }) {
  return <div className="incident-list">{rows.map((issue) => <Link href="/developer/project-detail" className="incident-slip" key={issue.id}>
    <span className={`incident-slip__symbol incident-slip__symbol--${issue.tone}`}><Bug size={17} /></span>
    <span className="incident-slip__body"><span className="incident-slip__id mono">{issue.id} · {issue.severity}</span><strong>{issue.title}</strong><small>{issue.project}</small></span>
    <ChevronRight size={16} />
  </Link>)}</div>;
}

function DeveloperDashboard() {
  return <>
    <Heading title="Ringkasan pengujian" description="Lihat siklus yang berjalan dan tentukan cue berikutnya." actions={<Link className="button button--primary" href="/developer/create-test"><FilePlus2 size={16} />Buat pengujian baru</Link>} />
    <DemoNotice />
    <RunSheet active={3} />
    <DataStrip items={[
      { label: "Pengujian aktif", value: "04", note: "data demo", tone: "blue" },
      { label: "Menunggu review", value: "02", note: "data demo", tone: "coral" },
      { label: "Tester terdaftar", value: "86", note: "lintas proyek · demo" },
      { label: "Sesi perlu dicek", value: "03", note: "data demo", tone: "coral" },
    ]} />
    <div className="dashboard-columns">
      <section className="work-section"><SectionHead title="Run sheet aktif" detail="Proyek terbaru dan tahap yang sedang berjalan." href="/developer/projects" /><ProjectRows /></section>
      <aside className="side-work"><SectionHead title="Slip insiden" detail="Feedback dan bug untuk ditindaklanjuti." href="/developer/project-detail" linkLabel="Buka antrean" /><IncidentList /></aside>
    </div>
    <section className="lower-section"><SectionHead title="Catatan aktivitas" detail="Peristiwa terbaru lintas pengujian." href="/developer/history" /><ActivityList compact /></section>
  </>;
}

function TesterDashboard({ onToast, missionDone, onMissionDone }: { onToast: (value: string) => void; missionDone: boolean; onMissionDone: () => void }) {
  return <>
    <Heading title="Beranda tester" description="Satu misi yang jelas. Satu sesi yang tervalidasi." actions={<Link href="/tester/explore" className="button button--secondary"><Search size={16} />Cari pengujian</Link>} />
    <DemoNotice />
    <section className="tester-hero">
      <div className="tester-hero__top"><span className="field-label"><span className="live-dot" />PENGUJIAN BERJALAN · DEMO</span><StatusTag tone="active">Hari 3 dari 14</StatusTag></div>
      <div className="tester-hero__body"><div className="tester-hero__copy"><h2>Demo Aurora</h2><p>Uji alur simpan dan temukan item dari halaman utama aplikasi.</p><div className="tester-hero__meta"><span><Smartphone size={15} />Android 12+</span><span><Clock3 size={15} />Durasi demo 14 hari</span></div></div>
        <div className="mission-cue"><div className="mission-cue__index"><span>CUE HARI INI</span><strong>03</strong></div><div className="mission-cue__content"><h3>{missionDone ? "Sesi misi terkirim" : "Jalankan alur simpan item"}</h3><p>{missionDone ? "Status ini hanya tersimpan sementara di tampilan demo." : "Buka aplikasi demo, simpan satu item, lalu konfirmasi hasil sesi."}</p><div className="mission-cue__actions"><Button icon={missionDone ? CheckCircle2 : ArrowRight} onClick={() => { if (!missionDone) { onMissionDone(); onToast("Sesi misi ditandai selesai pada tampilan demo."); } }} variant={missionDone ? "secondary" : "primary"}>{missionDone ? "Terkirim · demo" : "Mulai misi"}</Button><Link href="/tester/mission" className="text-link">Lihat panduan<ChevronRight size={14} /></Link></div></div></div>
      </div>
      <div className="tester-hero__foot"><Meter value={missionDone ? 43 : 36} label="Progres pengujian demo" tone="teal" /><span className="mono">3 / 14 hari</span></div>
    </section>
    <div className="tester-stats"><div><span>Poin tersedia</span><strong>1.250 <small>poin demo</small></strong></div><div><span>Dalam proses</span><strong>320 <small>poin demo</small></strong></div><div><span>Misi berikutnya</span><strong>Hari 4 <small>besok · demo</small></strong></div><Link href="/tester/rewards" className="text-link">Buka reward<ArrowRight size={15} /></Link></div>
    <section className="lower-section"><SectionHead title="Masih tersedia untuk diuji" detail="Contoh daftar pengujian; syarat dan reward mengikuti konfigurasi." href="/tester/explore" /><div className="app-list">{missionApps.slice(0, 2).map((app, i) => <AppListRow key={app.name} app={app} index={i} />)}</div></section>
  </>;
}

function AppListRow({ app, index, href = "/tester/app-detail" }: { app: typeof missionApps[number]; index: number; href?: string }) {
  const Icon = app.icon;
  return <Link href={href} className="app-list-row"><span className={`app-glyph app-glyph--${app.accent}`}><Icon size={19} /></span><span className="app-list-row__main"><strong>{app.name}</strong><small>{app.category} · Android 11+ · build demo</small></span><span className="app-list-row__reward"><small>REWARD</small><strong>{app.reward}</strong></span><span className="app-list-row__slots"><small>{app.slots}</small><small>{app.duration}</small></span><span className="app-list-row__action"><span>{index === 2 ? "Kuota penuh" : "Lihat detail"}</span><ChevronRight size={16} /></span></Link>;
}

function AdminDashboard({ onToast }: { onToast: (value: string) => void }) {
  return <>
    <Heading title="Control center" description="Kondisi platform dan antrean operasional dalam satu pandangan." actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor hanya tersedia setelah backend dihubungkan.")}>Ekspor ringkasan</Button>} />
    <DemoNotice />
    <DataStrip items={[
      { label: "Pengguna aktif", value: "1.284", note: "demo", tone: "blue" },
      { label: "Siklus berjalan", value: "38", note: "demo" },
      { label: "Tiket terbuka", value: "12", note: "demo", tone: "coral" },
      { label: "Payout tertunda", value: "07", note: "demo", tone: "coral" },
    ]} />
    <RunSheet active={4} />
    <div className="dashboard-columns dashboard-columns--admin">
      <section className="work-section"><SectionHead title="Antrean operasional" detail="Item demo yang memerlukan tindakan admin." href="/admin/apps-tests" /><div className="queue-table"><div className="queue-table__head"><span>Item</span><span>Konteks</span><span>Status</span><span /></div>
        <Link href="/admin/apps-tests" className="queue-row"><span><FileClock size={16} />Build menunggu review</span><small>Demo Aurora · APK demo</small><StatusTag tone="review">Review</StatusTag><ChevronRight size={15} /></Link>
        <Link href="/admin/tickets" className="queue-row"><span><Bug size={16} />Laporan bug prioritas tinggi</span><small>BUG-DEMO-08 · Demo Aurora</small><StatusTag tone="urgent">Terbuka</StatusTag><ChevronRight size={15} /></Link>
        <Link href="/admin/transactions" className="queue-row"><span><Wallet size={16} />Payout menunggu rekonsiliasi</span><small>Data transaksi demo</small><StatusTag tone="neutral">Tertunda</StatusTag><ChevronRight size={15} /></Link>
      </div></section>
      <aside className="side-work"><SectionHead title="Jejak perubahan" detail="Log admin dan kejadian penting." href="/admin/settings" linkLabel="Buka audit" /><ActivityList compact /></aside>
    </div>
    <section className="lower-section"><SectionHead title="Transaksi terbaru" detail="Nilai pembayaran disembunyikan pada mode demo." href="/admin/transactions" /><TransactionRows compact /></section>
  </>;
}

function TransactionRows({ compact = false }: { compact?: boolean }) {
  const rows = [
    { id: "INV-DEMO-091", party: "Developer Demo · PT-DEMO-024", kind: "Pembayaran pengujian", state: "Menunggu", tone: "neutral" },
    { id: "RW-DEMO-044", party: "Tester Demo · Redeem reward", kind: "Payout reward", state: "Diproses", tone: "active" },
    { id: "INV-DEMO-088", party: "Developer Demo · PT-DEMO-019", kind: "Pembayaran pengujian", state: "Berhasil", tone: "done" },
  ];
  return <div className={`transaction-list ${compact ? "transaction-list--compact" : ""}`}>{rows.map((row) => <div className="transaction-row" key={row.id}><span className="transaction-row__icon"><CreditCard size={16} /></span><span><strong>{row.kind}</strong><small className="mono">{row.id} · {row.party}</small></span><StatusTag tone={row.tone}>{row.state}</StatusTag><span className="transaction-amount">—<small>nilai demo</small></span></div>)}</div>;
}

export function PlayTestApp({ role: roleProp, section }: { role: string; section: string }) {
  const role = normalizeRole(roleProp);
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [missionDone, setMissionDone] = useState(false);
  const title = sectionTitles[section] ?? "Beranda";
  const nav = navByRole[role];

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3600);
  }

  function changeRole(event: ChangeEvent<HTMLSelectElement>) {
    const nextRole = normalizeRole(event.target.value);
    router.push(target(nextRole, "dashboard"));
    setNavOpen(false);
  }

  const body = role === "developer" ? renderDeveloperSection(section, notify) : role === "tester" ? renderTesterSection(section, notify, missionDone, () => setMissionDone(true)) : renderAdminSection(section, notify);
  const isTester = role === "tester";

  return <div className={`workspace workspace--${role}`}>
    <aside className={`sidebar ${navOpen ? "sidebar--open" : ""}`} aria-label={`Navigasi ${roleInfo[role].label}`}>
      <Link className="brand-lockup" href="/developer/dashboard" aria-label="PlayTest ID, beranda developer"><span className="brand-mark"><span /><span /><span /></span><span className="brand-name">playtest<span>id</span></span></Link>
      <div className="sidebar-divider" />
      <label className="role-select-label" htmlFor="workspace-role">WORKSPACE</label>
      <div className="role-select-wrap"><select id="workspace-role" value={role} onChange={changeRole} aria-label="Pilih workspace role">{Object.entries(roleInfo).map(([key, info]) => <option value={key} key={key}>{info.label}</option>)}</select><ChevronDown size={14} aria-hidden="true" /></div>
      <span className="nav-group-label">MENU UTAMA</span>
      <nav className="side-nav">{nav.map((item) => {
        const Icon = item.icon;
        const href = target(role, item.section);
        const active = section === item.section || (section === "project-detail" && item.section === "projects") || (section === "app-detail" && item.section === "explore") || (section === "mission" && item.section === "my-tests");
        return <Link className={`side-nav__item ${active ? "is-active" : ""}`} href={href} key={item.section} aria-label={item.label} aria-current={active ? "page" : undefined} onClick={() => setNavOpen(false)}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{item.section === "tickets" && <span className="nav-count">3</span>}</Link>;
      })}</nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-run-card"><span className="field-label">SIKLUS AKTIF · DEMO</span><strong>Demo Aurora</strong><small>Hari 3 dari 14</small><Meter value={36} label="Progres siklus demo" tone="teal" /><Link href={role === "tester" ? "/tester/my-tests" : role === "admin" ? "/admin/apps-tests" : "/developer/project-detail"}>Buka run sheet<ArrowRight size={14} /></Link></div>
      <div className="sidebar-bottom"><button type="button" className="sidebar-help" onClick={() => notify("Pusat bantuan akan tersedia setelah layanan backend dihubungkan.")}><CircleHelp size={16} />Pusat bantuan</button><div className="account-row"><Avatar initials={roleInfo[role].initials} tone={role === "tester" ? "teal" : role === "admin" ? "coral" : "blue"} /><span><strong>{roleInfo[role].label} Demo</strong><small>{roleInfo[role].detail}</small></span><MoreHorizontal size={17} /></div></div>
    </aside>
    {navOpen && <button type="button" className="sidebar-scrim" aria-label="Tutup navigasi" onClick={() => setNavOpen(false)} />}
    <div className="main-shell">
      <header className="topbar">
        <div className="topbar__start"><button type="button" className="mobile-menu" aria-label="Buka navigasi" aria-expanded={navOpen} onClick={() => setNavOpen((open) => !open)}><Menu size={19} /></button><div className="breadcrumb"><span>{roleInfo[role].label}</span><ChevronRight size={13} /><strong>{title}</strong></div></div>
        <div className="topbar__end"><span className="environment-tag"><span />DEMO WORKSPACE</span><div className="notice-anchor"><button type="button" className={`icon-button ${noticeOpen ? "is-pressed" : ""}`} aria-label="Notifikasi" aria-expanded={noticeOpen} onClick={() => setNoticeOpen((open) => !open)}><Bell size={18} /><span className="notification-dot" /></button>{noticeOpen && <div className="notice-popover" role="region" aria-label="Notifikasi demo"><div className="popover-head"><strong>Notifikasi</strong><button type="button" onClick={() => setNoticeOpen(false)} aria-label="Tutup notifikasi"><X size={16} /></button></div><div className="notice-item"><span className="notice-icon notice-icon--coral"><Bug size={15} /></span><span><strong>Bug perlu ditinjau</strong><small>BUG-DEMO-08 · Demo Aurora</small></span></div><div className="notice-item"><span className="notice-icon notice-icon--teal"><CheckCheck size={15} /></span><span><strong>Sesi menunggu validasi</strong><small>Aktivitas demo · 09.42</small></span></div></div>}</div><Avatar initials={roleInfo[role].initials} tone={role === "tester" ? "teal" : role === "admin" ? "coral" : "blue"} /></div>
      </header>
      <main className="page-content" key={`${role}-${section}`}>
        {body}
        <footer className="page-foot"><span>PlayTest ID · Frontend prototype</span><span>Data demo · tidak terhubung ke transaksi nyata</span></footer>
      </main>
      {isTester && <nav className="tester-tabbar" aria-label="Navigasi utama tester">{nav.slice(0, 5).map((item) => { const Icon = item.icon; const active = section === item.section || (section === "mission" && item.section === "my-tests") || (section === "app-detail" && item.section === "explore"); return <Link key={item.section} href={target(role, item.section)} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}><Icon size={18} /><span>{item.label === "Pengujian saya" ? "Pengujian" : item.label === "Poin & reward" ? "Reward" : item.label}</span></Link>; })}</nav>}
      {toast && <div className="toast" role="status" aria-live="polite"><CheckCircle2 size={17} />{toast}<button type="button" onClick={() => setToast("")} aria-label="Tutup pesan"><X size={15} /></button></div>}
    </div>
  </div>;
}

function renderDeveloperSection(section: string, notify: (message: string) => void) {
  if (section === "dashboard") return <DeveloperDashboard />;
  if (section === "projects") return <DeveloperProjects />;
  if (section === "create-test") return <CreateTestWizard onToast={notify} />;
  if (section === "project-detail") return <DeveloperProjectDetail onToast={notify} />;
  if (section === "history") return <HistoryPage onToast={notify} />;
  if (section === "profile") return <ProfilePage role="Developer" onToast={notify} />;
  return <DeveloperDashboard />;
}

function renderTesterSection(section: string, notify: (message: string) => void, missionDone: boolean, onMissionDone: () => void) {
  if (section === "dashboard") return <TesterDashboard onToast={notify} missionDone={missionDone} onMissionDone={onMissionDone} />;
  if (section === "explore") return <ExplorePage onToast={notify} />;
  if (section === "app-detail") return <TesterAppDetail onToast={notify} />;
  if (section === "my-tests") return <MyTestsPage />;
  if (section === "mission") return <MissionPage onToast={notify} missionDone={missionDone} onMissionDone={onMissionDone} />;
  if (section === "rewards") return <RewardsPage role="tester" onToast={notify} />;
  if (section === "profile") return <ProfilePage role="Tester" onToast={notify} />;
  return <TesterDashboard onToast={notify} missionDone={missionDone} onMissionDone={onMissionDone} />;
}

function renderAdminSection(section: string, notify: (message: string) => void) {
  if (section === "dashboard") return <AdminDashboard onToast={notify} />;
  if (section === "users") return <AdminUsers onToast={notify} />;
  if (section === "apps-tests") return <AdminAppsTests onToast={notify} />;
  if (section === "transactions") return <AdminTransactions onToast={notify} />;
  if (section === "tickets") return <AdminTickets onToast={notify} />;
  if (section === "rewards") return <AdminRewards onToast={notify} />;
  if (section === "settings") return <AdminSettings onToast={notify} />;
  return <AdminDashboard onToast={notify} />;
}

function FilterTabs({ values, active, onChange }: { values: string[]; active: string; onChange: (value: string) => void }) {
  return <div className="filter-tabs" role="group" aria-label="Filter status">{values.map((value) => <button type="button" key={value} className={active === value ? "is-active" : ""} aria-pressed={active === value} onClick={() => onChange(value)}>{value}</button>)}</div>;
}

function DeveloperProjects() {
  const [filter, setFilter] = useState("Semua");
  const filters = ["Semua", "Sedang berjalan", "Rekrutmen", "Perlu ditinjau"];
  return <>
    <Heading title="Proyek pengujian" description="Daftar run sheet dan status cohort tester." actions={<Link className="button button--primary" href="/developer/create-test"><FilePlus2 size={16} />Buat pengujian</Link>} />
    <DemoNotice />
    <div className="page-tools"><label className="search-field"><Search size={16} /><input aria-label="Cari proyek" placeholder="Cari nama atau ID proyek" /><kbd>⌘ K</kbd></label><Button variant="secondary" icon={Filter} onClick={() => setFilter(filter === "Semua" ? "Rekrutmen" : "Semua")}>Filter</Button></div>
    <FilterTabs values={filters} active={filter} onChange={setFilter} />
    <div className="table-frame"><ProjectRows filter={filter} /></div>
    <div className="pagination-line"><span>3 proyek pada data demo</span><div><button type="button" disabled aria-label="Halaman sebelumnya"><ChevronRight className="rotate-180" size={16} /></button><span>1</span><button type="button" disabled aria-label="Halaman berikutnya"><ChevronRight size={16} /></button></div></div>
  </>;
}

function CreateTestWizard({ onToast }: { onToast: (value: string) => void }) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const steps = ["Upload APK", "Informasi aplikasi", "Kriteria tester", "Ringkasan biaya", "Konfirmasi"];

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".apk")) {
      setFileName("");
      setFileError("Pilih file dengan format .apk. File belum diunggah ke server.");
      return;
    }
    setFileError("");
    setFileName(file.name);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 5) {
      setStep((current) => Math.min(5, current + 1));
      return;
    }
    setSubmitted(true);
    onToast("Konfirmasi ditampilkan sebagai demo; proyek belum dibuat di server.");
  }

  if (submitted) return <>
    <Heading title="Konfirmasi demo" description="Ringkasan lokal ini tidak membuat proyek atau pembayaran nyata." />
    <DemoNotice />
    <section className="confirmation-sheet"><span className="confirmation-sheet__icon"><CheckCircle2 size={28} /></span><div><h2>Pengujian siap ditinjau</h2><p>Form berhasil melewati prototipe. Hubungkan backend untuk validasi APK, kalkulasi, review, dan pembuatan proyek.</p></div><div className="confirmation-sheet__facts"><span>File APK<strong>{fileName || "Belum dipilih"}</strong></span><span>Biaya<strong>Menunggu konfigurasi</strong></span><span>Status<strong>Draft demo</strong></span></div><Link className="button button--primary" href="/developer/projects">Kembali ke pengujian<ArrowRight size={16} /></Link></section>
  </>;

  return <>
    <Heading title="Buat pengujian baru" description="Atur satu siklus Android dari APK hingga rekrutmen tester." actions={<Link href="/developer/projects" className="button button--quiet"><X size={15} />Batal</Link>} />
    <DemoNotice />
    <div className="wizard-layout">
      <nav className="wizard-steps" aria-label="Langkah pembuatan pengujian">{steps.map((item, i) => <button type="button" key={item} className={`${step === i + 1 ? "is-active" : ""} ${step > i + 1 ? "is-done" : ""}`} onClick={() => setStep(i + 1)}><span>{step > i + 1 ? <Check size={14} /> : `0${i + 1}`}</span><span><strong>{item}</strong><small>{i === 0 ? "Format dan build" : i === 1 ? "Nama, versi, detail" : i === 2 ? "Kuota dan misi" : i === 3 ? "Nilai konfigurasi" : "Tinjau sebelum lanjut"}</small></span>{i < steps.length - 1 && <span className="wizard-steps__line" />}</button>)}</nav>
      <form className="wizard-form" onSubmit={submit}>
        <div className="wizard-form__head"><span className="field-label">LANGKAH {String(step).padStart(2, "0")} / 05</span><h2>{steps[step - 1]}</h2><p>{step === 1 ? "Pilih build yang akan diuji. Pemilihan file ini hanya simulasi browser." : step === 2 ? "Informasi ditampilkan dalam preview lokal." : step === 3 ? "Kuota dan aturan final mengikuti konfigurasi platform." : step === 4 ? "Biaya belum dihitung karena tabel harga belum terhubung." : "Periksa input sebelum pengujian dikirim untuk review."}</p></div>
        {step === 1 && <div className="form-fieldset"><label className={`upload-zone ${fileName ? "has-file" : ""}`}><input type="file" accept=".apk,application/vnd.android.package-archive" onChange={chooseFile} aria-describedby="upload-help" /><span className="upload-zone__icon">{fileName ? <FileCheck2 size={23} /> : <Upload size={23} />}</span><strong>{fileName || "Pilih file APK"}</strong><span>{fileName ? "File dipilih lokal; belum diunggah" : "Seret file ke sini atau telusuri perangkat"}</span><small id="upload-help">Validasi ukuran maksimum, pemindaian, dan penyimpanan aman memerlukan backend.</small></label>{fileError && <p className="field-error" role="alert">{fileError}</p>}</div>}
        {step === 2 && <div className="form-grid"><label className="form-field form-field--wide"><span>Nama aplikasi</span><input required placeholder="Contoh: Demo Aurora" /></label><label className="form-field"><span>Package name</span><input placeholder="id.contoh.aplikasi" /></label><label className="form-field"><span>Versi / build</span><input placeholder="v1.0.0" /></label><label className="form-field"><span>Kategori</span><select defaultValue=""><option value="" disabled>Pilih kategori</option><option>Produktivitas</option><option>Belanja</option><option>Transportasi</option><option>Pendidikan</option></select></label><label className="form-field"><span>Minimum Android</span><select defaultValue=""><option value="" disabled>Pilih versi</option><option>Android 10+</option><option>Android 11+</option><option>Android 12+</option></select></label><label className="form-field form-field--wide"><span>Deskripsi pengujian</span><textarea rows={3} placeholder="Fitur dan alur utama yang perlu dicoba" /></label></div>}
        {step === 3 && <div className="form-grid"><label className="form-field"><span>Target tester</span><input type="number" min="1" placeholder="Mengikuti kuota platform" /></label><label className="form-field"><span>Durasi pengujian</span><select defaultValue=""><option value="" disabled>Pilih durasi</option><option>Durasi sesuai konfigurasi</option></select></label><label className="form-field"><span>Perangkat / OS</span><input placeholder="Misalnya rentang Android" /></label><label className="form-field"><span>Bahasa tester</span><select defaultValue="id"><option value="id">Bahasa Indonesia</option><option value="all">Belum ditentukan</option></select></label><label className="form-field form-field--wide"><span>Kriteria dan instruksi</span><textarea rows={4} placeholder="Syarat tester, NDA, dan skenario pengujian" /></label><label className="form-check form-field--wide"><input type="checkbox" /><span>Perlu persetujuan NDA sebelum tester bergabung</span></label></div>}
        {step === 4 && <div className="cost-sheet"><div className="cost-sheet__head"><span>ITEM BIAYA</span><span>RINGKASAN</span></div><div><span>Biaya layanan platform</span><strong>Menunggu konfigurasi</strong></div><div><span>Imbalan tester</span><strong>Menunggu konfigurasi</strong></div><div><span>Add-on dan pajak</span><strong>Belum ditentukan</strong></div><div className="cost-sheet__total"><span>Total pengujian</span><strong>Dihitung setelah integrasi harga</strong></div><p>Harga dan reward bersifat configurable. Tidak ada nilai transaksi nyata pada prototipe.</p></div>}
        {step === 5 && <div className="review-sheet"><div><span>APK / build</span><strong>{fileName || "Belum dipilih · demo dapat dilanjutkan"}</strong></div><div><span>Informasi aplikasi</span><strong>Isi form pada langkah 2</strong></div><div><span>Kriteria dan misi</span><strong>Isi form pada langkah 3</strong></div><div><span>Biaya</span><strong>Menunggu konfigurasi platform</strong></div><div className="review-sheet__note"><ShieldCheck size={17} /><span>Finalisasi, pembayaran, dan review tidak berjalan pada frontend demo.</span></div></div>}
        <div className="wizard-form__foot">{step > 1 ? <Button variant="quiet" onClick={() => setStep((current) => current - 1)} icon={ArrowDownLeft}>Kembali</Button> : <span className="muted-copy">Input disimpan hanya di browser selama sesi ini.</span>}<Button type="submit" icon={step === 5 ? FileCheck2 : ArrowRight}>{step === 5 ? "Konfirmasi demo" : "Lanjut"}</Button></div>
      </form>
    </div>
  </>;
}

function DeveloperProjectDetail({ onToast }: { onToast: (value: string) => void }) {
  return <>
    <Heading title="Demo Aurora" description={<span className="mono">PT-DEMO-024 · v2.4.0 · build ilustratif</span>} actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor laporan memerlukan backend.")}>Ekspor laporan</Button>} />
    <DemoNotice />
    <RunSheet active={3} />
    <div className="detail-overview"><div><span className="field-label">PROGRES COHORT · DEMO</span><strong>18 <small>/ 24 tester</small></strong><Meter value={72} label="Target tester" /><p>6 tester belum menyelesaikan siklus. Durasi dan kuota mengikuti konfigurasi proyek.</p></div><div className="detail-overview__facts"><span>Status<StatusTag tone="active">Sedang berjalan</StatusTag></span><span>Build aktif<strong>v2.4.0 · demo</strong></span><span>Periode<strong>Contoh data · 14 hari</strong></span><span>Feedback<strong>12 masuk · demo</strong></span></div></div>
    <div className="detail-tabs"><Link className="is-active" href="/developer/project-detail">Ringkasan</Link><Link href="/developer/project-detail?tab=testers">Tester</Link><Link href="/developer/project-detail?tab=feedback">Feedback & bug</Link><Link href="/developer/project-detail?tab=activity">Aktivitas</Link></div>
    <div className="dashboard-columns"><section className="work-section"><SectionHead title="Tester dalam pengujian" detail="Status enrollment pada data ilustratif." /><div className="tester-table"><div className="tester-table__head"><span>TESTER</span><span>MISI</span><span>STATUS</span><span>TERAKHIR AKTIF</span></div>{[
      { name: "Raka Pradana", initials: "RP", done: "3 / 5", status: "Aktif", tone: "active", last: "Demo · 09.42" },
      { name: "Mira Santoso", initials: "MS", done: "5 / 5", status: "Selesai", tone: "done", last: "Demo · 08.55" },
      { name: "Nadia Putri", initials: "NP", done: "2 / 5", status: "Perlu validasi", tone: "review", last: "Demo · kemarin" },
    ].map((row) => <div className="tester-table__row" key={row.name}><span><Avatar initials={row.initials} /><strong>{row.name}<small>Akun tester demo</small></strong></span><span className="mono">{row.done}</span><StatusTag tone={row.tone}>{row.status}</StatusTag><small>{row.last}</small></div>)}</div></section><aside className="side-work"><SectionHead title="Slip insiden" detail="Bug dan feedback tertaut ke misi." /><IncidentList /></aside></div>
    <section className="lower-section"><SectionHead title="Timeline pengujian" detail="Perubahan status yang dapat ditelusuri." /><ActivityList compact /></section>
    <div className="inline-actions"><Button variant="secondary" icon={FileCheck2} onClick={() => onToast("Laporan demo disiapkan; ekspor belum terhubung.")}>Siapkan laporan demo</Button><Button variant="quiet" icon={CircleHelp} onClick={() => onToast("Pusat bantuan memerlukan integrasi backend.")}>Minta bantuan</Button></div>
  </>;
}

function HistoryPage({ onToast }: { onToast: (value: string) => void }) {
  return <>
    <Heading title="Riwayat aktivitas" description="Jejak pengujian, pembayaran, dan perubahan status." actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor belum tersedia pada frontend demo.")}>Ekspor</Button>} />
    <DemoNotice />
    <div className="page-tools"><label className="search-field"><Search size={16} /><input aria-label="Cari aktivitas" placeholder="Cari proyek, invoice, atau aktivitas" /></label><label className="select-field"><span>Rentang</span><select defaultValue="30"><option value="30">30 hari demo</option><option value="all">Semua</option></select></label></div>
    <section className="sheet-section"><div className="history-date"><span>AKTIVITAS TERBARU</span><span className="mono">DATA DEMO</span></div><ActivityList /><ActivityList /></section>
  </>;
}

function ProfilePage({ role, onToast }: { role: string; onToast: (value: string) => void }) {
  return <>
    <Heading title="Profil & keamanan" description={`Informasi akun ${role.toLowerCase()} demo dan preferensi workspace.`} />
    <DemoNotice />
    <div className="settings-layout"><nav className="settings-nav" aria-label="Bagian pengaturan"><a className="is-active" href="#profile">Profil</a><a href="#security">Keamanan</a><a href="#preferences">Notifikasi</a><a href="#help">Bantuan</a></nav><form className="settings-sheet" onSubmit={(event) => { event.preventDefault(); onToast("Perubahan profil hanya tersimpan sementara di demo."); }}><div className="settings-sheet__head"><span className="field-label">INFORMASI AKUN</span><Avatar initials={role === "Tester" ? "TS" : "DV"} tone="blue" /></div><div className="form-grid"><label className="form-field"><span>Nama</span><input defaultValue={`${role} Demo`} /></label><label className="form-field"><span>Email</span><input defaultValue={`${role.toLowerCase()}.demo@example.test`} type="email" /></label><label className="form-field"><span>Nomor telepon</span><input placeholder="Tambahkan nomor kontak" /></label><label className="form-field"><span>Status verifikasi</span><input value="Demo · belum diverifikasi" readOnly /></label></div><div className="form-divider" id="security"><h3>Keamanan</h3><p>Ubah kata sandi dan sesi aktif setelah autentikasi terhubung.</p><Button variant="secondary" icon={LockKeyhole} onClick={() => onToast("Manajemen sesi belum terhubung ke autentikasi.")}>Pengaturan keamanan</Button></div><div className="settings-sheet__foot"><span>Data ini tidak dikirim atau disimpan.</span><Button type="submit" icon={Check}>Simpan lokal</Button></div></form></div>
  </>;
}

function ExplorePage({ onToast }: { onToast: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua kategori");
  const filtered = useMemo(() => missionApps.filter((app) => `${app.name} ${app.category}`.toLowerCase().includes(query.toLowerCase()) && (category === "Semua kategori" || app.category === category)), [query, category]);
  return <>
    <Heading title="Aplikasi tersedia" description="Pilih pengujian yang sesuai kriteria perangkat dan waktumu." />
    <DemoNotice />
    <div className="explore-toolbar"><label className="search-field"><Search size={16} /><input aria-label="Cari aplikasi" placeholder="Cari aplikasi atau kategori" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>/</kbd></label><label className="select-field"><Filter size={15} /><span className="sr-only">Kategori</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Semua kategori</option><option>Produktivitas</option><option>Belanja</option><option>Transportasi</option></select></label><span className="result-count">{filtered.length} pengujian demo</span></div>
    <div className="explore-layout"><section><div className="explore-list">{filtered.map((app, i) => <AppListRow key={app.name} app={app} index={i} />)}{filtered.length === 0 && <div className="empty-state"><Search size={22} /><strong>Tidak ada hasil</strong><span>Coba kata kunci atau kategori lain.</span></div>}</div></section><aside className="eligibility-note"><ShieldCheck size={20} /><h2>Sebelum bergabung</h2><p>Periksa versi Android, durasi, syarat tester, dan ketentuan privasi pada detail aplikasi.</p><Button variant="quiet" icon={CircleHelp} onClick={() => onToast("Panduan keamanan tester akan tersedia di pusat bantuan.")}>Panduan keamanan</Button></aside></div>
  </>;
}

function TesterAppDetail({ onToast }: { onToast: (value: string) => void }) {
  const [joined, setJoined] = useState(false);
  return <>
    <Heading title="Demo Aurora" description="Detail pengujian aplikasi · informasi ilustratif." actions={<Link className="button button--quiet" href="/tester/explore"><ArrowDownLeft size={15} />Kembali ke eksplorasi</Link>} />
    <DemoNotice />
    <div className="app-detail-layout"><section className="app-detail-main"><div className="app-detail-identity"><span className="app-glyph app-glyph--coral app-glyph--large"><Smartphone size={26} /></span><div><span className="field-label">PRODUKTIVITAS · BUILD DEMO</span><h2>Demo Aurora</h2><p>Rangkaian alur kerja aplikasi untuk dicoba sebelum rilis.</p></div></div><div className="detail-facts"><span>Versi<strong>v2.4.0 · demo</strong></span><span>Minimum Android<strong>12+</strong></span><span>Durasi<strong>Sesuai konfigurasi demo</strong></span><span>Kuota<strong>6 slot ilustratif</strong></span></div><div className="app-detail-copy"><h3>Yang akan diuji</h3><p>Ikuti instruksi tiap misi dan berikan feedback berdasarkan pengalaman menggunakan alur yang tersedia.</p><h3>Persyaratan</h3><ul><li>Perangkat Android sesuai versi minimum.</li><li>Tester harus menyelesaikan sesi sesuai instruksi.</li><li>Jangan membagikan APK atau materi pengujian di luar platform.</li></ul><h3>Privasi & ketentuan</h3><p>Detail NDA, izin data, dan ketentuan final harus disediakan developer sebelum pengujian dipublikasikan.</p></div></section><aside className="join-sheet"><span className="field-label">SEBELUM BERGABUNG</span><h2>Periksa kecocokan</h2><div className="join-check"><CheckCircle2 size={17} /><span>Versi perangkat sesuai<small>Contoh status · perlu validasi perangkat nyata</small></span></div><div className="join-check"><FileCheck2 size={17} /><span>Syarat sudah dibaca<small>Persetujuan akan dicatat setelah integrasi</small></span></div><div className="join-reward"><span>Reward</span><strong>Menunggu konfigurasi platform</strong></div><Button icon={joined ? CheckCircle2 : ArrowRight} disabled={joined} onClick={() => { setJoined(true); onToast("Minat bergabung tercatat sementara di demo; slot belum diklaim."); }}>{joined ? "Tercatat · demo" : "Ikut pengujian demo"}</Button><small className="muted-copy">Tidak ada slot yang diklaim pada prototipe.</small></aside></div>
  </>;
}

function MyTestsPage() {
  const [filter, setFilter] = useState("Berjalan");
  return <>
    <Heading title="Pengujian saya" description="Run sheet harian dan siklus yang sudah diikuti." />
    <DemoNotice />
    <FilterTabs values={["Berjalan", "Selesai", "Semua"]} active={filter} onChange={setFilter} />
    {(filter === "Berjalan" || filter === "Semua") && <section className="active-test-sheet"><div className="active-test-sheet__header"><span className="app-glyph app-glyph--coral"><Smartphone size={19} /></span><span><strong>Demo Aurora</strong><small>Build demo · Android 12+</small></span><StatusTag tone="active">Berjalan</StatusTag></div><RunSheet active={3} /><div className="active-test-sheet__foot"><Meter value={36} label="Hari pengujian selesai" tone="teal" /><Link href="/tester/mission" className="button button--primary">Buka misi hari ini<ArrowRight size={16} /></Link></div></section>}
    {(filter === "Selesai" || filter === "Semua") && <section className="lower-section"><SectionHead title="Siklus selesai" detail="Riwayat demo dan status reward." /><div className="project-list"><Link className="project-row" href="/tester/mission"><span className="project-row__app"><span className="app-glyph app-glyph--teal"><BookOpenCheck size={18} /></span><span><strong>Demo Perjalanan</strong><small>Build demo · misi tervalidasi</small></span></span><span /><span /><span className="project-row__state"><StatusTag tone="done">Selesai</StatusTag><small>Reward mengikuti konfigurasi</small></span><ChevronRight size={16} /></Link></div></section>}
  </>;
}

function MissionPage({ onToast, missionDone, onMissionDone }: { onToast: (value: string) => void; missionDone: boolean; onMissionDone: () => void }) {
  const [reportOpen, setReportOpen] = useState(false);
  return <>
    <Heading title="Misi pengujian" description="Demo Aurora · Hari 3 dari 14" actions={<Link className="button button--quiet" href="/tester/my-tests"><ArrowDownLeft size={15} />Pengujian saya</Link>} />
    <DemoNotice />
    <RunSheet active={3} />
    <div className="mission-detail-grid"><section className="mission-detail-main"><div className="mission-day"><span>03</span><div><span className="field-label">CUE HARI INI · DEMO</span><h2>Simpan satu item dari halaman utama</h2><p>Ikuti urutan di bawah. Konfirmasi sesi hanya mensimulasikan perubahan status lokal.</p></div><StatusTag tone={missionDone ? "done" : "active"}>{missionDone ? "Terkirim" : "Aktif"}</StatusTag></div><ol className="mission-checklist"><li><span>1</span><div><strong>Buka aplikasi demo</strong><small>Gunakan build yang tercantum di detail pengujian.</small></div><CheckCircle2 size={18} /></li><li><span>2</span><div><strong>Simpan satu item</strong><small>Periksa respons tombol dan perubahan status item.</small></div><CheckCircle2 size={18} /></li><li><span>3</span><div><strong>Kirim catatan sesi</strong><small>Jelaskan apa yang berhasil atau kendala yang ditemukan.</small></div><CheckCircle2 size={18} /></li></ol><div className="mission-action"><Button icon={missionDone ? CheckCircle2 : CheckCheck} disabled={missionDone} onClick={() => { if (!missionDone) { onMissionDone(); onToast("Sesi dikirim pada tampilan demo; validasi reward memerlukan backend."); } }}>{missionDone ? "Sesi terkirim · demo" : "Konfirmasi sesi demo"}</Button><Button variant="secondary" icon={Bug} onClick={() => setReportOpen((open) => !open)}>Laporkan bug</Button></div>{reportOpen && <form className="bug-form" onSubmit={(event) => { event.preventDefault(); setReportOpen(false); onToast("Laporan bug tersimpan sementara di tampilan demo."); }}><label className="form-field"><span>Ringkasan masalah</span><input required placeholder="Jelaskan masalah singkat" /></label><label className="form-field"><span>Langkah dan hasil</span><textarea rows={3} placeholder="Langkah untuk melihat masalah dan hasil yang diharapkan" /></label><Button type="submit" icon={FileCheck2}>Simpan laporan demo</Button></form>}</section><aside className="mission-rail"><div className="mission-rail__reward"><Gift size={19} /><span>Reward sesi<strong>Mengikuti konfigurasi</strong><small>Hanya diberikan setelah validasi.</small></span></div><Meter value={missionDone ? 43 : 36} label="Progres siklus demo" tone="teal" /><div className="mission-rail__note"><ShieldCheck size={16} /><span>Bukti, lokasi, dan validasi perangkat ditampilkan setelah layanan terhubung.</span></div></aside></div>
  </>;
}

function RewardsPage({ role, onToast }: { role: "tester"; onToast: (value: string) => void }) {
  const [tab, setTab] = useState("Katalog reward");
  const rewardItems = [
    { title: "Saldo e-wallet", type: "E-wallet", note: "Metode dan nominal mengikuti konfigurasi" },
    { title: "Pulsa / data", type: "Telekomunikasi", note: "Operator dan nominal mengikuti konfigurasi" },
    { title: "Voucher", type: "Voucher", note: "Katalog reward belum terhubung" },
  ];
  return <>
    <Heading title="Poin & reward" description={`Saldo demo untuk ${role.toLowerCase()}; penukaran belum terhubung.`} />
    <DemoNotice />
    <div className="rewards-ledger"><div><span className="field-label">POIN TERSEDIA · DEMO</span><strong>1.250</strong><small>Saldo ilustratif, bukan nilai akun.</small></div><div><span className="field-label">DALAM PROSES</span><strong>320</strong><small>Poin demo</small></div><div><span className="field-label">MINIMUM PENUKARAN</span><strong>Belum diatur</strong><small>Nilai dikelola Admin</small></div></div>
    <FilterTabs values={["Katalog reward", "Dalam proses", "Riwayat"]} active={tab} onChange={setTab} />
    {tab === "Katalog reward" ? <div className="reward-catalog">{rewardItems.map((item, i) => <article className="reward-item" key={item.title}><span className={`reward-item__symbol reward-item__symbol--${i}`}><Gift size={20} /></span><span className="field-label">{item.type.toUpperCase()}</span><h2>{item.title}</h2><p>{item.note}</p><Button variant="secondary" onClick={() => onToast("Redeem memerlukan minimum poin dan akun payout yang dikonfigurasi.")}>Lihat syarat<ArrowRight size={15} /></Button></article>)}</div> : <div className="empty-state empty-state--wide"><Wallet size={23} /><strong>{tab === "Riwayat" ? "Belum ada redeem demo" : "Tidak ada payout dalam proses"}</strong><span>Riwayat transaksi tampil setelah reward terhubung ke backend.</span></div>}
    <div className="audit-note"><LockKeyhole size={16} /><span>Poin diberikan setelah aktivitas pengujian divalidasi. Akun payout perlu diverifikasi sebelum redeem.</span></div>
  </>;
}

function AdminUsers({ onToast }: { onToast: (value: string) => void }) {
  const [users, setUsers] = useState(appUsers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Semua");
  const visible = users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase()) && (status === "Semua" || user.status === status));
  function toggleStatus(email: string) {
    setUsers((rows) => rows.map((user) => user.email === email ? { ...user, status: user.status === "Aktif" ? "Ditangguhkan" : "Aktif" } : user));
    onToast("Status akun berubah di browser demo saja; tidak ada perubahan pada akun nyata.");
  }
  return <>
    <Heading title="Manajemen pengguna" description="Cari akun, tinjau role dan status, lalu catat tindakan admin." actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor pengguna belum tersedia pada demo.")}>Ekspor daftar</Button>} />
    <DemoNotice />
    <DataStrip items={[{ label: "Semua akun", value: "1.284", note: "demo" }, { label: "Tester", value: "1.032", note: "demo" }, { label: "Developer", value: "252", note: "demo" }, { label: "Butuh verifikasi", value: "18", note: "demo", tone: "coral" }]} />
    <div className="page-tools"><label className="search-field"><Search size={16} /><input aria-label="Cari pengguna" placeholder="Nama, email, atau role" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="select-field"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Semua</option><option>Aktif</option><option>Menunggu verifikasi</option><option>Ditangguhkan</option></select></label></div>
    <div className="table-frame"><div className="admin-table admin-table--users"><div className="admin-table__head"><span>PENGGUNA</span><span>ROLE</span><span>STATUS</span><span>DIBUAT · DEMO</span><span>TINDAKAN</span></div>{visible.map((user) => <div className="admin-table__row" key={user.email}><span className="person-cell"><Avatar initials={user.initials} /><span><strong>{user.name}</strong><small>{user.email}</small></span></span><span>{user.role}</span><span><StatusTag tone={user.status === "Aktif" ? "done" : user.status === "Ditangguhkan" ? "urgent" : "review"}>{user.status}</StatusTag></span><small>Data ilustratif</small><button type="button" className="table-action" onClick={() => toggleStatus(user.email)}>{user.status === "Aktif" ? "Tangguhkan" : "Aktifkan"}<ChevronDown size={13} /></button></div>)}{visible.length === 0 && <div className="empty-state"><Search size={20} /><strong>Akun tidak ditemukan</strong><span>Ubah kata kunci atau filter.</span></div>}</div></div>
    <div className="audit-note"><ShieldCheck size={16} /><span>Perubahan status akun wajib dicatat di audit log saat backend aktif.</span></div>
  </>;
}

function AdminAppsTests({ onToast }: { onToast: (value: string) => void }) {
  const [filter, setFilter] = useState("Semua");
  const [items, setItems] = useState(testProjects);
  const states = ["Semua", "Perlu ditinjau", "Sedang berjalan", "Rekrutmen"];
  const visible = filter === "Semua" ? items : items.filter((item) => item.state === filter);
  function approve(code: string) {
    setItems((rows) => rows.map((item) => item.code === code ? { ...item, state: "Sedang berjalan", tone: "active" } : item));
    onToast("Status review berganti pada demo lokal. Aksi admin nyata butuh backend dan audit log.");
  }
  return <>
    <Heading title="Aplikasi & pengujian" description="Tinjau build dan siklus tes sebelum statusnya berubah." actions={<Button variant="secondary" icon={Filter} onClick={() => setFilter(filter === "Semua" ? "Perlu ditinjau" : "Semua")}>Filter antrean</Button>} />
    <DemoNotice />
    <DataStrip items={[{ label: "Build menunggu review", value: "06", note: "demo", tone: "coral" }, { label: "Siklus berjalan", value: "38", note: "demo" }, { label: "Dijeda", value: "04", note: "demo" }, { label: "Selesai", value: "112", note: "demo" }]} />
    <FilterTabs values={states} active={filter} onChange={setFilter} />
    <div className="review-queue">{visible.map((item) => <article className="review-run" key={item.code}><div className="review-run__head"><span className="app-glyph"><Smartphone size={18} /></span><span><strong>{item.name}</strong><small className="mono">{item.code} · {item.version}</small></span><StatusTag tone={item.tone}>{item.state}</StatusTag></div><RunSheet active={item.state === "Perlu ditinjau" ? 4 : item.state === "Rekrutmen" ? 2 : 3} /><div className="review-run__meta"><span><Users size={15} />{item.testers} tester · demo</span><span><FileCheck2 size={15} />APK/build ilustratif</span><span><Clock3 size={15} />{item.updated}</span></div><div className="review-run__foot"><Meter value={item.progress} label="Progres siklus" /><Button variant={item.state === "Perlu ditinjau" ? "primary" : "secondary"} icon={item.state === "Perlu ditinjau" ? BadgeCheck : ArrowRight} onClick={() => item.state === "Perlu ditinjau" ? approve(item.code) : onToast("Detail siklus demo; tindakan tidak tersimpan ke server.")}>{item.state === "Perlu ditinjau" ? "Setujui demo" : "Tinjau detail"}</Button></div></article>)}</div>
  </>;
}

function AdminTransactions({ onToast }: { onToast: (value: string) => void }) {
  const [filter, setFilter] = useState("Semua");
  const [query, setQuery] = useState("");
  const allRows = [
    { id: "INV-DEMO-091", party: "Developer Demo", ref: "PT-DEMO-024", kind: "Pembayaran pengujian", status: "Menunggu", tone: "neutral" },
    { id: "RW-DEMO-044", party: "Tester Demo", ref: "Redeem demo", kind: "Payout reward", status: "Diproses", tone: "active" },
    { id: "INV-DEMO-088", party: "Developer Demo", ref: "PT-DEMO-019", kind: "Pembayaran pengujian", status: "Berhasil", tone: "done" },
    { id: "RW-DEMO-039", party: "Tester Demo", ref: "Redeem demo", kind: "Payout reward", status: "Perlu ditinjau", tone: "review" },
  ];
  const rows = allRows.filter((row) => (filter === "Semua" || row.status === filter) && `${row.id} ${row.party} ${row.ref}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <Heading title="Transaksi & keuangan" description="Pantau invoice dan status payout tanpa menampilkan nilai transaksi nyata." actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor transaksi belum tersedia pada demo.")}>Ekspor</Button>} />
    <DemoNotice />
    <DataStrip items={[{ label: "Volume transaksi", value: "—", note: "Tidak dihitung pada demo" }, { label: "Menunggu", value: "07", note: "demo", tone: "coral" }, { label: "Pembayaran berhasil", value: "—", note: "Integrasi gateway belum aktif" }, { label: "Payout bermasalah", value: "02", note: "demo", tone: "coral" }]} />
    <div className="page-tools"><label className="search-field"><Search size={16} /><input aria-label="Cari transaksi" placeholder="Invoice, proyek, atau pengguna" value={query} onChange={(event) => setQuery(event.target.value)} /></label><Button variant="secondary" icon={Activity}>Sinkronisasi gateway <span className="button-tag">Belum aktif</span></Button></div>
    <FilterTabs values={["Semua", "Menunggu", "Diproses", "Berhasil", "Perlu ditinjau"]} active={filter} onChange={setFilter} />
    <div className="admin-table admin-table--transactions"><div className="admin-table__head"><span>TRANSAKSI</span><span>PEMILIK / REFERENSI</span><span>STATUS</span><span>NILAI</span><span>WAKTU</span></div>{rows.map((row) => <div className="admin-table__row" key={row.id}><span className="transaction-id"><CreditCard size={16} /><strong>{row.kind}<small className="mono">{row.id}</small></strong></span><span>{row.party}<small>{row.ref}</small></span><StatusTag tone={row.tone}>{row.status}</StatusTag><span className="muted-copy">Disamarkan</span><small>Data demo</small></div>)}{rows.length === 0 && <div className="empty-state"><Search size={20} /><strong>Tidak ada transaksi</strong><span>Ubah filter untuk meninjau data demo lainnya.</span></div>}</div>
    <div className="audit-note"><LockKeyhole size={16} /><span>Nominal, metode gateway, rekonsiliasi, dan perubahan status menunggu integrasi aman.</span></div>
  </>;
}

function AdminTickets({ onToast }: { onToast: (value: string) => void }) {
  const [filter, setFilter] = useState("Terbuka");
  const [items, setItems] = useState(issueRows.map((item) => ({ ...item, reporter: "Tester Demo", lastUpdate: "Aktivitas demo · 09.18" })));
  const filtered = items.filter((item) => filter === "Semua" || item.status === filter);
  function closeIssue(id: string) {
    setItems((rows) => rows.map((item) => item.id === id ? { ...item, status: "Ditangani", tone: "done" } : item));
    onToast("Status tiket diperbarui di demo lokal; belum ada perubahan backend.");
  }
  return <>
    <Heading title="Laporan & keluhan" description="Slip insiden, prioritas, dan status tindak lanjut." actions={<Button variant="secondary" icon={Download} onClick={() => onToast("Ekspor laporan memerlukan backend.")}>Ekspor tiket</Button>} />
    <DemoNotice />
    <DataStrip items={[{ label: "Semua tiket", value: "42", note: "demo" }, { label: "Terbuka", value: "12", note: "demo", tone: "coral" }, { label: "Prioritas tinggi", value: "03", note: "demo", tone: "coral" }, { label: "Ditangani", value: "27", note: "demo", tone: "teal" }]} />
    <FilterTabs values={["Terbuka", "Dalam proses", "Ditangani", "Semua"]} active={filter} onChange={setFilter} />
    <div className="ticket-list">{filtered.map((item) => <article className="ticket-slip" key={item.id}><div className={`ticket-slip__flag ticket-slip__flag--${item.tone}`}><Bug size={18} /><span>{item.severity}</span></div><div className="ticket-slip__body"><div className="ticket-slip__meta"><span className="mono">{item.id}</span><StatusTag tone={item.tone}>{item.status}</StatusTag></div><h2>{item.title}</h2><p>{item.project}. Deskripsi dan bukti pada data demo ini disingkat.</p><div className="ticket-slip__foot"><span><Avatar initials="TD" tone="teal" />{item.reporter} · {item.lastUpdate}</span><Button variant={item.status === "Ditangani" ? "secondary" : "primary"} disabled={item.status === "Ditangani"} onClick={() => closeIssue(item.id)}>{item.status === "Ditangani" ? "Ditangani · demo" : "Tandai ditangani"}<Check size={15} /></Button></div></div></article>)}{filtered.length === 0 && <div className="empty-state"><TicketCheck size={21} /><strong>Tidak ada tiket pada status ini</strong><span>Status daftar demo kosong.</span></div>}</div>
  </>;
}

function AdminRewards({ onToast }: { onToast: (value: string) => void }) {
  return <>
    <Heading title="Pengaturan reward" description="Kelola katalog, nilai poin, dan payout setelah kebijakan platform ditetapkan." actions={<Button icon={Check} onClick={() => onToast("Skema reward belum terhubung ke konfigurasi backend.")}>Simpan perubahan demo</Button>} />
    <DemoNotice />
    <div className="settings-layout"><nav className="settings-nav" aria-label="Bagian reward"><a className="is-active" href="#scheme">Skema poin</a><a href="#catalog">Katalog</a><a href="#payout">Payout</a><a href="#history">Riwayat</a></nav><section className="settings-sheet"><div className="settings-sheet__head"><span><span className="field-label">KEBIJAKAN REWARD</span><h2>Nilai belum dikonfigurasi</h2></span><StatusTag tone="review">Belum aktif</StatusTag></div><p className="settings-intro">Nilai tukar, minimum redeem, dan katalog harus ditetapkan oleh platform sebelum tester dapat menarik reward.</p><div className="config-list"><div><span>Nilai konversi 1 poin</span><strong>Belum ditentukan</strong></div><div><span>Minimum redeem</span><strong>Belum ditentukan</strong></div><div><span>Katalog payout</span><strong>Menunggu integrasi</strong></div><div><span>Validasi aktivitas</span><strong>Belum terhubung</strong></div></div><div className="reward-admin-items" id="catalog"><SectionHead title="Jenis reward" detail="Tipe yang dicantumkan dalam PRD." /><div className="reward-type-row"><Wallet size={18} /><span><strong>E-wallet</strong><small>Provider dan nominal mengikuti konfigurasi</small></span><StatusTag>Draft</StatusTag></div><div className="reward-type-row"><Smartphone size={18} /><span><strong>Pulsa / data</strong><small>Operator dan nominal mengikuti konfigurasi</small></span><StatusTag>Draft</StatusTag></div><div className="reward-type-row"><Gift size={18} /><span><strong>Voucher</strong><small>Mitra dan katalog belum ditetapkan</small></span><StatusTag>Draft</StatusTag></div></div></section></div>
    <div className="audit-note"><ShieldCheck size={16} /><span>Perubahan skema reward harus tercatat di audit log dan memiliki status payout yang dapat ditelusuri.</span></div>
  </>;
}

function AdminSettings({ onToast }: { onToast: (value: string) => void }) {
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onToast("Preferensi disimpan pada browser demo saja; server konfigurasi belum terhubung.");
  }
  return <>
    <Heading title="Pengaturan platform" description="Konfigurasi operasional yang memengaruhi alur, biaya, dan reward." />
    <DemoNotice />
    <div className="settings-layout"><nav className="settings-nav" aria-label="Pengaturan platform"><a className="is-active" href="#general">Informasi umum</a><a href="#fees">Biaya & ketentuan</a><a href="#reward-config">Poin & reward</a><a href="#legal">Legal</a><a href="#maintenance">Maintenance</a><a href="#audit">Audit log</a></nav><form className="settings-sheet" onSubmit={save}><div className="settings-sheet__head"><span><span className="field-label">KONFIGURASI PLATFORM</span><h2>Nilai bisnis dikelola Admin</h2></span><StatusTag tone="review">Belum dikonfigurasi</StatusTag></div><p className="settings-intro">PRD menetapkan nilai berikut sebagai konfigurasi, bukan angka tetap di frontend.</p><div className="config-list"><div id="general"><span>Nama platform</span><strong>PlayTest ID</strong></div><div id="fees"><span>Biaya layanan / tester</span><strong>Menunggu keputusan</strong></div><div id="reward-config"><span>Nilai konversi poin & minimum redeem</span><strong>Menunggu keputusan</strong></div><div id="legal"><span>Ketentuan, NDA, dan kebijakan file</span><strong>Konten final belum diberikan</strong></div></div><label className="maintenance-toggle" id="maintenance"><span><strong>Maintenance mode</strong><small>Memblokir akses publik saat maintenance jika diaktifkan.</small></span><input type="checkbox" onChange={() => onToast("Toggle ini hanya preview; mode maintenance belum memengaruhi layanan.")} /><span className="toggle-visual" aria-hidden="true" /></label><div className="form-divider" id="audit"><h3>Audit konfigurasi</h3><p>Riwayat perubahan akan tersedia setelah layanan audit terhubung.</p></div><div className="settings-sheet__foot"><span>Semua perubahan pada halaman ini bersifat lokal.</span><Button type="submit" icon={Check}>Simpan demo</Button></div></form></div>
  </>;
}
