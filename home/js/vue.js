const { createClient } = window.supabase

const supabaseUrl = 'https://tlvpjszaswkcymqtqhgw.supabase.co'
const supabaseKey = sb_publishable_XsGAqUcnIFhcG7l11TMHRA_3c6extMh
const db = createClient(supabaseUrl, supabaseKey)

const { createApp } = Vue

createApp({
  data() {
    return {
      name: "Jeggy Ocenar",
      role: "BSIT Student | Future Systems Architect",
      isDark: true,
      skills: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "Vue.js" },
        { name: "Supabase" },
        { name: "System Administration" }
      ],
      projects: [
        {
          title: "Personal Portfolio Website",
          description: "Built using Vue and Supabase integration."
        },
        {
          title: "Student Management System",
          description: "CRUD system with authentication and database storage."
        }
      ]
    }
  },

  methods: {
    toggleDark() {
      this.isDark = !this.isDark
      document.body.style.background =
        this.isDark
          ? "linear-gradient(135deg, #0f172a, #1e293b)"
          : "#f1f5f9"

      document.body.style.color =
        this.isDark ? "#f1f5f9" : "#0f172a"
    },

    scrollToSection(id) {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }
}).mount("#app")