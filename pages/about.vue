<template>
  <div class="info">
    <div class="subsection">
      <h3>About</h3><br>
      <p>Bordeelslypers (“Brothel Creepers”) have been a way of life since the Dutch Golden Age, giving gentleman rubber-bottomed protection to avoid all detection.</p><br>
      <p>Slypers - The expedient sole for the deviant soul.</p>
    </div>
    <div class="subsection">
      <h3>Contact</h3><br>
      <p>Slypers BV</p>
      <p>Keizersgracht 678</p>
      <p>1017 ET Amsterdam, Netherlands</p><br>
      <p>contact@slypers.com</p>
    </div>
    <div class="subsection">
      <h3>FAQ</h3>
    </div>
    <div class="subsection">
      <p><b>Sizing</b></p><br>
      <p>See the <a class="sizeGuide__link" @click="toggleDrawer">size guide</a> for more information.</p>
    </div>
    <div class="subsection">
      <p><b>Shipping</b></p><br>
      <p>Shipping available to the Netherlands, United Kingdom, United States.</p><br><br>
      <p>Standard shipping is 5-7 days.</p>
    </div>
    <div class="subsection">
      <p><b>Return & Exchange Policy</b></p><br>
      <p>Returns and exchanges for unused merchandise in original condition accepted within 14 days of delivery.<br><br>Email service@slypers.com with your order number for more information.</p>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  methods: {
    ...mapActions({
      setSizeDrawerOpen: 'SET_SIZE_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
  },
  computed: {
    ...mapState({
      sizeDrawerOpenState: state => state.sizeDrawerOpen
    }),
    drawerOpen: {
      get() {
        return this.sizeDrawerOpenState
      },
      set(newVal) {
        this.setSizeDrawerOpen(newVal)
      }
    }
  }
}
</script>

<style>
.info {
  padding: 5rem 0 2rem 0;
  min-height: 100vh;
} 

.sizeGuide__link {
  text-decoration: underline;
  cursor: pointer;
}

.info > .subsection {
  margin: 40px;
}

@media all and (min-width: 850px) {
  .info {
    padding: 97px 140px 100px 200px
  }
}
</style>
