<template>
  <div class="Keywords jumbotron jumbotron-fluid">
    <div class="container text-center">
      <h1>
         林檎音楽(仮)
        <p class="lead text-muted py-3">最近好きなアルバムあるかい?</p>
      </h1>
      <div class="form-group">
        <!-- <label for="keywords" class="h5">Search:</label> -->
        <input
          placeholder="Search..."
          type="text"
          class="form-control"
          id="artist"
          v-on:change="keywordChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keywords',
  data() {
    return {
      keywords: ['zombie-chang', 'jp the wavy', 'Kaneko Ayano', 'Yurufuwa Gang']
    };
  },
  methods: {
    keywordChanged: function (e) {
      this.$emit('keywordChanged', e.target.value);
    },
    randomKeyword: function () {
      return this.keywords[Math.floor(Math.random() * this.keywords.length)];
    }
  },
  mounted: function () {
    const initialKeyword = this.randomKeyword();
    this.$el.querySelector('#artist').value = initialKeyword;
    this.$emit('keywordChanged', initialKeyword);
  }
};
</script>

<style scoped>
.text-center {
  margin-top: 30px;
}
</style>
