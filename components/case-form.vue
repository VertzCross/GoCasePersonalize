<template>
  <aside class="case-form">
    <header>Personalize Your Case</header>
    <b-field
      label="Let's personalize your celphone case, First let's choose a color for the case"
    >
      <section class="color-dots-container subfield-container" expanded>
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="color-dots"
          :class="{ 'color-dots-active': getBackgroundInfo.color === color }"
          :style="`background-color: ${color}`"
          @click="() => addBackgroundColor(color)"
        />
      </section>
    </b-field>
    <b-field
      class="subfield-container"
      label="Add a new color or a Photo to the background"
      grouped
    >
      <b-input
        class="color-input mr-3"
        :value="getBackgroundInfo.color"
        type="color"
        @input="addCaseColor"
      />
      <b-upload
        :value="{}"
        class="file-label mx-3"
        native
        accept="image/*"
        @input="image => addImage({ image, isBackground: true })"
      >
        <span v-if="!getBackgroundInfo.image" class="file-cta">
          <b-icon class="file-icon" icon="upload"></b-icon>
          <span class="file-label">Add Background Photo</span>
        </span>
        <span v-else class="file-cta">
          <b-icon class="file-icon" icon="reload"></b-icon>
          <span class="file-label">Replace Background Photo</span>
        </span>
      </b-upload>
      <b-button
        v-if="getBackgroundInfo.image"
        type="is-text"
        @click="() => removeBackground()"
      >
        <b-icon class="file-icon" type="is-danger" icon="delete"></b-icon>
      </b-button>
    </b-field>
    <b-field
      label="Now you can Add multiples Stickers and control they size, position and rotation"
    >
      <div class="sticker-container subfield-container">
        <a
          v-for="value in 15"
          :key="value"
          @click="
            () =>
              addSticker(require(`@/assets/stickers/sticker${value - 1}.png`))
          "
        >
          <b-image
            :src="require(`@/assets/stickers/sticker${value - 1}.png`)"
            class="sticker"
            :alt="'sticker' + value"
          />
        </a>
        <b-upload
          :value="{}"
          class="file-label"
          native
          accept="image/*"
          @input="image => addImage({ image })"
        >
          <span class="file-cta">
            <b-icon class="file-icon" icon="upload"></b-icon>
            <span class="file-label">Add Custom Sticker</span>
          </span>
        </b-upload>
      </div>
    </b-field>
    <b-field
      label="You can also add multiple Messages, personalize the text, font, color, and styles"
      class="custom-field"
    >
      <section
        class="subfield-container"
        v-for="sticker in getMessages"
        :key="sticker.sequence"
      >
        <b-field expanded>
          <b-input
            :value="sticker.message"
            placeholder="Write your message"
            @input="value => updateMessage(value, sticker.sequence)"
            expanded
          />
        </b-field>
        <b-field grouped>
          <b-select
            size="is-small"
            placeholder="Select a Font"
            :value="'Roboto'"
            @input="
              option =>
                updateMessageStyle(
                  { ...sticker.style, fontFamily: option },
                  sticker.sequence
                )
            "
          >
            <option v-for="option in fontFamily" :key="option">
              {{ option }}
            </option>
          </b-select>
          <b-select
            size="is-small"
            placeholder="Select a size"
            :value="12"
            @input="
              option =>
                updateMessageStyle(
                  { ...sticker.style, fontSize: `${option}px` },
                  sticker.sequence
                )
            "
          >
            <option v-for="option in sizes" :key="option">
              {{ option }}
            </option>
          </b-select>
          <b-dropdown aria-role="list">
            <template #trigger="{ active }">
              <b-button
                size="is-small"
                class="mr-3"
                label="Select Styles"
                :icon-right="active ? 'menu-up' : 'menu-down'"
              />
            </template>
            <b-dropdown-item
              aria-role="listitem"
              @click="
                updateMessageStyle(
                  {
                    ...sticker.style,
                    fontWeight: sticker.style.fontWeight ? '' : 'bold'
                  },
                  sticker.sequence
                )
              "
            >
              <b-icon
                class="mr-2"
                type="is-success"
                :icon="sticker.style.fontWeight ? 'check' : ''"
                size="is-small"
              />
              Bold
            </b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="
                updateMessageStyle(
                  {
                    ...sticker.style,
                    fontStyle: sticker.style.fontStyle ? '' : 'italic'
                  },
                  sticker.sequence
                )
              "
            >
              <b-icon
                class="mr-2"
                type="is-success"
                :icon="sticker.style.fontStyle ? 'check' : ''"
                size="is-small"
              />
              Italic
            </b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="
                updateMessageStyle(
                  {
                    ...sticker.style,
                    textDecoration: sticker.style.textDecoration
                      ? ''
                      : 'underline'
                  },
                  sticker.sequence
                )
              "
            >
              <b-icon
                class="mr-2"
                type="is-success"
                :icon="sticker.style.textDecoration ? 'check' : ''"
                size="is-small"
              />
              Underline
            </b-dropdown-item>
          </b-dropdown>
          <b-input
            size="is-small"
            :value="sticker.style.color"
            class="color-input"
            type="color"
            @input="
              option =>
                updateMessageStyle(
                  { ...sticker.style, color: option },
                  sticker.sequence
                )
            "
          />
          <b-button
            size="is-small"
            type="is-danger"
            icon-left="delete"
            @click="removeSticker(sticker.sequence)"
          />
        </b-field>
      </section>

      <b-button
        icon-left="plus-circle"
        type="is-info"
        label="add message"
        @click="() => addMessage()"
      />
    </b-field>
    <b-button type="is-success" label="Finish" @click="onSubmit" expanded />
  </aside>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
      default: () => null
    }
  },
  data() {
    return {
      colors: [
        "#d2d2d2",
        "#00b28f",
        "#e67940",
        "#80c470",
        "#4b9f37",
        "#465564",
        "#2d4040",
        "#a1a1a1",
        "#ffdb5b",
        "#fc6837"
      ],
      sizes: [
        10,
        11,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        28,
        32,
        36,
        40,
        44,
        48,
        55,
        60
      ],
      weight: ["normal", "bold", "italic", "underline"],
      fontFamily: [
        "Roboto",
        "Tangerine",
        "Oxygen",
        "Zen Loop",
        "Montserrat",
        "Festive"
      ]
    };
  },
  computed: {
    ...mapGetters({
      getMessages: "getMessages",
      getBackgroundInfo: "getBackgroundInfo"
    })
  },
  methods: {
    ...mapMutations({
      addBackgroundColor: "addBackgroundColor",
      addMessage: "addMessage",
      addSticker: "addSticker",
      updateStickers: "updateStickers",
      removeSticker: "removeSticker",
      removeBackground: "removeBackground"
    }),
    ...mapActions({ addImage: "addImage" }),

    addCaseColor(value) {
      this.colors.push(value);
      this.addBackgroundColor(value);
    },
    updateMessage(message, index) {
      const value = { message };
      this.updateStickers({ value, index });
    },
    updateMessageStyle(style, index) {
      const value = { style };
      this.updateStickers({ value, index });
    }
  }
};
</script>

<style lang="scss" scoped>
.case-form {
  margin-left: 3rem;
  header {
    font-family: "Oxygen";
    font-weight: bold;
    font-size: 1.3rem;
    text-align: center;
    margin: 10px 0;
    pointer-events: none;
    border-bottom: 5px solid #7957d5;
  }
  .color-dots-container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 10px;
    .color-dots {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 2px #111;
        opacity: 0.7;
      }
    }
    .color-dots-active {
      width: 22px;
      height: 22px;
      box-shadow: 0 0 5px #111;
    }
  }
  .sticker-container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 10px;
    .sticker {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 10px;
      overflow: hidden;
      cursor: pointer;
      filter: drop-shadow(0 0 5px #444);
      &:hover {
        filter: drop-shadow(0 5px 7px #222) opacity(70);
      }
    }
  }
  .subfield-container {
    border-left: 5px solid #e67940;
    padding: 10px;
    margin: 10px 10px 10px 0;
  }
}
</style>

<style lang="scss">
.custom-field {
  .field-body {
    .has-addons {
      display: flex !important;
      flex-flow: column !important;
    }
  }
}
</style>
