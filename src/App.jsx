import { useEffect, useRef, useState } from "react";
import { coreLeadershipImpact, experience, resumeSummary } from "./data/resumeData";
import backgroundImage from "./assets/images/background.jpg";
import profileImage from "./assets/images/profile-picture.jpg";
import hitachiLogo from "./assets/logos/hitachi-energy-linkedin.jpg";
import abbLogo from "./assets/logos/abb-linkedin.jpg";

const VIEW_TRANSITION_MS = 320;
const VIEWS = {
  profile: "profile",
  resume: "resume",
};

const COMPANY_LOGOS = {
  hitachi: hitachiLogo,
  abb: abbLogo,
};

function getTransitionDirection(targetView) {
  return targetView === VIEWS.resume ? "forward" : "backward";
}

function App() {
  const [activeView, setActiveView] = useState(VIEWS.profile);
  const [outgoingView, setOutgoingView] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState(() => new Set([0]));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const switchView = (targetView) => {
    if (targetView === activeView) {
      return;
    }

    const direction = getTransitionDirection(targetView);
    setTransitionDirection(direction);

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    if (prefersReducedMotion) {
      setActiveView(targetView);
      setOutgoingView(null);
      setIsTransitioning(false);
      return;
    }

    setOutgoingView(activeView);
    setActiveView(targetView);
    setIsTransitioning(true);

    transitionTimerRef.current = window.setTimeout(() => {
      setOutgoingView(null);
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, VIEW_TRANSITION_MS);
  };

  const toggleJob = (index) => {
    setExpandedJobs((current) => {
      const next = new Set(current);

      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const renderView = (viewName, content) => {
    if (viewName !== activeView && viewName !== outgoingView) {
      return null;
    }

    const panelClassNames = ["view-panel"];

    if (isTransitioning && outgoingView) {
      panelClassNames.push(
        viewName === activeView
          ? `panel-enter panel-enter-${transitionDirection}`
          : `panel-leave panel-leave-${transitionDirection}`
      );
    } else {
      panelClassNames.push("panel-static");
    }

    return (
      <div className={panelClassNames.join(" ")} key={viewName}>
        {content}
      </div>
    );
  };

  return (
    <main className="page">
      <div className="card s0">
        <div className="hero-photo-wrap">
          <img src={backgroundImage} alt="Mateusz Hoffman speaking at a panel event" />
        </div>

        <div className="avatar-bridge s1">
          <div className="avatar-wrap">
            <img src={profileImage} alt="Mateusz Hoffman" />
          </div>
        </div>

        <div className="card-body">
          <div className="view-stack" aria-live="polite">
            {renderView(
              VIEWS.profile,
              <section className="view-content view-profile" aria-label="Profile view">
                <section className="hero-text s1">
                  <p className="overtitle">
                    <span className="status-dot"></span>
                    Open to remote/hybrid roles
                  </p>
                  <h1 className="name">Mateusz Hoffman</h1>
                  <p className="role-line">
                    Engineering/IT Management | Program Delivery | Digital Transformation
                  </p>

                  <div className="cta s2">
                    <button
                      type="button"
                      className="btn btn-fill"
                      id="btn-resume"
                      onClick={() => switchView(VIEWS.resume)}
                    >
                      <DownloadIcon />
                      View Resume
                    </button>

                    <a
                      className="btn btn-ring"
                      href="https://linkedin.com/in/mateuszhoffman"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="btn-linkedin"
                    >
                      <LinkedInIcon />
                      View LinkedIn Profile
                    </a>

                    <a className="btn btn-ring" href="mailto:mateusz.hoffman@gmail.com" id="btn-email">
                      <EmailIcon />
                      Contact via Email
                    </a>
                  </div>
                  <p className="cta-note s2">
                    Open to relevant leadership opportunities. I typically reply within 24 hours.
                  </p>
                </section>

                <hr className="sep s3" />

                <section className="bio s3">
                  <p>Hi, I'm Mateusz 👋 — an Engineering and IT leader with <strong>10+ years</strong> of experience building teams, delivering transformation programs, and turning emerging technology into <strong>measurable business outcomes</strong>.</p>
                  <p>At Hitachi Energy, I operate as a <strong>leader-of-leaders</strong> — overseeing innovation services across <strong>Artificial Intelligence, Extended Reality, and Autonomous Mobile Robots</strong>, processing <strong>350+ innovation demands</strong> and realizing <strong>$2.5M+</strong> in estimated value. Across my career, I've directly and indirectly led <strong>24+ cross-functional professionals</strong> in global delivery environments.</p>
                  <p>I'm driven by curiosity — understanding real industry problems and designing scalable solutions to solve them. I love the creative side of leadership: brainstorming, building vision, and breaking big ideas into executable steps. Most of all, I believe great outcomes start with great people — finding what each person excels at, putting them in the right place, and building a team culture that makes excellent work feel natural.</p>
                </section>

                <hr className="sep s4" />

                <section className="s4">
                  <p className="label">Open To Opportunities</p>
                  <div className="pill-row">
                    <span className="pill">Engineering Manager</span>
                    <span className="pill">Technical Program Manager</span>
                    <span className="pill">Digital Transformation Manager</span>
                    <span className="pill">Senior IT Manager</span>
                    <span className="pill">Director of Engineering</span>
                  </div>
                </section>

                <section className="s4 section-space">
                  <p className="label">Available For</p>
                  <div className="pill-row">
                    <span className="pill pill-purple">Podcast Interviews</span>
                    <span className="pill pill-orange">Conference Speaking</span>
                    <span className="pill pill-pink">Panel Discussions</span>
                    <span className="pill pill-teal">Hackathon Judging</span>
                    <span className="pill pill-green">AI Training &amp; Workshops</span>
                    <span className="pill pill-purple">Webinars &amp; Guest Lectures</span>
                  </div>
                </section>

                <section className="s5 section-space">
                  <p className="label">Selected Impact</p>
                  <div className="impact-grid">
                    <article className="impact-card">
                      <p className="impact-title">Leadership Scope</p>
                      <p className="impact-text">
                        Led multiple cross-functional teams totaling 24+ professionals across
                        engineering and operational functions in global delivery environments.
                      </p>
                    </article>
                    <article className="impact-card">
                      <p className="impact-title">Delivery Scale</p>
                      <p className="impact-text">
                        Managed and coordinated over 350 innovations across business units through
                        structured intake and prioritization.
                      </p>
                    </article>
                  </div>
                </section>

                <section className="s5 section-space">
                  <p className="label">Core Expertise</p>
                  <div className="chips">
                    <span className="chip">AI/LLM Strategy &amp; Execution</span>
                    <span className="chip">AI Agents &amp; Intelligent Automation</span>
                    <span className="chip">Innovation Portfolio Management</span>
                    <span className="chip">Cloud Computing &amp; IoT Platforms</span>
                    <span className="chip">Engineering Management</span>
                    <span className="chip">Team Scaling &amp; Development</span>
                    <span className="chip">Stakeholder Management</span>
                    <span className="chip">Cross-Functional Leadership</span>
                    <span className="chip">Program Delivery</span>
                    <span className="chip">Technical Roadmapping</span>
                    <span className="chip">Value Realization &amp; KPIs</span>
                    <span className="chip">Leader-of-Leaders Model</span>
                    <span className="chip">Agile Delivery at Scale</span>
                    <span className="chip">Budget &amp; Vendor Management</span>
                  </div>
                </section>

                <hr className="sep s5" />

                <footer className="footer s6">
                  © 2026 Made by Mateusz Hoffman
                </footer>
              </section>
            )}

            {renderView(
              VIEWS.resume,
              <section className="view-content view-resume" aria-label="Resume view">
                <header className="resume-view-header s1">
                  <button
                    type="button"
                    className="btn btn-plain resume-back"
                    onClick={() => switchView(VIEWS.profile)}
                  >
                    <ArrowLeftIcon />
                    Back to Profile
                  </button>
                  <p className="drawer-kicker">Resume</p>
                  <h2 className="resume-view-name">Mateusz Hoffman</h2>
                </header>

                <div className="resume-content s2">
                  <section className="resume-block s3">
                    <p className="resume-p">{resumeSummary}</p>
                  </section>

                  <section className="resume-block s4">
                    <p className="label">Core Leadership Impact</p>
                    <ul className="resume-list">
                      {coreLeadershipImpact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="resume-block s5">
                    <p className="label">Professional Experience</p>
                    <p className="resume-interaction-hint">Click each role card to show or hide detailed responsibilities.</p>
                    {experience.map((job, index) => {
                      const isExpanded = expandedJobs.has(index);
                      const { dateMain, dateLocation } = parseDateMeta(job.date);

                      return (
                        <article
                          className={`resume-job${job.current ? " current" : ""}`}
                          key={`${job.company}-${job.role}`}
                        >
                          <button
                            type="button"
                            className="resume-job-toggle"
                            aria-expanded={isExpanded}
                            onClick={() => toggleJob(index)}
                          >
                            <div className="resume-job-actions">
                              <span className="resume-toggle-text">{isExpanded ? "Hide details" : "Show details"}</span>
                              <ChevronIcon isExpanded={isExpanded} />
                            </div>
                            <div className="resume-job-main">
                              <CompanyBadge company={job.company} badge={job.badge} logo={job.logo} />
                              <div className="resume-job-meta">
                                <div className="resume-company-row">
                                  <p className="resume-company">{job.company}</p>
                                  {job.current ? <span className="current-role-pill">Current Role</span> : null}
                                </div>
                                <div className="resume-job-head">
                                  <h3 className="resume-role">{job.role}</h3>
                                  <div className="resume-date">
                                    <span className="resume-date-main">{dateMain}</span>
                                    {dateLocation ? <span className="resume-date-location">{dateLocation}</span> : null}
                                  </div>
                                </div>
                                <ul className="resume-list resume-teaser-list">
                                  <li>
                                    {job.teaser}
                                    {!isExpanded ? <span className="resume-more-indicator"> (...) more</span> : null}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </button>

                          <div className={`resume-job-body ${isExpanded ? "open" : ""}`}>
                            <div className="resume-job-body-inner">
                              <ul className="resume-list">
                                {job.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </section>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function CompanyBadge({ company, badge, logo }) {
  const label = badge || company.slice(0, 2).toUpperCase();
  const logoSrc = COMPANY_LOGOS[logo];

  if (logoSrc) {
    return (
      <span className="company-badge" aria-hidden="true">
        <img src={logoSrc} alt="" className="company-logo" />
      </span>
    );
  }

  return (
    <span className="company-badge" aria-hidden="true">
      {label}
    </span>
  );
}

function parseDateMeta(dateText) {
  const [dateMain, ...locationParts] = dateText.split("|").map((part) => part.trim());

  return {
    dateMain,
    dateLocation: locationParts.join(" | "),
  };
}

function ChevronIcon({ isExpanded }) {
  return (
    <svg
      className={`chevron ${isExpanded ? "open" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default App;
