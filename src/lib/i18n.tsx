"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "VI";

type Dictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const dict: Dictionary = {
  EN: {
    // Nav
    "nav.name": "Nguyen Minh Hung",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    
    // Intro
    "intro.role": "Software Consultant",
    "intro.subtitle": "Helping Businesses Build Digital Solutions.",
    "intro.enter": "ENTER",
    
    // Hero
    "hero.badge": "Available for new opportunities",
    "hero.title1": "Crafting Digital",
    "hero.title2": "Excellence.",
    "hero.desc": "I'm Nguyen Minh Hung, a Software Consultant at SID CORP. I bridge the gap between business needs and powerful technical solutions.",
    "hero.btn.start": "Start a Project",
    "hero.btn.about": "About Me",
    "hero.scroll": "Scroll",
    "hero.proof1": "10+ Years",
    "hero.proof2": "50+ Experts",
    
    // About
    "about.tag": "About Me",
    "about.title": "Consulting with Purpose.",
    "about.p1": "I am a Software Consultant at SID CORP, dedicated to transforming complex business challenges into elegant, scalable digital solutions. With a deep understanding of enterprise architecture and modern web technologies, I help businesses navigate their digital transformation journey.",
    "about.p2": "My philosophy revolves around human-centric design and robust engineering. Whether it's architecting a complex ERP system, designing an intuitive CRM, or building high-performance web applications, I ensure every line of code adds tangible business value.",
    "about.s1": "Strategy",
    "about.s2": "Engineering",
    "about.s3": "Design",
    "about.qf.title": "Quick Facts",
    "about.qf.exp": "Years of Experience",
    "about.qf.exp.val": "4+",
    "about.qf.proj": "Projects Delivered",
    "about.qf.proj.val": "20+",
    "about.qf.tech": "Technologies",
    "about.qf.tech.val": "15+",
    "about.journey.title": "Signature Journey",
    "about.journey.1.time": "2026 - Present",
    "about.journey.1.role": "Software Consultant",
    "about.journey.1.company": "SID CORP",
    "about.journey.2.time": "2025",
    "about.journey.2.role": "Fullstack Developer",
    "about.journey.2.company": "LightHuman HR Solutions",
    "about.journey.3.time": "2022 - 2024",
    "about.journey.3.role": "IT Collaborator",
    "about.journey.3.company": "HUTECH University",
    "about.tech.title": "Core Competencies",
    "about.tech.tab1": "Engineering",
    "about.tech.tab2": "Consulting",
    "about.bento.frontend": "Frontend & UI",
    "about.bento.langs": "Languages",
    "about.bento.backend": "Backend & DB",
    "about.bento.mobile": "Mobile & Apps",
    "about.bento.arch": "Architecture",
    "about.bento.process": "Process & Agile",
    "about.bento.strategy": "Strategy",
    "about.bento.enterprise": "Enterprise Solutions",
    "about.quote": "\"Code is poetry, logic is art, and architecture is the foundation of the future.\"",
    
    // How I Help
    "help.tag": "The Process",
    "help.title": "How I Help You Succeed",
    "help.step1.t": "Discovery & Strategy",
    "help.step1.d": "We start by deeply understanding your business goals, target audience, and current challenges. This phase involves thorough research to define a solid strategic foundation.",
    "help.step2.t": "Solution Consulting",
    "help.step2.d": "Leveraging my expertise at SID CORP, I architect a scalable, future-proof solution tailored to your exact needs, selecting the right technologies and frameworks.",
    "help.step3.t": "Agile Development",
    "help.step3.d": "We build your product using modern, high-performance tech stacks. Regular updates and agile methodologies ensure you are always in the loop.",
    "help.step4.t": "Deployment & Scaling",
    "help.step4.d": "Seamless deployment to cloud infrastructure ensuring high availability. We implement robust CI/CD pipelines for smooth and safe updates.",
    "help.step5.t": "Support & Evolution",
    "help.step5.d": "Our partnership doesn't end at launch. I provide continuous support, optimization, and feature enhancements to keep your product ahead of the curve.",
    
    // SID Corp
    "sid.tag": "Our Company",
    "sid.title1": "Empowering Future with",
    "sid.desc": "At SID CORP, we specialize in delivering enterprise-grade solutions. From AI integrations and ERP systems to complete digital transformations, we are the trusted technology partner for industry leaders. My role as a Software Consultant is to ensure these solutions perfectly align with your business objectives.",
    "sid.btn": "Visit SID CORP Website",
    "sid.stat1": "Years of Excellence",
    "sid.stat2": "Dedicated Experts",
    "sid.stat3": "Global Partners",
    "sid.stat4": "Client Satisfaction",
    
    // Services
    "srv.tag": "Expertise",
    "srv.title": "Premium Services",
    "srv.scroll": "Scroll down to explore",
    "srv.1.t": "AI Solutions",
    "srv.1.d": "Integrate intelligent automation and data insights.",
    "srv.1.f1": "Machine Learning", "srv.1.f2": "NLP", "srv.1.f3": "Predictive Analytics",
    "srv.2.t": "ERP Systems",
    "srv.2.d": "Streamline enterprise resources and operations.",
    "srv.2.f1": "Odoo", "srv.2.f2": "SAP", "srv.2.f3": "Custom ERP Solutions",
    "srv.3.t": "CRM Integration",
    "srv.3.d": "Enhance customer relationships and sales tracking.",
    "srv.3.f1": "Salesforce", "srv.3.f2": "HubSpot", "srv.3.f3": "Customer Data Platform",
    "srv.4.t": "Web Development",
    "srv.4.d": "High-performance, scalable web applications.",
    "srv.4.f1": "Next.js", "srv.4.f2": "React", "srv.4.f3": "Microservices",
    "srv.5.t": "Mobile Apps",
    "srv.5.d": "Native and cross-platform mobile experiences.",
    "srv.5.f1": "Flutter", "srv.5.f2": "React Native", "srv.5.f3": "iOS & Android",
    "srv.6.t": "Automation",
    "srv.6.d": "Optimize workflows to save time and reduce errors.",
    "srv.6.f1": "RPA", "srv.6.f2": "Workflow Optimization", "srv.6.f3": "CI/CD",
    "srv.7.t": "Cloud Architecture",
    "srv.7.d": "Secure, scalable, and resilient cloud infrastructure.",
    "srv.7.f1": "AWS", "srv.7.f2": "Google Cloud", "srv.7.f3": "DevOps",
    "srv.8.t": "UI/UX Design",
    "srv.8.d": "User-centric interfaces that drive engagement.",
    "srv.8.f1": "Figma", "srv.8.f2": "Prototyping", "srv.8.f3": "User Research",
    
    // Industries
    "ind.tag": "Industries We Serve",
    "ind.title": "Transforming Every Sector",
    "ind.1.title": "E-commerce & Retail",
    "ind.1.sub": "Sell on any channel, manage in one place.",
    "ind.1.desc": "Omnichannel selling, headless architecture, print-on-demand, and AI integrations for retail brands and marketplaces.",
    "ind.1.f1": "Omnichannel", "ind.1.f2": "Headless Architecture", "ind.1.f3": "Print on Demand (POD)", "ind.1.f4": "AI Integration",
    "ind.1.projects": "DodgePrint, ePOD, Koarooriginal",
    "ind.2.title": "HR & Internal Management",
    "ind.2.sub": "Digitalize internal operations, from timekeeping to KPI.",
    "ind.2.desc": "HR digitalization, automated payroll, and KPI dashboards for enterprise operation teams.",
    "ind.2.f1": "Digital HR", "ind.2.f2": "Automated Payroll", "ind.2.f3": "KPI Dashboard",
    "ind.2.projects": "SidPeak",
    "ind.3.title": "Real Estate & Leasing",
    "ind.3.sub": "Manage rooms, contracts, and cash flow on one app.",
    "ind.3.desc": "Room management, contracts, revenue/expenses, and complete leasing operations in a single application.",
    "ind.3.f1": "Room Management", "ind.3.f2": "Contract Management", "ind.3.f3": "Revenue & Expenses", "ind.3.f4": "Management App",
    "ind.3.projects": "AnHome",
    "ind.4.title": "Customer Support (CX)",
    "ind.4.sub": "One customer, one profile, all support channels.",
    "ind.4.desc": "Omnichannel helpdesk, customer data platform (CDP), email verification, and automation for support teams.",
    "ind.4.f1": "Omnichannel Helpdesk", "ind.4.f2": "Customer Data Platform (CDP)", "ind.4.f3": "Email Verification", "ind.4.f4": "Automation",
    "ind.4.projects": "Helpdesk, Bozuro, BounceCheck",
    "ind.all.title": "All Industries",
    "ind.all.q": "Don't see your industry?",
    "ind.all.desc1": "SID Corp is a software and technology solutions development company for enterprises, with a team of over 120 people. We develop custom software for all industries.",
    "ind.all.desc2": "Actual results from projects are compiled on the products & projects page.",
    "ind.all.desc3": "SID Corp — custom software development",

    // Process
    "process.title": "My Consulting Process",
    "process.1.t": "01. Listen",
    "process.1.d": "Understand your business problem and practical workflows deeply.",
    "process.2.t": "02. Design",
    "process.2.d": "Propose optimal architectural solutions and deployment roadmaps.",
    "process.3.t": "03. Develop",
    "process.3.d": "Build systems, test rigorously, and deliver on time.",
    "process.4.t": "04. Accompany",
    "process.4.d": "Support operations, optimize performance, and scale long-term.",
    
    // Blog
    "blog.tag": "Insights & Thoughts",
    "blog.title": "Latest Articles",
    "blog.viewAll": "View All Posts",
    "blog.read": "Read Article",
    "blog.close": "Close article",
    
    // Contact
    "contact.tag": "Let's Work Together",
    "contact.title1": "Ready to build something",
    "contact.title2": "extraordinary?",
    "contact.desc": "Whether you need a complete digital transformation, a scalable web application, or expert consulting, I'm just a message away.",
    "contact.copyright": "© 2026 Nguyen Minh Hung. Software Consultant at SID CORP.",

    // Gallery
    "gallery.tag": "Featured Projects",
    "gallery.title1": "Key Engagements at",
    "gallery.proj1.desc": "Omnichannel selling: Etsy, Amazon, Shopify, ShopBase — list once, sell everywhere.",
    "gallery.proj2.desc": "High-performance AI-integrated online storefront platform.",
    "gallery.proj3.desc": "Customer data platform helping businesses personalize experiences and optimize operations.",
    "gallery.proj4.desc": "Comprehensive internal management solution, optimizing workflows for businesses.",
  },
  VI: {
    // Nav
    "nav.name": "Nguyễn Minh Hùng",
    "nav.about": "Về tôi",
    "nav.services": "Dịch vụ",
    "nav.blog": "Bài viết",
    "nav.contact": "Liên hệ",
    
    // Intro
    "intro.role": "Chuyên gia Tư vấn Phần mềm",
    "intro.subtitle": "Giúp doanh nghiệp xây dựng giải pháp số.",
    "intro.enter": "VÀO TRANG",
    
    // Hero
    "hero.badge": "Sẵn sàng cho các dự án mới",
    "hero.title1": "Kiến tạo Sự",
    "hero.title2": "Hoàn hảo.",
    "hero.desc": "Tôi là Nguyễn Minh Hùng, Chuyên gia Tư vấn Phần mềm tại SID CORP. Tôi là cầu nối giữa nhu cầu kinh doanh và các giải pháp công nghệ mạnh mẽ.",
    "hero.btn.start": "Bắt đầu Dự án",
    "hero.btn.about": "Về Tôi",
    "hero.scroll": "Cuộn xuống",
    "hero.proof1": "10+ Năm",
    "hero.proof2": "50+ Chuyên gia",
    
    // About
    "about.tag": "Về Tôi",
    "about.title": "Tư vấn có Mục đích.",
    "about.p1": "Tôi là Chuyên gia Tư vấn Phần mềm tại SID CORP, tận tâm biến các thách thức kinh doanh phức tạp thành các giải pháp kỹ thuật số thanh lịch và có khả năng mở rộng. Với sự hiểu biết sâu sắc về kiến trúc doanh nghiệp và công nghệ web hiện đại, tôi giúp các doanh nghiệp điều hướng hành trình chuyển đổi số của họ.",
    "about.p2": "Triết lý của tôi xoay quanh thiết kế lấy con người làm trung tâm và kỹ thuật mạnh mẽ. Cho dù đó là kiến trúc một hệ thống ERP phức tạp, thiết kế một CRM trực quan, hay xây dựng các ứng dụng web hiệu suất cao, tôi đảm bảo mỗi dòng code đều tăng thêm giá trị kinh doanh rõ rệt.",
    "about.s1": "Chiến lược",
    "about.s2": "Kỹ thuật",
    "about.s3": "Thiết kế",
    "about.qf.title": "Chỉ số nhanh",
    "about.qf.exp": "Năm kinh nghiệm",
    "about.qf.exp.val": "4+",
    "about.qf.proj": "Dự án hoàn thành",
    "about.qf.proj.val": "20+",
    "about.qf.tech": "Công nghệ",
    "about.qf.tech.val": "15+",
    "about.journey.title": "Hành trình sự nghiệp",
    "about.journey.1.time": "2026 - Hiện tại",
    "about.journey.1.role": "Chuyên gia Tư vấn Phần mềm",
    "about.journey.1.company": "SID CORP",
    "about.journey.2.time": "2025",
    "about.journey.2.role": "Lập trình viên Fullstack",
    "about.journey.2.company": "Công ty Giải pháp Nhân sự LightHuman",
    "about.journey.3.time": "2022 - 2024",
    "about.journey.3.role": "Cộng tác viên Phòng CNTT",
    "about.journey.3.company": "Đại học Công nghệ TP.HCM (HUTECH)",
    "about.tech.title": "Năng Lực Cốt Lõi",
    "about.tech.tab1": "Kỹ Thuật",
    "about.tech.tab2": "Tư Vấn",
    "about.bento.frontend": "Giao diện & UI",
    "about.bento.langs": "Ngôn ngữ Lập trình",
    "about.bento.backend": "Backend & CSDL",
    "about.bento.mobile": "Di động & Ứng dụng",
    "about.bento.arch": "Kiến trúc Hệ thống",
    "about.bento.process": "Quy trình & Agile",
    "about.bento.strategy": "Chiến lược",
    "about.bento.enterprise": "Giải pháp Doanh nghiệp",
    "about.quote": "\"Code là thơ, logic là nghệ thuật, và kiến trúc là nền tảng của tương lai.\"",
    
    // How I Help
    "help.tag": "Quy trình",
    "help.title": "Cách Tôi Giúp Bạn Thành Công",
    "help.step1.t": "Khám phá & Chiến lược",
    "help.step1.d": "Chúng tôi bắt đầu bằng việc hiểu sâu sắc mục tiêu kinh doanh, đối tượng mục tiêu và thách thức hiện tại của bạn. Giai đoạn này bao gồm nghiên cứu kỹ lưỡng để xác định nền tảng chiến lược vững chắc.",
    "help.step2.t": "Tư vấn Giải pháp",
    "help.step2.d": "Tận dụng chuyên môn tại SID CORP, tôi kiến trúc một giải pháp có khả năng mở rộng, đón đầu tương lai được điều chỉnh theo đúng nhu cầu của bạn, chọn các công nghệ và nền tảng phù hợp.",
    "help.step3.t": "Phát triển Linh hoạt",
    "help.step3.d": "Chúng tôi xây dựng sản phẩm của bạn bằng các ngăn xếp công nghệ hiện đại, hiệu suất cao. Cập nhật thường xuyên và phương pháp linh hoạt đảm bảo bạn luôn nắm bắt tiến độ.",
    "help.step4.t": "Triển khai & Mở rộng",
    "help.step4.d": "Triển khai liền mạch lên hạ tầng đám mây đảm bảo tính sẵn sàng cao. Chúng tôi thực hiện các đường ống CI/CD mạnh mẽ cho các bản cập nhật mượt mà và an toàn.",
    "help.step5.t": "Hỗ trợ & Phát triển",
    "help.step5.d": "Mối quan hệ đối tác của chúng ta không kết thúc khi ra mắt. Tôi cung cấp hỗ trợ liên tục, tối ưu hóa và nâng cấp tính năng để giữ cho sản phẩm của bạn luôn dẫn đầu.",
    
    // SID Corp
    "sid.tag": "Công ty của chúng tôi",
    "sid.title1": "Kiến tạo tương lai cùng",
    "sid.desc": "Tại SID CORP, chúng tôi chuyên cung cấp các giải pháp cấp doanh nghiệp. Từ tích hợp AI và hệ thống ERP đến chuyển đổi kỹ thuật số hoàn chỉnh, chúng tôi là đối tác công nghệ đáng tin cậy của các nhà lãnh đạo trong ngành. Vai trò của tôi với tư cách là Chuyên gia Tư vấn Phần mềm là đảm bảo các giải pháp này phù hợp hoàn hảo với mục tiêu kinh doanh của bạn.",
    "sid.btn": "Truy cập Website SID CORP",
    "sid.stat1": "Năm Kinh Nghiệm",
    "sid.stat2": "Chuyên Gia",
    "sid.stat3": "Đối Tác Toàn Cầu",
    "sid.stat4": "Khách Hàng Hài Lòng",
    
    // Services
    "srv.tag": "Chuyên môn",
    "srv.title": "Dịch vụ Cao cấp",
    "srv.scroll": "Cuộn xuống để khám phá",
    "srv.1.t": "Giải pháp AI",
    "srv.1.d": "Tích hợp tự động hóa thông minh và phân tích dữ liệu.",
    "srv.1.f1": "Học máy (ML)", "srv.1.f2": "Xử lý ngôn ngữ tự nhiên (NLP)", "srv.1.f3": "Phân tích Dự đoán",
    "srv.2.t": "Hệ thống ERP",
    "srv.2.d": "Tối ưu hóa nguồn lực và hoạt động của doanh nghiệp.",
    "srv.2.f1": "Odoo", "srv.2.f2": "SAP", "srv.2.f3": "Phần mềm ERP tùy chỉnh",
    "srv.3.t": "Tích hợp CRM",
    "srv.3.d": "Nâng cao mối quan hệ khách hàng và theo dõi doanh số.",
    "srv.3.f1": "Salesforce", "srv.3.f2": "HubSpot", "srv.3.f3": "Nền tảng dữ liệu khách hàng (CDP)",
    "srv.4.t": "Phát triển Web",
    "srv.4.d": "Các ứng dụng web có hiệu suất cao, mở rộng tốt.",
    "srv.4.f1": "Next.js", "srv.4.f2": "React", "srv.4.f3": "Kiến trúc Microservices",
    "srv.5.t": "Ứng dụng Di động",
    "srv.5.d": "Trải nghiệm di động native và đa nền tảng.",
    "srv.5.f1": "Flutter", "srv.5.f2": "React Native", "srv.5.f3": "iOS & Android",
    "srv.6.t": "Tự động hóa",
    "srv.6.d": "Tối ưu hóa quy trình làm việc để tiết kiệm thời gian.",
    "srv.6.f1": "RPA", "srv.6.f2": "Tối ưu hóa quy trình", "srv.6.f3": "CI/CD",
    "srv.7.t": "Kiến trúc Đám mây",
    "srv.7.d": "Hạ tầng đám mây an toàn, có khả năng mở rộng.",
    "srv.7.f1": "AWS", "srv.7.f2": "Google Cloud", "srv.7.f3": "DevOps",
    "srv.8.t": "Thiết kế UI/UX",
    "srv.8.d": "Giao diện lấy người dùng làm trung tâm để tăng tương tác.",
    "srv.8.f1": "Figma", "srv.8.f2": "Tạo nguyên mẫu", "srv.8.f3": "Nghiên cứu người dùng",
    
    // Industries
    "ind.tag": "Ngành nghề phục vụ",
    "ind.title": "Chuyển đổi Mọi Lĩnh vực",
    "ind.1.title": "Thương mại điện tử & bán lẻ",
    "ind.1.sub": "Bán ở mọi kênh, quản lý ở một nơi.",
    "ind.1.desc": "Bán đa kênh, kiến trúc headless, in theo yêu cầu và tích hợp AI cho các thương hiệu bán lẻ và marketplace.",
    "ind.1.f1": "Bán đa kênh", "ind.1.f2": "Kiến trúc headless", "ind.1.f3": "In theo yêu cầu (POD)", "ind.1.f4": "Tích hợp AI",
    "ind.1.projects": "DodgePrint, ePOD, Koarooriginal",
    "ind.2.title": "Nhân sự & Quản trị nội bộ",
    "ind.2.sub": "Số hóa vận hành nội bộ, từ chấm công tới KPI.",
    "ind.2.desc": "Số hóa HR, tính lương tự động và dashboard KPI cho đội ngũ vận hành của doanh nghiệp.",
    "ind.2.f1": "Số hóa HR", "ind.2.f2": "Tính lương tự động", "ind.2.f3": "KPI dashboard",
    "ind.2.projects": "SidPeak",
    "ind.3.title": "Bất động sản & cho thuê",
    "ind.3.sub": "Quản lý phòng, hợp đồng và dòng tiền trên một app.",
    "ind.3.desc": "Quản lý phòng, hợp đồng, thu chi và toàn bộ vận hành cho thuê trong một ứng dụng.",
    "ind.3.f1": "Quản lý phòng", "ind.3.f2": "Quản lý hợp đồng", "ind.3.f3": "Thu chi", "ind.3.f4": "App quản lý",
    "ind.3.projects": "AnHome",
    "ind.4.title": "Chăm sóc khách hàng (CX)",
    "ind.4.sub": "Một khách hàng, một hồ sơ, mọi kênh hỗ trợ.",
    "ind.4.desc": "Helpdesk đa kênh, nền tảng dữ liệu khách hàng (CDP), xác thực email và automation cho đội chăm sóc.",
    "ind.4.f1": "Helpdesk đa kênh", "ind.4.f2": "Customer data platform (CDP)", "ind.4.f3": "Xác thực email", "ind.4.f4": "Automation",
    "ind.4.projects": "Helpdesk, Bozuro, BounceCheck",
    "ind.all.title": "Mọi ngành",
    "ind.all.q": "Chưa thấy ngành phù hợp với bạn?",
    "ind.all.desc1": "SID Corp là công ty phát triển phần mềm và giải pháp công nghệ cho doanh nghiệp, với đội ngũ hơn 120 người. Chúng tôi phát triển phần mềm theo yêu cầu cho mọi ngành.",
    "ind.all.desc2": "Kết quả thực tế từ các dự án được tổng hợp tại trang sản phẩm & dự án.",
    "ind.all.desc3": "SID Corp — phát triển phần mềm theo yêu cầu",

    // Process
    "process.title": "Quy Trình Hợp Tác",
    "process.1.t": "01. Lắng Nghe",
    "process.1.d": "Hiểu rõ bài toán kinh doanh và quy trình thực tế của doanh nghiệp bạn.",
    "process.2.t": "02. Thiết Kế",
    "process.2.d": "Đề xuất giải pháp kiến trúc và lộ trình triển khai tối ưu.",
    "process.3.t": "03. Phát Triển",
    "process.3.d": "Xây dựng hệ thống, kiểm thử nghiêm ngặt và bàn giao đúng hẹn.",
    "process.4.t": "04. Đồng Hành",
    "process.4.d": "Hỗ trợ vận hành, tối ưu hiệu suất và mở rộng lâu dài.",
    
    // Blog
    "blog.tag": "Góc nhìn & Chia sẻ",
    "blog.title": "Bài viết Mới nhất",
    "blog.viewAll": "Xem Tất Cả Bài Viết",
    "blog.read": "Đọc Bài Viết",
    "blog.close": "Đóng bài viết",
    
    // Contact
    "contact.tag": "Hợp tác cùng nhau",
    "contact.title1": "Sẵn sàng xây dựng điều gì đó",
    "contact.title2": "phi thường?",
    "contact.desc": "Cho dù bạn cần một chuyển đổi kỹ thuật số hoàn chỉnh, một ứng dụng web mở rộng, hoặc tư vấn chuyên gia, hãy gửi tin nhắn cho tôi.",
    "contact.copyright": "© 2026 Nguyễn Minh Hùng. Chuyên gia Tư vấn Phần mềm tại SID CORP.",

    // Gallery
    "gallery.tag": "Dự Án Nổi Bật",
    "gallery.title1": "Các Dự Án Tại",
    "gallery.proj1.desc": "Bán hàng đa kênh: Etsy, Amazon, Shopify, ShopBase — đăng một lần, bán mọi nơi.",
    "gallery.proj2.desc": "Nền tảng dựng gian hàng trực tuyến tích hợp AI nhanh chóng, hiệu suất cao.",
    "gallery.proj3.desc": "Nền tảng dữ liệu khách hàng giúp doanh nghiệp cá nhân hóa trải nghiệm và tối ưu vận hành.",
    "gallery.proj4.desc": "Giải pháp quản trị nội bộ toàn diện, tối ưu hóa quy trình làm việc cho doanh nghiệp.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string): string => {
    return dict[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
