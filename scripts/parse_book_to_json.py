#!/usr/bin/env python3
"""
Parse the geometry book markdown into per-chapter JSON data files
for the React digital book reader.
"""

import json
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOK_PATH = os.path.join(BASE, 'geometry', 'GEOMETRY_AND_SHAPE_BOOK.md')
OUTPUT_DIR = os.path.join(BASE, 'public', 'data', 'geometry-book')
os.makedirs(OUTPUT_DIR, exist_ok=True)

CHAPTER_META = {
    1:  {'slug': 'introduction-to-shapes', 'title': 'Introduction to Shapes', 'problem_count': 225},
    2:  {'slug': 'basic-geometry', 'title': 'Basic Geometry', 'problem_count': 3856},
    3:  {'slug': 'triangle-problems', 'title': 'Triangle Problems', 'problem_count': 269},
    4:  {'slug': 'right-triangle-problems', 'title': 'Right Triangle Problems', 'problem_count': 20},
    5:  {'slug': 'rectangle-and-square-problems', 'title': 'Rectangle and Square Problems', 'problem_count': 450},
    6:  {'slug': 'circle-problems', 'title': 'Circle Problems', 'problem_count': 4116},
    7:  {'slug': 'coordinate-geometry', 'title': 'Coordinate Geometry', 'problem_count': 422},
    8:  {'slug': 'lines-and-slopes', 'title': 'Lines and Slopes', 'problem_count': 204},
    9:  {'slug': 'distance-and-midpoint', 'title': 'Distance and Midpoint', 'problem_count': 217},
    10: {'slug': 'polygon-problems', 'title': 'Polygon Problems', 'problem_count': 123},
    11: {'slug': 'grid-based-geometry', 'title': 'Grid-Based Geometry', 'problem_count': 402},
    12: {'slug': 'area-and-perimeter', 'title': 'Area and Perimeter', 'problem_count': 37},
    13: {'slug': 'angles-and-rotation', 'title': 'Angles and Rotation', 'problem_count': 72},
    14: {'slug': 'computational-geometry', 'title': 'Computational Geometry', 'problem_count': 107},
    15: {'slug': 'advanced-geometry-algorithms', 'title': 'Advanced Geometry Algorithms', 'problem_count': 172},
}

CHAPTER_ICONS = {
    1: '◇', 2: '●', 3: '△', 4: '⊿', 5: '▬',
    6: '○', 7: '⌖', 8: '╱', 9: '↔', 10: '⬠',
    11: '⊞', 12: '▣', 13: '⟳', 14: '⌂', 15: '✦',
}

CHAPTER_COLORS = {
    1: '#3b82f6', 2: '#6366f1', 3: '#22c55e', 4: '#ef4444', 5: '#eab308',
    6: '#a855f7', 7: '#06b6d4', 8: '#f97316', 9: '#10b981', 10: '#8b5cf6',
    11: '#ec4899', 12: '#14b8a6', 13: '#f43f5e', 14: '#0ea5e9', 15: '#84cc16',
}

def parse_blocks(markdown_text):
    """Parse markdown text into a list of content blocks."""
    blocks = []
    lines = markdown_text.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Skip empty lines at block boundaries
        if not line.strip():
            i += 1
            continue
        
        # Heading (##, ###, or ####)
        if re.match(r'^#{2,4}\s', line):
            level = len(re.match(r'^(#+)', line).group(1))
            text = re.sub(r'^#+\s+', '', line).strip()
            blocks.append({'type': 'heading', 'level': level, 'text': text})
            i += 1
            continue
        
        # Code block
        if line.startswith('```'):
            lang_match = re.match(r'```(\w*)', line)
            lang = lang_match.group(1) if lang_match else ''
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1  # skip closing ```
            code_text = '\n'.join(code_lines)
            # Look ahead for a caption
            caption = None
            if i < len(lines) and (lines[i].strip().startswith('//') or lines[i].strip().startswith('#')):
                caption = lines[i].strip().lstrip('/# ')
                i += 1
            blocks.append({'type': 'code', 'lang': lang, 'code': code_text, 'caption': caption})
            continue
        
        # Table
        if '|' in line and line.strip().startswith('|') and i + 1 < len(lines):
            table_lines = []
            while i < len(lines) and '|' in lines[i] and lines[i].strip().startswith('|'):
                table_lines.append(lines[i].strip())
                i += 1
            if len(table_lines) >= 2:
                headers = [h.strip() for h in table_lines[0].split('|')[1:-1]]
                rows = []
                for row_line in table_lines[2:]:
                    cells = [c.strip() for c in row_line.split('|')[1:-1]]
                    rows.append(cells)
                blocks.append({'type': 'table', 'headers': headers, 'rows': rows})
            continue
        
        # Horizontal rule
        if line.strip() == '---':
            blocks.append({'type': 'divider'})
            i += 1
            continue
        
        # List item
        if re.match(r'^[\s]*[-*+]\s', line):
            items = []
            while i < len(lines) and re.match(r'^[\s]*[-*+]\s', lines[i]):
                items.append(re.sub(r'^[\s]*[-*+]\s+', '', lines[i]))
                i += 1
            blocks.append({'type': 'list', 'items': items})
            continue
        
        # Numbered list item
        if re.match(r'^\d+[.)]\s', line):
            items = []
            while i < len(lines) and re.match(r'^\d+[.)]\s', lines[i]):
                items.append(re.sub(r'^\d+[.)]\s+', '', lines[i]))
                i += 1
            blocks.append({'type': 'list', 'items': items})
            continue
        
        # Regular text paragraph
        para_lines = []
        while i < len(lines) and line.strip() and not line.startswith('```') and not line.startswith('|') and not re.match(r'^#{1,4}\s', line) and not re.match(r'^[\s]*[-*+]\s', line) and not re.match(r'^\d+[.)]\s', line) and line.strip() != '---':
            para_lines.append(line)
            i += 1
            if i < len(lines):
                line = lines[i]
            else:
                break
        
        text = ' '.join(p.strip() for p in para_lines if p.strip()).strip()
        if text:
            blocks.append({'type': 'text', 'content': text})
        continue
    
    return blocks

def main():
    with open(BOOK_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by chapter headings
    chapter_pattern = re.compile(r'^## Chapter (\d+): (.+)$', re.MULTILINE)
    splits = list(chapter_pattern.finditer(content))
    
    # Find start of each chapter
    chapter_starts = []
    for m in splits:
        chapter_starts.append((m.start(), int(m.group(1)), m.group(2).strip()))
    
    chapter_data = {}
    
    for idx, (start_pos, ch_num, ch_title) in enumerate(chapter_starts):
        # Determine end position (start of next chapter or end of file)
        if idx + 1 < len(chapter_starts):
            end_pos = chapter_starts[idx + 1][0]
        else:
            # Find where appendices start
            appendix_pos = content.find('\n# Appendices', start_pos)
            if appendix_pos > 0:
                end_pos = appendix_pos
            else:
                end_pos = len(content)
        
        chapter_text = content[start_pos:end_pos].strip()
        
        # Parse blocks
        blocks = parse_blocks(chapter_text)
        
        meta = CHAPTER_META.get(ch_num, {'slug': f'chapter-{ch_num}', 'title': ch_title, 'problem_count': 0})
        
        chapter_entry = {
            'chapter': ch_num,
            'slug': meta['slug'],
            'title': meta['title'],
            'icon': CHAPTER_ICONS.get(ch_num, '📐'),
            'color': CHAPTER_COLORS.get(ch_num, '#3b9eff'),
            'problemCount': meta['problem_count'],
            'blocks': blocks,
        }
        
        chapter_data[ch_num] = chapter_entry
    
    # Write index file with chapter list
    index = {
        'totalChapters': len(chapter_data),
        'totalProblems': sum(m['problem_count'] for m in CHAPTER_META.values()),
        'chapters': []
    }
    
    for ch_num in sorted(chapter_data.keys()):
        entry = chapter_data[ch_num]
        index['chapters'].append({
            'chapter': entry['chapter'],
            'slug': entry['slug'],
            'title': entry['title'],
            'icon': entry['icon'],
            'color': entry['color'],
            'problemCount': entry['problemCount'],
        })
    
    with open(os.path.join(OUTPUT_DIR, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2)
    print(f"Written: index.json ({len(index['chapters'])} chapters)")
    
    # Write each chapter
    for ch_num in sorted(chapter_data.keys()):
        entry = chapter_data[ch_num]
        path = os.path.join(OUTPUT_DIR, f'{entry["slug"]}.json')
        
        # Estimate difficulty based on chapter number
        if ch_num <= 5:
            difficulty = 'Beginner'
        elif ch_num <= 10:
            difficulty = 'Intermediate'
        elif ch_num <= 13:
            difficulty = 'Advanced'
        else:
            difficulty = 'Expert'
        
        out_entry = {k: v for k, v in entry.items()}
        out_entry['difficulty'] = difficulty
        
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(out_entry, f, indent=2)
        
        block_count = len(entry['blocks'])
        print(f"Written: {entry['slug']}.json ({block_count} blocks, {difficulty})")
    
    # Stats
    total_blocks = sum(len(cd['blocks']) for cd in chapter_data.values())
    print(f"\nTotal: {len(chapter_data)} chapters, {total_blocks} content blocks")

if __name__ == '__main__':
    main()
