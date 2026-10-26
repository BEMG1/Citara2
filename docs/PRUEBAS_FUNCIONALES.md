# FASE 3 – Pruebas funcionales de Citara

---

## 7. Formato de pruebas funcionales

Campos: ID, prueba realizada, funcionalidad evaluada, resultado esperado, resultado obtenido, estado, observaciones, evidencia.

> Las columnas **Resultado obtenido**, **Estado**, **Observaciones** y **Evidencia** se diligencian al ejecutar cada prueba en la aplicación (`npm run dev`).

| ID | Prueba realizada | Funcionalidad evaluada | Resultado esperado | Resultado obtenido | Estado | Observaciones | Evidencia |
|----|------------------|------------------------|--------------------|--------------------|--------|---------------|-----------|
| PF-01 | Escribir/pegar un título y párrafos en el editor, seleccionar formato **APA 7** y cambiar luego a **UPEL** o **IEEE**. | Motor de estilos (`StyleEngine`) y actualización dinámica de estilos | El editor aplica fuente, tamaño, interlineado, sangría y márgenes del formato elegido y se actualizan al cambiar de formato. | | Sí ☐ / No ☐ | | Captura del editor con cada formato |
| PF-02 | Cargar un `.docx` y ejecutar la verificación de cumplimiento con APA 7 (incluyendo una fuente no permitida, p. ej. Comic Sans). | Motor de cumplimiento (`ComplianceEngine`: fuentes, portada, encabezados, páginas, referencias) | Se muestra porcentaje de cumplimiento; las reglas incumplidas (ej. `apa7-font-allowed`) aparecen como *non-compliant* con su mensaje. | | Sí ☐ / No ☐ | | Captura del panel de cumplimiento |
| PF-03 | Insertar citas y referencias en el documento (APA 7, IEEE y UPEL) y generar la lista de referencias. | Formatos de citación y referencias (`citationFormats`, `referenceUtils`) | Las citas y la lista de referencias se generan con la estructura propia de cada norma, ordenadas correctamente. | | Sí ☐ / No ☐ | | Captura de citas y lista de referencias |
| PF-04 | Exportar un documento con títulos, listas y tablas a **Word** y a **PDF**. | Exportación (`docxExport`, `pdfExport`) | Los archivos se descargan conservando fuente, sangría, espaciado, títulos, listas, tablas y márgenes equivalentes al editor. | | Sí ☐ / No ☐ | | Archivos exportados y captura comparativa |
| PF-05 | Exportar dos documentos seguidos como (a) visitante anónimo, (b) usuario gratuito y (c) usuario premium. | Límite de generación (`rateLimit`, `user-profile-and-plans`) | (a) y (b) quedan bloqueados con el Toast del límite; (c) exporta sin restricciones. Tras el tiempo de espera se permite exportar. | | Sí ☐ / No ☐ | | Captura de los Toast de cada caso |

Criterios de estado: **Sí ☐** = el resultado obtenido coincide con el esperado; **No ☐** = existe diferencia (describir en observaciones).

---

## 8. Informe de pruebas funcionales

**Proyecto:** Citara – Formateador de documentos (APA 7, APA 6, IEEE, UPEL)
**Fecha de ejecución:** ____/____/______  **Responsable:** ______________________
**Entorno:** Navegador ____________  Versión ____  SO ____________

### 8.1 Resumen

| Total | Aprobadas | Fallidas | % de éxito |
|-------|-----------|----------|------------|
| 5 | __ | __ | __ % |

### 8.2 Detalle por prueba

#### PF-01 – Aplicación de formato en el editor
- **Descripción de la prueba:** Redactar texto y alternar entre APA 7, UPEL e IEEE.
- **Funcionalidad evaluada:** Motor de estilos y actualización dinámica.
- **Resultado esperado:** Estilos del formato aplicados y actualizados al cambiar de norma.
- **Resultado obtenido:** ________________________________
- **Fotografía / captura:** `evidencias/PF-01.png`
- **Estado final:** Aprobada ☐ / Fallida ☐
- **Observaciones:** ________________________________

#### PF-02 – Verificación de cumplimiento
- **Descripción de la prueba:** Analizar un `.docx` con una fuente no permitida contra APA 7.
- **Funcionalidad evaluada:** Motor de cumplimiento y reglas APA 7.
- **Resultado esperado:** Porcentaje de cumplimiento y reglas incumplidas detectadas con mensaje.
- **Resultado obtenido:** ________________________________
- **Fotografía / captura:** `evidencias/PF-02.png`
- **Estado final:** Aprobada ☐ / Fallida ☐
- **Observaciones:** ________________________________

#### PF-03 – Citas y referencias
- **Descripción de la prueba:** Insertar citas y generar referencias en APA 7, IEEE y UPEL.
- **Funcionalidad evaluada:** Formatos de citación y lista de referencias.
- **Resultado esperado:** Estructura correcta según la norma.
- **Resultado obtenido:** ________________________________
- **Fotografía / captura:** `evidencias/PF-03.png`
- **Estado final:** Aprobada ☐ / Fallida ☐
- **Observaciones:** ________________________________

#### PF-04 – Exportación a Word y PDF
- **Descripción de la prueba:** Exportar un documento con títulos, listas y tablas.
- **Funcionalidad evaluada:** Fidelidad de la exportación respecto al editor.
- **Resultado esperado:** Archivos con el formato conservado.
- **Resultado obtenido:** ________________________________
- **Fotografía / captura:** `evidencias/PF-04.png`
- **Estado final:** Aprobada ☐ / Fallida ☐
- **Observaciones:** ________________________________

#### PF-05 – Límites de generación por tipo de usuario
- **Descripción de la prueba:** Exportaciones consecutivas como anónimo, gratuito y premium.
- **Funcionalidad evaluada:** Rate limiting y planes de usuario.
- **Resultado esperado:** Bloqueo con Toast para anónimo/gratuito; sin límite para premium.
- **Resultado obtenido:** ________________________________
- **Fotografía / captura:** `evidencias/PF-05.png`
- **Estado final:** Aprobada ☐ / Fallida ☐
- **Observaciones:** ________________________________

### 8.3 Conclusiones
______________________________________________________________

### 8.4 Recomendaciones
______________________________________________________________
