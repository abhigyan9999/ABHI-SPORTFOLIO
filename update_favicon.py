import re

with open('index.html', 'r', encoding='utf-8') as f:
    data = f.read()

data = re.sub(r'href="assets/images/logo/logo\.png"', 'href="assets/images/logo/favicon-v2.png"', data, flags=re.IGNORECASE)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated HTML to use new favicon.")
