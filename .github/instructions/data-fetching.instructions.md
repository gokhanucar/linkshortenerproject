---
description: Read this file to understand how to fetch data in the project.
---

# Data Fetching Guidelines
This document outlines the best practices for fetching data in the Link Shortener project. Adhering to these guidelines will ensure consistency, maintainability, and optimal performance across the codebase.

## 1. Use Server Components for Data Fetching
In Next.js, ALWAYS using Server Components for data fetching is recommended. Server Components allow you to fetch data directly in the component without needing to manage loading states or client-side effects.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory for fetching data. These functions are designed to abstract away the details of data fetching and provide a consistent interface for accessing data throughout the application. NEVER fetch data directly in your components without using these helper functions.

ALL helper functions in the /data directory should use the Drizzle ORM for database access. NEVER write raw SQL queries or use other database access methods outside of these helper functions.
