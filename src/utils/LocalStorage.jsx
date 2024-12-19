const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Submit Weekly Report",
        description: "Complete and submit the weekly project report.",
        date: "2024-12-20",
        category: "Reporting",
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        title: "Prepare Meeting Agenda",
        description: "Draft and share the agenda for next week's meeting.",
        date: "2024-12-21",
        category: "Planning",
      },
    ],
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Prepare Presentation",
        description: "Create slides for the upcoming team meeting.",
        date: "2024-12-18",
        category: "Presentation",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Coordinate with Vendors",
        description:
          "Communicate with vendors regarding the project requirements.",
        date: "2024-12-22",
        category: "Coordination",
      },
    ],
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Update Client Database",
        description: "Ensure the client contact information is up-to-date.",
        date: "2024-12-22",
        category: "Data Management",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Organize Documentation",
        description: "Categorize and store project-related documents.",
        date: "2024-12-23",
        category: "Organization",
      },
    ],
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: true,
        title: "Fix Backend Bugs",
        description: "Resolve reported issues in the backend code.",
        date: "2024-12-19",
        category: "Development",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Code Review",
        description:
          "Review the recent pull requests submitted by team members.",
        date: "2024-12-21",
        category: "Quality Assurance",
      },
    ],
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        title: "Organize Team Outing",
        description: "Plan the logistics for the team outing.",
        date: "2024-12-25",
        category: "Team Building",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Inventory Check",
        description: "Conduct a detailed check of office inventory.",
        date: "2024-12-24",
        category: "Logistics",
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
  },
];

export const  setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const  getLocalStorage = () => {
    const employees =JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))

    return{employees,admin}

}