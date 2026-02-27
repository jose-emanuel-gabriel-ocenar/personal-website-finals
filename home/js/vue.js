const { createClient } = supabase

const supabaseUrl = https://tlvpjszaswkcymqtqhgw.supabase.co
const supabaseKey = sb_publishable_XsGAqUcnIFhcG7l11TMHRA_3c6extMh
const db = createClient(supabaseUrl, supabaseKey)

const app = Vue.createApp({
  data() {
    return {
      name: "Jeggy Ocenar",
      role: "Aspiring System Administrator",
      about: "Passionate about system infrastructure, cloud environments, and backend technologies.",

      skills: [
        "Linux",
        "Networking",
        "HTML",
        "CSS",
        "JavaScript",
        "Vue.js",
        "GitHub"
      ],

      comments: [],
      newName: "",
      newMessage: ""
    }
  },

  async mounted() {
    this.fetchComments()
  },

  methods: {
    async fetchComments() {
      const { data } = await db
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })

      this.comments = data
    },

    async addComment() {
      await db.from("comments").insert([
        {
          name: this.newName,
          message: this.newMessage
        }
      ])

      this.newName = ""
      this.newMessage = ""
      this.fetchComments()
    }
  }
})

app.mount("#app")