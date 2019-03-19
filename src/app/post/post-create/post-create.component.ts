import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { DataState } from 'src/app/redux/reducer/storing.reducer';
import { Store } from '@ngrx/store';
import { SavingData } from 'src/app/redux/actions/storing.action';

@Component({
    selector: "app-post-create",
    templateUrl: "./post-create.component.html",
    styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
    enterTitle = "";
    enterContent = "";
    mode = "create";
    postId: string;
    imagePreview: string;
    post: Post;
    isLoading = false;
    form: FormGroup;

    constructor(
        public postService: PostService,
        public route: ActivatedRoute,
        private store$: Store<DataState>
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, {
                validators: [Validators.required]
            })
            // image: new FormControl(null, {validators: [Validators.required]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("postId")) {
                this.mode = "edit";
                this.postId = paramMap.get("postId");
                this.isLoading = true;
                this.postService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id,
                        title: postData.title,
                        content: postData.content
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content
                    });
                });
            } else {
                this.mode = "create";
                this.postId = null;
            }
        });
    }

    // onImagePicked(event: Event) {
    //   const file = (event.target as HTMLInputElement).files[0];
    //   this.form.patchValue({ image: file });
    //   this.form.get('image').updateValueAndValidity();
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result;
    //   }
    //   reader.readAsDataURL(file);
    // }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === "create") {
            this.postService.addPost(
                this.form.value.title,
                this.form.value.content
            );

          this.store$.dispatch(
              new SavingData(
                  `Data ${this.form.value.title}`,
                  "Saving Title"
              )
          );
        } else {
            this.postService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content
            );
        }
        this.form.reset();
    }
}
