<template>
<div>
  <transition name="drawer-transition">
    <div v-if="drawerOpen" class="bag-drawer">
      <div class="drawer-IconsNav">
        <xIcon v-on:click.native="toggleDrawer" class="icon x" width="34" height="32"/>
      </div>
      <div class="size-table-header">
        <h2>Size Guide</h2>
      </div>
      <div class="drawer-sizeTable">
        <div class="drawer-sizeTable__disclaimer">
          <p>Slypers are based on a classic formal last. 
               We recommend choosing a size similar to your dress 
               or formal shoes.  Note, athletic shoe sizing tends 
               to run small (e.g. Nike US 13 closer to a dress 12)</p>
        </div>
        <table class="size-table hover-highlight" cellspacing=0>
          <tr>
            <td><b>US</b></td>
            <td><b>EU</b></td>
          </tr>
          <tr>
            <td>8</td> 
            <td>42</td>
          </tr>
          <tr>
            <td>8.5</td> 
            <td>42.5</td>
          </tr>
          <tr>
            <td>9</td> 
            <td>43</td>
          </tr>
          <tr>
            <td>9.5</td> 
            <td>43.5</td>
          </tr>
          <tr>
            <td>10</td> 
            <td>44</td>
          </tr>
          <tr>
            <td>10.5</td> 
            <td>44.5</td>
          </tr>
          <tr>
            <td>11</td> 
            <td>45</td>
          </tr>
          <tr>
            <td>11.5</td> 
            <td>45.5</td>
          </tr>
          <tr>
            <td>12</td> 
            <td>46</td>
          </tr>
          <tr>
            <td>12.5</td> 
            <td>46.5</td>
          </tr>
          <tr>
            <td>13</td> 
            <td>47</td>
          </tr>
        </table>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
import X from '~/components/icons/X.vue'

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
  },
  components: {
    XIcon: X
  }
}
</script>

<style>

.size-table {
  width: 290px;
  margin-left: 15px;
  height: 220px;
  overflow: hidden;
  border: 0.5px solid black;
}

.size-table-header {
  margin-top: 30px;
  text-align: center;
}

.drawer-IconsNav {
  display: inline-block;
  position: fixed;
  right: 20px;
  top: 23px;
}

.drawer-sizeTable__disclaimer {
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  margin-top: 30px;
  display: inline-block;
}

.size-table td {
  border: 0.5px solid black;
  padding: 5px;
  width: 75px;
  position: relative;
}

.size-table tr:hover {
  background-color: lightgrey;
}

th:hover::after {
  content: "";
  position: absolute;
  background-color: lightgrey;
  left: 0;
  top: -5000px;
  height: 10000px;
  width: 100%;
  z-index: -1;
}
</style>

