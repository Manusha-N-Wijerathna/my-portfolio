export const projects = [
    {
        id: 'teablendai',
        title: 'TeaBlendAI',
        images: ['/projects/teablend-ai/dashboard.png', '/projects/teablend-ai/User Verification.png', '/projects/teablend-ai/Track Auction.png', '/projects/teablend-ai/System Logs.png', '/projects/teablend-ai/Violation Handeling.png', '/projects/teablend-ai/Admin Profile.png',],
        description: `Developing an AI-powered platform for the Sri Lankan tea industry that enables users to register, create and manage auction lots, and participate in live bidding. Building an AI chatbot with MCP server integration to answer natural language queries on tea pricing, blending analytics, and sales trends. Designing a real-time analytics dashboard with visualizations and summaries to support data-driven decision-making for buyers, sellers, and administrators.`,
        technologies: ['Next.js', 'Tailwind CSS', 'MSSQL', 'FastAPI', 'TypeScript', 'ShadcnUI', 'AceternityUI', 'LangChain'],
        githubUrl: 'https://github.com',
    },
    {
        id: 'portfolio',
        title: 'Personal Portfolio (This_Website)',
        images: ['/projects/portfolio/portf1.png','/projects/portfolio/portf2.png','/projects/portfolio/portf3.png','/projects/portfolio/portf4.png'],
        description: `Designing and developing a personal portfolio website to showcase my projects, skills, and professional journey. Built with a component-based architecture in Next.js, featuring custom canvas-based animations and a fully responsive multi-section layout.`,
        technologies: ['Next.js', 'Tailwind CSS', 'Lucide React'],
        githubUrl: 'https://github.com',
    },
    {
        id: 'SonicGlow-Cube',
        title: 'SonicGlow-Cube',
        images: ['/projects/cube/cube2.jpeg','/projects/cube/cube1.jpg','/projects/cube/cube3.jpeg',],
        description: `Designed and developed a fully programmable 8×8×8 LED Cube (512 LEDs) powered by an Arduino Mega, featuring multiple dynamic 3D animations, text displays, and visual effects. The system utilizes 74HC595 shift registers and transistor-based layer multiplexing to efficiently control all LEDs while maintaining smooth real-time rendering. To enhance usability, a web-based control platform was developed using React, Node.js,
         and WebSocket communication, enabling users to remotely select and manage LED patterns through a NodeMCU (ESP8266) wireless interface. This project demonstrates skills in embedded systems, electronics design, microcontroller programming, real-time communication, full-stack web development, and IoT integration**, combining hardware and software to create an interactive three-dimensional visual display system.`,
        technologies: ['Arduino Mega', '74HC595 shift registers', 'Transistor-based layer multiplexing', 'React', 'Node.js', 'WebSocket communication', 'NodeMCU (ESP8266)'],
        githubUrl: 'https://github.com',
    },

    {
        id: 'CodeBoard',
        title: 'CodeBoard - LMS',
        images: ['/projects/lms/lms1.png','/projects/lms/lms2.png','/projects/lms/lms3.png','/projects/lms/lms4.png','/projects/lms/lms5.png'],
        description: `This is a full-stack ICT Learning Management System (LMS) built with Next.js (frontend) and FastAPI (backend), using Supabase as the database and authentication layer. Students can register, wait for admin approval, then browse lessons organized by grade (10, 11, A/L) → units → lessons, where each lesson card opens a Google Drive video/resource link. Admins have a completely separate login and dashboard where they can create, edit, and delete lessons for any grade and unit, and verify or reject student accounts — controlling who gets access to the content. The whole system uses JWT tokens issued by Supabase Auth to securely protect routes, with role-based access ensuring students only see content and admins control everything behind the scenes.`,
        technologies: ['Next.js', 'FastAPI', 'Supabase', 'TailwindCSS', 'JWT tokens'],
        githubUrl: 'https://github.com',
    },

    {
        id: 'CodeBoard-rfid',
        title: 'CodeBoard - Attendace Marking system',
        images: ['/projects/rfid/rfid1.png','/projects/rfid/rfid2.png','/projects/rfid/rfid3.png','/projects/rfid/rfid4.png'],
        description: `A full-stack RFID-based attendance and fee management system built for a private ICT tuition class, designed to replace manual paper-based tracking. The system uses an ESP32 microcontroller paired with an MFRC-522 RFID reader to automatically mark student attendance when they tap an assigned key tag, sending data over WiFi to a FastAPI backend connected to an MSSQL database. The web dashboard, built with Next.js and Tailwind CSS, allows the teacher to register students (via RFID scan or manual entry), configure grade-wise monthly fees, mark payments after cash collection, and view detailed attendance and payment history reports — all from a single, easy-to-use interface accessible on any device on the local network.`,
        technologies: ['Next.js', 'FastAPI', 'MSSQL', 'TailwindCSS', 'JWT tokens', 'ESP32', 'MFRC-522 RFID reader', 'WiFi'],
        githubUrl: 'https://github.com',
    },
];