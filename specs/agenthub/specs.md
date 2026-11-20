# AgentHub: Especificación del panel de administración

**Estado:** Especificación de referencia para reconstruir el prototipo local AgentHub.  
**Idioma de la interfaz:** Español.  
**Fuente de datos:** Dataset ficticio hardcodeado; sin API, backend de producto ni persistencia.

## 1. Descripción general del proyecto

AgentHub es una plataforma SaaS en la que empresas alquilan agentes de IA preconfigurados y amplían sus capacidades mediante Skills. Este documento define cómo reconstruir el panel administrativo local de demostración para supervisar ingresos, usuarios, agentes, Skills, contrataciones y errores. La implementación actual es un prototipo; no demuestra la existencia de una API o backend de producto en este repositorio.

## 2. Objetivos del proyecto

- Dar al administrador una vista rápida del estado operativo y económico de la plataforma.
- Permitir consultar y gestionar registros ficticios de usuarios, agentes y Skills.
- Inspeccionar contratos y entender su importe a partir de un desglose verificable.
- Revisar errores de ejecución y reflejar su resolución en la interfaz.
- Mantener patrones consistentes, adaptables y accesibles en las seis secciones.

## 3. Alcance

**Incluido:** panel de seis secciones, navegación, modo claro/oscuro, tablas, métricas, gráfico semanal, detalles en modales, confirmaciones, menús de acciones, Skills expandibles, toasts, estados vacíos, eliminaciones y resolución simuladas, y edición local del system prompt.

**Excluido:** autenticación, permisos reales, API, conexión al backend de AgentHub, servicios externos de producto, persistencia de datos tras recargar, creación de entidades y edición de sus campos salvo el system prompt, cobros reales, búsqueda avanzada, exportación, configuración de producción y telemetría real. Las acciones de edición, eliminación y resolución son simulaciones locales.

## 4. Rol y contexto del usuario

El usuario principal es un administrador interno que consulta el conjunto de datos y puede simular la edición del system prompt, la eliminación de registros y la resolución de errores. Necesita comparar información con rapidez, distinguir estados por texto y color, y conservar el contexto de la tabla al inspeccionar detalles. El prototipo no implementa autenticación ni control de acceso; no debe presentar las acciones como operaciones reales del backend.

## 5. Análisis del repositorio

- [server.py](../../server.py) sirve archivos estáticos con Flask en `0.0.0.0:3000`, con `debug=True`. Es únicamente un servidor de desarrollo.
- La raíz contiene las seis páginas HTML, `app.css`, `data.js`, `utils.js`, `components.js` y `main.js`. El código de interfaz y los datos de ejemplo existen; no hay manifiesto de paquetes, build, API ni persistencia de producto.
- [DESIGN.md](../../DESIGN.md) y `stitch-reference/` contienen referencias visuales; no son las páginas activas. La especificación prevalece sobre esas referencias cuando sus datos, colores o controles difieren.
- Cada página carga `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`, enlaza `app.css` y carga con `defer`, en este orden, `data.js`, `utils.js`, `components.js` y `main.js`. Tailwind se carga exclusivamente por CDN; el CSS local y estilos inline puntuales están permitidos.
- JavaScript es vanilla, sin React, Vue, jQuery, compilador ni gestor de paquetes. Flask requiere Python y Flask instalados para ejecutar `python3 server.py`; no es un backend de AgentHub.

Para reconstruir desde cero, crear en la raíz: `index.html`, `usuarios.html`, `agentes.html`, `skills.html`, `contrataciones.html`, `errores.html`, `app.css`, `data.js`, `utils.js`, `components.js` y `main.js`. En cada HTML establecer `lang="es"`, metadatos de viewport, título de sección, un `body` con `data-page`, un contenedor `#app` y el orden de carga anterior. `main.js` genera el shell y la vista identificada por `data-page`; `data.js` contiene fixtures, `utils.js` las reglas, `components.js` los controles compartidos y `app.css` el sistema visual. No reutilizar el mapa de utilidades experimental inactivo de la implementación actual.

## 6. Arquitectura de información

Navegación principal, en este orden:

1. Dashboard
2. Usuarios
3. Agentes
4. Skills
5. Contrataciones
6. Log de errores

Las rutas son respectivamente `index.html`, `usuarios.html`, `agentes.html`, `skills.html`, `contrataciones.html` y `errores.html`; sus valores `data-page` son `dashboard`, `usuarios`, `agentes`, `skills`, `contrataciones` y `errores`. Usar enlaces normales entre documentos, sin router ni SPA. Cada página muestra su título en la topbar y marca el enlace activo con `aria-current="page"`. El traspaso temporal del estado se define en la sección 17.

## 7. Layout general

- **Escritorio:** sidebar persistente de 240 px; área principal flexible con topbar de 56 px y contenido de hasta 1600 px, con 24 px de separación lateral.
- **Sidebar:** marca AgentHub, seis enlaces con identificador e información textual, estado activo claramente visible y nota «Prototipo local»; no incluir colapso de escritorio.
- **Topbar:** breadcrumb o nombre de sección, título/contexto actual y toggle claro/oscuro. No duplica navegación principal.
- **Contenido:** encabezado de página, descripción breve si aporta contexto, controles y contenido. Las tablas ocupan el ancho disponible; se evitan tarjetas anidadas o decoración sin función.
- **Móvil:** sidebar sustituida por navegación tipo drawer activada con botón accesible; al abrir, el drawer cubre el contenido con backdrop y se cierra al elegir sección, pulsar Escape o hacer clic fuera. Topbar compacta y tablas transformadas en filas apiladas o contenedor con desplazamiento horizontal indicado.

## 8. Sistema de diseño

- **Dirección visual:** SaaS administrativo sobrio, compacto y fácil de escanear; sin ilustraciones decorativas ni gradientes de marketing.
- **Tipografía:** sans serif legible disponible localmente; jerarquía clara: título de página 24–28 px, subtítulos 16–18 px, texto/tablas 14–16 px, metadatos nunca menores de 12 px. Evitar tipografía condensada en datos.
- **Color:** priorizar los tokens del bloque YAML de `DESIGN.md` para oscuro, como se acordó frente a los valores distintos de su texto narrativo. Usar el CSS local para ambos temas: oscuro `#0b1326` fondo, `#171f33` superficie, `#131b2e` sidebar, `#3d4947` borde, `#dae2fd` texto y `#6bd8cb` acento; claro `#f8fafc`, `#ffffff`, `#f1f5f9`, `#d3dce5`, `#17212b` y `#087f75` respectivamente. Verde indica éxito, ámbar advertencia, rojo error/crítico y azul información; acompañar siempre con texto.
- **Tema claro:** fondo general gris muy claro, superficies blancas, bordes grises suaves y texto grafito.
- **Tema oscuro:** fondo y superficies azul pizarra oscuro con los valores fijados arriba, bordes visibles, texto claro y colores semánticos aclarados para contraste.
- **Temas y estilos:** `app.css` define variables en `:root` y `html.dark`; Tailwind v4 se carga por CDN y puede complementar la hoja con utilidades y `dark:`. Se permite CSS externo local y `style` inline para alturas del gráfico y posición del menú. Activar `dark` en la raíz, guardar elección en `localStorage` bajo `agenthub-theme` y, si no hay elección, usar `prefers-color-scheme`.
- **Espaciado:** escala consistente basada en múltiplos de 4 px; 16–24 px entre bloques y 8–12 px en controles relacionados.
- **Cards y superficies:** radio máximo 8 px, borde sutil y sombra solo cuando ayude a separar capas; las secciones de página no se envuelven en cards decorativas.
- **Tablas:** encabezados persistentes cuando haya scroll largo; alineación consistente; números monetarios alineados a la derecha; filas con hover/focus discretos; acciones al final.
- **Badges:** texto explícito, forma compacta y combinación de fondo/borde/texto semántica. Estado y severidad no se comunican solo mediante color.
- **Botones:** primario para la acción principal, secundario para alternativas, destructivo para confirmar eliminación; icon-only requiere nombre accesible y tooltip.
- **Menús y modales:** borde/sombra con contraste suficiente, foco visible, jerarquía de título, contenido y acciones; mantener dimensiones estables y evitar desbordamiento en móvil.
- **Feedback:** toast breve no bloqueante para éxito/error; confirmación modal para operaciones destructivas.

## 9. Especificación del Dashboard

### Métricas

Mostrar cuatro tarjetas en una cuadrícula de 4 columnas por encima de 800 px, 2 entre 521 y 800 px y 1 hasta 520 px:

1. **Ingresos del mes:** suma de `amountPaid` de pagos con fecha dentro del mes calendario actual. Mostrar moneda y etiqueta del periodo. No incluir pagos pendientes ni anulados.
2. **Ingresos perdidos por descuentos:** suma de `discountAmount` de esos mismos pagos. Es la diferencia entre subtotal de lista y total antes de impuestos; indicar explícitamente que es descuento concedido.
3. **Agentes activos:** cantidad de agentes cuyo estado derivado sea `active`, en todos los clientes. Excluir `inactive`, `failing` y agentes eliminados.
4. **Agentes fallando:** cantidad de agentes cuyo estado derivado sea `failing`, no cantidad de logs. Mostrar como problema operativo; proporcionar debajo del gráfico un enlace general a Log de errores, sin filtro de agente implícito.

Para ingresos, usar el código de moneda del dataset (USD) y `Intl.NumberFormat('es', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })`; no mezclar monedas. Si no existen pagos este mes, mostrar cero con ese formato y no un dato ficticio vacío.

### Actividad semanal

Debajo de las métricas, mostrar un gráfico de barras de siete días consecutivos, incluyendo el día actual. Serie: importe pagado por día; alternativa accesible muestra fecha, importe y número de pagos. El eje temporal debe estar en orden y usar una escala común. Si no hay datos, mostrar siete valores cero. No presentar eventos inventados como actividad de agentes. Debajo incluir tabla de hasta cuatro pagos completados recientes con cliente, contrato, agente, fecha e importe; esta tabla es de resumen y sus filas no necesitan dropdown. Sus enlaces llevan a Contrataciones y Log de errores.

## 10. Especificación de la gestión de usuarios

### Tabla

Columnas: nombre, email, plan, estado, acciones. Estados: activo, invitado y suspendido; planes ficticios: Starter, Pro y Enterprise. Orden inicial por nombre ascendente. Los datos pueden incluir organización, alta, país y conteos de agentes/contratos, pero no se deben saturar las columnas principales.

### Acciones y detalle

Botón `⋮` accesible abre el menú asociado a la fila. Incluye «Ver detalle» y «Eliminar». «Ver detalle» abre modal con nombre, email, organización, plan, estado, fecha de alta, país, agentes asociados y resumen de contrataciones. Mostrar valores faltantes como «No disponible», no como vacío ambiguo.

Cerrar el modal mediante botón de cierre, Escape o clic en backdrop. Clic dentro del diálogo no lo cierra. Al cerrar, devolver el foco al botón que lo abrió y conservar scroll/posición de la tabla.

### Eliminación

«Eliminar» cierra el menú y solicita confirmación identificando al usuario y el impacto. Cancelar no modifica datos. Confirmar marca el registro como eliminado localmente, lo oculta de la vista normal y muestra toast con acción «Deshacer» durante 5 segundos. No borrar agentes, contratos ni logs asociados; conservar relaciones históricas y mostrar al propietario como eliminado donde corresponda. Estado y cambios se pierden al recargar la página.

## 11. Especificación de la gestión de agentes

### Tabla y estados

Columnas: nombre, propietario, estado, Skills, acciones. Estados visibles: Activo, Inactivo y Fallando. Skills se colapsan por defecto; mostrar cantidad y control «Mostrar Skills». Expandir revela tags con nombres y descripciones emergentes opcionales; contraer vuelve al estado inicial. La transición de altura/opacidad dura 150–200 ms, respeta `prefers-reduced-motion` y no desplaza inesperadamente el foco. El botón indica expandido/contraído con texto o `aria-expanded` e icono chevron.

### Configurar y eliminar

El menú `⋮` contiene «Configurar» y «Eliminar». Configurar abre modal con nombre, propietario, estado y system prompt completo en un textarea editable, seleccionable y con scroll interno. «Guardar cambios» conserva el prompt en el estado local en memoria; rechaza valores vacíos, muestra feedback y no llama a una API. Modal cierra como el modal de usuario.

Eliminar requiere confirmación con nombre del agente. Confirmar lo marca eliminado localmente, lo oculta de la tabla y lo excluye de las métricas. No borrar contratos ni errores; historial conserva snapshot/nombre del agente. Mostrar toast con deshacer por 5 segundos. Si tiene contrato activo, advertir que el registro histórico se conserva; la simulación no cancela ni modifica el contrato.

### Regla de estado

El estado se deriva de `enabled` y logs asociados no resueltos: `inactive` si `enabled=false`; `failing` si está habilitado y tiene uno o más logs no resueltos de gravedad crítica o error; en otro caso `active`. Advertencia e información no fuerzan estado `failing`. Al resolver el último error crítico/error, volver a `active` solo si `enabled=true`. No cambiar otros errores al resolver uno.

## 12. Especificación de Skills

Mostrar bloque informativo: «Una Skill es una capacidad modular que se puede incorporar a un agente para ampliar sus funcionalidades». Ejemplos visibles: navegación web, análisis de documentos, gestión de calendarios y procesamiento de datos.

Catálogo en tabla/lista con nombre, descripción breve, cantidad de agentes no eliminados que la usan y acciones. Usar mínimo cuatro Skills ficticias coherentes con agentes seed. Menú `⋮`: «Ver detalle» y «Eliminar».

Detalle modal: nombre, descripción completa, versión ficticia, categoría, agentes asociados, requisitos/limitaciones y precio unitario orientativo cuando aplique. Cerrar mediante botón, Escape o backdrop, y devolver foco.

Eliminar requiere confirmación. Si una Skill está asociada a agente o contrato, informar que el uso histórico se conserva. Confirmar la archiva localmente y la oculta del catálogo; no alterar agentes ni contratos. Los nombres/precios snapshot de contratos no cambian. Toast con deshacer 5 segundos; recarga restablece fixtures.

## 13. Especificación de contrataciones de agentes

### Tabla

Mostrar cliente, agente, Skills contratadas, inicio, fin, estado, total pagado y acciones. Para contratos sin fecha final mostrar «Sin fecha de finalización»; representar las Skills como etiquetas. Cada fila usa un menú `⋮` con «Ver detalle».

### Modal de detalle

Incluir identificador, datos relevantes del cliente (nombre, organización, email), agente (nombre y propietario), estado, fechas, duración si ambas fechas existen, Skills y precio individual snapshot, moneda y desglose económico completo.

### Regla de precios

Cada contrato guarda snapshot inmutable de importes al contratar:
- `basePrice`: tarifa del agente para el periodo contratado.
- `skillLines`: Skills y precio individual para el mismo periodo.
- `subtotal = basePrice + suma(skillLines.price)`.
- `discountAmount`: descuento/cupón aplicado, no negativo y no mayor que subtotal.
- `totalPaid = subtotal - discountAmount + taxAmount`.
- En el prototipo, `taxAmount` será cero salvo que el fixture muestre explícitamente tasa e importe de impuesto.

El detalle muestra cada línea, subtotal, descuento, impuesto si corresponde y total pagado; debe cumplir exactamente la fórmula. Ingresos del Dashboard agregan pagos por fecha, no el valor total del contrato en cada día. Duración = diferencia de fechas en días naturales; contar inicio y fin como días contratados: `fechaFin - fechaInicio + 1`. Mostrar «No calculable» si alguna fecha no existe. Estados permitidos: activo, finalizado, cancelado; son explícitos y no se infieren solo de la fecha.

## 14. Especificación del log de errores

Tabla: fecha/hora localizable, agente, tipo, descripción breve, gravedad, estado de resolución y acciones. Categorías: Crítico (rojo oscuro), Error (rojo), Advertencia (ámbar), Información (azul neutro). Mostrar texto de categoría en badge. Orden inicial más reciente primero.

Menú `⋮`: «Ver detalle» y «Marcar como resuelto»; la segunda opción se deshabilita y cambia a «Ya resuelto» para registros resueltos. Añadir dos selectores locales: gravedad (`all`, `critical`, `error`, `warning`, `info`) y resolución (`all`, `unresolved`, `resolved`), inicialmente en «Todos»; ambos filtros se combinan. El modal contiene ID, timestamp con zona horaria, agente, tipo, categoría, descripción completa, contexto relevante, stack trace íntegro en bloque monoespaciado con scroll, estado y hora de resolución si existe.

«Marcar como resuelto» actualiza estado en memoria, añade `resolvedAt`, cambia badge y ofrece toast de éxito. Mantiene descripción y stack trace. No elimina el registro. Recalcular estado del agente con la regla de la sección 11. Si ya fue resuelto, acción idempotente: no duplicar cambios ni toast de error. Al recargar se restauran datos iniciales.

## 15. Modelo de datos y relaciones

Usar identificadores estables y referencias por ID. Fechas ISO 8601; timestamps con zona UTC almacenada y formateada a hora local. Importes como decimal monetario (no aritmética binaria de coma flotante para redondeos); moneda `USD`. Todos los objetos seed son ficticios.

- **User:** `id`, `name`, `email`, `organization`, `plan`, `status`, `createdAt`, `country`, `role`, `deletedAt?`. Un usuario puede ser propietario de agentes y cliente de contratos.
- **Agent:** `id`, `name`, `ownerUserId`, `enabled`, `systemPrompt`, `skillIds[]`, `createdAt`, `deletedAt?`. Tiene un propietario, varias Skills y cero o más logs/contratos. Estado derivado conforme a la sección 11.
- **Skill:** `id`, `name`, `shortDescription`, `description`, `limitations`, `category`, `version`, `listPrice`, `currency`, `archivedAt?`. Puede asociarse a muchos agentes y contratos. `listPrice` es el precio de referencia actual, no reescribe snapshots históricos.
- **Contract:** `id`, `clientUserId`, `agentId`, `status`, `startDate`, `endDate?`, `billingPeriod`, `currency`, `basePrice`, `skillLines[{skillId, nameSnapshot, price}]`, `discountAmount`, `taxAmount`, `totalPaid`, `payments[]`. Un contrato relaciona un cliente con un agente. Cada pago tiene `id`, `paidAt`, `subtotal`, `discountAmount`, `taxAmount`, `amountPaid`, `status`; solo pagos `paid` se agregan en Dashboard.
- **ErrorLog:** `id`, `agentId`, `occurredAt`, `type`, `severity`, `shortDescription`, `description`, `stackTrace`, `context`, `status`, `resolvedAt?`. Un log pertenece a un agente; resolverlo no elimina el vínculo.

### Reglas de integridad y fixtures

- Todo `ownerUserId`, `clientUserId`, `agentId` y `skillId` de referencia debe existir en el dataset inicial.
- Los valores de estado pertenecen a los enums documentados. Un agente activo/fallando debe estar habilitado; inactivo debe estar deshabilitado.
- Un agente fallando tiene al menos un Error/Crítico sin resolver. Ningún agente activo tiene Error/Crítico sin resolver.
- Precio de Skill en contrato es snapshot, no se recalcula con el catálogo actual. El total de contrato y cada pago deben cuadrar con su desglose.
- Incluir como mínimo 5 usuarios (los tres planes y estados), 5 agentes (con los tres estados), 4 Skills (web, documentos, calendario y datos), 4 contratos (activos e históricos; descuento y sin descuento; al menos un contrato con varias Skills) y 6 logs (todas las severidades, varios resueltos y al menos un error no resuelto vinculado a agente fallando).
- Incluir pagos con fechas en la semana actual y en el mes actual para poder visualizar métricas; no codificar fechas que contradigan la fecha del sistema sin etiquetar el periodo fixture. Crear fechas seed relativas al día actual para mantener útiles las métricas.
- Eliminar es soft delete/archivo en estado local. No usar cascada destructiva: contratos y logs conservan snapshots/referencias visibles y muestran «Registro eliminado/archivado» si el elemento relacionado ya no figura en su catálogo.

### Dataset inicial reproducible

Usar los siguientes IDs, nombres y relaciones. Los emails son ficticios bajo `example.test`; asignar al usuario su nombre, organización, país, rol y fecha de alta ficticios. Los desplazamientos de días se cuentan desde la fecha local actual: fechas a las 12:00 locales y timestamps con hora local convertida a ISO UTC.

| Usuario | Nombre | Email | Organización | Plan / estado | País / rol | Alta, días relativos |
|---|---|---|---|---|---|---:|
| `usr-nova` | Carlos Mendoza | `carlos.mendoza@example.test` | NovaTech Solutions | Enterprise / `active` | España / Director de Operaciones | -420 |
| `usr-data` | Elena Ruiz | `elena.ruiz@example.test` | DataPulse Analytics | Pro / `invited` | México / Administradora | -260 |
| `usr-krypton` | Andrés Valdés | `andres.valdes@example.test` | Krypton Health AI | Enterprise / `active` | Chile / Responsable de Tecnología | -180 |
| `usr-vanguard` | Mariana Soria | `mariana.soria@example.test` | Vanguard FinTech | Starter / `suspended` | Argentina / Analista de Cumplimiento | -90 |
| `usr-summit` | Lucía Herrera | `lucia.herrera@example.test` | Summit Works | Starter / `active` | Colombia / Coordinadora de Operaciones | -35 |

| Skill | Nombre | Categoría | Versión | Precio USD |
|---|---|---|---|---:|
| `sk-web` | Navegación web | Exploración | 2.4 | 120.00 |
| `sk-docs` | Análisis de documentos | Procesamiento | 1.8 | 180.00 |
| `sk-calendar` | Gestión de calendarios | Productividad | 3.1 | 90.00 |
| `sk-data` | Procesamiento de datos | Procesamiento | 2.0 | 150.00 |

| Agente | Nombre | Propietario | Habilitado | Skills | Alta, días relativos |
|---|---|---|---|---|---:|
| `agt-sentinel` | SentinelBot Pro | `usr-nova` | Sí | `sk-web`, `sk-docs` | -120 |
| `agt-scraper` | DataScraper Alpha | `usr-data` | Sí | `sk-web`, `sk-data` | -100 |
| `agt-calendar` | CalendarGenius | `usr-krypton` | Sí | `sk-calendar`, `sk-docs` | -70 |
| `agt-reviewer` | Compliance Reviewer | `usr-vanguard` | No | `sk-docs`, `sk-data` | -60 |
| `agt-support` | SupportGenie | `usr-nova` | Sí | `sk-docs`, `sk-calendar` | -45 |

Cada agente tiene un system prompt ficticio no vacío, en español, que describe su función sin autorizar acciones externas. Cada Skill tiene descripción breve, descripción completa y limitaciones ficticias coherentes con su nombre.

| Contrato | Cliente / agente | Estado | Inicio / fin, días relativos | Base | Skills snapshot | Descuento | Impuesto | Pago |
|---|---|---|---|---:|---|---:|---:|---:|
| `CTR-2026-101` | `usr-nova` / `agt-sentinel` | `active` | -12 / sin fin | 1200 | web 120, documentos 180 | 150 | 0 | 1350 |
| `CTR-2026-087` | `usr-data` / `agt-scraper` | `completed` | -42 / -13 | 950 | web 120 | 0 | 0 | 1070 |
| `CTR-2026-112` | `usr-krypton` / `agt-calendar` | `active` | -8 / sin fin | 2100 | documentos 180, calendario 90 | 237 | 0 | 2133 |
| `CTR-2026-063` | `usr-vanguard` / `agt-reviewer` | `cancelled` | -35 / -28 | 800 | datos 150 | 0 | 0 | 950 |

Todos los importes son USD y cada contrato tiene un pago `paid`, con desglose igual al contractual. Las fechas relativas de pago son respectivamente -1, -5, -3 y -29 días. El contrato cancelado conserva su pago histórico; no simular un reembolso. Los ingresos mensuales dependen del mes local y pueden variar al cruzar el primer día del mes.

| Log | Agente | Tipo | Gravedad | Estado | Día relativo |
|---|---|---|---|---|---:|
| `ERR-4101` | `agt-support` | ConnectionTimeout | `critical` | `unresolved` | -1 |
| `ERR-4102` | `agt-scraper` | RateLimitExceeded | `error` | `unresolved` | -2 |
| `ERR-4098` | `agt-calendar` | CalendarConflict | `warning` | `unresolved` | -3 |
| `ERR-4070` | `agt-sentinel` | OptionalFieldMissing | `info` | `resolved` | -6 |
| `ERR-4022` | `agt-reviewer` | DisabledAgentNotice | `error` | `resolved` | -20 |
| `ERR-4008` | `agt-sentinel` | OptionalMetadataNotice | `warning` | `unresolved` | -12 |

Cada log incluye descripción breve y completa, contexto y stack trace ficticio no vacío; los resueltos incluyen `resolvedAt`. Inicialmente SentinelBot y CalendarGenius están activos, DataScraper y SupportGenie fallando, y Compliance Reviewer inactivo.

## 16. Arquitectura de componentes

Componentes visuales reutilizables, independientes del marco de UI que finalmente se elija:

- **AppShell:** estructura sidebar, topbar y área de contenido; controla sección y tema.
- **Sidebar / NavItem:** enlaces de sección, indicador activo y navegación móvil.
- **Topbar / ThemeToggle:** contexto de página y alternancia de tema accesible.
- **PageHeader:** título, descripción breve y acción principal contextual.
- **MetricCard / WeeklyActivityChart:** métrica con valor/formato/periodo; gráfico con estados normal y vacío, datos accesibles.
- **DataTable:** cabeceras, filas, orden definido, acciones y presentación responsive. No inventa datos ni lógica de dominio.
- **StatusBadge / SeverityBadge / SkillTag:** representación textual consistente de estado, gravedad y Skills.
- **ActionMenu:** botón `⋮`, opciones, cierre por exterior/Escape y control de foco.
- **Modal / ConfirmDialog:** capa overlay, foco, cierre y confirmación; ConfirmDialog identifica claramente el objeto y la acción.
- **ExpandableSkills:** resumen, control expandido y transición que respeta movimiento reducido.
- **ToastRegion / Toast:** feedback anunciable, duración y acción opcional Deshacer.
- **EmptyState:** mensaje específico y acción opcional sin sugerir registros existentes.
- **Detail sections:** presentación consistente de datos de usuario, agente, Skill, contrato y log; el contenido pertenece a cada dominio.

La lógica de datos/estado debe separarse de la presentación para que las métricas, conteos y reglas de estado no dependan del texto visible de la tabla.

## 17. Especificación de interacciones y comportamientos

- **Dropdowns:** abre con clic/Enter/Espacio; solo un menú de fila abierto a la vez. Cerrar al hacer clic fuera, seleccionar opción, pulsar Escape o cambiar de sección. Al cerrar por Escape devolver foco al disparador. No permitir que el menú quede recortado por overflow de tabla.
- **Modales:** mostrar overlay, enfocar el diálogo y mantener Tab/Shift+Tab dentro. Cerrar con botón, Escape y clic en backdrop; un clic dentro no cierra. Al cerrar, devolver foco al activador. Al abrir un modal desde menú, cerrar el menú primero.
- **Confirmaciones:** cancelar/cerrar deja datos intactos. Confirmar ejecuta una sola vez, deshabilita el botón mientras se procesa sin mostrar falsa latencia y da feedback. No usar `window.confirm` como única interfaz.
- **Eliminación simulada:** marcar eliminado/archivado, actualizar tabla y conteos, preservar referencias, ofrecer Deshacer durante 5 s; si se deshace, restaurar exactamente el registro y sus conteos. Pasado el plazo, no hay mecanismo de restauración. Los datos se reinician al recargar.
- **Skills expandibles:** contraer inicialmente, anunciar número de Skills, activar con teclado y no perder selección/foco al animar.
- **Tema:** toggle alterna inmediatamente, actualiza clase raíz, mantiene contraste, persiste preferencia local cuando sea posible; seguir preferencia del sistema si no hay selección previa.
- **Navegación entre documentos:** mantener el estado de entidades en memoria; al hacer clic normal, sin modificadores, en un enlace interno hacia otra sección, serializarlo en `sessionStorage` bajo `agenthub-navigation-state`, junto con la ruta destino y la hora. Al iniciar el documento destino, consumir y borrar la entrada antes de renderizar; aceptarla solo si coincide la ruta y tiene menos de 15 segundos. Una carga directa o recarga sin transferencia restaura fixtures. Si el almacenamiento falla, continuar con fixtures sin bloquear navegación. La preferencia de tema se guarda separadamente en `localStorage` y sobrevive a recargas.
- **Resolución de error:** marcar resuelto una vez, registrar `resolvedAt`, refrescar estado de agente, permitir ver detalle posterior y dar toast; no borrar ni modificar traza.
- **Feedback:** toast de éxito/error con texto específico; duración 5 s, cierre manual, acción Deshacer cuando corresponda. Anunciar con región `aria-live`; no tapar controles ni contenido crítico.
- **Estados vacíos:** mensajes distintos para catálogo sin registros, filtro sin resultados (si se implementa filtro), y tabla vacía tras eliminación; permitir quitar filtro/restaurar elemento cuando aplique.
- **Cargas/errores:** al ser datos locales no mostrar skeleton artificial ni estado de red. Errores de cálculo/datos inválidos deben ser visibles y no reemplazarse silenciosamente por cero.

## 18. Diseño responsive

Breakpoints del CSS del prototipo: sidebar persistente desde 1024 px y drawer hasta 1023 px; las métricas pasan de cuatro a dos columnas hasta 800 px y a una columna hasta 520 px. Usar estos umbrales para reproducir el diseño sin decisiones adicionales.

- **Escritorio, desde 1024 px:** sidebar persistente, tabla completa, métricas en 4 columnas y modales centrados; ancho máximo 760 px para detalle y 440 px para confirmación.
- **Tablet, de 521 a 1023 px:** navegación drawer; tabla con scroll horizontal contenido; métricas en 4 columnas por encima de 800 px y en 2 a partir de 800 px hacia abajo; modales centrados con márgenes y scroll interno.
- **Móvil, hasta 520 px:** navegación drawer; métricas en una columna; tablas con desplazamiento horizontal contenido, sin ocultar acciones ni datos esenciales; modales pegados abajo y de ancho completo con scroll interno; controles táctiles de al menos 44x44 px.
- Evitar scroll horizontal de toda la página, solapamiento de acciones y texto cortado. Probar como mínimo 360 px, 768 px y 1280 px de ancho.

## 19. Consideraciones de accesibilidad

- Usar landmarks semánticos (`header`, `nav`, `main`), encabezados en orden y botones/enlaces nativos.
- Toda acción es operable por teclado; foco visible y orden lógico. Menús y modales implementan roles/estados accesibles apropiados, nombres y retorno de foco.
- Asociar `aria-expanded` y `aria-controls` al acordeón de Skills; anunciar actualizaciones de resolución/eliminación en `aria-live`.
- Contraste mínimo WCAG AA para texto normal y controles; no codificar severidad/estado solo por color.
- Etiquetar columnas y valores en layouts móviles, tener texto alternativo para gráficos y tooltip no indispensable para comprender valores.
- Permitir zoom/reflow, respetar `prefers-reduced-motion`, identificar errores y confirmaciones con texto claro.

## 20. Requisitos técnicos y restricciones

- Datos hardcodeados en módulos/estructuras locales, con relaciones mediante IDs; no `fetch`, XHR, SDK, API, base de datos ni secretos.
- La interfaz se sirve desde la infraestructura Flask estática existente; no convertir `server.py` en backend de dominio.
- Tailwind CSS v4 por el CDN indicado en la sección 5 es obligatorio en las seis páginas; `app.css` local y estilos inline calculados son parte del diseño aprobado. No añadir frameworks, jQuery, dependencias de UI ni herramienta de build.
- Estado de tema, registros eliminados y resolución viven solo en sesión/memoria local. Recargar restaura fixtures deterministas, salvo preferencia de tema.
- No incluir datos personales reales, prompts reales ni credenciales. Prompt y stack traces ficticios.
- Limitar el alcance a navegador moderno y uso administrativo; no declarar seguridad, privacidad o fiabilidad de producción.

## 21. Plan de implementación

1. Crear shell de aplicación, navegación a las seis secciones, topbar y tokens/temas.
2. Definir fixtures y relaciones; implementar funciones locales para agregaciones, reglas de estado y formatos.
3. Implementar componentes comunes: tabla, badge, tags, menú, modal, confirmación, toast y estado vacío.
4. Construir secciones en orden: Dashboard, Usuarios, Agentes, Skills, Contrataciones y Log de errores.
5. Añadir respuestas responsive, teclado/lector de pantalla y estados vacíos.
6. Verificar fixtures, cálculos, temas, acciones locales y dimensiones objetivo; no conectar backend.

## 22. Suposiciones y decisiones

- «Mes actual» significa mes calendario según fecha local del navegador; timestamps de pagos se almacenan en UTC y se convierten antes de agrupar por día/mes local.
- Moneda única USD en datos seed; importes con dos decimales. No se calcula cambio de moneda.
- Ingresos se basan en pagos exitosos ocurridos en el periodo; descuento perdido es el descuento efectivamente aplicado a esos pagos.
- `active` y `failing` son estados operativos derivados, `inactive` depende de `enabled=false`; errores resueltos permanecen en historial.
- Contratos guardan precios snapshot; se usa tarifa de agente más Skills para el periodo contratado, descuento e impuesto explícito. Fixtures deben satisfacer la fórmula.
- Duración contractual cuenta ambos días, inicio y fin. Contrato activo puede carecer de fecha final.
- Eliminaciones archivarán registros localmente y conservarán historial; no borran dependencias.
- No implementar búsqueda ni paginación. Los únicos filtros son los dos selectores locales de gravedad y resolución del Log de errores.
- No se especifica backend existente de AgentHub en el repositorio. La especificación no promete integración.

## 23. Criterios de aceptación

1. Las seis secciones se alcanzan desde la sidebar y la vista actual tiene indicador activo.
2. Dashboard muestra cuatro tarjetas: ingresos del mes, descuentos, agentes activos y agentes fallando; cada una tiene icono, etiqueta y valor calculado desde fixtures locales.
3. Dashboard incluye debajo un gráfico semanal de siete días con importe, número de pagos, escala coherente y estado vacío.
4. Usuarios muestra al menos cinco registros con nombre, email, plan, estado y acciones.
5. El menú de cada usuario incluye detalle y eliminación; el modal corresponde a la fila, muestra el registro completo y se cierra con botón, Escape o backdrop.
6. Eliminar un usuario requiere confirmación, conserva agentes/contratos/logs relacionados y permite deshacer el soft-delete durante cinco segundos.
7. Agentes muestra al menos cuatro registros con propietario, estado derivado, Skills y menú de acciones por fila.
8. Las Skills de cada agente comienzan colapsadas; expandir/contraer actualiza el estado accesible y usa transición que respeta movimiento reducido.
9. Configurar abre el prompt completo del agente seleccionado en textarea editable; Guardar cambia solo el estado local, rechaza texto vacío y da feedback.
10. Eliminar agente requiere confirmación, conserva contratos/logs históricos, actualiza conteos y permite deshacer.
11. Skills muestra al menos cuatro capacidades con descripción y conteo de agentes calculado desde las relaciones.
12. La sección Skills explica el concepto; cada fila permite detalle y archivo/eliminación confirmada sin modificar precios snapshot de contratos.
13. Contrataciones muestra al menos cuatro contratos activos e históricos con cliente, agente, Skills, fechas, importe y acciones.
14. Cada fila de contrato tiene menú `⋮` con «Ver detalle»; el modal correspondiente muestra duración si puede calcularse, cada Skill y su precio.
15. El desglose contractual muestra base, subtotal, descuento, impuestos y total; el cálculo y los pagos registrados deben coincidir.
16. Log de errores muestra al menos seis entradas con fecha/hora, agente, tipo, descripción, gravedad y resolución.
17. Cada log tiene menú `⋮` con detalle y resolución; el detalle muestra contexto y stack trace completos.
18. Resolver un log actualiza solo ese registro, conserva su traza, registra `resolvedAt` y recalcula el estado del agente; resolver dos veces no duplica cambios.
19. Los menús se abren con su disparador, solo uno queda abierto, y se cierran por selección, clic exterior, Escape o cambio de sección.
20. Los modales enfocan el diálogo, contienen el tabulado, cierran por botón/Escape/backdrop y restauran el foco al activador.
21. Las eliminaciones muestran confirmación contextual; cancelar no cambia datos y Deshacer restaura exactamente el registro y sus conteos.
22. El toggle de tema alterna claro/oscuro en toda la UI mediante la clase `dark`, variables CSS locales y variantes Tailwind cuando se usen, y conserva la preferencia al navegar entre documentos.
23. A 360, 768 y 1280 px sidebar, tablas, métricas y modales siguen operables, sin scroll global ni controles esenciales ocultos.
24. Navegación, botones, tablas, menús, modales y acordeones usan semántica HTML y estados accesibles; los cambios se anuncian y el foco es visible.
25. Los datos son ficticios y coherentes entre secciones; no hay API, backend de producto, framework, jQuery, paquete de frontend ni herramienta de build. Tailwind se carga por CDN y `app.css` local define la capa visual compartida; Flask es la dependencia Python del servidor de desarrollo existente.

## 24. Checklist de validación

- [ ] Están los 25 apartados y cubren todo el briefing.
- [ ] Las seis secciones y sus campos, acciones y estados están especificados.
- [ ] Métricas, periodos, moneda, pagos y gráfico tienen reglas inequívocas.
- [ ] Modales, backdrop, cierre, Escape, foco y dropdowns tienen comportamiento definido.
- [ ] Eliminaciones tienen confirmación, resultado simulado, undo y regla de relaciones.
- [ ] Skills colapsan por defecto y su expansión tiene indicador, transición y soporte de movimiento reducido.
- [ ] Contratos incluyen fechas, duración, precios snapshot y suma económica comprobable.
- [ ] Logs incluyen severidad, stack trace, resolución y efecto en estado de agente.
- [ ] Los modelos y fixtures mantienen integridad referencial y consistencia temporal/económica.
- [ ] Tema claro/oscuro, responsive, accesibilidad y estados vacíos están definidos.
- [ ] Stack verificado separado de recomendaciones; no se presupone API ni framework.
- [ ] La futura implementación no requiere APIs, backend ni dependencias innecesarias.

## 25. Limitaciones conocidas

- No hay backend, autenticación, autorización, persistencia ni datos reales; no es una herramienta operativa para producción.
- Las modificaciones locales desaparecen al recargar y los datos seed no reflejan actividad real.
- Tailwind v4 se carga desde CDN y requiere conectividad para disponer de sus utilidades; `app.css` es una hoja local y forma parte del diseño aprobado.
- No se han definido requisitos de despliegue, navegadores corporativos, localización distinta de español/USD, impuestos, descuentos comerciales reales ni reglas de facturación por ciclo.
- Los errores y system prompts son demostrativos y no deben incluir información sensible.
- El servidor Flask es de desarrollo, no debe exponerse como servicio de producción. Las verificaciones visuales de los temas, teclado y anchos 360/768/1280 px siguen pendientes de una revisión real en navegador; no se consideran aprobadas solo por obtener HTTP 200 o por validar la sintaxis.
