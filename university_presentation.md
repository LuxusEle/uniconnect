# University Management System (UniConnect) - System Overview

## Introduction
**UniConnect** is a modern, unified digital platform designed to streamline the complex administrative, academic, and financial operations of the university. It provides a tailored, intuitive experience for every member of the university ecosystem—Students, Academic Staff, Administrators, and Financial Officers.

The system is built on a **secure, real-time cloud infrastructure**, ensuring that data is always up-to-date, accessible from anywhere, and protected with enterprise-grade security.

---

## Key Capabilities at a Glance

*   **For Students**: A single hub for all academic and campus life needs. View results, pay fees, register for courses, and access welfare services without standing in queues.
*   **For Staff**: Digital tools to manage teaching, grading, and research. Automated attendance tracking and streamlined mark entry reduce administrative burden.
*   **For Administration**: Strategic oversight with real-time analytics. manage curriculum, users, and compliance from a central command center.
*   **For Finance (Bursar)**: Real-time financial reconciliation, automated fee tracking, and transparent auditing tools.

---

## System Structure (User-Wise)

The following diagrams illustrate the robust feature set available to each user role.

### 1. Student Portal
*Focus: Personal Academic Journey & Campus Services*

![Student Dashboard](documentation_assets/student_dashboard_1767153338745.png)

```mermaid
graph TD
    Student[Student Services]
    
    Student --> Overview[Overview]
    Overview --> Dashboard[Personal Dashboard]
    
    Student --> Academic[Academic Affairs]
    Academic --> Reg[Course Registration]
    Academic --> MyCourses[My Courses & Materials]
    Academic --> Results[Exam Results & GPA]
    Academic --> Attendance[Digital Attendance Record]
    
    Student --> Finance[Financial Services]
    Finance --> Wallet[Digital Wallet]
    Finance --> Fees[Fee Payments]
    Finance --> Mahapola[Mahapola Scholarship]
    Finance --> Bursary[Bursary Management]
    
    Student --> Welfare[Student Welfare]
    Welfare --> Hostel[Hostel Allocation]
    Welfare --> Health[Medical Centre]
    Welfare --> Career[Career Guidance]
```

### 2. Academic Staff Portal
*Focus: Teaching, Evaluation & Research*

![Staff Dashboard](documentation_assets/staff_dashboard_1767153616296.png)

```mermaid
graph TD
    Staff[Academic Staff]
    
    Staff --> Overview[Overview]
    Overview --> Dashboard[Staff Dashboard]
    Overview --> Schedule[Teaching Schedule]
    Overview --> Tasks[Admin Tasks]
    Overview --> Log[Work Log]
    
    Staff --> Courses[Course Management]
    Courses --> Modules[Module Planning]
    Courses --> Content[Upload Learning Materials]
    Courses --> Attendance[Digital Roll Call]
    Courses --> Eligibility[Exam Eligibility Checks]
    
    Staff --> Exams[Exams & Grading]
    Exams --> Grading[Final Grading]
    Exams --> Marks[Enter Continuous Assessment]
    Exams --> Plagiarism[AI Plagiarism Check]
    
    Staff --> Research[Research & Impact]
    Research --> Pubs[Publications Repository]
    Research --> Grants[Grant Management]
```

### 3. Administration Portal (Registrar & VC)
*Focus: Governance, Strategy & Operations*

![Admin Dashboard](documentation_assets/admin_dashboard_1767153675896.png)

```mermaid
graph TD
    Admin[Administration]
    
    Admin --> Lead[Leadership & Strategy]
    Lead --> Overview[Executive Overview]
    Lead --> Analytics[University Analytics]
    Lead --> QA[Quality Assurance]
    Lead --> Plan[Strategic Planning]
    
    Admin --> Reg[Registrar Operations]
    Reg --> Users[User Management]
    Reg --> Curr[Curriculum Development]
    Reg --> Exams[Exam Scheduling]
    Reg --> MOU[International MoUs]
    
    Admin --> Fin[Finance Oversight]
    Fin --> Fees[Fee Structures]
    Fin --> Funds[Fund Allocation]
    Fin --> Assets[Asset Management]
    Fin --> Audit[Internal Audit]
    
    Admin --> Sys[System]
    Sys --> Settings[Configuration]
```

### 4. Bursar (Finance) Portal
*Focus: Financial Integrity & Reconciliation*

```mermaid
graph TD
    Bursar[Bursar Office]
    
    Bursar --> Fin[Financial Operations]
    Fin --> Dashboard[Financial Overview]
    Fin --> Reconcile[Daily Reconciliation]
    Fin --> Payments[Verify Payments]
    Fin --> Reports[Financial Reporting]
```

---

## Role-Based Menu Explorer & Walkthroughs

This section describes exactly what a user sees and does in each menu option.

### 1. Student Portal Navigation
*Primary Goal: Academic Success & Financial Clarity*

| Menu Section | Item | Action / Walkthrough |
| :--- | :--- | :--- |
| **Overview** | **Dashboard** | **View**: Check GPA, Semester Status, and Wallet Balance.<br>**Action**: Click widgets to jump to Results or Payments. |
| **Academic** | **Course Reg.** | **Step 1**: Browse open courses for the semester.<br>**Step 2**: Click "Enroll" on desired modules.<br>**Step 3**: System checks prerequisites > Confirms enrollment. |
| | **My Courses** | **View**: List of active enrolled modules.<br>**Action**: Click a module to access learning materials, assignments, and announcements. |
| | **Results** | **View**: Full academic transcript and GPA calculation.<br>**Action**: Download official semester reports (PDF). |
| | **Attendance** | **View**: Check attendance percentage per module.<br>**Alert**: Flags if attendance drops below 80%. |
| **Financial** | **My Wallet** | **View**: Total balance, scholarship inflows, and payment outflows.<br>**Action**: Top up wallet via payment gateway. |
| | **Fees** | **View**: Outstanding tuition or exam fees.<br>**Action**: Click "Pay Now" > Select Payment Method > Generates Receipt. |
| | **Mahapola** | **View**: Scholarship installment status and history.<br>**Action**: Acknowledge receipt of funds. |
| | **Bursary** | **Action**: Apply for financial aid > Upload Income Proof > Submit for Bursar review. |
| **Welfare** | **Hostel** | **Action**: Apply for accommodation > Select Room Type > View Allocation Status. |
| | **Health** | **Action**: Book medical appointments > View digital medical history. |
| | **Career** | **Action**: View job board > Book counseling sessions. |

### 2. Academic Staff Navigation
*Primary Goal: Efficient Teaching & Evaluation*

| Menu Section | Item | Action / Walkthrough |
| :--- | :--- | :--- |
| **Overview** | **Dashboard** | **View**: Upcoming Classes timeline and "To-Do" list (e.g., "Grade CS101"). |
| | **Schedule** | **View**: Weekly teaching timetable with room numbers. |
| | **Tasks** | **Action**: View administrative tasks assigned by Dean/HoD > Mark as "Done". |
| | **Work Log** | **Action**: Auto-generated log of teaching hours for payroll claims. |
| **Courses** | **Modules** | **View**: List of modules taught this semester.<br>**Action**: Select to manage specific course details. |
| | **Upload Content** | **Step 1**: Select Module.<br>**Step 2**: Drag & Drop Lecture Slides/Notes.<br>**Step 3**: Publish to Student Portal. |
| | **Digital Roll** | **Step 1**: Select Active Class.<br>**Step 2**: Display QR Code or Manually check students присутing. |
| | **Eligibility** | **View**: Auto-generated list of students eligible for exams based on attendance. |
| **Exams** | **Grading** | **Action**: Input final letter grades for verified students > Submit to Exam Board. |
| | **Enter Marks** | **Action**: Enter continuous assessment (assignment/mid-term) raw marks. |
| | **Plagiarism** | **Tool**: Upload student assignment > AI scans against repository > Returns Similarity Report. |
| **Research** | **Publications** | **Action**: Log new research papers > Updates academic profile. |
| | **Grants** | **Action**: Track grant utilization and detailed expenditure. |

### 3. Administration Navigation (Registrar/VC)
*Primary Goal: High-Level Oversight & Configuration*

| Menu Section | Item | Action / Walkthrough |
| :--- | :--- | :--- |
| **Leadership** | **Overview** | **View**: Campus pulse (Active Users, Financial Health, Critical Alerts). |
| | **Analytics** | **Tool**: Interactive charts showing multi-year trends (Enrollment, Pass Rates). |
| | **QA Metrics** | **View**: Compliance with UGC/Quality Assurance standards. |
| | **Strategic Plan** | **Action**: Define and track long-term university KPIs. |
| **Registrar** | **Users** | **Action**: Create/Edit User Accounts > Reset Passwords > Assign Roles. |
| | **Curriculum** | **Action**: Define new Degrees/Courses > Set Credits & Prerequisites. |
| | **Exam Sched.** | **Action**: Create exam timetables > Allocate exam halls & invigilators. |
| | **Intl. MoU** | **Action**: Manage partnerships with foreign universities. |
| **Finance** | **Fee Tracking** | **View**: Real-time monitor of fee collection rates across faculties. |
| | **Funds** | **Action**: Allocate budget to departments. |
| | **Assets** | **Action**: Inventory management (Buildings, Labs, Equipment). |
| | **Audit** | **Report**: Generate system-wide activity logs for internal audit. |
| **System** | **Config** | **Action**: Set global variables (Academic Year, Semester Dates). |

### 4. Bursar Navigation
*Primary Goal: Financial Integrity*

| Menu Section | Item | Action / Walkthrough |
| :--- | :--- | :--- |
| **Finance** | **Finance Home** | **View**: Cash flow summary, Daily Collection, Pending Approvals. |
| | **Reconcile** | **Workflow**: <br>1. System flags mismatched payments.<br>2. Bursar reviews bank feed vs system records.<br>3. Click "Reconcile" to force match or "Flag" to investigate. |

---

## Role Responsibility Matrix

This matrix clearly defines who is responsible for each core operation within the system.

| Operational Area | Action | **Student** | **Staff** | **Admin (Reg)** | **Bursar** |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Onboarding** | Account Creation | Applies | Verifies Docs | Final Approval | - |
| **Coursework** | Enrollment | **Initiates** | Advises | Configures | - |
| | Upload Content | Consumes | **Uploads** | - | - |
| | Attendance | Checks | **Marks** | Monitors | - |
| **Examinations** | Scheduling | View | - | **Creates** | - |
| | Grading | View | **Enters** | Publishes | - |
| **Finance** | Fee Payment | **Pays** | - | Sets Fees | **Verifies** |
| | Scholarship | Receives | - | - | Disburses |
| | Reconciliation | - | - | Audit | **Executes** |
| **Welfare** | Notifications | View | Send | Broadcast | - |
---

## Service Blueprint - Visual Evidence
*Real-time snapshots of role-based workflows.*

### 1. Student: Course Registration & Financials
*Action: Browsing active modules and checking wallet balance.*
![Student Course Registration](documentation_assets/student_course_reg_1767154439438.png)
*(Above: Student selects modules for the upcoming semester)*

### 2. Staff: Academic Administration
*Action: Managing modules and entering grades.*
![Staff Grading Portal](documentation_assets/staff_grading_1767154553064.png)
*(Above: Interface for entering and finalizing student marks)*

### 3. Admin: System Governance
*Action: Managing user access and scheduling exams.*
![Admin User Management](documentation_assets/admin_users_1767154817966.png)
*(Above: Registrar's view for verifying and managing student/staff accounts)*

### 4. Bursar: Financial Reconciliation
*Action: Verifying payments and auditing streams.*
![Bursar Reconciliation](documentation_assets/bursar_reconcile_1767154961971.png)
*(Above: Active workspace for matching bank feeds with system receipts)*

---

## Interconnected Operational Workflows

### Workflow 1: The "New Student" Lifecycle (Onboarding)
**Goal**: Move a user from an "Applicant" to an "Active Student".

1.  **Student (External)**: Visits Portal > "Apply Now" > Fills Profile > Uploads NIC/A-Level Results.
2.  **System**: Creates "Provisional" account. Locked from Course Reg.
3.  **Admin (Registrar)**: Receives "New Intake" Alert > Reviews Documents > Clicks "Approve".
4.  **System**: Unlocks Student Account > Generates Student ID > Sends Welcome Email.
5.  **Student**: Logs in > Sees "Complete Registration Payment" task.
6.  **Student**: Pays Registration Fee via Gateway.
7.  **Bursar**: Payment auto-verified (or manual checks).
8.  **System**: Status updated to "Active" > "Course Reg" menu unlocks.

### Workflow 2: The "External Course" Application (Marketplace)
**Goal**: Allow a student to take an extra qualification (e.g., CIMA/MBA).

1.  **Student**: Navigation > **My Courses** > "Browse External Courses".
2.  **System**: Filters courses by Student's eligibility (e.g., Year 3 only).
3.  **Student**: Selects "MBA Foundation" > Clicks "Apply".
4.  **Admin**: "Curriculum" > Sees Application > Checks capacity > Approves.
5.  **Student**: Received "Offer Letter" notification > "Fees" menu updates.
6.  **Student**: Pays Module Fee (Installment 1).
7.  **System**: Auto-enrolls student in "MBA Foundation" module appearing in **My Courses**.

---

## Request for Stakeholder Input

To ensure UniConnect fits your specific university culture, we need your input on:
1.  **Approval Hierarchies**: Who specifically signs off on new student intakes? (Dean vs Registrar?)
2.  **Fee Structures**: Are there specific installment plans for External Courses?
3.  **Legacy Data**: Do we need to migrate existing records?
4.  **Custom Workflows**: Are there unique departmental processes we should model?
