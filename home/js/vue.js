const { createClient } = window.supabase

const supabaseUrl = 'https://tlvpjszaswkcymqtqhgw.supabase.co'
const supabaseKey = sb_publishable_XsGAqUcnIFhcG7l11TMHRA_3c6extMh
const db = createClient(supabaseUrl, supabaseKey)

const app = Vue.createApp({
  data() {
    return {
      isDark: false,
      filter: "all",

      skills: [
        { name: "HTML & CSS", type: "frontend" },
        { name: "JavaScript", type: "frontend" },
        { name: "Vue.js", type: "frontend" },
        { name: "Linux Administration", type: "systems" },
        { name: "Networking Fundamentals", type: "systems" },
        { name: "Basic Server Deployment", type: "systems" }
      ],

      comments: [],
      newName: "",
      newMessage: "",
      loading: false
    }
  },

  computed: {
    filteredSkills() {
      if (this.filter === "all") return this.skills
      return this.skills.filter(skill => skill.type === this.filter)
    }
  },

  async mounted() {
    this.fetchComments()
  },

  methods: {
    toggleDark() {
      this.isDark = !this.isDark
    },

    scrollTo(section) {
      document.getElementById(section).scrollIntoView({ behavior: "smooth" })
    },

    async fetchComments() {
      this.loading = true
      const { data } = await db
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })

      this.comments = data
      this.loading = false
    },

    async addComment() {
      await db.from("comments").insert([
        { name: this.newName, message: this.newMessage }
      ])

      this.newName = ""
      this.newMessage = ""
      this.fetchComments()
    }
  }
})

app.mount("#app")