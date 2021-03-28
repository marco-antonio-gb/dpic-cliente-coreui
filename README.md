

# Modulos y funcionamiento
Para el correcto funcionamiento del sistema se recomienda seguir el siguiente order de tareas a realizar.
 1. REGISTRAR USUARIOS (DOCENTES)
    * Registrar un usuario con el rol de Docente 
 2. REGISTRAR CURSOS DE POSTGRADOS: Registrar el curso de postgrado que permitira registrar materias, pagos y postgraduantes.
    1. REGISTRAR MATERIAS
       * Registras una asignatura asignando un docente al momento de llenar el formulario
    2. REGISTRAR POSTGRADUANTES
       * Se registra al postgraduante incluyendo los pagos iniciales que realizara.
    3. REPORTES:
       1. Calificaciones por Asignatura y Personal
       2. Pagos por Curso de postgrado y Personal

# Descripcion de funciones
* GESTION DE USUARIOS
   * Lista de usuarios
   * Detalle usuario
   * Editar usuario + Roles
   * Actualizar contrasena
   * Registro nuevo usuario + Asignacion de roles
   * Eliminar usuario
   * Bloquear usuario [x]
* GETION DE PERMISOS
   * Lista de permisos
   * Registrar nuevo permiso
   * Editar informacion de permiso
   * Eliminar permiso
* GESTION DE ROLES
   * Lista de roles
   * Registrar nuevo rol + Asignacion de permisos
   * Detalle de Rol + Permisos asignados al Rol
   * Eliminar Rol
* GESTION DE POSTGRADOS
   * [opciones]: Registrar Postgraduante NUEVO o EXISTENTE
   * [opciones]: Registrar Materia + Docente
   * [opciones]: Detalle Pagos + Reporte
      * Lista de Postgraduantes
         * Detalle PAGOS + REPORTE
         * Detalle NOTAS + REPORTE
         * Registrar PAGOS
      * Lista de Asignatura/Docentes
         * Registrar NOTAS
         * Lista Inscritos + Calificaciones
         * Reporte CALIFICACIONES



#### Usage

``` bash
# clone the project 
$ git clone https://github.com/marco-antonio-gb/dpic-cliente-vuetify.git
 

# Install dependencies
$ cd dpic-cliente
$ npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

 

```

For a detailed explanation on how things work, check out the [Vue CLI Guide](https://cli.vuejs.org/guide/).

### Documentation

CoreUI tools documentation:

- Components documentation: [CoreUI Vue library](https://coreui.io/vue/docs)
- Styles documentation: [CoreUI styles](https://coreui.io/docs/3.0-beta/)
- Icons documentation: [CoreUI Icons](http://coreui.io/icons)

### Bugs and feature requests

Have a bug or a feature request? [Please open a new issue](https://github.com/coreui/coreui-free-vue-admin-template/issues).

### Contributing

Please read through our [contributing guidelines](https://github.com/coreui/coreui-free-vue-admin-template/blob/master/.github/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

### Versioning

For transparency into our release cycle and in striving to maintain backward compatibility,CoreUI Free Admin Template is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See [the Releases section of our project](https://github.com/coreui/coreui-free-vue-admin-template/releases) for changelogs for each release version.

### Our other products

CoreUI is built on top of Bootstrap 4 and supports popular frameworks.

## Support CoreUI Development

CoreUI is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by buying [PRO version](https://coreui.io/pro/).
