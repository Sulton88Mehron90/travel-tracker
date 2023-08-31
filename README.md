# Travel Tracker

## Abstract
This web application was designed to provide a user-friendly dashboard displaying comprehensive information about a user's past and upcoming trips. Upon logging in with their credentials, users are directed to their homepage where they can easily view their travel history and schedule new adventures. I integrated the application with a local server, enabling it to make network requests to various API endpoints for data retrieval and manipulation. Furthermore, users can seamlessly post to the trips endpoint of the API, instantly reflecting their newly booked trips on the user interface.

## Setup
Fork and clone this [repo](https://github.com/Sulton88Mehron90/travel-tracker) and then in a different folder, fork and clone this [local server repo](https://github.com/turingschool-examples/travel-tracker-api).

Do the following steps for both repos. Both repos need to be running in order for the app to work correctly.

In your forked GitHub repository, click the code drop-down menu and copy the SSH key. 
Open the terminal on your machine and navigate to the containing directory you’d like - to clone the repository folder and its contents to. On the command line, run “git clone” + the SSH key you copied earlier. A new folder will be created containing a local copy of the repository linked to the forked repository you created - enter the new directory.

Install the library dependencies:

Run: ```npm install```
Next: ```npm start``` in the terminal to see the HTML page

```Control + C``` is the command to stop running the local server

## Preview of App
[![App Preview](./src/images/parvingoinghome.jpg)](https://youtu.be/kXw2OpQBgp4)

## Reflections: 
I am currently in the last week of Module Two at the Turing School of Software and Design's Front End Web Development program. This program consists of four modules spanning seven months, and is focused on preparing students for a career as web developers. We work extensively with JavaScript, HTML, CSS. This is my second solo project, which I completed in 7 days, adhering to the project specifications and rubric detailed [here](https://frontend.turing.edu/projects/travel-tracker.html). 

## Technologies Used:
Javascript | Mocha & Chai | API | CSS | HTML

## Countributors:
<table>
    <tr>
        <td> Parvin A. Sattorova 
            <a href="https://www.linkedin.com/in/parvin-sattorova-edwards-357526b3/">LinkedIn</a> || 
            <a href="https://github.com/Sulton88Mehron90">GitHub</a> 
        </td>
    </tr>
    <tr>
        <td><img src="https://avatars.githubusercontent.com/u/119267809?v=4" alt="GitHub Avatar" width="150"></td>
    </tr>
</table>


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
