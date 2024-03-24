# NPZ Spoiler Blocker Browser Extension

## Overview

### Chapter Overview

This section provides insight into how the prototype is implemented, detailing major components of the extension from user interface to database usage, as well as version control integration, all part of the spoiler blocking extension.

### Overview of the Prototype

The NPZ Spoiler Blocker is an advanced browser extension designed to protect users from movie spoilers on platforms like Reddit and Twitter. Leveraging Google's Gemini API for text analysis, it categorizes content as spoilers or non-spoilers. Spoiler posts are blurred within the extension's interface, with real-time count toggles available. User interaction is facilitated through upvote/downvote buttons, enhancing detection accuracy. A "flag post" feature involves users in identifying spoilers for improved blocking. User preferences are stored dynamically using Chrome's storage API and event listeners, ensuring customizable browsing while preserving surprises in social media content.

#### Data Retrieval and Storage

**Retrieval from Social Media Platforms:**
The system employs tailored data retrieval mechanisms to gather posts and threads from Reddit and Twitter.

**Storage in MySQL Database:**
Retrieved data is meticulously stored in a MySQL database, categorized and indexed for efficient access and retrieval.

#### Spoiler Blocking Algorithm (Keyword Detection)

The extension scans Reddit posts for specific keywords related to movie spoilers and Marvel-related terms. Potential spoilers trigger content blurring with an option to view.

#### Large Language Model (LLM) Processing

**Utilization of Gemini API:**
The system utilizes Google's Gemini API, capable of understanding and generating text based on user prompts.

#### Backend Analysis with LLM

Upon content receipt, the Gemini API's backend analyzes it meticulously, involving contextual understanding, intent extraction, and relevant information synthesis.

#### Automatic Spoiler Detection

**Using Keywords to Detect Spoilers:**
Responses undergo a sophisticated spoiler detection mechanism parsing content for specific keywords or contextual clues.

**Spoilers vs. Non-Spoilers Labeling Using LLM:**
Each response is labeled meticulously as a spoiler or non-spoiler based on detected content, crucial for subsequent actions like content filtering and user notifications.

#### User Interface

The NPZ Spoiler Blocker features a straightforward interface with a toggle button to block spoilers and a real-time count display. Customization options for content filtering are available on a separate page, with ongoing development focused on user authentication and account management. Additionally, a dedicated website showcases the extension's effectiveness in protecting users from spoilers on social media platforms.

#### Upvote and Downvote Functionality

Upvote and downvote buttons are added to spoiler posts, visible upon clicking the "view post" button. Users can vote on spoiler content, influencing the system's classification of potential spoilers.

#### Flag Post Functionality

A "flag post" button is dynamically added to all posts on the Reddit homepage. Users can flag posts to enhance detection and blocking accuracy, storing post details for algorithm improvement.

Flag post button is integrated with default Reddit buttons.
