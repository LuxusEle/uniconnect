import datetime
import os

# --- Configuration ---
CONFIG = {
    "system_name": "University Management System (UniConnect)",
    "version": "3.1 Enterprise Edition",
    "date": datetime.date.today().strftime("%Y-%m-%d"),
    "author": "UniConnect Development Team",
    "status": "100% Core Functionality",
    "output_filename": "UniConnect_Guide_v3.1.md"
}

def get_header(config):
    return f"""# {config['system_name']} - Advanced System Guide
**Version:** {config['version']}  
**Date:** {config['date']}  
**Author:** {config['author']}

---
"""

def get_executive_summary(config):
    return f"""## 1. Executive Summary
This document provides a comprehensive technical and operational overview of **{config['system_name']}**. Designed as a unified digital ecosystem, it integrates Academic, Administrative, and Community functions into a single "Source of Truth," eliminating data silos and enhancing institutional governance.

**Current Status:** The system has achieved **{config['status']}**, replacing all prototyping placeholders with database-backed, fully interactive modules.

---
"""

def get_architecture_section():
    return """## 2. System Architecture & Security

### 2.1 Technology Stack
The platform is built on a modern, scalable architecture designed for high availability:
* **Frontend:** Next.js (React) with Tailwind CSS.
* **Backend / Database:** Firebase (Google Cloud Platform) providing Firestore and Authentication.
* **Deployment:** Vercel Edge Network.

### 2.2 Security Model
* **Role-Based Access Control (RBAC):**
    * *Admin*: Full system write access.
    * *Staff*: Write access to specific academic collections.
    * *Student*: Read-only access to global data; Write access to personal apps.
* **Audit Trails:** Immutable logging for all financial and strategic actions.

---
"""

def get_workflows():
    return """## 3. Business Process Workflows

### 3.1 Financial Disbursement Flow (Mahapola/Bursary)
```mermaid
sequenceDiagram
    participant Student
    participant System
    participant Admin
    
    Student->>System: Submit Mahapola Application
    System->>System: Validate Enrollment Status
    System->>Admin: Flag for Review
    Admin->>System: Verify Eligibility
    alt Approved
        Admin->>System: Authorize Disbursement
        System->>Student: Notification: Funds Disbursed
    else Rejected
        Admin->>System: Log Rejection
        System->>Student: Notification: Rejected
    end
```

### 3.2 Academic Accountability Flow
```mermaid
graph LR
    A[Staff] -->|Log Activity| B(Work Log)
    B -->|Categorize| C{Type}
    C -->|Teaching| D[Academic Audit]
    C -->|Research| E[Research Metrics]
    D & E --> F[Dean's Dashboard]
    F -->|Report| G[University Council]
```

---
"""

def get_modules():
    # Modules with features and corresponding local images
    modules = [
        {
            "title": "Administration & Strategic Planning",
            "user": "Administrator",
            "features": [
                (
                    "Quality Assurance Dashboard", 
                    "Monitors institutional KPIs and strategic goals.", 
                    "![QA Dashboard](public/assets/screenshots/admin_qa_metrics_1767170807210.png)"
                ),
                (
                    "University Funds Management", 
                    "Centralized ledger for tracking capital and operational funds.", 
                    "![Funds List](public/assets/screenshots/admin_funds_1767170821462.png)"
                ),
                (
                    "Internal Audit", 
                    "Risk management and compliance governance.", 
                    "![Internal Audit](public/assets/screenshots/admin_audit_1767170845706.png)"
                )
            ]
        },
        {
            "title": "Student Lifecycle Management",
            "user": "Student",
            "features": [
                (
                    "Financial Aid (Mahapola)", 
                    "Streamlines scholarship distribution and installment tracking.", 
                    "![Mahapola Dashboard](public/assets/screenshots/student_mahapola_1767170929930.png)"
                ),
                (
                    "Welfare & Accommodation", 
                    "Manages hostel applications based on distance priority rules.", 
                    "![Hostel Accommodation](public/assets/screenshots/student_hostel_1767170950446.png)"
                )
            ]
        },
        {
            "title": "Academic Staff Management",
            "user": "Lecturer / Professor",
            "features": [
                (
                    "Accountability Model (Work Log)", 
                    "Logs daily activities (Teaching, Research) for performance appraisal.", 
                    "![Work Accountability Log](public/assets/screenshots/staff_work_log_1767171106860.png)"
                ),
                (
                    "Research Ecosystem", 
                    "Aggregates research output, citations, and grant utilization.", 
                    "![Research Publications](public/assets/screenshots/staff_publications_1767171134577.png)"
                )
            ]
        }
    ]

    text = "## 4. Operational Module Guide\n\n"

    for mod in modules:
        text += f"### {mod['title']}\n*Primary User: {mod['user']}*\n\n"
        for feature_name, desc, img_tag in mod['features']:
            text += f"#### **{feature_name}**\n"
            text += f"* **Function:** {desc}\n"
            text += f"{img_tag}\n\n"
        text += "---\n\n"
            
    return text

def get_footer():
    return """## 5. System Configuration & Support

* **Generic Module Engine:** Allows deployment of new modules via JSON configuration without code changes.
* **Support:** 
    * Level 1: Student Union / IT Helpdesk
    * Level 2: System Administrator
    * Level 3: Development Team

*Generated automatically by UniConnect DocGenerator.*
"""

def generate_document():
    print(f"Generating documentation for {CONFIG['system_name']}...")
    
    full_content = (
        get_header(CONFIG) +
        get_executive_summary(CONFIG) +
        get_architecture_section() +
        get_workflows() +
        get_modules() +
        get_footer()
    )

    try:
        with open(CONFIG['output_filename'], "w", encoding="utf-8") as f:
            f.write(full_content)
        print(f"✅ Success! Document saved as: {CONFIG['output_filename']}")
    except IOError as e:
        print(f"❌ Error writing file: {e}")

if __name__ == "__main__":
    generate_document()
