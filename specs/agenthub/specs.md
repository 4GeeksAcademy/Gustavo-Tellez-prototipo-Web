# AgentHub: Especificación del panel de administración

**Estado:** Especificación para un prototipo local.  
**Idioma de la interfaz:** Español.  
**Fuente de datos:** Dataset ficticio hardcodeado; sin API, backend de producto ni persistencia.

## 1. Descripción general del proyecto

AgentHub es una plataforma SaaS en la que empresas alquilan agentes de IA preconfigurados y amplían sus capacidades mediante Skills. Este documento define un panel administrativo interno para supervisar ingresos, usuarios, agentes, Skills, contrataciones y errores de ejecución. El entregable describe una futura interfaz; no implica que la aplicación, la API o el modelo de producción ya existan.

## 2. Objetivos del proyecto

- Dar al administrador una vista rápida del estado operativo y económico de la plataforma.
- Permitir consultar y gestionar registros ficticios de usuarios, agentes y Skills.
- Inspeccionar contratos y entender su importe a partir de un desglose verificable.
- Revisar errores de ejecución y reflejar su resolución en la interfaz.
- Mantener patrones consistentes, adaptables y accesibles en las seis secciones.

## 3. Alcance

**Incluido:** panel de seis secciones, navegación, modo claro/oscuro, tablas, métricas, gráfico semanal, detalles en modales, confirmaciones, menús de acciones, Skills expandibles, toasts, estados vacíos y cambios locales en memoria.

**Excluido:** autenticación, permisos reales, API, conexión al backend existente, servicios externos de AgentHub, persistencia tras recargar, creación/edición de entidades, cobros reales, búsqueda avanzada, exportación, configuración de producción y telemetría real. Las acciones de eliminación y resolución son simulaciones locales.

## 4. Rol y contexto del usuario

El usuario principal es un administrador interno con acceso de solo lectura al conjunto de datos y permisos simulados para eliminar registros o resolver errores. Necesita comparar información con rapidez, distinguir estados por texto y color, y conservar el contexto de la tabla al inspeccionar detalles. El prototipo no implementa autenticación ni control de acceso; no debe presentar las acciones como operaciones reales del backend.

## 5. Análisis del repositorio

- [server.py](../../server.py) contiene un servidor Flask que sirve `index.html` y archivos estáticos desde la raíz. Escucha en `0.0.0.0:3000` con `debug=True`; no constituye un backend de producto ni evidencia de despliegue de producción.
- [README.es.md](../../README.es.md) describe la plantilla HTML/CSS y el inicio de Flask. Recomienda Tailwind CSS v4 por CDN como opción.
- [learn.json](../../learn.json) declara HTML, CSS y JavaScript, pero esa metadata no prueba que exista una interfaz implementada.
- No se observan componentes de AgentHub, manifiestos de dependencias, configuración de build, API ni persistencia.

La futura implementación debe reutilizar la base disponible. HTML/CSS/JavaScript son la recomendación más conservadora por la intención documentada de la plantilla; no se debe asumir React, TypeScript, Node u otro framework. Tailwind v4 no está verificado como instalado; se recomienda como mecanismo de estilos por su mención en el README y porque el requisito exige utilidades `dark:`. Si se usa, documentar la carga por CDN y su requisito de red. Flask solo serviría la interfaz estática.

## 6. Arquitectura de información

Navegación principal, en este orden:

1. Dashboard
2. Usuarios
3. Agentes
4. Skills
5. Contrataciones
6. Log de errores

Cada sección tiene una ruta/hash o estado de vista estable, título único, contenido principal y acción contextual cuando aplique. Cambiar sección actualiza el indicador activo y el título de la topbar sin abrir una vista duplicada. El prototipo puede resolver la navegación con JavaScript local; no necesita un router externo.

## 7. Layout general

- **Escritorio:** sidebar persistente de aproximadamente 240 px; área principal flexible con topbar de 64 px y contenido con máximo de lectura amplio. El contenido tiene márgenes de 24–32 px.
- **Sidebar:** marca AgentHub, seis enlaces con icono y texto, estado activo claramente visible y control de colapso opcional solo si mantiene etiquetas accesibles.
- **Topbar:** breadcrumb o nombre de sección, título/contexto actual y toggle claro/oscuro. No duplica navegación principal.
- **Contenido:** encabezado de página, descripción breve si aporta contexto, controles y contenido. Las tablas ocupan el ancho disponible; se evitan tarjetas anidadas o decoración sin función.
- **Móvil:** sidebar sustituida por navegación tipo drawer activada con botón accesible; al abrir, el drawer cubre el contenido con backdrop y se cierra al elegir sección, pulsar Escape o hacer clic fuera. Topbar compacta y tablas transformadas en filas apiladas o contenedor con desplazamiento horizontal indicado.

## 8. Sistema de diseño

- **Dirección visual:** SaaS administrativo sobrio, compacto y fácil de escanear; sin ilustraciones decorativas ni gradientes de marketing.
- **Tipografía:** sans serif legible disponible localmente; jerarquía clara: título de página 24–28 px, subtítulos 16–18 px, texto/tablas 14–16 px, metadatos nunca menores de 12 px. Evitar tipografía condensada en datos.
- **Color:** fondos neutrales; texto de alto contraste; un acento verde azulado para acciones/selección; verde para éxito/activo, ámbar para advertencia, rojo para error/crítico, azul neutro para información. No depender solo del color.
- **Tema claro:** fondo general gris muy claro, superficies blancas, bordes grises suaves y texto grafito.
- **Tema oscuro:** fondo grafito, superficies gris oscuro diferenciadas, bordes visibles, texto claro y colores semánticos aclarados para contraste.
- **Tailwind:** aplicar variantes `dark:` a fondos, texto, bordes, estados de hover/focus y controles; activar el tema mediante clase `dark` en la raíz y persistir la preferencia solo durante la sesión/local storage si el navegador lo permite. Al inicio, respetar preferencia guardada; en ausencia de elección, respetar `prefers-color-scheme`.
- **Espaciado:** escala consistente basada en múltiplos de 4 px; 16–24 px entre bloques y 8–12 px en controles relacionados.
- **Cards y superficies:** radio máximo 8 px, borde sutil y sombra solo cuando ayude a separar capas; las secciones de página no se envuelven en cards decorativas.
- **Tablas:** encabezados persistentes cuando haya scroll largo; alineación consistente; números monetarios alineados a la derecha; filas con hover/focus discretos; acciones al final.
- **Badges:** texto explícito, forma compacta y combinación de fondo/borde/texto semántica. Estado y severidad no se comunican solo mediante color.
- **Botones:** primario para la acción principal, secundario para alternativas, destructivo para confirmar eliminación; icon-only requiere nombre accesible y tooltip.
- **Menús y modales:** borde/sombra con contraste suficiente, foco visible, jerarquía de título, contenido y acciones; mantener dimensiones estables y evitar desbordamiento en móvil.
- **Feedback:** toast breve no bloqueante para éxito/error; confirmación modal para operaciones destructivas.

## 9. Especificación del Dashboard

### Métricas

Mostrar cuatro tarjetas en una cuadrícula que se adapte a 4 columnas en escritorio, 2 en tablet y 1 en móvil:

1. **Ingresos del mes:** suma de `amountPaid` de pagos con fecha dentro del mes calendario actual. Mostrar moneda y etiqueta del periodo. No incluir pagos pendientes ni anulados.
2. **Ingresos perdidos por descuentos:** suma de `discountAmount` de esos mismos pagos. Es la diferencia entre subtotal de lista y total antes de impuestos; indicar explícitamente que es descuento concedido.
3. **Agentes activos:** cantidad de agentes cuyo estado derivado sea `active`, en todos los clientes. Excluir `inactive`, `failing` y agentes eliminados.
4. **Agentes fallando:** cantidad de agentes cuyo estado derivado sea `failing`, no cantidad de logs. Mostrar como problema operativo y enlazar a Log de errores con filtro local por esos agentes, si la navegación admite filtros.

Para ingresos, usar el código de moneda del dataset (USD) y formato local `es`; no mezclar monedas. Si no existen pagos este mes, mostrar `$0.00` y no un dato ficticio vacío.

### Actividad semanal

Debajo de las métricas, mostrar un gráfico de línea o barras de siete días consecutivos, incluyendo el día actual. Serie: importe pagado por día; tooltip/alternativa accesible muestra fecha, importe y número de pagos. El eje temporal debe estar en orden y usar una escala común. Si no hay datos, mostrar estado vacío con siete valores cero. No presentar eventos inventados como actividad de agentes.

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

El menú `⋮` contiene «Configurar» y «Eliminar». Configurar abre modal con nombre, propietario, estado y system prompt completo en un bloque legible de texto preformateado, seleccionable y con scroll interno. No editar el prompt en este alcance. Modal cierra como el modal de usuario.

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

Mostrar cliente, agente, Skills contratadas, inicio, fin, total pagado y acciones. Para contratos sin fecha final mostrar «Sin fecha de finalización»; para Skills numerosas mostrar cantidad y expandir/tooltip accesible. Acciones: «Ver detalle».

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

Menú `⋮`: «Ver detalle» y «Marcar como resuelto»; la segunda opción se deshabilita/cambia a «Resuelto» para registros ya resueltos. El modal contiene ID, timestamp con zona horaria, agente, tipo, categoría, descripción completa, contexto relevante, stack trace íntegro en bloque monoespaciado con scroll, estado y hora de resolución si existe.

«Marcar como resuelto» actualiza estado en memoria, añade `resolvedAt`, cambia badge y ofrece toast de éxito. Mantiene descripción y stack trace. No elimina el registro. Recalcular estado del agente con la regla de la sección 11. Si ya fue resuelto, acción idempotente: no duplicar cambios ni toast de error. Al recargar se restauran datos iniciales.

## 15. Modelo de datos y relaciones

Usar identificadores estables y referencias por ID. Fechas ISO 8601; timestamps con zona UTC almacenada y formateada a hora local. Importes como decimal monetario (no aritmética binaria de coma flotante para redondeos); moneda `USD`. Todos los objetos seed son ficticios.

- **User:** `id`, `name`, `email`, `organization`, `plan`, `status`, `createdAt`, `country`, `deletedAt?`. Un usuario puede ser propietario de agentes y cliente de contratos.
- **Agent:** `id`, `name`, `ownerUserId`, `enabled`, `systemPrompt`, `skillIds[]`, `createdAt`, `deletedAt?`. Tiene un propietario, varias Skills y cero o más logs/contratos. Estado derivado conforme a la sección 11.
- **Skill:** `id`, `name`, `shortDescription`, `description`, `category`, `version`, `listPrice`, `currency`, `archivedAt?`. Puede asociarse a muchos agentes y contratos. `listPrice` es el precio de referencia actual, no reescribe snapshots históricos.
- **Contract:** `id`, `clientUserId`, `agentId`, `status`, `startDate`, `endDate?`, `billingPeriod`, `currency`, `basePrice`, `skillLines[{skillId, nameSnapshot, price}]`, `discountAmount`, `taxAmount`, `totalPaid`, `payments[]`. Un contrato relaciona un cliente con un agente. Cada pago tiene `id`, `paidAt`, `subtotal`, `discountAmount`, `taxAmount`, `amountPaid`, `status`; solo pagos `paid` se agregan en Dashboard.
- **ErrorLog:** `id`, `agentId`, `occurredAt`, `type`, `severity`, `shortDescription`, `description`, `stackTrace`, `context`, `status`, `resolvedAt?`. Un log pertenece a un agente; resolverlo no elimina el vínculo.

### Reglas de integridad y fixtures

- Todo `ownerUserId`, `clientUserId`, `agentId` y `skillId` de referencia debe existir en el dataset inicial.
- Los valores de estado pertenecen a los enums documentados. Un agente activo/fallando debe estar habilitado; inactivo debe estar deshabilitado.
- Un agente fallando tiene al menos un Error/Crítico sin resolver. Ningún agente activo tiene Error/Crítico sin resolver.
- Precio de Skill en contrato es snapshot, no se recalcula con el catálogo actual. El total de contrato y cada pago deben cuadrar con su desglose.
- Incluir como mínimo 4 usuarios (al menos uno por plan y varios estados), 5 agentes (con los tres estados), 4 Skills (web, documentos, calendario y datos), 4 contratos (activos e históricos; descuento y sin descuento; al menos un contrato con varias Skills) y 5 logs (todas las severidades, varios resueltos y al menos un error no resuelto vinculado a agente fallando).
- Incluir pagos con fechas en la semana actual y en el mes actual para poder visualizar métricas; no codificar fechas que contradigan la fecha del sistema sin etiquetar el periodo fixture. Crear fechas seed relativas al día actual para mantener útiles las métricas.
- Eliminar es soft delete/archivo en estado local. No usar cascada destructiva: contratos y logs conservan snapshots/referencias visibles y muestran «Registro eliminado/archivado» si el elemento relacionado ya no figura en su catálogo.

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
- **Resolución de error:** marcar resuelto una vez, registrar `resolvedAt`, refrescar estado de agente, permitir ver detalle posterior y dar toast; no borrar ni modificar traza.
- **Feedback:** toast de éxito/error con texto específico; duración 5 s, cierre manual, acción Deshacer cuando corresponda. Anunciar con región `aria-live`; no tapar controles ni contenido crítico.
- **Estados vacíos:** mensajes distintos para catálogo sin registros, filtro sin resultados (si se implementa filtro), y tabla vacía tras eliminación; permitir quitar filtro/restaurar elemento cuando aplique.
- **Cargas/errores:** al ser datos locales no mostrar skeleton artificial ni estado de red. Errores de cálculo/datos inválidos deben ser visibles y no reemplazarse silenciosamente por cero.

## 18. Diseño responsive

Breakpoints de referencia: móvil `<640 px`, tablet `640–1023 px`, escritorio `>=1024 px`; aplicar según espacio real, no solo dispositivo.

- **Escritorio:** sidebar persistente, tabla completa, métricas en 4 columnas, modales centrados con ancho máximo aproximado 720 px.
- **Tablet:** sidebar colapsable o drawer, métricas en 2 columnas, tabla permite scroll horizontal limitado con primera columna identificable; modales ocupan hasta 90% del ancho.
- **Móvil:** navegación drawer; métricas en 1 columna o 2 si el ancho lo permite sin comprimir valores; tablas como listas de filas con etiquetas de campo o scroll horizontal claramente señalado, nunca ocultar acciones/datos esenciales; acciones agrupadas en menú; modales casi a pantalla completa con scroll interno, botones táctiles de al menos 44x44 px.
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
- Mantener tecnologías compatibles con la plantilla; no añadir dependencias de UI sin justificar. Tailwind v4 por CDN es recomendación, no dependencia actualmente presente; aplicar `dark:` si se adopta para cumplir los temas requeridos.
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
- No hay búsqueda/paginación requeridas por el briefing. Si el dataset seed cabe en una pantalla desplazable, no añadir controles innecesarios.
- No se especifica backend existente de AgentHub en el repositorio. La especificación no promete integración.

## 23. Criterios de aceptación

- Están disponibles las seis secciones mediante navegación consistente y se identifica la sección activa.
- Dashboard presenta las cuatro métricas con reglas calculables y actividad semanal con estado vacío.
- Usuarios muestra columnas requeridas; detalle enseña registro completo y cierra por botón/backdrop/Escape; eliminar confirma y simula sin borrar relaciones históricas.
- Agentes muestran propietario, estado y Skills contraídas inicialmente; expandir/contraer es accesible y animado; Configurar muestra prompt completo; eliminar confirma y actualiza conteos.
- Skills explica el concepto, presenta catálogo ficticio, cantidad de agentes, detalle y eliminación conservando snapshots.
- Contratos activos e históricos muestran datos requeridos; detalle incluye duración cuando calculable, Skills/precios y desglose cuya suma coincide con total.
- Log muestra timestamp, agente, tipo, descripción, gravedad textual/cromática y acciones; detalle muestra stack trace y resolución; resolver actualiza estado derivado sin borrar el log.
- Menús cierran por clic exterior/Escape/selección; modales gestionan backdrop, foco y cierre; confirmaciones, toast, undo y estados vacíos tienen resultados definidos.
- Claro y oscuro cubren todos los componentes y usan `dark:` si Tailwind forma parte de la implementación.
- Diseño funciona en escritorio, tablet y móvil sin ocultar información/acciones esenciales.
- Fixtures respetan referencias, estados, importes y fechas; las interacciones no requieren red ni sobreviven a recarga, excepto la preferencia de tema si se persiste.
- Solo se incorporan dependencias si están justificadas y se identifica claramente cuáles son recomendaciones frente a tecnologías existentes.

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
- Tailwind v4 por CDN es una recomendación documentada, no una dependencia detectada; requiere conectividad al CDN. Debe confirmarse en implementación si se acepta ese requisito externo.
- No se han definido requisitos de despliegue, navegadores corporativos, localización distinta de español/USD, impuestos, descuentos comerciales reales ni reglas de facturación por ciclo.
- Los errores y system prompts son demostrativos y no deben incluir información sensible.
