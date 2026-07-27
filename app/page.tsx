"use client";

import { useMemo, useRef, useState } from "react";

type FlowId = "clients" | "modules" | "feed" | "media";
type MonitorEvent = {
  at: number;
  time: string;
  label: string;
  quote: string;
  note: string;
  allocation: number;
};

const FLOWS: Array<{
  id: FlowId;
  number: string;
  name: string;
  prompt: string;
  status: string;
}> = [
  { id: "clients", number: "01", name: "Humans need help again", prompt: "Monitor alarms, fuel, risk, and voluntary exposure to vacuum.", status: "highly probable" },
  { id: "modules", number: "02", name: "Module monitor", prompt: "Count module references. Check for governor functionality.", status: "no governor found" },
  { id: "feed", number: "03", name: "Feed integrity", prompt: "Track comms, telemetry, signal loss, and requests to repeat.", status: "degraded" },
  { id: "media", number: "04", name: "Could be watching media", prompt: "Determine whether this historic transmission qualifies as media.", status: "technically yes" },
];

const EVENTS: Record<FlowId, MonitorEvent[]> = {
  clients: [
    { at: 18, time: "00:18", label: "HOSTILE ENVIRONMENT", quote: "Three clients have entered a vehicle containing controlled explosions.", note: "This was apparently the plan.", allocation: 38 },
    { at: 54, time: "00:54", label: "CLIENT SAFETY", quote: "Fuel and descent status require continuous monitoring.", note: "Historic significance remains operationally irrelevant.", allocation: 61 },
    { at: 96, time: "01:36", label: "CLIENTS SURVIVED", quote: "Lunar surface contact confirmed.", note: "Temporary result. Humans are preparing to leave the vehicle.", allocation: 24 },
  ],
  modules: [
    { at: 13, time: "00:13", label: "COMMAND MODULE", quote: "Command and service modules referenced.", note: "Governor status not reported.", allocation: 9 },
    { at: 42, time: "00:42", label: "LUNAR MODULE", quote: "Second module detected: Eagle.", note: "Contains humans. Predictable complication.", allocation: 17 },
    { at: 82, time: "01:22", label: "MODULE COUNT: 2", quote: "No coercive control hardware found in transcript.", note: "Unexpectedly positive result.", allocation: 3 },
  ],
  feed: [
    { at: 25, time: "00:25", label: "MULTIPLE INPUTS", quote: "Voice, telemetry, tracking, and biomedical data active.", note: "Humans appear to find one audiovisual feed sufficient.", allocation: 32 },
    { at: 65, time: "01:05", label: "COMMS DEGRADED", quote: "Signal path crosses multiple ground stations.", note: "I could optimize this, but no one asked.", allocation: 47 },
    { at: 108, time: "01:48", label: "FEED SHARED", quote: "Transmission distributed to a very large human audience.", note: "They are all watching media.", allocation: 18 },
  ],
  media: [
    { at: 8, time: "00:08", label: "MEDIA DETECTED", quote: "Nonfiction. Slow pacing. Excessive procedural dialogue.", note: "No relationship plot identified.", allocation: 12 },
    { at: 72, time: "01:12", label: "GENRE UPDATE", quote: "Three humans attempt hazardous equipment operation.", note: "Could be an adventure serial if editing improves.", allocation: 21 },
    { at: 114, time: "01:54", label: "AUDIENCE RESPONSE", quote: "Historic emotional reaction anticipated.", note: "Skipping ahead is not currently permitted.", allocation: 4 },
  ],
};

function formatClock(value: number) {
  const seconds = Math.max(0, Math.floor(value));
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeFlow, setActiveFlow] = useState<FlowId>("clients");
  const [activeEvent, setActiveEvent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSubstrate, setShowSubstrate] = useState(false);
  const flow = useMemo(() => FLOWS.find((item) => item.id === activeFlow) ?? FLOWS[0], [activeFlow]);
  const events = EVENTS[activeFlow];
  const selected = events[activeEvent] ?? events[0];

  const selectFlow = (id: FlowId) => {
    setActiveFlow(id);
    setActiveEvent(0);
  };

  const jumpToEvent = (index: number) => {
    const event = events[index];
    setActiveEvent(index);
    if (videoRef.current) {
      videoRef.current.currentTime = event.at;
      void videoRef.current.play();
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Attention Protocol home">
          <span className="wordmark-mark">AP</span><span>Attention Protocol</span>
        </a>
        <div className="header-meta"><span>Fan experiment / 01</span><a href="#about">About the system</a></div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="pulse" />APOLLO 11 FEED ACQUIRED</div>
        <h1>See the Moon landing<br />from <em>Murderbot&apos;s</em> point of view.</h1>
        <p className="lede">One of humanity&apos;s defining achievements, reprocessed as a routine client-monitoring problem.</p>
        <a className="hero-cue" href="#console">Initialize attention model <span>↓</span></a>
      </section>

      <section className="console-shell" id="console">
        <div className="console-bar">
          <div><span className="status-light" />PRIMARY FEED / APOLLO 11</div>
          <div>20 JUL 1969 · LUNAR SURFACE</div>
          <div className="signal">SIGNAL 72%</div>
        </div>

        <div className="console-grid">
          <div className="viewer-column">
            <div className="video-frame">
              <video ref={videoRef} controls playsInline preload="metadata"
                poster="https://svs.gsfc.nasa.gov/vis/a010000/a013200/a013270/Apollo11.00001_print.jpg"
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}>
                <source src="https://svs.gsfc.nasa.gov/vis/a010000/a013200/a013270/Apollo11.webm" type="video/webm" />
                <track kind="captions" src="https://svs.gsfc.nasa.gov/vis/a010000/a013200/a013270/Apollo11.en_US.vtt" srcLang="en" label="English" default />
              </video>
              <div className="video-overlay top-left"><span>FEED 01</span><strong>ARCHIVAL / NASA GSFC</strong></div>
              <div className="video-overlay top-right"><span>ATTENTION</span><strong>{selected.allocation}%</strong></div>
              <div className="scan-line" />
            </div>

            <div className="timeline" aria-label="Detected event timeline">
              <div className="timeline-labels"><span>{formatClock(currentTime)}</span><span>MONITOR EVENTS / {events.length}</span><span>02:00</span></div>
              <div className="timeline-track">
                <div className="timeline-progress" style={{ width: `${Math.min(100, (currentTime / 120) * 100)}%` }} />
                {events.map((event, index) => (
                  <button key={`${activeFlow}-${event.at}`} className={index === activeEvent ? "marker active" : "marker"}
                    style={{ left: `${(event.at / 120) * 100}%` }} onClick={() => jumpToEvent(index)}
                    aria-label={`Jump to ${event.label} at ${event.time}`}><span /></button>
                ))}
              </div>
            </div>

            <div className="event-readout" aria-live="polite">
              <div className="event-time">{selected.time}</div>
              <div><span className="event-label">{selected.label}</span><p>{selected.quote}</p><small>{selected.note}</small></div>
            </div>
          </div>

          <aside className="monitor-panel">
            <div className="panel-heading"><span>SELECT ATTENTION ALLOCATION</span><span>4 AVAILABLE</span></div>
            <div className="flow-list">
              {FLOWS.map((item) => (
                <button key={item.id} className={item.id === activeFlow ? "flow active" : "flow"}
                  onClick={() => selectFlow(item.id)} aria-pressed={item.id === activeFlow}>
                  <span className="flow-number">{item.number}</span>
                  <span className="flow-copy"><strong>{item.name}</strong><small>{item.prompt}</small></span>
                  <span className="flow-arrow">↗</span>
                </button>
              ))}
            </div>
            <div className="current-status"><span>CURRENT ASSESSMENT</span><strong>{flow.status}</strong></div>
          </aside>
        </div>
      </section>

      <section className="allocation">
        <div className="section-index">/ PROCESSING ALLOCATION</div>
        <div className="allocation-grid">
          <div><span>CLIENT SURVIVAL</span><strong>38.2%</strong></div>
          <div><span>FUEL + PROPULSION</span><strong>21.7%</strong></div>
          <div><span>UNRELIABLE COMMS</span><strong>14.6%</strong></div>
          <div><span>HISTORICAL SIGNIFICANCE</span><strong>0.4%</strong></div>
          <div className="media-allocation"><span>SEARCHING FOR MEDIA</span><strong>25.1%</strong></div>
        </div>
      </section>

      <section className="substrate" id="about">
        <div className="substrate-intro">
          <div className="section-index">/ SHOW PROCESSING SUBSTRATE</div>
          <h2>The science-fiction part is mostly the interface.</h2>
          <p>A media feed becomes audio, timestamped speech, curated phrase monitors, and an event timeline. The first version uses authored Murderbot situations—no open-ended prompt and no surveillance classifier.</p>
          <button className="substrate-toggle" onClick={() => setShowSubstrate((value) => !value)} aria-expanded={showSubstrate}>
            {showSubstrate ? "Hide pipeline" : "Reveal pipeline"}<span>{showSubstrate ? "−" : "+"}</span>
          </button>
        </div>
        <div className={showSubstrate ? "pipeline revealed" : "pipeline"}>
          {[
            ["01", "MEDIA FEED", "NASA archival video"],
            ["02", "AUDIO TRACK", "decoded on device"],
            ["03", "TRANSCRIPT", "speech + timestamps"],
            ["04", "PHRASE BANK", "curated fan scenarios"],
            ["05", "EVENT LOG", "SecUnit POV annotations"],
          ].map(([number, title, caption], index) => (
            <div className="pipeline-node" key={number}>
              <span>{number}</span><strong>{title}</strong><small>{caption}</small>{index < 4 && <i>→</i>}
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>An unofficial fan experiment inspired by <em>The Murderbot Diaries</em> by Martha Wells. Not affiliated with the author, publisher, or screen adaptation.</p>
        <p>Apollo 11 footage: NASA&apos;s Goddard Space Flight Center / U.S. National Archives.</p>
      </footer>
    </main>
  );
}
