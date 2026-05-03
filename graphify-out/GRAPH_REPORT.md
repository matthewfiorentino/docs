# Graph Report - docs  (2026-05-03)

## Corpus Check
- 6 files · ~422,503 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 109 nodes · 213 edges · 13 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `kpTransition()` - 28 edges
2. `kpRouteFromHash()` - 11 edges
3. `jcStartScenarioDirect()` - 8 edges
4. `kpSeqRender()` - 7 edges
5. `jcStartScenario()` - 7 edges
6. `escHtml()` - 6 edges
7. `renderQuestion()` - 6 edges
8. `reconcileVisibility()` - 6 edges
9. `kpActivateDirect()` - 6 edges
10. `inspStartTopicDirect()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `kpTransition()` --calls--> `kpPushHash()`  [EXTRACTED]
  public/ll-script.js → public/ll-script.js  _Bridges community 3 → community 11_
- `kpGoBack()` --calls--> `kpTransition()`  [EXTRACTED]
  public/ll-script.js → public/ll-script.js  _Bridges community 3 → community 12_
- `kpSelectStudyType()` --calls--> `kpTransition()`  [EXTRACTED]
  public/ll-script.js → public/ll-script.js  _Bridges community 3 → community 13_
- `kpStartBrowse()` --calls--> `kpTransition()`  [EXTRACTED]
  public/ll-script.js → public/ll-script.js  _Bridges community 3 → community 4_
- `kpGoToInspHub()` --calls--> `kpTransition()`  [EXTRACTED]
  public/ll-script.js → public/ll-script.js  _Bridges community 3 → community 2_

## Communities (15 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.19
Nodes (15): buildChecklist(), buildNextSteps(), escHtml(), handleOptClick(), isVisible(), questionsInSection(), reconcileVisibility(), refreshQuestionLabel() (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (3): kpDrNext(), kpDrPrev(), kpDrRenderFinding()

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (17): inspBuildHub(), jcBuildHub(), jcNextScene(), jcRenderAllScenes(), jcRenderHeader(), jcRenderTracker(), jcRestartScenario(), jcShowScene() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (13): inspGoHub(), jcGoHub(), kpAnimateIn(), kpAnimateOut(), kpEndGhost(), kpGoBackNoHash(), kpGoHome(), kpGoToDocReviewHub() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (11): kpBuildBrowseQueue(), kpBuildInspectionQueue(), kpBuildShuffleQueue(), kpEndPrimary(), kpSelectBrowseMode(), kpSeqNext(), kpSeqRender(), kpShowEnd() (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.38
Nodes (7): inspBuildQueue(), inspNext(), inspRenderCard(), inspRenderHeader(), inspRestart(), inspStartTopic(), inspStartTopicDirect()

### Community 6 - "Community 6"
Cohesion: 0.83
Nodes (3): dismiss(), getLang(), init()

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (3): jcBuildRole(), jcGoRole(), jcSelectRole()

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `kpTransition()` connect `Community 3` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `kpRouteFromHash()` connect `Community 2` to `Community 1`, `Community 5`, `Community 13`, `Community 9`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `jcStartScenarioDirect()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._