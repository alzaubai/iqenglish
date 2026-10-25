import fs from 'fs';
import path from 'path';

const projectRoot = 'C:/Users/Lenovo/.gemini/antigravity/scratch/english-for-iraq-unit-1/';
const mdPath = path.join(projectRoot, 'PROJECT_CODE_FILES_COMPLETE.md');
const outHtmlProject = path.join(projectRoot, 'PROJECT_FILES_VIEWER.html');
const outHtmlPublic = path.join(projectRoot, 'public', 'PROJECT_FILES_VIEWER.html');
const outHtmlArtifact = 'C:/Users/Lenovo/.gemini/antigravity/brain/57a35e3d-6c83-4dbd-8657-63aa112af96c/PROJECT_FILES_VIEWER.html';

const mdContent = fs.readFileSync(mdPath, 'utf8');
const lines = mdContent.split(/\r?\n/);

const items = [];
let currentCategory = '';

for (const line of lines) {
  if (line.startsWith('### 📁 ')) {
    currentCategory = line.replace('### 📁 ', '').replace(/\s*\(\d+\s*ملفاً\)/, '').trim();
  } else if (line.startsWith('| **')) {
    const rawParts = line.split('|');
    // rawParts: ['', ' **1** ', ' `file.ts` ', ' role ', ' mechanism ', '']
    if (rawParts.length >= 5) {
      const id = parseInt(rawParts[1].replace(/\*/g, '').trim(), 10);
      const filePath = rawParts[2].replace(/`/g, '').trim();
      const role = rawParts[3].trim();
      const mechanism = rawParts[4].trim();
      const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
      items.push({
        id,
        path: filePath,
        name: path.basename(filePath),
        category: currentCategory,
        role,
        mechanism,
        ext
      });
    }
  }
}

console.log(`Parsed ${items.length} items from markdown.`);

const categories = [...new Set(items.map(it => it.category))];
const extensions = [...new Set(items.map(it => it.ext))].sort();

const itemsJson = JSON.stringify(items);

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>خريطة ملفات المشروع البرمجية | English for Iraq</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: #111827;
      --card-border: #1f2937;
      --card-hover: #1e293b;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent: #38bdf8;
      --accent-rgb: 56, 189, 248;
      --primary: #6366f1;
      --success: #10b981;
      --warning: #f59e0b;
      --highlight: rgba(56, 189, 248, 0.25);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Tajawal', system-ui, -apple-system, sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      padding: 24px 16px 80px;
      line-height: 1.6;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      padding: 32px 24px;
      margin-bottom: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%);
      pointer-events: none;
    }

    .badge-top {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .title {
      font-size: clamp(22px, 4vw, 32px);
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 800px;
      margin-bottom: 24px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
    }

    .stat-card {
      background: rgba(17, 24, 39, 0.8);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 14px 18px;
    }

    .stat-num {
      font-size: 26px;
      font-weight: 900;
      color: var(--accent);
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Sticky Search & Filter Box */
    .sticky-toolbar {
      position: sticky;
      top: 16px;
      z-index: 50;
      background: rgba(11, 15, 25, 0.92);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 18px 20px;
      margin-bottom: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .search-row {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }

    .search-wrapper {
      position: relative;
      flex: 1;
    }

    .search-input {
      width: 100%;
      background: #1e293b;
      border: 1.5px solid #334155;
      color: #ffffff;
      font-size: 16px;
      padding: 14px 48px 14px 44px;
      border-radius: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
      background: #111827;
    }

    .search-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
      font-size: 18px;
    }

    .clear-btn {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #cbd5e1;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 13px;
    }

    .clear-btn:hover {
      background: #ef4444;
      color: #ffffff;
    }

    .count-badge {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent);
      padding: 12px 18px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 14px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Category Filter Chips */
    .filter-chips {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: thin;
      scrollbar-color: #334155 transparent;
    }

    .filter-chip {
      background: #1e293b;
      border: 1px solid #334155;
      color: #cbd5e1;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }

    .filter-chip:hover {
      background: #334155;
      color: #ffffff;
      border-color: #475569;
    }

    .filter-chip.active {
      background: var(--accent);
      color: #0b0f19;
      border-color: var(--accent);
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
    }

    /* Table & Cards */
    .table-container {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: right;
    }

    thead th {
      background: #0f172a;
      padding: 16px 20px;
      font-size: 13px;
      font-weight: 800;
      color: #cbd5e1;
      border-bottom: 2px solid var(--card-border);
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid var(--card-border);
      transition: background 0.15s ease;
    }

    tbody tr:hover {
      background: var(--card-hover);
    }

    td {
      padding: 16px 20px;
      font-size: 13px;
      vertical-align: top;
    }

    .cell-id {
      font-weight: 900;
      color: #64748b;
      text-align: center;
      width: 50px;
    }

    .cell-file {
      min-width: 280px;
    }

    .file-path {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 12.5px;
      font-weight: 700;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.2);
      padding: 4px 8px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      word-break: break-all;
      direction: ltr;
      text-align: left;
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 12px;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .cell-category {
      color: #a78bfa;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }

    .cell-role {
      font-weight: 800;
      color: #f1f5f9;
      min-width: 220px;
    }

    .cell-mech {
      color: #94a3b8;
      line-height: 1.5;
      min-width: 320px;
    }

    .badge-ext {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
      font-family: monospace;
      margin-right: 6px;
    }

    .ext-tsx { background: #3b82f620; color: #60a5fa; border: 1px solid #3b82f640; }
    .ext-ts { background: #0284c720; color: #38bdf8; border: 1px solid #0284c740; }
    .ext-mjs { background: #f59e0b20; color: #fbbf24; border: 1px solid #f59e0b40; }
    .ext-json { background: #10b98120; color: #34d399; border: 1px solid #10b98140; }
    .ext-py { background: #8b5cf620; color: #c084fc; border: 1px solid #8b5cf640; }
    .ext-css { background: #ec489920; color: #f472b6; border: 1px solid #ec489940; }
    .ext-other { background: #64748b20; color: #94a3b8; border: 1px solid #64748b40; }

    .highlight {
      background: var(--highlight);
      color: #ffffff;
      padding: 1px 3px;
      border-radius: 4px;
      font-weight: 800;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: #64748b;
    }

    .empty-icon {
      font-size: 40px;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #10b981;
      color: #ffffff;
      padding: 10px 24px;
      border-radius: 999px;
      font-weight: 800;
      font-size: 14px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
    }

    @media (max-width: 900px) {
      .table-container {
        border: none;
        background: transparent;
      }

      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead {
        display: none;
      }

      tbody tr {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 18px;
        padding: 16px;
        margin-bottom: 14px;
      }

      td {
        padding: 6px 0;
      }

      .cell-id {
        display: inline-block;
        text-align: right;
        margin-left: 8px;
      }

      .cell-category {
        display: inline-block;
        margin-bottom: 6px;
      }

      .cell-file {
        margin: 6px 0;
      }

      .cell-role {
        font-size: 15px;
        color: #ffffff;
        margin-top: 4px;
      }

      .cell-mech {
        font-size: 13px;
        margin-top: 6px;
        background: rgba(0, 0, 0, 0.2);
        padding: 8px 12px;
        border-radius: 10px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="badge-top">
        <span>⚡</span> توثيق هندسي تفاعلي شامل
      </div>
      <h1 class="title">فهرس ملفات المشروع البرمجية (English for Iraq)</h1>
      <p class="subtitle">
        دليل شامل وفوري يضم كافة ملفات الكود في المنصة (273 ملفاً برمجياً)، مع محرك بحث فوري وتصفية ذكية حسب التصنيف والامتداد.
      </p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-num" id="stat-total">273</div>
          <div class="stat-label">إجمالي الملفات الكودية</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">120</div>
          <div class="stat-label">واجهات React (.tsx)</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">82</div>
          <div class="stat-label">بيانات ومنطق (.ts)</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">56</div>
          <div class="stat-label">سكربتات بناء وأتمتة</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">16</div>
          <div class="stat-label">أقسام برمجية رئيسية</div>
        </div>
      </div>
    </header>

    <!-- Toolbar -->
    <div class="sticky-toolbar">
      <div class="search-row">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="ابحث باسم الملف، المسار، القاعدة، نوع التمرين، أو الوظيفة..."
            autofocus
          >
          <button id="clear-btn" class="clear-btn" title="مسح">✕</button>
        </div>
        <div class="count-badge" id="count-badge">
          عرض <span id="visible-count">273</span> من 273
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-chips" id="filter-chips">
        <button class="filter-chip active" data-category="ALL">الكل (273)</button>
        ${categories.map(cat => `<button class="filter-chip" data-category="${cat}">${cat}</button>`).join('\n        ')}
      </div>
    </div>

    <!-- Table Container -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th style="width: 100px;">الامتداد</th>
            <th>المسار البرمجي للملف</th>
            <th>التصنيف</th>
            <th>الوظيفة الأساسية</th>
            <th>آلية العمل البرمجية والتعليمية</th>
          </tr>
        </thead>
        <tbody id="files-tbody">
          <!-- Rendered by JS -->
        </tbody>
      </table>
      <div id="empty-state" class="empty-state" style="display: none;">
        <div class="empty-icon">📂</div>
        <h3>لم يتم العثور على أي ملف يطابق بحثك!</h3>
        <p>تأكد من كتابة الكلمات بصورة صحيحة أو جرب البحث بكلمة أخرى.</p>
      </div>
    </div>
  </div>

  <div id="toast" class="toast">
    <span>✓</span> تم نسخ المسار إلى الحافظة!
  </div>

  <script>
    const allFiles = ${itemsJson};
    let currentFilter = 'ALL';
    let searchQuery = '';

    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-btn');
    const filterChips = document.getElementById('filter-chips');
    const tbody = document.getElementById('files-tbody');
    const visibleCount = document.getElementById('visible-count');
    const emptyState = document.getElementById('empty-state');
    const toast = document.getElementById('toast');

    function getExtClass(ext) {
      if (ext === '.tsx') return 'ext-tsx';
      if (ext === '.ts') return 'ext-ts';
      if (ext === '.mjs' || ext === '.js') return 'ext-mjs';
      if (ext === '.json') return 'ext-json';
      if (ext === '.py') return 'ext-py';
      if (ext === '.css') return 'ext-css';
      return 'ext-other';
    }

    function highlightText(text, query) {
      if (!query || !query.trim()) return text;
      const q = query.trim().replace(/[.*+?^$\${}()|[\\]\\\\]/g, '\\\\$&');
      const regex = new RegExp('(' + q + ')', 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function render() {
      const q = searchQuery.toLowerCase().trim();
      
      const filtered = allFiles.filter(item => {
        // Category filter
        if (currentFilter !== 'ALL' && item.category !== currentFilter) {
          return false;
        }

        // Search query filter
        if (q) {
          const inPath = item.path.toLowerCase().includes(q);
          const inRole = item.role.toLowerCase().includes(q);
          const inMech = item.mechanism.toLowerCase().includes(q);
          const inCat = item.category.toLowerCase().includes(q);
          const inExt = item.ext.toLowerCase().includes(q);
          return inPath || inRole || inMech || inCat || inExt;
        }

        return true;
      });

      visibleCount.textContent = filtered.length;

      if (filtered.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';

      let html = '';
      for (const item of filtered) {
        const extBadge = '<span class="badge-ext ' + getExtClass(item.ext) + '">' + item.ext + '</span>';
        const displayPath = highlightText(item.path, q);
        const displayRole = highlightText(item.role, q);
        const displayMech = highlightText(item.mechanism, q);

        html += '<tr>' +
          '<td class="cell-id">' + item.id + '</td>' +
          '<td>' + extBadge + '</td>' +
          '<td class="cell-file">' +
            '<span class="file-path">' +
              displayPath +
              '<button class="copy-btn" onclick="copyPath(\\'' + item.path + '\\')" title="نسخ المسار">📋</button>' +
            '</span>' +
          '</td>' +
          '<td class="cell-category">' + item.category.replace(/^\\d+\\.\\s*/, '') + '</td>' +
          '<td class="cell-role">' + displayRole + '</td>' +
          '<td class="cell-mech">' + displayMech + '</td>' +
        '</tr>';
      }

      tbody.innerHTML = html;
    }

    // Copy to clipboard
    window.copyPath = function(p) {
      navigator.clipboard.writeText(p).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    };

    // Search events
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      clearBtn.style.display = searchQuery ? 'flex' : 'none';
      render();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      render();
    });

    // Category click events
    filterChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;

      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      render();
    });

    // Initial render
    render();
  </script>
</body>
</html>
`;

fs.writeFileSync(outHtmlProject, html, 'utf8');
fs.writeFileSync(outHtmlPublic, html, 'utf8');
fs.writeFileSync(outHtmlArtifact, html, 'utf8');

console.log('HTML files created successfully at:');
console.log('1.', outHtmlProject);
console.log('2.', outHtmlPublic);
console.log('3.', outHtmlArtifact);
