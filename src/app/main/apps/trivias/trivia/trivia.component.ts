import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Constants,
    GeneralMsg,
    GeneralError,
    Status,
} from 'assets/config/webconfig';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MetaConstant } from 'assets/config/meta';
import { MetaService } from 'app/common/services/meta.service';
import { Subject } from 'rxjs';
import { TriviaService } from './trivia.service';
import { ToasterService } from 'app/common/services/toaster.service';
import { MatRadioChange, MatDialog } from '@angular/material';
import { TriviaType } from '../trivia.model';
import { DeleteConfirmationDialog } from './delete-conformation-dialog/delete-conformation-dialog.component';

@Component({
    selector: 'app-trivia',
    templateUrl: './trivia.component.html',
    styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent implements OnInit, OnDestroy {
    private _unSubcribeServices: Subject<any>;

    // Component variables
    public headerTitle: String = Constants.const_trivias_titles.manage_trivia;
    public pageTitle: String = Constants.const_trivias_titles.manage_trivia_add;
    public triviaTypeArray: TriviaType[] = Constants.const_trivia_type;
    public trivia_status: Status[] = Constants.trivia_status;

    // Forms
    triviaQuoteForm: FormGroup; // Trivia Quote Form Group
    triviaPollForm: FormGroup; // Trivia Poll Form Group
    triviaQuizForm: FormGroup; // Trivia Quiz Form Group

    pollOptions = [
        // Poll Options Object
        {
            // By default one added
            option: '',
        },
    ];
    quizQuestions = [
        // Quiz Question Options Object
        {
            // By default one added
            question: '',
            options: [
                {
                    option: '',
                },
            ],
            answer: 0,
        },
    ];
    defaultTrivia = 0;

    /**
     * Constructor
     * @param _fb FormBuilder
     * @param _router Router
     * @param _metaService MetaService
     * @param _triviaService TriviaService
     * @param _toastrService ToasterService
     * @param dialog MatDialog
     */
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _metaService: MetaService,
        private _triviaService: TriviaService,
        private _toastrService: ToasterService,
        public dialog: MatDialog,
    ) {
        this._unSubcribeServices = new Subject();

        // Update metas
        this._metaService.updateTitle(MetaConstant.TriviaAdd.title);
        this._metaService.updateMetaInfo(
            MetaConstant.TriviaAdd.description,
            MetaConstant.TriviaAdd.author,
            MetaConstant.TriviaAdd.keywords,
        );
    }

    /**
     * On Init.
     * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     */
    ngOnInit(): void {
        // Set Quote Trivia Form
        this.triviaQuoteForm = this._fb.group({
            quotes: ['', Validators.required],
            quote_from: ['', Validators.required],
            status: [1, Validators.required],
        });

        // Set Poll Trivia Form
        this.triviaPollForm = this._fb.group({
            questions: ['', Validators.required],
            status: [1, Validators.required],
        });

        // Set Quiz Trivia Form
        this.triviaQuizForm = this._fb.group({
            trivia_name: ['', Validators.required],
            status: [1, Validators.required],
        });
    }

    /**
     * Redirect to listing page
     */
    redirectToTrivia(): void {
        this._router.navigate(['/apps/trivias/trivialist']);
    }

    /**
     * Submit form for trivia type as quotes
     */
    submitQuotesTriviaForm(): any {
        if (this.triviaQuoteForm.valid) {
            const formData = this.triviaQuoteForm.getRawValue();
            // Check validations
            if (formData.quotes.trim() === '') {
                this.triviaQuoteForm
                    .get('quotes')
                    .setErrors({ required: true });
                return false;
            } else if (formData.quote_from.trim() === '') {
                this.triviaQuoteForm
                    .get('quote_from')
                    .setErrors({ required: true });
                return false;
            }
            const inputParam = {
                created_at: new Date(),
                quote_from: formData.quote_from,
                quotes: formData.quotes,
                status: Number(formData.status),
                trivia_type: 2, // Trivia type 2 = Quotes
                trivia_uid: '',
                updated_at: new Date(),
            };

            this._triviaService
                .addNewTrivia(inputParam)
                .then(() => {
                    this._toastrService.success(GeneralMsg.trivia_create);
                    setTimeout(() => {
                        this.redirectToTrivia();
                    }, 1000);
                })
                .catch(err => {
                    this._toastrService.error(err.message);
                });
        } else {
            this._toastrService.error(GeneralError.form_validate);
            this.triviaQuoteForm.setErrors({ required: true });
        }
    }

    /**
     * Submit form for trivia type as poll
     */
    submitPollTriviaForm(): any {
        if (this.triviaPollForm.valid) {
            const formData = this.triviaPollForm.getRawValue();

            // Check validations
            if (formData.questions.trim() === '') {
                this.triviaPollForm
                    .get('questions')
                    .setErrors({ required: true });
                return false;
            } else if (this.pollOptions.length < 2) {
                this._toastrService.error(
                    'Minimum 2 options are required to create poll !',
                );
                return false;
            }
            let flag = true;
            this.pollOptions.forEach((element, index) => {
                if (flag) {
                    if (element.option.trim() === '') {
                        this._toastrService.error(
                            `Please enter value for option ${index + 1} `,
                        );
                        flag = false;
                    }
                }
            });
            if (!flag) {
                return false;
            }

            const params = {
                created_at: new Date(),
                options: this.pollOptions,
                questions: formData.questions,
                status: Number(formData.status),
                trivia_type: 1, // Trivia type 1 = Poll
                trivia_uid: '',
                updated_at: new Date(),
            };

            this._triviaService
                .addNewTrivia(params)
                .then(() => {
                    this._toastrService.success(GeneralMsg.trivia_create);
                    setTimeout(() => {
                        this.redirectToTrivia();
                    }, 1000);
                })
                .catch(err => {
                    this._toastrService.error(err.message);
                });
        } else {
            this._toastrService.error(GeneralError.form_validate);
            this.triviaPollForm.setErrors({ required: true });
        }
    }

    // Reset forms when change trivia type
    changeTriviaType(): void {
        this.triviaQuoteForm.reset({ quotes: '', quote_from: '', status: 1 });
        this.triviaPollForm.reset({ questions: '', status: 1 });
        this.triviaQuizForm.reset({ trivia_name: '', status: 1 });
        this.quizQuestions = [
            {
                question: '',
                options: [
                    {
                        option: '',
                    },
                ],
                answer: 0,
            },
        ];
    }

    /**
     * Add options for poll trivia
     */
    addPollOption(): any {
        if (this.pollOptions.length === 4) {
            this._toastrService.error('You cannot add more than 4 options.');
            return false;
        }

        this.pollOptions.push({
            option: '',
        });
    }

    /**
     * Delete poll option
     * @param index
     */
    deleteOption(index): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
            data: { content: 'Are you sure you want to delete this option ?' },
        });
        dialogRef.afterClosed().subscribe((cnfApprove: boolean) => {
            if (cnfApprove) {
                this.pollOptions.splice(index, 1);
            }
        });
    }

    /**
     * Updates poll options value
     * @param event
     * @param index
     */
    updateOptionValue(value: string, index: number): void {
        this.pollOptions[index].option = value;
    }

    /**
     * Add sub option for particular quiz question
     * @param index
     */
    addSubOptions(index: number): any {
        if (this.quizQuestions[index].options.length === 4) {
            this._toastrService.error('You cannot add more than 4 options.');
            return false;
        }

        this.quizQuestions[index].options.push({
            option: '',
        });
    }

    /**
     * Add Question in quiz
     */
    addQuestion(): void {
        this.quizQuestions.push({
            question: '',
            options: [
                {
                    option: '',
                },
            ],
            answer: 0,
        });
    }

    /**
     * Delete question from quiz question list
     * @param index
     */
    deleteQuestion(index: number): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
            data: {
                content: 'Are you sure you want to delete this question ?',
            },
        });
        dialogRef.afterClosed().subscribe((cnfApprove: boolean) => {
            if (cnfApprove) {
                this.quizQuestions.splice(index, 1);
            }
        });
    }

    /**
     *
     * Deletes option for selected question in quiz
     * @param {*} questionIndex
     * @param {*} index
     */
    deleteQuizOption(questionIndex: number, index: number): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
            data: { content: 'Are you sure you want to delete this option ?' },
        });
        dialogRef.afterClosed().subscribe((cnfApprove: boolean) => {
            if (cnfApprove) {
                this.quizQuestions[questionIndex].options.splice(index, 1);
                if (
                    Number(this.quizQuestions[questionIndex].answer) ===
                    Number(index)
                ) {
                    this.quizQuestions[questionIndex].answer = 0;
                }
            }
        });
    }

    /**
     * Submit quiz form
     */
    submitQuizTriviaForm(): any {
        if (this.triviaQuizForm.valid) {
            const formData = this.triviaQuizForm.getRawValue();

            // Check validations
            if (formData.trivia_name.trim() === '') {
                this.triviaQuizForm
                    .get('trivia_name')
                    .setErrors({ required: true });
                return false;
            } else if (this.quizQuestions.length < 2) {
                this._toastrService.error(
                    'Minimum 2 questions are required to create quiz !',
                );
                return false;
            }

            let flag = true,
                optionFlag = true;
            this.quizQuestions.forEach((element, index) => {
                if (flag) {
                    if (element.options.length < 2) {
                        this._toastrService.error(
                            `Minimum 2 options are required in question ${index +
                                1} !`,
                        );
                        flag = false;
                    } else if (element.question.trim() === '') {
                        this._toastrService.error(
                            `Please enter value for question ${index + 1} `,
                        );
                        flag = false;
                    } else {
                        element.options.forEach((innerElem, innerIndex) => {
                            if (optionFlag) {
                                if (innerElem.option.trim() === '') {
                                    this._toastrService.error(
                                        `Please enter value for option ${innerIndex +
                                            1} of question ${index + 1} `,
                                    );
                                    optionFlag = false;
                                    flag = false;
                                }
                            }
                        });
                    }
                }
            });
            if (!flag || !optionFlag) {
                return false;
            }
            const params = {
                created_at: new Date(),
                questions: this.quizQuestions,
                trivia_name: formData.trivia_name,
                status: Number(formData.status),
                trivia_type: 0, // Trivia type 0 = Quiz
                trivia_uid: '',
                updated_at: new Date(),
            };

            this._triviaService
                .addNewTrivia(params)
                .then(() => {
                    this._toastrService.success(GeneralMsg.trivia_create);
                    setTimeout(() => {
                        this.redirectToTrivia();
                    }, 1000);
                })
                .catch(err => {
                    this._toastrService.error(err.message);
                });
        } else {
            this._toastrService.error(GeneralError.form_validate);
            this.triviaQuizForm.setErrors({ required: true });
        }
    }

    /**
     * Updates quiz questions of selected index
     * @param {*} event
     * @param {*} index
     */
    updateQuizQues(event, index): void {
        this.quizQuestions[index].question = event.target.value;
    }

    /**
     * Updates options of selected option of quiz
     * @param {*} event
     * @param {*} index
     * @param {*} innrIndex
     */
    updateQuizQuesOpt(
        value: string,
        index: string | number,
        innrIndex: string | number,
    ): void {
        this.quizQuestions[index].options[innrIndex].option = value;
    }

    /**
     * Updates answer of selected radio button in options of question
     * @param {MatRadioChange} event
     * @param {*} index
     */
    onRadioChange(event: MatRadioChange, index: string | number): void {
        if (
            typeof event.value !== 'undefined' &&
            typeof event.value === 'number'
        ) {
            this.quizQuestions[index].answer = event.value;
        }
    }

    /**
     * On Destroy .
     * Called once, before the instance is destroyed.
     */
    ngOnDestroy(): void {
        // Unsubscribe services
        this._unSubcribeServices.next();
        this._unSubcribeServices.complete();
    }
}
