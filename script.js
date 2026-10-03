const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

(function(){
  const style=document.createElement('style');
  style.textContent=`
    .real-screen-intro{grid-column:1/-1;margin:0 0 10px}.real-screen-intro h2{margin:.2rem 0 .55rem}.real-screen-intro p{max-width:850px;color:var(--muted,#aeb7c5)}
    .real-screen-card{background:rgba(8,13,22,.78);border:1px solid rgba(96,165,250,.2);border-radius:18px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.38)}
    .real-screen-card img{display:block;width:100%;height:auto;background:#05080d}.real-screen-copy{padding:16px 18px 18px}.real-screen-copy strong{display:block;margin-bottom:5px}.real-screen-copy span{color:var(--muted,#aeb7c5);font-size:.92rem;line-height:1.55}
    .real-badge{display:inline-block;margin-bottom:9px;padding:5px 9px;border-radius:999px;border:1px solid rgba(59,130,246,.42);background:rgba(37,99,235,.1);color:#8fc2ff;font-size:.7rem;font-weight:800;letter-spacing:.12em}
    .real-screen-note{grid-column:1/-1;color:var(--muted,#aeb7c5);font-size:.84rem;margin-top:4px}
    .gov-efficiency{margin-top:28px;padding:28px;border:1px solid rgba(96,165,250,.22);border-radius:20px;background:linear-gradient(145deg,rgba(10,16,28,.88),rgba(5,9,16,.78));box-shadow:0 22px 70px rgba(0,0,0,.25)}
    .gov-efficiency h3{font-size:clamp(1.45rem,3vw,2.1rem);margin:.25rem 0 .8rem}.gov-efficiency>p{max-width:900px;color:var(--muted,#aeb7c5);line-height:1.7}
    .eff-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}.eff-grid article{padding:16px;border-radius:14px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07)}.eff-grid strong{display:block;color:#9ac8ff;margin-bottom:7px}.eff-grid span{display:block;color:var(--muted,#aeb7c5);font-size:.88rem;line-height:1.5}
    .dev-evidence{margin-top:18px;padding:15px 17px;border-left:3px solid #3b82f6;background:rgba(37,99,235,.08);color:var(--muted,#aeb7c5);font-size:.9rem;line-height:1.6}.dev-evidence b{color:#fff}
    @media(max-width:850px){.eff-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.eff-grid{grid-template-columns:1fr}.gov-efficiency{padding:20px}}
  `;
  document.head.appendChild(style);

  const shots=document.querySelector('.dual-shot');
  if(shots){
    shots.innerHTML=`
      <div class="real-screen-intro">
        <div class="section-kicker">REAL PRODUCT SCREENS</div>
        <h2>Stone Wing running on Mac and Windows.</h2>
        <p>No concept renders here. These are current captures from the real released applications.</p>
      </div>
      <div class="real-screen-card">
        <a class="screenshot-link" href="https://spindleandstone.com/stone-wing-mac-app.png?v=release-3" target="_blank" rel="noopener"><img src="https://spindleandstone.com/stone-wing-mac-app.png?v=release-3" alt="Real Stone Wing macOS AI and Accounts settings screen" loading="lazy"></a>
        <div class="real-screen-copy"><div class="real-badge">MAC · REAL APP</div><strong>AI &amp; Accounts</strong><span>The Mac application showing its actual account, optional worker and provider configuration surface.</span></div>
      </div>
      <div class="real-screen-card">
        <a class="screenshot-link" href="https://spindleandstone.com/stone-wing-windows-app.png?v=release-3" target="_blank" rel="noopener"><img src="https://spindleandstone.com/stone-wing-windows-app.png?v=release-3" alt="Real Stone Wing Windows Appearance settings screen" loading="lazy"></a>
        <div class="real-screen-copy"><div class="real-badge">WINDOWS · REAL APP</div><strong>Appearance + glass controls</strong><span>The Windows application showing its actual theme, accent, glass transparency, corner shape and layout controls.</span></div>
      </div>
      <p class="real-screen-note">Actual application screenshots from Stone Wing for Mac and Windows.</p>`;
  }

  const gov=document.querySelector('#governance');
  if(gov && !document.querySelector('.gov-efficiency')){
    const block=document.createElement('div');
    block.className='gov-efficiency';
    block.innerHTML=`
      <div class="section-kicker">GOVERNANCE + EFFICIENCY</div>
      <h3>More control can mean less wasted chat.</h3>
      <p>Stone Wing governance separates investigation, authorization, execution and proof. That makes the conversation more efficient when AI is doing real work: verify the current state once, reuse valid evidence, ask for approval only at a real consequence boundary, execute the scoped action, then confirm the reached state instead of spending the next messages recovering from assumptions.</p>
      <div class="eff-grid">
        <article><strong>Reuse valid evidence</strong><span>Closed facts stay closed unless mutable state could have changed, reducing duplicate reads and repeat testing.</span></article>
        <article><strong>Approval where it matters</strong><span>Read-only investigation does not need to become the same thing as mutation, so routine work can continue without turning every step into a prompt.</span></article>
        <article><strong>Continue through blockers</strong><span>One blocked transaction does not have to stop unrelated safe, authorized work. The blocked item stays visible while the objective continues.</span></article>
        <article><strong>Prove the result</strong><span>Readback and exact-state verification reduce the follow-up work caused by false success, stale state or silent provider substitution.</span></article>
      </div>
    `;
    const box=gov.querySelector('.governance-box')||gov;
    box.insertAdjacentElement('afterend',block);
  }
})();
