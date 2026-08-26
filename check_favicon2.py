import re

with open('index.html', 'r', encoding='utf-8') as f:
    data = f.read()

m = re.search(r'(<link[^>]*icon[^>]*>)', data, re.IGNORECASE)
if m:
    print(m.group(1))
