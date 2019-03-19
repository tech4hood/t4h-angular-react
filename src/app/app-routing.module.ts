import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from "@ngrx/store";
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { dataReducer } from './redux/reducer/storing.reducer';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    StoreModule.forFeature('Data', dataReducer)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
