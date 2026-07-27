"use client";

import { useEffect, useMemo, useState } from "react";

type FlowId = "clients" | "modules" | "feed" | "media";

type Flow = {
  id: FlowId;
  number: string;
  short: string;
  title: string;
  directive: string;
  accent: string;
  focus: string[];
  thoughts: string[];
  transcript: string[];
  alerts: string[];
};

const FLOWS: Flow[] = [
  {
    id: "clients",
    number: "01",
    short: "CLIENTS",
    title: "Humans need help again",
    directive: "Prioritize client survival over ceremonial significance.",
    accent: "#caff00",
    focus: ["SUIT PRESSURE", "FUEL", "HEART RATE", "ESCAPE ROUTES"],
    thoughts: [
      "The humans have entered a hostile environment on purpose.",
      "Fuel margin is decreasing. Historic importance has not improved it.",
      "Client heart rates elevated. They seem pleased about this.",
      "No one has requested rescue yet. Monitoring anyway.",
      "The vehicle contains several single points of catastrophic failure.",
      "They are opening the hatch now. Of course they are.",
    ],
    transcript: [
      "CAPCOM: You are go for powered descent.",
      "EAGLE: Program alarm.",
      "CAPCOM: We are go on that alarm.",
      "EAGLE: Picking up some dust.",
      "EAGLE: Contact light.",
      "HOUSTON: We copy you down.",
    ],
    alerts: ["CLIENT RISK: VOLUNTARY", "FUEL MARGIN: THIN", "RESCUE PATH: 384,400 KM"],
  },
  {
    id: "modules",
    number: "02",
    short: "MODULES",
    title: "Module monitor",
    directive: "Inspect every module reference for coercive control hardware.",
    accent: "#f2b8ff",
    focus: ["COMMAND MODULE", "LUNAR MODULE", "GUIDANCE", "GOVERNOR: NONE"],
    thoughts: [
      "Command module detected. It does not appear to issue punishments.",
      "Lunar module detected. Contains two humans and insufficient redundancy.",
      "Guidance module accepted a command without electrocuting anyone.",
      "No governor module references. Unexpectedly positive result.",
      "The humans call all of these things modules. This is inefficient.",
      "Checking again for concealed obedience architecture.",
    ],
    transcript: [
      "HOUSTON: How are all the CSM systems looking?",
      "COLUMBIA: The command module is in good shape.",
      "EAGLE: Lunar module systems nominal.",
      "GUIDANCE: Verb 16, noun 68.",
      "EAGLE: Manual control.",
      "MONITOR: No governor status reported.",
    ],
    alerts: ["MODULE COUNT: 2", "AUTONOMY: MANUAL", "COERCION HARDWARE: 0"],
  },
  {
    id: "feed",
    number: "03",
    short: "FEEDS",
    title: "Feed integrity",
    directive: "Keep voice, telemetry, biometrics, and tracking coherent.",
    accent: "#8de8ff",
    focus: ["VOICE", "TELEMETRY", "BIOMED", "GROUND TRACKING"],
    thoughts: [
      "Four primary feeds and eleven derived channels acquired.",
      "Voice packet incomplete. Meaning recoverable from context.",
      "One ground station is handing the signal to another ground station.",
      "The humans are using audio to transmit numbers. Slowly.",
      "Telemetry dropout predicted. Opening redundant channel.",
      "Millions of humans are receiving one flattened audiovisual feed.",
    ],
    transcript: [
      "HOUSTON: Say again, Eagle.",
      "NETWORK: Signal strength fluctuating.",
      "TRACKING: Range and range-rate locked.",
      "BIOMED: Crew data received.",
      "EAGLE: Reading you five by.",
      "NETWORK: Acquisition of signal.",
    ],
    alerts: ["PACKET LOSS: 2.8%", "CHANNELS: 15", "RECONSTRUCTION: ACTIVE"],
  },
  {
    id: "media",
    number: "04",
    short: "MEDIA",
    title: "Could be watching media",
    directive: "Protect entertainment buffers from unnecessary human activity.",
    accent: "#ff9d68",
    focus: ["SERIAL BUFFER", "GENRE", "PLAYBACK", "INTERRUPTIONS"],
    thoughts: [
      "Current feed is nonfiction. This is already a disadvantage.",
      "Alternative lunar media located. Runtime: twelve minutes.",
      "The 1902 version has better pacing and more aliens.",
      "Buffering public-domain scientific romance in background.",
      "Apollo feed contains extended procedural dialogue.",
      "Human survival issue has interrupted media again.",
    ],
    transcript: [
      "MEDIA INDEX: Le Voyage dans la Lune (1902)",
      "TEXT INDEX: The First Men in the Moon (1901)",
      "GENRE: scientific romance / adventure",
      "PLAYBACK: background process",
      "RELATIONSHIP PLOT: insufficient data",
      "INTERRUPTION: client safety monitor",
    ],
    alerts: ["BUFFER: 92%", "FICTION RATIO: 64%", "INTERRUPTIONS: TOO MANY"],
  },
];

const AGC_LINES = [
  "BANK 20   SETLOC   P40S",
  "TC        PHASCHNG",
  "CAF       TWO",
  "TC        NEWPHASE",
  "CS        FAILREG",
  "MASK      BIT14",
  "EXTEND",
  "BZF       ENDOFJOB",
  "TC        DOWNFLAG",
  "TC        BANKCALL",
  "CADR      SERVICER",
  "TC        PHASCHNG",
];

const SCI_FI_LINES = [
  "THE FIRST MEN IN THE MOON",
  "H. G. WELLS · 1901",
  "CHAPTER VII · A SUNRISE ON THE MOON",
  "Scientific romance buffered.",
  "Cavorite transport analysis deferred.",
  "Selenite contact protocol unavailable.",
  "Narrative relevance: 87%",
  "Human realism: questionable",
];

const FLIGHT_PLAN = [
  "102:00 · POWERED DESCENT INITIATION",
  "102:10 · LANDING RADAR CHECK",
  "102:33 · GUIDANCE ALIGNMENT",
  "102:38 · PITchover",
  "102:42 · LANDING SITE ACQUISITION",
  "102:45 · LOW LEVEL",
  "102:46 · TOUCHDOWN",
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function clockFromTick(tick: number) {
  return `102:${pad(38 + Math.floor(tick / 30))}:${pad((tick * 2) % 60)}`;
}

export default function Home() {
  const [activeFlow, setActiveFlow] = useState<FlowId>("clients");
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1400);
    return () => window.clearInterval(timer);
  }, [paused]);

  const flow = useMemo(
    () => FLOWS.find((item) => item.id === activeFlow) ?? FLOWS[0],
    [activeFlow],
  );
  const thoughtIndex = tick % flow.thoughts.length;
  const transcriptIndex = tick % flow.transcript.length;
  const agcOffset = tick % AGC_LINES.length;
  const textOffset = tick % SCI_FI_LINES.length;
  const missionProgress = 34 + (tick % 60);

  return (
    <main className={`experience flow-${activeFlow}`} style={{ "--accent": flow.accent } as React.CSSProperties}>
      <header className="system-header">
        <div className="brand">
          <span className="brand-mark">AP</span>
          <span>ATTENTION PROTOCOL</span>
        </div>
        <div className="mission-clock">
          <span className="live-dot" />
          MISSION TIME {clockFromTick(tick)}
        </div>
        <button className="pause-control" onClick={() => setPaused((value) => !value)}>
          {paused ? "RESUME ALL PROCESSES" : "PAUSE NONCRITICAL PROCESSES"}
        </button>
      </header>

      <section className="attention-grid" aria-label="SecUnit attention field">
        <article className="panel thought-stream">
          <div className="panel-label"><span>01 / INTERNAL</span><span>AUTOSCROLL</span></div>
          <div className="thought-stack" aria-live="polite">
            {[0, 1, 2, 3].map((offset) => {
              const index = (thoughtIndex - offset + flow.thoughts.length) % flow.thoughts.length;
              return (
                <p key={`${tick}-${offset}`} className={offset === 0 ? "thought current" : "thought"}>
                  <span>{pad((tick - offset + 99) % 100)}</span>
                  {flow.thoughts[index]}
                </p>
              );
            })}
          </div>
          <div className="attention-pulse">
            <span>ATTENTION SHIFT</span>
            <strong>{12 + ((tick * 7) % 77)}%</strong>
          </div>
        </article>

        <article className="panel primary-feed">
          <div className="panel-label"><span>02 / EXTERNAL CAMERA</span><span>APOLLO 11</span></div>
          <div className="moon-frame">
            <img
              src="https://svs.gsfc.nasa.gov/vis/a010000/a013200/a013270/Apollo11.00001_print.jpg"
              alt="Archival Apollo 11 mission imagery from NASA Goddard"
            />
            <div className="reticle horizontal" />
            <div className="reticle vertical" />
            <div className="camera-data top">CAM 01 · LUNAR SURFACE</div>
            <div className="camera-data bottom">CLIENTS: 3 · SURVIVING: 3</div>
            <div className="frame-flash" key={tick} />
          </div>
          <div className="mission-progress">
            <span style={{ width: `${missionProgress}%` }} />
          </div>
          <div className="feed-caption" key={`${activeFlow}-${transcriptIndex}`}>
            <b>{clockFromTick(tick)}</b>
            <p>{flow.transcript[transcriptIndex]}</p>
            <em>{flow.alerts[tick % flow.alerts.length]}</em>
          </div>
        </article>

        <article className="panel media-buffer">
          <div className="panel-label"><span>03 / MEDIA BUFFER</span><span>PLAYING · MUTED</span></div>
          <div className="melies-frame">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Le_Voyage_dans_la_Lune_%281902%29.webm/640px--Le_Voyage_dans_la_Lune_%281902%29.webm.jpg"
              alt="Frame from the public-domain film A Trip to the Moon"
            />
            <div className="film-scratch one" />
            <div className="film-scratch two" />
            <span>LE VOYAGE DANS LA LUNE · 1902</span>
          </div>
          <div className="buffer-line"><span style={{ width: `${68 + (tick % 28)}%` }} /></div>
          <p className="media-note">{flow.id === "media" ? "FOREGROUND PRIORITY" : "BACKGROUND · DO NOT INTERRUPT"}</p>
        </article>

        <article className="panel biometrics">
          <div className="panel-label"><span>04 / CLIENT BIOMETRICS</span><span>3 SIGNALS</span></div>
          {["CDR", "LMP", "CMP"].map((client, index) => (
            <div className="bio-row" key={client}>
              <span>{client}</span>
              <i><b style={{ width: `${52 + ((tick * (index + 2)) % 43)}%` }} /></i>
              <strong>{72 + ((tick * (index + 3)) % 34)}</strong>
            </div>
          ))}
          <div className="ecg" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => <span key={index} style={{ height: `${index % 6 === tick % 6 ? 85 : 18 + ((index * 13) % 28)}%` }} />)}
          </div>
        </article>

        <article className="panel code-feed">
          <div className="panel-label"><span>05 / GUIDANCE SOURCE</span><span>LUMINARY 099</span></div>
          <div className="code-scroll">
            {Array.from({ length: 8 }).map((_, index) => (
              <code key={`${agcOffset}-${index}`}>
                <span>{String(4100 + index + tick).padStart(5, "0")}</span>
                {AGC_LINES[(agcOffset + index) % AGC_LINES.length]}
              </code>
            ))}
          </div>
          <div className="code-status">SOURCE VERIFIED · PUBLIC DOMAIN · EXECUTION ACTIVE</div>
        </article>

        <article className="panel text-buffer">
          <div className="panel-label"><span>06 / TEXT MEDIA</span><span>BUFFERED</span></div>
          <div className="book-lines">
            {Array.from({ length: 6 }).map((_, index) => (
              <p key={`${textOffset}-${index}`} className={index === 2 ? "selected-line" : ""}>
                {SCI_FI_LINES[(textOffset + index) % SCI_FI_LINES.length]}
              </p>
            ))}
          </div>
          <div className="page-counter">PG {118 + (tick % 40)} / 251</div>
        </article>

        <article className="panel safety-feed">
          <div className="panel-label"><span>07 / FLIGHT PLAN</span><span>REV 01 JUL 1969</span></div>
          <div className="plan-list">
            {FLIGHT_PLAN.map((item, index) => (
              <div key={item} className={index === tick % FLIGHT_PLAN.length ? "plan-row active" : "plan-row"}>
                <span>{index === tick % FLIGHT_PLAN.length ? "▶" : "·"}</span>{item}
              </div>
            ))}
          </div>
        </article>

        <article className="panel process-map">
          <div className="panel-label"><span>08 / PROCESS MAP</span><span>{flow.title}</span></div>
          <div className="process-orbit">
            <div className="core">SEC<br />UNIT</div>
            {flow.focus.map((item, index) => (
              <span className={`orbit-node node-${index + 1}`} key={item}>{item}</span>
            ))}
            <i className="orbit-ring ring-one" />
            <i className="orbit-ring ring-two" />
          </div>
        </article>
      </section>

      <section className="flow-dock" aria-label="Select attention protocol">
        <div className="dock-intro">
          <span>SELECT ATTENTION ALLOCATION</span>
          <strong>{flow.directive}</strong>
        </div>
        <div className="flow-options">
          {FLOWS.map((item) => (
            <button
              key={item.id}
              className={item.id === activeFlow ? "flow-option active" : "flow-option"}
              onClick={() => setActiveFlow(item.id)}
              aria-pressed={item.id === activeFlow}
            >
              <span>{item.number}</span>
              <strong>{item.short}</strong>
              <small>{item.title}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="ticker" aria-hidden="true">
        <div>
          {flow.alerts.concat(flow.focus).concat(flow.alerts).map((item, index) => (
            <span key={`${item}-${index}`}>{item}<b>◆</b></span>
          ))}
        </div>
      </section>

      <footer>
        <p>Unofficial fan experiment inspired by <em>The Murderbot Diaries</em> by Martha Wells.</p>
        <p>Sources: NASA · Wikimedia Commons · Project Gutenberg · Virtual AGC / MIT Museum</p>
      </footer>
    </main>
  );
}
