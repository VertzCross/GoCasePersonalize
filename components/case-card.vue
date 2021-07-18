<template>
  <article id="case" class="case-container">
    <section
      class="case-content"
      :style="
        `
          background-color: ${getBackgroundInfo.color};
          background-image: url(${getBackgroundInfo.image || ''});
        `
      "
    >
      <Canvas
        v-for="(sticker, index) in getStickers"
        :key="index"
        :id="index"
        :x="sticker.x"
        :y="sticker.y"
        :w="sticker.w"
        :h="sticker.h"
        :angle="sticker.angle"
        :aspectRatio="true"
        @change="value => updateStickers({ value, index })"
      >
        <img
          v-if="sticker.path"
          :src="sticker.path"
          :alt="`Sticker n${index + 1}`"
          class="sticker-image"
        />
        <div class="message">
          <h1 v-if="sticker.style" :style="sticker.style">
            {{ sticker.message }}
          </h1>
        </div>
      </Canvas>
    </section>
    <div class="case-borders" />
  </article>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Canvas from "@minogin/vue-drag-resize-rotate";
export default {
  components: {
    Canvas
  },

  computed: {
    ...mapGetters({
      getStickers: "getStickers",
      getBackgroundInfo: "getBackgroundInfo"
    })
  },
  methods: {
    ...mapMutations({ updateStickers: "updateStickers" })
  }
};
</script>

<style lang="scss" scoped>
.case-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 750px;
  overflow: hidden;
  margin: 0 50px;
  padding: 10px 0;
  filter: drop-shadow(0 0 5px #444);

  .case-content {
    position: relative;
    height: 730px;
    width: 370px;
    background-color: #444;
    border-radius: 60px;
    object-fit: contain;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .drr {
      display: flex;
      align-items: center;
    }
    .stiker-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .message {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: transparent;
      word-wrap: break-word;
      overflow: hidden;
    }
  }
  .case-borders {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("@/assets/IphoneCase.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
  }
}
</style>
