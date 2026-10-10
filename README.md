# test-manager-library-3413974-tool

> **Prueba técnica · Ficha ADSO 3413974**
> Horario: de **9:15 a. m. a 3:00 p. m.** (15:00). Después, **feria de presentación** de cada proyecto.

Este repositorio guarda las **utilidades** de *Manager Library*: el sembrador de datos de demostración (T-21), que consume exclusivamente la API REST pública (`/api/v1`).

## Ejecución del Sembrador de Demostración (T-21)

El sembrador pobla la biblioteca con más de 40 libros, más de 10 socios, préstamos activos y al menos 3 préstamos vencidos para cumplir los requisitos de la feria:

```bash
# Con la API en ejecución en http://localhost:8000:
npm install # o usar Node.js 18+ nativo
node seeder.js
```

Variables de entorno configurables:
- `API_URL`: URL base de la API (por defecto `http://localhost:8000/api/v1`).
- `ADMIN_USERNAME`: Usuario administrador (por defecto `admin`).
- `ADMIN_PASSWORD`: Contraseña del administrador (por defecto `admin12345`).

## Instrucciones

Cada aprendiz debe **crear el fork** de los seis repositorios del proyecto y **resolver el proyecto
con el spec planteado**.

1. Hacer fork, a su cuenta de GitHub, de cada repositorio de la tabla del final.
2. Leer el spec en [`test-manager-library-3413974-docs`](https://github.com/code-sena/test-manager-library-3413974-docs).
   Se entrega en dos versiones: `spec-python/` y `spec-.net/`.
3. Desarrollar en los forks.

## El reto se desarrolla con React y PHP (Laravel)

El spec está escrito para Python y para .NET, pero el reto **no** se hace en esos lenguajes:

| Capa | Tecnología del reto |
|---|---|
| Frontend | React |
| Backend | PHP con Laravel |

Lo que el spec define sobre el negocio —historias, criterios de aceptación, reglas, contrato de la
API, modelo de datos— se respeta. Lo que define sobre la tecnología se traduce a React y Laravel.

## La prueba no consiste en escribir el código

El propósito principal es ver la **capacidad de desempeño con SDD** (*Spec-Driven Development*,
desarrollo guiado por especificación): cómo se lee, se interpreta y se aplica una especificación
para llevarla a un stack distinto. El código es el medio, no el fin.

## Feria de presentación

Al cerrar la prueba (3:00 p. m.) cada aprendiz **presenta su proyecto** al grupo: qué construyó del spec, qué dejó fuera y por qué,
y una demostración corta de lo que funciona (la aplicación y el sitio público). Lo que se presenta es lo que quedó **subido a los forks
antes de las 3:00 p. m.**: no se presenta nada que no esté en GitHub.

## Los seis repositorios

| Repositorio | Qué va ahí |
|---|---|
| [`test-manager-library-3413974-docs`](https://github.com/code-sena/test-manager-library-3413974-docs) | El spec: `spec-python/` y `spec-.net/` |
| [`test-manager-library-3413974-api`](https://github.com/code-sena/test-manager-library-3413974-api) | Backend en PHP (Laravel) |
| [`test-manager-library-3413974-app`](https://github.com/code-sena/test-manager-library-3413974-app) | Frontend en React |
| [`test-manager-library-3413974-page`](https://github.com/code-sena/test-manager-library-3413974-page) | Sitio público estático de presentación |
| [`test-manager-library-3413974-infra`](https://github.com/code-sena/test-manager-library-3413974-infra) | Contenedores, red, volúmenes y motor de base de datos vacío |
| [`test-manager-library-3413974-tool`](https://github.com/code-sena/test-manager-library-3413974-tool) | Utilidades: sembrador de datos de demostración |
