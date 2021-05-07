<template>
  <div>
    Hello Content
  </div>
</template>

<script>
export default {
  name: 'ContentApp',
  data() {
    return {}
  },
  mounted() {
    console.log('Hello Content')

    this.getLinkedInProfile()
    this.getUserInfoInUSDB()
  },
  methods: {
    getLinkedInProfile() {
      if (window.location.href.includes('linkedin.com/in/')) {
        const id = window.location.href.split('/')[4]
        return window.chrome.runtime.sendMessage({ type: 'get_linkedIn_profile', id }, data => {
          console.log(data)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
