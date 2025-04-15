# SkyCast

SkyCast is a weather forecast application built using **React**. It provides a clean and interactive interface for viewing weekly weather forecasts for selected locations. The app leverages **Material-UI (MUI)** for styling and **Recharts** for rendering interactive charts.

---

## Features
- **Dynamic Weather Graph**: Displays temperature trends for the week.
- **Location Management**: Add and view weather forecasts for multiple cities.
- **Interactive UI**: Clean and responsive design styled with Material-UI.

---

## Components

### **1. ForecastGraph**
- **Purpose**: Displays a weekly weather forecast graph using **Recharts**.
- **Details**:
  - Shows day and night temperatures.
  - Includes a custom tooltip for additional weather details.
 

### **2. ForecastHeader**
- **Purpose**: Provides a header for the application.
- **Details**:
  - Displays the app's title and logo.


### **3. ForecastIndex**
- **Purpose**: Serves as the main entry point for the app.
- **Details**:
  - Manages the state for the current location.
  - Displays the graph and list of locations.
  - Centralizes the app's layout.

### **4. ForecastList**
- **Purpose**: Displays a list of available locations.
- **Details**:
  - Allows users to select a location to view its weather forecast.
  - Styled with Material-UI's grid system for responsiveness.

---

## Technologies Used

### **1. React**
- The app is built using React for a component-based architecture and efficient state management.

### **2. Material-UI (MUI)**
- Used for styling the app with prebuilt components and a consistent design system.

### **3. Recharts**
- Used for rendering the interactive weather forecast graph.

---

To run the project using `npm`, follow these steps:

---

### **How to Run the Project**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SkyCast
   ```

2. Install the dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

This will start the app in development mode. Any changes you make to the code will automatically reload the app in the browser.