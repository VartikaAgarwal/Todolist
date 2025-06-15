#  React Todo App – LocalStorage Enabled

This is a simple yet powerful React-based Todo App that supports:
- Adding, editing, and deleting tasks
- Marking tasks as completed/incomplete
- Filtering and sorting tasks
- Persisting tasks using `localStorage`

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-todo-app.git
cd react-todo-app
npm install
npm start

 Features
➕ Add new todos

📝 Edit existing todos

❌ Delete tasks

✅ Mark as complete/incomplete

🔍 Filter by All / Completed / Incomplete

🔡 Sort alphabetically A–Z, Z–A, or default

💾 Persistent storage with localStorage


🧪 Testing Guidance
Please test the following manually in the browser:

➤ Add Todo
Type a task in the input field.

Click Add.

Confirm the task appears in the list.

➤ Persistence Check
After adding one or more todos:

Refresh the browser page.

Ensure tasks still appear – this confirms localStorage is working.

➤ Edit Todo
Click the Edit icon next to a task.

Change the text and save.

Confirm that the edited task persists after refresh.

➤ Delete Todo
Click the Delete icon.

Confirm task is removed and does not come back after refresh.

➤ Check Local Storage
Open DevTools > Application > Local Storage > http://localhost:3000.

Confirm there’s a key todos with task data stored in JSON format.


🛠 Tech Stack
React

JavaScript

HTML5/CSS3

uuid for unique task IDs


src/
├── components/
│   ├── TodoWrapperLocalStorage.js
│   ├── TodoForm.js
│   ├── EditTodoForm.js
│   └── Todo.js
├── App.js
└── index.js


