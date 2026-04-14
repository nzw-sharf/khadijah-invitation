'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './Invitation.module.css'

const SCREENS = ['intro', 'details', 'rsvp', 'guests', 'decline', 'location']

export default function Invitation() {
  const [screen, setScreen] = useState('intro')
  const [guestCount, setGuestCount] = useState(1)
  const [locMsg, setLocMsg] = useState("We can't wait to celebrate with you!")
  const wrapRef = useRef(null)

  function go(s) {
    setScreen(s)
    if (s === 'location') burst()
  }

  function adj(d) {
    setGuestCount(n => Math.max(1, Math.min(20, n + d)))
  }

  function confirm() {
    setLocMsg(guestCount === 1 ? 'See you there!' : `See all ${guestCount} of you there!`)
    go('location')
  }

  function burst() {
    if (!wrapRef.current) return
    const cols = ['#c8d898','#d4c870','#b8e0c0','#e8d898','#a8c870','#f0e8b0']
    for (let i = 0; i < 34; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position:absolute;width:9px;height:9px;opacity:1;pointer-events:none;z-index:10;
        background:${cols[i % cols.length]};
        left:${Math.random() * 100}%;top:-5%;
        border-radius:${Math.random() > .5 ? '50%' : '3px'};
        animation:confFall ${1.4 + Math.random() * 2}s ease ${Math.random()}s forwards;
        transform:rotate(${Math.random() * 360}deg);
      `
      wrapRef.current.appendChild(el)
      setTimeout(() => el?.remove(), 4200)
    }
  }

  const guestHint = [
    '', 'Just you — how lovely!', 'A beautiful pair!', 'A wonderful trio!'
  ]

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <Petals />

      {screen === 'intro'    && <IntroScreen    go={go} />}
      {screen === 'details'  && <DetailsScreen  go={go} />}
      {screen === 'rsvp'     && <RsvpScreen     go={go} />}
      {screen === 'guests'   && <GuestsScreen   go={go} guestCount={guestCount} adj={adj} confirm={confirm} guestHint={guestHint} />}
      {screen === 'decline'  && <DeclineScreen  go={go} />}
      {screen === 'location' && <LocationScreen locMsg={locMsg} />}
    </div>
  )
}

/* ─── PETALS ─── */
function Petals() {
  useEffect(() => {
    const container = document.getElementById('petals')
    if (!container) return
    const cols = ['#c8d898','#d4c870','#deecd4','#e8d8a0']
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div')
      const s = 8 + Math.random() * 9
      p.style.cssText = `
        position:absolute;border-radius:50% 0 50% 0;pointer-events:none;z-index:0;
        background:${cols[i % cols.length]};
        left:${Math.random() * 100}%;top:-14px;
        width:${s}px;height:${s * 1.3}px;
        animation:petalDrop ${7 + Math.random() * 9}s linear ${Math.random() * 10}s infinite;
        opacity:.7;
      `
      container.appendChild(p)
    }
    return () => { if (container) container.innerHTML = '' }
  }, [])
  return <div id="petals" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }} />
}

/* ─── DIVIDER ─── */
function Divider() {
  return (
    <div className={styles.divRow}>
      <div className={styles.divLine} />
      <div className={styles.divGem} />
      <div className={styles.divLine} />
    </div>
  )
}

/* ─── SPARKS ─── */
function Sparks() {
  const sparks = [
    { top:'7%',  left:'12%',  color:'#c8d898', delay:'0s'   },
    { top:'15%', right:'10%', color:'#d4b870', delay:'.9s'  },
    { bottom:'20%', left:'8%',   color:'#b8c898', delay:'1.6s' },
    { bottom:'13%', right:'15%', color:'#d4c870', delay:'.4s'  },
    { top:'42%', right:'7%',  color:'#a8c880', delay:'1.2s' },
  ]
  return sparks.map((s, i) => (
    <div key={i} className={styles.spark} style={{
      ...s,
      background: s.color,
      animationDelay: s.delay,
    }} />
  ))
}

/* ─── EARRING SVG ─── */
function EarringSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:64, height:64 }}>
      <circle cx="40" cy="22" r="13" stroke="#8aaa58" strokeWidth="2.5" fill="#deecd4"/>
      <circle cx="40" cy="22" r="5.5" fill="#a8b870" opacity=".85"/>
      <path d="M40 35 Q50 52 46 66" stroke="#a8973a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="46" cy="68" r="5.5" fill="#c0a040" opacity=".8"/>
      <path d="M16 46 Q16 41 20.5 41 Q25 41 25 46 Q25 51 20.5 55 Q16 51 16 46Z" fill="#c8d898" opacity=".75"/>
      <path d="M55 46 Q55 41 59.5 41 Q64 41 64 46 Q64 51 59.5 55 Q55 51 55 46Z" fill="#c8d898" opacity=".75"/>
      <circle cx="24" cy="13" r="3"   fill="#d4b870" opacity=".85"/>
      <circle cx="58" cy="31" r="2.5" fill="#d4c870" opacity=".85"/>
    </svg>
  )
}

/* ─── INTRO ─── */
function IntroScreen({ go }) {
  return (
    <div className={`${styles.screen} ${styles.screenIntro}`}>
      <Sparks />
      <div className={styles.ring}>
        <EarringSVG />
      </div>
      <p className={`${styles.eyebrow} ${styles.animFadeDown1}`}>You are warmly invited to celebrate</p>
      <h1 className={`${styles.iName} ${styles.animFadeDown2}`}>Khadijah's</h1>
      <p className={`${styles.iTag} ${styles.animFadeUp1}`}>Ear Piercing Ceremony</p>
      <Divider />
      <p className={`${styles.iQuote} ${styles.animFadeUp2}`}>"A tiny milestone, a lifetime of sparkle"</p>
      <button className={`${styles.btnSage} ${styles.animPopIn}`} onClick={() => go('details')}>
        Open Invitation ✦
      </button>
    </div>
  )
}

/* ─── DETAILS ─── */
function DetailsScreen({ go }) {
  return (
    <div className={`${styles.screen} ${styles.screenDetails}`}>
      <p className={`${styles.eyebrow} ${styles.animFadeDown1}`}>Bismillah — a blessed occasion</p>
      <h2 className={`${styles.detTitle} ${styles.animFadeDown2}`}>Zerlin Khadijah</h2>
      <p className={`${styles.detSub} ${styles.animFadeDown3}`}>Ear Piercing Ceremony</p>
      <Divider />
      <div className={styles.dcards}>
        <div className={`${styles.dc} ${styles.animSlide1}`}>
          <div className={`${styles.dico} ${styles.icoSage}`}>🗓</div>
          <div>
            <div className={styles.dlabel}>Date &amp; Time</div>
            <div className={styles.dval}>Tuesday, 29th April 2025</div>
            <div className={styles.dval2}>4:00 PM onwards</div>
          </div>
        </div>
        <div className={`${styles.dc} ${styles.animSlide2}`}>
          <div className={`${styles.dico} ${styles.icoGold}`}>📍</div>
          <div>
            <div className={styles.dlabel}>Venue</div>
            <div className={styles.dval}>Simnaz</div>
            <div className={styles.dval2}>Muzhappilangad, Kerala</div>
          </div>
        </div>
        <div className={`${styles.dc} ${styles.animSlide3}`}>
          <div className={`${styles.dico} ${styles.icoLav}`}>💕</div>
          <div>
            <div className={styles.dlabel}>Hosted by</div>
            <div className={styles.dval}>Junaid &amp; Nazwa</div>
          </div>
        </div>
      </div>
      <p className={`${styles.parNote} ${styles.animFadeUp1}`}>
        "Join us as our little princess receives her very first sparkle ✨"
      </p>
      <button className={styles.btnSage} onClick={() => go('rsvp')}>RSVP Now ✦</button>
    </div>
  )
}

/* ─── RSVP ─── */
function RsvpScreen({ go }) {
  return (
    <div className={`${styles.screen} ${styles.screenRsvp}`}>
      <div className={styles.rsvpIco}>💌</div>
      <h2 className={`${styles.rsvpH} ${styles.animFadeDown1}`}>Will you be joining us?</h2>
      <p className={`${styles.rsvpP} ${styles.animFadeDown2}`}>
        We would love to have you share this precious moment with Khadijah and our family.
        Your presence would make our celebration complete.
      </p>
      <div className={`${styles.rrow} ${styles.animFadeUp1}`}>
        <button className={styles.btnYes} onClick={() => go('guests')}>Yes, I'll be there!</button>
        <button className={styles.btnNo}  onClick={() => go('decline')}>Can't make it</button>
      </div>
    </div>
  )
}

/* ─── GUESTS ─── */
function GuestsScreen({ go, guestCount, adj, confirm, guestHint }) {
  return (
    <div className={`${styles.screen} ${styles.screenGuests}`}>
      <div className={styles.bigEmoji}>🎊</div>
      <h2 className={`${styles.gH} ${styles.animFadeDown1}`}>How many guests?</h2>
      <p className={`${styles.gP} ${styles.animFadeDown2}`}>
        Let us know how many people will be joining so we can prepare the warmest welcome!
      </p>
      <div className={`${styles.cntWrap} ${styles.animPopIn}`}>
        <button className={styles.cbtn} onClick={() => adj(-1)}>−</button>
        <div className={styles.cval}>{guestCount}</div>
        <button className={styles.cbtn} onClick={() => adj(1)}>+</button>
      </div>
      <p className={styles.gHint}>
        {guestCount <= 3 ? guestHint[guestCount] : `A lovely group of ${guestCount}!`}
      </p>
      <button className={styles.btnSage} onClick={confirm}>Confirm &amp; See Location ✦</button>
    </div>
  )
}

/* ─── DECLINE ─── */
function DeclineScreen({ go }) {
  return (
    <div className={`${styles.screen} ${styles.screenDecline}`}>
      <div className={styles.floatEmoji}>🌿</div>
      <h2 className={styles.decH}>We will miss you!</h2>
      <p className={styles.decP}>
        Thank you for letting us know.
      </p>
      <div className={styles.quoteCard}>
        <p className={styles.quoteText}>
          "Some celebrations are felt in the heart, no matter the distance."
        </p>
      </div>
      <button className={styles.btnSage} onClick={() => go('rsvp')}>← Go back</button>
    </div>
  )
}

/* ─── LOCATION ─── */
function LocationScreen({ locMsg }) {
  return (
    <div className={`${styles.screen} ${styles.screenLocation}`}>
      <p className={`${styles.eyebrow} ${styles.animFadeDown1}`}>You're all set</p>
      <h2 className={`${styles.locH} ${styles.animFadeDown2}`}>Here's where to find us</h2>
      <p className={`${styles.locS} ${styles.animFadeDown3}`}>{locMsg}</p>

      <div className={`${styles.mapBox} ${styles.animFadeUp1}`}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.531943991244!2d75.44298477532931!3d11.797970139520773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4259ece3ee409%3A0x92ff482b0e207747!2sSimanz!5e0!3m2!1sen!2sae!4v1776143499471!5m2!1sen!2sae"
          allowFullScreen
          loading="lazy"
          title="Venue location"
          style={{ width:'100%', height:'100%', border:'none', display:'block' }}
        />
      </div>

      <div className={`${styles.lcard} ${styles.animFadeUp2}`}>
        <div style={{ fontSize:28 }}>📍</div>
        <div>
          <div className={styles.lname}>Simnaz</div>
          <div className={styles.laddr}>Muzhappilangad, Kerala</div>
          <div className={styles.ltime}>29th April 2025 · 4:00 PM onwards</div>
        </div>
      </div>

      <a
        href="https://maps.app.goo.gl/BCz6Fyik73USEY1j6"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btnGold} ${styles.animPopIn}`}
      >
        Open in Google Maps 🧭
      </a>

      <p className={`${styles.signoff} ${styles.animFadeUp3}`}>With love, Junaid &amp; Nazwa 💕</p>
    </div>
  )
}
