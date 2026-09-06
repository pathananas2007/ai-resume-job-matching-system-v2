import os, re, subprocess

def fix_file_comments(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # If file already has many newlines, check if it has single lines with // swallowed code
    # Specifically, check if there are lines longer than 500 chars with //
    lines = text.split('\n')
    has_long_comment_line = any(len(l) > 200 and '//' in l for l in lines)
    if not has_long_comment_line and len(lines) > 50:
        return False

    output = []
    in_single_quote = False
    in_double_quote = False
    in_template = False
    in_block_comment = False
    i = 0
    n = len(text)
    modified = False

    while i < n:
        c = text[i]
        
        # Handle escape characters
        if c == '\\' and (in_single_quote or in_double_quote or in_template):
            output.append(c)
            if i + 1 < n:
                output.append(text[i+1])
                i += 2
            else:
                i += 1
            continue

        # Handle block comment
        if in_block_comment:
            output.append(c)
            if c == '*' and i + 1 < n and text[i+1] == '/':
                output.append('/')
                i += 2
                in_block_comment = False
                continue
            i += 1
            continue

        if not in_single_quote and not in_double_quote and not in_template:
            if c == '/' and i + 1 < n and text[i+1] == '*':
                in_block_comment = True
                output.append('/*')
                i += 2
                continue
            elif c == "'":
                in_single_quote = True
                output.append(c)
                i += 1
                continue
            elif c == '"':
                in_double_quote = True
                output.append(c)
                i += 1
                continue
            elif c == '`':
                in_template = True
                output.append(c)
                i += 1
                continue
            elif c == '/' and i + 1 < n and text[i+1] == '/' and (i == 0 or text[i-1] != ':'):
                # Start of a // line comment
                # Look ahead for newline or 2+ spaces followed by non-whitespace
                # Note: if there is a newline before 2+ spaces, stop at newline
                nl_idx = text.find('\n', i+2)
                m = re.search(r'\s{2,}(?=[^\s])', text[i+2:])
                
                if nl_idx != -1 and (not m or i + 2 + m.start() > nl_idx):
                    # Natural newline comes first
                    comment_content = text[i+2:nl_idx]
                    output.append('//' + comment_content + '\n')
                    i = nl_idx + 1
                    continue
                
                if m:
                    comment_content = text[i+2 : i+2+m.start()]
                    # Check if comment content looks like a URL e.g. //localhost:8000
                    if comment_content.startswith('localhost') or comment_content.startswith('www.'):
                        output.append('//')
                        i += 2
                        continue
                    output.append('/* ' + comment_content.strip() + ' */ ')
                    i = i + 2 + m.end()
                    modified = True
                else:
                    if nl_idx != -1:
                        comment_content = text[i+2:nl_idx]
                        output.append('//' + comment_content + '\n')
                        i = nl_idx + 1
                    else:
                        comment_content = text[i+2:]
                        if comment_content.startswith('localhost') or comment_content.startswith('www.'):
                            output.append('//')
                            i += 2
                            continue
                        output.append('/* ' + comment_content.strip() + ' */\n')
                        i = n
                        modified = True
                continue
        else:
            if in_single_quote and c == "'":
                in_single_quote = False
            elif in_double_quote and c == '"':
                in_double_quote = False
            elif in_template and c == '`':
                in_template = False

        output.append(c)
        i += 1

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(''.join(output))
        return True
    return False

# Scan src
fixed_files = []
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            if fix_file_comments(path):
                fixed_files.append(path)

print(f"Fixed {len(fixed_files)} files with comments.")
