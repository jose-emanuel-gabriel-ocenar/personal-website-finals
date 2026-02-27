const { createApp } = Vue
const { createClient } = window.supabase

// 🔥 PUT YOUR REAL KEYS HERE
const SUPABASE_URL = 'https://tlvpjszaswkcymqtqhgw.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdnBqc3phc3drY3ltcXRxaGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwOTU2NTgsImV4cCI6MjA4NzY3MTY1OH0.azpCfHpedaiu1f5w1c4DiuHtQlpj1bUjxgSsnPfZh8Y"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

createApp({
  data() {
    return {
      name: "Jeggy Ocenar",
      role: "BSIT Student | Future Systems Architect",
      isDark: true,

      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Vue.js",
        "Supabase",
        "Linux",
        "Database Design"
      ],

      projects: [
        {
          title: "Vue + Supabase Portfolio",
          description: "Dynamic portfolio with real-time backend database."
        },
        {
          title: "Student Management System",
          description: "Full CRUD system with authentication."
        }
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
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error) {
        this.comments = data
      }
    },

    async addComment() {
      const { error } = await supabase
        .from("guestbook")
        .insert([
          {
            name: this.newName,
            message: this.newMessage
          }
        ])

      if (!error) {
        this.newName = ""
        this.newMessage = ""
        this.fetchComments()
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString()
    },

    toggleDark() {
      this.isDark = !this.isDark
      document.body.classList.toggle("light")
    },

    scrollTo(id) {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

}).mount("#app")