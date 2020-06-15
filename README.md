# Vendoo QA Engineer Test
Welcome to the Vendoo QA Engineer test project. This project is a testing ground for QA engineers to demonstrate their knowledge of automated end-to-end testing with Cypress. The project has been created to mimic Vendoo's real web application project.

## Installation steps
To get this project running on your local machine please do the following:

1. Install node v10 https://nodejs.org/en/download/
2. Run `npm install` at the root folder
3. Run `npm start` to start the local version of the application
4. Run `npm run e2e` to start the end to end testing

## QA Engineer Test
The following 6 tasks are the features we need tested. Each task has a brief explanation of what we required. If you need more explanation or have any question feel free to email chris@vendoo.co

You are not required to finish all 6 tasks, we rather see one very strong test versus 6 fragile test. You have a total of 20 hours to complete as many tasks as possible.

### Task 1) Registration Form
Ensure users can complete the registration and that they get redirected to the inventory page afterwards. Also ensure we have the correct error message showing for emails that have already been used.

### Task 2) Login Form
Ensure users can complete the login and that they get redirected to the inventory page afterwards. Also ensure we the correct incorrect passwords error message for incorrect passwords

### Task 3) Create Item Form
Ensure users can create a complete new item. This would include 8 photos, the title, description, and price. After a successful item creation ensure the user is taken to the edit item page for the new item. Also ensure our form only allows up to 8 images. 

### Task 4) Editing Item Form
Ensure users can edit their item details (minus photos) and changes successfully get saved to the database.

### Task 5) Inventory page
Ensure new items show on the inventory page. Ensure new edits to the items also show on the inventory page.

### Task 6) Searching inventory
Ensure our search box on the inventory page correctly filters the items.
