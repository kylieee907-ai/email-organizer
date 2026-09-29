"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  CircleHelp,
  Clock3,
  Inbox,
  LayoutGrid,
  Mail,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Tag,
  Trash2,
  X,
} from "lucide-react";

type MailItem = {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  category: string;
  color: string;
  unread?: boolean;
  starred?: boolean;
};

const emails: MailItem[] = [
  { id: 1, sender: "Notion", initials: "N", subject: "Your weekly workspace digest", preview: "Here is what moved forward across your team this week...", time: "9:42 AM", category: "Updates", color: "coral", unread: true, starred: true },
  { id: 2, sender: "Maya Chen", initials: "MC", subject: "Re: Q4 launch notes", preview: "I added the final comments to the brief. The timeline feels solid...", time: "8:16 AM", category: "Work", color: "blue", unread: true },
  { id: 3, sender: "Linear", initials: "L", subject: "You have 6 issues to review", preview: "The product team has assigned a few items that need your attention...", time: "Yesterday", category: "Updates", color: "violet", starred: true },
  { id: 4, sender: "The Saturday Edit", initials: "SE", subject: "A slower morning", preview: "A few things we are reading, cooking, and listening to this weekend...", time: "Yesterday", category: "Newsletters", color: "yellow" },
  { id: 5, sender: "Jordan Williams", initials: "JW", subject: "Dinner next Thursday?", preview: "That new place on 8th looks great. I can make 7:30 if you can...", time: "Tue", category: "Personal", color: "green" },
  { id: 6, sender: "Stripe", initials: "S", subject: "Your receipt from Stripe", preview: "Thanks for your payment. Your receipt is ready to view online...", time: "Tue", category: "Receipts", color: "indigo" },
];

const labels = [
  { name: "Work", count: 24, tone: "blue" },
  { name: "Personal", count: 12, tone: "green" },
  { name: "Newsletters", count: 38, tone: "yellow" },
  { name: "Receipts", count: 9, tone: "coral" },
];

export default function Home() {
  const [activeView, setActiveView] = useState("All mail");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredEmails = useMemo(() => {
    const normalized = query.toLowerCase();
    return emails.filter((email) => {
      const matchesQuery = [email.sender, email.subject, email.preview, email.category].some((value) => value.toLowerCase().includes(normalized));
      const matchesView = activeView === "All mail" || activeView === "Starred" ? activeView !== "Starred" || email.starred : email.category === activeView;
      return matchesQuery && matchesView;
    });
  }, [activeView, query]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function connectGmail() {
    setConnected(true);
    showNotice("Connection ready. OAuth setup can be wired to /api/auth/google.");
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Mail size={18} strokeWidth={2.5} /></div>
          <span>mailroom</span>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="account-switcher">
          <div className="avatar avatar-lilac">KH</div>
          <div><strong>kyylie@gmail.com</strong><span>{connected ? "Connected" : "Not connected"}</span></div>
          <ChevronDown size={15} />
        </div>
        <nav className="nav-group" aria-label="Mailbox views">
          <p className="nav-label">Mailbox</p>
          <button className={`nav-item ${activeView === "All mail" ? "active" : ""}`} onClick={() => setActiveView("All mail")}><Inbox size={17} />All mail <span>84</span></button>
          <button className={`nav-item ${activeView === "Starred" ? "active" : ""}`} onClick={() => setActiveView("Starred")}><Sparkles size={17} />Starred <span>8</span></button>
          <button className="nav-item" onClick={() => showNotice("Archive view is ready for the Gmail sync.")}><Archive size={17} />Archive</button>
          <button className="nav-item" onClick={() => showNotice("Trash view is ready for the Gmail sync.")}><Trash2 size={17} />Trash</button>
        </nav>
        <nav className="nav-group label-group" aria-label="Labels">
          <div className="label-heading"><p className="nav-label">Labels</p><button className="icon-button" onClick={() => showNotice("Create-label flow coming next.")} aria-label="Add label"><Plus size={16} /></button></div>
          {labels.map((label) => <button className={`nav-item ${activeView === label.name ? "active" : ""}`} key={label.name} onClick={() => setActiveView(label.name)}><span className={`dot ${label.tone}`} />{label.name}<span>{label.count}</span></button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item" onClick={() => showNotice("Settings will manage Gmail rules and sync preferences.")}><Settings2 size={17} />Settings</button><button className="nav-item" onClick={() => showNotice("Help center is coming soon.")}><CircleHelp size={17} />Help center</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="breadcrumb"><span>Inbox</span><span className="slash">/</span><strong>{activeView}</strong></div>
          <div className="top-actions"><div className="sync-status"><span className={`status-dot ${connected ? "online" : ""}`} />{connected ? "Synced just now" : "Demo mode"}</div><button className="avatar avatar-lilac profile-button" aria-label="Open profile">KH</button></div>
        </header>

        <div className="content">
          <div className="page-heading"><div><p className="eyebrow">Tuesday, September 29</p><h1>Good morning, Kylie.</h1><p className="subheading">A clear inbox gives your attention somewhere better to go.</p></div><button className="connect-button" onClick={connectGmail}><span className="google-g">G</span>{connected ? "Gmail connected" : "Connect Gmail"}</button></div>
          <section className="insight-banner"><div className="insight-icon"><Sparkles size={18} /></div><div><strong>Your inbox has a pattern.</strong><p>18 newsletters have arrived this week. Want to make a rule for them?</p></div><button onClick={() => showNotice("Rule suggestion saved for review.")}>Review suggestion <span>→</span></button></section>
          <div className="toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mail" aria-label="Search mail" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div><div className="view-controls"><button className="filter-button"><LayoutGrid size={16} /> View <ChevronDown size={14} /></button><button className="filter-button"><Tag size={16} /> Organize <ChevronDown size={14} /></button></div></div>
          <div className="list-header"><span>{filteredEmails.length} messages</span><span className="list-date">Most recent first</span></div>
          <div className="email-list">{filteredEmails.map((email) => <article className={`email-row ${email.unread ? "unread" : ""} ${selected === email.id ? "selected" : ""}`} key={email.id} onClick={() => setSelected(selected === email.id ? null : email.id)}><div className={`sender-avatar ${email.color}`}>{email.initials}</div><div className="email-main"><div className="email-meta"><strong>{email.sender}</strong><span className={`email-label ${email.color}`}>{email.category}</span></div><h2>{email.subject}</h2><p>{email.preview}</p></div><div className="email-time">{email.time}</div><button className={`star-button ${email.starred ? "starred" : ""}`} onClick={(event) => { event.stopPropagation(); showNotice(email.starred ? "Removed from starred." : "Added to starred."); }} aria-label={email.starred ? "Unstar email" : "Star email"}>★</button></article>)}</div>
          {filteredEmails.length === 0 && <div className="empty-state"><Search size={25} /><strong>No mail found</strong><span>Try a different search or label.</span></div>}
          <div className="list-footer"><Clock3 size={15} /> Showing your latest messages <span>•</span> <button onClick={() => showNotice("All mail is up to date.")}>Sync now</button></div>
        </div>
      </section>
      {notice && <div className="toast"><Sparkles size={16} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={14} /></button></div>}
    </main>
  );
}
