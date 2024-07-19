# React Cine Project

## Requirements

Before setting up this project, ensure you have the following installed:

- **XAMPP** (for PHP and MySQL)
- **Node.js** with **npm**

## Steps for Installation

1. **Clone the repository**
   - make a "https://github.com/rawojeda/TFG_react_cine.git" in the location you want to download the proyect.

2. **Install Dependencies**
   - Open a terminal (cmd, PowerShell, Git Bash, etc.) in the unzipped folder and run the following command:
     ```bash
     git install
     ```

3. **Start XAMPP**
   - Open XAMPP and start the "Apache" and "MySQL" modules.

4. **Set Up the Database**
   - Click the "Admin" button for MySQL in the XAMPP control panel. This will open phpMyAdmin in your browser.
   - In phpMyAdmin, create a new database named `films`.
   - Import the `films.sql` file located in the `resources' > 'bd-back` folder into the `films` database.

5. **Move Files to htdocs**
   - Copy the `bd-back` located in the "resources" folder into the `htdocs` directory of your XAMPP installation (default is `C:\xampp\htdocs` on Windows).

6. **Configure Database Connection**
   - Edit the `conectar.php` file in the `bd-back` folder with your MySQL root user credentials (default is `root` without a password in XAMPP).

7. **Start the Application**
   - Open a terminal in the project folder and run the following command:
     ```bash
     npm start
     ```

8. **Access the Application**
   - Once the React development server is running, you can view the application in your browser by navigating to `http://localhost:3000` (React typically uses port 3000 by default).

## Summary of Commands

```bash
git install
npm start
