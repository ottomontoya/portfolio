# Gates: portfolio audit

- [x] G1: The independent source review is checked against exact implementation evidence.
  EVIDENCE: Terra source result and follow-up independent live-evidence review received; leaf-1.1 manual gates independently checked. Root retained P2 for stale image and excluded speculative screen-reader conformance failure. Independent recalculation confirms F7's 3.71/3.75 contrast ratios.

- [x] G2: The existing application passes its production build.
  CHECK: npm run build
  EXPECT: built in
  EVIDENCE: automatic-evidence=v1; definition-sha256=46d72eccd628b28a4b0e974e69890ad856bb5d28a16876531804fc540a571513; exit=0; EXPECT=matched; output-sha256=ff8de2863477ce278aff4bd4fea200b275a0612af59fbaa15de12e9a30c29acc; output-bytes=556; shell=/bin/sh; cwd=/Users/otto/conductor/workspaces/portfolio/honolulu; path=6139f3e74d62/17 entries

- [x] G3: The report includes measured asset and bundle sizes and contextualized detector results.
  EVIDENCE: measurements.json records bundle and WebP sizes plus source-composited color ratios; contrast controls passed at 21:1 and 1:1. Static detector has 16 findings in degraded regex mode. Runtime DOM injection reports 16–21 groups across four cases; computed-style gradient check and positive control reject that false positive. Bounded scroll sample had no long tasks; no field-performance claim.

- [x] G4: Every accepted issue has evidence, impact, severity and a specific remedy; all five dimensions are scored with limitations.
  EVIDENCE: AUDIT.md contains seven unique issues (P0=0 P1=2 P2=4 P3=1), five dimension scores totaling 13/20, line references, live reproductions, specific effects and remedies, positives and prioritized skill actions. Chromium, assistive technology and performance coverage limits are explicit.

- [x] G5: The audit preserves application files and user changes and uses only authorized browser tools.
  EVIDENCE: Tracked diff remains empty; report and browser evidence are in .context, with .unlazy bookkeeping untracked. The user explicitly authorized Playwright or computer use for this follow-up. Browser-only test stubs were removed by navigation; native zoom restored to 100%.

- [x] G6: Live desktop/mobile, theme, keyboard and zoom behavior is verified using Playwright explicitly authorized by the user.
  EVIDENCE: Chromium production preview: 16 base layouts, 48 project/theme/width cases, 16 nav-boundary cases, keyboard focus/Tab/Escape, history and direct hashes, clipboard success/failure, reduced motion and no-JS context. Native Chrome 200% zoom measured at 640×450 CSS pixels/DPR 2; native captures confirm content. Five source defects reproduced and new F7 contrast measured at actual label centers. Raw results, screenshots and limits are recorded alongside AUDIT.md.
