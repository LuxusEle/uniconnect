export interface SemesterResult {
    id: string;
    semester: string; // "Year 1 Semester 1"
    gpa: number;
    credits: number;
    status: 'Pass' | 'Fail' | 'Probation';
    courses: CourseResult[];
}

export interface CourseResult {
    code: string;
    title: string;
    credits: number;
    grade: string; // "A+", "B", etc.
    status: 'Pass' | 'Fail';
}

export const MOCK_STUDENT_RESULTS: SemesterResult[] = [
    {
        id: "y1s1",
        semester: "Year 1 Semester 1",
        gpa: 3.8,
        credits: 15,
        status: "Pass",
        courses: [
            { code: "CS101", title: "Introduction to Computer Science", credits: 3, grade: "A", status: "Pass" },
            { code: "MA101", title: "Calculus I", credits: 4, grade: "A-", status: "Pass" },
            { code: "CS102", title: "Programming Fundamentals", credits: 4, grade: "A+", status: "Pass" },
            { code: "EN101", title: "Technical Communication", credits: 2, grade: "B+", status: "Pass" },
            { code: "ST101", title: "Statistics I", credits: 2, grade: "A", status: "Pass" },
        ]
    },
    {
        id: "y1s2",
        semester: "Year 1 Semester 2",
        gpa: 3.65,
        credits: 16,
        status: "Pass",
        courses: [
            { code: "CS103", title: "Data Structures", credits: 4, grade: "B+", status: "Pass" },
            { code: "MA102", title: "Linear Algebra", credits: 3, grade: "A", status: "Pass" },
            { code: "CS104", title: "Database Systems", credits: 4, grade: "A-", status: "Pass" },
            { code: "PH101", title: "Physics for Computing", credits: 3, grade: "B", status: "Pass" },
            { code: "EL101", title: "Electronics Basis", credits: 2, grade: "B+", status: "Pass" },
        ]
    },
    {
        id: "y2s1",
        semester: "Year 2 Semester 1",
        gpa: 3.9,
        credits: 15,
        status: "Pass",
        courses: [
            { code: "CS201", title: "Algorithms", credits: 4, grade: "A", status: "Pass" },
            { code: "CS202", title: "Software Engineering", credits: 3, grade: "A+", status: "Pass" },
            { code: "CS203", title: "Operating Systems", credits: 4, grade: "A", status: "Pass" },
            { code: "MA201", title: "Discrete Mathematics", credits: 3, grade: "A", status: "Pass" },
            { code: "IS201", title: "Information Systems", credits: 1, grade: "A", status: "Pass" },
        ]
    }
];
