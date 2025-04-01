# EmployWise User Management Application

This React application integrates with the Reqres API to provide basic user management functionalities, including user login, listing users, editing user details, and deleting users.

## Features
- **User Login**: Secure login functionality.
- **User Management**: List, edit, and delete users seamlessly.
- **API Integration**: Powered by Reqres API for backend services.

---

## Installation and Setup

### Prerequisites
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later)
- npm or yarn (Package manager)

### Steps to Install and Run Locally
1. Clone the repository:
    ```bash
    git clone https://github.com/Sufishaik/EmployeeWise.git

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Deployment

This application can be deployed on (https://employeewiseglobal.netlify.app/).

### Live Demo
The live demo of the deployed application can be found [here](https://vercel.com/).

## API Endpoints Used

### Login
- **Endpoint**: `POST /api/login`
- **Required Payload**:
    ```json
    {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
    ```

### Fetch Users
- **Endpoint**: `GET /api/users?page=1`

### Update User
- **Endpoint**: `PUT /api/users/{id}`

### Delete User
- **Endpoint**: `DELETE /api/users/{id}`

---

## Technologies Used
- **Frontend**: React.js, Redux
- **Backend**: Reqres API
- **Styling**: CSS, Tailwind CSS, Bootstrap, Material UI

---

## Contact
For queries or support, please contact: mahajnnchikt@gmail.com
