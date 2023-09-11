import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
   //myQuestions - array of object 
   selectedAnswer = {} //store our selected answer
   correctAnswer = 0 //checks how many answers are correct
   isSubmitted = false
    myQuestions = [
        {
            id: "Question 1",
            question: "which of the following is not a template loop?",
            answers: {
                a: "map",
                b: "for:each",
                c: "iterator"
            },
            correctAnswer: "a"
        },
        {
            id: "Question 2",
            question: "which of the following is a template directive?",
            answers: {
                a: "if true",
                b: "if:true",
                c: "else"
            },
            correctAnswer: "b"
        },
        {
            id: "Question 3",
            question: "which of the following is not a valid datatype in apex?",
            answers: {
                a: "integer",
                b: "string",
                c: "char"
            },
            correctAnswer: "c"
        }
    ]

    // for applying dynamic styling to our result
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswer?
            'slds-text-color_success':'slds-text-color_error'}`
    }
    
    get allAnswersSelected() {
        return !(Object.keys(this.selectedAnswer).length === this.myQuestions.length)
        //!(Object.keys(question 1, question 2, question 3).length === this.myQuestion.length)
    }
    changeHandler(event) {
        const {name, value} = event.target
        this.selectedAnswer = {...this.selectedAnswer, [name]:value}
        //this.selectedAnswer = {...this.selectedAnswer, [Question 1]:"a"}
        //if the value changes and if the key already exists then it directly retrieves the changed value

    }
    handleSubmit(event) {
        //submit button is inside the form tag which always refresh the page so to prevent that
        //event.preventDefault()
        //this.selectedAnswer = {"Question 1":"a", "Question 2":"b","Question 3":"c"}
        
        let correct = this.myQuestions.filter(item=>this.selectedAnswer[item.id] === item.correctAnswer)
        //this.myQuestions.filter(item=>this.selectedAnswer["Question 1"] === item.correctAnswer)
        //this.myQuestions.filter(item=>"a" === "a") if true then it will return that particular object
        this.correctAnswer = correct.length
        console.log(this.correctAnswer)
        this.isSubmitted = true

    }
    handleReset() {
        this.selectedAnswer = {}
        this.correctAnswer = 0
        this.isSubmitted = false
        eval("$A.get('e.force:refreshView').fire();")
    }
}