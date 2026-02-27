const { createClient } = supabase

const supabaseUrl = https://tlvpjszaswkcymqtqhgw.supabase.co
const supabaseKey = sb_publishable_XsGAqUcnIFhcG7l11TMHRA_3c6extMh
const db = createClient(supabaseUrl, supabaseKey)

const app = Vue.createApp({
  data() {
    return {
      name: "Jeggy Ocenar",
      role: "Aspiring System Administrator & Future System Architect",
      tagline: "Designing scalable systems and learning infrastructure engineering.",

      about: "I am an Information Technology student passionate about backend systems, infrastructure management, and cloud technologies. I enjoy understanding how distributed systems work and how scalable architectures are built.",

      location: "Philippines",
      education: "BS Information Technology",
      focus: "Infrastructure & Cloud Systems",
      goal: "To become a professional System Administrator and eventually move into System Architecture.",

      skills: [
        "Linux Administration",
        "Networking Fundamentals",
        "HTML & CSS",
        "JavaScript",
        "Vue.js",
        "Git & GitHub",
        "Basic Server Deployment",
        "Database Fundamentals"
      ],

      projects: [
        {
          title: "Vue Portfolio Website",
          description: "Personal responsive portfolio deployed on Vercel."
        },
        {
          title: "Supabase Guestbook System",
          description: "Implemented real-time comment storage using Supabase."
        },
        {
          title: "Linux Server Practice",
          description: "Configured Apache/Nginx on virtual machine environment."
        }
      ],

      techStack: [
        "Vue 3",
        "Supabase",
        "Vercel",
        "HTML5",
        "CSS3 (Flexbox & Grid)",
        "JavaScript ES6"
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
        { name: this.newName, message: this.newMessage }
      ])

      this.newName = ""
      this.newMessage = ""
      this.fetchComments()
    }
  }
})

app.mount("#app")