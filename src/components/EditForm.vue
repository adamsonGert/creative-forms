<template>
  <div id="edit-form">
    <div class="container">
      <ul>
        <li>
          <span class="main-color">Creative list</span>
          <router-link to="/" class="btn blue add-button">
            Back
          </router-link>
        </li>
        <hr />
      </ul>
      <table>
        <thead>
          <tr>
          <th>
            ID
          </th>
          <th>
            Name
          </th>
          <th>
            Device
          </th>
          <th>
            Width
          </th>
          <th>
            Height
          </th>
          </tr>
        </thead>
        <tbody class="collection-item">
          <tr v-for="(creative, index) in creatives">
            <th>
              {{ index + 1 }}
            </th>
            <td>
              {{ creative.name }}
            </td>
            <td>
              {{ creative.device }}
            </td>
            <td>
              {{ creative.width }}
            </td>
            <td>
              {{ creative.height }}
            </td>
            <td>
              <button type="button" class="btn blue"
                @click="findCreative(index)"
              >
                Choose</button>
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <form class="col s12">
          <h5 class="center-align main-color">Edit Creative</h5>
          <div class="row">
            <div class="col m4 left-align">
              <span>Creative Name</span>
            </div>
            <div class="col m6">
                <input placeholder="Write name here"  type="text" v-model="newCreative.name" required />
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
              <button type="submit" @click="editCreative" class="btn blue">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'edit-form',
  data () {
    return {
      creatives: [],
      newCreative: {
        name: null,
        device: null,
        width: null,
        height: null,
      },
      editIndex: 0
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
    editCreative() {
      let clone = {};
      for (let key in this.newCreative) {
        clone[key] = this.newCreative[key];
      }
      this.creatives.splice(this.editIndex, 1, clone);
      this.saveCreative();
      this.$router.push('/')
    },
    saveCreative() {
      const parsed = JSON.stringify(this.creatives);
      localStorage.setItem('creatives', parsed);

    },
    findCreative(index) {
      this.editIndex = index;
      for (let key in this.creatives[index]) {
        this.newCreative[key] = this.creatives[index][key];
      }
    },
  }
}
</script>
