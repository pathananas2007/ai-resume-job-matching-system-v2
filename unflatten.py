import os
import re
import glob

def unflatten_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If file has more than 2 lines, skip
    if content.count('\n') > 1:
        return False
        
    if len(content) < 50:
        # Too small to care maybe, but let's process anyway
        pass

    original_content = content

    # 1. Split indented lines (4, 8, 12, 16... spaces)
    # We use a regex to find 4 or more spaces and insert a newline before them.
    # We must be careful not to split spaces inside strings, but given it's flattened, 
    # it's unlikely there are large blocks of spaces inside strings except maybe docstrings.
    # Actually, a simpler way is just to replace `( {4,})` with `\n\1`
    content = re.sub(r'( {4,})', r'\n\1', content)

    # 2. Split top-level glued statements.
    # These typically have no spaces before them because the newline was deleted.
    # They usually follow a word char, quote, or closing paren.
    lookbehind = r'(?<=[a-zA-Z0-9)"\'\]}])'
    
    keywords = [
        r'import ',
        r'from ',
        r'@',
        r'logger =',
        r'router =',
        r'app =',
        r'app\.',
        r'def ',
        r'async def ',
        r'class ',
        r'#',
        r'if __name__ ==',
        r'try:',
        r'except',
        r'return ',
        r'yield ',
        r'pass',
        r'continue',
        r'break',
    ]
    
    for kw in keywords:
        content = re.sub(lookbehind + kw, r'\n' + kw.replace('\\', ''), content)

    # Clean up multiple newlines just in case
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return True

if __name__ == "__main__":
    count = 0
    # recursively find all py files
    for root, dirs, files in os.walk('backend'):
        for file in files:
            if file.endswith('.py'):
                path = os.path.join(root, file)
                if unflatten_file(path):
                    count += 1
    print(f"Unflattened {count} files.")
