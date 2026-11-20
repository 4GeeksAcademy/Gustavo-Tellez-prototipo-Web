# Plan de implementación AgentHub

**Estado:** planificación; no se ha implementado código.  
**Alcance:** convertir el shell y Dashboard existentes en una aplicación de seis interfaces HTML independientes, con JavaScript vanilla y Tailwind CSS por CDN, sin frameworks ni dependencias adicionales.

## Decisiones acordadas

- `index.html` será el Dashboard. Las otras páginas serán `usuarios.html`, `agentes.html`, `skills.html`, `contrataciones.html` y `errores.html`, en la raíz del proyecto.
- Cada página tendrá un shell compartido, una sección activa identificable y navegación mediante enlaces normales entre documentos. La lógica común permanecerá en JavaScript compartido.
- La navegación interna preservará temporalmente los cambios de estado simulado; una recarga directa devolverá los fixtures al estado inicial. La preferencia de tema podrá conservarse aparte.
- Se usará Tailwind v4 por CDN y JavaScript vanilla, sin paquetes ni frameworks; `app.css` se conserva como capa visual para respetar DESIGN.md y Stitch.
- El bloque YAML de [DESIGN.md](../../DESIGN.md) será la fuente canónica de tokens visuales. Se mantendrán sus superficies, tipografía y densidad; se definirá su variante clara y se moderarán gradientes, halos, animaciones y ocultamiento de scrollbars de Stitch.
- [specs/agenthub/specs.md](../agenthub/specs.md) es la fuente de requisitos funcionales. Sus apartados sobre el estado del repositorio están desactualizados; no se editará en este alcance.
- Los HTML de Stitch aportan composición y patrones, pero no se copiarán sus datos ni los handlers incompletos.

## Fases

### 1. Corregir modelo y cálculos

1. Corregir `getAgentStatus` y acordar una única regla entre `enabled`, severidad y logs no resueltos.
2. Hacer que pagos y logs de fixtures cubran el mes actual y los últimos siete días mediante fechas relativas.
3. Verificar relaciones entre entidades, estados de contrato, uso de Skills, totales pagados y descuentos.
4. Asegurar que métricas y conteos excluyan registros eliminados cuando corresponde, y que los registros históricos mantengan referencias legibles.

**Salida de fase:** helpers y fixtures proporcionan resultados coherentes para todas las vistas.

### 2. Componentes comunes y shell multipágina

5. Corregir `createModal`, `showConfirmDialog`, `showToast`, `showDropdownMenu` y `setupExpandableSkills`: teclado, clic fuera/backdrop, foco, retorno de foco, cierre limpio y deshacer real.
6. Crear shell compartido con sidebar, topbar, título y estado activo, toggle de tema y navegación móvil.
7. Convertir `index.html` en Dashboard y crear las otras cinco páginas HTML. Todas identificarán la vista y cargarán los scripts compartidos en orden consistente.
8. Añadir transferencia efímera de estado simulado al navegar entre páginas; las visitas directas sin snapshot inicializan fixtures.
9. Actualizar a Tailwind v4 CDN, consolidar la configuración una sola vez y definir los tokens oscuros/claro a partir de DESIGN.md.

**Salida de fase:** seis documentos abren y navegan con el mismo shell responsive, tema y estado compartido.

### 3. Implementar interfaces

10. **Dashboard:** cuatro métricas requeridas y actividad semanal, todo derivado de pagos/agentes; eliminar porcentajes y claims de infraestructura sin fuente.
11. **Usuarios:** tabla, menú contextual por fila, detalle correcto, confirmación, soft-delete, toast y Deshacer; conservar historial relacionado.
12. **Agentes:** tabla, propietario, estado derivado, Skills contraídas por defecto, configuración del agente seleccionado y eliminación confirmada.
13. **Skills:** bloque informativo, catálogo, conteos derivados, detalle seleccionado y archivado reversible sin alterar snapshots contractuales.
14. **Contrataciones:** contratos activos e históricos, modal contextual, duración y precios snapshot con desglose que cuadre. Omitir acciones fuera de alcance si no se implementan.
15. **Errores:** lista de logs, detalle con contexto y stack trace, resolución idempotente y actualización del estado derivado del agente.

**Salida de fase:** las seis vistas comparten datos, controles y estados vacíos, sin acciones decorativas sin comportamiento.

### 4. Validar

16. Verificar navegación, preservación de cambios entre páginas y reinicio tras recarga directa.
17. Probar modales, dropdowns, teclado, foco, confirmación/cancelación, Deshacer, acordeones y resolución de errores.
18. Recalcular métricas y totales de fixtures; verificar relaciones, estados y snapshots.
19. Revisar temas claro/oscuro, movimiento reducido, accesibilidad y overflow a 360, 768 y 1280 px.
20. Servir las páginas con Flask existente; no instalar paquetes ni añadir backend/API.

## Dependencias entre tareas

La fase 1 precede a las vistas porque el Dashboard, filtros y relaciones dependen de reglas y fixtures correctos. La fase 2 precede a las seis páginas para que estas consuman componentes y shell estables. Las vistas de Usuarios, Agentes y Skills pueden desarrollarse en paralelo después de la fase 2; Contrataciones y Errores también pueden avanzar en paralelo tras validar sus helpers. La verificación final depende de todas las vistas.

## Archivos previstos

**Existentes que se modificarían:** `index.html`, `main.js`, `data.js`, `utils.js` y `components.js`; `app.css` permanece como hoja visual compartida.  
**Nuevos HTML:** `usuarios.html`, `agentes.html`, `skills.html`, `contrataciones.html` y `errores.html`. `index.html` representa la sexta vista.  
**Solo referencia, no modificar:** `specs/agenthub/specs.md`, `DESIGN.md`, `stitch-reference/` y `server.py`.

## Criterio de cierre

Las seis vistas abren, navegan y representan datos compartidos coherentes; acciones requeridas tienen resultados simulados verificables; tema, modales, menús y responsive funcionan; y no se añadieron dependencias, framework, backend ni API.
