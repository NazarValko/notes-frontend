# Notes Client

## Description
This project is a frontend application for managing notes, implemented using Angular. It supports creating, retrieving, updating, and deleting notes. The frontend communicates with a REST API

## Backend Repository

Before running you should install and run backend repository. Instructions on installaion can be found here:
https://github.com/NazarValko/note-backend

## Setup and Installation

### Clone the repository:
```bash
git clone https://github.com/NazarValko/NotesFrontend.git
cd NotesFrontend
```

### Install the dependencies
```bash
npm install
```

## Running the Application
Run this command in terminal in folder of the project. Navigate to `http://localhost:4200/`
```bash
 ng serve
```

## Running the Unit Tests
```bash
ng test
```

## Running End-to-End Tests with Cypress
Run `ng e2e` in terminal.

Then in opened window choose browser type(default is Chrome).<br />
![image](https://github.com/NazarValko/notes-frontend/assets/66695679/aa37a825-ba75-48c2-970b-6bea5d87162b)

After you should see test. Click on it.<br />
![image](https://github.com/NazarValko/notes-frontend/assets/66695679/328015da-8f25-4cb0-becf-f659aa1ffb85)

And finally test is passed.<br />
![image](https://github.com/NazarValko/notes-frontend/assets/66695679/9ba4299a-a7fe-478d-8c09-a4e7630a74d4)

Or you can run it in headless environment(without opening browser)
```bash
npx cypress run
```
