import re

with open('src/pages/CodexPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace imports
content = content.replace(
    'import TopNav from "../components/TopNav";',
    'import { motion, AnimatePresence } from "framer-motion";'
)

# 2. Replace Poppins with Plus Jakarta Sans in CSS styles
content = content.replace("'Poppins'", "'Plus Jakarta Sans'")

# 3. Replace <div className="app-container... > with <motion.div ...>
content = content.replace(
    '<div className="app-container animate-fade-in-up" style={{ paddingBottom: \'60px\', position: \'relative\' }}>',
    '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="app-container" style={{ paddingBottom: \'60px\', paddingTop: \'40px\', position: \'relative\', minHeight: \'100vh\' }}>'
)

# Replace the closing div
content = content.replace(
    '    </div>\n  );\n}\n\nexport default CodexPage;',
    '    </motion.div>\n  );\n}\n\nexport default CodexPage;'
)

# 4. Remove TopNav rendering
content = content.replace(
    '        <TopNav />\n',
    ''
)

# 5. Change specific CSS blocks using regex
css_pattern = r'<style>\{`.*?`\}</style>'
new_css = """<style>{`
        /* Deep Dark Mode Styles */
        .codex-tabs-bar { display: flex; justify-content: center; gap: 12px; background: rgba(18, 18, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); padding: 6px; border-radius: 100px; max-width: 800px; margin: 0 auto 30px; backdrop-filter: blur(24px); }
        .codex-tab-btn { flex: 1; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 600; color: #A1A1AA; background: transparent; border: none; padding: 10px 20px; border-radius: 100px; cursor: pointer; transition: all 0.3s; white-space: nowrap; text-align: center; }
        .codex-tab-btn.active { color: #0A0A0A; background: linear-gradient(135deg, #10B981, #00FF66); border: 1px solid #10B981; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }
        .dashboard-glass-panel { background: rgba(18, 18, 18, 0.8); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05); backdrop-filter: blur(24px); display: grid; grid-template-columns: 320px 1fr; min-height: 580px; overflow: hidden; }
        .dashboard-sidebar { border-right: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; background: rgba(10, 10, 10, 0.4); }
        .sidebar-search-box { padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .sidebar-search-pill { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; display: flex; align-items: center; padding: 10px 14px; gap: 10px; transition: 0.3s; }
        .sidebar-search-pill:focus-within { border-color: #10B981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
        .sidebar-search-input { background: transparent; border: none; outline: none; color: #F8FAFC; font-size: 0.85rem; width: 100%; font-family: inherit; }
        .sidebar-search-input::placeholder { color: #52525B; }
        .sidebar-items-list { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 480px; }
        .sidebar-items-list::-webkit-scrollbar { width: 4px; }
        .sidebar-items-list::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 4px; }
        .item-row-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 12px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; gap: 6px; }
        .item-row-card:hover { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); }
        .item-row-card.active { background: rgba(16, 185, 129, 0.1); border-color: #10B981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
        .item-row-header { display: flex; align-items: center; gap: 8px; }
        .item-row-tag { font-size: 0.62rem; font-weight: 700; color: #0A0A0A; background: #10B981; padding: 2px 6px; border-radius: 4px; }
        .item-row-title { font-size: 0.85rem; font-weight: 600; color: #F8FAFC; }
        .item-row-desc { font-size: 0.75rem; color: #A1A1AA; line-height: 1.4; }
        .dashboard-detail-view { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }
        .dashboard-detail-view::-webkit-scrollbar { width: 4px; }
        .dashboard-detail-view::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 4px; }
        .details-hero-card { background: rgba(10, 10, 10, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 24px; display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .details-hero-card { grid-template-columns: 1.2fr 1fr; } }
        .details-info-left { display: flex; flex-direction: column; gap: 16px; }
        .details-badge-row { display: flex; align-items: center; gap: 10px; }
        .details-badge-tag { font-size: 0.7rem; font-weight: 700; color: #0A0A0A; background: #00FF66; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px; }
        .details-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 700; color: #F8FAFC; }
        .details-desc { font-size: 0.9rem; color: #A1A1AA; line-height: 1.6; }
        .details-list-sec { display: flex; flex-direction: column; gap: 10px; }
        .details-sec-title { font-size: 0.85rem; font-weight: 700; color: #F8FAFC; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 6px; margin-bottom: 4px; }
        .details-list-item { font-size: 0.85rem; color: #A1A1AA; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .details-bullet-dot { min-width: 6px; height: 6px; background: #10B981; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 8px #10B981; }
        .details-fine-banner { margin-top: auto; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
        .details-fine-info { font-size: 0.85rem; font-weight: 600; color: #fca5a5; line-height: 1.4; }
        .visual-display-sec { background: rgba(255, 255, 255, 0.02); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.03); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .roundabout-svg, .holo-globe-svg { width: 100%; max-width: 250px; height: auto; }
        .road-sign-visual-box { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 200px; }
        @media (max-width: 768px) { .dashboard-glass-panel { grid-template-columns: 1fr; min-height: auto; } .dashboard-sidebar { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); } .sidebar-items-list { max-height: 300px; } .details-hero-card { padding: 16px; } }
      `}</style>"""

content = re.sub(css_pattern, new_css, content, flags=re.DOTALL)

with open('src/pages/CodexPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Update successful")
