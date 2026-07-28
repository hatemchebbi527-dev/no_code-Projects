.wrap {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

/* Fenêtre qui flotte doucement */
.window {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(15, 42, 74, 0.35);
  font-family: var(--font-inter), system-ui, sans-serif;
  animation: floatWindow 9s ease-in-out infinite;
}

/* Chrome navigateur */
.chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #F4F6F8;
  border-bottom: 1px solid #e8edf3;
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: #16B8A6; }
.dotGrey { background: #cbd6e4; }
.url {
  margin-left: 12px;
  flex: 1;
  background: #fff;
  border: 1px solid #e8edf3;
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 11px;
  color: #718096;
}

.body { display: flex; min-height: 300px; }

/* Sidebar */
.sidebar {
  width: 56px;
  background: #0F2A4A;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.logoDot {
  width: 26px; height: 26px; border-radius: 8px;
  background: #16B8A6;
  margin-bottom: 8px;
}
.nav {
  width: 24px; height: 24px; border-radius: 7px;
  background: rgba(255, 255, 255, 0.12);
}
.navActive { background: rgba(22, 184, 166, 0.6); }

/* Contenu principal */
.main { flex: 1; padding: 18px 20px; }

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.title {
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #0F2A4A;
}
.live {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: #718096; margin-top: 3px;
}
.liveDot {
  width: 7px; height: 7px; border-radius: 50%; background: #16B8A6;
  animation: livePulse 3s ease-in-out infinite;
}
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: #163a63; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
}

/* KPI */
.kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
.kpi {
  background: #F4F6F8;
  border-radius: 12px;
  padding: 12px 12px;
  display: flex; flex-direction: column; gap: 6px;
}
.kpiLabel { font-size: 10px; color: #718096; text-transform: uppercase; letter-spacing: 0.04em; }
.kpiValue {
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700; font-size: 22px; color: #16B8A6; line-height: 1;
}

/* Panneau graphique */
.panel {
  background: #fff;
  border: 1px solid #e8edf3;
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 14px;
}
.panelHead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.panelTitle { font-size: 12px; font-weight: 600; color: #0F2A4A; }
.panelBadge {
  font-size: 11px; font-weight: 600; color: #16B8A6;
  background: rgba(22, 184, 166, 0.12); border-radius: 999px; padding: 2px 9px;
}
.chart { display: flex; align-items: flex-end; gap: 10px; height: 72px; }
.bar {
  flex: 1;
  background: linear-gradient(180deg, #16B8A6, #129e8e);
  border-radius: 6px 6px 3px 3px;
  transform-origin: bottom;
  animation: grow 1.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.b1 { height: 40%; animation-delay: 0.1s; }
.b2 { height: 62%; animation-delay: 0.2s; }
.b3 { height: 48%; animation-delay: 0.3s; }
.b4 { height: 80%; animation-delay: 0.4s; }
.b5 { height: 58%; animation-delay: 0.5s; }
.b6 { height: 95%; background: linear-gradient(180deg, #16B8A6, #16B8A6); animation-delay: 0.6s; }

/* Liste de tâches */
.tasks { display: flex; flex-direction: column; gap: 9px; }
.task {
  display: flex; align-items: center; gap: 10px;
  background: #F4F6F8; border-radius: 10px; padding: 9px 12px;
}
.check {
  width: 18px; height: 18px; border-radius: 50%;
  background: #16B8A6; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0;
}
.taskLabel { flex: 1; font-size: 12px; color: #2D3748; }
.pill {
  font-size: 10px; font-weight: 600; color: #129e8e;
  background: rgba(22, 184, 166, 0.14); border-radius: 999px; padding: 3px 10px;
}

@keyframes floatWindow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.8); }
}

@media (prefers-reduced-motion: reduce) {
  .window, .liveDot, .bar { animation: none; }
  .bar { transform: scaleY(1); }
}

@media (max-width: 900px) {
  .wrap { max-width: 440px; }
}
