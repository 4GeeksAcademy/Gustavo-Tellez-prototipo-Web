---
name: AgentHub Enterprise UI
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bcc9c6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#879391'
  outline-variant: '#3d4947'
  surface-tint: '#6bd8cb'
  primary: '#6bd8cb'
  on-primary: '#003732'
  primary-container: '#29a195'
  on-primary-container: '#00302b'
  inverse-primary: '#006a61'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

El sistema de diseño define una consola administrativa soberbia, técnica y de alta densidad para la gestión, monitorización y despliegue de agentes de IA autónomos en entornos empresariales. La interfaz transmite rigor, precisión de ingeniería y control en tiempo real, priorizando la legibilidad de datos complejos frente al ornamento.

Inspirado en la síntesis estética de Linear, Stripe y Vercel, el estilo combina:
- **Minimalismo analítico:** Superficies nítidas, tipografía proporcional austera y una estricta jerarquía de información.
- **Micro-bordes funcionales:** Separación perimetral de baja saturación en lugar de sombras densas.
- **Acentos de control lumínico:** Uso contenido de cian y verde esmeralda para estados operativos, reservando el color estrictamente para la orientación visual, ejecución y diagnóstico.

## Colors

El sistema opera primordialmente en modo oscuro por defecto para entornos de operaciones y control continuado, con compatibilidad nativa para modo claro de alto contraste.

### Roles de Color

- **Fondo Neutro:** `#0F172A` (oscuro) y `#F8FAFC` (claro). Base estructural sobria sin saturaciones distractivas.
- **Superficies y Tarjetas:** `#1E293B` (oscuro) y `#FFFFFF` (claro), delimitadas por bordes lineales `#334155` (oscuro) y `#E2E8F0` (claro).
- **Acento Primario (Teal/Cian):** `#0D9488` (base interactiva) y `#14B8A6` (hover/activo). Focalizado en llamadas a la acción, ejecuciones activas y alternancias primarias.
- **Acento Secundario (Índigo/Slate Blue):** `#6366F1` y `#3B82F6` para telemetría, estados informativos y conexiones de red de agentes.
- **Semántica Operativa:**
  - **Éxito / Operacional:** `#10B981` (Emerald). Agentes activos, latencia óptima y tareas completadas.
  - **Advertencia / Degradación:** `#F59E0B` (Amber). Consumo excesivo de tokens, rate-limits próximos o advertencias de contexto.
  - **Peligro / Crítico:** `#EF4444` y `#DC2626` (Rose/Red). Agentes desconectados, fallos de pipeline y cancelaciones.
  - **Información / Debug:** `#3B82F6` y `#64748B`. Metadatos de ejecución y registros pasivos.

## Typography

El tratamiento tipográfico responde a exigencias de alta densidad de datos técnicos y paneles multimodales.
- **Inter** gestiona todos los niveles de contenido estructural, encabezados e interfaces interactivas, asegurando neutralidad óptica y equilibrio en tamaños reducidos (11px–14px).
- **JetBrains Mono** se utiliza en métricas crudas, IDs de agentes, tokens de sesión, bloques JSON, inspección de prompts y trazas de error (`stack traces`).
- Toda la terminología y redacción se formulan en español neutro profesional orientado a operaciones de infraestructura.

## Layout & Spacing

El ritmo espacial sigue un sistema estricto de cuadrícula de 4px, optimizado para vistas compactas con mínima fricción de navegación.

- **Estructura del Lienzo:** Sistema fluido de 12 columnas en escritorio con márgenes perimetrales de 24px (`1.5rem`) y medianiles de 16px (`1rem`).
- **Comportamiento Adaptable:**
  - **Escritorio (>1024px):** Navegación lateral persistente colapsable (ancho fijo: 240px / 64px compacto), paneles de métricas multicolumna y tablas con scroll horizontal contenido.
  - **Tableta (768px - 1023px):** Rejilla de 8 columnas, paneles apilados de inspección y filtros agrupados en barras de herramientas desplegables.
  - **Móvil (<767px):** Rejilla lineal de 4 columnas, márgenes reducidos a 16px (`1rem`), navegación anclada en cabecera/cajón inferior y tablas adaptadas a tarjetas de clave-valor.
- **Densidad de Componentes:** Los rellenos internos (`padding`) operan bajo pasos cerrados (`space-sm` = 8px, `space-md` = 12px) para preservar el escaneo visual de múltiples agentes en una sola pantalla.

## Elevation & Depth

La jerarquía visual se resuelve mediante estratificación tonal limpia y bordes de contorno sutiles, descartando sombras difusas pesadas:

- **Estratificación de Superficies:**
  - Nivel 0 (Lienzo): `#0F172A`.
  - Nivel 1 (Tarjetas, Paneles, Barras de Herramientas): `#1E293B` delimitado por bordes continuos de 1px en `#334155`.
  - Nivel 2 (Modales, Menús Flotantes, Tooltips de Datos): `#1E293B` elevado con un borde de contraste `#475569` y una sombra ambiental difusa mínima: `0 4px 20px -2px rgba(0, 0, 0, 0.5)`.
- **Efecto de Contorno:** Cada elemento interactivo o contenedor posee un borde de 1px con una opacidad calculada para preservar la delimitación sin generar ruido visual. No se aplican biseles ni degradados volumétricos.

## Shapes

El sistema aplica un esquema de redondez sobrio y compacto. El radio de curvatura máximo absoluto es de 8px (`rounded-lg`), manteniendo una estética técnica, arquitectónica y contemporánea.

- **Contenedores y Tarjetas:** 8px (`rounded-lg`).
- **Botones, Entradas e Ítems de Menú:** 4px (`rounded-sm` a regular).
- **Insignias y Etiquetas de Estado:** 4px (`rounded-sm`) para enfatizar precisión industrial, descartando esquinas totalmente esféricas o estilo pastilla.

## Components

### Botones
- **Primario:** Fondo `#0D9488`, texto blanco, altura de 32px (compacto) o 36px (estándar), radio de 4px, tipografía `label-md`. En foco/hover pasa a `#14B8A6`.
- **Secundario / Neutro:** Fondo transparente, borde de 1px `#334155`, texto `#F8FAFC`. En hover: fondo `#334155`/50%.
- **Destructivo:** Fondo `#DC2626`/10%, borde `#DC2626`/30%, texto `#EF4444`. En hover: fondo `#DC2626`, texto blanco.

### Tablas de Datos
- **Encabezados:** Persistentes (`sticky`), altura de 36px, fondo `#0F172A`, texto en `label-sm` color `#94A3B8`, borde inferior de 1px `#334155`.
- **Filas:** Altura uniforme de 44px, división perimetral con línea de 1px `#334155`/50%, hover de fila sutil con `#334155`/20%.
- **Celdas Numéricas/IDs:** Alineadas a la derecha y renderizadas con `JetBrains Mono` (`code-sm`).

### Insignias (Badges) de Estado
- Estructura compacta: `height: 20px`, padding horizontal de 6px, radio de 4px.
- Indicador luminoso: Punto circular de 6px con pulso o color estático a la izquierda del texto (`label-sm`).
- **Activo:** Fondo `#10B981`/10%, texto `#34D399`, punto `#10B981`.
- **Alerta:** Fondo `#F59E0B`/10%, texto `#FBBF24`, punto `#F59E0B`.
- **Crítico:** Fondo `#EF4444`/10%, texto `#F87171`, punto `#EF4444`.

### Campos de Entrada (Inputs)
- Altura fija de 32px para filtros y 36px para formularios, fondo `#0F172A`, borde de 1px `#334155`, texto `#F8FAFC`.
- Estado activo (`focus`): Borde `#0D9488` y halo exterior sutil `0 0 0 1px #0D9488`.

### Bloques de Código y Registros (Logs)
- Contenedor con fondo `#0B0F19`, borde perimetral `#1E293B`, tipografía `JetBrains Mono` en 11px o 12px, numeración de líneas fija y barra de herramientas contextual de copiado rápido al portapapeles.