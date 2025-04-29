<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { layoutState, setActiveMenuItem, onMenuToggle } = useLayout();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);
const op = ref();
const isPopoverVisible = ref(false);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutState.activeMenuItem;

    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

watch(
    () => layoutState.activeMenuItem,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);

function itemClick(event, item) {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        onMenuToggle();
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value;

    setActiveMenuItem(foundItemKey);
}

function checkActiveRoute(item) {
    return route.path === item.to;
}

const toggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isPopoverVisible.value = !isPopoverVisible.value;
    op.value.toggle(event);
}

const onPopoverHide = () => {
    isPopoverVisible.value = false;
}
</script>

<template>
    <div>
        <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
            <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">{{ item.label }}</div>
            <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" @click="itemClick($event, item, index)" :class="item.class" :target="item.target" tabindex="0">
                <i :class="item.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{ item.label }}</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
            </a>
            <router-link v-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item, index)" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to">
                <!-- <i :class="item.icon" class="layout-menuitem-icon"></i> -->
                <span :class="{'layout-menuitem-text': item.label.length > 29}" class="text-[13.5px]">
                    {{ item.label.slice(0, 29) }}
                </span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
                <span 
                    :class="[
                        'layout-submenu-actions text-gray-900 hover:text-gray-500 dark:text-gray-300',
                        { 'actions-visible': isPopoverVisible || checkActiveRoute(item) }
                    ]"
                    v-tooltip.top="$t('form.label.options')"
                    @click.stop.prevent="toggle"
                >
                    ...
                </span>
            </router-link>
            <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
                <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                    <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false"></app-menu-item>
                </ul>
            </Transition>
        </li>

        <Popover ref="op" @hide="onPopoverHide">
            <ul>
                <li >
                    <Button class="w-full !justify-start" :label='$t("button.rename")' plain text icon="pi pi-fw pi-pencil" @click="onEdit" />
                </li>
                <li>
                    <Button class="w-full !justify-start" :label='$t("button.exclude")' plain text icon="pi pi-fw pi-trash" @click="onEdit" />
                </li>
            </ul>
        </Popover>
    </div>
</template>

<style lang="scss" scoped>
.layout-submenu-actions {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}
.router-link-active .layout-submenu-actions,
a:hover .layout-submenu-actions,
router-link:hover .layout-submenu-actions {
    opacity: 1;
}
.layout-submenu-actions:hover {
    transition: 0.2s;
}
.actions-visible {
    opacity: 1;
}
.layout-menu ul a {
    border-radius: 20px !important;
    margin-right: 5px;
}
.layout-menuitem-text {
    position: relative;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, black 93%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black 93%, transparent 100%);
}
</style>
