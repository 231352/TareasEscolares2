# Taskora

Taskora es una agenda academica web para administrar periodos, materias, tareas y horarios desde un solo panel. El proyecto incluye backend con Express y PostgreSQL, autenticacion con JWT y una interfaz en `public/` con temas de color, resumen general, calendario y horario semanal.

## Funcionalidades

- Registro e inicio de sesion con token JWT.
- CRUD de periodos escolares.
- CRUD de materias asociadas a un periodo.
- CRUD de tareas asociadas a una materia.
- Marcado de tareas como entregadas.
- Listados de tareas pendientes, vencidas y completadas.
- Calendario mensual con tareas por fecha y tarjeta de detalle.
- Horario semanal por materia con bloques de color.
- Panel de resumen con metricas, mini calendario y agenda del dia.
- Selector de temas visuales: `light`, `indigo`, `emerald`, `sunset` y `rose`.
- Interfaz responsive con estilos que cambian segun el tema activo.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- JSON Web Token (`jsonwebtoken`)
- bcrypt
- dotenv
- nodemon
- HTML, CSS y JavaScript vanilla

## Estructura General

```text
backend/
|-- public/
|   |-- app.js
|   |-- index.html
|   `-- styles.css
|-- src/
|   |-- app.js
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |-- middlewares/
|   `-- routes/
|-- package.json
`-- README.md
```

## Requisitos

- Node.js instalado
- PostgreSQL disponible
- Variables de entorno configuradas en `.env`

## Instalacion

```bash
npm install
```

## Variables de Entorno

Crea un archivo `.env` con la configuracion de tu base de datos y tu clave JWT. Ajusta los nombres segun lo que usa tu proyecto en `src/config/db.js` y en el middleware de autenticacion.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_clave_secreta
```

## Ejecucion

Modo desarrollo:

```bash
npm run dev
```

Luego abre en el navegador:

```text
http://localhost:3000
```

## Interfaz Actual

La interfaz fue actualizada con estos cambios:

- Nuevo nombre visual de la app: `Taskora`.
- Encabezado principal mas horizontal para ocupar menos espacio.
- Encabezado superior adaptado al tema activo.
- Tarjetas del panel y detalle de tareas sincronizadas con el color elegido.
- Navegacion lateral por secciones dentro del dashboard.
- Vista de resumen con:
  - total de tareas
  - pendientes
  - completadas
  - vencidas
  - mini calendario
  - agenda del dia
- Vista de calendario mensual con seleccion de tarea.
- Vista de horario semanal por bloques.

## Endpoints

### Autenticacion

| Endpoint | Metodo | Descripcion |
| --- | --- | --- |
| `/api/auth/register` | `POST` | Registrar un nuevo usuario. |
| `/api/auth/login` | `POST` | Iniciar sesion y obtener token JWT. |

### Periodos

| Endpoint | Metodo | Descripcion |
| --- | --- | --- |
| `/api/periodos` | `POST` | Crear un periodo academico. |
| `/api/periodos` | `GET` | Listar periodos del usuario autenticado. |
| `/api/periodos/:id` | `GET` | Obtener un periodo especifico. |
| `/api/periodos/:id` | `PUT` | Actualizar un periodo. |
| `/api/periodos/:id` | `DELETE` | Eliminar un periodo. |

### Materias

| Endpoint | Metodo | Descripcion |
| --- | --- | --- |
| `/api/materias` | `POST` | Crear una materia. |
| `/api/materias` | `GET` | Listar materias del usuario autenticado. |
| `/api/materias/:id_periodo` | `GET` | Listar materias por periodo. |
| `/api/materias/detalle/:id` | `GET` | Obtener detalle de una materia. |
| `/api/materias/:id` | `PUT` | Actualizar una materia. |
| `/api/materias/:id` | `DELETE` | Eliminar una materia. |

### Tareas

| Endpoint | Metodo | Descripcion |
| --- | --- | --- |
| `/api/tareas` | `POST` | Crear una tarea. |
| `/api/tareas` | `GET` | Listar tareas del usuario autenticado. |
| `/api/tareas/:id` | `GET` | Obtener una tarea especifica. |
| `/api/tareas/:id` | `PUT` | Actualizar una tarea. |
| `/api/tareas/:id` | `DELETE` | Eliminar una tarea. |
| `/api/tareas/:id/completar` | `PATCH` | Marcar una tarea como completada. |
| `/api/tareas/estado/pendientes` | `GET` | Obtener tareas pendientes. |
| `/api/tareas/estado/vencidas` | `GET` | Obtener tareas vencidas. |
| `/api/tareas/estado/completadas` | `GET` | Obtener tareas completadas. |

### Horarios

| Endpoint | Metodo | Descripcion |
| --- | --- | --- |
| `/api/horarios` | `POST` | Crear un horario. |
| `/api/horarios` | `GET` | Listar horarios del usuario autenticado. |
| `/api/horarios/materia/:id_materia` | `GET` | Obtener horarios de una materia. |
| `/api/horarios/:id` | `PUT` | Actualizar un horario. |
| `/api/horarios/:id` | `DELETE` | Eliminar un horario. |

## Scripts Disponibles

| Script | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor con nodemon. |
| `npm test` | Script placeholder actual. |

## Notas

- La carpeta `public/` contiene la interfaz completa consumiendo la API del mismo servidor.
- El tema seleccionado se guarda en `localStorage`.
- El filtro de periodo afecta resumen, materias, tareas y horarios.
- No agregue pruebas automatizadas; el script `npm test` sigue siendo un placeholder.

## Autor

Universidad Politecnica de Bacalar  
Desarrollador: Fabian Hernandez Ceja
