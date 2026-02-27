const { createApp } = Vue
const { createClient } = window.supabase

const SUPABASE_URL = 'https://tlvpjszaswkcymqtqhgw.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdnBqc3phc3drY3ltcXRxaGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwOTU2NTgsImV4cCI6MjA4NzY3MTY1OH0.azpCfHpedaiu1f5w1c4DiuHtQlpj1bUjxgSsnPfZh8Y"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

createApp({
  data() {
    return {
      name: "Jeggy Ocenar",
      role: "BSIT Student · Future Systems Architect",
      isDark: true,
      isScrolled: false,
      menuOpen: false,
      submitting: false,
      loadingComments: true,

      toast: {
        show: false,
        message: "",
        type: "success"
      },

      skills: [
        { name: "HTML", icon: "🌐" },
        { name: "CSS", icon: "🎨" },
        { name: "JavaScript", icon: "⚡" },
        { name: "Vue.js", icon: "💚" },
        { name: "Supabase", icon: "🗄️" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Linux", icon: "🐧" },
        { name: "Database Design", icon: "📐" },
        { name: "REST APIs", icon: "🔌" },
        { name: "Git", icon: "🔀" },
      ],

      projects: [
        {
          title: "Vue + Supabase Portfolio",
          description: "Dynamic personal portfolio with real-time Supabase guestbook. Features dark/light mode, responsive design, and direct database integration.",
          type: "Web App",
          year: "2025",
          tags: ["Vue.js", "Supabase", "CSS"]
        },
        {
          title: "Student Management System",
          description: "Full CRUD application with authentication for managing student records. Supports role-based access and report generation.",
          type: "Full Stack",
          year: "2024",
          tags: ["Node.js", "PostgreSQL", "REST API"]
        },
        {
          title: "Database Architecture Study",
          description: "Schema design and optimization project focusing on normalization, indexing strategies, and query performance tuning.",
          type: "Backend",
          year: "2024",
          tags: ["SQL", "ER Diagrams", "Optimization"]
        }
      ],

      comments: [],
      newName: "",
      newMessage: ""
    }
  },

  async mounted() {
    // Load dark mode preference
    const saved = localStorage.getItem("theme")
    if (saved === "light") {
      this.isDark = false
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    }

    // Scroll listener for navbar shadow
    window.addEventListener("scroll", () => {
      this.isScrolled = window.scrollY > 20
    })

    await this.fetchComments()
  },

  methods: {

    async fetchComments() {
      this.loadingComments = true
      try {
        const { data, error } = await supabase
          .from("guestbook")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        this.comments = data
      } catch (err) {
        this.showToast("Failed to load messages. Check your connection.", "error")
        console.error("Fetch error:", err)
      } finally {
        this.loadingComments = false
      }
    },

    async addComment() {
      if (!this.newName.trim() || !this.newMessage.trim()) return

      this.submitting = true
      try {
        const { error } = await supabase
          .from("guestbook")
          .insert([{
            name: this.newName.trim(),
            message: this.newMessage.trim()
          }])

        if (error) throw error

        this.newName = ""
        this.newMessage = ""
        this.showToast("Message sent! Thanks for leaving a note 🎉", "success")
        await this.fetchComments()
      } catch (err) {
        this.showToast("Something went wrong. Please try again.", "error")
        console.error("Insert error:", err)
      } finally {
        this.submitting = false
      }
    },

    showToast(message, type = "success") {
      this.toast = { show: true, message, type }
      setTimeout(() => { this.toast.show = false }, 3500)
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    },

    toggleDark() {
      this.isDark = !this.isDark
      if (this.isDark) {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
        localStorage.setItem("theme", "light")
      }
    },

    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

}).mount("#app")