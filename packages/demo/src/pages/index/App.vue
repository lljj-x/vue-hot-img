<template>
    <div>
        <div :class="$style.box">
            <VueHotImg
                v-model="zones"
                :image="image"
                style="width: 550px;"
                @select-zone="onSelect"
            ></VueHotImg>
            <div
                :class="$style.form"
            >
                <el-form>
                    <el-form-item label="点击热区输入链接地址：">
                        <el-input
                            v-model="inputUrl"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div :class="$style.box">
            <div :class="$style.preview">
                <img
                    :src="image"
                    alt="cover"
                >
                <div
                    v-for="(zone, index) in zones"
                    :key="index"
                    :class="$style.zone"
                    :style="getStyle(zone)"
                >
                    <p>URL:</p>
                    <p
                        v-if="zone.extra"
                        style="word-break: break-all"
                    >
                        {{ zone.extra.url }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueHotImg from 'vue-hot-img';
import Vue from 'vue';

export default {
    name: 'App',
    components: {
        VueHotImg
    },
    data() {
        return {
            curZone: {},
            image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            zones: [{
                heightPer: 0.4374,
                leftPer: 0.1153,
                topPer: 0.238,
                widthPer: 0.2827,
                extra: {
                    url: 'https://github.com/OrangeXC'
                }
            }, {
                topPer: 0.0742,
                leftPer: 0.8171,
                widthPer: 0.1071,
                heightPer: 0.1689,
                extra: {
                    url: 'https://github.com/lljj-x/vue-hot-img'
                }
            }]
        };
    },
    computed: {
        inputUrl: {
            get() {
                if (this.curZone && this.curZone.extra) {
                    return this.curZone.extra?.url;
                }
                return '';
            },
            set(value) {
                Vue.set(this.curZone, 'extra', {
                    url: value
                });
            }
        }
    },
    methods: {
        onSelect(zone) {
            this.curZone = zone;
        },
        getStyle(opt) {
            const format = val => `${(val || 0) * 100}%`;
            return {
                width: format(opt.widthPer),
                height: format(opt.heightPer),
                top: format(opt.topPer),
                left: format(opt.leftPer),
            };
        }
    }
};
</script>

<style module>
.box {
    margin: 0 auto;
    padding: 10px;
    width: 1000px;
    background: #EFEFEF;
    border-radius: 4px;
    display: flex;
    &+.box {
        margin-top: 5px;
    }
}
.form {
    flex: 1;
    margin-left: 20px;
}
.preview {
    position: relative;
    width: 800px;
    &>img {
        width: 100%;
    }
}
.zone {
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    color: #000000;
    padding: 5px;
    font-size: 12px;
    box-sizing: border-box;
}
</style>
