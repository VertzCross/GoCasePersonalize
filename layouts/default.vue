<template>
  <main>
    <b-navbar class="p-3" type="is-primary">
      <template #start>
        <b-navbar-item
          href="https://www.linkedin.com/in/cervulocruz/"
          target="_blank"
        >
          <b-icon class="mr-2" icon="linkedin" />
          About the DEV
        </b-navbar-item>
      </template>

      <template #brand>
        <h1 class="header-title">Go Case Test</h1>
      </template>

      <template #end>
        <b-navbar-item href="https://www.gocase.com.br" target="_blank">
          <b-icon class="mr-2" icon="cellphone" />
          About the GoCase
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <Nuxt />
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Festive";
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin: 10px 15px;
  pointer-events: none;
}
.main-content {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
}
</style>
