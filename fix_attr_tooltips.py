#!/usr/bin/env python3
"""
fix_attr_tooltips.py — Remove <Tooltip> wrappers that were inserted inside
JSX string attribute values (e.g. title="..."). Replaces each with its inner
text. Safe to run multiple times.
"""
import re
from pathlib import Path

TOOLTIP_RE = re.compile(
    r'<Tooltip\s+tip="[^"]*"\s+headline="[^"]*"\s+cta="[^"]*"\s+href="[^"]*">'
    r'([^<]*)</Tooltip>'
)

def is_in_jsx_attr(line: str, pos: int) -> bool:
    """
    Returns True if position pos is inside a JSX string attribute value,
    or if the line is a bare attribute assignment (multi-line component).
    """
    # Fast path: line is a bare attribute line like  title="..."
    stripped = line.lstrip()
    if re.match(r'^[a-z][a-zA-Z]*\s*=\s*["\']', stripped):
        return True
    # State-machine scan from start of line to pos
    in_tag = False
    in_value = False
    i = 0
    while i < pos:
        c = line[i]
        if not in_tag and not in_value:
            if c == '<' and i + 1 < len(line) and line[i + 1].isalpha():
                in_tag = True
        elif in_tag and not in_value:
            if c == '>':
                in_tag = False
            elif c == '"':
                j = i - 1
                while j >= 0 and line[j] in ' \t':
                    j -= 1
                if j >= 0 and line[j] == '=':
                    in_value = True
        elif in_value:
            if c == '\\':
                i += 2
                continue
            elif c == '"':
                in_value = False
        i += 1
    return in_value

def fix_line(line: str) -> str:
    subs = []
    for m in TOOLTIP_RE.finditer(line):
        if is_in_jsx_attr(line, m.start()):
            subs.append((m.start(), m.end(), m.group(1)))
    if not subs:
        return line
    result = line
    for start, end, inner in reversed(subs):
        result = result[:start] + inner + result[end:]
    return result

def fix_file(fpath: Path) -> bool:
    text = fpath.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)
    out = [fix_line(l) for l in lines]
    new_text = ''.join(out)
    if new_text != text:
        fpath.write_text(new_text, encoding='utf-8')
        return True
    return False

root = Path('/Users/matthewfiorentino/Desktop/docs')
modified = []
for f in sorted(root.rglob('*.mdx')):
    if 'glossary' in f.name:
        continue
    if fix_file(f):
        modified.append(f.relative_to(root))

print(f"Fixed {len(modified)} file(s):")
for f in modified:
    print(f"  {f}")
