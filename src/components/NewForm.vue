<template>
  <div id="new-form">
    <div class="container">
      <ul>
        <li>
          <span class="main-color">My Creatives</span>
          <router-link to="/" class="btn blue add-button">
            Back
          </router-link>
        </li>
        <hr />
      </ul>
      <div class="form">
        <form class="col s12" v-on:submit.prevent="addCreative">
          <h5 class="center-align main-color">New Creative</h5>
          <div class="row">
            <div class="col m4 left-align">
              <span>Creative Name</span>
            </div>
            <div class="col m6">
                <input placeholder="Write name here" type="text" v-model="newCreative.name" required />
            </div>
          </div>
          <div class="row">
            <div class="col m4 left-align">
              <span>Device</span>
            </div>
            <div class="col m6">
              <input type="radio" id="mobile" value="Mobile" v-model="newCreative.device" />
              <label class="btn grey" for="mobile">Mobile</label>
              <input type="radio" id="desktop" value="Desktop" v-model="newCreative.device" />
              <label class="btn grey" for="desktop">Desktop</label><br />
            </div>
          </div>
          <div class="row">
            <div class="col m4 left-align">
              <span>Size</span>
            </div>
            <div class="col m8 size">
                <input placeholder="Width" type="text" v-model="newCreative.width" required />
                <input placeholder="Heigth" type="text" v-model="newCreative.height" required />
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="buttons col m10">
              <router-link to="/" class="main-color">Cancel</router-link>
              <button type="submit" class="btn blue">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      creatives: [],
      newCreative: {
        name: null,
        device: null,
        width: null,
        height: null,
      },
    }
  },
  mounted() {
    if (localStorage.getItem('creatives')) {
      try {
        this.creatives = JSON.parse(localStorage.getItem('creatives'));
      } catch(e) {
        localStorage.removeItem('creatives');
      }
    }
  },
  methods: {
    addCreative() {
      if (!this.newCreative) {
        return;
      }
      let clone = {};
      for (let key in this.newCreative) {
        clone[key] = this.newCreative[key];
      }
      this.creatives.push(clone);
      this.saveCreative();
      this.$router.push('/')
    },
    saveCreative() {
      const parsed = JSON.stringify(this.creatives);
      localStorage.setItem('creatives', parsed);
    }
  }
}
</script>
