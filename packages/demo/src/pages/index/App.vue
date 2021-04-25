<template>
    <div :class="$style.box">
        <VueHotImg
            v-model="zones"
            style="width: 700px;"
            :image="image"
            @select-zone="onSelect"
        ></VueHotImg>
        <div
            :class="$style.form"
        >
            <el-form>
                <el-form-item label="请输入链接地址：">
                    <el-input
                        v-model="inputUrl"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import VueHotImg from 'vue-hot-img/src/index';
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
            }]
        };
    },
    computed: {
        inputUrl: {
            get() {
                if (this.curZone && this.curZone.extra) {
                    return this.curZone.extra.url;
                }
                return '';
            },
            set(value) {
                Vue.set(this.curZone.extra, 'url', value);
            }
        }
    },
    methods: {
        onSelect(zone) {
            this.curZone = zone;
        }
    }
};
</script>

<style module>
.box {
    margin: 0 auto;
    padding: 20px;
    width: 1200px;
    background: #EFEFEF;
    border-radius: 4px;
    display: flex;
}
.form {
    flex: 1;
    margin-left: 20px;
}
</style>
