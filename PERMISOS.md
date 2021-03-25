# Modulos
- Usuarios
- Postgrados
- Materias
- Postgraduantes
- Roles
- Permisos
- Reportes
- Calificaciones
- Pagos
# Estructura de archivos (/modules)
Ejemplo: Modulo Usuarios
```
usuarios
├── components
│   └──...
├── services
│   └── UsuarioService.js
├── views
│   ├── UsuarioAdd.vue
│   ├── UsuarioDetail.vue
│   ├── UsaurioList.vue
│   └── UsuarioUpdate.vue
└── Usuarios.vue
```
## Descripcion
* components
  * Directorio donde se crean nuevos componentes personalizados para el modulo correspondiente, tales como: Modales, Formularios, Tablas, etc.
* services
  * Directorio destinado a ficheros Javascript, donde *UsuarioService.js*, almacena todas la funciones correspondientes al modulo, adoptando la siguiente estructura.
```javascript
    export default {
        methods: {
            UsuarioIndex() {
                //Retorna una lista con los usuarios registrados
            },
            UsuarioStore(data) {
                //Envia los datos a la API, para crear un nuevo registro
            },
            UsuarioShow(id) {
                //Retorna un objeto con la informacion del usuario correspondiente a la id enviada
            },
            UsuarioUpdate(id, data) {
                //Envia los datos modificados correspondiantes al id seleccionado.
            },
            UsuarioDestroy(id) {
                //Envia una peticion con la id seleccionada para eliminar el registro
            }
        }
    };
```
* views
  * Directorio destinado a los ficheros Vue, en los cuales se procesa los datos.
* Usuarios.vue
  * Fichero Vue, el cual contiene la etiqueta *< router-view >*  el cual gestiona las rutas pertenecientes a dicho modulo.

# Tipos de Usuario (Roles)

- SISTEMAS
  - Usuario que tiene acceso a todos los mudulos del sistema, incluyendo los permisos y los roles de usuario.

- ADMINISTRADOR
  - Usuario que se encarga de administrar los modulos de Usuarios, Materias, Postgrados, Postgraduantes, Pagos y Calificaciones

- DOCEMTE
  - Usuario que tendra acceso a los modulos de calificaciones, lista de postgrados y materias en las cuales regenta la asignatura.

# Rutas y Roles

La estructura de las rutas estan organizadas de la siguiente manera:
```javascript
{
    path: "/usuarios",
    component: UsuariosContainer,
    children: [
        {
            path: "",
            name: "Usuarios",
            component: UsuarioList,
            meta: { title: "Lista de usuarios" },
            permissions: ["Sistemas","Administrador"]

        },
        {
            path: "/usuarios/add",
            name: "usuarios-add",
            component: UsuarioAdd,
            meta: { title: "Agregar usuario" },
            permissions: ["Sistemas"]
        },
        {
            path: "/usuarios/detail/:idUsuario",
            name: "usuarios-detail",
            component: UsuarioDetail,
            meta: { title: "Detalle usuario" },
            permissions: ["Sistemas"]
        },
        {
            path: "/usuarios/update/:idUsuario",
            name: "usuarios-update",
            component: UsuarioUpdate,
            meta: { title: "Editar de usuarios" },
            permissions: ["Sistemas"]
        }
    ]
},
```
Para agregar los permisos se agregara el tributo *permissions*, con un array que contendra los roles designados al usuario logeado.
```javascript
permissions: ["Sistemas","Docente",...]
```

# Roles para cada modulo
* ROL-SISTEMAS 
  - Todos los modulos *

* ROL-ADMINISTRADOR
  - Usuarios CRUD
  - Postgrados CRUD
  - Materias CRUD
  - Postgraduantes CRUD
  - Lista Calificaciones
  - Pagos CRUD
  - Reportes
    - Calificaciones por Asignatura
    - Calificaciones por Postgraduante
    - Pagos por curso de postgrado
    - Pagos por Postgraduante
* ROL-DOCENTE
  - Calificaciones CRUD
  - Lista Postgraduantes
  - Lista Postgrados
  - Lista Materias
  - Reportes
    - Calificaciones por Asignatura
    - Calificaciones por Postgraduante

# Permisos para componentes
Los roles de los usuarios que ingresen al sistema se alamacenan en el ``Store`` de la aplicacion.
El acceso de los roles del usuario autenticado se lo realizara de la siguiente forma:
* GETTERS
```javascript
//Importamos la store 
import store from "@/store/";

//Obtenemos los roles mediante los getters de la Store
let roles = store.getters["auth/roles"];
```
* MAPGETTERS
```javascript
//Importamos el objeto mapGetters desde Vuex
import { mapGetters } from 'vuex'

export default {
// En una propiedad computada obtenemos los roles del usuario autenticado
  computed: {
      ...mapGetters({
          roles: 'auth/user'
      })
  },
}
```
Para la gestion de permisos en los diferentes componentes html, se hace uso de MIXINS propios de Vue.
```
src/mixins/rolesMixin.js
```
### Uso del Mixin
En cada componente que se dese proteger mediante los roles de usuario, agregar el metodo **can()**, en la directiva **v-if**, mismo metodo que recibira como parametros un array con los permisos permitidos para ese componente.
```html
<li v-if="can(`${['Permiso1','Permiso2',...]}`)">
    <button class="btn btn-primary">Funcion A</button>
</li>
```
