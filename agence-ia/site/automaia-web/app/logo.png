.wrap {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* La fenêtre flotte doucement */
.window {
  transform-origin: center;
  filter: drop-shadow(0 24px 50px rgba(15, 42, 74, 0.28));
  animation: floatWindow 9s ease-in-out infinite;
}

/* Données qui circulent le long des connexions */
.flow,
.flow2 {
  stroke-dasharray: 7 11;
  fill: none;
}
.flow { animation: flow 3.2s linear infinite; }
.flow2 { animation: flow 3.2s linear infinite 1.6s; }

/* Hub central qui pulse */
.hub {
  transform-origin: 232px 192px;
  animation: hubPulse 5s ease-in-out infinite;
}

/* Tâches validées qui s'allument en alternance */
.task { transform-origin: center; }
.taskA { animation: glow 6s ease-in-out infinite; }
.taskB { animation: glow 6s ease-in-out infinite 3s; }

/* Aiguille de l'horloge */
.hand {
  transform-origin: 70px 300px;
  animation: tick 12s linear infinite;
}
.handMin {
  transform-origin: 70px 300px;
  animation: tick 60s linear infinite;
}
.badge {
  transform-origin: 70px 300px;
  animation: floatBadge 7s ease-in-out infinite;
}

@keyframes flow {
  to { stroke-dashoffset: -36; }
}

@keyframes floatWindow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@keyframes hubPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

@keyframes glow {
  0%, 100% { opacity: 0.55; }
  15%, 45% { opacity: 1; }
}

@keyframes tick {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .window, .flow, .flow2, .hub, .taskA, .taskB,
  .hand, .handMin, .badge {
    animation: none;
  }
  .flow, .flow2 { stroke-dasharray: none; }
}
