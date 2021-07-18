export default {
  ssr: false,

  target: "static",

  head: {
    title: "Case Personalize",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Oxygen"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Tangerine"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Zen+Loop"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Montserrat"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Festive"
      }
    ]
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxt/typescript-build"],

  modules: ["nuxt-buefy"],

  build: {}
};
