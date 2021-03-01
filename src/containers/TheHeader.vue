<template>
<CHeader fixed with-subheader light>
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
        <!-- <CHeaderNavItem class="px-3">
            <CHeaderNavLink to="/dashboard">
                Dashboard
            </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
            <CHeaderNavLink to="/users" exact>
                Users
            </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
            <CHeaderNavLink>
                Settings
            </CHeaderNavLink>
        </CHeaderNavItem> -->
    </CHeaderNav>
    <CHeaderNav class="mr-2" >

  
                <div class="d-flex flex-column user-names" v-if="authenticated" >
                    <div><strong class="m-0">{{ usuario.nombres }} </strong></div>
                    <div><small>{{usuario.rol}}</small></div>

                </div>
       

        <!-- <CHeaderNavItem class="d-md-down-none mx-2">
            <CHeaderNavLink>
                <CIcon name="cil-bell" /> 
                <p></p>
            </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="d-md-down-none mx-2">
            <CHeaderNavLink>
                <CIcon name="cil-list" />
            </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="d-md-down-none mx-2">
            <CHeaderNavLink>
                <CIcon name="cil-envelope-open" />
            </CHeaderNavLink>
        </CHeaderNavItem> -->
        <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <!-- <CSubheader class="px-3">
        <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader> -->
</CHeader>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
    name: 'TheHeader',
    data() {
        return {
            email: '',
            // nombres:'',
            namejob: ''
        }
    },
    components: {
        TheHeaderDropdownAccnt
    },
    methods: {
        ...mapActions({
            signOutAction: 'auth/signOut'
        }),
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            usuario: 'auth/user'
        })
    },
}
</script>
