# Tareas Escolares vr.2

Una breve descripción de lo que hace tu proyecto. 

---

## Requisitos del Entorno (Backend)

Para que cualquier desarrollador pueda replicar y ejecutar este proyecto en su propio equipo local,
es necesario contar con las siguientes herramientas, librerías y tecnologías. 

| Herramienta / Tecnología | Versión | Descripción / Uso en el proyecto |
| :--- | :---: | :--- |
| **Node.js** | `v24.13.0` | Entorno de ejecución para levantar el servidor. |
| **PostgreSQL** | `18.1` | Sistema de gestión de base de datos relacional principal. |
| **Git Bash** | `11.6.2` | Terminal de comandos para la gestión del control de versiones. |
| **Nodemon** | *No especificada* | Dependencia de desarrollo para reiniciar el servidor automáticamente. |
| **Postman** | *la ultima* | Cliente para realizar pruebas y consumo de la API. |
| **Nano** | *la ultima* | Editor de texto ligero para la terminal. |
| **GitHub** | *pues la ultima* | Alojamiento del repositorio y trabajo colaborativo. |

*nota* Asegúrate de instalar las dependencias ejecutando `npm install` antes de levantar el servidor.

---

##Endpoints de la API

A continuación, se describen las rutas disponibles en el backend para interactuar con el sistema:

### Autenticación

| Endpoint              | Método | Descripción                              |
|-----------------------|--------|------------------------------------------|
| `/api/auth/register`  | POST   | Registrar un nuevo usuario               |
| `/api/auth/login`     | POST   | Iniciar sesión y obtener token JWT       |

### Periodos

| Endpoint               | Método | Descripción                                      |
|------------------------|--------|--------------------------------------------------|
| `/api/periodos`        | POST   | Crear un nuevo periodo académico                 |
| `/api/periodos`        | GET    | Listar todos los periodos del usuario autenticado|
| `/api/periodos/:id`    | GET    | Obtener los detalles de un periodo específico    |
| `/api/periodos/:id`    | PUT    | Actualizar un periodo existente                  |
| `/api/periodos/:id`    | DELETE | Eliminar un periodo                              |

### Materias

| Endpoint                        | Método | Descripción                                           |
|---------------------------------|--------|-------------------------------------------------------|
| `/api/materias`                 | POST   | Crear una nueva materia                               |
| `/api/materias`                 | GET    | Listar todas las materias del usuario autenticado     |
| `/api/materias/:id_periodo`     | GET    | Listar materias asociadas a un periodo específico     |
| `/api/materias/detalle/:id`     | GET    | Obtener el detalle completo de una materia            |
| `/api/materias/:id`             | PUT    | Actualizar una materia                                |
| `/api/materias/:id`             | DELETE | Eliminar una materia                                  |

### Horarios

| Endpoint                               | Método | Descripción                                          |
|----------------------------------------|--------|------------------------------------------------------|
| `/api/horarios`                        | POST   | Crear un nuevo horario para una materia              |
| `/api/horarios/materia/:id_materia`    | GET    | Obtener todos los horarios de una materia específica |
| `/api/horarios`                        | GET    | Obtener el horario completo del usuario              |
| `/api/horarios/:id`                    | PUT    | Actualizar un horario existente                      |
| `/api/horarios/:id`                    | DELETE | Eliminar un horario                                  |

### Tareas

| Endpoint                               | Método | Descripción                                                  |
|----------------------------------------|--------|--------------------------------------------------------------|
| `/api/tareas`                          | POST   | Crear una nueva tarea                                        |
| `/api/tareas`                          | GET    | Listar todas las tareas del usuario                          |
| `/api/tareas/:id`                      | GET    | Obtener el detalle de una tarea específica                   |
| `/api/tareas/:id`                      | PUT    | Actualizar una tarea                                         |
| `/api/tareas/:id`                      | DELETE | Eliminar una tarea                                           |
| `/api/tareas/:id/completar`            | PATCH  | Marcar una tarea como completada                             |
| `/api/tareas/estado/pendientes`        | GET    | Listar tareas pendientes (no completadas y no vencidas)      |
| `/api/tareas/estado/vencidas`          | GET    | Listar tareas vencidas (fecha límite pasada y no completadas)|
| `/api/tareas/estado/completadas`       | GET    | Listar tareas ya completadas                                 |

---

<br>

**Universidad Politécnica de Bacalar**  **Desarrollador:** [Fabian Hernandez Ceja]  
**Fecha:** 12 de marzo de 2026
