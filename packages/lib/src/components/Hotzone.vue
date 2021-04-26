<template>
    <div
        ref="content"
        class="hz-m-wrap"
        @click.native="onSelect(null)"
    >
        <img
            :src="image"
            class="hz-u-img"
            alt=""
        />
        <div
            v-add-item
            class="hz-m-area"
        >
            <zone
                v-for="(zone, index) in zones"
                :key="index"
                class="hz-m-item"
                :class="{
                    'hz-m-item-selected': zone.selected
                }"
                :index="index"
                :setting="zone"
                @delItem="removeItem($event)"
                @changeInfo="changeInfo($event)"
                @click.native="onSelect(zone)"
            ></zone>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Zone from './Zone';
import addItem from '../directives/addItem';

export default {
    name: 'HotZone',
    directives: {
        addItem
    },
    components: {
        Zone
    },
    props: {
        image: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            default: () => []
        },
        max: {
            type: Number,
            default: Infinity
        }
    },
    computed: {
        zones: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    methods: {
        findCurSelect() {
            return this.value.find(item => item.selected);
        },
        onSelect(zone) {
            const curZone = this.findCurSelect();
            if (curZone) curZone.selected = 0;

            if (zone) {
                Vue.set(zone, 'selected', 1);
            }
            this.$emit('select-zone', zone);
        },
        changeInfo(res) {
            const { info, index } = res;

            this.changeItem(info, index);
        },
        addItem(setting) {
            this.zones = [
                ...this.zones,
                {
                    ...setting,
                    extra: {}
                }
            ];
            this.hasChange();
            this.$emit('add', setting);
            this.onSelect(setting);
        },
        eraseItem(index = this.zones.length - 1) {
            this.removeItem(index);
            this.$emit('erase', index);
        },
        isOverRange() {
            const { max, zones } = this;

            return max && zones.length > max;
        },
        overRange() {
            const index = this.zones.length - 1;

            this.removeItem(index);
            this.$emit('overRange', index);
        },
        removeItem(index = this.zones.length - 1) {
            const curZone = this.zones[index];
            // 移除当前选中的
            if (curZone === this.findCurSelect()) {
                this.onSelect(null);
            }

            //  移除当前项
            this.zones.splice(index, 1);
            this.hasChange();
            this.$emit('remove', curZone, index);
        },
        changeItem(info, index = this.zones.length - 1) {
            Object.assign(this.zones[index], info);
            this.hasChange();
            this.onSelect(this.zones[index]);
        },
        hasChange() {
            this.$emit('change', this.zones);
        }
    }
};
</script>
