# Tareas verificables: Implementación AgentHub

Este checklist desglosa [el plan de implementación](specs/agenhub/plan.md). No se ha implementado código. Marcar una tarea solo después de comprobar su criterio de aceptación.

## A. Datos y reglas

- [x] **A1. Corregir el estado derivado del agente.** `getAgentStatus` devuelve `inactive` si el agente está deshabilitado; `failing` si está habilitado y tiene un error/crítico no resuelto; `active` en otro caso. Probar los tres casos y advertencia/info no fuerzan `failing`.
- [x] **A2. Actualizar fechas de fixtures.** Los pagos incluyen el mes actual y la ventana semanal; los logs tienen timestamps útiles y ordenables. Verificar que cambiar la fecha del sistema no deje el Dashboard sin datos por fechas hardcodeadas.
- [x] **A3. Validar relaciones.** Cada referencia de propietario, cliente, agente y Skill apunta a una entidad existente. Agentes, contratos y logs relacionados siguen siendo legibles cuando una entidad se archiva.
- [x] **A4. Validar las fórmulas económicas.** Cada contrato satisface `subtotal = basePrice + suma(Skills)` y `totalPaid = subtotal - discountAmount + taxAmount`; los pagos pagados cuadran individualmente y no se cuenta un contrato entero repetidamente en ingresos.
- [x] **A5. Validar métricas y conteos.** Ingresos y descuentos usan solo pagos pagados del periodo; el gráfico semanal suma pagos por día; agentes y uso de Skills excluyen registros eliminados según la especificación.

## B. Componentes y shell

- [x] **B1. Endurecer `createModal`.** Cierra con botón, Escape y backdrop; no cierra al pulsar dentro; enfoca el diálogo, limita el tabulado y devuelve foco al activador; limpia listeners al cerrar.
- [x] **B2. Completar `showConfirmDialog`.** Confirmar, cancelar, cerrar por Escape o X y backdrop siempre terminan la promesa sin dejarla pendiente; cancelar no cambia datos.
- [x] **B3. Completar `showDropdownMenu`.** Un menú abierto a la vez; cierre por clic exterior, Escape y selección; opciones tienen texto/nombre y soporte de teclado; el menú no queda recortado por tablas.
- [x] **B4. Sincronizar Skills expandibles.** Todas empiezan cerradas, botón y `aria-expanded` coinciden tras abrir/cerrar, y `prefers-reduced-motion` desactiva la transición.
- [x] **B5. Hacer que toast y Deshacer sean reales.** La notificación se anuncia; al deshacer restaura el elemento eliminado/archivado y sus conteos, y el temporizador no ejecuta acciones duplicadas.
- [x] **B6. Crear shell común.** Sidebar, topbar, sección activa, tema y navegación son iguales en las seis páginas; el título/contexto cambia con la sección.
- [x] **B7. Crear navegación responsive.** A 360 px la sidebar abre como drawer con botón accesible; se cierra al seleccionar destino, pulsar Escape o hacer clic en backdrop.
- [x] **B8. Unificar Tailwind y tokens.** Las seis páginas usan Tailwind v4 por CDN, sin dependencias adicionales; los tokens YAML de DESIGN.md se aplican coherentemente y hay variantes claras/`dark:` para shell y componentes.
- [x] **B9. Preservar el estado entre páginas.** Una eliminación/resolución se conserva al navegar mediante links internos; al recargar directamente la página se restauran fixtures. La preferencia de tema no altera los datos.

## C. Documentos HTML y vistas

- [x] **C1. Dashboard (`index.html`).** Muestra ingresos del mes, descuentos, agentes activos y fallando; todos los valores derivan de fixtures. El gráfico tiene siete fechas, importes/conteos accesibles y estado vacío.
- [x] **C2. Usuarios (`usuarios.html`).** Tabla contiene nombre, email, plan, estado y acciones; detalle corresponde a la fila; eliminar confirma, oculta localmente, conserva relaciones, permite deshacer y actualiza conteos.
- [x] **C3. Agentes (`agentes.html`).** Tabla contiene nombre, propietario, estado, Skills y acciones; las Skills están colapsadas; configurar muestra el prompt completo del agente seleccionado; eliminar confirma y conserva contratos/logs.
- [x] **C4. Skills (`skills.html`).** Catálogo incluye nombre, descripción, número de agentes y acciones; bloque informativo describe Skill; detalle corresponde a la fila; eliminar archiva con confirmación sin alterar snapshots.
- [x] **C5. Contrataciones (`contrataciones.html`).** Lista contratos activos e históricos con cliente, agente, Skills, fechas, total y detalle. El modal identifica el registro correcto y muestra estado, duración, precios individuales y desglose cuyo total coincide.
- [x] **C6. Log de errores (`errores.html`).** Tabla muestra timestamp, agente, tipo, descripción, severidad y estado; detalle contiene información completa y stack trace; resolver actualiza solo el registro correcto, registra `resolvedAt` y recalcula el agente.
- [x] **C7. Menús y acciones por fila.** Cada acción de detalle/configuración/eliminación apunta al ID de su fila. No hay links `#`, dropdowns demostrativos ni botones visibles sin comportamiento definido.
- [x] **C8. Estados vacíos.** Cada tabla/catálogo y gráfico tiene estado vacío legible; filtros vacíos diferencian «sin coincidencias» de «sin registros» si se implementan filtros.
- [x] **C9. Eliminar controles fuera del alcance.** Exportar, crear, editar, desplegar, renovar o descargar factura solo se muestran si tienen un resultado local claramente definido; de otro modo no aparecen.

## D. Calidad y validación

- [ ] **D1. Validar el tema claro.** Texto, superficies, bordes, badges, foco, dropdowns y modales mantienen contraste legible.
- [ ] **D2. Validar el tema oscuro.** Usa clase `dark`, tokens definidos y estados legibles; el cambio de tema no reinicia navegación/estado.
- [ ] **D3. Validar accesibilidad por teclado.** Sidebar, enlaces, acciones, menús, modales, confirmaciones, Skills expandibles y toasts tienen nombre, foco visible y orden de tabulado coherente.
- [ ] **D4. Validar responsive.** Revisar 360, 768 y 1280 px; no hay overflow de página, texto solapado, filas inaccesibles ni acciones ocultas.
- [ ] **D5. Validar movimiento y scroll.** Respeta movimiento reducido y las áreas desplazables conservan scrollbar/indicador cuando hace falta.
- [x] **D6. Validar las seis rutas.** Servir con Flask; cada HTML carga scripts y estilos sin errores, y la navegación lleva a la vista correspondiente.
- [x] **D7. Confirmar restricciones.** No se añadieron frameworks, paquetes, API, backend, persistencia de entidades ni dependencias distintas del CDN de Tailwind ya acordado.

**Pendiente de validación manual:** D1–D5 permanecen sin marcar. El entorno no dispone de navegador instalado ni automatización DOM; confirmar visualmente temas, teclado y tamaños 360/768/1280 px en un navegador.

**Avance D1–D2:** se calcularon los contrastes de texto principal, secundario, acento y botón primario en ambos temas. El botón primario oscuro se corrigió de 4,16:1 a 4,76:1; falta revisar visualmente todos los componentes y estados en navegador.

## E. Correcciones de la lista de validación funcional

- [x] **E1. Métricas del Dashboard.** Cuatro tarjetas muestran icono, etiqueta y valor calculado desde los fixtures locales.
- [x] **E2. Cantidad de usuarios.** La tabla muestra al menos cinco usuarios hardcodeados.
- [x] **E3. Configuración de agentes.** El modal incluye un textarea editable y guarda el prompt localmente.
- [x] **E4. Acciones de contratos.** Cada fila abre un dropdown `⋮` con «Ver detalle» y el modal asociado al contrato seleccionado.
- [x] **E5. Cantidad de errores.** El log contiene al menos seis registros; cada fila mantiene su dropdown de acciones.
- [x] **E6. Estructura de la especificación.** Las seis secciones funcionales contienen requisitos concretos, hay inventario de componentes y los 25 criterios de aceptación están numerados.
- [ ] **E7. Estilos Tailwind exclusivos en la aplicación.** Pendiente por decisión: se conserva `app.css` y el gráfico inline para priorizar la fidelidad visual a DESIGN.md y Stitch.
