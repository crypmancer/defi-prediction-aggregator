import { Mail, MessageCircle, Github, Twitter, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to a backend API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Get in touch with the OracleVault team</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Have questions, suggestions, or need support? We're here to help!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:crypmancer@gmail.com"
                className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="font-medium">crypmancer@gmail.com</span>
              </a>

              <a
                href="https://t.me/cryp_mancer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="font-medium">Telegram: @cryp_mancer</span>
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/crypmancer/defi-prediction-aggregator"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a
                href="https://twitter.com/oraclevault"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-slate-800 p-6 rounded-xl border border-primary-200 dark:border-primary-800 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Response Time</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We typically respond within 24-48 hours. For urgent matters, please reach out via Telegram.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Send a Message</h2>
          
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-lg">
              Thank you for your message! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
