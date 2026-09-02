#!/usr/bin/env python3
"""Flatten docs.json navigation into a Grav folder plan.

STRATEGY: mirror the Mintlify file path so every URL is preserved, and take the
numeric folder prefixes from navigation order. Grav strips "NN." from URLs, so
   user/pages/02.kb/03.foundations/05.glossary/default.md  ->  /kb/foundations/glossary

Pages nested under a Mintlify group `root` (e.g. crc-guide under Coordinator) are
listed separately: nesting them in Grav restores the sidebar shape but changes
their URL, so each needs a redirect. Decide per page.
"""
import json, re
from collections import OrderedDict, defaultdict

slug = lambda s: re.sub(r'[^a-z0-9]+', '-', str(s).lower()).strip('-')
d = json.load(open('docs.json'))

pages = []
def walk(items, trail, parent_root=None):
    n = 0
    for it in items:
        if isinstance(it, str):
            n += 1; pages.append({"page": it, "trail": [t['label'] for t in trail],
                                  "nav_ord": n, "under_root": parent_root})
        elif isinstance(it, dict):
            kids = it.get('pages') or it.get('groups') or it.get('menu') or []
            label = it.get('group') or it.get('menu_item') or it.get('item')
            if 'page' in it and not kids:
                n += 1; pages.append({"page": it['page'], "trail": [t['label'] for t in trail],
                                      "nav_ord": n, "under_root": parent_root}); continue
            n += 1
            here = trail + ([{"label": label, "ord": n}] if label else [])
            root = it.get('root')
            if root:
                pages.append({"page": root, "trail": [t['label'] for t in trail],
                              "nav_ord": n, "under_root": parent_root, "is_group_root": True,
                              "group_label": label})
            walk(kids, here, root or parent_root)

for L in d['navigation']['languages']:
    for t in L.get('tabs', []):
        walk(t.get('groups') or t.get('pages') or t.get('menu') or [],
             [{"label": t.get('tab'), "ord": 0}])

# assign prefixes: first-appearance order among siblings sharing a parent dir
order = defaultdict(OrderedDict)          # parent dir -> {segment: rank}
for p in pages:
    segs = p['page'].split('/')
    for i, s in enumerate(segs):
        parent = "/".join(segs[:i])
        if s not in order[parent]:
            order[parent][s] = len(order[parent]) + 1

for p in pages:
    segs, out = p['page'].split('/'), []
    for i, s in enumerate(segs):
        parent = "/".join(segs[:i])
        out.append(f"{order[parent][s]:02d}.{s}")
    p['grav_folder'] = "user/pages/" + "/".join(out) + "/default.md"
    p['url'] = "/" + p['page']

nested = [p for p in pages if p.get('under_root')]
json.dump(pages, open('_port/nav-order.json','w'), indent=2)

print(f"pages           : {len(pages)}")
print(f"URLs preserved  : {len(pages)} of {len(pages)}")
print(f"\nSidebar nesting lost unless you also nest the folder ({len(nested)} pages):")
for p in nested:
    print(f"  {p['page']:26s}  sits under group root '{p['under_root']}'")
print("\nSample of the plan:")
for p in pages[:3] + [x for x in pages if x['page'].startswith('kb/foundations')][:3]:
    print(f"  {p['url']:42s} <- {p['grav_folder']}")
