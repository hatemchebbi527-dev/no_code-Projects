.wrap {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* Halo respirant derrière le noyau */
.halo {
  fill: rgba(22, 184, 166, 0.10);
  transform-origin: 210px 190px;
  animation: breathe 11s ease-in-out infinite;
}

/* Le noyau pulse doucement */
.core {
  transform-origin: 210px 190px;
  animation: corePulse 7s ease-in-out infinite;
}

/* Boucles d'automatisation en rotation */
.loop {
  transform-origin: 210px 190px;
  animation: spin 50s linear infinite;
}
.loopReverse {
  transform-origin: 210px 190px;
  animation: spin 38s linear infinite reverse;
}

/* Cartes de tâches : flottement décalé */
.card {
  transform-origin: center;
  filter: drop-shadow(0 10px 22px rgba(15, 42, 74, 0.18));
}
.cardA { animation: float 9s ease-in-out infinite; }
.cardB { animation: float 10.5s ease-in-out infinite 1.2s; }
.cardC { animation: float 9.5s ease-in-out infinite 2s; }
.cardD { animation: float 11s ease-in-out infinite 0.6s; }

/* Étincelles qui convergent vers le noyau */
.spark { opacity: 0; }
.spark1 { animation: travel1 6s ease-in-out infinite; }
.spark2 { animation: travel2 6.6s ease-in-out infinite 2s; }
.spark3 { animation: travel3 6.3s ease-in-out infinite 4s; }

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.12); opacity: 0.9; }
}

@keyframes corePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes travel1 {
  0% { transform: translate(80px, 92px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(210px, 190px); opacity: 0; }
}
@keyframes travel2 {
  0% { transform: translate(340px, 66px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(210px, 190px); opacity: 0; }
}
@keyframes travel3 {
  0% { transform: translate(348px, 292px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(210px, 190px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .halo, .core, .loop, .loopReverse,
  .cardA, .cardB, .cardC, .cardD,
  .spark1, .spark2, .spark3 {
    animation: none;
  }
  .spark { opacity: 0; }
}
