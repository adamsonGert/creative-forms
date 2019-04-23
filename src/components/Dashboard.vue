<template>
  <div id="dashboard">
    <div class="container">
      <ul>
        <li>
          <span class="main-color">My Creatives</span>
          <router-link to="/new" class="btn blue add-button">
            Add
          </router-link>
        </li>
        <hr/>
        <div class="filter-list" v-if="creatives.length">
          <div class="filter">
            <span>Filter Creatives:</span><button class="btn grey" @click="filterByMobile" v-bind:class="currentFilter === 'mobile' ? 'active' : ''">Mobile</button><button class="btn grey"  @click="filterByDesktop" v-bind:class="currentFilter === 'desktop' ? 'active' : ''">Desktop</button>
          </div>
          <div class="sort">
            <span>Sort Creatives:</span><button class="btn grey" @click="orderAsc" v-bind:class="currentSortDir === 'asc' ? 'active' : ''">Name A-Z</button><button class="btn grey" @click="orderDesc" v-bind:class="currentSortDir === 'desc' ? 'active' : ''">Name Z-A</button>
          </div>
        </div>
      </ul>
      <div v-if="creatives.length">
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
            <tr v-for="(creative, index) in filteredCreatives">
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
                <button type="button" class="btn red"
                  @click="removeCreative"
                >
                  Delete</button>
                <button type="button" class="btn blue"
                  @click="findCreative(index)"
                >
                  Edit</button>
              </td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="grey-text">No Creatives found</p>
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
      currentSort:'name',
      currentSortDir:'asc',
      currentFilter: null,
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
    removeCreative(index) {
      this.creatives.splice(index, 1);
      this.saveCreative();
    },
    editCreative() {
      let clone = {};
      for (let key in this.newCreative) {
        clone[key] = this.newCreative[key];
      }
      this.creatives.splice(this.editIndex, 1, clone);
      this.saveCreative();
    },
    saveCreative() {
      const parsed = JSON.stringify(this.creatives);
      localStorage.setItem('creatives', parsed);
    },
    findCreative(index) {
      this.$router.push("/edit-form");
      this.editIndex = index;
      for (let key in this.creatives[index]) {
        this.newCreative[key] = this.creatives[index][key];
      }
    },
    orderAsc() {
      this.currentSortDir = 'asc'
    },
    orderDesc() {
      this.currentSortDir = 'desc'
    },
    filterByMobile() {
      if (this.currentFilter === 'mobile') {
        this.currentFilter = null
      } else {
        this.currentFilter = 'mobile'
      }
    },
    filterByDesktop() {
      if (this.currentFilter === 'desktop') {
        this.currentFilter = null
      } else {
        this.currentFilter = 'desktop'
      }
    }
  },
  computed: {
    filteredCreatives: function () {
      let creatives = this.creatives

      if (this.currentFilter === 'mobile') {
        creatives = creatives.filter(creative => creative.device === 'Mobile')
      } else if (this.currentFilter === 'desktop') {
        creatives = creatives.filter(creatives => creatives.device === 'Desktop')
      }

      return creatives.sort((a, b) => {
        if (this.currentSortDir === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
    }
  }
}
</script>
