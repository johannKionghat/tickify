export const DataChecklist = [
    { id: 1, title: "Travel Plan", createdAT: "10-20-2024", description: "Checklist for travel preparations", state: 1 },
    { id: 2, title: "Groceries", createdAT: "10-21-2024", description: "Shopping list for groceries", state: 1 },
    { id: 3, title: "Workout Routine", createdAT: "10-22-2024", description: "Weekly fitness plan checklist", state: 1 },
    { id: 4, title: "Office Setup", createdAT: "10-23-2024", description: "Tasks for organizing a new office", state: 1 },
    { id: 5, title: "Learning Goals", createdAT: "10-24-2024", description: "Checklist for weekly learning objectives", state: 1 },
    { id: 6, title: "House Cleaning", createdAT: "10-25-2024", description: "Cleaning tasks for the week", state: 1 },
    { id: 7, title: "Birthday Party", createdAT: "10-26-2024", description: "Preparation tasks for the birthday celebration", state: 1 },
    { id: 8, title: "Vacation Packing", createdAT: "10-27-2024", description: "Checklist for vacation packing essentials", state: 1 },
    { id: 9, title: "Budget Planning", createdAT: "10-28-2024", description: "Tasks for monthly budget management", state: 1 },
    { id: 10, title: "Event Coordination", createdAT: "10-29-2024", description: "Tasks for managing an upcoming event", state: 1 },
    { id: 11, title: "Pet Care", createdAT: "10-30-2024", description: "Daily tasks for taking care of pets", state: 1 },
    { id: 12, title: "Garden Maintenance", createdAT: "10-31-2024", description: "Tasks to maintain a garden", state: 1 },
    { id: 13, title: "Cooking Schedule", createdAT: "11-01-2024", description: "Planning meals for the week", state: 1 },
    { id: 14, title: "Exercise Challenges", createdAT: "11-02-2024", description: "Weekly fitness challenges", state: 1 },
    { id: 15, title: "Job Applications", createdAT: "11-03-2024", description: "Checklist for applying to jobs", state: 1 },
    { id: 16, title: "Tech Setup", createdAT: "11-04-2024", description: "Tasks for setting up new technology", state: 1 },
    { id: 17, title: "Reading Goals", createdAT: "11-05-2024", description: "Books and chapters to complete", state: 1 },
    { id: 18, title: "Health Checkup", createdAT: "11-06-2024", description: "Preparation for annual health exams", state: 1 },
    { id: 19, title: "Car Maintenance", createdAT: "11-07-2024", description: "Tasks for vehicle servicing", state: 1 },
    { id: 20, title: "Project Deadlines", createdAT: "11-08-2024", description: "Checklist for project submissions", state: 1 }
];
export const DataTask = [
    { id: 1, title: "Pack travel essentials", state: 0, dataChecklistId: 1 },
    { id: 2, title: "Check passport and visa", state: 0, dataChecklistId: 1 },
    { id: 3, title: "Book accommodation", state: 0, dataChecklistId: 1 },
    { id: 4, title: "Research local attractions", state: 0, dataChecklistId: 1 },
    { id: 5, title: "Create travel itinerary", state: 0, dataChecklistId: 1 },

    { id: 6, title: "Buy fruits and vegetables", state: 0, dataChecklistId: 1 },
    { id: 7, title: "Purchase dairy products", state: 1, dataChecklistId: 2 },
    { id: 8, title: "Get cleaning supplies", state: 1, dataChecklistId: 2 },
    { id: 9, title: "Check for discounts", state: 1, dataChecklistId: 2 },
    { id: 10, title: "Stock up on essentials", state: 0, dataChecklistId: 2 },

    { id: 11, title: "Plan leg day routine", state: 1, dataChecklistId: 3 },
    { id: 12, title: "Include warm-up exercises", state: 0, dataChecklistId: 3 },
    { id: 13, title: "Cool-down stretches", state: 1, dataChecklistId: 3 },
    { id: 14, title: "Track progress weekly", state: 1, dataChecklistId: 3 },
    { id: 15, title: "Add cardio sessions", state: 0, dataChecklistId: 3 },

    { id: 16, title: "Arrange desk setup", state: 1, dataChecklistId: 4 },
    { id: 17, title: "Order office supplies", state: 0, dataChecklistId: 4 },
    { id: 18, title: "Organize documents", state: 1, dataChecklistId: 4 },
    { id: 19, title: "Setup IT equipment", state: 1, dataChecklistId: 4 },
    { id: 20, title: "Decorate workspace", state: 0, dataChecklistId: 4 },

    { id: 21, title: "Set learning objectives", state: 1, dataChecklistId: 5 },
    { id: 22, title: "Review previous goals", state: 0, dataChecklistId: 5 },
    { id: 23, title: "Practice key skills", state: 1, dataChecklistId: 5 },
    { id: 24, title: "Join an online course", state: 1, dataChecklistId: 5 },
    { id: 25, title: "Complete a certification", state: 0, dataChecklistId: 5 },

    { id: 26, title: "Vacuum all rooms", state: 1, dataChecklistId: 6 },
    { id: 27, title: "Dust shelves and surfaces", state: 0, dataChecklistId: 6 },
    { id: 28, title: "Wash windows", state: 1, dataChecklistId: 6 },
    { id: 29, title: "Organize closets", state: 1, dataChecklistId: 6 },
    { id: 30, title: "Mop floors", state: 0, dataChecklistId: 6 },

    { id: 31, title: "Choose a theme", state: 1, dataChecklistId: 7 },
    { id: 32, title: "Send invitations", state: 0, dataChecklistId: 7 },
    { id: 33, title: "Plan party games", state: 1, dataChecklistId: 7 },
    { id: 34, title: "Order cake and snacks", state: 1, dataChecklistId: 7 },
    { id: 35, title: "Setup decorations", state: 0, dataChecklistId: 7 },

    // Continues similarly for checklists 8 to 20
    { id: 36, title: "Pack clothes for vacation", state: 1, dataChecklistId: 8 },
    { id: 37, title: "Check weather forecasts", state: 0, dataChecklistId: 8 },
    { id: 38, title: "Gather travel documents", state: 1, dataChecklistId: 8 },
    { id: 39, title: "Prepare toiletries bag", state: 1, dataChecklistId: 8 },
    { id: 40, title: "Charge electronic devices", state: 0, dataChecklistId: 8 },

    // ...

    { id: 96, title: "Finalize presentation", state: 1, dataChecklistId: 20 },
    { id: 97, title: "Prepare meeting agenda", state: 0, dataChecklistId: 20 },
    { id: 98, title: "Update project timeline", state: 1, dataChecklistId: 20 },
    { id: 99, title: "Review tasks with team", state: 1, dataChecklistId: 20 },
    { id: 100, title: "Submit final documents", state: 0, dataChecklistId: 20 },
     // Tasks for "Garden Maintenance" (id: 12)
     { id: 101, title: "Water plants", state: 1, dataChecklistId: 12 },
     { id: 102, title: "Prune bushes", state: 0, dataChecklistId: 12 },
     { id: 103, title: "Mow the lawn", state: 1, dataChecklistId: 12 },
     { id: 104, title: "Weed the garden", state: 1, dataChecklistId: 12 },
     { id: 105, title: "Add compost", state: 0, dataChecklistId: 12 },
 
     // Tasks for "Exercise Challenges" (id: 14)
     { id: 106, title: "Complete daily push-ups", state: 1, dataChecklistId: 14 },
     { id: 107, title: "Track running distance", state: 0, dataChecklistId: 14 },
     { id: 108, title: "Log daily calories", state: 1, dataChecklistId: 14 },
     { id: 109, title: "Perform plank challenge", state: 1, dataChecklistId: 14 },
     { id: 110, title: "Stretch after workouts", state: 0, dataChecklistId: 14 },
 
     // Tasks for "Health Checkup" (id: 18)
     { id: 111, title: "Book doctor appointment", state: 1, dataChecklistId: 18 },
     { id: 112, title: "Prepare medical records", state: 0, dataChecklistId: 18 },
     { id: 113, title: "List current medications", state: 1, dataChecklistId: 18 },
     { id: 114, title: "Schedule blood tests", state: 1, dataChecklistId: 18 },
     { id: 115, title: "Follow pre-checkup instructions", state: 0, dataChecklistId: 18 },
 
     // Tasks for "Tech Setup" (id: 16)
     { id: 116, title: "Unbox new device", state: 1, dataChecklistId: 16 },
     { id: 117, title: "Install necessary software", state: 0, dataChecklistId: 16 },
     { id: 118, title: "Set up user accounts", state: 1, dataChecklistId: 16 },
     { id: 119, title: "Test system compatibility", state: 1, dataChecklistId: 16 },
     { id: 120, title: "Secure with password", state: 0, dataChecklistId: 16 },
 
     // Tasks for "Cooking Schedule" (id: 13)
     { id: 121, title: "Plan weekly meals", state: 0, dataChecklistId: 13 },
     { id: 122, title: "Buy ingredients", state: 0, dataChecklistId: 13 },
     { id: 123, title: "Prepare meal prep containers", state:0, dataChecklistId: 13 },
     { id: 124, title: "Cook meals for the week", state: 0, dataChecklistId: 13 },
     { id: 125, title: "Store meals properly", state: 0, dataChecklistId: 13 },
{ id: 126, title: "Book doctor appointment", state: 1, dataChecklistId: 13 },
{ id: 127, title: "Prepare medical records", state: 0, dataChecklistId: 13 },
{ id: 128, title: "List current medications", state: 1, dataChecklistId: 13 },
{ id: 129, title: "Schedule blood tests", state: 1, dataChecklistId: 13 },
{ id: 130, title: "Follow pre-checkup instructions", state: 0, dataChecklistId: 13 },
{ id: 131, title: "Unbox new device", state: 1, dataChecklistId: 13 },
{ id: 132, title: "Install necessary software", state: 0, dataChecklistId: 13 },
{ id: 133, title: "Set up user accounts", state: 1, dataChecklistId: 13 },
{ id: 134, title: "Test system compatibility", state: 1, dataChecklistId: 13 },
{ id: 135, title: "Secure with password", state: 0, dataChecklistId: 13 },
{ id: 136, title: "Plan weekly meals", state: 1, dataChecklistId: 13 },
{ id: 137, title: "Buy ingredients", state: 0, dataChecklistId: 13 },
{ id: 138, title: "Prepare meal prep containers", state: 1, dataChecklistId: 13 },
{ id: 139, title: "Cook meals for the week", state: 1, dataChecklistId: 13 },
{ id: 140, title: "Store meals properly", state: 0, dataChecklistId: 13 }

];
