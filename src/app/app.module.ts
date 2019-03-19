import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule,
  MatIconModule, MatToolbarModule, MatProgressSpinnerModule, MatExpansionModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post/post.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { dataReducer } from './redux/reducer/storing.reducer';

@NgModule({
    declarations: [
        AppComponent,
        PostCreateComponent,
        HeaderComponent,
        PostListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
      MatProgressSpinnerModule,
      StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument()
    ],
    providers: [PostService],
    bootstrap: [AppComponent]
})
export class AppModule {}
