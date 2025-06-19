# 🎮 eFootball Daily Box Event Tracker

**"Reward"** is one of the most favorite words for a gamer. Every gamer knows the joy of unlocking in-game rewards. As a passionate gamer myself, while playing **eFootball** — one of the most popular football games for smartphone users — I discovered a pattern that helps win more rewards during the daily box event.

In this event, players take a penalty shot once per day. If they **score**, they earn more progression points than if they miss. I observed that the AI goalkeeper often **jumps in the opposite direction of the previous day's jump**. So, if you can remember the direction of your shot and where the goalkeeper jumped the previous day, you have a better chance of scoring the next time.

That’s where this app comes in.

This **data-driven web app** helps track daily box event data in eFootball. It allows you to input and visualize your gameplay history on a calendar, making it easier to analyze patterns and increase your chances of winning rewards.

---

## ✨ Features

### ✅ User Authentication
- Users can **sign up** and **log in** securely.

### 📅 Interactive Calendar
- After logging in, users are presented with a **calendar view**.
- Each day is displayed as a tile on the calendar.

### ✏️ Daily Event Input
- Every calendar tile shows an **edit/open icon** in the top-right corner.
- Clicking it opens a **dialog** where users can input:
  - **Shot Direction**
  - **Goalkeeper Direction**
  - **Scored or Not**

### 📊 Data Visualization on Calendar
- After saving data for a specific date:
  - **Top-left** displays the **shot direction**
  - **Bottom-left** shows the **goalkeeper's jump direction**
  - **Bottom-right** indicates whether the shot was **scored**

### 🧾 Calendar Legend
- A **legend section** below the calendar explains all the symbols used for easy understanding.

### 🗂️ Daily Details Box
- A **details box** below the calendar shows the full breakdown of the **currently selected date**.

---

## 📌 Use Case

This app is perfect for **eFootball players** who want to:
- Track their daily box event performance
- Analyze goalkeeper movement patterns
- Strategize future shots to score more
- Earn in-game rewards more efficiently

---

## 🛠 Tech Stack

- **Frontend**: React  
- **Styling**: Tailwind CSS  
- **Authentication & Database**: Appwrite  
- **Icons**: Lucide React  
- **Calendar**: react-calendar  

---

## 🚀 Future Improvements (Planned)

- 📈 Stats & analytics dashboard  
- 🧠 AI-based shot suggestions  
- 🔔 Daily reminders/notifications  

---

## 📄 License

This project is for personal use. You are free to modify and expand it to suit your own gameplay tracking needs.
