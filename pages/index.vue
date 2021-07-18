<template>
  <section class="container">
    <b-loading is-full-page :active="isLoading" />
    <main class="main-container">
      <CaseCard />
    </main>
    <CaseForm :onSubmit="submitCase" />
  </section>
</template>

<script>
import html2canvas from "html2canvas";
import { mapMutations } from "vuex";
import CaseCard from "@/components/case-card";
import CaseForm from "@/components/case-form";

export default {
  name: "HomePage",

  components: {
    CaseCard,
    CaseForm
  },
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    window.addEventListener("keydown", this.removeFile);
  },
  destroyed() {
    window.removeEventListener("keydown", this.removeFile);
  },

  methods: {
    ...mapMutations({ removeSticker: "removeSticker" }),

    removeFile(event) {
      if (event.key === "Backspace") {
        const elements = [...document.getElementsByClassName("active")];
        elements &&
          elements.map(item => {
            this.removeSticker(item.id);
          });
      }
    },
    submitCase() {
      this.isLoading = true;
      html2canvas(document.querySelector("#case"), {
        backgroundColor: null,
        width: 400,
        height: 800,
        y: 100
      }).then(canvas => {
        const data = canvas.toDataURL("image/png");
        this.fileDownload(data);
      });
    },
    fileDownload(downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = "newCase.png";
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: transparent;
  font-family: "Roboto";
  padding: 20px 2rem;
  .main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px dashed #a9a9a9;
    padding: 20px;
    background: url("https://image.pngaaa.com/290/872290-small.png");
    background-position: center;
    background-size: cover;
    filter: drop-shadow(0 0 5px #444);
  }
}
</style>

<style lang="scss">
.color-input {
  min-width: 32px !important;
  height: 32px !important;
  input {
    cursor: pointer;
    padding: 0;
    min-width: 32px !important;
    height: 32px !important;
    border-width: 0;
  }
}
</style>
