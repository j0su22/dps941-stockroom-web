# STOCKROOM

Sistema web para la gestión y trazabilidad de inventario de **Grupo Dtech**, desarrollado como proyecto de la asignatura **Diseño y Programación de Software Multiplataforma (DPS941)**.

STOCKROOM busca centralizar el control de equipos, materiales, movimientos y proyectos, permitiendo conocer existencias, ubicaciones y el historial de los recursos utilizados por la organización.

## Integrantes

| Carnet | Estudiante |
| --- | --- |
| CA242249 | Josué David Cortez Aguilar |
| DE232708 | Rogers Daniel Deleón Escobar |

## Problema

Grupo Dtech administra materiales, equipos tecnológicos y activos utilizados en diferentes proyectos.

La falta de una plataforma centralizada dificulta conocer de forma rápida:

- Existencias disponibles.
- Ubicación actual de los equipos.
- Equipos asignados a proyectos.
- Entradas, salidas, devoluciones y traslados.
- Historial y trazabilidad de los recursos.
- Equipos con existencias por debajo del mínimo.

STOCKROOM propone centralizar esta información mediante una solución web que posteriormente pueda integrarse con una aplicación móvil para personal técnico.

## Tecnologías utilizadas

- React
- Next.js
- TypeScript
- Tailwind CSS
- Context API
- API REST
- JSON Server
- Git
- GitHub
- Vercel
- Figma

## Funcionalidades actuales

### Panel general

Dashboard con información resumida del sistema, indicadores, movimientos y alertas.

### Inventario

- Consulta de equipos y materiales.
- Búsqueda y filtrado.
- Visualización de existencias.
- Identificación de equipos con stock bajo.
- Consulta del estado y ubicación del equipo.
- Acceso al detalle individual.

### Detalle y trazabilidad

Permite consultar información como:

- Código interno.
- Marca y modelo.
- Número de serie.
- Dirección MAC.
- Ubicación.
- Responsable.
- Proveedor.
- Garantía.
- Existencias.
- Stock mínimo.
- Valor unitario.
- Historial de movimientos.

### Movimientos

Registro y consulta de:

- Entradas.
- Salidas.
- Devoluciones.
- Traslados.

El módulo incorpora reglas de negocio para actualizar las existencias y ubicación de los equipos según el movimiento realizado.

También incluye validaciones como:

- Cantidad mayor que cero.
- Prevención de salidas con stock insuficiente.
- Destino obligatorio cuando corresponde.
- Prevención de traslados hacia la misma ubicación actual.
- Actualización automática del historial de trazabilidad.

### Proyectos

- Listado de proyectos.
- Búsqueda y filtros.
- Consulta del estado y avance.
- Detalle del proyecto.
- Visualización de equipos asignados.
- Información del equipo de trabajo.

### Reportes

Interfaz para consulta de indicadores y reportes relacionados con inventario, proyectos y movimientos.

### Usuarios y permisos

Interfaz para consulta de usuarios, roles y permisos asociados al sistema.

> Algunos módulos se encuentran en proceso de integración completa con la API REST.

## Arquitectura

El proyecto busca mantener separación de responsabilidades entre interfaz, lógica y acceso a datos.

```text
src/
├── app/          # Rutas y páginas de Next.js
├── components/   # Componentes reutilizables de interfaz
├── context/      # Estado global y lógica compartida
├── data/         # Datos auxiliares y mocks temporales
├── hooks/        # Hooks personalizados
├── services/     # Comunicación con API REST
├── types/        # Interfaces y tipos TypeScript
└── utils/        # Funciones auxiliares
```

El flujo utilizado en los módulos integrados con REST sigue principalmente:

```text
Interfaz → Context/Lógica → Service → API REST → db.json
```

## API REST

Durante el avance web se utiliza **JSON Server** como API REST para persistir información durante el desarrollo.

Actualmente los módulos de inventario y movimientos utilizan endpoints REST.

Ejemplos:

```text
GET    /equipment
GET    /equipment/:id
PATCH  /equipment/:id

GET    /movements
POST   /movements
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/j0su22/dps941-stockroom-web
```

### 2. Entrar al proyecto

```bash
cd dps941-stockroom-web
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la API REST

En una terminal:

```bash
npx json-server db.json --port 3001
```

La API estará disponible en:

```text
http://localhost:3001
```

### 5. Ejecutar Next.js

En otra terminal:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

La ruta principal redirige al panel general del sistema.

## Variables de entorno

La aplicación utiliza la variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Si no se define, durante el desarrollo se utiliza `http://localhost:3001` como dirección predeterminada.

## Flujo de inventario

El sistema está diseñado alrededor del siguiente flujo operativo:

```text
Compra
   ↓
Ingreso a inventario
   ↓
Traslado
   ↓
Asignación a proyecto
   ↓
Entrega de material/equipo
   ↓
Instalación o devolución
   ↓
Histórico y trazabilidad
```

## Modelo de movimientos

Los movimientos modifican el estado del inventario de acuerdo con su tipo:

| Movimiento | Efecto |
| --- | --- |
| Entrada | Incrementa existencias |
| Salida | Reduce existencias |
| Devolución | Incrementa existencias |
| Traslado | Modifica la ubicación |

Cada movimiento genera información que puede utilizarse para reconstruir la trazabilidad del equipo.

## Diseño UX/UI

Las interfaces fueron desarrolladas tomando como referencia los mockups elaborados en **Figma** durante la etapa de análisis y diseño.

La aplicación utiliza un layout común compuesto por:

- Sidebar de navegación.
- Header.
- Panel general.
- Inventario.
- Movimientos.
- Proyectos.
- Reportes.
- Usuarios y permisos.

## Control de versiones

El proyecto utiliza Git y GitHub para el trabajo colaborativo.

Flujo principal:

```text
feature/*
     ↓
development
     ↓
release
     ↓
main
```

Las funcionalidades se desarrollan inicialmente en ramas independientes y posteriormente se integran en las ramas correspondientes.

## Estado del proyecto

Proyecto actualmente en desarrollo para el avance web de DPS941.

Entre las tareas pendientes se encuentran la integración completa de los módulos restantes con la API REST, autenticación y autorización por roles, mejoras de validación y manejo de errores, y preparación del despliegue público.

## Despliegue

El despliegue web se realizaró mediante **Vercel**.

Enlace: [Stockroom Vercel WEB](https://dps941-stockroom-mjgtbl1ic-j0su22s-projects.vercel.app/dashboard)

## Proyecto académico

**Asignatura:** Diseño y Programación de Software Multiplataforma  
**Código:** DPS941  
**Proyecto:** STOCKROOM – Sistema de gestión de inventario para Grupo Dtech