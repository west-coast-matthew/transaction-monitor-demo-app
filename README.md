#Transaction Monitor Demo

##Background

**"The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping ..."** ... Alice's Adventures in Wonderland & Through the Looking-Glass (Lewis Carroll 1865)

Traditional approaches to logic are not effective in performing auditing or transactions resulting from executing complex business logic. 

### An illustration of an alternate approach

This project represents a real world (ish) application that executes a series of operations that could be considered 'complex logic'. In this case, some type of loan approval process. The goal is to create a somewhat realistic 'black box' containing a series of operations for which traditional logging approaches are not the best fit. 

We are making an application 'complex enough' to illustrate a multistep process, but not intended for production as I am timeboxing the effort.

Imagine a senario where this process is performed hundreds, if not thousands of times daily. Not only would we need the ability to 'replay' the decision making steps for internal auditing purposes, but this might also need to be performed for external auditing and government compliance purposes as well. Looking into log entries using traditional methods is not an intuitive or effective approach. Also, we run the risk of loosing records do to log rotation. 

This application will demonstrate an alternate approach where the listener pattern is applied, events are ultimately formatted and archived into dedicated location for future access. This is accomplished via an 'agent' for which events are reported to, in addition to the traditional logging approach.

While this example will demonstrate an approach, it should be noted that although the concepts can be applied to production environments, there are architectual decisions that are made here just to keep things simple enough to illustrate the core concept.

###A loan application use case 
For this example, we will focus on a business function where applicant data for a loan has been collected and is sent through a loan approval process. The data for the loan applicants is mocked, and the auditing instrumentation is focused on the loan qualification process.

## Starting the application

Us ethe following command:
`npm start`

Upon execution, a series of 50 transactions will be executed through a common function, information produced for the auditing effort will be then translated into more easy to interpret reports (in this case PDF reports). The intent is just to provide a working example of how events may be 'observed', then structured and translated into a more analyst friendly format.

##Project structure

* The src/services directory contains all logic that would be performed via the target application.
* The src/agent directory contains the agent related logic, think of this an an logging API for the dedicated effort for logging business logic.
* The src/publisher directory contains code isolated to 





#For more information
https://www.matthewdalby.dev/articles/auditing-complex-business-logic