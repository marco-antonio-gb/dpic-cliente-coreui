<template>
<CToaster position="bottom-right" :autohide="5000" v-if="show_toast">
    <CToast :show="show_toast" :color="color_toast">
        {{message_toast}}
    </CToast>
</CToaster>
</template>

<script>
export default {
    props: {
        show_toast: {
            type: Boolean,
            required: true,
            default:false
        },
        color_toast: {
            type: String,
            required: true,
            default:''
        },
        message_toast: {
            type: String,
            required: true,
            default:''
        }
    }
 

}
</script>
