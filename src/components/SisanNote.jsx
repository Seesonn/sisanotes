
import { useState, useEffect } from "react"
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
} from "lucide-react"

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
          flex items-center gap-2 px-6 py-4 rounded-lg shadow-lg
          ${isSuccess ? "bg-green-600" : "bg-red-600"} text-white
          min-w-[300px] max-w-md
        `}
        >
          {isSuccess ? <CheckCircle className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
          <p className="text-sm font-medium">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Header Component
function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <button
        onClick={onNewNote}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 mb-6"
      >
        <span className="text-sm font-medium">New Note</span>
      </button>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`
              flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200
              ${currentView === item.id ? "bg-green-50 text-green-600" : "hover:bg-gray-100"}
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">{item.count}</span>
            )}
          </button>
        ))}
      </nav>

      
      
    </aside>
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
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <button
              onClick={onNewNote}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 mb-6"
            >
              <span className="text-sm font-medium">New Note</span>
            </button>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200
                    ${currentView === item.id ? "bg-green-50 text-green-600" : "hover:bg-gray-100"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">{item.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          
        </div>
      </div>
    </div>
  )
}

// Note Form Component
function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [color, setColor] = useState("green")
  const [error, setError] = useState("")

  const colorOptions = [
    { name: "green", class: "bg-green-500" },
    { name: "blue", class: "bg-blue-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "yellow", class: "bg-yellow-500" },
    { name: "red", class: "bg-red-500" },
  ]

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setColor(editingNote.color || "green")
    }
  }, [editingNote])

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{editingNote ? "Edit Note" : "Create New Note"}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => setColor(option.name)}
                className={`w-8 h-8 rounded-full ${option.class} ${
                  color === option.name ? "ring-2 ring-offset-2 ring-gray-400" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows="6"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            {editingNote ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  )
}

// Note Card Component
function NoteCard({ note, onDelete, onEdit, onToggleStatus, viewMode }) {
  const [showMenu, setShowMenu] = useState(false)

  const colorClasses = {
    green: "border-green-500 bg-green-50",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
    yellow: "border-yellow-500 bg-yellow-50",
    red: "border-red-500 bg-red-50",
  }

  return (
    <div
      className={`
        group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
        ${viewMode === "list" ? "p-4" : "p-6"} 
        border-l-4 ${colorClasses[note.color] || colorClasses.green}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-3">{note.content}</p>
          <p className="text-xs text-gray-400">{note.date}</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
              {!note.trashed && (
                <>
                  <button
                    onClick={() => {
                      onEdit(note)
                      setShowMenu(false)
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Note
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(note.id, "archive")
                      setShowMenu(false)
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
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
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                {note.trashed ? "Delete Forever" : "Move to Trash"}
              </button>
            </div>
          )}
        </div>
      </div>

      {!note.trashed && (
        <button
          onClick={() => onToggleStatus(note.id, "star")}
          className={`absolute top-2 right-2 p-1 rounded-full transition-colors duration-200 ${
            note.starred ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"
          }`}
        >
          <Star className="h-5 w-5 fill-current" />
        </button>
      )}
    </div>
  )
}

// Note List Component
function NoteList({ notes, onDelete, onEdit, onToggleStatus, viewMode }) {
  return (
    <motion.div
      layout
      className={viewMode === "grid" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}
    >
      {notes.map((note) => (
        <motion.div
        key={note.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
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
    color: newNote.color || "green",
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
  <div className="min-h-screen bg-gray-50">
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
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid" ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex-1 sm:flex-initial justify-center"
              >
                <Plus size={20} />
                New Note
              </button>
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <NoteForm
                  onSubmit={editingNote ? updateNote : addNote}
                  editingNote={editingNote}
                  onCancel={() => {
                    setShowForm(false)
                    setEditingNote(null)
                  }}
                />
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h2>
{/* ok */}
            {filteredNotes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">
                  {searchQuery
                    ? "No notes found matching your search."
                    : currentView === "trash"
                      ? "Trash is empty."
                      : currentView === "archive"
                        ? "No archived notes."
                      : currentView === "favorites"
                          ? "No favorite notes yet."
                          : "No notes yet. Create your first note!"}
                </p>
              </div>
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
    {toast.show && <Toast message={toast.message} type={toast.type} />}
  </div>
)

}







