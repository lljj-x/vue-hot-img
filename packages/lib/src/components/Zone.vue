<template>
    <div
        v-drag-item
        :style="{top: zoneTop, left: zoneLeft, width: zoneWidth, height: zoneHeight}"
    >
        <ul
            v-change-size
            class="hz-m-box"
            :class="{
                'hz-z-hidden': tooSmall,
                'hz-m-hoverbox': !hideZone
            }"
        >
            <li
                class="hz-u-index"
                :title="`热区${index + 1}`"
            >
                {{ index + 1 }}
            </li>
            <li
                v-show="!hideZone"
                title="删除该热区"
                class="hz-u-close"
                @click.stop="delItem(index)"
            >
                <svg
                    class="hz-u-close-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1
            191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0
            0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                    />
                </svg>
            </li>
            <li
                class="hz-u-square hz-u-square-tl"
                data-pointer="dealTL"
            ></li>
            <li
                class="hz-u-square hz-u-square-tc"
                data-pointer="dealTC"
            ></li>
            <li
                class="hz-u-square hz-u-square-tr"
                data-pointer="dealTR"
            ></li>
            <li
                class="hz-u-square hz-u-square-cl"
                data-pointer="dealCL"
            ></li>
            <li
                class="hz-u-square hz-u-square-cr"
                data-pointer="dealCR"
            ></li>
            <li
                class="hz-u-square hz-u-square-bl"
                data-pointer="dealBL"
            ></li>
            <li
                class="hz-u-square hz-u-square-bc"
                data-pointer="dealBC"
            ></li>
            <li
                class="hz-u-square hz-u-square-br"
                data-pointer="dealBR"
            ></li>
        </ul>
    </div>
</template>

<script>
import changeSize from '../directives/changeSize';
import dragItem from '../directives/dragItem';

export default {
    name: 'Zone',
    directives: {
        changeSize,
        dragItem
    },
    props: {
        index: {
            type: [Number, String],
            default: ''
        },
        setting: {
            type: [Object],
            default: () => ({})
        }
    },
    data() {
        return {
            zoneTop: '',
            zoneLeft: '',
            zoneWidth: '',
            zoneHeight: '',
            hideZone: false,
            tooSmall: false
        };
    },
    watch: {
        setting: {
            handler(val) {
                this.setZoneInfo(val);
            },
            deep: true
        }
    },
    mounted() {
        this.setZoneInfo(this.setting);
    },
    methods: {
        setZoneInfo(val) {
            this.zoneTop = this.getZoneStyle(val.topPer);
            this.zoneLeft = this.getZoneStyle(val.leftPer);
            this.zoneWidth = this.getZoneStyle(val.widthPer);
            this.zoneHeight = this.getZoneStyle(val.heightPer);
            this.tooSmall = val.widthPer < 0.01 && val.heightPer < 0.01;
        },
        handlehideZone(isHide = true) {
            if (this.hideZone === isHide) {
                return;
            }

            this.hideZone = isHide;
        },
        changeInfo(info = {}) {
            const { index } = this;

            this.$emit('changeInfo', {
                info,
                index
            });
        },
        delItem(index) {
            this.$emit('delItem', index);
        },
        getZoneStyle(val) {
            return `${(val || 0) * 100}%`;
        }
    }
};
</script>
