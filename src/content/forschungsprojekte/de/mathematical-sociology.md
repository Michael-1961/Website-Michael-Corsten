---
title: Mathematische Modellierung sozialer Netzwerkdynamiken
lead: "Prof. Dr. Michael Corsten"
funding: "Intern"
years: "2020-2024"
papers:
  - kohorte24
  - kohorteneffek19
  - symbolische-p20
---

# Mathematische Modellierung sozialer Netzwerkdynamiken

## Projektübersicht

Dieses innovative Forschungsprojekt untersucht die mathematischen Grundlagen sozialer Netzwerke und deren zeitliche Entwicklung. Durch die Kombination von Graphentheorie, stochastischen Prozessen und soziologischer Theorie entwickeln wir neue Modelle zur Vorhersage und Analyse komplexer sozialer Phänomene.

## Theoretischer Rahmen

Die zentrale Gleichung unseres Modells beschreibt die Wahrscheinlichkeit $P(t)$ einer sozialen Verbindung zum Zeitpunkt $t$:

$$
P(t) = \frac{1}{1 + e^{-\alpha(S - \theta)}}
$$

wobei $S$ die soziale Ähnlichkeit zwischen Akteuren, $\alpha$ die Empfindlichkeit und $\theta$ der Schwellenwert ist.

## Netzwerkdynamik

Die Evolution eines sozialen Netzwerks lässt sich durch ein System von Differentialgleichungen beschreiben. Für die Anzahl $N(t)$ der Verbindungen gilt:

$$
\frac{dN}{dt} = \beta N(1 - \frac{N}{K}) - \gamma N
$$

Hierbei repräsentiert $\beta$ die Wachstumsrate neuer Verbindungen, $K$ die Kapazität des Netzwerks und $\gamma$ den Zerfall bestehender Beziehungen.

## Zentralitätsmaße

Ein besonders elegantes Ergebnis ist die harmonische Zentralität eines Knotens $v$:

$$
H(v) = \sum_{u \neq v} \frac{1}{d(u,v)}
$$

wobei $d(u,v)$ die kürzeste Pfadlänge zwischen den Knoten $u$ und $v$ bezeichnet.

## Integralformulierungen

Der kumulative Einfluss eines Knotens über die Zeit lässt sich ausdrücken als:

$$
I(t) = \int_0^t e^{-\lambda \tau} \cdot w(\tau) \, d\tau
$$

wobei $\lambda$ der Zerfallsparameter und $w(\tau)$ die Gewichtsfunktion ist.

Die Wahrscheinlichkeitsdichte der Verbindungsbildung in einem Netzwerk folgt:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \int_{-\infty}^x e^{-\frac{1}{2}\left(\frac{t-\mu}{\sigma}\right)^2} \, dt
$$

Ein Doppelintegral erfasst den Interaktionseffekt zwischen zwei sozialen Dimensionen:

$$
\Phi(x,y) = \int_0^x \int_0^y e^{-(u^2 + v^2)} \, du \, dv
$$

## Erwartete Erkenntnisse

Durch die Anwendung dieser mathematischen Werkzeuge erwarten wir fundamentale Einsichten in:

- Die Emergenz von Gemeinschaftsstrukturen
- Informationsdiffusion in heterogenen Netzwerken
- Stabilität und Resilienz sozialer Systeme
- Vorhersage von Netzwerktransformationen

Die schöne Euler-Identität $e^{i\pi} + 1 = 0$ erinnert uns daran, dass auch in der Komplexität soziale Eleganz zu finden ist.
