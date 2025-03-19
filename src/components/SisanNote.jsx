

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Grid,
  List,
  Menu,
  X,
  Star,
  Home,
  Archive,
  Trash2,
  MoreVertical,
  Edit2,
  RotateCcw,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"

// Loading Screen Component
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-6">
          Sisan Note
        </h1>

        <div className="relative">
          <Loader2 size={40} className="text-emerald-500 animate-spin" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 absolute -bottom-6 left-0 rounded-full"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-zinc-500 mt-12 text-sm"
      >
        Loading your notes...
      </motion.p>
    </motion.div>
  )
}

// Typing Effect Component
function TypingEffect({ text, className }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50) // Adjust speed as needed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span className={className}>{displayText}</span>
}

// Toast Component
function Toast({ message, type = "success" }) {
  const isSuccess = type === "success"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div
          className={`
          flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl
          ${isSuccess ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-gradient-to-r from-rose-600 to-pink-600"} 
          text-white min-w-[300px] max-w-md backdrop-blur-sm bg-opacity-90
          border border-white/10
        `}
        >
          <div className="p-1 bg-white/20 rounded-full">
            {isSuccess ? <CheckCircle className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
          </div>
          <p className="text-sm font-medium">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Header Component
function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-black/80 backdrop-blur-md border-b border-zinc-800/80 fixed top-0 left-0 right-0 z-30">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-zinc-800/80 rounded-lg transition-colors">
            <Menu className="h-6 w-6 text-zinc-400" />
          </button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Sisan Note
          </h1>
        </div>
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar({ counts, currentView, onViewChange, onNewNote }) {
  const menuItems = [
    { id: "Notes", icon: Home, label: "Notes", count: counts.Notes },
    { id: "favorites", icon: Star, label: "Favorites", count: counts.favorites },
    { id: "archive", icon: Archive, label: "Archive", count: counts.archive },
    { id: "trash", icon: Trash2, label: "Trash", count: counts.trash },
  ]

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800/80 p-4 overflow-y-auto"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNewNote}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 mb-6"
      >
        <Plus size={18} />
        <span className="text-sm font-medium">New Note</span>
      </motion.button>

      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => onViewChange(item.id)}
            className={`
              flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200
              ${
                currentView === item.id
                  ? "bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 text-emerald-400 shadow-lg shadow-black/10 border border-zinc-700/50"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`h-5 w-5 ${currentView === item.id ? "text-emerald-400" : ""}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.count > 0 && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  currentView === item.id ? "bg-emerald-900/50 text-emerald-300" : "bg-zinc-800/80 text-zinc-400"
                }`}
              >
                {item.count}
              </span>
            )}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  )
}

// Mobile Menu Component
function MobileMenu({ show, onClose, counts, currentView, onViewChange, onNewNote }) {
  const menuItems = [
    { id: "Notes", icon: Home, label: "Notes", count: counts.Notes },
    { id: "favorites", icon: Star, label: "Favorites", count: counts.favorites },
    { id: "archive", icon: Archive, label: "Archive", count: counts.archive },
    { id: "trash", icon: Trash2, label: "Trash", count: counts.trash },
  ]

  if (!show) return null

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-y-0 left-0 w-full max-w-xs bg-zinc-900/95 backdrop-blur-md border-r border-zinc-800/80"
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/80">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
            >
              Menu
            </motion.h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800/80 transition-colors">
              <X className="h-6 w-6 text-zinc-400" />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={onNewNote}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 mb-6"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">New Note</span>
            </motion.button>

            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      currentView === item.id
                        ? "bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 text-emerald-400 shadow-lg shadow-black/10 border border-zinc-700/50"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${currentView === item.id ? "text-emerald-400" : ""}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        currentView === item.id ? "bg-emerald-900/50 text-emerald-300" : "bg-zinc-800/80 text-zinc-400"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Note Form Component
function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [color, setColor] = useState("emerald")
  const [error, setError] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeout = useRef(null)

  const colorOptions = [
    { name: "emerald", class: "bg-gradient-to-br from-emerald-500 to-teal-600" },
    { name: "blue", class: "bg-gradient-to-br from-blue-500 to-cyan-600" },
    { name: "purple", class: "bg-gradient-to-br from-purple-500 to-violet-600" },
    { name: "amber", class: "bg-gradient-to-br from-amber-500 to-yellow-600" },
    { name: "rose", class: "bg-gradient-to-br from-rose-500 to-pink-600" },
  ]

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setColor(editingNote.color || "emerald")
    }
  }, [editingNote])

  const handleContentChange = (e) => {
    setContent(e.target.value)
    setIsTyping(true)

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }

    typingTimeout.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setError("")

    const noteData = {
      title,
      content,
      color,
    }

    if (editingNote) {
      noteData.id = editingNote.id
    }

    onSubmit(noteData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-6 bg-zinc-900/95 text-zinc-200 backdrop-blur-md rounded-xl border border-zinc-700/80"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          {editingNote ? "Edit Note" : "Create New Note"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-zinc-800/80 rounded-full transition-colors duration-200 text-zinc-400 hover:text-zinc-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-700/80 bg-zinc-800/50 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-zinc-500 transition-all duration-200"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-rose-400 flex items-center gap-1"
            >
              <XCircle size={14} />
              {error}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Color</label>
          <div className="flex gap-3">
            {colorOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => setColor(option.name)}
                className={`w-10 h-10 rounded-full ${option.class} ${
                  color === option.name
                    ? "ring-2 ring-offset-4 ring-offset-zinc-900 ring-white/30 scale-110 shadow-lg"
                    : "hover:scale-105 transition-transform"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-zinc-300">Content</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your note here..."
            rows="6"
            className="w-full px-4 py-3 rounded-xl border border-zinc-700/80 bg-zinc-800/50 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-zinc-500 transition-all duration-200"
          />
          {isTyping && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-zinc-500">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Typing...</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-zinc-700/80 text-zinc-300 rounded-xl hover:bg-zinc-800/80 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-200"
          >
            {editingNote ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// Note Card Component
function NoteCard({ note, onDelete, onEdit, onToggleStatus, viewMode }) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const colorClasses = {
    emerald: "border-l-emerald-500 from-emerald-950/30 to-teal-950/20",
    blue: "border-l-blue-500 from-blue-950/30 to-cyan-950/20",
    purple: "border-l-purple-500 from-purple-950/30 to-violet-950/20",
    amber: "border-l-amber-500 from-amber-950/30 to-yellow-950/20",
    rose: "border-l-rose-500 from-rose-950/30 to-pink-950/20",
    green: "border-l-emerald-500 from-emerald-950/30 to-teal-950/20", // fallback for existing notes
  }

  const borderColors = {
    emerald: "group-hover:border-emerald-400/50",
    blue: "group-hover:border-blue-400/50",
    purple: "group-hover:border-purple-400/50",
    amber: "group-hover:border-amber-400/50",
    rose: "group-hover:border-rose-400/50",
    green: "group-hover:border-emerald-400/50", // fallback for existing notes
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        group relative rounded-xl shadow-xl transition-all duration-300 
        ${viewMode === "list" ? "p-4" : "p-5"} 
        border-l-4 border border-zinc-800/80 ${colorClasses[note.color] || colorClasses.emerald}
        bg-gradient-to-br backdrop-blur-md hover:shadow-2xl hover:shadow-black/30
        ${borderColors[note.color] || borderColors.emerald}
        hover:bg-zinc-800/50
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl opacity-80 z-0"></div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-zinc-100 line-clamp-1">{note.title}</h3>
          </div>
          <p className="text-sm text-zinc-400 mb-3 line-clamp-3">{note.content}</p>
          <p className="text-xs text-zinc-500 opacity-80">{note.date}</p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 hover:bg-zinc-700/80 rounded-full transition-colors duration-200"
          >
            <MoreVertical className="h-5 w-5 text-zinc-400" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 right-0 mt-8 w-48 bg-zinc-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-zinc-700/80 py-1 z-10"
                style={{ transformOrigin: "top right" }}
              >
                {!note.trashed && (
                  <>
                    <button
                      onClick={() => {
                        onEdit(note)
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/80 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Note
                    </button>
                    <button
                      onClick={() => {
                        onToggleStatus(note.id, "archive")
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/80 transition-colors"
                    >
                      <Archive className="h-4 w-4" />
                      {note.archived ? "Unarchive" : "Archive"}
                    </button>
                  </>
                )}

                {note.trashed && (
                  <button
                    onClick={() => {
                      onToggleStatus(note.id, "restore")
                      setShowMenu(false)
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-900/30 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore Note
                  </button>
                )}

                <button
                  onClick={() => {
                    onDelete(note.id)
                    setShowMenu(false)
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-rose-400 hover:bg-rose-900/30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  {note.trashed ? "Delete Forever" : "Move to Trash"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!note.trashed && (
        <button
          onClick={() => onToggleStatus(note.id, "star")}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
            note.starred
              ? "text-amber-400 bg-amber-900/30 rotate-0"
              : "text-zinc-600 hover:text-zinc-400 hover:rotate-12"
          }`}
        >
          <Star className={`h-5 w-5 ${note.starred ? "fill-current" : ""}`} />
        </button>
      )}
    </motion.div>
  )
}

// Empty State Component
function EmptyState({ searchQuery, currentView }) {
  let icon = <Plus size={48} className="text-zinc-700" />
  let message = "No notes yet. Create your first note!"

  if (searchQuery) {
    icon = <Search size={48} className="text-zinc-700" />
    message = "No notes found matching your search."
  } else if (currentView === "trash") {
    icon = <Trash2 size={48} className="text-zinc-700" />
    message = "Trash is empty."
  } else if (currentView === "archive") {
    icon = <Archive size={48} className="text-zinc-700" />
    message = "No archived notes."
  } else if (currentView === "favorites") {
    icon = <Star size={48} className="text-zinc-700" />
    message = "No favorite notes yet."
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-800/30 backdrop-blur-md rounded-xl shadow-lg p-10 text-center border border-zinc-700/50 flex flex-col items-center justify-center gap-4"
    >
      <div className="p-4 rounded-full bg-zinc-800/50 border border-zinc-700/50">{icon}</div>
      <p className="text-zinc-400 font-medium">{message}</p>
    </motion.div>
  )
}

// Note List Component
function NoteList({ notes, onDelete, onEdit, onToggleStatus, viewMode }) {
  return (
    <motion.div
      layout
      className={viewMode === "grid" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}
    >
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <NoteCard
              note={note}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

// Main App Component
export default function SisanNote() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [currentView, setCurrentView] = useState("Notes")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const savedNotes = localStorage.getItem("sisanNotes")
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (e) {
        console.error("Error parsing saved notes", e)
        localStorage.removeItem("sisanNotes")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sisanNotes", JSON.stringify(notes))
  }, [notes])

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000)
  }

  const filteredNotes = notes
    .filter((note) => {
      switch (currentView) {
        case "Notes":
          return !note.archived && !note.trashed
        case "favorites":
          return !note.archived && !note.trashed && note.starred
        case "archive":
          return note.archived && !note.trashed
        case "trash":
          return note.trashed
        default:
          return !note.archived && !note.trashed
      }
    })
    .filter((note) =>
      searchQuery
        ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )

  const getCounts = () => ({
    Notes: notes.filter((n) => !n.archived && !n.trashed).length,
    favorites: notes.filter((n) => !n.archived && !n.trashed && n.starred).length,
    archive: notes.filter((n) => n.archived && !n.trashed).length,
    trash: notes.filter((n) => n.trashed).length,
  })

  const addNote = (newNote) => {
    const noteToAdd = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toLocaleString(),
      color: newNote.color || "emerald",
      archived: false,
      trashed: false,
      starred: false,
    }
    setNotes([noteToAdd, ...notes])
    setShowForm(false)
    showToast("Note added successfully!")
  }

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id
          ? {
              ...note,
              ...updatedNote,
              date: new Date().toLocaleString(),
            }
          : note,
      ),
    )
    setEditingNote(null)
    setShowForm(false)
    showToast("Note updated successfully!")
  }

  const deleteNote = (id) => {
    const note = notes.find((n) => n.id === id)
    if (note.trashed) {
      setNotes(notes.filter((note) => note.id !== id))
      showToast(`Note "${note.title}" permanently deleted`, "error")
    } else {
      updateNote({ ...note, id, trashed: true })
      showToast(`Note "${note.title}" moved to trash`)
    }
  }

  const toggleNoteStatus = (id, status) => {
    const note = notes.find((n) => n.id === id)
    let updates = {}

    switch (status) {
      case "archive":
        updates = { archived: !note.archived, trashed: false }
        showToast(note.archived ? `Note "${note.title}" unarchived` : `Note "${note.title}" archived`)
        break
      case "star":
        updates = { starred: !note.starred }
        showToast(
          note.starred ? `Note "${note.title}" removed from favorites` : `Note "${note.title}" added to favorites`,
        )
        break
      case "restore":
        updates = { trashed: false, archived: false }
        showToast(`Note "${note.title}" restored`)
        break
    }

    updateNote({ ...note, ...updates })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <Header onMenuClick={() => setShowMobileMenu(true)} />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar
            counts={getCounts()}
            currentView={currentView}
            onViewChange={setCurrentView}
            onNewNote={() => setShowForm(true)}
          />
        </div>

        <MobileMenu
          show={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          counts={getCounts()}
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view)
            setShowMobileMenu(false)
          }}
          onNewNote={() => {
            setShowForm(true)
            setShowMobileMenu(false)
          }}
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 bg-zinc-800/50 backdrop-blur-sm text-zinc-200 placeholder-zinc-500"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/80 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid" ? "bg-emerald-900/50 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list" ? "bg-emerald-900/50 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 flex-1 sm:flex-initial justify-center"
                >
                  <Plus size={20} />
                  New Note
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                  <NoteForm
                    onSubmit={editingNote ? updateNote : addNote}
                    editingNote={editingNote}
                    onCancel={() => {
                      setShowForm(false)
                      setEditingNote(null)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                <TypingEffect text={currentView.charAt(0).toUpperCase() + currentView.slice(1)} className="" />
              </h2>

              {filteredNotes.length === 0 ? (
                <EmptyState searchQuery={searchQuery} currentView={currentView} />
              ) : (
                <NoteList
                  notes={filteredNotes}
                  onDelete={deleteNote}
                  onEdit={(note) => {
                    setEditingNote(note)
                    setShowForm(true)
                  }}
                  onToggleStatus={toggleNoteStatus}
                  viewMode={viewMode}
                />
              )}
            </div>
          </div>
        </main>
      </div>
      <AnimatePresence>{toast.show && <Toast message={toast.message} type={toast.type} />}</AnimatePresence>
    </div>
  )
}











