# Travel Tracker

## Abstract
This web application was designed to provide a user-friendly dashboard displaying comprehensive information about a user's past and upcoming trips. Upon logging in with their credentials, users are directed to their homepage where they can easily view their travel history and schedule new adventures. I integrated the application with a local server, enabling it to make network requests to various API endpoints for data retrieval and manipulation. Furthermore, users can seamlessly post to the trips endpoint of the API, instantly reflecting their newly booked trips on the user interface.

## Setup
Fork and Clone the Main Repo
- Navigate to the main re##pository on GitHub: [repo](https://github.com/Sulton88Mehron90/travel-tracker):
- Click on the "Fork" button at the top right. This will create a copy of the repository in your own GitHub account.
- Once forked, click on the "Code" button and copy the SSH link.
Open your terminal and navigate to the directory where you want to clone the repository: ```cd path/to/your/directory```
- Run the following command to clone the repository: ```git clone [copied SSH link]```
- This will create a new folder on your machine with the contents of the repository.
Fork and Clone the Local Server Repo
- Navigate to the local server repository on GitHub: [local server repo](https://github.com/turingschool-examples/travel-tracker-api):
- Repeat the steps mentioned above to fork and clone this repository as well.
Setting Up Dependencies
To ensure the app functions correctly, you need to install necessary dependencies and start the local servers for both repositories.
Install Dependencies and Start the Server:
Navigate to the root directory of the cloned repo: ```cd [name of the cloned directory]```
Install the required libraries and dependencies: ```npm install```
Start the local server: ```npm start```
Now, open your browser, and you should be able to see the HTML page of the app.
##Note: It's essential to keep both repositories running simultaneously for the app to function correctly.
To stop the local server, use the ```Control + C``` command in the terminal.

## Preview of App

![preview-of-app](https://media.giphy.com/) 

## Reflections: 
I am currently in the last week of Module Two at the Turing School of Software and Design's Front End Web Development program. This program consists of four modules spanning seven months, and is focused on preparing students for a career as web developers. We work extensively with JavaScript, HTML, CSS. This is my second solo project, which I completed in 7 days, adhering to the project specifications and rubric detailed [here](https://frontend.turing.edu/projects/travel-tracker.html). 

## Technologies Used:
Javascript | Mocha & Chai | API | CSS | HTML

## Countributors:
Parvin A. Sattorova [LinkedIn](https://www.linkedin.com/in/parvin-sattorova-edwards-357526b3/) || [github](https://github.com/Sulton88Mehron90)  

<!-- <table>
     <tr>
        <td> Parvin <a href="https://github.com/Sulton88Mehron90">Github</td>
    </tr>
    <tr>
        <td><img src="https://avatars.githubusercontent.com" alt="Parvin GH img"
    width="150" height="auto" /></td>
    </tr>
</table> -->

## Wins/Challenges:
Challenges: 
- Faced complexities while implementing the user login authentication mechanism. The challenges were primarily around extracting and validating the user ID from the input string, ensuring the ID was within an acceptable range. This required string manipulations, value validations, and DOM interactions. Addressing these intricacies provided invaluable insights into form handling in JavaScript.

Wins: 
 - Effectively fetched data from an API.
 - Successfully posted data to an API.
 - Made effective use of iterators.
 - Successfully created a login page.
 - Successfully use of DayJS.
 - Employed Test-Driven Development (TDD) methodologies throughout the project lifecycle